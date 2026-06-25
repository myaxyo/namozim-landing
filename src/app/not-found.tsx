import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-hero-from to-hero-to flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl font-bold">N</span>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold text-text mb-3">
          404
        </h1>
        <p className="text-text-secondary text-lg mb-2">
          Sahifa topilmadi
        </p>
        <p className="text-text-muted text-sm mb-8">
          Siz qidirayotgan sahifa mavjud emas yoki ko&apos;chirilgan.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/uz"
            className="bg-primary text-text-on-primary px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Bosh sahifa
          </Link>
          <Link
            href="/uz/shaharlar"
            className="border border-border px-6 py-3 rounded-full text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
          >
            Shaharlar
          </Link>
        </div>
      </div>
    </div>
  );
}
