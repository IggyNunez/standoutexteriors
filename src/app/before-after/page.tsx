import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import BeforeAfterClient from "./BeforeAfterClient";

export const metadata: Metadata = {
  title: "Before & After Gallery",
  description:
    "See the difference Stand Out Exterior Cleaning makes. Real before and after photos of house washing, driveway cleaning, roof cleaning, and more in Denver, NC and the Lake Norman area.",
  alternates: { canonical: `${SITE_URL}/before-after` },
};

export default function BeforeAfterPage() {
  return <BeforeAfterClient />;
}
