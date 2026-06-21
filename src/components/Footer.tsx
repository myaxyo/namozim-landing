export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} Namozim. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-5">
            <a href="#prayer-times" className="hover:text-primary transition-colors">Namoz vaqtlari</a>
            <a href="#cities" className="hover:text-primary transition-colors">Shaharlar</a>
            <a href="#download" className="hover:text-primary transition-colors">Yuklab olish</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
