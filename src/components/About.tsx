import { Locale, t } from "@/data/translations";

export function About({ locale }: { locale: Locale }) {
  const features = [
    { icon: "\u{23F0}", key: "feat_times" },
    { icon: "\u{1F4FF}", key: "feat_tasbih" },
    { icon: "\u{1F4CA}", key: "feat_tracker" },
    { icon: "\u{1F514}", key: "feat_notif" },
    { icon: "\u{1F30D}", key: "feat_lang" },
    { icon: "\u{1F319}", key: "feat_dark" },
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-text mb-2">{t(locale, "about_title")}</h2>
          <p className="text-text-secondary text-sm max-w-xl mx-auto">{t(locale, "about_subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.key} className="bg-surface border border-border rounded-xl p-5 hover:shadow-sm transition-shadow">
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h3 className="font-semibold text-sm text-text mb-1">{t(locale, f.key)}</h3>
              <p className="text-text-muted text-xs leading-relaxed">{t(locale, f.key + "_d")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
