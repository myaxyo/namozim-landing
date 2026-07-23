import { Locale, t } from "@/data/translations";

export function Download({ locale }: { locale: Locale }) {
  return (
    <section id="download" className="py-16 md:py-20 bg-bg-warm">
      <div className="max-w-3xl mx-auto px-5 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-text mb-3">{t(locale, "download_title")}</h2>
        <p className="text-text-secondary text-sm mb-8 max-w-md mx-auto">{t(locale, "download_subtitle")}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
          <a href="https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 bg-text text-white px-6 py-3.5 rounded-xl hover:bg-text/90 transition-colors w-52">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/></svg>
            <div className="text-left">
              <div className="text-[9px] opacity-70 uppercase">{t(locale, "download_btn")}</div>
              <div className="text-sm font-semibold">{t(locale, "download_gplay")}</div>
            </div>
          </a>
          <a href="https://apps.apple.com/us/app/namozim/id6761498579" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 bg-text text-white px-6 py-3.5 rounded-xl hover:bg-text/90 transition-colors w-52">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            <div className="text-left">
              <div className="text-[9px] opacity-70 uppercase">{t(locale, "download_btn")}</div>
              <div className="text-sm font-semibold">{t(locale, "download_appstore")}</div>
            </div>
          </a>
          <a href="https://www.rustore.ru/catalog/app/com.mo_dev.nomozvaqti" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 bg-text text-white px-6 py-3.5 rounded-xl hover:bg-text/90 transition-colors w-52">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="7" fill="#ffffff"/>
              <path d="M8 7.5L24 16L8 24.5V7.5Z" fill="#0077FF"/>
            </svg>
            <div className="text-left">
              <div className="text-[9px] opacity-70 uppercase">{t(locale, "download_btn")}</div>
              <div className="text-sm font-semibold">RuStore</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
