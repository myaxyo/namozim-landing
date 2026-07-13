import { MetadataRoute } from "next";
import { CITIES } from "@/data/cities";
import { DISTRICTS } from "@/data/districts";
import { REGIONS } from "@/data/regions";
import { PRAYERS } from "@/data/prayers";
import { INTERNATIONAL_CITIES } from "@/data/internationalCities";

/**
 * Split sitemaps by country/section for better crawl prioritization.
 * Google can crawl each segment independently.
 */
export async function generateSitemaps() {
  return [
    { id: "core" },        // home, shaharlar, dunyo index
    { id: "uz-cities" },   // Uzbekistan cities + prayers + monthly
    { id: "tj-cities" },   // Tajikistan cities + prayers + monthly
    { id: "kg-cities" },   // Kyrgyzstan cities + prayers + monthly
    { id: "regions" },     // All regions (viloyat)
    { id: "districts" },   // UZ districts
    { id: "international" }, // Dunyo (diaspora) cities
  ];
}

export default function sitemap({ id }: { id: string }): MetadataRoute.Sitemap {
  const base = "https://namozim.uz";
  const locales = ["uz", "uz-cyrl", "ru", "en", "tg", "ky"];
  const now = new Date();

  if (id === "core") {
    return [
      ...locales.map((l) => ({
        url: `${base}/${l}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 1,
      })),
      ...locales.map((l) => ({
        url: `${base}/${l}/shaharlar`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      })),
      ...locales.map((l) => ({
        url: `${base}/${l}/dunyo`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      })),
    ];
  }

  if (id === "uz-cities") {
    const uzCities = CITIES.filter((c) => !c.country || c.country === "uz");
    return locales.flatMap((l) => [
      ...uzCities.map((c) => ({
        url: `${base}/${l}/${c.slug}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
      ...uzCities.map((c) => ({
        url: `${base}/${l}/${c.slug}/oylik`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.7,
      })),
      ...uzCities.flatMap((c) =>
        PRAYERS.map((p) => ({
          url: `${base}/${l}/${c.slug}/${p.slug}`,
          lastModified: now,
          changeFrequency: "daily" as const,
          priority: 0.7,
        }))
      ),
    ]);
  }

  if (id === "tj-cities") {
    const tjCities = CITIES.filter((c) => c.country === "tj");
    return locales.flatMap((l) => [
      ...tjCities.map((c) => ({
        url: `${base}/${l}/${c.slug}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
      ...tjCities.map((c) => ({
        url: `${base}/${l}/${c.slug}/oylik`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.7,
      })),
      ...tjCities.flatMap((c) =>
        PRAYERS.map((p) => ({
          url: `${base}/${l}/${c.slug}/${p.slug}`,
          lastModified: now,
          changeFrequency: "daily" as const,
          priority: 0.7,
        }))
      ),
    ]);
  }

  if (id === "kg-cities") {
    const kgCities = CITIES.filter((c) => c.country === "kg");
    return locales.flatMap((l) => [
      ...kgCities.map((c) => ({
        url: `${base}/${l}/${c.slug}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.8,
      })),
      ...kgCities.map((c) => ({
        url: `${base}/${l}/${c.slug}/oylik`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.7,
      })),
      ...kgCities.flatMap((c) =>
        PRAYERS.map((p) => ({
          url: `${base}/${l}/${c.slug}/${p.slug}`,
          lastModified: now,
          changeFrequency: "daily" as const,
          priority: 0.7,
        }))
      ),
    ]);
  }

  if (id === "regions") {
    return locales.flatMap((l) =>
      REGIONS.map((r) => ({
        url: `${base}/${l}/viloyat/${r.slug}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.85,
      }))
    );
  }

  if (id === "districts") {
    return locales.flatMap((l) =>
      DISTRICTS.map((d) => ({
        url: `${base}/${l}/${d.citySlug}/${d.slug}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.7,
      }))
    );
  }

  if (id === "international") {
    return locales.flatMap((l) =>
      INTERNATIONAL_CITIES.map((c) => ({
        url: `${base}/${l}/dunyo/${c.slug}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.8,
      }))
    );
  }

  return [];
}
