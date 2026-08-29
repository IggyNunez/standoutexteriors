"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";

/**
 * Captures Google Ads / UTM parameters off the landing URL and persists them.
 *
 * Mounted once in the root layout so it runs on every entry point, including
 * blog posts and city pages an ad might point at. It also re-runs on
 * client-side route changes, because Next.js does not remount the layout on
 * navigation.
 *
 * Deliberately does NOT use useSearchParams(). That hook forces the subtree
 * into a Suspense boundary and, on this site's statically prerendered routes,
 * the boundary never resolved on the client, so the effect below never ran
 * and no attribution was ever stored. captureAttribution() reads
 * window.location itself, so the hook bought us nothing anyway.
 *
 * Renders nothing.
 */
export default function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution();
  }, [pathname]);

  return null;
}
