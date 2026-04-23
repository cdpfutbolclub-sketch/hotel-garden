"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("hg-cookies-accepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("hg-cookies-accepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-hg-surface border-t border-hg-border px-4 py-5 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-hg-muted text-sm leading-relaxed max-w-2xl">
          We use cookies to improve your experience on our website. By continuing to browse,
          you agree to our use of cookies.{" "}
          <Link href="/faq" className="text-hg-gold hover:underline">
            Learn more
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-hg-gold hover:bg-hg-gold-light text-hg-black font-semibold text-xs px-6 py-2.5 tracking-wider uppercase transition-colors cursor-pointer"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
