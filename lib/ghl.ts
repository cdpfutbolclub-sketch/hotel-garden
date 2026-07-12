/**
 * GoHighLevel (LeadConnector v2) client for Hotel Garden.
 *
 * Design rules:
 *  - Every call FAILS SOFT. If the token is missing or GHL errors, functions
 *    return null and log — they never throw. A CRM hiccup must never break a
 *    booking, payment, or contact-form submission.
 *  - Custom fields and stages are keyed by ID (stable across UI renames).
 *  - IDs default to Hotel Garden's live values but can be overridden via env
 *    so the same code can drive a cloned sub-account.
 */

const BASE = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

const TOKEN = process.env.GHL_API_TOKEN;
const LOCATION_ID = process.env.GHL_LOCATION_ID || "6JmtmA7T2sK1wMkMCDaJ";
const PIPELINE_ID = process.env.GHL_PIPELINE_ID || "cssOwzZn2AYuy09wd7jD";

export const STAGE = {
  NEW_LEAD: process.env.GHL_STAGE_NEW_LEAD || "3c497914-6d1d-40b2-a52f-816e8819a77b",
  BOOKING_CONFIRMED:
    process.env.GHL_STAGE_BOOKING_CONFIRMED || "c739e3d6-2767-4932-a834-79c74dd2e6bb",
} as const;

/** Custom field IDs (Hotel Garden). Keyed by semantic name. */
const FIELD = {
  checkin_date: "S4sLFnW8pNnH14vA2b95",
  checkout_date: "FBVC1o4LCuCLn4XMfech",
  number_of_nights: "sglPMXnjVg9tzrFG69YK",
  number_of_rooms: "79SfCyJtliaGcY9wsW9A",
  adults: "XngIZTX5R8QDGtqO0RWV",
  children: "p0ZN3MfZEbLXVUGvEjyR",
  room_type: "9X8S2P1FM5HijZrDc2GY",
  booking_source: "ameNlHD3ZWuFXcPWBQSB",
  purpose_of_stay: "2GDTQRLgsUMIgJI1PFYp",
  estimated_booking_value: "V9tZDJpgoDVxPoaNbBQd",
  deposit_paid: "2fNuNPmehRFCZwPn5CRY",
  loyalty_tier: "cKSEsNf6wyWRyLc4BAXT",
  guest_birthday: "QSP4dz7WqqY9HRp5RChU",
  anniversary: "zrUjYq96H1svHSDmjI1C",
  preferred_language: "SHaoYAAEcnqgCSQC8Aez",
  estimated_arrival_time: "LUqOsu1PMD1EpvEQDHrk",
  special_requests: "Y2ncqA8hvAwGlM2u4dPi",
  message: "Rjnuj6dRpfIZAhDzmZOi",
} as const;

type FieldName = keyof typeof FIELD;
type FieldValues = Partial<Record<FieldName, string | number>>;

export function ghlEnabled(): boolean {
  return Boolean(TOKEN);
}

async function ghl<T = unknown>(
  path: string,
  init: RequestInit & { method: string }
): Promise<T | null> {
  if (!TOKEN) {
    console.warn("[GHL] skipped — GHL_API_TOKEN not set");
    return null;
  }
  try {
    const res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Version: VERSION,
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};
    if (!res.ok) {
      console.error(`[GHL] ${init.method} ${path} → ${res.status}`, data?.message || text);
      return null;
    }
    return data as T;
  } catch (err) {
    console.error(`[GHL] ${init.method} ${path} failed`, err);
    return null;
  }
}

function buildCustomFields(values?: FieldValues) {
  if (!values) return undefined;
  return Object.entries(values)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([name, value]) => ({
      id: FIELD[name as FieldName],
      field_value: String(value),
    }));
}

export interface UpsertContactInput {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  tags?: string[];
  source?: string;
  fields?: FieldValues;
}

/** Create or update a contact by email. Returns the contact id, or null. */
export async function upsertContact(input: UpsertContactInput): Promise<string | null> {
  const body: Record<string, unknown> = {
    locationId: LOCATION_ID,
    email: input.email,
  };
  if (input.firstName) body.firstName = input.firstName;
  if (input.lastName) body.lastName = input.lastName;
  if (input.phone) body.phone = input.phone;
  if (input.tags?.length) body.tags = input.tags;
  if (input.source) body.source = input.source;
  const cf = buildCustomFields(input.fields);
  if (cf?.length) body.customFields = cf;

  const data = await ghl<{ contact?: { id: string }; id?: string }>("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return data?.contact?.id || data?.id || null;
}

export async function addTags(contactId: string, tags: string[]): Promise<void> {
  await ghl(`/contacts/${contactId}/tags`, {
    method: "POST",
    body: JSON.stringify({ tags }),
  });
}

export async function removeTags(contactId: string, tags: string[]): Promise<void> {
  await ghl(`/contacts/${contactId}/tags`, {
    method: "DELETE",
    body: JSON.stringify({ tags }),
  });
}

export interface UpsertOpportunityInput {
  contactId: string;
  stageId: string;
  name: string;
  monetaryValue?: number;
  status?: "open" | "won" | "lost" | "abandoned";
}

/**
 * Upsert an opportunity (keyed on contact + pipeline), so retries don't create
 * duplicates and a later call can move the same card to a new stage.
 * Returns the opportunity id, or null.
 */
export async function upsertOpportunity(input: UpsertOpportunityInput): Promise<string | null> {
  const data = await ghl<{ opportunity?: { id: string }; id?: string }>("/opportunities/upsert", {
    method: "POST",
    body: JSON.stringify({
      pipelineId: PIPELINE_ID,
      locationId: LOCATION_ID,
      contactId: input.contactId,
      pipelineStageId: input.stageId,
      name: input.name,
      status: input.status || "open",
      ...(input.monetaryValue != null ? { monetaryValue: input.monetaryValue } : {}),
    }),
  });
  return data?.opportunity?.id || data?.id || null;
}
