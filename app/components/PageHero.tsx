export default function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="bg-ink pt-40 pb-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <p className="text-cyan/50 text-[0.65rem] tracking-[0.3em] uppercase font-body font-semibold mb-6">
          ML @ University of Virginia
        </p>
        <h1 className="text-white font-heading font-extrabold tracking-tight leading-[0.95] text-[clamp(2.5rem,5vw,3.75rem)] mb-6">
          {title}
        </h1>
        <p className="text-white/50 text-lg max-w-[600px] leading-relaxed font-body">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
