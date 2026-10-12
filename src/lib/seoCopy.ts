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
  const map: Record<Locale, SnippetCopy> = {
    uz: {
      title: `${name} namoz vaqtlari bugun va oylik jadval — ${M}`,
      description: `${name} uchun bugungi aniq namoz vaqtlari: Bomdod, Quyosh, Peshin, Asr, Shom, Xufton. Keyingi namozgacha taymer, ${m} oylik taqvimi va tumanlar bo'yicha vaqtlar.`,
    },
    "uz-cyrl": {
      title: `${name} намоз вақтлари бугун ва ойлик жадвал — ${M}`,
      description: `${name} учун бугунги аниқ намоз вақтлари: Бомдод, Қуёш, Пешин, Аср, Шом, Хуфтон. Кейинги намозгача таймер, ${m} ойлик тақвими ва туманлар бўйича вақтлар.`,
    },
    ru: {
      title: `Время намаза ${name} сегодня и на месяц — ${m}`,
      description: `Точное время намаза на сегодня, ${name}: Фаджр, Восход, Зухр, Аср, Магриб, Иша. Таймер до следующего намаза, календарь на ${m} и время по районам.`,
    },
    en: {
      title: `${name} Prayer Times Today & Monthly — ${M}`,
      description: `Accurate prayer times in ${name} today: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha. Live countdown to the next prayer and the full ${M} timetable.`,
    },
    tg: {
      title: `Вақти намоз ${name} имрӯз ва моҳона — ${M}`,
      description: `Вақти дақиқи намоз имрӯз, ${name}: Бомдод, Офтоб, Пешин, Аср, Шом, Хуфтон. Таймер то намози навбатӣ ва тақвими моҳи ${m}.`,
    },
    ky: {
      title: `${name} намаз убактысы бүгүн жана айлык — ${m}`,
      description: `${name}: бүгүнкү так намаз убактысы — Багымдат, Күн чыгышы, Бешим, Аср, Шам, Куптан. Кийинки намазга чейин таймер жана ${m} айлык календары.`,
    },
  };
  return map[l];
}

