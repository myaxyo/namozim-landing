export interface City {
  slug: string;
  name: string;
  nameCyrillic: string;
  lat: number;
  lng: number;
  region: string;
}

export const CITIES: City[] = [
  { slug: "toshkent", name: "Toshkent", nameCyrillic: "Тошкент", lat: 41.2995, lng: 69.2401, region: "Toshkent shahri" },
  { slug: "samarqand", name: "Samarqand", nameCyrillic: "Самарқанд", lat: 39.6542, lng: 66.9597, region: "Samarqand viloyati" },
  { slug: "buxoro", name: "Buxoro", nameCyrillic: "Бухоро", lat: 39.7745, lng: 64.4286, region: "Buxoro viloyati" },
  { slug: "namangan", name: "Namangan", nameCyrillic: "Наманган", lat: 40.9983, lng: 71.6726, region: "Namangan viloyati" },
  { slug: "andijon", name: "Andijon", nameCyrillic: "Андижон", lat: 40.7821, lng: 72.3442, region: "Andijon viloyati" },
  { slug: "fargona", name: "Farg'ona", nameCyrillic: "Фарғона", lat: 40.3834, lng: 71.7870, region: "Farg'ona viloyati" },
  { slug: "qarshi", name: "Qarshi", nameCyrillic: "Қарши", lat: 38.8600, lng: 65.8000, region: "Qashqadaryo viloyati" },
  { slug: "nukus", name: "Nukus", nameCyrillic: "Нукус", lat: 42.4628, lng: 59.6031, region: "Qoraqalpog'iston" },
  { slug: "navoiy", name: "Navoiy", nameCyrillic: "Навоий", lat: 40.1033, lng: 65.3733, region: "Navoiy viloyati" },
  { slug: "jizzax", name: "Jizzax", nameCyrillic: "Жиззах", lat: 40.1158, lng: 67.8422, region: "Jizzax viloyati" },
  { slug: "urganch", name: "Urganch", nameCyrillic: "Урганч", lat: 41.5500, lng: 60.6333, region: "Xorazm viloyati" },
  { slug: "termiz", name: "Termiz", nameCyrillic: "Термиз", lat: 37.2242, lng: 67.2783, region: "Surxondaryo viloyati" },
  { slug: "chirchiq", name: "Chirchiq", nameCyrillic: "Чирчиқ", lat: 41.4689, lng: 69.5822, region: "Toshkent viloyati" },
  { slug: "qoqon", name: "Qo'qon", nameCyrillic: "Қўқон", lat: 40.5286, lng: 70.9425, region: "Farg'ona viloyati" },
  { slug: "margilon", name: "Marg'ilon", nameCyrillic: "Марғилон", lat: 40.4700, lng: 71.7100, region: "Farg'ona viloyati" },
  { slug: "guliston", name: "Guliston", nameCyrillic: "Гулистон", lat: 40.4897, lng: 68.7842, region: "Sirdaryo viloyati" },
  { slug: "shahrisabz", name: "Shahrisabz", nameCyrillic: "Шаҳрисабз", lat: 39.0550, lng: 66.8300, region: "Qashqadaryo viloyati" },
  { slug: "xiva", name: "Xiva", nameCyrillic: "Хива", lat: 41.3786, lng: 60.3639, region: "Xorazm viloyati" },
  { slug: "olmaliq", name: "Olmaliq", nameCyrillic: "Олмалиқ", lat: 40.8500, lng: 69.6000, region: "Toshkent viloyati" },
  { slug: "angren", name: "Angren", nameCyrillic: "Ангрен", lat: 41.0167, lng: 70.1436, region: "Toshkent viloyati" },
  { slug: "denov", name: "Denov", nameCyrillic: "Денов", lat: 38.2772, lng: 67.8936, region: "Surxondaryo viloyati" },
  { slug: "bekobod", name: "Bekobod", nameCyrillic: "Бекобод", lat: 40.2214, lng: 69.2694, region: "Toshkent viloyati" },
  { slug: "zarafshon", name: "Zarafshon", nameCyrillic: "Зарафшон", lat: 41.5744, lng: 64.1842, region: "Navoiy viloyati" },
  { slug: "kogon", name: "Kogon", nameCyrillic: "Когон", lat: 39.7222, lng: 64.5500, region: "Buxoro viloyati" },
  { slug: "pop", name: "Pop", nameCyrillic: "Поп", lat: 40.8833, lng: 71.1000, region: "Namangan viloyati" },
  { slug: "chust", name: "Chust", nameCyrillic: "Чуст", lat: 41.0000, lng: 71.2333, region: "Namangan viloyati" },
  { slug: "kosonsoy", name: "Kosonsoy", nameCyrillic: "Косонсой", lat: 41.2500, lng: 71.5500, region: "Namangan viloyati" },
  { slug: "kitob", name: "Kitob", nameCyrillic: "Китоб", lat: 39.1333, lng: 66.8833, region: "Qashqadaryo viloyati" },
  { slug: "yangiyol", name: "Yangiyo'l", nameCyrillic: "Янгийўл", lat: 41.1117, lng: 69.0461, region: "Toshkent viloyati" },
  { slug: "kattaqorgon", name: "Kattaqo'rg'on", nameCyrillic: "Каттақўрғон", lat: 39.9000, lng: 66.2500, region: "Samarqand viloyati" },
];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
