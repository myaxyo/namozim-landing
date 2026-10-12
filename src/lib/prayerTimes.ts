import { CalculationMethod, Coordinates, Madhab, PrayerTimes } from "adhan";

/**
 * Prayer-time calculation, shared by server components and the browser.
 * No network calls: everything is computed locally with the `adhan` library.
 *
 * "uzbekistan" reproduces the official timetable of the Muslim Board of
 * Uzbekistan (O'zbekiston musulmonlari idorasi):
 *   1. Tashkent times are calculated exactly as islom.uz does it
 *      (adhan, Fajr/Isha 15.5°, Hanafi Asr, Shom = sunset + 4 min).
 *      Verified against muslim.uz: all six times matched.
 *   2. Every other city/district = Tashkent + its official minute offset
 *      (see src/data/uzOfficialOffsets.ts). That's how the Board's calendar
 *      works, so e.g. Termiz is always Tashkent + 8 min.
 *
 * "mwl" (Muslim World League, Hanafi Asr, calculated at the real coordinates)
 * is used for Tajikistan, Kyrgyzstan and international cities.
 */
export type PrayerMethod = "uzbekistan" | "mwl";

export interface Times {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface DayTimes extends Times {
  day: number;
}

/** Plain, serialisable description of where/how to calculate (safe to pass to client components). */
export interface Place {
  lat: number;
  lng: number;
  /** IANA zone used to pick "today" and to format the clock times. */
  timeZone: string;
  method: PrayerMethod;
  /** "uzbekistan" only: official minutes after Tashkent. */
  offsetMin?: number;
}

const TASHKENT = { lat: 41.2995, lng: 69.2401 };
const UZ_TZ = "Asia/Tashkent";
/** Shom is announced 4 minutes after sunset (ihtiyot), as on islom.uz / muslim.uz. */
const UZ_MAGHRIB_OFFSET_MIN = 4;

const COUNTRY_TZ: Record<string, string> = {
  uz: UZ_TZ,
  tj: "Asia/Dushanbe",
  kg: "Asia/Bishkek",
};

/**
 * Build a Place.
 * - Uzbekistan: pass `offsetMin` from UZ_OFFSET_FROM_TASHKENT when known; otherwise it's
 *   estimated from longitude (4 min per degree), which is how the official offsets are derived.
 */
export function makePlace(opts: {
  lat: number;
  lng: number;
  country?: string;
  timeZone?: string;
  method?: PrayerMethod;
  offsetMin?: number;
}): Place {
  const country = opts.country ?? "uz";
  const method = opts.method ?? (country === "uz" ? "uzbekistan" : "mwl");
  if (method === "uzbekistan") {
    return {
      lat: opts.lat,
      lng: opts.lng,
      timeZone: UZ_TZ,
      method,
      offsetMin: opts.offsetMin ?? Math.round(4 * (TASHKENT.lng - opts.lng)),
    };
  }
  return {
    lat: opts.lat,
    lng: opts.lng,
    timeZone: opts.timeZone ?? COUNTRY_TZ[country] ?? UZ_TZ,
    method,
  };
}

function mwlParams() {
  const p = CalculationMethod.MuslimWorldLeague();
  p.madhab = Madhab.Hanafi;
  return p;
}

function uzParams() {
  const p = CalculationMethod.Other();
  p.fajrAngle = 15.5;
  p.ishaAngle = 15.5;
  p.madhab = Madhab.Hanafi;
  return p;
}

/** Calendar day (y, m 1-12, d) of `date` in the given zone. */
function ymdIn(timeZone: string, date: Date): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((x) => x.type === t)?.value);
  return { y: get("year"), m: get("month"), d: get("day") };
}

function hhmm(date: Date, timeZone: string): string {
  if (isNaN(date.getTime())) return "--:--";
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

const shift = (d: Date, min: number) => new Date(d.getTime() + min * 60_000);

/** Times for one calendar day (y, m 1-12, d) at the place. */
export function timesForDay(place: Place, y: number, m: number, d: number): Times {
  // adhan reads the local Y/M/D components of the Date it is given.
  const day = new Date(y, m - 1, d);
  const tz = place.timeZone;

  if (place.method === "uzbekistan") {
    const pt = new PrayerTimes(new Coordinates(TASHKENT.lat, TASHKENT.lng), day, uzParams());
    const o = place.offsetMin ?? 0;
    return {
      fajr: hhmm(shift(pt.fajr, o), tz),
      sunrise: hhmm(shift(pt.sunrise, o), tz),
      dhuhr: hhmm(shift(pt.dhuhr, o), tz),
      asr: hhmm(shift(pt.asr, o), tz),
      maghrib: hhmm(shift(pt.maghrib, o + UZ_MAGHRIB_OFFSET_MIN), tz),
      isha: hhmm(shift(pt.isha, o), tz),
    };
  }

  const pt = new PrayerTimes(new Coordinates(place.lat, place.lng), day, mwlParams());
  return {
    fajr: hhmm(pt.fajr, tz),
    sunrise: hhmm(pt.sunrise, tz),
    dhuhr: hhmm(pt.dhuhr, tz),
    asr: hhmm(pt.asr, tz),
    maghrib: hhmm(pt.maghrib, tz),
    isha: hhmm(pt.isha, tz),
  };
}

/** Today's times at the place ("today" in the place's own time zone). */
export function getPrayerTimes(place: Place, now: Date = new Date()): Times {
  const { y, m, d } = ymdIn(place.timeZone, now);
  return timesForDay(place, y, m, d);
}

export interface MonthTimes {
  year: number;
  /** 1-12 */
  month: number;
  /** Today's day-of-month at the place. */
  today: number;
  days: DayTimes[];
}

/** Every day of the current month at the place. */
export function getMonthPrayerTimes(place: Place, now: Date = new Date()): MonthTimes {
  const { y, m, d: today } = ymdIn(place.timeZone, now);
  const count = new Date(y, m, 0).getDate();
  const days: DayTimes[] = [];
  for (let d = 1; d <= count; d++) days.push({ day: d, ...timesForDay(place, y, m, d) });
  return { year: y, month: m, today, days };
}

/** Seconds since local midnight in the given zone (for countdowns). */
export function secondsNowIn(timeZone: string, now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((x) => x.type === t)?.value);
  return get("hour") * 3600 + get("minute") * 60 + get("second");
}

/** Place for a visitor located by browser geolocation. */
export function placeForBrowser(lat: number, lng: number): Place {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || UZ_TZ;
  const inUz = tz === "Asia/Tashkent" || tz === "Asia/Samarkand";
  return makePlace({ lat, lng, method: inUz ? "uzbekistan" : "mwl", timeZone: tz });
}
