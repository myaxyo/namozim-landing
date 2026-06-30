import { ImageResponse } from "next/og";
import { getCityBySlug, getCityName, CITIES } from "@/data/cities";
import { fetchPrayerTimesServer } from "@/lib/fetchPrayerTimes";
import { Locale } from "@/data/translations";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Namoz vaqtlari";

export default async function Image({ params }: { params: Promise<{ locale: string; city: string }> }) {
  const { locale, city: slug } = await params;
  const l = locale as Locale;
  const city = getCityBySlug(slug);
  if (!city) return new ImageResponse(<div>Not found</div>, { ...size });

  const name = getCityName(city, l);
  const times = await fetchPrayerTimesServer(city.lat, city.lng);

  const prayers = l === "ru"
    ? [{ n: "Фаджр", t: times?.fajr }, { n: "Зухр", t: times?.dhuhr }, { n: "Аср", t: times?.asr }, { n: "Магриб", t: times?.maghrib }, { n: "Иша", t: times?.isha }]
    : [{ n: "Bomdod", t: times?.fajr }, { n: "Peshin", t: times?.dhuhr }, { n: "Asr", t: times?.asr }, { n: "Shom", t: times?.maghrib }, { n: "Xufton", t: times?.isha }];

  const title = l === "ru" ? `Время намаза — ${name}` : l === "en" ? `Prayer Times — ${name}` : `Namoz vaqtlari — ${name}`;
  const subtitle = l === "ru" ? "Ханафитский мазхаб • Muslim World League" : l === "en" ? "Hanafi School • Muslim World League" : "Hanafiy mazhab • Muslim World League";
  const today = new Date().toLocaleDateString(l === "ru" ? "ru-RU" : l === "en" ? "en-US" : "uz-Latn-UZ", { day: "numeric", month: "long", year: "numeric" });

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "linear-gradient(135deg, #0D6F62, #184C6A)", fontFamily: "sans-serif" }}>
        {/* Left side */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>N</span>
            </div>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "18px" }}>Namozim</span>
          </div>
          <h1 style={{ color: "white", fontSize: "48px", fontWeight: "bold", lineHeight: 1.1, margin: "0 0 12px 0" }}>{title}</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", margin: "0 0 6px 0" }}>{subtitle}</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: 0 }}>{today}</p>
        </div>

        {/* Right side - prayer times */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "50px 60px 50px 0", gap: "12px" }}>
          {prayers.map((p) => (
            <div key={p.n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.12)", borderRadius: "16px", padding: "14px 24px", width: "320px" }}>
              <span style={{ color: "white", fontSize: "20px", fontWeight: 500 }}>{p.n}</span>
              <span style={{ color: "white", fontSize: "28px", fontWeight: "bold" }}>{p.t || "--:--"}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
