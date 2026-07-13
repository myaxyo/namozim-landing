import { City } from "./cities";

/**
 * Cities and towns of Tajikistan.
 * Covers all provinces (viloyatho) and major districts.
 */
export const CITIES_TJ: City[] = [
  // Dushanbe (poytaxt)
  { slug: "dushanbe-tj", name: "Dushanbe", nameTg: "Душанбе", nameRu: "Душанбе", nameEn: "Dushanbe", lat: 38.5598, lng: 68.7740, region: "Dushanbe", regionRu: "Душанбе", regionTg: "Душанбе", regionKy: "Душанбе", country: "tj" },

  // Viloyati Sugd (Sogd viloyati)
  { slug: "khujand", name: "Xo'jand", nameTg: "Хуҷанд", nameRu: "Худжанд", nameEn: "Khujand", lat: 40.2826, lng: 69.6220, region: "Sugd viloyati", regionRu: "Согдийская область", regionTg: "Вилояти Суғд", regionKy: "Согд облусу", country: "tj" },
  { slug: "istaravshan", name: "Istaravshan", nameTg: "Истаравшан", nameRu: "Истаравшан", nameEn: "Istaravshan", lat: 39.9142, lng: 69.0042, region: "Sugd viloyati", regionRu: "Согдийская область", regionTg: "Вилояти Суғд", regionKy: "Согд облусу", country: "tj" },
  { slug: "buston", name: "Buston", nameTg: "Бустон", nameRu: "Бустон", nameEn: "Buston", lat: 40.2167, lng: 69.2000, region: "Sugd viloyati", regionRu: "Согдийская область", regionTg: "Вилояти Суғд", regionKy: "Согд облусу", country: "tj" },
  { slug: "panjakent", name: "Panjakent", nameTg: "Панҷакент", nameRu: "Пенджикент", nameEn: "Panjakent", lat: 39.4942, lng: 67.6108, region: "Sugd viloyati", regionRu: "Согдийская область", regionTg: "Вилояти Суғд", regionKy: "Согд облусу", country: "tj" },
  { slug: "konibodom", name: "Konibodom", nameTg: "Конибодом", nameRu: "Канибадам", nameEn: "Kanibadam", lat: 40.2922, lng: 70.4264, region: "Sugd viloyati", regionRu: "Согдийская область", regionTg: "Вилояти Суғд", regionKy: "Согд облусу", country: "tj" },
  { slug: "isfara", name: "Isfara", nameTg: "Исфара", nameRu: "Исфара", nameEn: "Isfara", lat: 40.1267, lng: 70.6250, region: "Sugd viloyati", regionRu: "Согдийская область", regionTg: "Вилояти Суғд", regionKy: "Согд облусу", country: "tj" },
  { slug: "guliston-tj", name: "Guliston", nameTg: "Гулистон", nameRu: "Гулистон", nameEn: "Guliston", lat: 40.5833, lng: 69.4333, region: "Sugd viloyati", regionRu: "Согдийская область", regionTg: "Вилояти Суғд", regionKy: "Согд облусу", country: "tj" },
  { slug: "taboshar", name: "Taboshar", nameTg: "Табошар", nameRu: "Табошар", nameEn: "Taboshar", lat: 40.5667, lng: 69.6333, region: "Sugd viloyati", regionRu: "Согдийская область", regionTg: "Вилояти Суғд", regionKy: "Согд облусу", country: "tj" },
  { slug: "chkalovsk", name: "Bunji", nameTg: "Бунҷикат", nameRu: "Чкаловск", nameEn: "Chkalovsk", lat: 40.2306, lng: 69.6875, region: "Sugd viloyati", regionRu: "Согдийская область", regionTg: "Вилояти Суғд", regionKy: "Согд облусу", country: "tj" },

  // Viloyati Khatlon
  { slug: "bokhtar", name: "Bokhtar", nameTg: "Бохтар", nameRu: "Бохтар", nameEn: "Bokhtar", lat: 37.8333, lng: 68.7833, region: "Xatlon viloyati", regionRu: "Хатлонская область", regionTg: "Вилояти Хатлон", regionKy: "Хатлон облусу", country: "tj" },
  { slug: "kulob", name: "Kulob", nameTg: "Кӯлоб", nameRu: "Куляб", nameEn: "Kulob", lat: 38.5500, lng: 69.7833, region: "Xatlon viloyati", regionRu: "Хатлонская область", regionTg: "Вилояти Хатлон", regionKy: "Хатлон облусу", country: "tj" },
  { slug: "norak", name: "Norak", nameTg: "Норак", nameRu: "Нурек", nameEn: "Nurek", lat: 38.3833, lng: 69.3167, region: "Xatlon viloyati", regionRu: "Хатлонская область", regionTg: "Вилояти Хатлон", regionKy: "Хатлон облусу", country: "tj" },
  { slug: "danghara", name: "Dang'ara", nameTg: "Данғара", nameRu: "Дангара", nameEn: "Danghara", lat: 38.0944, lng: 69.3333, region: "Xatlon viloyati", regionRu: "Хатлонская область", regionTg: "Вилояти Хатлон", regionKy: "Хатлон облусу", country: "tj" },
  { slug: "vahdat", name: "Vahdat", nameTg: "Ваҳдат", nameRu: "Вахдат", nameEn: "Vahdat", lat: 38.5500, lng: 69.0167, region: "Respublika bo'ysunuvidagi tumanlar", regionRu: "Районы республиканского подчинения", regionTg: "Ноҳияҳои тобеи ҷумҳурӣ", regionKy: "Республикалык районлор", country: "tj" },
  { slug: "yovon", name: "Yovon", nameTg: "Ёвон", nameRu: "Яван", nameEn: "Yavan", lat: 38.3500, lng: 69.0167, region: "Xatlon viloyati", regionRu: "Хатлонская область", regionTg: "Вилояти Хатлон", regionKy: "Хатлон облусу", country: "tj" },
  { slug: "sarband", name: "Sarband", nameTg: "Сарбанд", nameRu: "Сарбанд", nameEn: "Sarband", lat: 38.3833, lng: 68.7333, region: "Xatlon viloyati", regionRu: "Хатлонская область", regionTg: "Вилояти Хатлон", regionKy: "Хатлон облусу", country: "tj" },

  // GBAO
  { slug: "khorog", name: "Xorog", nameTg: "Хоруғ", nameRu: "Хорог", nameEn: "Khorog", lat: 37.5322, lng: 71.5128, region: "VMKB (GBAO)", regionRu: "ГБАО", regionTg: "ВМКБ", regionKy: "ТБАА", country: "tj" },
  { slug: "murghob", name: "Murg'ob", nameTg: "Мурғоб", nameRu: "Мургаб", nameEn: "Murghab", lat: 38.1667, lng: 74.0500, region: "VMKB (GBAO)", regionRu: "ГБАО", regionTg: "ВМКБ", regionKy: "ТБАА", country: "tj" },

  // DRD
  { slug: "rogun", name: "Rog'un", nameTg: "Роғун", nameRu: "Рогун", nameEn: "Rogun", lat: 38.5667, lng: 69.6333, region: "Respublika bo'ysunuvidagi tumanlar", regionRu: "Районы республиканского подчинения", regionTg: "Ноҳияҳои тобеи ҷумҳурӣ", regionKy: "Республикалык районлор", country: "tj" },
  { slug: "tursunzoda", name: "Tursunzoda", nameTg: "Турсунзода", nameRu: "Турсунзаде", nameEn: "Tursunzoda", lat: 38.5128, lng: 68.2314, region: "Respublika bo'ysunuvidagi tumanlar", regionRu: "Районы республиканского подчинения", regionTg: "Ноҳияҳои тобеи ҷумҳурӣ", regionKy: "Республикалык районлор", country: "tj" },
  { slug: "hisor", name: "Hisor", nameTg: "Ҳисор", nameRu: "Гиссар", nameEn: "Hisor", lat: 38.5258, lng: 68.5511, region: "Respublika bo'ysunuvidagi tumanlar", regionRu: "Районы республиканского подчинения", regionTg: "Ноҳияҳои тобеи ҷумҳурӣ", regionKy: "Республикалык районлор", country: "tj" },
];
