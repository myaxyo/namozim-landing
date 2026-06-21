import { Metadata } from "next";
import { Locale, t } from "@/data/translations";
import { Header } from "@/components/Header";
import { PrayerTimes } from "@/components/PrayerTimes";
import { Cities } from "@/components/Cities";
import { About } from "@/components/About";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  return {
    title: t(l, "seo_title"),
    description: t(l, "seo_desc"),
    alternates: {
      canonical: `https://namozim.uz/${locale}`,
      languages: { uz: "/uz", ru: "/ru", en: "/en" },
    },
  };
}

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  const l = locale as Locale;
  return (
    <>
      <Header locale={l} />
      <main>
        <PrayerTimes locale={l} />
        <Cities locale={l} />
        <About locale={l} />
        <Download locale={l} />
      </main>
      <Footer locale={l} />
    </>
  );
}
