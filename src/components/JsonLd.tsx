/**
 * Renders a JSON-LD structured-data script tag.
 * Server component — safe to embed in pages and layouts.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
