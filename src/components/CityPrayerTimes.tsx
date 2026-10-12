"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import { City, getCityName, getCityRegion } from "@/data/cities";
import { Locale, t } from "@/data/translations";
import { type Place, type Times, getPrayerTimes, secondsNowIn } from "@/lib/prayerTimes";

const ICONS: Record<string, string> = { fajr: "\u{1F319}", sunrise: "\u{1F305}", dhuhr: "\u{2600}\u{FE0F}", asr: "\u{1F324}", maghrib: "\u{1F307}", isha: "\u{2728}" };

export function CityPrayerTimes({
  city,
  locale,
  place,
  initialTimes,
}: {
  city: City;
  locale: Locale;
  /** Where/how to calculate (built on the server with placeForCity / placeForDistrict / …). */
  place: Place;
  /** Server-calculated times so they are in the initial HTML (SEO + no spinner). */
  initialTimes: Times;
}) {
  const [times, setTimes] = useState<Times>(initialTimes);
  const [countdown, setCountdown] = useState("");
  const [nextPrayer, setNextPrayer] = useState("fajr");
  const [date, setDate] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  const formatDate = (d: Date): string => {
    if (locale === "ru") return d.toLocaleDateString("ru-RU", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    if (locale === "en") return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    if (locale === "uz-cyrl") {
      const weekdays = ["Якшанба", "Душанба", "Сешанба", "Чоршанба", "Пайшанба", "Жума", "Шанба"];
      const months = ["январ", "феврал", "март", "апрел", "май", "июн", "июл", "август", "сентябр", "октябр", "ноябр", "декабр"];
      return `${weekdays[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }
    const weekdays = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
    const months = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
    return `${weekdays[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };
  const name = getCityName(city, locale);
  const region = getCityRegion(city, locale);

  // Recalculate in the browser: the cached HTML may be from an earlier day.
  const refresh = useCallback(() => {
    setDate(formatDate(new Date()));
    setTimes(getPrayerTimes(place));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place.lat, place.lng, place.method, place.offsetMin, place.timeZone, locale]);

  useEffect(() => {
    const id = setTimeout(refresh, 0);
    return () => clearTimeout(id);
  }, [refresh]);

  useEffect(() => {
    if (!times) return;
    const tick = () => {
      // Seconds since midnight at the place, so the countdown is right in any viewer time zone.
      const sec = secondsNowIn(place.timeZone);
      const prayers = ["fajr","dhuhr","asr","maghrib","isha"] as const;
      let next = ""; let nSec = 0;
      for (const p of prayers) { const [h,m] = times[p].split(":").map(Number); const ps = h*3600+m*60; if (ps > sec) { next=p; nSec=ps; break; } }
      if (!next) { next="fajr"; const [h,m]=times.fajr.split(":").map(Number); nSec=h*3600+m*60+86400; }
      setNextPrayer(next);
      const d = nSec-sec;
      setCountdown(`${Math.floor(d/3600)}:${String(Math.floor((d%3600)/60)).padStart(2,"0")}:${String(d%60).padStart(2,"0")}`);
    };
    tick(); const i = setInterval(tick, 1000); return () => clearInterval(i);
  }, [times, place.timeZone]);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-3">
            {t(locale, "nav_prayer_times")} — {name}
          </h1>
          <p className="text-text-secondary text-base md:text-lg">{region} &mdash; {date}</p>
          <p className="text-text-muted text-sm mt-1">{t(locale, place.method === "uzbekistan" ? "method_uz" : "hero_method")}</p>
        </div>

        {(
          <div ref={cardRef} className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-hero-from to-hero-to px-6 py-8 text-center">
              <p className="text-white/70 text-xs uppercase tracking-widest mb-1">{t(locale, nextPrayer)} {t(locale, "countdown_label")}</p>
              <p className="text-white font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tabular-nums">{countdown}</p>
              <p className="text-white/50 text-xs mt-2">{name}</p>
            </div>
            <div className="divide-y divide-border-light">
              {(["fajr","sunrise","dhuhr","asr","maghrib","isha"] as const).map((k) => {
                const active = k === nextPrayer;
                return (
                  <div key={k} className={`flex items-center justify-between px-6 py-4 ${active ? "bg-primary-soft" : "hover:bg-surface-muted"} transition-colors`}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl w-8 text-center">{ICONS[k]}</span>
                      <div>
                        <p className={`font-medium text-sm ${active ? "text-primary font-semibold" : "text-text"}`}>{t(locale, k)}</p>
                        {active && <p className="text-primary text-[11px]">{t(locale, "next_prayer")}</p>}
                      </div>
                    </div>
                    <time className={`font-[family-name:var(--font-display)] text-xl font-bold tabular-nums ${active ? "text-primary" : "text-text"}`}>{times[k]}</time>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Download as image button */}
        {(
          <div className="mt-4 text-center">
            <button
              onClick={async () => {
                if (!cardRef.current) return;
                try {
                  const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, backgroundColor: "#FAFAF7" });
                  const link = document.createElement("a");
                  link.download = `namoz-vaqtlari-${name}.png`;
                  link.href = dataUrl;
                  link.click();
                } catch {}
              }}
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary border border-border hover:border-primary px-4 py-2.5 rounded-full transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {locale === "ru" ? "Скачать как картинку" : locale === "en" ? "Download as image" : locale === "uz-cyrl" ? "Расм сифатида юклаш" : "Rasm sifatida yuklash"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
