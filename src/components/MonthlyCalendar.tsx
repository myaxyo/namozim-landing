"use client";
import { useState, useEffect } from "react";
import { City, getCityName } from "@/data/cities";
import { Locale, t } from "@/data/translations";

interface DayTimes {
  day: number;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export function MonthlyCalendar({ city, locale }: { city: City; locale: Locale }) {
  const [days, setDays] = useState<DayTimes[]>([]);
  const [loading, setLoading] = useState(true);
  const [monthLabel, setMonthLabel] = useState("");
  const name = getCityName(city, locale);

  useEffect(() => {
    const fetchMonth = async () => {
      setLoading(true);
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const dateLocale = locale === "ru" ? "ru-RU" : locale === "en" ? "en-US" : "uz-Latn-UZ";
      setMonthLabel(now.toLocaleDateString(dateLocale, { month: "long", year: "numeric" }));

      try {
        const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${city.lat}&longitude=${city.lng}&method=3&school=1`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.data) {
          const clean = (s: string) => s.replace(/ \(.*\)/, "");
          const parsed: DayTimes[] = data.data.map((d: any, i: number) => ({
            day: i + 1,
            fajr: clean(d.timings.Fajr),
            sunrise: clean(d.timings.Sunrise),
            dhuhr: clean(d.timings.Dhuhr),
            asr: clean(d.timings.Asr),
            maghrib: clean(d.timings.Maghrib),
            isha: clean(d.timings.Isha),
          }));
          setDays(parsed);
        }
      } catch {}
      setLoading(false);
    };
    fetchMonth();
  }, [city, locale]);

  const today = new Date().getDate();

  return (
    <div className="max-w-5xl mx-auto px-5">
      <div className="text-center mb-10">
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-text mb-2">
          {locale === "ru" ? "Месячный календарь" : locale === "en" ? "Monthly Calendar" : "Oylik taqvim"} — {name}
        </h1>
        <p className="text-text-secondary capitalize">{monthLabel}</p>
        <p className="text-text-muted text-sm mt-1">{t(locale, "hero_method")}</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-7 h-7 border-2 border-primary border-t-transparent rounded-full mx-auto" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-gradient-to-r from-hero-from to-hero-to text-white">
                <th className="py-3 px-3 text-left font-medium">{locale === "ru" ? "День" : locale === "en" ? "Day" : "Kun"}</th>
                <th className="py-3 px-3 font-medium">{t(locale, "fajr")}</th>
                <th className="py-3 px-3 font-medium">{t(locale, "sunrise")}</th>
                <th className="py-3 px-3 font-medium">{t(locale, "dhuhr")}</th>
                <th className="py-3 px-3 font-medium">{t(locale, "asr")}</th>
                <th className="py-3 px-3 font-medium">{t(locale, "maghrib")}</th>
                <th className="py-3 px-3 font-medium">{t(locale, "isha")}</th>
              </tr>
            </thead>
            <tbody>
              {days.map((d) => (
                <tr key={d.day} className={`border-b border-border-light ${d.day === today ? "bg-primary-soft font-semibold" : "hover:bg-surface-muted"}`}>
                  <td className="py-2.5 px-3 font-medium">{d.day}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums">{d.fajr}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums">{d.sunrise}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums">{d.dhuhr}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums">{d.asr}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums">{d.maghrib}</td>
                  <td className="py-2.5 px-3 text-center tabular-nums">{d.isha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 text-center">
        <a href={`/${locale}/${city.slug}`} className="text-primary text-sm font-medium hover:underline">
          &larr; {locale === "ru" ? "Назад к" : locale === "en" ? "Back to" : "Qaytish:"} {name}
        </a>
      </div>
    </div>
  );
}
