"use client";
import { useState, useEffect } from "react";
import { City, getCityName } from "@/data/cities";
import { Locale, t } from "@/data/translations";
import { type MonthTimes, type Place, getMonthPrayerTimes } from "@/lib/prayerTimes";
import { monthYear } from "@/lib/seoCopy";

export function MonthlyCalendar({
  city,
  locale,
  place,
  initial,
}: {
  city: City;
  locale: Locale;
  place: Place;
  /** Server-calculated month so the whole table is in the initial HTML. */
  initial: MonthTimes;
}) {
  const [month, setMonth] = useState<MonthTimes>(initial);
  const name = getCityName(city, locale);
  const monthLabel = monthYear(locale, true, new Date(month.year, month.month - 1, 15));

  // Recalculate in the browser: the cached HTML may be from an earlier day/month.
  useEffect(() => {
    const id = setTimeout(() => setMonth(getMonthPrayerTimes(place)), 0);
    return () => clearTimeout(id);
  }, [place.lat, place.lng, place.method, place.offsetMin, place.timeZone]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="max-w-5xl mx-auto px-5">
      <div className="text-center mb-10">
        <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-text mb-2">
          {locale === "ru" ? "Месячный календарь" : locale === "en" ? "Monthly Calendar" : locale === "uz-cyrl" ? "Ойлик тақвим" : "Oylik taqvim"} — {name}
        </h1>
        <p className="text-text-secondary">{monthLabel}</p>
        <p className="text-text-muted text-sm mt-1">{t(locale, place.method === "uzbekistan" ? "method_uz" : "hero_method")}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-gradient-to-r from-hero-from to-hero-to text-white">
              <th className="py-3 px-3 text-left font-medium">{locale === "ru" ? "День" : locale === "en" ? "Day" : locale === "uz-cyrl" ? "Кун" : "Kun"}</th>
              <th className="py-3 px-3 font-medium">{t(locale, "fajr")}</th>
              <th className="py-3 px-3 font-medium">{t(locale, "sunrise")}</th>
              <th className="py-3 px-3 font-medium">{t(locale, "dhuhr")}</th>
              <th className="py-3 px-3 font-medium">{t(locale, "asr")}</th>
              <th className="py-3 px-3 font-medium">{t(locale, "maghrib")}</th>
              <th className="py-3 px-3 font-medium">{t(locale, "isha")}</th>
            </tr>
          </thead>
          <tbody>
            {month.days.map((d) => (
              <tr key={d.day} className={`border-b border-border-light ${d.day === month.today ? "bg-primary-soft font-semibold" : "hover:bg-surface-muted"}`}>
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

      <div className="mt-8 text-center">
        <a href={`/${locale}/${city.slug}`} className="text-primary text-sm font-medium hover:underline">
          &larr; {locale === "ru" ? "Назад к" : locale === "en" ? "Back to" : locale === "uz-cyrl" ? "Қайтиш:" : "Qaytish:"} {name}
        </a>
      </div>
    </div>
  );
}
