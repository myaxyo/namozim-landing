"use client";
import { useState, useEffect } from "react";
import { City, getCityName } from "@/data/cities";
import { CITIES } from "@/data/cities";
import { PrayerInfo, getPrayerName, getPrayerDesc, PRAYERS } from "@/data/prayers";
import { Locale, t } from "@/data/translations";
import { type Place, type Times, getPrayerTimes } from "@/lib/prayerTimes";

type TimeKey = keyof Times;

/** Prayer slug → timing key. */
const SLUG_TO_KEY: Record<string, TimeKey> = {
  bomdod: "fajr",
  peshin: "dhuhr",
  asr: "asr",
  shom: "maghrib",
  xufton: "isha",
};

/** When each prayer's time ends (start of the next period). */
const END_KEY: Record<TimeKey, TimeKey> = {
  fajr: "sunrise",
  sunrise: "dhuhr",
  dhuhr: "asr",
  asr: "maghrib",
  maghrib: "isha",
  isha: "fajr", // next day's Fajr; today's value is a close approximation
};

const L: Record<Locale, { today: string; starts: string; ends: string; monthly: string; title: (p: string, c: string) => string }> = {
  uz: { today: "Bugun", starts: "Kirish vaqti", ends: "Tugash vaqti", monthly: "Oylik taqvim", title: (p, c) => `${p} vaqti — ${c}` },
  "uz-cyrl": { today: "Бугун", starts: "Кириш вақти", ends: "Тугаш вақти", monthly: "Ойлик тақвим", title: (p, c) => `${p} вақти — ${c}` },
  ru: { today: "Сегодня", starts: "Начало", ends: "Окончание", monthly: "Месячный календарь", title: (p, c) => `${p} — время намаза, ${c}` },
  en: { today: "Today", starts: "Starts", ends: "Ends", monthly: "Monthly calendar", title: (p, c) => `${p} Time — ${c}` },
  tg: { today: "Имрӯз", starts: "Оғоз", ends: "Анҷом", monthly: "Тақвими моҳона", title: (p, c) => `Вақти ${p} — ${c}` },
  ky: { today: "Бүгүн", starts: "Башталышы", ends: "Бүтүшү", monthly: "Айлык календарь", title: (p, c) => `${p} убактысы — ${c}` },
};

export function PrayerPage({
  city,
  prayer,
  locale,
  place,
  initialTimes,
}: {
  city: City;
  prayer: PrayerInfo;
  locale: Locale;
  place: Place;
  /** Server-calculated times so the answer is in the initial HTML. */
  initialTimes: Times;
}) {
  const [times, setTimes] = useState<Times>(initialTimes);
  const cityName = getCityName(city, locale);
  const prayerName = getPrayerName(prayer, locale);
  const desc = getPrayerDesc(prayer, locale);
  const key = SLUG_TO_KEY[prayer.slug] ?? "fajr";
  const endKey = END_KEY[key];
  const s = L[locale] ?? L.uz;

  // Recalculate in the browser: the cached HTML may be from an earlier day.
  useEffect(() => {
    const id = setTimeout(() => setTimes(getPrayerTimes(place)), 0);
    return () => clearTimeout(id);
  }, [place.lat, place.lng, place.method, place.offsetMin, place.timeZone]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-10">
          <span className="text-5xl mb-4 block" aria-hidden="true">{prayer.icon}</span>
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-3">
            {s.title(prayerName, cityName)}
          </h1>
          <p className="text-text-muted text-sm">{t(locale, place.method === "uzbekistan" ? "method_uz" : "hero_method")}</p>
        </div>

        {/* Big time display */}
        <div className="bg-gradient-to-r from-hero-from to-hero-to rounded-2xl p-10 text-center mb-8">
          {(
            <>
              <p className="text-white/70 text-sm uppercase tracking-wider mb-2">
                {s.today} · {s.starts}
              </p>
              <p className="text-white font-[family-name:var(--font-display)] text-6xl md:text-7xl font-bold tabular-nums">
                <time>{times[key]}</time>
              </p>
              <p className="text-white/80 text-base mt-4">
                {s.ends}: <time className="font-semibold tabular-nums">{key === "isha" ? "≈ " : ""}{times[endKey]}</time>
              </p>
            </>
          )}
        </div>

        {/* Description */}
        <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
          <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
        </div>

        {/* Other prayers for this city, with today's times */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-text mb-3">
            {locale === "ru" ? "Все намазы" : locale === "en" ? "All prayers" : locale === "uz-cyrl" ? "Барча намозлар" : "Barcha namozlar"} — {cityName}:
          </h2>
          <div className="flex flex-wrap gap-2">
            {PRAYERS.filter((p) => p.slug !== prayer.slug).map((p) => {
              const k = SLUG_TO_KEY[p.slug];
              return (
                <a key={p.slug} href={`/${locale}/${city.slug}/${p.slug}`}
                  className="bg-surface-muted border border-border px-4 py-2 rounded-full text-sm text-text-secondary hover:text-primary hover:border-primary transition-colors flex items-center gap-2">
                  <span aria-hidden="true">{p.icon}</span>
                  {getPrayerName(p, locale)}
                  {k && <time className="font-semibold tabular-nums text-text">{times[k]}</time>}
                </a>
              );
            })}
          </div>
          <a href={`/${locale}/${city.slug}/oylik`} className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline mt-4">
            {s.monthly} &rarr;
          </a>
        </div>

        {/* Same prayer in other cities */}
        <div>
          <h2 className="text-sm font-semibold text-text mb-3">
            {prayerName} {locale === "ru" ? "в других городах:" : locale === "en" ? "in other cities:" : locale === "uz-cyrl" ? "бошқа шаҳарларда:" : "boshqa shaharlarda:"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {CITIES.filter((c) => c.slug !== city.slug).slice(0, 12).map((c) => (
              <a key={c.slug} href={`/${locale}/${c.slug}/${prayer.slug}`}
                className="bg-surface-muted border border-border px-3 py-1.5 rounded-full text-xs text-text-secondary hover:text-primary hover:border-primary transition-colors">
                {getCityName(c, locale)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
