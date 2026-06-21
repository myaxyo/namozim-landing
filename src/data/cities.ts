export interface City {
  slug: string;
  name: string;
  nameRu: string;
  nameEn: string;
  lat: number;
  lng: number;
  region: string;
  regionRu: string;
}

export const CITIES: City[] = [
  { slug: "toshkent", name: "Toshkent", nameRu: "Ташкент", nameEn: "Tashkent", lat: 41.2995, lng: 69.2401, region: "Toshkent shahri", regionRu: "город Ташкент" },
  { slug: "samarqand", name: "Samarqand", nameRu: "Самарканд", nameEn: "Samarkand", lat: 39.6542, lng: 66.9597, region: "Samarqand viloyati", regionRu: "Самаркандская область" },
  { slug: "buxoro", name: "Buxoro", nameRu: "Бухара", nameEn: "Bukhara", lat: 39.7745, lng: 64.4286, region: "Buxoro viloyati", regionRu: "Бухарская область" },
  { slug: "namangan", name: "Namangan", nameRu: "Наманган", nameEn: "Namangan", lat: 40.9983, lng: 71.6726, region: "Namangan viloyati", regionRu: "Наманганская область" },
  { slug: "andijon", name: "Andijon", nameRu: "Андижан", nameEn: "Andijan", lat: 40.7821, lng: 72.3442, region: "Andijon viloyati", regionRu: "Андижанская область" },
  { slug: "fargona", name: "Farg'ona", nameRu: "Фергана", nameEn: "Fergana", lat: 40.3834, lng: 71.7870, region: "Farg'ona viloyati", regionRu: "Ферганская область" },
  { slug: "qarshi", name: "Qarshi", nameRu: "Карши", nameEn: "Karshi", lat: 38.8600, lng: 65.8000, region: "Qashqadaryo viloyati", regionRu: "Кашкадарьинская область" },
  { slug: "nukus", name: "Nukus", nameRu: "Нукус", nameEn: "Nukus", lat: 42.4628, lng: 59.6031, region: "Qoraqalpog'iston", regionRu: "Каракалпакстан" },
  { slug: "navoiy", name: "Navoiy", nameRu: "Навои", nameEn: "Navoi", lat: 40.1033, lng: 65.3733, region: "Navoiy viloyati", regionRu: "Навоийская область" },
  { slug: "jizzax", name: "Jizzax", nameRu: "Джизак", nameEn: "Jizzakh", lat: 40.1158, lng: 67.8422, region: "Jizzax viloyati", regionRu: "Джизакская область" },
  { slug: "urganch", name: "Urganch", nameRu: "Ургенч", nameEn: "Urgench", lat: 41.5500, lng: 60.6333, region: "Xorazm viloyati", regionRu: "Хорезмская область" },
  { slug: "termiz", name: "Termiz", nameRu: "Термез", nameEn: "Termez", lat: 37.2242, lng: 67.2783, region: "Surxondaryo viloyati", regionRu: "Сурхандарьинская область" },
  { slug: "chirchiq", name: "Chirchiq", nameRu: "Чирчик", nameEn: "Chirchik", lat: 41.4689, lng: 69.5822, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  { slug: "qoqon", name: "Qo'qon", nameRu: "Коканд", nameEn: "Kokand", lat: 40.5286, lng: 70.9425, region: "Farg'ona viloyati", regionRu: "Ферганская область" },
  { slug: "margilon", name: "Marg'ilon", nameRu: "Маргилан", nameEn: "Margilan", lat: 40.4700, lng: 71.7100, region: "Farg'ona viloyati", regionRu: "Ферганская область" },
  { slug: "guliston", name: "Guliston", nameRu: "Гулистан", nameEn: "Gulistan", lat: 40.4897, lng: 68.7842, region: "Sirdaryo viloyati", regionRu: "Сырдарьинская область" },
  { slug: "shahrisabz", name: "Shahrisabz", nameRu: "Шахрисабз", nameEn: "Shahrisabz", lat: 39.0550, lng: 66.8300, region: "Qashqadaryo viloyati", regionRu: "Кашкадарьинская область" },
  { slug: "xiva", name: "Xiva", nameRu: "Хива", nameEn: "Khiva", lat: 41.3786, lng: 60.3639, region: "Xorazm viloyati", regionRu: "Хорезмская область" },
  { slug: "olmaliq", name: "Olmaliq", nameRu: "Алмалык", nameEn: "Almalyk", lat: 40.8500, lng: 69.6000, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  { slug: "angren", name: "Angren", nameRu: "Ангрен", nameEn: "Angren", lat: 41.0167, lng: 70.1436, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  { slug: "denov", name: "Denov", nameRu: "Денау", nameEn: "Denau", lat: 38.2772, lng: 67.8936, region: "Surxondaryo viloyati", regionRu: "Сурхандарьинская область" },
  { slug: "bekobod", name: "Bekobod", nameRu: "Бекабад", nameEn: "Bekabad", lat: 40.2214, lng: 69.2694, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  { slug: "zarafshon", name: "Zarafshon", nameRu: "Зарафшан", nameEn: "Zarafshan", lat: 41.5744, lng: 64.1842, region: "Navoiy viloyati", regionRu: "Навоийская область" },
  { slug: "kogon", name: "Kogon", nameRu: "Каган", nameEn: "Kagan", lat: 39.7222, lng: 64.5500, region: "Buxoro viloyati", regionRu: "Бухарская область" },
  { slug: "kitob", name: "Kitob", nameRu: "Китаб", nameEn: "Kitab", lat: 39.1333, lng: 66.8833, region: "Qashqadaryo viloyati", regionRu: "Кашкадарьинская область" },
  { slug: "yangiyol", name: "Yangiyo'l", nameRu: "Янгиюль", nameEn: "Yangiyul", lat: 41.1117, lng: 69.0461, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  { slug: "kattaqorgon", name: "Kattaqo'rg'on", nameRu: "Каттакурган", nameEn: "Kattakurgan", lat: 39.9000, lng: 66.2500, region: "Samarqand viloyati", regionRu: "Самаркандская область" },
];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getCityName(city: City, locale: string): string {
  if (locale === "ru") return city.nameRu;
  if (locale === "en") return city.nameEn;
  return city.name;
}

export function getCityRegion(city: City, locale: string): string {
  if (locale === "ru") return city.regionRu;
  return city.region;
}
