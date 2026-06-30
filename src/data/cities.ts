export interface City {
  slug: string;
  name: string;
  nameCyrl?: string;
  nameRu: string;
  nameEn: string;
  lat: number;
  lng: number;
  region: string;
  regionRu: string;
  regionCyrl?: string;
}

export const CITIES: City[] = [
  // Toshkent shahri
  { slug: "toshkent", name: "Toshkent", nameRu: "Ташкент", nameEn: "Tashkent", lat: 41.2995, lng: 69.2401, region: "Toshkent shahri", regionRu: "город Ташкент" },
  // Toshkent viloyati
  { slug: "chirchiq", name: "Chirchiq", nameRu: "Чирчик", nameEn: "Chirchik", lat: 41.4689, lng: 69.5822, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  { slug: "olmaliq", name: "Olmaliq", nameRu: "Алмалык", nameEn: "Almalyk", lat: 40.8500, lng: 69.6000, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  { slug: "angren", name: "Angren", nameRu: "Ангрен", nameEn: "Angren", lat: 41.0167, lng: 70.1436, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  { slug: "bekobod", name: "Bekobod", nameRu: "Бекабад", nameEn: "Bekabad", lat: 40.2214, lng: 69.2694, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  { slug: "ohangaron", name: "Ohangaron", nameRu: "Ахангаран", nameEn: "Akhangaran", lat: 41.0667, lng: 69.6333, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  { slug: "nurafshon", name: "Nurafshon", nameRu: "Нурафшон", nameEn: "Nurafshon", lat: 41.0500, lng: 69.2333, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  { slug: "yangiyol", name: "Yangiyo'l", nameRu: "Янгиюль", nameEn: "Yangiyul", lat: 41.1117, lng: 69.0461, region: "Toshkent viloyati", regionRu: "Ташкентская область" },
  // Andijon viloyati
  { slug: "andijon", name: "Andijon", nameRu: "Андижан", nameEn: "Andijan", lat: 40.7821, lng: 72.3442, region: "Andijon viloyati", regionRu: "Андижанская область" },
  { slug: "xonobod", name: "Xonobod", nameRu: "Ханабад", nameEn: "Khanabad", lat: 40.7500, lng: 72.0833, region: "Andijon viloyati", regionRu: "Андижанская область" },
  { slug: "asaka", name: "Asaka", nameRu: "Асака", nameEn: "Asaka", lat: 40.6333, lng: 72.2333, region: "Andijon viloyati", regionRu: "Андижанская область" },
  { slug: "shahrixon", name: "Shahrixon", nameRu: "Шахрихан", nameEn: "Shahrikhan", lat: 40.7167, lng: 72.0500, region: "Andijon viloyati", regionRu: "Андижанская область" },
  // Buxoro viloyati
  { slug: "buxoro", name: "Buxoro", nameRu: "Бухара", nameEn: "Bukhara", lat: 39.7745, lng: 64.4286, region: "Buxoro viloyati", regionRu: "Бухарская область" },
  { slug: "kogon", name: "Kogon", nameRu: "Каган", nameEn: "Kagan", lat: 39.7222, lng: 64.5500, region: "Buxoro viloyati", regionRu: "Бухарская область" },
  { slug: "gijduvon", name: "G'ijduvon", nameRu: "Гиждуван", nameEn: "Gijduvan", lat: 40.1000, lng: 64.6833, region: "Buxoro viloyati", regionRu: "Бухарская область" },
  // Farg'ona viloyati
  { slug: "fargona", name: "Farg'ona", nameRu: "Фергана", nameEn: "Fergana", lat: 40.3834, lng: 71.7870, region: "Farg'ona viloyati", regionRu: "Ферганская область" },
  { slug: "qoqon", name: "Qo'qon", nameRu: "Коканд", nameEn: "Kokand", lat: 40.5286, lng: 70.9425, region: "Farg'ona viloyati", regionRu: "Ферганская область" },
  { slug: "margilon", name: "Marg'ilon", nameRu: "Маргилан", nameEn: "Margilan", lat: 40.4700, lng: 71.7100, region: "Farg'ona viloyati", regionRu: "Ферганская область" },
  { slug: "quvasoy", name: "Quvasoy", nameRu: "Кувасай", nameEn: "Kuvasay", lat: 40.5333, lng: 71.9833, region: "Farg'ona viloyati", regionRu: "Ферганская область" },
  { slug: "rishton", name: "Rishton", nameRu: "Риштан", nameEn: "Rishtan", lat: 40.3500, lng: 71.2833, region: "Farg'ona viloyati", regionRu: "Ферганская область" },
  { slug: "quva", name: "Quva", nameRu: "Кува", nameEn: "Kuva", lat: 40.5167, lng: 72.0667, region: "Farg'ona viloyati", regionRu: "Ферганская область" },
  // Jizzax viloyati
  { slug: "jizzax", name: "Jizzax", nameRu: "Джизак", nameEn: "Jizzakh", lat: 40.1158, lng: 67.8422, region: "Jizzax viloyati", regionRu: "Джизакская область" },
  // Namangan viloyati
  { slug: "namangan", name: "Namangan", nameRu: "Наманган", nameEn: "Namangan", lat: 40.9983, lng: 71.6726, region: "Namangan viloyati", regionRu: "Наманганская область" },
  { slug: "chust", name: "Chust", nameRu: "Чуст", nameEn: "Chust", lat: 41.0000, lng: 71.2333, region: "Namangan viloyati", regionRu: "Наманганская область" },
  { slug: "pop", name: "Pop", nameRu: "Пап", nameEn: "Pop", lat: 40.8833, lng: 71.1000, region: "Namangan viloyati", regionRu: "Наманганская область" },
  { slug: "kosonsoy", name: "Kosonsoy", nameRu: "Касансай", nameEn: "Kasansay", lat: 41.2500, lng: 71.5500, region: "Namangan viloyati", regionRu: "Наманганская область" },
  { slug: "chortoq", name: "Chortoq", nameRu: "Чартак", nameEn: "Chartak", lat: 41.0667, lng: 71.8167, region: "Namangan viloyati", regionRu: "Наманганская область" },
  // Navoiy viloyati
  { slug: "navoiy", name: "Navoiy", nameRu: "Навои", nameEn: "Navoi", lat: 40.1033, lng: 65.3733, region: "Navoiy viloyati", regionRu: "Навоийская область" },
  { slug: "zarafshon", name: "Zarafshon", nameRu: "Зарафшан", nameEn: "Zarafshan", lat: 41.5744, lng: 64.1842, region: "Navoiy viloyati", regionRu: "Навоийская область" },
  { slug: "uchquduq", name: "Uchquduq", nameRu: "Учкудук", nameEn: "Uchkuduk", lat: 42.1564, lng: 63.5528, region: "Navoiy viloyati", regionRu: "Навоийская область" },
  // Qashqadaryo viloyati
  { slug: "qarshi", name: "Qarshi", nameRu: "Карши", nameEn: "Karshi", lat: 38.8600, lng: 65.8000, region: "Qashqadaryo viloyati", regionRu: "Кашкадарьинская область" },
  { slug: "shahrisabz", name: "Shahrisabz", nameRu: "Шахрисабз", nameEn: "Shahrisabz", lat: 39.0550, lng: 66.8300, region: "Qashqadaryo viloyati", regionRu: "Кашкадарьинская область" },
  { slug: "kitob", name: "Kitob", nameRu: "Китаб", nameEn: "Kitab", lat: 39.1333, lng: 66.8833, region: "Qashqadaryo viloyati", regionRu: "Кашкадарьинская область" },
  { slug: "muborak", name: "Muborak", nameRu: "Мубарек", nameEn: "Mubarek", lat: 39.1667, lng: 65.2500, region: "Qashqadaryo viloyati", regionRu: "Кашкадарьинская область" },
  { slug: "guzor", name: "G'uzor", nameRu: "Гузар", nameEn: "Guzar", lat: 38.6167, lng: 66.2500, region: "Qashqadaryo viloyati", regionRu: "Кашкадарьинская область" },
  // Samarqand viloyati
  { slug: "samarqand", name: "Samarqand", nameRu: "Самарканд", nameEn: "Samarkand", lat: 39.6542, lng: 66.9597, region: "Samarqand viloyati", regionRu: "Самаркандская область" },
  { slug: "kattaqorgon", name: "Kattaqo'rg'on", nameRu: "Каттакурган", nameEn: "Kattakurgan", lat: 39.9000, lng: 66.2500, region: "Samarqand viloyati", regionRu: "Самаркандская область" },
  { slug: "urgut", name: "Urgut", nameRu: "Ургут", nameEn: "Urgut", lat: 39.4000, lng: 67.2333, region: "Samarqand viloyati", regionRu: "Самаркандская область" },
  // Sirdaryo viloyati
  { slug: "guliston", name: "Guliston", nameRu: "Гулистан", nameEn: "Gulistan", lat: 40.4897, lng: 68.7842, region: "Sirdaryo viloyati", regionRu: "Сырдарьинская область" },
  { slug: "yangiyer", name: "Yangiyer", nameRu: "Янгиер", nameEn: "Yangiyer", lat: 40.2667, lng: 68.8333, region: "Sirdaryo viloyati", regionRu: "Сырдарьинская область" },
  { slug: "shirin", name: "Shirin", nameRu: "Ширин", nameEn: "Shirin", lat: 40.2167, lng: 68.6833, region: "Sirdaryo viloyati", regionRu: "Сырдарьинская область" },
  // Surxondaryo viloyati
  { slug: "termiz", name: "Termiz", nameRu: "Термез", nameEn: "Termez", lat: 37.2242, lng: 67.2783, region: "Surxondaryo viloyati", regionRu: "Сурхандарьинская область" },
  { slug: "denov", name: "Denov", nameRu: "Денау", nameEn: "Denau", lat: 38.2772, lng: 67.8936, region: "Surxondaryo viloyati", regionRu: "Сурхандарьинская область" },
  { slug: "sherobod", name: "Sherobod", nameRu: "Шерабад", nameEn: "Sherabad", lat: 37.6500, lng: 67.0000, region: "Surxondaryo viloyati", regionRu: "Сурхандарьинская область" },
  // Xorazm viloyati
  { slug: "urganch", name: "Urganch", nameRu: "Ургенч", nameEn: "Urgench", lat: 41.5500, lng: 60.6333, region: "Xorazm viloyati", regionRu: "Хорезмская область" },
  { slug: "xiva", name: "Xiva", nameRu: "Хива", nameEn: "Khiva", lat: 41.3786, lng: 60.3639, region: "Xorazm viloyati", regionRu: "Хорезмская область" },
  // Qoraqalpog'iston
  { slug: "nukus", name: "Nukus", nameRu: "Нукус", nameEn: "Nukus", lat: 42.4628, lng: 59.6031, region: "Qoraqalpog'iston Respublikasi", regionRu: "Республика Каракалпакстан" },
  { slug: "qonggirot", name: "Qo'ng'irot", nameRu: "Кунград", nameEn: "Kungrad", lat: 43.0758, lng: 58.6903, region: "Qoraqalpog'iston Respublikasi", regionRu: "Республика Каракалпакстан" },
  { slug: "moynoq", name: "Mo'ynoq", nameRu: "Муйнак", nameEn: "Moynaq", lat: 43.7667, lng: 58.6833, region: "Qoraqalpog'iston Respublikasi", regionRu: "Республика Каракалпакстан" },
  { slug: "tortqol", name: "To'rtko'l", nameRu: "Турткуль", nameEn: "Turtkul", lat: 41.5500, lng: 60.9167, region: "Qoraqalpog'iston Respublikasi", regionRu: "Республика Каракалпакстан" },
  { slug: "beruniy", name: "Beruniy", nameRu: "Беруни", nameEn: "Beruni", lat: 41.6833, lng: 60.7500, region: "Qoraqalpog'iston Respublikasi", regionRu: "Республика Каракалпакстан" },
  { slug: "taxiatosh", name: "Taxiatosh", nameRu: "Тахиаташ", nameEn: "Takhiatash", lat: 42.2500, lng: 59.6167, region: "Qoraqalpog'iston Respublikasi", regionRu: "Республика Каракалпакстан" },
];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getCityName(city: City, locale: string): string {
  if (locale === "uz-cyrl") return city.nameCyrl || city.nameRu;
  if (locale === "ru") return city.nameRu;
  if (locale === "en") return city.nameEn;
  return city.name;
}

export function getCityRegion(city: City, locale: string): string {
  if (locale === "uz-cyrl") return city.regionCyrl || city.regionRu;
  if (locale === "ru") return city.regionRu;
  return city.region;
}
