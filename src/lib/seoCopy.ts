import type { Locale } from "@/data/translations";

/**
 * Search-snippet copy (titles + meta descriptions) for every page type.
 *
 * Why this exists: Search Console showed ~0.3% CTR at average position ~7.5.
 * The old titles put the actual prayer times in the SERP ("Bomdod 05:12 | Shom 18:30").
 * That answers the query without a click (zero-click), and because Google caches
 * titles for days the shown times were often stale. The new copy:
 *  - starts with the exact query phrasing ("Toshkent namoz vaqtlari bugun"),
 *  - stays under ~60 chars so it isn't truncated on mobile,
 *  - uses the current month as a freshness signal instead of exact times,
 *  - tells the user what they get by clicking (countdown, monthly table, districts).
 */

export interface SnippetCopy {
  title: string;
  description: string;
}

const TZ = "Asia/Tashkent";

const MONTHS: Record<Locale, string[]> = {
  uz: ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"],
  "uz-cyrl": ["январ", "феврал", "март", "апрел", "май", "июн", "июл", "август", "сентябр", "октябр", "ноябр", "декабр"],
  ru: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  tg: ["январ", "феврал", "март", "апрел", "май", "июн", "июл", "август", "сентябр", "октябр", "ноябр", "декабр"],
  ky: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
};

/** Current month index (0-11) and year in Uzbekistan time, independent of server TZ. */
function nowParts(date = new Date()): { month: number; year: number } {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, year: "numeric", month: "numeric" }).formatToParts(date);
  const month = Number(parts.find((p) => p.type === "month")?.value ?? date.getMonth() + 1) - 1;
  const year = Number(parts.find((p) => p.type === "year")?.value ?? date.getFullYear());
  return { month, year };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** e.g. "oktabr 2026" (lower) / "Oktabr 2026" (capitalised) */
export function monthYear(locale: Locale, capitalise = false, date?: Date): string {
  const { month, year } = nowParts(date);
  const m = MONTHS[locale]?.[month] ?? MONTHS.uz[month];
  return `${capitalise ? cap(m) : m} ${year}`;
}

export function currentYear(date?: Date): number {
  return nowParts(date).year;
}

// ---------------------------------------------------------------------------
// City page: /[locale]/[city]
// ---------------------------------------------------------------------------
export function cityCopy(l: Locale, name: string): SnippetCopy {
  const M = monthYear(l, true);
  const m = monthYear(l);
  const y = currentYear();
  const map: Record<Locale, SnippetCopy> = {
    uz: {
      title: `Namoz Vaqtlari ${name} Bugun (Rasmiy Taqvim ${y})`,
      description: `${name} bo'yicha bugungi aniq namoz vaqtlari (O‘zbekiston musulmonlari idorasi rasmiy taqvimi, Hanafiy). Bomdod, Peshin, Asr, Shom, Xufton soatlari va ${m} oylik jadvali.`,
    },
    "uz-cyrl": {
      title: `Намоз Вақтлари ${name} Бугун (Расмий Тақвим ${y})`,
      description: `${name} бўйича бугунги аниқ намоз вақтлари (Ўзбекистон мусулмонлари идораси расмий тақвими, Ҳанафий). Бомдод, Пешин, Аср, Шом, Хуфтон соатлари ва ${m} ойлик жадвали.`,
    },
    ru: {
      title: `Время Намаза ${name} Сегодня — Точное Расписание ${y}`,
      description: `Точное время намаза в ${name} на сегодня и месяц ${m} ${y} (ханафитский мазхаб). Фаджр, Зухр, Аср, Магриб, Иша и таймер до следующего намаза.`,
    },
    en: {
      title: `${name} Prayer Times Today — Official Timetable ${y}`,
      description: `Accurate prayer times in ${name} today: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha. Official timetable, live countdown and full ${M} calendar.`,
    },
    tg: {
      title: `Вақти Намоз ${name} Имрӯз — Тақвими Расмии ${y}`,
      description: `Вақти дақиқи намоз дар ${name} барои имрӯз ва моҳи ${m} ${y}: Бомдод, Пешин, Аср, Шом, Хуфтон. Мазҳаби Ҳанафӣ, бо таймер.`,
    },
    ky: {
      title: `${name} Намаз Убактысы Бүгүн — Расмий Жайылма ${y}`,
      description: `${name}: бүгүнкү так намаз убактысы (Багымдат, Бешим, Аср, Шам, Куптан). Ханафий мазхабы, кийинки намазга таймер жана айлык календарь.`,
    },
  };
  return map[l];
}

