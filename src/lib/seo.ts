export const SITE_URL = "https://namozim.uz";

/**
 * Builds an absolute hreflang alternates map for a given path suffix
 * (the part after the locale segment, e.g. "", "/shaharlar", "/toshkent").
 * Includes all four locales plus x-default (Latin Uzbek), using valid
 * BCP-47 codes (uz-Cyrl, not uz-cyrl) for the hreflang attribute.
 */
export function hreflangAlternates(suffix = ""): Record<string, string> {
  const s = suffix && !suffix.startsWith("/") ? `/${suffix}` : suffix;
  return {
    uz: `${SITE_URL}/uz${s}`,
    "uz-Cyrl": `${SITE_URL}/uz-cyrl${s}`,
    ru: `${SITE_URL}/ru${s}`,
    en: `${SITE_URL}/en${s}`,
    tg: `${SITE_URL}/tg${s}`,
    ky: `${SITE_URL}/ky${s}`,
    "x-default": `${SITE_URL}/uz${s}`,
  };
}

export interface Crumb {
  name: string;
  /** Absolute URL or path beginning with "/". */
  url: string;
}

export function breadcrumbJsonLd(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

export interface QA {
  q: string;
  a: string;
}

export function faqJsonLd(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}
