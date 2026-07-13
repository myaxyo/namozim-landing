import { Locale } from "./translations";
import { QA } from "@/lib/seo";
import { ServerTimes } from "@/lib/fetchPrayerTimes";

/**
 * Builds localized FAQ items for a location (city or district) using the
 * real, server-fetched prayer times. The same items power both the visible
 * accordion and the FAQPage JSON-LD, so they always match.
 */
export function cityFaqItems(name: string, times: ServerTimes | null, locale: Locale): QA[] {
  const items: QA[] = [];

  if (times) {
    if (locale === "ru") {
      items.push(
        { q: `Во сколько сегодня Фаджр (утренний намаз) в ${name}?`, a: `Сегодня время Фаджр (Бомдод) в ${name} — ${times.fajr}.` },
        { q: `Во сколько Зухр (полуденный намаз) в ${name}?`, a: `Время Зухр (Пешин) в ${name} сегодня — ${times.dhuhr}.` },
        { q: `Время Аср, Магриб и Иша в ${name} сегодня?`, a: `Аср — ${times.asr}, Магриб (Шом) — ${times.maghrib}, Иша (Хуфтон) — ${times.isha}.` },
        { q: `Во сколько восход солнца в ${name}?`, a: `Сегодня восход солнца в ${name} — ${times.sunrise}.` },
      );
    } else if (locale === "en") {
      items.push(
        { q: `What time is Fajr in ${name} today?`, a: `Today, Fajr prayer time in ${name} is ${times.fajr}.` },
        { q: `What time is Dhuhr in ${name}?`, a: `Dhuhr prayer time in ${name} today is ${times.dhuhr}.` },
        { q: `What are the Asr, Maghrib and Isha times in ${name} today?`, a: `Asr — ${times.asr}, Maghrib — ${times.maghrib}, Isha — ${times.isha}.` },
        { q: `What time is sunrise in ${name}?`, a: `Today, sunrise in ${name} is ${times.sunrise}.` },
      );
    } else if (locale === "tg") {
      items.push(
        { q: `Имрӯз дар ${name} вақти Бомдод (Фаҷр) соати чанд?`, a: `Имрӯз вақти Бомдод (Фаҷр) дар ${name} — ${times.fajr}.` },
        { q: `Дар ${name} вақти Пешин (Зуҳр) кай?`, a: `Имрӯз вақти Пешин (Зуҳр) дар ${name} — ${times.dhuhr}.` },
        { q: `Вақти Аср, Шом ва Хуфтон дар ${name} имрӯз?`, a: `Аср — ${times.asr}, Шом (Мағриб) — ${times.maghrib}, Хуфтон (Ишо) — ${times.isha}.` },
        { q: `Дар ${name} офтоб кай мебарояд?`, a: `Имрӯз баромади офтоб дар ${name} — ${times.sunrise}.` },
      );
    } else if (locale === "ky") {
      items.push(
        { q: `Бүгүн ${name}да Багымдат (Фажр) намазы саат канчада?`, a: `Бүгүн ${name}да Багымдат (Фажр) намаз убактысы — ${times.fajr}.` },
        { q: `${name}да Бешим (Зухр) намазы качан?`, a: `Бүгүн ${name}да Бешим (Зухр) намаз убактысы — ${times.dhuhr}.` },
        { q: `${name}да Аср, Шам жана Куптан намаз убактылары?`, a: `Аср — ${times.asr}, Шам (Магриб) — ${times.maghrib}, Куптан (Иша) — ${times.isha}.` },
        { q: `${name}да күн чыгышы качан?`, a: `Бүгүн ${name}да күн чыгышы — ${times.sunrise}.` },
      );
    } else if (locale === "uz-cyrl") {
      items.push(
        { q: `Бугун ${name}да бомдод намози соат нечада?`, a: `Бугун ${name}да бомдод (Фажр) намози вақти — ${times.fajr}.` },
        { q: `${name}да пешин намози қачон?`, a: `Бугун ${name}да пешин (Зуҳр) намози вақти — ${times.dhuhr}.` },
        { q: `${name}да аср, шом ва хуфтон намоз вақтлари?`, a: `Аср — ${times.asr}, Шом (Мағриб) — ${times.maghrib}, Хуфтон (Ишо) — ${times.isha}.` },
        { q: `${name}да қуёш чиқиши вақти?`, a: `Бугун ${name}да қуёш чиқиши — ${times.sunrise}.` },
      );
    } else {
      items.push(
        { q: `Bugun ${name}da bomdod namozi soat nechada?`, a: `Bugun ${name}da bomdod (Fajr) namozi vaqti — ${times.fajr}.` },
        { q: `${name}da peshin namozi qachon?`, a: `Bugun ${name}da peshin (Zuhr) namozi vaqti — ${times.dhuhr}.` },
        { q: `${name}da asr, shom va xufton namoz vaqtlari?`, a: `Asr — ${times.asr}, Shom (Maghrib) — ${times.maghrib}, Xufton (Isha) — ${times.isha}.` },
        { q: `${name}da quyosh chiqishi vaqti?`, a: `Bugun ${name}da quyosh chiqishi — ${times.sunrise}.` },
      );
    }
  }

  // Method question — always included (independent of times availability).
  const method: Record<Locale, QA> = {
    uz: {
      q: `${name} namoz vaqtlari qaysi usulda hisoblanadi?`,
      a: `Namoz vaqtlari Hanafiy mazhabi va Muslim World League (MWL) usuli bo'yicha, shaharning geografik koordinatalari asosida aniq hisoblanadi.`,
    },
    "uz-cyrl": {
      q: `${name} намоз вақтлари қайси усулда ҳисобланади?`,
      a: `Намоз вақтлари Ҳанафий мазҳаби ва Muslim World League (MWL) усули бўйича, шаҳарнинг географик координаталари асосида аниқ ҳисобланади.`,
    },
    ru: {
      q: `Как рассчитывается время намаза для ${name}?`,
      a: `Время намаза рассчитывается по ханафитскому мазхабу и методу Muslim World League (MWL) на основе географических координат города.`,
    },
    en: {
      q: `How are prayer times for ${name} calculated?`,
      a: `Prayer times are calculated using the Hanafi school and the Muslim World League (MWL) method, based on the city's geographic coordinates.`,
    },
    tg: {
      q: `Вақти намоз барои ${name} бо кадом усул ҳисоб карда мешавад?`,
      a: `Вақти намоз мувофиқи мазҳаби Ҳанафӣ ва усули Muslim World League (MWL) дар асоси координатаҳои ҷуғрофии шаҳр дақиқ ҳисоб карда мешавад.`,
    },
    ky: {
      q: `${name} үчүн намаз убактысы кайсы ыкма менен эсептелет?`,
      a: `Намаз убактысы Ханафий мазхабы жана Muslim World League (MWL) ыкмасы боюнча, шаардын географиялык координаттарынын негизинде так эсептелет.`,
    },
  };
  items.push(method[locale]);

  return items;
}