// ---------------------------------------------------------------------------
// District page: /[locale]/[city]/[district]
// ---------------------------------------------------------------------------
function formatDistrictTitleUz(name: string, cityName: string, y: number): string {
  const hasTuman = name.toLowerCase().includes("tuman");
  const isSameAsCity = name.toLowerCase().replace(/ tumani/i, "").trim() === cityName.toLowerCase().trim();
  if (isSameAsCity) {
    return `${hasTuman ? name : `${name} tumani`} Namoz Vaqtlari Bugun (Rasmiy Taqvim ${y})`;
  }
  return `${hasTuman ? name : `${name} tumani`} Namoz Vaqtlari Bugun — ${cityName} (${y})`;
}

function formatDistrictTitleCyrl(name: string, cityName: string, y: number): string {
  const hasTuman = name.toLowerCase().includes("туман");
  const isSameAsCity = name.toLowerCase().replace(/ тумани/i, "").trim() === cityName.toLowerCase().trim();
  if (isSameAsCity) {
    return `${hasTuman ? name : `${name} тумани`} Намоз Вақтлари Бугун (Расмий Тақвим ${y})`;
  }
  return `${hasTuman ? name : `${name} тумани`} Намоз Вақтлари Бугун — ${cityName} (${y})`;
}

function formatDistrictTitleRu(name: string, cityName: string, y: number): string {
  const isSameAsCity = name.toLowerCase().replace(/ район/i, "").replace(/ский/i, "").trim() === cityName.toLowerCase().trim();
  if (isSameAsCity) {
    return `Время Намаза ${name} Сегодня — Точное Расписание ${y}`;
  }
  return `Время Намаза ${name} Сегодня — ${cityName} (${y})`;
}

export function districtCopy(l: Locale, name: string, cityName: string): SnippetCopy {
  const y = currentYear();
  const map: Record<Locale, SnippetCopy> = {
    uz: {
      title: formatDistrictTitleUz(name, cityName, y),
      description: `${name} (${cityName}) uchun bugungi rasmiy namoz vaqtlari: Bomdod, Peshin, Asr, Shom, Xufton. Tuman koordinatalari bo'yicha O‘MI taqvimi, keyingi namoz taymeri.`,
    },
    "uz-cyrl": {
      title: formatDistrictTitleCyrl(name, cityName, y),
      description: `${name} (${cityName}) учун бугунги расмий намоз вақтлари: Бомдод, Пешин, Аср, Шом, Хуфтон. Туман координаталари бўйича ЎМИ тақвими, кейинги намоз таймери.`,
    },
    ru: {
      title: formatDistrictTitleRu(name, cityName, y),
      description: `Точное время намаза на сегодня: ${name} (${cityName}). Фаджр, Зухр, Аср, Магриб, Иша — рассчитано по координатам района, с таймером до следующего намаза.`,
    },
    en: {
      title: `${name} Prayer Times Today — ${cityName} (${y})`,
      description: `Accurate prayer times today for ${name} (${cityName}): Fajr, Dhuhr, Asr, Maghrib, Isha. Calculated for the district's own coordinates, with a live countdown.`,
    },
    tg: {
      title: `Вақти Намоз ${name} Имрӯз — ${cityName} (${y})`,
      description: `Вақти дақиқи намоз имрӯз барои ${name} (${cityName}): Бомдод, Пешин, Аср, Шом, Хуфтон. Аз рӯи координатаҳои ноҳия, бо таймер то намози навбатӣ.`,
    },
    ky: {
      title: `${name} Намаз Убактысы Бүгүн — ${cityName} (${y})`,
      description: `${name} (${cityName}) үчүн бүгүнкү так намаз убактысы: Багымдат, Бешим, Аср, Шам, Куптан. Райондун координаттары боюнча, таймер менен.`,
    },
  };
  return map[l];
}

