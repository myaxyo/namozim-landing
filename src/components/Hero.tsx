export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden pattern-bg">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary-soft px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-xs font-medium uppercase tracking-wider">
                Hanafiy mazhab
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6">
              Namoz vaqtlari —{" "}
              <span className="gradient-text">aniq va qulay</span>
            </h1>

            <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              O&apos;zbekistonning barcha shaharlari uchun aniq namoz vaqtlari, tasbih
              hisoblagich va namoz kuzatish. Bepul islomiy ilova.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-gradient-to-r from-hero-from to-hero-to text-white px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-80 uppercase">Yuklab olish</div>
                  <div className="text-sm font-semibold -mt-0.5">Google Play</div>
                </div>
              </a>

              <a
                href="#prayer-times"
                className="flex items-center gap-2 text-text-secondary hover:text-primary px-6 py-4 rounded-2xl border border-border hover:border-primary/30 transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="text-sm font-medium">Namoz vaqtlarini ko&apos;rish</span>
              </a>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start">
              <div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-text">30+</div>
                <div className="text-xs text-text-tertiary">Shaharlar</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-text">5</div>
                <div className="text-xs text-text-tertiary">Vaqt namoz</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="font-[family-name:var(--font-display)] text-2xl font-bold text-text">4</div>
                <div className="text-xs text-text-tertiary">Tillar</div>
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex-shrink-0">
            <div className="relative w-72 h-[580px]">
              {/* Phone frame */}
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-hero-from to-hero-to p-1 shadow-2xl shadow-primary/20">
                <div className="w-full h-full rounded-[2.75rem] bg-background overflow-hidden flex flex-col">
                  {/* Status bar */}
                  <div className="h-12 bg-gradient-to-r from-hero-from to-hero-to flex items-center justify-center">
                    <div className="w-20 h-5 bg-black/20 rounded-full" />
                  </div>
                  {/* App content mockup */}
                  <div className="flex-1 p-5 flex flex-col">
                    <div className="bg-gradient-to-br from-hero-from to-hero-to rounded-2xl p-5 mb-4">
                      <p className="text-white/70 text-[10px] uppercase tracking-wider mb-1">Keyingi namoz</p>
                      <p className="text-white font-[family-name:var(--font-display)] text-3xl font-bold">Peshin</p>
                      <p className="text-white/90 font-[family-name:var(--font-display)] text-xl">12:15</p>
                      <div className="mt-3 h-px bg-white/20" />
                      <p className="text-white font-[family-name:var(--font-display)] text-2xl font-bold mt-2">2:34:12</p>
                      <p className="text-white/60 text-xs mt-1">Toshkent, O&apos;zbekiston</p>
                    </div>
                    {/* Prayer list mockup */}
                    {[
                      { name: "Bomdod", time: "04:18", color: "bg-purple-100 text-purple-600" },
                      { name: "Peshin", time: "12:15", color: "bg-amber-100 text-amber-600" },
                      { name: "Asr", time: "16:42", color: "bg-orange-100 text-orange-600" },
                      { name: "Shom", time: "19:38", color: "bg-rose-100 text-rose-600" },
                      { name: "Xufton", time: "21:02", color: "bg-blue-100 text-blue-600" },
                    ].map((p) => (
                      <div key={p.name} className="flex items-center justify-between py-2.5 border-b border-border-light last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-xs font-bold`}>
                            {p.name[0]}
                          </div>
                          <span className="text-sm font-medium text-text">{p.name}</span>
                        </div>
                        <span className="text-sm font-[family-name:var(--font-display)] font-bold text-text">{p.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
