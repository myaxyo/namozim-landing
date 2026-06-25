export interface District {
  slug: string;
  name: string;
  nameRu: string;
  nameEn: string;
  citySlug: string; // parent city/region slug
  lat: number;
  lng: number;
}

export const DISTRICTS: District[] = [
  // Andijon viloyati
  { slug: "oltinkol", name: "Oltinko'l", nameRu: "Алтынкуль", nameEn: "Altinkul", citySlug: "andijon", lat: 40.83, lng: 72.18 },
  { slug: "baliqchi", name: "Baliqchi", nameRu: "Балыкчи", nameEn: "Baliqchi", citySlug: "andijon", lat: 40.82, lng: 72.58 },
  { slug: "boz", name: "Bo'z", nameRu: "Боз", nameEn: "Boz", citySlug: "andijon", lat: 40.67, lng: 72.00 },
  { slug: "buloqboshi", name: "Buloqboshi", nameRu: "Булакбаши", nameEn: "Bulakbashi", citySlug: "andijon", lat: 40.62, lng: 72.38 },
  { slug: "jalaquduq", name: "Jalaquduq", nameRu: "Джалалкудук", nameEn: "Jalalkuduk", citySlug: "andijon", lat: 40.95, lng: 72.17 },
  { slug: "izboskan", name: "Izboskan", nameRu: "Избаскан", nameEn: "Izboskan", citySlug: "andijon", lat: 40.92, lng: 72.50 },
  { slug: "ulugnor", name: "Ulug'nor", nameRu: "Улугнор", nameEn: "Ulugnor", citySlug: "andijon", lat: 40.75, lng: 72.57 },
  { slug: "qorgontepa", name: "Qo'rg'ontepa", nameRu: "Кургантепа", nameEn: "Kurgantepa", citySlug: "andijon", lat: 40.93, lng: 72.08 },
  { slug: "asaka-t", name: "Asaka tumani", nameRu: "Асакинский район", nameEn: "Asaka district", citySlug: "andijon", lat: 40.64, lng: 72.24 },
  { slug: "marxamat", name: "Marxamat", nameRu: "Мархамат", nameEn: "Markhamat", citySlug: "andijon", lat: 40.48, lng: 72.31 },
  { slug: "shahrixon-t", name: "Shahrixon tumani", nameRu: "Шахриханский район", nameEn: "Shahrikhan district", citySlug: "andijon", lat: 40.72, lng: 72.05 },
  { slug: "paxtaobod", name: "Paxtaobod", nameRu: "Пахтаабад", nameEn: "Pakhtaabad", citySlug: "andijon", lat: 40.73, lng: 72.47 },
  { slug: "xojaobod", name: "Xo'jaobod", nameRu: "Ходжаабад", nameEn: "Khodjaabad", citySlug: "andijon", lat: 40.66, lng: 72.52 },
  // Buxoro viloyati
  { slug: "olot", name: "Olot", nameRu: "Алат", nameEn: "Alat", citySlug: "buxoro", lat: 39.64, lng: 63.96 },
  { slug: "buxoro-t", name: "Buxoro tumani", nameRu: "Бухарский район", nameEn: "Bukhara district", citySlug: "buxoro", lat: 39.83, lng: 64.35 },
  { slug: "vobkent", name: "Vobkent", nameRu: "Вабкент", nameEn: "Vabkent", citySlug: "buxoro", lat: 40.02, lng: 64.52 },
  { slug: "gijduvon-t", name: "G'ijduvon tumani", nameRu: "Гиждуванский район", nameEn: "Gijduvan district", citySlug: "buxoro", lat: 40.10, lng: 64.68 },
  { slug: "qorakol", name: "Qorako'l", nameRu: "Каракуль", nameEn: "Karakul", citySlug: "buxoro", lat: 39.50, lng: 63.85 },
  { slug: "qorovulbozor", name: "Qorovulbozor", nameRu: "Караулбазар", nameEn: "Karaulbazar", citySlug: "buxoro", lat: 39.52, lng: 64.85 },
  { slug: "peshku", name: "Peshku", nameRu: "Пешку", nameEn: "Peshku", citySlug: "buxoro", lat: 39.22, lng: 63.90 },
  { slug: "romitan", name: "Romitan", nameRu: "Ромитан", nameEn: "Romitan", citySlug: "buxoro", lat: 39.93, lng: 64.19 },
  { slug: "jondor", name: "Jondor", nameRu: "Жондор", nameEn: "Jondor", citySlug: "buxoro", lat: 40.07, lng: 64.16 },
  { slug: "shofirkon", name: "Shofirkon", nameRu: "Шафиркан", nameEn: "Shafirkan", citySlug: "buxoro", lat: 40.17, lng: 64.50 },
  // Farg'ona viloyati
  { slug: "oltiariq", name: "Oltiariq", nameRu: "Алтыарык", nameEn: "Altiariq", citySlug: "fargona", lat: 40.39, lng: 71.59 },
  { slug: "qoshtepa", name: "Qo'shtepa", nameRu: "Куштепа", nameEn: "Kushtepa", citySlug: "fargona", lat: 40.53, lng: 71.63 },
  { slug: "bogdod", name: "Bog'dod", nameRu: "Багдад", nameEn: "Bagdad", citySlug: "fargona", lat: 40.56, lng: 71.25 },
  { slug: "buvayda", name: "Buvayda", nameRu: "Бувайда", nameEn: "Buvayda", citySlug: "fargona", lat: 40.44, lng: 71.45 },
  { slug: "beshariq", name: "Beshariq", nameRu: "Бешарык", nameEn: "Beshariq", citySlug: "fargona", lat: 40.45, lng: 70.67 },
  { slug: "quva-t", name: "Quva tumani", nameRu: "Кувинский район", nameEn: "Kuva district", citySlug: "fargona", lat: 40.52, lng: 72.07 },
  { slug: "uchkoprik", name: "Uchko'prik", nameRu: "Учкуприк", nameEn: "Uchkuprik", citySlug: "fargona", lat: 40.55, lng: 71.03 },
  { slug: "rishton-t", name: "Rishton tumani", nameRu: "Риштанский район", nameEn: "Rishtan district", citySlug: "fargona", lat: 40.35, lng: 71.28 },
  { slug: "sox", name: "So'x", nameRu: "Сох", nameEn: "Sokh", citySlug: "fargona", lat: 39.97, lng: 71.14 },
  { slug: "toshloq", name: "Toshloq", nameRu: "Ташлак", nameEn: "Tashlak", citySlug: "fargona", lat: 40.56, lng: 71.42 },
  { slug: "uzbekiston-t", name: "O'zbekiston tumani", nameRu: "Узбекистанский район", nameEn: "Uzbekistan district", citySlug: "fargona", lat: 40.33, lng: 71.71 },
  { slug: "fargona-t", name: "Farg'ona tumani", nameRu: "Ферганский район", nameEn: "Fergana district", citySlug: "fargona", lat: 40.40, lng: 71.80 },
  { slug: "dangara", name: "Dang'ara", nameRu: "Дангара", nameEn: "Dangara", citySlug: "fargona", lat: 40.58, lng: 70.93 },
  { slug: "furqat", name: "Furqat", nameRu: "Фуркат", nameEn: "Furkat", citySlug: "fargona", lat: 40.30, lng: 71.60 },
  { slug: "yozyovon", name: "Yozyovon", nameRu: "Язъяван", nameEn: "Yazyavan", citySlug: "fargona", lat: 40.65, lng: 71.75 },
  // Jizzax viloyati
  { slug: "arnasoy", name: "Arnasoy", nameRu: "Арнасай", nameEn: "Arnasay", citySlug: "jizzax", lat: 40.61, lng: 68.22 },
  { slug: "baxmal", name: "Baxmal", nameRu: "Бахмаль", nameEn: "Bakhmal", citySlug: "jizzax", lat: 39.92, lng: 68.46 },
  { slug: "gallaorol", name: "G'allaorol", nameRu: "Галляарал", nameEn: "Gallaaral", citySlug: "jizzax", lat: 40.42, lng: 67.68 },
  { slug: "dostlik", name: "Do'stlik", nameRu: "Дустлик", nameEn: "Dustlik", citySlug: "jizzax", lat: 40.53, lng: 67.95 },
  { slug: "zomin", name: "Zomin", nameRu: "Заамин", nameEn: "Zaamin", citySlug: "jizzax", lat: 39.95, lng: 68.42 },
  { slug: "zarbdor", name: "Zarbdor", nameRu: "Зарбдар", nameEn: "Zarbdor", citySlug: "jizzax", lat: 40.55, lng: 67.56 },
  { slug: "mirzachol", name: "Mirzacho'l", nameRu: "Мирзачуль", nameEn: "Mirzachul", citySlug: "jizzax", lat: 40.73, lng: 68.47 },
  { slug: "zafarobod", name: "Zafarobod", nameRu: "Зафарабад", nameEn: "Zafarabad", citySlug: "jizzax", lat: 40.55, lng: 68.59 },
  { slug: "paxtakor", name: "Paxtakor", nameRu: "Пахтакор", nameEn: "Pakhtakor", citySlug: "jizzax", lat: 40.32, lng: 67.87 },
  { slug: "forish", name: "Forish", nameRu: "Фариш", nameEn: "Forish", citySlug: "jizzax", lat: 40.35, lng: 66.81 },
  { slug: "yangiobod", name: "Yangiobod", nameRu: "Янгиабад", nameEn: "Yangiabad", citySlug: "jizzax", lat: 39.77, lng: 68.52 },
  // Namangan viloyati
  { slug: "mingbuloq", name: "Mingbuloq", nameRu: "Мингбулак", nameEn: "Mingbulak", citySlug: "namangan", lat: 41.10, lng: 71.45 },
  { slug: "kosonsoy-t", name: "Kosonsoy tumani", nameRu: "Касансайский район", nameEn: "Kasansay district", citySlug: "namangan", lat: 41.25, lng: 71.55 },
  { slug: "namangan-t", name: "Namangan tumani", nameRu: "Наманганский район", nameEn: "Namangan district", citySlug: "namangan", lat: 41.02, lng: 71.60 },
  { slug: "norin", name: "Norin", nameRu: "Нарын", nameEn: "Naryn", citySlug: "namangan", lat: 41.08, lng: 71.90 },
  { slug: "pop-t", name: "Pop tumani", nameRu: "Папский район", nameEn: "Pop district", citySlug: "namangan", lat: 40.88, lng: 71.10 },
  { slug: "toraqorgon", name: "To'raqo'rg'on", nameRu: "Туракурган", nameEn: "Turakurgan", citySlug: "namangan", lat: 41.05, lng: 71.52 },
  { slug: "uychi", name: "Uychi", nameRu: "Уйчи", nameEn: "Uychi", citySlug: "namangan", lat: 41.08, lng: 71.77 },
  { slug: "uchqorgon", name: "Uchqo'rg'on", nameRu: "Учкурган", nameEn: "Uchkurgan", citySlug: "namangan", lat: 41.13, lng: 71.05 },
  { slug: "chortoq-t", name: "Chortoq tumani", nameRu: "Чартакский район", nameEn: "Chartak district", citySlug: "namangan", lat: 41.07, lng: 71.82 },
  { slug: "chust-t", name: "Chust tumani", nameRu: "Чустский район", nameEn: "Chust district", citySlug: "namangan", lat: 41.00, lng: 71.23 },
  { slug: "yangiqorgon", name: "Yangiqo'rg'on", nameRu: "Янгикурган", nameEn: "Yangikurgan", citySlug: "namangan", lat: 40.96, lng: 71.72 },
  // Navoiy viloyati
  { slug: "konimex", name: "Konimex", nameRu: "Канимех", nameEn: "Kanimekh", citySlug: "navoiy", lat: 40.35, lng: 65.60 },
  { slug: "qiziltepa", name: "Qiziltepa", nameRu: "Кызылтепа", nameEn: "Kyzyltepa", citySlug: "navoiy", lat: 40.03, lng: 65.18 },
  { slug: "navbahor", name: "Navbahor", nameRu: "Навбахор", nameEn: "Navbahor", citySlug: "navoiy", lat: 40.05, lng: 65.40 },
  { slug: "karmana", name: "Karmana", nameRu: "Кармана", nameEn: "Karmana", citySlug: "navoiy", lat: 40.14, lng: 65.37 },
  { slug: "nurota", name: "Nurota", nameRu: "Нурата", nameEn: "Nurata", citySlug: "navoiy", lat: 40.56, lng: 65.69 },
  { slug: "tomdi", name: "Tomdi", nameRu: "Тамды", nameEn: "Tamdy", citySlug: "navoiy", lat: 42.20, lng: 64.62 },
  { slug: "xatirchi", name: "Xatirchi", nameRu: "Хатырчи", nameEn: "Khatirchi", citySlug: "navoiy", lat: 39.91, lng: 65.79 },
  // Qashqadaryo viloyati
  { slug: "guzor-t", name: "G'uzor tumani", nameRu: "Гузарский район", nameEn: "Guzar district", citySlug: "qarshi", lat: 38.62, lng: 66.25 },
  { slug: "dehqonobod", name: "Dehqonobod", nameRu: "Дехканабад", nameEn: "Dekhkanabad", citySlug: "qarshi", lat: 38.35, lng: 66.50 },
  { slug: "qamashi", name: "Qamashi", nameRu: "Камаши", nameEn: "Kamashi", citySlug: "qarshi", lat: 38.83, lng: 65.58 },
  { slug: "koson", name: "Koson", nameRu: "Касан", nameEn: "Kasan", citySlug: "qarshi", lat: 39.05, lng: 65.63 },
  { slug: "mirishkor", name: "Mirishkor", nameRu: "Миришкор", nameEn: "Mirishkor", citySlug: "qarshi", lat: 38.95, lng: 65.37 },
  { slug: "muborak-t", name: "Muborak tumani", nameRu: "Мубарекский район", nameEn: "Mubarek district", citySlug: "qarshi", lat: 39.17, lng: 65.25 },
  { slug: "nishon", name: "Nishon", nameRu: "Нишан", nameEn: "Nishan", citySlug: "qarshi", lat: 38.50, lng: 65.50 },
  { slug: "kasbi", name: "Kasbi", nameRu: "Касби", nameEn: "Kasbi", citySlug: "qarshi", lat: 38.92, lng: 65.90 },
  { slug: "chiroqchi", name: "Chiroqchi", nameRu: "Чиракчи", nameEn: "Chirakchi", citySlug: "qarshi", lat: 38.97, lng: 66.57 },
  { slug: "yakkabog", name: "Yakkabog'", nameRu: "Яккабаг", nameEn: "Yakkabag", citySlug: "qarshi", lat: 38.99, lng: 66.73 },
  // Samarqand viloyati
  { slug: "oqdaryo", name: "Oqdaryo", nameRu: "Акдарья", nameEn: "Akdarya", citySlug: "samarqand", lat: 39.62, lng: 67.27 },
  { slug: "bulungur", name: "Bulung'ur", nameRu: "Булунгур", nameEn: "Bulungur", citySlug: "samarqand", lat: 39.77, lng: 67.27 },
  { slug: "jomboy", name: "Jomboy", nameRu: "Джамбай", nameEn: "Jambay", citySlug: "samarqand", lat: 39.72, lng: 67.33 },
  { slug: "ishtixon", name: "Ishtixon", nameRu: "Иштыхан", nameEn: "Ishtikhan", citySlug: "samarqand", lat: 39.93, lng: 66.53 },
  { slug: "kattaqorgon-t", name: "Kattaqo'rg'on tumani", nameRu: "Каттакурганский район", nameEn: "Kattakurgan district", citySlug: "samarqand", lat: 39.90, lng: 66.25 },
  { slug: "qoshrabot", name: "Qo'shrabot", nameRu: "Кушрабад", nameEn: "Kushrabat", citySlug: "samarqand", lat: 39.68, lng: 66.58 },
  { slug: "narpay", name: "Narpay", nameRu: "Нарпай", nameEn: "Narpay", citySlug: "samarqand", lat: 39.88, lng: 66.47 },
  { slug: "payariq", name: "Payariq", nameRu: "Паярык", nameEn: "Payariq", citySlug: "samarqand", lat: 39.57, lng: 67.22 },
  { slug: "pastdargom", name: "Pastdarg'om", nameRu: "Пастдаргом", nameEn: "Pastdargom", citySlug: "samarqand", lat: 39.55, lng: 66.77 },
  { slug: "paxtachi", name: "Paxtachi", nameRu: "Пахтачи", nameEn: "Pakhtachi", citySlug: "samarqand", lat: 39.72, lng: 66.95 },
  { slug: "nurobod", name: "Nurobod", nameRu: "Нурабад", nameEn: "Nurobod", citySlug: "samarqand", lat: 39.35, lng: 67.04 },
  { slug: "urgut-t", name: "Urgut tumani", nameRu: "Ургутский район", nameEn: "Urgut district", citySlug: "samarqand", lat: 39.40, lng: 67.23 },
  { slug: "tayloq", name: "Tayloq", nameRu: "Тайлак", nameEn: "Tayloq", citySlug: "samarqand", lat: 39.62, lng: 67.44 },
  // Surxondaryo viloyati
  { slug: "oltinsoy", name: "Oltinsoy", nameRu: "Алтынсай", nameEn: "Altinsoy", citySlug: "termiz", lat: 38.48, lng: 67.33 },
  { slug: "angor", name: "Angor", nameRu: "Ангор", nameEn: "Angor", citySlug: "termiz", lat: 37.52, lng: 67.15 },
  { slug: "boysun", name: "Boysun", nameRu: "Байсун", nameEn: "Baysun", citySlug: "termiz", lat: 38.22, lng: 67.19 },
  { slug: "muzrabot", name: "Muzrabot", nameRu: "Музрабад", nameEn: "Muzrabad", citySlug: "termiz", lat: 37.67, lng: 66.60 },
  { slug: "denov-t", name: "Denov tumani", nameRu: "Денауский район", nameEn: "Denau district", citySlug: "termiz", lat: 38.28, lng: 67.89 },
  { slug: "jarqorgon", name: "Jarqo'rg'on", nameRu: "Джаркурган", nameEn: "Jarkurgan", citySlug: "termiz", lat: 37.50, lng: 67.42 },
  { slug: "qumqorgon", name: "Qumqo'rg'on", nameRu: "Кумкурган", nameEn: "Kumkurgan", citySlug: "termiz", lat: 37.85, lng: 67.15 },
  { slug: "qiziriq", name: "Qiziriq", nameRu: "Кизирик", nameEn: "Kizirik", citySlug: "termiz", lat: 37.65, lng: 67.20 },
  { slug: "sariosiyo", name: "Sariosiyo", nameRu: "Сариасия", nameEn: "Sariosiyo", citySlug: "termiz", lat: 38.40, lng: 67.93 },
  { slug: "uzun", name: "Uzun", nameRu: "Узун", nameEn: "Uzun", citySlug: "termiz", lat: 38.20, lng: 67.48 },
  { slug: "sherobod-t", name: "Sherobod tumani", nameRu: "Шерабадский район", nameEn: "Sherabad district", citySlug: "termiz", lat: 37.65, lng: 67.00 },
  { slug: "shorchi", name: "Sho'rchi", nameRu: "Шурчи", nameEn: "Shurchi", citySlug: "termiz", lat: 37.95, lng: 67.77 },
  // Toshkent viloyati
  { slug: "oqqorgon", name: "Oqqo'rg'on", nameRu: "Аккурган", nameEn: "Akkurgan", citySlug: "toshkent", lat: 41.05, lng: 69.73 },
  { slug: "ohangaron-t", name: "Ohangaron tumani", nameRu: "Ахангаранский район", nameEn: "Akhangaran district", citySlug: "toshkent", lat: 41.07, lng: 69.63 },
  { slug: "bekobod-t", name: "Bekobod tumani", nameRu: "Бекабадский район", nameEn: "Bekabad district", citySlug: "toshkent", lat: 40.24, lng: 69.26 },
  { slug: "bostonliq", name: "Bo'stonliq", nameRu: "Бостанлык", nameEn: "Bostanliq", citySlug: "toshkent", lat: 41.58, lng: 69.83 },
  { slug: "boka", name: "Bo'ka", nameRu: "Бука", nameEn: "Buka", citySlug: "toshkent", lat: 40.82, lng: 68.80 },
  { slug: "zangiota", name: "Zangiota", nameRu: "Зангиата", nameEn: "Zangiota", citySlug: "toshkent", lat: 41.19, lng: 69.10 },
  { slug: "yuqorichirchiq", name: "Yuqorichirchiq", nameRu: "Юкоричирчик", nameEn: "Upper Chirchik", citySlug: "toshkent", lat: 41.50, lng: 69.70 },
  { slug: "qibray", name: "Qibray", nameRu: "Кибрай", nameEn: "Kibray", citySlug: "toshkent", lat: 41.37, lng: 69.42 },
  { slug: "parkent", name: "Parkent", nameRu: "Паркент", nameEn: "Parkent", citySlug: "toshkent", lat: 41.30, lng: 69.68 },
  { slug: "piskent", name: "Piskent", nameRu: "Пскент", nameEn: "Piskent", citySlug: "toshkent", lat: 41.12, lng: 69.35 },
  { slug: "ortachirchiq", name: "O'rtachirchiq", nameRu: "Уртачирчик", nameEn: "Middle Chirchik", citySlug: "toshkent", lat: 41.32, lng: 69.33 },
  { slug: "chinoz", name: "Chinoz", nameRu: "Чиназ", nameEn: "Chinaz", citySlug: "toshkent", lat: 40.94, lng: 68.77 },
  { slug: "yangiyol-t", name: "Yangiyo'l tumani", nameRu: "Янгиюльский район", nameEn: "Yangiyul district", citySlug: "toshkent", lat: 41.11, lng: 69.05 },
  // Sirdaryo viloyati
  { slug: "oqoltin", name: "Oqoltin", nameRu: "Акалтын", nameEn: "Akaltin", citySlug: "guliston", lat: 40.54, lng: 68.81 },
  { slug: "boyovut", name: "Boyovut", nameRu: "Баяут", nameEn: "Bayaut", citySlug: "guliston", lat: 40.20, lng: 68.40 },
  { slug: "sayxunobod", name: "Sayxunobod", nameRu: "Сайхунабад", nameEn: "Saykhunabad", citySlug: "guliston", lat: 40.45, lng: 68.85 },
  { slug: "guliston-t", name: "Guliston tumani", nameRu: "Гулистанский район", nameEn: "Gulistan district", citySlug: "guliston", lat: 40.50, lng: 68.79 },
  { slug: "sardoba", name: "Sardoba", nameRu: "Сардоба", nameEn: "Sardaba", citySlug: "guliston", lat: 40.30, lng: 68.35 },
  { slug: "mirzaobod", name: "Mirzaobod", nameRu: "Мирзаабад", nameEn: "Mirzaabad", citySlug: "guliston", lat: 40.22, lng: 68.73 },
  { slug: "sirdaryo-t", name: "Sirdaryo tumani", nameRu: "Сырдарьинский район", nameEn: "Syrdarya district", citySlug: "guliston", lat: 40.82, lng: 68.65 },
  { slug: "xovos", name: "Xovos", nameRu: "Хавас", nameEn: "Khavast", citySlug: "guliston", lat: 40.10, lng: 68.85 },
  // Xorazm viloyati
  { slug: "bogot", name: "Bog'ot", nameRu: "Багат", nameEn: "Bagat", citySlug: "urganch", lat: 41.43, lng: 60.82 },
  { slug: "gurlan", name: "Gurlan", nameRu: "Гурлен", nameEn: "Gurlan", citySlug: "urganch", lat: 41.71, lng: 60.63 },
  { slug: "qoshkopir", name: "Qo'shko'pir", nameRu: "Кошкупыр", nameEn: "Koshkupyr", citySlug: "urganch", lat: 41.53, lng: 60.33 },
  { slug: "urganch-t", name: "Urganch tumani", nameRu: "Ургенчский район", nameEn: "Urgench district", citySlug: "urganch", lat: 41.56, lng: 60.62 },
  { slug: "xazorasp", name: "Xazorasp", nameRu: "Хазарасп", nameEn: "Khazarasp", citySlug: "urganch", lat: 41.32, lng: 61.07 },
  { slug: "xonqa", name: "Xonqa", nameRu: "Ханка", nameEn: "Khanka", citySlug: "urganch", lat: 41.52, lng: 60.92 },
  { slug: "shovot", name: "Shovot", nameRu: "Шават", nameEn: "Shavat", citySlug: "urganch", lat: 41.63, lng: 60.72 },
  { slug: "yangiariq", name: "Yangiariq", nameRu: "Янгиарык", nameEn: "Yangiariq", citySlug: "urganch", lat: 41.48, lng: 60.58 },
  { slug: "yangibozor", name: "Yangibozor", nameRu: "Янгибазар", nameEn: "Yangibazar", citySlug: "urganch", lat: 41.75, lng: 60.53 },
  // Qoraqalpog'iston
  { slug: "amudaryo", name: "Amudaryo", nameRu: "Амударья", nameEn: "Amudarya", citySlug: "nukus", lat: 42.10, lng: 59.75 },
  { slug: "beruniy-t", name: "Beruniy tumani", nameRu: "Берунийский район", nameEn: "Beruni district", citySlug: "nukus", lat: 41.68, lng: 60.75 },
  { slug: "qoraozak", name: "Qorao'zak", nameRu: "Караузяк", nameEn: "Karauzak", citySlug: "nukus", lat: 42.05, lng: 60.00 },
  { slug: "kegeyli", name: "Kegeyli", nameRu: "Кегейли", nameEn: "Kegeyli", citySlug: "nukus", lat: 42.78, lng: 58.75 },
  { slug: "qanlikol", name: "Qanliko'l", nameRu: "Канлыкуль", nameEn: "Kanlikul", citySlug: "nukus", lat: 42.30, lng: 59.00 },
  { slug: "moynoq-t", name: "Mo'ynoq tumani", nameRu: "Муйнакский район", nameEn: "Moynaq district", citySlug: "nukus", lat: 43.77, lng: 58.68 },
  { slug: "nukus-t", name: "Nukus tumani", nameRu: "Нукусский район", nameEn: "Nukus district", citySlug: "nukus", lat: 42.46, lng: 59.58 },
  { slug: "taxiatosh-t", name: "Taxiatosh tumani", nameRu: "Тахиаташский район", nameEn: "Takhiatash district", citySlug: "nukus", lat: 42.27, lng: 59.60 },
  { slug: "taxtakopir", name: "Taxtako'pir", nameRu: "Тахтакупыр", nameEn: "Takhtakupyr", citySlug: "nukus", lat: 43.02, lng: 57.72 },
  { slug: "tortkol-t", name: "To'rtko'l tumani", nameRu: "Турткульский район", nameEn: "Turtkul district", citySlug: "nukus", lat: 41.55, lng: 60.92 },
  { slug: "xojayli", name: "Xo'jayli", nameRu: "Ходжейли", nameEn: "Khodjeyli", citySlug: "nukus", lat: 42.40, lng: 59.45 },
  { slug: "chimboy", name: "Chimboy", nameRu: "Чимбай", nameEn: "Chimbay", citySlug: "nukus", lat: 42.93, lng: 59.77 },
  { slug: "shumanay", name: "Shumanay", nameRu: "Шуманай", nameEn: "Shumanay", citySlug: "nukus", lat: 42.72, lng: 59.05 },
  { slug: "ellikqala", name: "Ellikqal'a", nameRu: "Элликкала", nameEn: "Ellikkala", citySlug: "nukus", lat: 41.70, lng: 60.52 },
];

export function getDistrictsByCity(citySlug: string): District[] {
  return DISTRICTS.filter((d) => d.citySlug === citySlug);
}

export function getDistrictBySlug(slug: string): District | undefined {
  return DISTRICTS.find((d) => d.slug === slug);
}

export function getDistrictName(d: District, locale: string): string {
  if (locale === "ru") return d.nameRu;
  if (locale === "en") return d.nameEn;
  return d.name;
}
