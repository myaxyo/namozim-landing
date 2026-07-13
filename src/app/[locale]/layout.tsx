import { notFound } from "next/navigation";
import { Locale } from "@/data/translations";

const LOCALES: Locale[] = ["uz", "uz-cyrl", "ru", "en", "tg", "ky"];
const LANG_MAP: Record<Locale, string> = { uz: "uz", "uz-cyrl": "uz", ru: "ru", en: "en", tg: "tg", ky: "ky" };

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
  const lang = LANG_MAP[locale as Locale];

  // Wrapping in a lang-tagged container so Google correctly identifies content language.
  // The root <html lang="uz"> is overridden by this closer ancestor for content parsing.
  return (
    <div lang={lang} dir="ltr">
      {children}
    </div>
  );
}
