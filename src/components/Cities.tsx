import { CITIES } from "@/data/cities";

export function Cities() {
  return (
    <section id="cities" className="py-16 md:py-20 bg-bg-warm pattern-bg">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-text mb-2">
            O&apos;zbekiston shaharlari bo&apos;yicha namoz vaqtlari
          </h2>
          <p className="text-text-secondary text-sm">
            Shaharni tanlang — aniq namoz vaqtlarini ko&apos;ring
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {CITIES.map((c) => (
            <a
              key={c.slug}
              href={`/${c.slug}`}
              className="bg-surface border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:border-primary hover:text-primary hover:bg-primary-soft transition-colors"
            >
              {c.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
