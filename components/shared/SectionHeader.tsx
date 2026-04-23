interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-14 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <p className="text-hg-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading text-4xl sm:text-5xl mb-5 leading-tight ${
          light ? "text-hg-black" : "text-hg-cream"
        }`}
      >
        {title}
      </h2>
      <div className={`w-14 h-px bg-hg-gold ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className={`mt-5 text-base leading-relaxed max-w-xl ${centered ? "mx-auto" : ""} ${light ? "text-hg-black/60" : "text-hg-muted"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
