"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  TelemetryDeckProvider as TDProvider,
  createTelemetryDeck,
  useTelemetryDeck,
} from "@typedigital/telemetrydeck-react";

const td = createTelemetryDeck({
  appID: process.env.NEXT_PUBLIC_TELEMETRYDECK_APP_ID || "",
  clientUser: "anonymous",
});

/**
 * Tracks page views on route changes.
 */
function PageViewTracker() {
  const { signal } = useTelemetryDeck();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    signal("pageview", {
      path: pathname,
      referrer: document.referrer || "",
    });
  }, [pathname, signal]);

  return null;
}

export function TelemetryDeck({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_TELEMETRYDECK_APP_ID) {
    return <>{children}</>;
  }

  return (
    <TDProvider telemetryDeck={td}>
      <PageViewTracker />
      {children}
    </TDProvider>
  );
}
