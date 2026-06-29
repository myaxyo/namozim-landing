import { Locale } from "./translations";

export interface Region {
  slug: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  lat: number;
  lng: number;
  citySlug: string; // main city for this region
}

export const REGIONS: Region[] = [
  { slug: "toshkent-viloyati", nameUz: "Toshkent viloyati", nameRu: "Ташкентская область", nameEn: "Tashkent Region", lat: 41.30, lng: 69.24, citySlug: "toshkent" },
  { slug: "andijon-viloyati", nameUz: "Andijon viloyati", nameRu: "Андижанская область", nameEn: "Andijan Region", lat: 40.78, lng: 72.34, citySlug: "andijon" },
  { slug: "buxoro-viloyati", nameUz: "Buxoro viloyati", nameRu: "Бухарская область", nameEn: "Bukhara Region", lat: 39.77, lng: 64.43, citySlug: "buxoro" },
  { slug: "fargona-viloyati", nameUz: "Farg'ona viloyati", nameRu: "Ферганская область", nameEn: "Fergana Region", lat: 40.38, lng: 71.79, citySlug: "fargona" },
  { slug: "jizzax-viloyati", nameUz: "Jizzax viloyati", nameRu: "Джизакская область", nameEn: "Jizzakh Region", lat: 40.12, lng: 67.84, citySlug: "jizzax" },
  { slug: "namangan-viloyati", nameUz: "Namangan viloyati", nameRu: "Наманганская область", nameEn: "Namangan Region", lat: 41.00, lng: 71.67, citySlug: "namangan" },
  { slug: "navoiy-viloyati", nameUz: "Navoiy viloyati", nameRu: "Навоийская область", nameEn: "Navoi Region", lat: 40.10, lng: 65.37, citySlug: "navoiy" },
  { slug: "qashqadaryo-viloyati", nameUz: "Qashqadaryo viloyati", nameRu: "Кашкадарьинская область", nameEn: "Kashkadarya Region", lat: 38.86, lng: 65.80, citySlug: "qarshi" },
  { slug: "samarqand-viloyati", nameUz: "Samarqand viloyati", nameRu: "Самаркандская область", nameEn: "Samarkand Region", lat: 39.65, lng: 66.96, citySlug: "samarqand" },
  { slug: "sirdaryo-viloyati", nameUz: "Sirdaryo viloyati", nameRu: "Сырдарьинская область", nameEn: "Syrdarya Region", lat: 40.49, lng: 68.78, citySlug: "guliston" },
  { slug: "surxondaryo-viloyati", nameUz: "Surxondaryo viloyati", nameRu: "Сурхандарьинская область", nameEn: "Surkhandarya Region", lat: 37.22, lng: 67.28, citySlug: "termiz" },
  { slug: "xorazm-viloyati", nameUz: "Xorazm viloyati", nameRu: "Хорезмская область", nameEn: "Khorezm Region", lat: 41.55, lng: 60.63, citySlug: "urganch" },
  { slug: "qoraqalpogiston", nameUz: "Qoraqalpog'iston Respublikasi", nameRu: "Республика Каракалпакстан", nameEn: "Republic of Karakalpakstan", lat: 42.46, lng: 59.60, citySlug: "nukus" },
];

export function getRegionBySlug(slug: string): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}

export function getRegionName(r: Region, locale: Locale): string {
  if (locale === "ru") return r.nameRu;
  if (locale === "en") return r.nameEn;
  return r.nameUz;
}
