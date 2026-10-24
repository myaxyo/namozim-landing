<div align="center">

# 🕌 Namozim Web

**Modern, fast, and accurate prayer times web platform & landing page.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

[**Live Website (namozim.uz)**](https://namozim.uz) &bull; [**Android App**](https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti) &bull; [**iOS App**](https://apps.apple.com/us/app/namozim/id6761498579) &bull; [**Report a Bug**](https://github.com/myaxyo/namozim-landing/issues)

</div>

---

## 📖 Overview

**Namozim Web** is the open-source web application and landing portal for the **Namozim** Islamic companion platform. It delivers real-time, highly accurate daily prayer times (Bomdod, Quyosh, Peshin, Asr, Shom, Xufton), countdowns to upcoming prayers, full monthly prayer calendars (*Oylik taqvim*), and downloadable visual prayer cards for sharing.

The platform provides static pre-rendering for over 5,000 localized city and district combinations across Uzbekistan, Central Asia, and major international cities worldwide.

---

## ✨ Features

- 📍 **Astronomical & Official Calculations**
  - **Uzbekistan**: Uses official Muslim Board of Uzbekistan (*O‘zbekiston Musulmonlari Idorasi*) timetable and regional minute offsets (Hanafi juristic method).
  - **Worldwide**: Calculates astronomical prayer times using the Muslim World League (MWL) method via the [`adhan`](https://github.com/batoulapps/adhan-js) library.
- ⏱️ **Live Countdown & Active Prayer Highlighting**
  - Instant countdown timer to the next prayer, updating seamlessly in the browser.
- 🌍 **Comprehensive Regional & Global Coverage**
  - All regions (*viloyat*) and districts (*tuman*) across Uzbekistan.
  - Central Asian cities (Tajikistan, Kyrgyzstan, Kazakhstan).
  - Hundreds of major international diaspora hubs (Moscow, Saint Petersburg, Istanbul, Dubai, New York, Seoul, etc.).
- 🌐 **Multi-Language Support (i18n)**
  - Uzbek (Latin & Cyrillic)
  - Russian
  - English
  - Tajik
  - Kyrgyz
- 📅 **Monthly Calendars (Oylik Taqvim)**
  - Full 30-day schedules generated dynamically for any chosen city or district.
- 📸 **Downloadable Daily Timetable Cards**
  - One-click export of current prayer times to a beautifully styled PNG image (`html-to-image`) optimized for mobile messaging and social stories.
- 🚀 **SEO & Performance Engineered**
  - Static Site Generation (SSG) with incremental revalidation.
  - Automated OpenGraph preview images (native Next.js `ImageResponse`).
  - Complete Schema.org JSON-LD structured metadata (`WebSite`, `Organization`, `MobileApplication`).
  - Privacy-friendly telemetry with Umami and TelemetryDeck.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Frontend UI** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS |
| **Calculations** | [`adhan`](https://github.com/batoulapps/adhan-js) |
| **Image Export** | [`html-to-image`](https://github.com/bubkoo/html-to-image) |
| **Typography** | Cormorant Garamond & Inter (via `next/font`) |
| **Analytics** | [Umami](https://umami.is/) (self-hosted rewrite) & [TelemetryDeck](https://telemetrydeck.com/) |

---

## 📁 Project Structure

```text
├── public/                 # Static assets (favicons, icons, manifest, app badges)
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── [locale]/       # Localized pages (e.g. /uz, /ru, /en)
│   │   │   ├── [city]/     # City-specific prayer times & monthly pages
│   │   │   ├── dunyo/      # Worldwide cities directory
│   │   │   ├── shaharlar/  # Uzbekistan cities & regions directory
│   │   │   └── viloyat/    # Regional views
│   │   ├── globals.css     # Global Tailwind CSS definitions
│   │   ├── layout.tsx      # Root HTML layout and global metadata
│   │   ├── robots.ts       # Dynamic robots.txt
│   │   └── sitemap.ts      # Automated multi-locale sitemap index
│   ├── components/         # Reusable React components
│   │   ├── PrayerTimes.tsx # Client-side prayer cards with live countdown
│   │   ├── MonthlyCalendar.tsx # Monthly schedule generator
│   │   ├── CitiesSearch.tsx# Instant city search input
│   │   ├── Header.tsx      # Responsive header with language selector
│   │   └── ...
│   ├── data/               # Static geographic data and localization
│   │   ├── cities.ts       # Uzbekistan cities and coordinates
│   │   ├── districts.ts    # Districts by region
│   │   ├── internationalCities.ts # Major world cities
│   │   ├── uzOfficialOffsets.ts   # Regional time offsets (Muslim Board)
│   │   └── translations.ts # Multi-locale dictionaries
│   └── lib/                # Core calculation utilities
│       ├── prayerTimes.ts  # Prayer time calculators & formatters
│       ├── places.ts       # Coordinate mapping & timezone handlers
│       └── seo.ts          # Canonical URLs and hreflang helpers
├── .env.example            # Sample environment variables
└── next.config.ts          # Next.js configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or later (tested on Node 20, 22, 23)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 1. Clone the repository

```bash
git clone https://github.com/myaxyo/namozim-landing.git
cd namozim-landing
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the sample environment file:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_TELEMETRYDECK_APP_ID` | Optional TelemetryDeck App ID for anonymous usage analytics | Empty (disabled) |

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Builds the optimized production static site |
| `npm run start` | Starts the Next.js production server |
| `npm run lint` | Runs ESLint checks across the codebase |

---

## 📐 Calculation Methodology

1. **Uzbekistan Locations**:
   - Primary baseline calculation uses Tashkent's reference coordinates.
   - City and district times are derived using official minute offsets determined by the **Muslims Board of Uzbekistan** (*O‘zbekiston Musulmonlari Idorasi*).
   - Hanafi Asr calculation method (`Madhab.Hanafi`).

2. **International Locations**:
   - Exact latitude and longitude astronomical computation using the Muslim World League calculation method.
   - Local timezone and DST adjustments handled natively.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please review our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## ℹ️ About Namozim

**Namozim** is a modern, privacy-focused Islamic utility platform designed to give Muslims accurate, reliable prayer times and spiritual companions both on the web and on mobile devices.

- **Mission**: Provide accessible, ad-free, and precise prayer calculations based on authoritative regional religious boards.
- **Official Source**: For Uzbekistan, times are calibrated against the official timetable of the **Muslims Board of Uzbekistan** (*O‘zbekiston Musulmonlari Idorasi*), following the Hanafi school of jurisprudence.
- **Maintainer**: Developed and maintained by [Prompter MChJ](https://prompter.uz) and open-source contributors.
- **Ecosystem**:
  - Web: [namozim.uz](https://namozim.uz)
  - Android: [Google Play Store](https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti)
  - iOS: [Apple App Store](https://apps.apple.com/us/app/namozim/id6761498579)

---

## 📱 Mobile Applications

Looking for the mobile version? Download Namozim on your mobile device:

- [**Google Play Store**](https://play.google.com/store/apps/details?id=com.mo_dev.nomozvaqti)
- [**Apple App Store**](https://apps.apple.com/us/app/namozim/id6761498579)
