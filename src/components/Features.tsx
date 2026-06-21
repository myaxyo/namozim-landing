const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Aniq namoz vaqtlari",
    description:
      "Joylashuvingizga asoslangan aniq namoz vaqtlari. Hanafiy mazhabiga mos Muslim World League usuli.",
    color: "from-primary to-primary-dark",
    bgColor: "bg-primary-soft",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
      </svg>
    ),
    title: "Tasbih hisoblagich",
    description:
      "SubhanAllah, Alhamdulillah, Allohu Akbar zikrlari uchun qulay hisoblagich. Maqsad belgilash va tarix.",
    color: "from-accent to-accent-dark",
    bgColor: "bg-amber-50",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-4 4 4 5-5" />
      </svg>
    ),
    title: "Namoz kuzatish",
    description:
      "Kundalik namozlaringizni belgilang. Haftalik va oylik statistika, ketma-ketlik hisobi.",
    color: "from-hero-from to-hero-to",
    bgColor: "bg-teal-50",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    title: "Eslatmalar",
    description:
      "Har bir namoz uchun alohida bildirishnoma. Namozdan oldin eslatma va tinch soatlar rejimi.",
    color: "from-rose-500 to-rose-700",
    bgColor: "bg-rose-50",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2" />
        <path d="M12 6v6" />
        <path d="M16.24 7.76l-4.24 4.24" />
      </svg>
    ),
    title: "Jonli countdown",
    description:
      "Keyingi namozgacha qolgan vaqt soniyalargacha aniq ko'rsatiladi. Hech qachon kechikmaslik uchun.",
    color: "from-indigo-500 to-indigo-700",
    bgColor: "bg-indigo-50",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 2v4M16 2v4" />
      </svg>
    ),
    title: "4 til",
    description:
      "O'zbekcha (lotin), Ўзбекча (кирил), Русский va English tillarida to'liq qo'llab-quvvatlash.",
    color: "from-violet-500 to-violet-700",
    bgColor: "bg-violet-50",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-surface-muted px-4 py-2 rounded-full mb-4">
            <span className="text-ornament text-xs font-medium uppercase tracking-wider">
              Imkoniyatlar
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
            Barcha kerakli funksiyalar
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Namozim — kundalik ibodatingiz uchun zarur bo&apos;lgan barcha vositalarni bitta ilovada jamladi.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-surface rounded-2xl border border-border-light p-6 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-text mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
