import { SERVICE_AREAS } from "@/lib/constants";

export default function ServiceAreas() {
  const doubled = [...SERVICE_AREAS, ...SERVICE_AREAS];

  return (
    <section className="water-shimmer-dark bg-blue-900 py-8 overflow-hidden relative">
      <div
        className="marquee-track flex items-center gap-0 whitespace-nowrap"
        style={{ "--marquee-duration": "30s", width: "max-content" } as React.CSSProperties}
      >
        {doubled.map((city, i) => (
          <span key={`${city}-${i}`} className="flex items-center gap-0">
            <span className="font-[family-name:var(--font-display)] text-[clamp(24px,3vw,36px)] font-bold uppercase text-white tracking-[0.04em] px-6">
              {city}
            </span>
            <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
          </span>
        ))}
      </div>
    </section>
  );
}
