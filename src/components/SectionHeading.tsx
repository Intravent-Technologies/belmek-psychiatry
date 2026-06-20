interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  gradient?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true, light = false, gradient = false }: SectionHeadingProps) {
  const Tag = gradient ? "h2" : "h2";
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} mb-14 md:mb-18`}>
      <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 ${light ? "bg-white/10 text-gray-300" : "bg-primary/5 text-primary"}`}>
        {subtitle}
      </div>
      <Tag className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight ${light ? "text-white" : ""} ${gradient ? "text-gradient" : light ? "" : "text-gray-900"}`}>
        {title}
      </Tag>
      {subtitle && (
        <p className={`mt-4 text-lg md:text-xl leading-relaxed max-w-2xl ${centered ? "mx-auto" : ""} ${light ? "text-gray-400" : "text-gray-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
