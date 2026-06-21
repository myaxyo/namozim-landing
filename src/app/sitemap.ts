import { MetadataRoute } from "next";
import { CITIES } from "@/data/cities";

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

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    ...homePages,
    ...citiesPages,
    ...cityPages,
  ];
}
