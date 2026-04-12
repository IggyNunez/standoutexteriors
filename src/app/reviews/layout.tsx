import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "See what Denver NC homeowners say about Stand Out Exterior Cleaning. 5-star rated pressure washing & soft washing across Lake Norman.",
  openGraph: {
    title: "Reviews | Stand Out Exterior Cleaning",
    description:
      "See what Denver NC homeowners say about Stand Out Exterior Cleaning. 5-star rated pressure washing & soft washing across Lake Norman.",
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
