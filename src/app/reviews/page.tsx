import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import ReviewsClient from "./ReviewsClient";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read real customer reviews of Stand Out Exterior Cleaning from Denver, NC and the Lake Norman area. House washing, driveway cleaning, roof cleaning, and more.",
  alternates: { canonical: `${SITE_URL}/reviews` },
};

export default function ReviewsPage() {
  return <ReviewsClient />;
}
