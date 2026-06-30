"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import { Locale, t } from "@/data/translations";

interface Times {
  fajr: string; sunrise: string; dhuhr: string; asr: string; maghrib: string; isha: string;
}

const ICONS: Record<string, string> = { fajr: "\u{1F319}", sunrise: "\u{1F305}", dhuhr: "\u{2600}\u{FE0F}", asr: "\u{1F324}", maghrib: "\u{1F307}", isha: "\u{2728}" };

const PLACEHOLDER_TIMES: Times = { fajr: "--:--", sunrise: "--:--", dhuhr: "--:--", asr: "--:--", maghrib: "--:--", isha: "--:--" };

function formatDateUz(d: Date): string {
  const weekdays = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
  const months = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
  return `${weekdays[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDate(d: Date, locale: Locale): string {
  if (locale === "ru") return d.toLocaleDateString("ru-RU", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  if (locale === "en") return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  if (locale === "uz-cyrl") {
    const weekdays = ["Якшанба", "Душанба", "Сешанба", "Чоршанба", "Пайшанба", "Жума", "Шанба"];
    const months = ["январ", "феврал", "март", "апрел", "май", "июн", "июл", "август", "сентябр", "октябр", "ноябр", "декабр"];
    return `${weekdays[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }
  return formatDateUz(d);
}

export function PrayerTimes({ locale }: { locale: Locale }) {
  const [times, setTimes] = useState<Times | null>(null);
  const [city, setCity] = useState("");
  const [countdown, setCountdown] = useState("");
  const [nextPrayer, setNextPrayer] = useState("fajr");
  const [date] = useState(() => formatDate(new Date(), locale));
  const cardRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const fetchTimes = useCallback(async (lat: number, lng: number) => {
    try {
      const d = new Date();
      const ds = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
      const res = await fetch(`https://api.aladhan.com/v1/timings/${ds}?latitude=${lat}&longitude=${lng}&method=3&school=1`);
      const data = await res.json();
      if (data.data?.timings) {
        const tm = data.data.timings;
        const clean = (s: string) => s.replace(/ \(.*\)/, "");
        setTimes({ fajr: clean(tm.Fajr), sunrise: clean(tm.Sunrise), dhuhr: clean(tm.Dhuhr), asr: clean(tm.Asr), maghrib: clean(tm.Maghrib), isha: clean(tm.Isha) });
      }
    } catch { /* silent */ }
  }, []);

  const resolveCity = useCallback(async (lat: number, lng: number) => {
    try {
      const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=${locale}`);
      const data = await res.json();
      const name = data.city || data.locality || data.principalSubdivision || data.countryName;
      if (name) setCity(name);
    } catch {
      // silent — city stays empty until resolved
    }
  }, [locale]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          fetchTimes(p.coords.latitude, p.coords.longitude);
          resolveCity(p.coords.latitude, p.coords.longitude);
        },
        () => {
          setCity("Toshkent");
          fetchTimes(41.2995, 69.2401);
        }
      );
    } else {
      setCity("Toshkent");
      fetchTimes(41.2995, 69.2401);
    }
  }, [fetchTimes, resolveCity]);

  // Countdown — only depends on times, doesn't re-render the whole component
  useEffect(() => {
    if (!times) return;
    const tick = () => {
      const now = new Date();
      const sec = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
      const prayers = ["fajr","dhuhr","asr","maghrib","isha"] as const;
      let next = ""; let nSec = 0;
      for (const p of prayers) {
        const [h,m] = times[p].split(":").map(Number);
        const ps = h*3600+m*60;
        if (ps > sec) { next=p; nSec=ps; break; }
      }
      if (!next) { next="fajr"; const [h,m]=times.fajr.split(":").map(Number); nSec=h*3600+m*60+86400; }
      setNextPrayer(next);
      const d = nSec-sec;
      setCountdown(`${Math.floor(d/3600)}:${String(Math.floor((d%3600)/60)).padStart(2,"0")}:${String(d%60).padStart(2,"0")}`);
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, [times]);

  const displayTimes = times || PLACEHOLDER_TIMES;
  const isLoaded = !!times;

  return (
    <section id="prayer-times" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-3">{t(locale, "hero_title")}</h1>
          <p className="text-text-secondary text-base md:text-lg">
            {city ? <>{city} &mdash; </> : null}{date}
          </p>
          <p className="text-text-muted text-sm mt-1">{t(locale, "hero_method")}</p>
        </div>

        <div ref={cardRef} className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
          {/* Countdown header */}
          <div className="bg-gradient-to-r from-hero-from to-hero-to px-6 py-8 text-center">
            {isLoaded ? (
              <>
                <p className="text-white/70 text-xs uppercase tracking-widest mb-1">{t(locale, nextPrayer)} {t(locale, "countdown_label")}</p>
                <p className="text-white font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tabular-nums">{countdown}</p>
              </>
            ) : (
              <>
                <p className="text-white/70 text-xs uppercase tracking-widest mb-1">&nbsp;</p>
                <div className="flex justify-center">
                  <div className="animate-spin w-7 h-7 border-2 border-white border-t-transparent rounded-full" />
                </div>
              </>
            )}
          </div>

          {/* Times list — always visible, shows --:-- until loaded */}
          <div className="divide-y divide-border-light">
            {(["fajr","sunrise","dhuhr","asr","maghrib","isha"] as const).map((k) => {
              const active = isLoaded && k === nextPrayer;
              return (
                <div key={k} className={`flex items-center justify-between px-6 py-4 ${active ? "bg-primary-soft" : "hover:bg-surface-muted"} transition-colors`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl w-8 text-center">{ICONS[k]}</span>
                    <div>
                      <p className={`font-medium text-sm ${active ? "text-primary font-semibold" : "text-text"}`}>{t(locale, k)}</p>
                      {active && <p className="text-primary text-[11px]">{t(locale, "next_prayer")}</p>}
                    </div>
                  </div>
                  <time className={`font-[family-name:var(--font-display)] text-xl font-bold tabular-nums ${active ? "text-primary" : isLoaded ? "text-text" : "text-text-muted"}`}>
                    {displayTimes[k]}
                  </time>
                </div>
              );
            })}
          </div>
        </div>

        {/* Download as image button */}
        {isLoaded && (
          <div className="mt-4 text-center">
            <button
              onClick={async () => {
                if (!cardRef.current) return;
                try {
                  const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, backgroundColor: "#FAFAF7" });
                  const link = document.createElement("a");
                  link.download = `namoz-vaqtlari-${city || "bugun"}.png`;
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