// ---------------------------------------------------------------------------
// Single-prayer page: /[locale]/[city]/{bomdod|peshin|asr|shom|xufton}
// ---------------------------------------------------------------------------
export function prayerCopy(l: Locale, prayerName: string, cityName: string): SnippetCopy {
  const M = monthYear(l, true);
  const m = monthYear(l);
  const y = currentYear();
  const map: Record<Locale, SnippetCopy> = {
    uz: {
      title: `${prayerName} Vaqti ${cityName} Bugun: Soat Nechida? (${y})`,
      description: `${cityName} shahrida bugun ${prayerName} namozi soat nechida kiradi va qachon chiqadi? O‘zbekiston musulmonlari idorasi rasmiy taqvimi, Hanafiy. Aniq vaqtlar jadvali.`,
    },
    "uz-cyrl": {
      title: `${prayerName} Вақти ${cityName} Бугун: Соат Нечида? (${y})`,
      description: `${cityName} шаҳрида бугун ${prayerName} намози соат нечида киради ва чиқади? Ўзбекистон мусулмонлари идораси расмий тақвими, Ҳанафий. Аниқ вақтлар жадвали.`,
    },
    ru: {
      title: `Время Намаза ${prayerName} (${cityName}) — Во Сколько Сегодня?`,
      description: `Во сколько начинается и заканчивается намаз ${prayerName} сегодня в ${cityName}. Точное расписание на сегодня и месяц ${m} (ханафитский мазхаб).`,
    },
    en: {
      title: `${prayerName} Time in ${cityName} Today — Exact Schedule ${y}`,
      description: `When ${prayerName} starts and ends today in ${cityName}. All 5 daily prayers plus the full ${M} timetable. Hanafi school.`,
    },
    tg: {
      title: `Вақти Намози ${prayerName} ${cityName} Имрӯз: Соат Чанд?`,
      description: `Намози ${prayerName} имрӯз дар ${cityName} кай оғоз ва кай ба охир мерасад. Ҳамаи 5 намоз ва тақвими моҳи ${m}. Мазҳаби Ҳанафӣ.`,
    },
    ky: {
      title: `${prayerName} Убактысы ${cityName} Бүгүн: Саат Канчада?`,
      description: `${cityName}: бүгүн ${prayerName} качан башталып, качан бүтөт. Бардык 5 намаз жана ${m} айлык календары. Ханафий мазхаб.`,
    },
  };
  return map[l];
}

// ---------------------------------------------------------------------------
// Region page: /[locale]/viloyat/[region]
// ---------------------------------------------------------------------------
export function regionCopy(l: Locale, name: string): SnippetCopy {
  const y = currentYear();
  const m = monthYear(l);
  const map: Record<Locale, SnippetCopy> = {
    uz: {
      title: `${name} Namoz Vaqtlari Bugun — Barcha Tumanlar (${y})`,
      description: `${name} barcha shahar va tumanlari uchun bugungi rasmiy namoz vaqtlari jadvali (O‘zbekiston musulmonlari idorasi taqvimi). O'z tumaningizni tanlang va oylik taqvimni ko'ring.`,
    },
    "uz-cyrl": {
      title: `${name} Намоз Вақтлари Бугун — Барча Туманлар (${y})`,
      description: `${name} барча шаҳар ва туманлари учун бугунги расмий намоз вақтлари жадвали (Ўзбекистон мусулмонлари идораси тақвими). Ўз туманингизни танланг ва ойлик тақвимни кўринг.`,
    },
    ru: {
      title: `Время Намаза ${name} Сегодня — Все Районы (${y})`,
      description: `Время намаза на сегодня по городам и районам: ${name}. Фаджр, Зухр, Аср, Магриб, Иша. Выберите свой район и откройте календарь на ${m}.`,
    },
    en: {
      title: `${name} Prayer Times Today — All Districts (${y})`,
      description: `Today's prayer times for every city and district in ${name}: Fajr, Dhuhr, Asr, Maghrib, Isha. Pick your district and open the ${monthYear(l, true)} timetable.`,
    },
    tg: {
      title: `Вақти Намоз ${name} Имрӯз — Ҳамаи Ноҳияҳо (${y})`,
      description: `Вақти намоз имрӯз барои шаҳрҳо ва ноҳияҳои ${name}: Бомдод, Пешин, Аср, Шом, Хуфтон. Ноҳияи худро интихоб кунед.`,
    },
    ky: {
      title: `${name} Намаз Убактысы Бүгүн — Бардык Райондор (${y})`,
      description: `${name}: шаарлар жана райондор боюнча бүгүнкү намаз убактысы — Багымдат, Бешим, Аср, Шам, Куптан. Өз районуңузду тандаңыз.`,
    },
  };
  return map[l];
}

