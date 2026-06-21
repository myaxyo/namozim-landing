import { Locale, t } from "@/data/translations";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} Namozim. {t(locale, "footer_rights")}</p>
          <div className="flex gap-5">
            <a href={`/${locale}#prayer-times`} className="hover:text-primary transition-colors">{t(locale, "nav_prayer_times")}</a>
            <a href={`/${locale}#cities`} className="hover:text-primary transition-colors">{t(locale, "nav_cities")}</a>
            <a href={`/${locale}#download`} className="hover:text-primary transition-colors">{t(locale, "nav_download")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
