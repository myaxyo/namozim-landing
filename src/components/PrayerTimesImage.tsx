"use client";
import { Locale, t } from "@/data/translations";

/**
 * Visual prayer times card rendered as HTML but styled to look like an infographic.
 * Google Images indexes visible content on pages — this gives us image-search presence.
 */
export function PrayerTimesImage({ locale, city, times }: {
  locale: Locale;
  city: string;
  times: { fajr: string; dhuhr: string; asr: string; maghrib: string; isha: string } | null;
}) {
  if (!times) return null;

  const prayers = locale === "ru"
    ? [{ n: "Фаджр", t: times.fajr, i: "🌙" }, { n: "Зухр", t: times.dhuhr, i: "☀️" }, { n: "Аср", t: times.asr, i: "🌤" }, { n: "Магриб", t: times.maghrib, i: "🌅" }, { n: "Иша", t: times.isha, i: "✨" }]
    : locale === "en"
    ? [{ n: "Fajr", t: times.fajr, i: "🌙" }, { n: "Dhuhr", t: times.dhuhr, i: "☀️" }, { n: "Asr", t: times.asr, i: "🌤" }, { n: "Maghrib", t: times.maghrib, i: "🌅" }, { n: "Isha", t: times.isha, i: "✨" }]
    : [{ n: "Bomdod", t: times.fajr, i: "🌙" }, { n: "Peshin", t: times.dhuhr, i: "☀️" }, { n: "Asr", t: times.asr, i: "🌤" }, { n: "Shom", t: times.maghrib, i: "🌅" }, { n: "Xufton", t: times.isha, i: "✨" }];

  return (
    <figure className="my-8" aria-label={`${city} namoz vaqtlari`}>
      <div className="bg-gradient-to-br from-hero-from to-hero-to rounded-2xl p-6 max-w-md mx-auto">
        <p className="text-white/60 text-xs uppercase tracking-wider text-center mb-1">{t(locale, "hero_method")}</p>
        <h3 className="text-white text-center font-[family-name:var(--font-display)] text-2xl font-bold mb-4">{city}</h3>
        <div className="space-y-2">
          {prayers.map((p) => (
            <div key={p.n} className="flex items-center justify-between bg-white/10 rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">{p.i}</span>
                <span className="text-white text-sm font-medium">{p.n}</span>
              </div>
              <span className="text-white text-lg font-bold tabular-nums">{p.t}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="text-center text-text-muted text-xs mt-2">
        {locale === "ru" ? `Время намаза ${city} сегодня` : locale === "en" ? `Prayer times ${city} today` : `${city} namoz vaqtlari bugun`}
      </figcaption>
    </figure>
  );
}
