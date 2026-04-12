import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Before & After",
  description:
    "Dramatic before-and-after photos from Stand Out Exterior Cleaning. Real pressure washing results on homes, driveways, roofs & more in Denver NC.",
  openGraph: {
    title: "Before & After | Stand Out Exterior Cleaning",
    description:
      "Dramatic before-and-after photos from Stand Out Exterior Cleaning. Real pressure washing results on homes, driveways, roofs & more in Denver NC.",
  },
};

export default function BeforeAfterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
