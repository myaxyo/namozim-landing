export interface InternationalCity {
  slug: string;
  name: string;
  nameCyrl: string;
  nameRu: string;
  nameEn: string;
  lat: number;
  lng: number;
  country: string;
  countryRu: string;
  countryEn: string;
  countryCyrl: string;
}

/**
 * International cities with significant Uzbek diaspora or Muslim populations.
 * These pages target queries like "namoz vaqtlari moskva", "prayer times dubai",
 * "время намаза стамбул" from Uzbek expats and general Muslim audiences.
 */
export const INTERNATIONAL_CITIES: InternationalCity[] = [
  // Russia — large Uzbek diaspora (2-3M)
  { slug: "moskva", name: "Moskva", nameCyrl: "Москва", nameRu: "Москва", nameEn: "Moscow", lat: 55.7558, lng: 37.6173, country: "Rossiya", countryRu: "Россия", countryEn: "Russia", countryCyrl: "Россия" },
  { slug: "sankt-peterburg", name: "Sankt-Peterburg", nameCyrl: "Санкт-Петербург", nameRu: "Санкт-Петербург", nameEn: "Saint Petersburg", lat: 59.9343, lng: 30.3351, country: "Rossiya", countryRu: "Россия", countryEn: "Russia", countryCyrl: "Россия" },
  { slug: "kazan", name: "Kazan", nameCyrl: "Қозон", nameRu: "Казань", nameEn: "Kazan", lat: 55.7887, lng: 49.1221, country: "Rossiya", countryRu: "Россия", countryEn: "Russia", countryCyrl: "Россия" },
  { slug: "novosibirsk", name: "Novosibirsk", nameCyrl: "Новосибирск", nameRu: "Новосибирск", nameEn: "Novosibirsk", lat: 55.0084, lng: 82.9357, country: "Rossiya", countryRu: "Россия", countryEn: "Russia", countryCyrl: "Россия" },
  { slug: "yekaterinburg", name: "Yekaterinburg", nameCyrl: "Екатеринбург", nameRu: "Екатеринбург", nameEn: "Yekaterinburg", lat: 56.8389, lng: 60.6057, country: "Rossiya", countryRu: "Россия", countryEn: "Russia", countryCyrl: "Россия" },
  { slug: "krasnoyarsk", name: "Krasnoyarsk", nameCyrl: "Красноярск", nameRu: "Красноярск", nameEn: "Krasnoyarsk", lat: 56.0153, lng: 92.8932, country: "Rossiya", countryRu: "Россия", countryEn: "Russia", countryCyrl: "Россия" },
  { slug: "vladivostok", name: "Vladivostok", nameCyrl: "Владивосток", nameRu: "Владивосток", nameEn: "Vladivostok", lat: 43.1332, lng: 131.9113, country: "Rossiya", countryRu: "Россия", countryEn: "Russia", countryCyrl: "Россия" },
  { slug: "ufa", name: "Ufa", nameCyrl: "Уфа", nameRu: "Уфа", nameEn: "Ufa", lat: 54.7388, lng: 55.9721, country: "Rossiya", countryRu: "Россия", countryEn: "Russia", countryCyrl: "Россия" },

  // Turkey — popular destination for Uzbeks
  { slug: "istanbul", name: "Istanbul", nameCyrl: "Истанбул", nameRu: "Стамбул", nameEn: "Istanbul", lat: 41.0082, lng: 28.9784, country: "Turkiya", countryRu: "Турция", countryEn: "Turkey", countryCyrl: "Туркия" },
  { slug: "antalya", name: "Antalya", nameCyrl: "Анталья", nameRu: "Анталья", nameEn: "Antalya", lat: 36.8969, lng: 30.7133, country: "Turkiya", countryRu: "Турция", countryEn: "Turkey", countryCyrl: "Туркия" },
  { slug: "ankara", name: "Ankara", nameCyrl: "Анқара", nameRu: "Анкара", nameEn: "Ankara", lat: 39.9334, lng: 32.8597, country: "Turkiya", countryRu: "Турция", countryEn: "Turkey", countryCyrl: "Туркия" },

  // UAE — large Uzbek worker population
  { slug: "dubay", name: "Dubay", nameCyrl: "Дубай", nameRu: "Дубай", nameEn: "Dubai", lat: 25.2048, lng: 55.2708, country: "BAA", countryRu: "ОАЭ", countryEn: "UAE", countryCyrl: "БАА" },
  { slug: "abu-dabi", name: "Abu-Dabi", nameCyrl: "Абу-Даби", nameRu: "Абу-Даби", nameEn: "Abu Dhabi", lat: 24.4539, lng: 54.3773, country: "BAA", countryRu: "ОАЭ", countryEn: "UAE", countryCyrl: "БАА" },
  { slug: "sharjah", name: "Sharjah", nameCyrl: "Шаржа", nameRu: "Шарджа", nameEn: "Sharjah", lat: 25.3463, lng: 55.4209, country: "BAA", countryRu: "ОАЭ", countryEn: "UAE", countryCyrl: "БАА" },

  // South Korea — growing Uzbek community (80K+)
  { slug: "seul", name: "Seul", nameCyrl: "Сеул", nameRu: "Сеул", nameEn: "Seoul", lat: 37.5665, lng: 126.9780, country: "Janubiy Koreya", countryRu: "Южная Корея", countryEn: "South Korea", countryCyrl: "Жанубий Корея" },
  { slug: "pusan", name: "Pusan", nameCyrl: "Пусан", nameRu: "Пусан", nameEn: "Busan", lat: 35.1796, lng: 129.0756, country: "Janubiy Koreya", countryRu: "Южная Корея", countryEn: "South Korea", countryCyrl: "Жанубий Корея" },

  // Kazakhstan — neighboring, shared culture
  { slug: "almaty", name: "Almaty", nameCyrl: "Олмаота", nameRu: "Алматы", nameEn: "Almaty", lat: 43.2220, lng: 76.8512, country: "Qozog'iston", countryRu: "Казахстан", countryEn: "Kazakhstan", countryCyrl: "Қозоғистон" },
  { slug: "nur-sultan", name: "Astana", nameCyrl: "Астана", nameRu: "Астана", nameEn: "Astana", lat: 51.1694, lng: 71.4491, country: "Qozog'iston", countryRu: "Казахстан", countryEn: "Kazakhstan", countryCyrl: "Қозоғистон" },
  { slug: "shimkent", name: "Shimkent", nameCyrl: "Шимкент", nameRu: "Шымкент", nameEn: "Shymkent", lat: 42.3417, lng: 69.5901, country: "Qozog'iston", countryRu: "Казахстан", countryEn: "Kazakhstan", countryCyrl: "Қозоғистон" },

  // Kyrgyzstan
  { slug: "bishkek", name: "Bishkek", nameCyrl: "Бишкек", nameRu: "Бишкек", nameEn: "Bishkek", lat: 42.8746, lng: 74.5698, country: "Qirg'iziston", countryRu: "Кыргызстан", countryEn: "Kyrgyzstan", countryCyrl: "Қирғизистон" },
  { slug: "osh", name: "O'sh", nameCyrl: "Ўш", nameRu: "Ош", nameEn: "Osh", lat: 40.5283, lng: 72.7985, country: "Qirg'iziston", countryRu: "Кыргызстан", countryEn: "Kyrgyzstan", countryCyrl: "Қирғизистон" },

  // Tajikistan
  { slug: "dushanbe", name: "Dushanbe", nameCyrl: "Душанбе", nameRu: "Душанбе", nameEn: "Dushanbe", lat: 38.5598, lng: 68.7740, country: "Tojikiston", countryRu: "Таджикистан", countryEn: "Tajikistan", countryCyrl: "Тожикистон" },

  // Saudi Arabia — pilgrimage
  { slug: "makka", name: "Makka", nameCyrl: "Макка", nameRu: "Мекка", nameEn: "Mecca", lat: 21.3891, lng: 39.8579, country: "Saudiya Arabistoni", countryRu: "Саудовская Аравия", countryEn: "Saudi Arabia", countryCyrl: "Саудия Арабистони" },
  { slug: "madina", name: "Madina", nameCyrl: "Мадина", nameRu: "Медина", nameEn: "Medina", lat: 24.4672, lng: 39.6024, country: "Saudiya Arabistoni", countryRu: "Саудовская Аравия", countryEn: "Saudi Arabia", countryCyrl: "Саудия Арабистони" },
  { slug: "jidda", name: "Jidda", nameCyrl: "Жидда", nameRu: "Джидда", nameEn: "Jeddah", lat: 21.5433, lng: 39.1728, country: "Saudiya Arabistoni", countryRu: "Саудовская Аравия", countryEn: "Saudi Arabia", countryCyrl: "Саудия Арабистони" },

  // USA & UK — English-speaking Muslims
  { slug: "new-york", name: "Nyu-York", nameCyrl: "Нью-Йорк", nameRu: "Нью-Йорк", nameEn: "New York", lat: 40.7128, lng: -74.0060, country: "AQSH", countryRu: "США", countryEn: "USA", countryCyrl: "АҚШ" },
  { slug: "london", name: "London", nameCyrl: "Лондон", nameRu: "Лондон", nameEn: "London", lat: 51.5074, lng: -0.1278, country: "Buyuk Britaniya", countryRu: "Великобритания", countryEn: "United Kingdom", countryCyrl: "Буюк Британия" },

  // Germany — significant Turkish/Muslim population
  { slug: "berlin", name: "Berlin", nameCyrl: "Берлин", nameRu: "Берлин", nameEn: "Berlin", lat: 52.5200, lng: 13.4050, country: "Germaniya", countryRu: "Германия", countryEn: "Germany", countryCyrl: "Германия" },

  // Japan — Uzbek workers
  { slug: "tokio", name: "Tokio", nameCyrl: "Токио", nameRu: "Токио", nameEn: "Tokyo", lat: 35.6762, lng: 139.6503, country: "Yaponiya", countryRu: "Япония", countryEn: "Japan", countryCyrl: "Япония" },
];

export function getInternationalCityBySlug(slug: string): InternationalCity | undefined {
  return INTERNATIONAL_CITIES.find((c) => c.slug === slug);
}

export function getInternationalCityName(city: InternationalCity, locale: string): string {
  if (locale === "uz-cyrl") return city.nameCyrl;
  if (locale === "ru") return city.nameRu;
  if (locale === "en") return city.nameEn;
  return city.name;
}

export function getInternationalCityCountry(city: InternationalCity, locale: string): string {
  if (locale === "uz-cyrl") return city.countryCyrl;
  if (locale === "ru") return city.countryRu;
  if (locale === "en") return city.countryEn;
  return city.country;
}
