"use client";

import { useState, useEffect, useCallback } from "react";

interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  sunrise: string;
}

const PRAYER_NAMES: Record<string, string> = {
  fajr: "Bomdod",
  dhuhr: "Peshin",
  asr: "Asr",
  maghrib: "Shom",
  isha: "Xufton",
};

const PRAYER_ICONS: Record<string, string> = {
  fajr: "\u{1F319}",
  dhuhr: "\u{2600}\u{FE0F}",
  asr: "\u{1F324}",
  maghrib: "\u{1F305}",
  isha: "\u{2728}",
};

export function PrayerTimesWidget() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Toshkent");
  const [countdown, setCountdown] = useState("");
  const [nextPrayer, setNextPrayer] = useState("fajr");
  const [error, setError] = useState("");

  const fetchPrayerTimes = useCallback(async (lat: number, lng: number) => {
    try {
      setLoading(true);
      setError("");
      const today = new Date();
      const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
      const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=3&school=1`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.data?.timings) {
        const t = data.data.timings;
        setPrayerTimes({
          fajr: t.Fajr.replace(/ \(.*\)/, ""),
          dhuhr: t.Dhuhr.replace(/ \(.*\)/, ""),
          asr: t.Asr.replace(/ \(.*\)/, ""),
          maghrib: t.Maghrib.replace(/ \(.*\)/, ""),
          isha: t.Isha.replace(/ \(.*\)/, ""),
          sunrise: t.Sunrise.replace(/ \(.*\)/, ""),
        });
      }
    } catch {
      setError("Namoz vaqtlarini yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchPrayerTimes(pos.coords.latitude, pos.coords.longitude);
          setCity("Joylashuvingiz");
        },
        () => fetchPrayerTimes(41.2995, 69.2401)
      );
    } else {
      fetchPrayerTimes(41.2995, 69.2401);
    }
  }, [fetchPrayerTimes]);

  useEffect(() => {
    if (!prayerTimes) return;

    const updateCountdown = () => {
      const now = new Date();
      const currentSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const prayers = ["fajr", "dhuhr", "asr", "maghrib", "isha"] as const;

      let next = "";
      let nextSec = 0;

      for (const p of prayers) {
        const [h, m] = prayerTimes[p].split(":").map(Number);
        const pSec = h * 3600 + m * 60;
        if (pSec > currentSec) {
          next = p;
          nextSec = pSec;
          break;
        }
      }

      if (!next) {
        next = "fajr";
        const [h, m] = prayerTimes.fajr.split(":").map(Number);
        nextSec = h * 3600 + m * 60 + 86400;
      }

      setNextPrayer(next);
      const diff = nextSec - currentSec;
      const hrs = Math.floor(diff / 3600);
      const mins = Math.floor((diff % 3600) / 60);
      const secs = diff % 60;
      setCountdown(`${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  return (
    <section id="prayer-times" className="py-20 md:py-28 bg-background-secondary pattern-bg">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-surface px-4 py-2 rounded-full mb-4">
            <span className="text-ornament text-xs font-medium uppercase tracking-wider">Jonli</span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-4">
            Bugungi namoz vaqtlari
          </h2>
          <p className="text-text-secondary text-lg">{city} — Hanafiy mazhab, Muslim World League usuli</p>
        </div>

        {loading ? (
          <div className="bg-surface rounded-3xl border border-border-light p-10 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-text-secondary">Yuklanmoqda...</p>
          </div>
        ) : error ? (
          <div className="bg-surface rounded-3xl border border-border-light p-10 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="bg-surface rounded-3xl border border-border-light overflow-hidden shadow-lg shadow-primary/5">
            <div className="bg-gradient-to-r from-hero-from to-hero-to p-8 text-center">
              <p className="text-white/70 text-sm uppercase tracking-wider mb-1">
                {PRAYER_NAMES[nextPrayer]} namozigacha
              </p>
              <p className="text-white font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight">
                {countdown}
              </p>
            </div>

            <div className="divide-y divide-border-light">
              {(["fajr", "dhuhr", "asr", "maghrib", "isha"] as const).map((key) => {
                const isNext = key === nextPrayer;
                return (
                  <div key={key} className={`flex items-center justify-between px-8 py-5 transition-colors ${isNext ? "bg-primary-soft" : "hover:bg-surface-muted"}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{PRAYER_ICONS[key]}</span>
                      <div>
                        <p className={`font-medium ${isNext ? "text-primary font-bold" : "text-text"}`}>{PRAYER_NAMES[key]}</p>
                        {isNext && <p className="text-primary text-xs font-medium">Keyingi namoz</p>}
                      </div>
                    </div>
                    <p className={`font-[family-name:var(--font-display)] text-2xl font-bold ${isNext ? "text-primary" : "text-text"}`}>
                      {prayerTimes?.[key]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <p className="text-text-tertiary text-sm mb-3">Eslatmalar va to&apos;liq funksiyalar uchun ilovani yuklab oling</p>
          <a href="https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-text-on-primary px-6 py-3 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors">
            Google Play dan yuklab olish &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
