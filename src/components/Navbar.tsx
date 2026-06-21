"use client";

import { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-hero-from to-hero-to flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="font-[family-name:var(--font-display)] text-xl font-bold text-text">
            Namozim
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-text-secondary hover:text-primary transition-colors text-sm">
            Imkoniyatlar
          </a>
          <a href="#prayer-times" className="text-text-secondary hover:text-primary transition-colors text-sm">
            Namoz vaqtlari
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-text-on-primary px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Yuklab olish
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-text-secondary"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-t border-border-light px-6 py-4 flex flex-col gap-4">
          <a href="#features" onClick={() => setMenuOpen(false)} className="text-text-secondary py-2">
            Imkoniyatlar
          </a>
          <a href="#prayer-times" onClick={() => setMenuOpen(false)} className="text-text-secondary py-2">
            Namoz vaqtlari
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-text-on-primary px-5 py-3 rounded-full text-sm font-medium text-center"
          >
            Yuklab olish
          </a>
        </div>
      )}
    </nav>
  );
}
