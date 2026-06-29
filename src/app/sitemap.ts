import { MetadataRoute } from "next";
import { CITIES } from "@/data/cities";
import { DISTRICTS } from "@/data/districts";
import { REGIONS } from "@/data/regions";
import { PRAYERS } from "@/data/prayers";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://namozim.uz";
  const locales = ["uz", "ru", "en"];

  const homePages = locales.map((l) => ({
    url: `${base}/${l}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
  }));

  const citiesPages = locales.map((l) => ({
    url: `${base}/${l}/shaharlar`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const cityPages = locales.flatMap((l) =>
    CITIES.map((c) => ({
      url: `${base}/${l}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))
  );

  const monthlyPages = locales.flatMap((l) =>
    CITIES.map((c) => ({
      url: `${base}/${l}/${c.slug}/oylik`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }))
  );

  const districtPages = locales.flatMap((l) =>
    DISTRICTS.map((d) => ({
      url: `${base}/${l}/${d.citySlug}/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }))
  );

  const regionPages = locales.flatMap((l) =>
    REGIONS.map((r) => ({
      url: `${base}/${l}/viloyat/${r.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.85,
    }))
  );

  const prayerPages = locales.flatMap((l) =>
    CITIES.flatMap((c) =>
      PRAYERS.map((p) => ({
        url: `${base}/${l}/${c.slug}/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.7,
      }))
    )
  );

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ...homePages,
    ...citiesPages,
    ...regionPages,
    ...cityPages,
    ...monthlyPages,
    ...prayerPages,
    ...districtPages,
  ];
}
