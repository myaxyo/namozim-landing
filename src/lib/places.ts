import type { City } from "@/data/cities";
import type { District } from "@/data/districts";
import { type InternationalCity, getInternationalCityTimeZone } from "@/data/internationalCities";
import { UZ_OFFSET_FROM_TASHKENT } from "@/data/uzOfficialOffsets";
import { makePlace, type Place } from "./prayerTimes";

/** Calculation place for an Uzbek / Tajik / Kyrgyz city. */
export function placeForCity(city: City): Place {
  return makePlace({
    lat: city.lat,
    lng: city.lng,
    country: city.country ?? "uz",
    offsetMin: UZ_OFFSET_FROM_TASHKENT[city.slug],
  });
}

/** Calculation place for an Uzbek district. */
export function placeForDistrict(d: District): Place {
  return makePlace({
    lat: d.lat,
    lng: d.lng,
    country: "uz",
    offsetMin: UZ_OFFSET_FROM_TASHKENT[`${d.citySlug}/${d.slug}`],
  });
}

/** Calculation place for an international city (MWL, local time zone). */
export function placeForInternational(c: InternationalCity): Place {
  return makePlace({ lat: c.lat, lng: c.lng, method: "mwl", timeZone: getInternationalCityTimeZone(c) });
}
