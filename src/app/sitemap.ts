import { MetadataRoute } from "next";
import { CITIES } from "@/data/cities";
import { DISTRICTS } from "@/data/districts";
import { REGIONS } from "@/data/regions";
import { PRAYERS } from "@/data/prayers";
import { INTERNATIONAL_CITIES } from "@/data/internationalCities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://namozim.uz";
  const locales = ["uz", "uz-cyrl", "ru", "en", "tg", "ky"];
  const now = new Date();

  const homePages = locales.map((l) => ({
    url: `${base}/${l}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 1,
  }));

  const citiesPages = locales.map((l) => ({
    url: `${base}/${l}/shaharlar`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const regionPages = locales.flatMap((l) =>
    REGIONS.map((r) => ({
      url: `${base}/${l}/viloyat/${r.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.85,
    }))
  );

  const cityPages = locales.flatMap((l) =>
    CITIES.map((c) => ({
      url: `${base}/${l}/${c.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))
  );

  const monthlyPages = locales.flatMap((l) =>
    CITIES.map((c) => ({
      url: `${base}/${l}/${c.slug}/oylik`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }))
  );

  const prayerPages = locales.flatMap((l) =>
    CITIES.flatMap((c) =>
      PRAYERS.map((p) => ({
        url: `${base}/${l}/${c.slug}/${p.slug}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.7,
      }))
    )
  );

  const districtPages = locales.flatMap((l) =>
    DISTRICTS.map((d) => ({
      url: `${base}/${l}/${d.citySlug}/${d.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }))
  );

  // International (dunyo) cities
  const internationalIndexPages = locales.map((l) => ({
    url: `${base}/${l}/dunyo`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const internationalCityPages = locales.flatMap((l) =>
    INTERNATIONAL_CITIES.map((c) => ({
      url: `${base}/${l}/dunyo/${c.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))
  );

  return [
    ...homePages,
    ...citiesPages,
    ...internationalIndexPages,
    ...regionPages,
    ...cityPages,
    ...internationalCityPages,
    ...monthlyPages,
    ...prayerPages,
    ...districtPages,
  ];
}
