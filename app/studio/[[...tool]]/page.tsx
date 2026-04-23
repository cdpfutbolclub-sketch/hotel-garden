"use client";

/**
 * Hotel Garden — Sanity Studio
 * Access: http://localhost:3000/studio (development only)
 *
 * Setup:
 * 1. Create account at https://sanity.io
 * 2. Create project → copy Project ID
 * 3. Add to .env.local:
 *    NEXT_PUBLIC_SANITY_PROJECT_ID=your-id
 *    NEXT_PUBLIC_SANITY_DATASET=production
 */
import dynamic from "next/dynamic";

const Studio = dynamic(
  () => import("next-sanity/studio").then((mod) => {
    const { NextStudio } = mod;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const config = require("@/sanity.config").default;
    const Component = () => <NextStudio config={config} />;
    Component.displayName = "SanityStudio";
    return { default: Component };
  }),
  { ssr: false, loading: () => <div style={{ padding: "2rem", color: "#C9A84C" }}>Loading Studio…</div> }
);

export default function StudioPage() {
  return <Studio />;
}
