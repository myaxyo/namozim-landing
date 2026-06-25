export interface ServerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export async function fetchPrayerTimesServer(
  lat: number,
  lng: number
): Promise<ServerTimes | null> {
  try {
    const d = new Date();
    const ds = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    const url = `https://api.aladhan.com/v1/timings/${ds}?latitude=${lat}&longitude=${lng}&method=3&school=1`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.data?.timings) {
      const t = data.data.timings;
      const clean = (s: string) => s.replace(/ \(.*\)/, "");
      return {
        fajr: clean(t.Fajr),
        sunrise: clean(t.Sunrise),
        dhuhr: clean(t.Dhuhr),
        asr: clean(t.Asr),
        maghrib: clean(t.Maghrib),
        isha: clean(t.Isha),
      };
    }
  } catch {}
  return null;
}