// ---------------------------------------------------------------------------
// Monthly page: /[locale]/[city]/oylik
// ---------------------------------------------------------------------------
export function monthlyCopy(l: Locale, name: string): SnippetCopy {
  const M = monthYear(l, true);
  const m = monthYear(l);
  const y = currentYear();
  const map: Record<Locale, SnippetCopy> = {
    uz: {
      title: `${name} Namoz Vaqtlari 1 Oylik Taqvim — ${M} Jadvali`,
      description: `${name} uchun ${m} oyining to'liq 30 kunlik rasmiy namoz vaqtlari taqvimi. Har kungi Bomdod, Quyosh, Peshin, Asr, Shom, Xufton aniq soatlari. Hanafiy mazhab.`,
    },
    "uz-cyrl": {
      title: `${name} Намоз Вақтлари 1 Ойлик Тақвим — ${M} Жадвали`,
      description: `${name} учун ${m} ойининг тўлиқ 30 кунлик расмий намоз вақтлари тақвими. Ҳар кунги Бомдод, Қуёш, Пешин, Аср, Шом, Хуфтон аниқ соатлари. Ҳанафий мазҳаб.`,
    },
    ru: {
      title: `Время Намаза ${name} на Месяц — Расписание на ${m} ${y}`,
      description: `Полное расписание намаза на ${m} ${y} в ${name} на 30 дней: Фаджр, Восход, Зухр, Аср, Магриб и Иша на каждый день. Ханафитский мазхаб.`,
    },
    en: {
      title: `${name} Monthly Prayer Times — Full ${M} Timetable`,
      description: `Full ${M} 30-day prayer timetable for ${name}: Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha for every day of the month. Hanafi school.`,
    },
    tg: {
      title: `Вақти Намоз ${name} 1 Моҳа — Тақвими Моҳи ${M}`,
      description: `Тақвими пурраи намоз барои моҳи ${m}, ${name}: Бомдод, Офтоб, Пешин, Аср, Шом ва Хуфтон барои ҳар рӯз. Мазҳаби Ҳанафӣ.`,
    },
    ky: {
      title: `${name} Айлык Намаз Убактысы — ${m} Жайылмасы`,
      description: `${name}: ${m} айынын толук 30 күндүк намаз календары — Багымдат, Күн чыгышы, Бешим, Аср, Шам жана Куптан ар бир күнгө. Ханафий мазхаб.`,
    },
  };
  return map[l];
}

// ---------------------------------------------------------------------------
// International city page: /[locale]/dunyo/[city]
// ---------------------------------------------------------------------------
export function worldCityCopy(l: Locale, name: string, country: string): SnippetCopy {
  const m = monthYear(l);
  const y = currentYear();
  const map: Record<Locale, SnippetCopy> = {
    uz: {
      title: `Namoz Vaqtlari ${name} Bugun — ${country} (${y} Jadval)`,
      description: `${name} (${country}) uchun bugungi aniq namoz vaqtlari: Bomdod, Peshin, Asr, Shom, Xufton. Hanafiy mazhab (MWL usuli), keyingi namozgacha taymer.`,
    },
    "uz-cyrl": {
      title: `Намоз Вақтлари ${name} Бугун — ${country} (${y} Жадвал)`,
      description: `${name} (${country}) учун бугунги аниқ намоз вақтлари: Бомдод, Пешин, Аср, Шом, Хуфтон. Ҳанафий мазҳаб (MWL усули), кейинги намозгача таймер.`,
    },
    ru: {
      title: `Время Намаза ${name} Сегодня — Точное Расписание ${y} (${country})`,
      description: `Точное время намаза в г. ${name} (${country}) на сегодня и месяц ${m} ${y}: Фаджр, Зухр, Аср, Магриб, Иша. Ханафитский мазхаб, метод MWL, таймер.`,
    },
    en: {
      title: `${name} Prayer Times Today — ${country} (${y} Timetable)`,
      description: `Accurate prayer times in ${name}, ${country} today: Fajr, Dhuhr, Asr, Maghrib, Isha. Live countdown to the next prayer. Hanafi school.`,
    },
    tg: {
      title: `Вақти Намоз ${name} Имрӯз — ${country} (${y})`,
      description: `Вақти дақиқи намоз имрӯз, ${name} (${country}): Бомдод, Пешин, Аср, Шом, Хуфтон. Таймер то намози навбатӣ. Мазҳаби Ҳанафӣ.`,
    },
    ky: {
      title: `${name} Намаз Убактысы Бүгүн — ${country} (${y})`,
      description: `${name} (${country}): бүгүнкү так намаз убактысы — Багымдат, Бешим, Аср, Шам, Куптан. Кийинки намазга чейин таймер. Ханафий мазхаб.`,
    },
  };
  return map[l];
}
