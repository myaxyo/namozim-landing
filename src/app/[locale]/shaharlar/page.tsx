import { Metadata } from "next";
import { Locale, t } from "@/data/translations";
import { hreflangAlternates } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CitiesSearch } from "@/components/CitiesSearch";

interface Props {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: "uz" }, { locale: "uz-cyrl" }, { locale: "ru" }, { locale: "en" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const titles: Record<Locale, string> = {
    uz: "Namoz vaqtlari — O'zbekiston shaharlari ro'yxati",
    "uz-cyrl": "Намоз вақтлари — Ўзбекистон шаҳарлари рўйхати",
    ru: "Время намаза — Список городов Узбекистана",
    en: "Prayer Times — Cities of Uzbekistan",
  };
  const descs: Record<Locale, string> = {
    uz: "O'zbekistonning barcha shaharlari uchun namoz vaqtlarini toping. 50+ shahar. Hanafiy mazhab.",
    "uz-cyrl": "Ўзбекистоннинг барча шаҳарлари учун намоз вақтларини топинг. 50+ шаҳар. Ҳанафий мазҳаб.",
    ru: "Найдите время намаза для всех городов Узбекистана. 50+ городов. Ханафитский мазхаб.",
    en: "Find prayer times for all cities in Uzbekistan. 50+ cities. Hanafi school.",
  };
  return {
    title: titles[l],
    description: descs[l],
    alternates: {
      canonical: `https://namozim.uz/${locale}/shaharlar`,
      languages: hreflangAlternates("/shaharlar"),
    },
  };
}

export default async function CitiesPage({ params }: Props) {
  const { locale } = await params;
  const l = locale as Locale;
  return (
    <>
      <Header locale={l} />
      <Breadcrumbs
        items={[
          { name: t(l, "home"), url: `/${locale}` },
          { name: t(l, "nav_cities"), url: `/${locale}/shaharlar` },
        ]}
      />
      <main className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-10">
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-text mb-3">
              {t(l, "cities_title")}
            </h1>
            <p className="text-text-secondary text-sm">{t(l, "cities_subtitle")}</p>
          </div>
          <CitiesSearch locale={l} />
        </div>
      </main>
      <Footer locale={l} />
    </>
  );
}
