import { Locale } from "./translations";

export interface Region {
  slug: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  nameTg?: string;
  nameKy?: string;
  lat: number;
  lng: number;
  citySlug: string; // main city for this region
  /** Country code: "uz" | "tj" | "kg". Defaults to "uz" if omitted. */
  country?: "uz" | "tj" | "kg";
}

export const REGIONS: Region[] = [
  // === Uzbekistan ===
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

  // === Tajikistan ===
  { slug: "viloyati-sugd", nameUz: "Sugd viloyati", nameTg: "Вилояти Суғд", nameRu: "Согдийская область", nameEn: "Sughd Region", nameKy: "Согд облусу", lat: 40.28, lng: 69.62, citySlug: "khujand", country: "tj" },
  { slug: "viloyati-khatlon", nameUz: "Xatlon viloyati", nameTg: "Вилояти Хатлон", nameRu: "Хатлонская область", nameEn: "Khatlon Region", nameKy: "Хатлон облусу", lat: 37.83, lng: 68.78, citySlug: "bokhtar", country: "tj" },
  { slug: "gbao", nameUz: "VMKB (GBAO)", nameTg: "ВМКБ (Бадахшон)", nameRu: "ГБАО", nameEn: "Gorno-Badakhshan (GBAO)", nameKy: "ТБАА", lat: 37.53, lng: 71.51, citySlug: "khorog", country: "tj" },
  { slug: "dushanbe-shahri", nameUz: "Dushanbe shahri", nameTg: "Шаҳри Душанбе", nameRu: "город Душанбе", nameEn: "Dushanbe City", nameKy: "Душанбе шаары", lat: 38.56, lng: 68.77, citySlug: "dushanbe-tj", country: "tj" },
  { slug: "nohiyahoi-tobei", nameUz: "Respublika bo'ysunuvidagi tumanlar", nameTg: "Ноҳияҳои тобеи ҷумҳурӣ", nameRu: "Районы республиканского подчинения", nameEn: "Districts of Republican Subordination", nameKy: "Республикалык районлор", lat: 38.55, lng: 69.01, citySlug: "vahdat", country: "tj" },

  // === Kyrgyzstan ===
  { slug: "bishkek-shahri", nameUz: "Bishkek shahri", nameKy: "Бишкек шаары", nameRu: "город Бишкек", nameEn: "Bishkek City", nameTg: "Шаҳри Бишкек", lat: 42.87, lng: 74.57, citySlug: "bishkek-kg", country: "kg" },
  { slug: "osh-shahri", nameUz: "O'sh shahri", nameKy: "Ош шаары", nameRu: "город Ош", nameEn: "Osh City", nameTg: "Шаҳри Ош", lat: 40.53, lng: 72.80, citySlug: "osh-kg", country: "kg" },
  { slug: "chuy-oblasty", nameUz: "Chuy oblasti", nameKy: "Чүй облусу", nameRu: "Чуйская область", nameEn: "Chuy Region", nameTg: "Вилояти Чуй", lat: 42.77, lng: 75.30, citySlug: "tokmok", country: "kg" },
  { slug: "osh-oblasty", nameUz: "O'sh oblasti", nameKy: "Ош облусу", nameRu: "Ошская область", nameEn: "Osh Region", nameTg: "Вилояти Ош", lat: 40.53, lng: 72.80, citySlug: "osh-kg", country: "kg" },
  { slug: "jalal-abad-oblasty", nameUz: "Jalol-Obod oblasti", nameKy: "Жалал-Абад облусу", nameRu: "Джалал-Абадская область", nameEn: "Jalal-Abad Region", nameTg: "Вилояти Ҷалолобод", lat: 40.93, lng: 73.00, citySlug: "jalal-abad", country: "kg" },
  { slug: "issyk-kul-oblasty", nameUz: "Issiqko'l oblasti", nameKy: "Ысык-Көл облусу", nameRu: "Иссык-Кульская область", nameEn: "Issyk-Kul Region", nameTg: "Вилояти Иссиқкул", lat: 42.49, lng: 78.39, citySlug: "karakol", country: "kg" },
  { slug: "naryn-oblasty", nameUz: "Narin oblasti", nameKy: "Нарын облусу", nameRu: "Нарынская область", nameEn: "Naryn Region", nameTg: "Вилояти Нарин", lat: 41.43, lng: 76.00, citySlug: "naryn", country: "kg" },
  { slug: "talas-oblasty", nameUz: "Talas oblasti", nameKy: "Талас облусу", nameRu: "Таласская область", nameEn: "Talas Region", nameTg: "Вилояти Талас", lat: 42.52, lng: 72.23, citySlug: "talas-kg", country: "kg" },
  { slug: "batken-oblasty", nameUz: "Botken oblasti", nameKy: "Баткен облусу", nameRu: "Баткенская область", nameEn: "Batken Region", nameTg: "Вилояти Боткан", lat: 40.06, lng: 70.82, citySlug: "batken", country: "kg" },
];

export function getRegionBySlug(slug: string): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}

export function getRegionName(r: Region, locale: Locale): string {
  if (locale === "tg" && r.nameTg) return r.nameTg;
  if (locale === "ky" && r.nameKy) return r.nameKy;
  if (locale === "ru") return r.nameRu;
  if (locale === "en") return r.nameEn;
  return r.nameUz;
}
