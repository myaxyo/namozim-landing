export function About() {
  const features = [
    { icon: "\u{23F0}", title: "Aniq namoz vaqtlari", desc: "Hanafiy mazhabiga mos, joylashuvga asoslangan hisoblash" },
    { icon: "\u{1F4FF}", title: "Tasbih hisoblagich", desc: "33, 99, 100 — istalgan maqsad bilan zikr qiling" },
    { icon: "\u{1F4CA}", title: "Namoz kuzatish", desc: "Kunlik, haftalik, oylik statistika va streak" },
    { icon: "\u{1F514}", title: "Eslatmalar", desc: "Har bir namoz uchun oldindan bildirishnoma" },
    { icon: "\u{1F30D}", title: "4 til", desc: "O'zbekcha (lotin/kirill), Ruscha, Inglizcha" },
    { icon: "\u{1F319}", title: "Qorong'u rejim", desc: "Ko'zni charchatmaydigan tungi mavzu" },
  ];

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-5">
        <div className="text-center mb-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-text mb-2">
            Namozim ilovasi haqida
          </h2>
          <p className="text-text-secondary text-sm max-w-xl mx-auto">
            Namoz vaqtlaridan tashqari tasbih, namoz kuzatish va boshqa qulay funksiyalar — barchasi bitta ilovada.
            Ilovani yuklab oling yoki saytda namoz vaqtlarini tekshiring.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-surface border border-border rounded-xl p-5 hover:shadow-sm transition-shadow">
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h3 className="font-semibold text-sm text-text mb-1">{f.title}</h3>
              <p className="text-text-muted text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
