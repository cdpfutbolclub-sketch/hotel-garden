"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

interface GlowCardProps {
  children: ReactNode;
  /** Applied to the outer border-wrapper (sizing, scale, etc.) */
  wrapperClassName?: string;
  /** Applied to the inner content div (layout, padding, etc.) */
  className?: string;
  featured?: boolean;
  /**
   * Base hue (0–360) of the spotlight & border glow.
   * The spotlight shifts slightly as the cursor moves horizontally.
   * Defaults to 42 (gold).
   */
  glowHue?: number;
}

export function GlowCard({
  children,
  wrapperClassName = "",
  className = "",
  featured = false,
  glowHue = 42,
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x",  (e.clientX - rect.left).toFixed(2));
      el.style.setProperty("--xp", ((e.clientX - rect.left) / rect.width).toFixed(2));
      el.style.setProperty("--y",  (e.clientY - rect.top).toFixed(2));
      el.style.setProperty("--yp", ((e.clientY - rect.top) / rect.height).toFixed(2));
    };
    document.addEventListener("pointermove", sync);
    return () => document.removeEventListener("pointermove", sync);
  }, []);

  // Convert hue to a subtle base border color (low opacity, same hue)
  const baseBorder = featured
    ? `hsla(${glowHue}, 80%, 55%, 0.35)`
    : `hsla(${glowHue}, 60%, 65%, 0.18)`;

  const glowOpacity = featured ? "0.90" : "0.72";

  return (
    <div
      ref={ref}
      className={`rounded-2xl ${wrapperClassName}`}
      style={{
        padding: featured ? "2px" : "1.5px",
        // Spotlight follows cursor; base border is always the category hue
        background: `
          radial-gradient(
            180px 180px at
            calc(var(--x, -9999) * 1px) calc(var(--y, -9999) * 1px),
            hsl(${glowHue} 100% 65% / ${glowOpacity}),
            transparent 70%
          ),
          ${baseBorder}
        `,
        boxShadow: featured
          ? `0 20px 60px -10px hsla(${glowHue}, 80%, 50%, 0.18)`
          : undefined,
      } as CSSProperties}
    >
      <div
        className={`rounded-[13px] h-full backdrop-blur-[14px] ${
          featured ? "bg-hg-black/65" : "bg-hg-black/60"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
