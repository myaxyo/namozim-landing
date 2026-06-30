import { Crumb, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/**
 * Visible breadcrumb trail + matching BreadcrumbList JSON-LD.
 * The last item is rendered as the current (non-linked) page.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className="max-w-3xl mx-auto px-5 pt-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={it.url} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-text-muted/50">/</span>}
              {last ? (
                <span className="text-text-secondary">{it.name}</span>
              ) : (
                <a href={it.url} className="hover:text-primary transition-colors">
                  {it.name}
                </a>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </nav>
  );
}
