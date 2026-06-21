export function Footer() {
  return (
    <footer className="bg-surface border-t border-border-light py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hero-from to-hero-to flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-lg font-bold text-text">Namozim</p>
              <p className="text-text-tertiary text-xs">Namoz vaqtlari &bull; Tasbih &bull; Zikr</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <a href="#features" className="hover:text-primary transition-colors">Imkoniyatlar</a>
            <a href="#prayer-times" className="hover:text-primary transition-colors">Namoz vaqtlari</a>
            <a
              href="https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Google Play
            </a>
          </div>

          {/* Play Store badge */}
          <a
            href="https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-text text-white px-5 py-3 rounded-xl hover:bg-text/90 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
            </svg>
            <div className="text-left">
              <div className="text-[9px] opacity-70 uppercase">Yuklab olish</div>
              <div className="text-xs font-semibold">Google Play</div>
            </div>
          </a>
        </div>

        <div className="mt-10 pt-6 border-t border-border-light text-center">
          <p className="text-text-tertiary text-xs">
            &copy; {new Date().getFullYear()} Namozim. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