// ---------------------------------------------------------------------------
// District page: /[locale]/[city]/[district]
// ---------------------------------------------------------------------------
export function districtCopy(l: Locale, name: string, cityName: string): SnippetCopy {
  const M = monthYear(l, true);
  const m = monthYear(l);
  const map: Record<Locale, SnippetCopy> = {
    uz: {
      title: `${name} namoz vaqtlari bugun — ${cityName}, ${M}`,
      description: `${name} (${cityName}) uchun bugungi aniq namoz vaqtlari: Bomdod, Peshin, Asr, Shom, Xufton. Tuman koordinatalari bo'yicha hisoblangan, keyingi namozgacha taymer bilan.`,
    },
    "uz-cyrl": {
      title: `${name} намоз вақтлари бугун — ${cityName}, ${M}`,
      description: `${name} (${cityName}) учун бугунги аниқ намоз вақтлари: Бомдод, Пешин, Аср, Шом, Хуфтон. Туман координаталари бўйича ҳисобланган, кейинги намозгача таймер билан.`,
    },
    ru: {
      title: `Время намаза ${name} сегодня — ${cityName}, ${m}`,
      description: `Точное время намаза на сегодня: ${name} (${cityName}). Фаджр, Зухр, Аср, Магриб, Иша — рассчитано по координатам района, с таймером до следующего намаза.`,
    },
    en: {
      title: `${name} Prayer Times Today — ${cityName}, ${M}`,
      description: `Accurate prayer times today for ${name} (${cityName}): Fajr, Dhuhr, Asr, Maghrib, Isha. Calculated for the district's own coordinates, with a live countdown.`,
    },
    tg: {
      title: `Вақти намоз ${name} имрӯз — ${cityName}, ${M}`,
      description: `Вақти дақиқи намоз имрӯз барои ${name} (${cityName}): Бомдод, Пешин, Аср, Шом, Хуфтон. Аз рӯи координатаҳои ноҳия, бо таймер то намози навбатӣ.`,
    },
    ky: {
      title: `${name} намаз убактысы бүгүн — ${cityName}, ${m}`,
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
  const map: Record<Locale, SnippetCopy> = {
    uz: {
      title: `${prayerName} namozi vaqti ${cityName} bugun | ${M}`,
      description: `${cityName} uchun bugungi ${prayerName} vaqti qachon kirishi va qachon tugashi. Barcha 5 vaqt namoz, ${m} oylik jadvali. Hanafiy mazhab.`,
    },
    "uz-cyrl": {
      title: `${prayerName} намози вақти ${cityName} бугун | ${M}`,
      description: `${cityName} учун бугунги ${prayerName} вақти қачон киришини ва қачон тугашини билиб олинг. Барча 5 вақт намоз, ${m} ойлик жадвали. Ҳанафий мазҳаб.`,
    },
    ru: {
      title: `${prayerName}: время намаза ${cityName} сегодня | ${m}`,
      description: `Когда начинается и заканчивается ${prayerName} сегодня, ${cityName}. Все 5 намазов на сегодня и календарь на ${m}. Ханафитский мазхаб.`,
    },
    en: {
      title: `${prayerName} Time in ${cityName} Today | ${M}`,
      description: `When ${prayerName} starts and ends today in ${cityName}. All 5 daily prayers plus the full ${M} timetable. Hanafi school.`,
    },
    tg: {
      title: `Вақти намози ${prayerName} ${cityName} имрӯз | ${M}`,
      description: `Намози ${prayerName} имрӯз дар ${cityName} кай оғоз ва кай ба охир мерасад. Ҳамаи 5 намоз ва тақвими моҳи ${m}. Мазҳаби Ҳанафӣ.`,
    },
    ky: {
      title: `${prayerName} убактысы ${cityName} бүгүн | ${m}`,
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
      title: `${name} namoz vaqtlari ${y} — barcha tumanlar`,
      description: `${name} shahar va tumanlari uchun bugungi namoz vaqtlari: Bomdod, Peshin, Asr, Shom, Xufton. O'z tumaningizni tanlang va ${m} oylik jadvalini oching.`,
    },
    "uz-cyrl": {
      title: `${name} намоз вақтлари ${y} — барча туманлар`,
      description: `${name} шаҳар ва туманлари учун бугунги намоз вақтлари: Бомдод, Пешин, Аср, Шом, Хуфтон. Ўз туманингизни танланг ва ${m} ойлик жадвалини очинг.`,
    },
    ru: {
      title: `Время намаза ${name} ${y} — все районы`,
      description: `Время намаза на сегодня по городам и районам: ${name}. Фаджр, Зухр, Аср, Магриб, Иша. Выберите свой район и откройте календарь на ${m}.`,
    },
    en: {
      title: `${name} Prayer Times ${y} — All Districts`,
      description: `Today's prayer times for every city and district in ${name}: Fajr, Dhuhr, Asr, Maghrib, Isha. Pick your district and open the ${monthYear(l, true)} timetable.`,
    },
    tg: {
      title: `Вақти намоз ${name} ${y} — ҳамаи ноҳияҳо`,
      description: `Вақти намоз имрӯз барои шаҳрҳо ва ноҳияҳои ${name}: Бомдод, Пешин, Аср, Шом, Хуфтон. Ноҳияи худро интихоб кунед.`,
    },
    ky: {
      title: `${name} намаз убактысы ${y} — бардык райондор`,
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
  const map: Record<Locale, SnippetCopy> = {
    uz: {
      title: `${name} namoz vaqtlari oylik — ${M} taqvimi`,
      description: `${name} uchun ${m} oyining to'liq namoz vaqtlari jadvali: har kuni Bomdod, Quyosh, Peshin, Asr, Shom va Xufton. Hanafiy mazhab.`,
    },
    "uz-cyrl": {
      title: `${name} намоз вақтлари ойлик — ${M} тақвими`,
      description: `${name} учун ${m} ойининг тўлиқ намоз вақтлари жадвали: ҳар куни Бомдод, Қуёш, Пешин, Аср, Шом ва Хуфтон. Ҳанафий мазҳаб.`,
    },
    ru: {
      title: `Время намаза ${name} на месяц — ${m}`,
      description: `Полный календарь намаза на ${m}, ${name}: Фаджр, Восход, Зухр, Аср, Магриб и Иша на каждый день. Ханафитский мазхаб.`,
    },
    en: {
      title: `${name} Monthly Prayer Times — ${M} Timetable`,
      description: `Full ${M} prayer timetable for ${name}: Fajr, Sunrise, Dhuhr, Asr, Maghrib and Isha for every day of the month. Hanafi school.`,
    },
    tg: {
      title: `Вақти намоз ${name} моҳона — ${M}`,
      description: `Тақвими пурраи намоз барои моҳи ${m}, ${name}: Бомдод, Офтоб, Пешин, Аср, Шом ва Хуфтон барои ҳар рӯз. Мазҳаби Ҳанафӣ.`,
    },
    ky: {
      title: `${name} айлык намаз убактысы — ${m}`,
      description: `${name}: ${m} айынын толук намаз календары — Багымдат, Күн чыгышы, Бешим, Аср, Шам жана Куптан ар бир күнгө. Ханафий мазхаб.`,
    },
  };
  return map[l];
}

// ---------------------------------------------------------------------------
// International city page: /[locale]/dunyo/[city]
// ---------------------------------------------------------------------------
export function worldCityCopy(l: Locale, name: string, country: string): SnippetCopy {
  const M = monthYear(l, true);
  const m = monthYear(l);
  const map: Record<Locale, SnippetCopy> = {
    uz: {
      title: `${name} namoz vaqtlari bugun — ${country}, ${M}`,
      description: `${name} (${country}) uchun bugungi aniq namoz vaqtlari: Bomdod, Peshin, Asr, Shom, Xufton. Keyingi namozgacha taymer. Hanafiy mazhab, o'zbek tilida.`,
    },
    "uz-cyrl": {
      title: `${name} намоз вақтлари бугун — ${country}, ${M}`,
      description: `${name} (${country}) учун бугунги аниқ намоз вақтлари: Бомдод, Пешин, Аср, Шом, Хуфтон. Кейинги намозгача таймер. Ҳанафий мазҳаб, ўзбек тилида.`,
    },
    ru: {
      title: `Время намаза ${name} сегодня — ${country}, ${m}`,
      description: `Точное время намаза на сегодня, ${name} (${country}): Фаджр, Зухр, Аср, Магриб, Иша. Таймер до следующего намаза. Ханафитский мазхаб.`,
    },
    en: {
      title: `${name} Prayer Times Today — ${country}, ${M}`,
      description: `Accurate prayer times in ${name}, ${country} today: Fajr, Dhuhr, Asr, Maghrib, Isha. Live countdown to the next prayer. Hanafi school.`,
    },
    tg: {
      title: `Вақти намоз ${name} имрӯз — ${country}, ${M}`,
      description: `Вақти дақиқи намоз имрӯз, ${name} (${country}): Бомдод, Пешин, Аср, Шом, Хуфтон. Таймер то намози навбатӣ. Мазҳаби Ҳанафӣ.`,
    },
    ky: {
      title: `${name} намаз убактысы бүгүн — ${country}, ${m}`,
      description: `${name} (${country}): бүгүнкү так намаз убактысы — Багымдат, Бешим, Аср, Шам, Куптан. Кийинки намазга чейин таймер. Ханафий мазхаб.`,
    },
  };
  return map[l];
}
