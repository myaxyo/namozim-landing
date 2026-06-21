const CITIES = [
  "Toshkent", "Samarqand", "Buxoro", "Namangan", "Andijon", "Farg'ona",
  "Qarshi", "Nukus", "Navoiy", "Jizzax", "Urganch", "Termiz",
  "Chirchiq", "Qo'qon", "Marg'ilon", "Guliston", "Shahrisabz", "Xiva",
  "Olmaliq", "Angren", "Denov", "Bekobod", "Zarafshon", "Kogon",
];

export function Cities() {
  return (
    <section id="cities" className="py-16 md:py-20 bg-bg-warm pattern-bg">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-text mb-2">
            O&apos;zbekiston shaharlari bo&apos;yicha namoz vaqtlari
          </h2>
          <p className="text-text-secondary text-sm">
            30+ shahar uchun aniq namoz vaqtlari avtomatik joylashuv asosida hisoblanadi
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {CITIES.map((c) => (
            <span key={c} className="bg-surface border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:border-primary hover:text-primary transition-colors cursor-default">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
