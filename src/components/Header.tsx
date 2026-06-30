"use client";
import { useState } from "react";
import { Locale, t } from "@/data/translations";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const locales: Locale[] = ["uz", "uz-cyrl", "ru", "en"];
  const labels: Record<Locale, string> = { uz: "UZ", "uz-cyrl": "ЎЗ", ru: "RU", en: "EN" };

  return (
    <header className="sticky top-0 z-50 bg-surface/85 backdrop-blur-lg border-b border-border-light">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <a href={`/${locale}`} className="flex items-center gap-2.5">
          <img src="/icon-192.png" alt="Namozim" width={32} height={32} className="rounded-lg" />
          <span className="font-[family-name:var(--font-display)] text-lg font-bold text-text">{t(locale, "site_name")}</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
          <a href={`/${locale}#prayer-times`} className="hover:text-primary transition-colors">{t(locale, "nav_prayer_times")}</a>
          <a href={`/${locale}/shaharlar`} className="hover:text-primary transition-colors">{t(locale, "nav_cities")}</a>
          <a href={`/${locale}#about`} className="hover:text-primary transition-colors">{t(locale, "nav_about")}</a>

          {/* Language switcher */}
          <div className="flex items-center border border-border rounded-full overflow-hidden text-xs">
            {locales.map((l) => (
              <a key={l} href={`/${l}`}
                className={`px-2.5 py-1.5 transition-colors ${l === locale ? "bg-primary text-text-on-primary" : "hover:bg-surface-muted"}`}>
                {labels[l]}
              </a>
            ))}
          </div>

          <a href={`/${locale}#download`} className="bg-primary text-text-on-primary px-4 py-2 rounded-full text-xs font-semibold hover:bg-primary-dark transition-colors">
            {t(locale, "nav_download")}
          </a>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border-light bg-surface px-5 py-4 flex flex-col gap-3 text-sm">
          <a href={`/${locale}#prayer-times`} onClick={() => setOpen(false)} className="py-2 text-text-secondary">{t(locale, "nav_prayer_times")}</a>
          <a href={`/${locale}/shaharlar`} onClick={() => setOpen(false)} className="py-2 text-text-secondary">{t(locale, "nav_cities")}</a>
          <a href={`/${locale}#about`} onClick={() => setOpen(false)} className="py-2 text-text-secondary">{t(locale, "nav_about")}</a>
          <div className="flex gap-2 py-2">
            {locales.map((l) => (
              <a key={l} href={`/${l}`} className={`px-3 py-1.5 rounded-full text-xs border ${l === locale ? "bg-primary text-white border-primary" : "border-border"}`}>{labels[l]}</a>
            ))}
          </div>
          <a href={`/${locale}#download`} onClick={() => setOpen(false)} className="bg-primary text-text-on-primary px-4 py-3 rounded-full text-center font-semibold">{t(locale, "nav_download")}</a>
        </nav>
      )}
    </header>
  );
}
