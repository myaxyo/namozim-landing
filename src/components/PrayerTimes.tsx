"use client";
import { useState, useEffect, useCallback } from "react";
import { Locale, t } from "@/data/translations";

interface Times {
  fajr: string; sunrise: string; dhuhr: string; asr: string; maghrib: string; isha: string;
}

const ICONS: Record<string, string> = { fajr: "\u{1F319}", sunrise: "\u{1F305}", dhuhr: "\u{2600}\u{FE0F}", asr: "\u{1F324}", maghrib: "\u{1F307}", isha: "\u{2728}" };

export function PrayerTimes({ locale }: { locale: Locale }) {
  const [times, setTimes] = useState<Times | null>(null);
  const [city, setCity] = useState("Toshkent");
  const [countdown, setCountdown] = useState("");
  const [nextPrayer, setNextPrayer] = useState("fajr");
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  const dateLocale = locale === "ru" ? "ru-RU" : locale === "en" ? "en-US" : "uz-Latn-UZ";

  const fetchTimes = useCallback(async (lat: number, lng: number) => {
    setLoading(true);
    try {
      const d = new Date();
      setDate(d.toLocaleDateString(dateLocale, { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
      const ds = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
      const res = await fetch(`https://api.aladhan.com/v1/timings/${ds}?latitude=${lat}&longitude=${lng}&method=3&school=1`);
      const data = await res.json();
      if (data.data?.timings) {
        const tm = data.data.timings;
        const clean = (s: string) => s.replace(/ \(.*\)/, "");
        setTimes({ fajr: clean(tm.Fajr), sunrise: clean(tm.Sunrise), dhuhr: clean(tm.Dhuhr), asr: clean(tm.Asr), maghrib: clean(tm.Maghrib), isha: clean(tm.Isha) });
      }
    } catch { /* silent */ }
    setLoading(false);
  }, [dateLocale]);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => { fetchTimes(p.coords.latitude, p.coords.longitude); setCity(t(locale, "location_auto")); },
        () => fetchTimes(41.2995, 69.2401)
      );
    } else fetchTimes(41.2995, 69.2401);
  }, [fetchTimes, locale]);

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
    tick(); const i = setInterval(tick, 1000); return () => clearInterval(i);
  }, [times]);

  return (
    <section id="prayer-times" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-5">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-3">{t(locale, "hero_title")}</h1>
          <p className="text-text-secondary text-base md:text-lg">{city} &mdash; {date}</p>
          <p className="text-text-muted text-sm mt-1">{t(locale, "hero_method")}</p>
        </div>

        {loading ? (
          <div className="bg-surface rounded-2xl border border-border p-12 text-center">
            <div className="animate-spin w-7 h-7 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        ) : times && (
          <div className="bg-surface rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-hero-from to-hero-to px-6 py-8 text-center">
              <p className="text-white/70 text-xs uppercase tracking-widest mb-1">{t(locale, nextPrayer)} {t(locale, "countdown_label")}</p>
              <p className="text-white font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold tabular-nums">{countdown}</p>
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
      </div>
    </section>
  );
}
