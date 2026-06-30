import { QA, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/**
 * Visible FAQ accordion + matching FAQPage JSON-LD.
 * Content is in the DOM (expandable <details>) so it complies with
 * Google's requirement that FAQ structured data be visible on the page.
 */
export function Faq({ items, heading }: { items: QA[]; heading: string }) {
  if (items.length === 0) return null;
  return (
    <section className="py-8">
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-text mb-4">
          {heading}
        </h2>
        <div className="divide-y divide-border-light border border-border rounded-2xl overflow-hidden bg-surface">
          {items.map((it) => (
            <details key={it.q} className="group">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-text list-none [&::-webkit-details-marker]:hidden">
                <span>{it.q}</span>
                <span className="shrink-0 text-lg leading-none text-text-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-5 pb-4 text-sm text-text-secondary leading-relaxed">{it.a}</p>
            </details>
          ))}
        </div>
        <JsonLd data={faqJsonLd(items)} />
      </div>
    </section>
  );
}
