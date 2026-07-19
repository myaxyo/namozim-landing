import { Locale } from "./translations";

export interface PrayerInfo {
  slug: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  nameTg?: string;
  nameKy?: string;
  descUz: string;
  descRu: string;
  descEn: string;
  descTg?: string;
  descKy?: string;
  icon: string;
}

export const PRAYERS: PrayerInfo[] = [
  {
    slug: "bomdod",
    nameUz: "Bomdod",
    nameRu: "Фаджр",
    nameEn: "Fajr",
    nameTg: "Бомдод",
    nameKy: "Багымдат",
    descUz: "Bomdod (Fajr) namozi — tong otishidan quyosh chiqishigacha o'qiladi. Kun boshlanishining eng muhim ibodati.",
    descRu: "Фаджр (Бомдод) — утренний намаз, совершаемый от рассвета до восхода солнца.",
    descEn: "Fajr — the pre-dawn prayer performed between dawn and sunrise.",
    descTg: "Бомдод (Фаҷр) — намози субҳ, аз тулӯъи саҳар то баромади офтоб хонда мешавад.",
    descKy: "Багымдат (Фажр) — таң намазы, таң атканда күн чыкканга чейин окулат.",
    icon: "\u{1F319}",
  },
  {
    slug: "peshin",
    nameUz: "Peshin",
    nameRu: "Зухр",
    nameEn: "Dhuhr",
    nameTg: "Пешин",
    nameKy: "Бешим",
    descUz: "Peshin (Zuhr) namozi — quyosh zarralari eng tepada bo'lgandan keyin o'qiladi. Kun o'rtasidagi ibodat.",
    descRu: "Зухр (Пешин) — полуденный намаз, совершаемый после прохождения солнцем зенита.",
    descEn: "Dhuhr — the midday prayer performed after the sun passes its zenith.",
    descTg: "Пешин (Зуҳр) — намози нисфирӯзӣ, баъд аз гузаштани офтоб аз нуқтаи авҷ хонда мешавад.",
    descKy: "Бешим (Зухр) — түш намазы, күн чүрөгүнөн кийин окулат.",
    icon: "\u{2600}\u{FE0F}",
  },
  {
    slug: "asr",
    nameUz: "Asr",
    nameRu: "Аср",
    nameEn: "Asr",
    nameTg: "Аср",
    nameKy: "Аср",
    descUz: "Asr namozi — tushdan keyin, quyosh botishigacha o'qiladi. Hanafiy mazhabida soya ikki baravar bo'lganda boshlanadi.",
    descRu: "Аср — послеполуденный намаз. По ханафитскому мазхабу начинается когда тень предмета вдвое длиннее его.",
    descEn: "Asr — the afternoon prayer. In the Hanafi school, it begins when an object's shadow is twice its length.",
    descTg: "Аср — намози баъдизуҳрӣ. Дар мазҳаби Ҳанафӣ вақте оғоз мешавад, ки сояи чиз ду баробари он шавад.",
    descKy: "Аср — кечки намаз. Ханафий мазхабда буюмдун көлөңкөсү эки эсе узун болгондо башталат.",
    icon: "\u{1F324}",
  },
  {
    slug: "shom",
    nameUz: "Shom",
    nameRu: "Магриб",
    nameEn: "Maghrib",
    nameTg: "Шом",
    nameKy: "Шам",
    descUz: "Shom (Maghrib) namozi — quyosh botgandan keyin o'qiladi. Iftorlik vaqti ham shu paytda boshlanadi.",
    descRu: "Магриб (Шом) — вечерний намаз, совершаемый сразу после захода солнца. Время ифтара.",
    descEn: "Maghrib — the sunset prayer performed immediately after sunset. Also the time for breaking fast.",
    descTg: "Шом (Мағриб) — намози бегоҳӣ, баъд аз ғуруби офтоб хонда мешавад. Вақти ифтор.",
    descKy: "Шам (Магриб) — кечки намаз, күн батканда окулат. Оозо ачуу убактысы.",
    icon: "\u{1F307}",
  },
  {
    slug: "xufton",
    nameUz: "Xufton",
    nameRu: "Иша",
    nameEn: "Isha",
    nameTg: "Хуфтон",
    nameKy: "Куптан",
    descUz: "Xufton (Isha) namozi — qorong'u tushgandan keyin o'qiladi. Kunning oxirgi farz namozi.",
    descRu: "Иша (Хуфтон) — ночной намаз, совершаемый после наступления полной темноты. Последний обязательный намаз дня.",
    descEn: "Isha — the night prayer performed after twilight disappears. The last obligatory prayer of the day.",
    descTg: "Хуфтон (Ишо) — намози шабона, баъд аз торикии комил хонда мешавад. Охирин намози фарзии рӯз.",
    descKy: "Куптан (Иша) — түнкү намаз, караңгы түшкөндөн кийин окулат. Күндүн акыркы парз намазы.",
    icon: "\u{2728}",
  },
];

export function getPrayerBySlug(slug: string): PrayerInfo | undefined {
  return PRAYERS.find((p) => p.slug === slug);
}

export function getPrayerName(p: PrayerInfo, locale: Locale): string {
  if (locale === "tg") return p.nameTg || p.nameUz;
  if (locale === "ky") return p.nameKy || p.nameUz;
  if (locale === "ru") return p.nameRu;
  if (locale === "en") return p.nameEn;
  return p.nameUz;
}

export function getPrayerDesc(p: PrayerInfo, locale: Locale): string {
  if (locale === "tg") return p.descTg || p.descUz;
  if (locale === "ky") return p.descKy || p.descEn;
  if (locale === "ru") return p.descRu;
  if (locale === "en") return p.descEn;
  return p.descUz;
}
