"use client";

import dynamic from "next/dynamic";

// `ssr: false` must live inside a Client Component in Next.js 16
const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-hg-surface border border-hg-border flex items-center justify-center">
      <p className="text-hg-muted text-sm">Loading map…</p>
    </div>
  ),
});

export default function MapWrapper() {
  return <Map />;
}
