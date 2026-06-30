import { notFound } from "next/navigation";
import { Locale } from "@/data/translations";

const LOCALES: Locale[] = ["uz", "uz-cyrl", "ru", "en"];
const LANG_MAP: Record<Locale, string> = { uz: "uz", "uz-cyrl": "uz", ru: "ru", en: "en" };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();

  return (
    <div lang={LANG_MAP[locale as Locale]} data-locale={locale}>
      {children}
    </div>
  );
}
