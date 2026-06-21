"use client";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-surface/85 backdrop-blur-lg border-b border-border-light">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <img src="/icon-192.png" alt="Namozim" width={32} height={32} className="rounded-lg" />
          <span className="font-[family-name:var(--font-display)] text-lg font-bold text-text">Namozim</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-text-secondary">
          <a href="#prayer-times" className="hover:text-primary transition-colors">Namoz vaqtlari</a>
          <a href="#cities" className="hover:text-primary transition-colors">Shaharlar</a>
          <a href="#about" className="hover:text-primary transition-colors">Ilova haqida</a>
          <a href="#download" className="bg-primary text-text-on-primary px-4 py-2 rounded-full text-xs font-semibold hover:bg-primary-dark transition-colors">
            Yuklab olish
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
          <a href="#prayer-times" onClick={() => setOpen(false)} className="py-2 text-text-secondary">Namoz vaqtlari</a>
          <a href="#cities" onClick={() => setOpen(false)} className="py-2 text-text-secondary">Shaharlar</a>
          <a href="#about" onClick={() => setOpen(false)} className="py-2 text-text-secondary">Ilova haqida</a>
          <a href="#download" onClick={() => setOpen(false)} className="bg-primary text-text-on-primary px-4 py-3 rounded-full text-center font-semibold">Yuklab olish</a>
        </nav>
      )}
    </header>
  );
}
