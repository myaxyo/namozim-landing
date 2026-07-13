import { City } from "./cities";

/**
 * Cities and towns of Kyrgyzstan.
 * Covers all 7 oblasts plus Bishkek and Osh cities.
 */
export const CITIES_KG: City[] = [
  // Bishkek (poytaxt)
  { slug: "bishkek-kg", name: "Bishkek", nameKy: "Бишкек", nameRu: "Бишкек", nameEn: "Bishkek", lat: 42.8746, lng: 74.5698, region: "Bishkek shahri", regionRu: "Бишкек", regionTg: "Бишкек", regionKy: "Бишкек шаары", country: "kg" },

  // Osh shahri
  { slug: "osh-kg", name: "O'sh", nameKy: "Ош", nameRu: "Ош", nameEn: "Osh", lat: 40.5283, lng: 72.7985, region: "O'sh shahri", regionRu: "город Ош", regionTg: "Ош", regionKy: "Ош шаары", country: "kg" },

  // Chuy oblasty
  { slug: "tokmok", name: "Tokmok", nameKy: "Токмок", nameRu: "Токмок", nameEn: "Tokmok", lat: 42.7667, lng: 75.3000, region: "Chuy oblasti", regionRu: "Чуйская область", regionTg: "Вилояти Чуй", regionKy: "Чүй облусу", country: "kg" },
  { slug: "kara-balta", name: "Kara-Balta", nameKy: "Кара-Балта", nameRu: "Кара-Балта", nameEn: "Kara-Balta", lat: 42.8167, lng: 73.8500, region: "Chuy oblasti", regionRu: "Чуйская область", regionTg: "Вилояти Чуй", regionKy: "Чүй облусу", country: "kg" },
  { slug: "kaindy", name: "Kayindi", nameKy: "Кайынды", nameRu: "Каинды", nameEn: "Kaindy", lat: 42.8833, lng: 74.9667, region: "Chuy oblasti", regionRu: "Чуйская область", regionTg: "Вилояти Чуй", regionKy: "Чүй облусу", country: "kg" },

  // Osh oblasty
  { slug: "ozgon", name: "O'zgan", nameKy: "Өзгөн", nameRu: "Узген", nameEn: "Ozgon", lat: 40.7667, lng: 73.3000, region: "O'sh oblasti", regionRu: "Ошская область", regionTg: "Вилояти Ош", regionKy: "Ош облусу", country: "kg" },
  { slug: "kara-suu", name: "Qorasuv", nameKy: "Кара-Суу", nameRu: "Кара-Суу", nameEn: "Kara-Suu", lat: 40.7000, lng: 72.8500, region: "O'sh oblasti", regionRu: "Ошская область", regionTg: "Вилояти Ош", regionKy: "Ош облусу", country: "kg" },
  { slug: "nookat", name: "No'oqat", nameKy: "Ноокат", nameRu: "Ноокат", nameEn: "Nookat", lat: 40.2667, lng: 72.0167, region: "O'sh oblasti", regionRu: "Ошская область", regionTg: "Вилояти Ош", regionKy: "Ош облусу", country: "kg" },

  // Jalal-Abad oblasty
  { slug: "jalal-abad", name: "Jalol-Obod", nameKy: "Жалал-Абад", nameRu: "Джалал-Абад", nameEn: "Jalal-Abad", lat: 40.9333, lng: 73.0000, region: "Jalol-Obod oblasti", regionRu: "Джалал-Абадская область", regionTg: "Вилояти Ҷалолобод", regionKy: "Жалал-Абад облусу", country: "kg" },
  { slug: "tash-komur", name: "Tash-Ko'mir", nameKy: "Таш-Көмүр", nameRu: "Таш-Кумыр", nameEn: "Tash-Kumyr", lat: 41.3500, lng: 72.2333, region: "Jalol-Obod oblasti", regionRu: "Джалал-Абадская область", regionTg: "Вилояти Ҷалолобод", regionKy: "Жалал-Абад облусу", country: "kg" },
  { slug: "mailuu-suu", name: "Mayli-Say", nameKy: "Майлуу-Суу", nameRu: "Майлуу-Суу", nameEn: "Mailuu-Suu", lat: 41.2667, lng: 72.4500, region: "Jalol-Obod oblasti", regionRu: "Джалал-Абадская область", regionTg: "Вилояти Ҷалолобод", regionKy: "Жалал-Абад облусу", country: "kg" },
  { slug: "kara-kul-kg", name: "Qorakol", nameKy: "Кара-Көл", nameRu: "Кара-Куль", nameEn: "Kara-Kul", lat: 41.6167, lng: 72.6833, region: "Jalol-Obod oblasti", regionRu: "Джалал-Абадская область", regionTg: "Вилояти Ҷалолобод", regionKy: "Жалал-Абад облусу", country: "kg" },
  { slug: "kerben", name: "Kerben", nameKy: "Кербен", nameRu: "Кербен", nameEn: "Kerben", lat: 41.4833, lng: 71.7500, region: "Jalol-Obod oblasti", regionRu: "Джалал-Абадская область", regionTg: "Вилояти Ҷалолобод", regionKy: "Жалал-Абад облусу", country: "kg" },

  // Issyk-Kul oblasty
  { slug: "karakol", name: "Karakol", nameKy: "Каракол", nameRu: "Каракол", nameEn: "Karakol", lat: 42.4900, lng: 78.3900, region: "Issiqko'l oblasti", regionRu: "Иссык-Кульская область", regionTg: "Вилояти Иссиқкул", regionKy: "Ысык-Көл облусу", country: "kg" },
  { slug: "balykchy", name: "Baliqchi", nameKy: "Балыкчы", nameRu: "Балыкчи", nameEn: "Balykchy", lat: 42.4600, lng: 76.1900, region: "Issiqko'l oblasti", regionRu: "Иссык-Кульская область", regionTg: "Вилояти Иссиқкул", regionKy: "Ысык-Көл облусу", country: "kg" },
  { slug: "cholpon-ata", name: "Cho'lpon-Ota", nameKy: "Чолпон-Ата", nameRu: "Чолпон-Ата", nameEn: "Cholpon-Ata", lat: 42.6500, lng: 77.0833, region: "Issiqko'l oblasti", regionRu: "Иссык-Кульская область", regionTg: "Вилояти Иссиқкул", regionKy: "Ысык-Көл облусу", country: "kg" },

  // Naryn oblasty
  { slug: "naryn", name: "Naryn", nameKy: "Нарын", nameRu: "Нарын", nameEn: "Naryn", lat: 41.4333, lng: 76.0000, region: "Narin oblasti", regionRu: "Нарынская область", regionTg: "Вилояти Нарин", regionKy: "Нарын облусу", country: "kg" },

  // Talas oblasty
  { slug: "talas-kg", name: "Talas", nameKy: "Талас", nameRu: "Талас", nameEn: "Talas", lat: 42.5167, lng: 72.2333, region: "Talas oblasti", regionRu: "Таласская область", regionTg: "Вилояти Талас", regionKy: "Талас облусу", country: "kg" },

  // Batken oblasty
  { slug: "batken", name: "Batken", nameKy: "Баткен", nameRu: "Баткен", nameEn: "Batken", lat: 40.0556, lng: 70.8194, region: "Botken oblasti", regionRu: "Баткенская область", regionTg: "Вилояти Боткан", regionKy: "Баткен облусу", country: "kg" },
  { slug: "suluktu", name: "Suluqtu", nameKy: "Сүлүктү", nameRu: "Сулюкта", nameEn: "Suluktu", lat: 39.9333, lng: 69.5667, region: "Botken oblasti", regionRu: "Баткенская область", regionTg: "Вилояти Боткан", regionKy: "Баткен облусу", country: "kg" },
  { slug: "isfana", name: "Isfana", nameKy: "Исфана", nameRu: "Исфана", nameEn: "Isfana", lat: 39.8389, lng: 69.5278, region: "Botken oblasti", regionRu: "Баткенская область", regionTg: "Вилояти Боткан", regionKy: "Баткен облусу", country: "kg" },
  { slug: "kadamjay", name: "Kadamjay", nameKy: "Кадамжай", nameRu: "Кадамжай", nameEn: "Kadamjay", lat: 40.1333, lng: 71.7500, region: "Botken oblasti", regionRu: "Баткенская область", regionTg: "Вилояти Боткан", regionKy: "Баткен облусу", country: "kg" },
];
