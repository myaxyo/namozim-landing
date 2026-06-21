import { Header } from "@/components/Header";
import { PrayerTimes } from "@/components/PrayerTimes";
import { Cities } from "@/components/Cities";
import { About } from "@/components/About";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <PrayerTimes />
        <Cities />
        <About />
        <Download />
      </main>
      <Footer />
    </>
  );
}
