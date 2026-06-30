import { ImageResponse } from "next/og";
import { Locale, t } from "@/data/translations";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Namozim - Namoz vaqtlari";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;

  const title = t(l, "hero_title");
  const subtitle = t(l, "hero_method");
  const features = l === "ru"
    ? ["Время намаза", "Тасбих", "Отслеживание", "Уведомления"]
    : l === "en"
    ? ["Prayer Times", "Tasbih", "Tracking", "Notifications"]
    : ["Namoz vaqtlari", "Tasbih", "Kuzatish", "Eslatmalar"];

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "linear-gradient(135deg, #0D6F62, #184C6A)", fontFamily: "sans-serif", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "60px" }}>
          {/* Logo */}
          <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
            <span style={{ color: "white", fontSize: "36px", fontWeight: "bold" }}>N</span>
          </div>
          <h1 style={{ color: "white", fontSize: "56px", fontWeight: "bold", margin: "0 0 12px 0", lineHeight: 1.1 }}>{title}</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "20px", margin: "0 0 40px 0" }}>{subtitle}</p>
          {/* Feature pills */}
          <div style={{ display: "flex", gap: "12px" }}>
            {features.map((f) => (
              <div key={f} style={{ background: "rgba(255,255,255,0.15)", borderRadius: "999px", padding: "10px 24px" }}>
                <span style={{ color: "white", fontSize: "18px" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
