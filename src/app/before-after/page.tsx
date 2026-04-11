"use client";

import { useState, useRef, useCallback } from "react";
import { m as motion, useInView, AnimatePresence } from 'framer-motion';
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { PHONE, PHONE_HREF } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─────────────────────────────────────────────────────────
   ALL 153 compressed WebP images
   ───────────────────────────────────────────────────────── */
type BAItem = { id: string; src: string; tag: string; label: string };

/**
 * Build a rich, SEO-friendly alt string for a before-after photo.
 * Includes the service type, the location keyword, and the brand.
 * Example: "House Washing Before & After in Denver, NC — Stand Out Exterior Cleaning"
 */
function buildPhotoAlt(item: BAItem): string {
  const service = item.label.includes("Before") ? item.label : `${item.label} Before & After`;
  return `${service} in Denver, NC & Lake Norman — Stand Out Exterior Cleaning`;
}

const IMAGES: BAItem[] = [
  // ── Known before/after split shots ──
  { id: "ba-1",  src: "beforeafter1.webp",                tag: "Before & After", label: "Before & After" },
  { id: "ba-2",  src: "beforeafter2.webp",                tag: "Before & After", label: "Before & After" },
  { id: "ba-3",  src: "beforeafter3.webp",                tag: "Before & After", label: "Before & After" },
  { id: "ba-4",  src: "b_a1.webp",                        tag: "Before & After", label: "Before & After" },
  { id: "ba-5",  src: "b_a2.webp",                        tag: "Before & After", label: "Before & After" },
  { id: "ba-6",  src: "drivewayb_a.webp",                 tag: "Before & After", label: "Driveway Before & After" },
  { id: "ba-7",  src: "b4afterstudio.com1234.webp",       tag: "Before & After", label: "Before & After" },
  { id: "ba-8",  src: "b4afterstudio.com1908.webp",       tag: "Before & After", label: "Before & After" },
  { id: "ba-9",  src: "untitled-design.webp",             tag: "Before & After", label: "Before & After" },
  { id: "ba-10", src: "ezy-watermark_28-06-2023_18-19-40-2460.webp", tag: "Before & After", label: "Before & After" },

  // ── Roof ──
  { id: "r-1",  src: "roof111.webp",   tag: "Roof", label: "Roof Cleaning" },
  { id: "r-2",  src: "hash2.webp",     tag: "Roof", label: "Roof Cleaning" },
  { id: "r-3",  src: "hash5.webp",     tag: "Roof", label: "Roof Cleaning" },
  { id: "r-4",  src: "hash6.webp",     tag: "Roof", label: "Roof Cleaning" },

  // ── eZy watermarked ──
  { id: "ez-1", src: "ezy-watermark-17-07-2023-18-37-03-6190.webp", tag: "Driveway", label: "Driveway Cleaning" },
  { id: "ez-2", src: "ezy-watermark-17-07-2023-18-37-04-0070.webp", tag: "Driveway", label: "Driveway Cleaning" },
  { id: "ez-3", src: "ezy-watermark-17-07-2023-18-37-04-2990.webp", tag: "Driveway", label: "Driveway Cleaning" },

  // ── UUID / misc ──
  { id: "u-1",  src: "2f554c91-a02a-45ab-932c-625a9c4db4b8.webp", tag: "House Washing", label: "Exterior Cleaning" },
  { id: "u-2",  src: "42e9ce42db9e4f1b9f0a9ec3ece546ba.webp",      tag: "House Washing", label: "House Washing" },

  // ── Unnamed ──
  { id: "un-1", src: "unnamed.webp",   tag: "House Washing", label: "Exterior Cleaning" },
  { id: "un-2", src: "unnamed-1.webp", tag: "House Washing", label: "Exterior Cleaning" },
  { id: "un-3", src: "unnamed-2.webp", tag: "House Washing", label: "Exterior Cleaning" },
  { id: "un-4", src: "unnamed-2-1.webp", tag: "House Washing", label: "Exterior Cleaning" },
  { id: "un-5", src: "unnamed-3.webp", tag: "House Washing", label: "Exterior Cleaning" },

  // ── IMG series ──
  { id: "i-1",   src: "img_1028.webp",  tag: "House Washing", label: "Exterior Cleaning" },
  { id: "i-2",   src: "img_2307.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-3",   src: "img_2353.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-4",   src: "img_2450.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-5",   src: "img_2674.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-6",   src: "img_2688.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-7",   src: "img_2829.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-8",   src: "img_2831.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-9",   src: "img_2859.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-10",  src: "img_3268.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-11",  src: "img_3325.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-12",  src: "img_3490.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-13",  src: "img_3563.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-14",  src: "img_3564.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-15",  src: "img_3579.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-16",  src: "img_3602.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-17",  src: "img_3734.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-18",  src: "img_3805.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-19",  src: "img_3807.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-20",  src: "img_3906.webp",  tag: "Roof",          label: "Roof Cleaning" },
  { id: "i-21",  src: "img_3907.webp",  tag: "Roof",          label: "Roof Cleaning" },
  { id: "i-22",  src: "img_3911.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-23",  src: "img_3912.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-24",  src: "img_3943.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-25",  src: "img_3967.webp",  tag: "Gutter",        label: "Gutter Cleaning" },
  { id: "i-26",  src: "img_3968.webp",  tag: "Gutter",        label: "Gutter Cleaning" },
  { id: "i-27",  src: "img_3969.webp",  tag: "Gutter",        label: "Gutter Cleaning" },
  { id: "i-28",  src: "img_3970.webp",  tag: "Gutter",        label: "Gutter Cleaning" },
  { id: "i-29",  src: "img_3971.webp",  tag: "Gutter",        label: "Gutter Cleaning" },
  { id: "i-30",  src: "img_4060.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-31",  src: "img_4065.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-32",  src: "img_4067.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-33",  src: "img_4068.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-34",  src: "img_4130.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-35",  src: "img_4131.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-36",  src: "img_4228.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-37",  src: "img_4324.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-38",  src: "img_4425.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-39",  src: "img_4434.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-40",  src: "img_4520.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-41",  src: "img_4556.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-42",  src: "img_4557.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-43",  src: "img_4559.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-44",  src: "img_4602.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-45",  src: "img_4635.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-46",  src: "img_4854.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-47",  src: "img_4856.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-48",  src: "img_5064.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-49",  src: "img_5247.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-50",  src: "img_5380.webp",  tag: "Roof",          label: "Roof Cleaning" },
  { id: "i-51",  src: "img_5420.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-52",  src: "img_5421.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-53",  src: "img_5422.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-54",  src: "img_5423.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-55",  src: "img_5424.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-56",  src: "img_5457.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-57",  src: "img_5459.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-58",  src: "img_5507.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-59",  src: "img_5508.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-60",  src: "img_5510.webp",  tag: "Gutter",        label: "Gutter Cleaning" },
  { id: "i-61",  src: "img_5511.webp",  tag: "Gutter",        label: "Gutter Cleaning" },
  { id: "i-62",  src: "img_5517.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-63",  src: "img_5518.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-64",  src: "img_5558.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-65",  src: "img_5559.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-66",  src: "img_5576.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-67",  src: "img_5577.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-68",  src: "img_5578.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-69",  src: "img_5579.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-70",  src: "img_5580.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-71",  src: "img_5581.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-72",  src: "img_5583.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-73",  src: "img_5586.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-74",  src: "img_5587.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-75",  src: "img_5588.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-76",  src: "img_5589.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-77",  src: "img_5592.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-78",  src: "img_5595.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-79",  src: "img_5600.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-80",  src: "img_5601.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-81",  src: "img_5602.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-82",  src: "img_5623.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-83",  src: "img_5626.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-84",  src: "img_5628.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-85",  src: "img_5629.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-86",  src: "img_5675.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-87",  src: "img_5752.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-88",  src: "img_5753.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-89",  src: "img_5754.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-90",  src: "img_5772.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-91",  src: "img_5773.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-92",  src: "img_5774.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-93",  src: "img_5796.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-94",  src: "img_5797.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-95",  src: "img_5798.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-96",  src: "img_5799.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-97",  src: "img_5835.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-98",  src: "img_5862.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-99",  src: "img_5863.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-100", src: "img_5864.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-101", src: "img_5865.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-102", src: "img_5912.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-103", src: "img_5916.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-104", src: "img_5926.webp",  tag: "Commercial",    label: "Commercial Cleaning" },
  { id: "i-105", src: "img_5976.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-106", src: "img_5978.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-107", src: "img_5979.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-108", src: "img_6011.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-109", src: "img_6012.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-110", src: "img_6013.webp",  tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-111", src: "img_6029.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-112", src: "img_6030.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-113", src: "img_6056.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-114", src: "img_6057.webp",  tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-115", src: "img_7656.webp",  tag: "Commercial",    label: "Commercial Cleaning" },
  { id: "i-116", src: "img_8264.webp",  tag: "House Washing", label: "House Washing" },
  { id: "i-117", src: "img_e4068.webp", tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-118", src: "10.webp",        tag: "House Washing", label: "House Washing" },
  { id: "i-119", src: "12.webp",        tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-120", src: "13.webp",        tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-121", src: "14.webp",        tag: "House Washing", label: "House Washing" },
  { id: "i-122", src: "15.webp",        tag: "House Washing", label: "House Washing" },
  { id: "i-123", src: "16.webp",        tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-124", src: "18.webp",        tag: "House Washing", label: "House Washing" },
  { id: "i-125", src: "19.webp",        tag: "Paver",         label: "Paver Cleaning" },
  { id: "i-126", src: "20.webp",        tag: "Driveway",      label: "Driveway Cleaning" },
  { id: "i-127", src: "21.webp",        tag: "House Washing", label: "House Washing" },
  { id: "i-128", src: "7.webp",         tag: "House Washing", label: "House Washing" },
  { id: "i-129", src: "8.webp",         tag: "Driveway",      label: "Driveway Cleaning" },
];

const ALL_TAGS = ["All", "Before & After", "Driveway", "House Washing", "Roof", "Paver", "Gutter", "Commercial"];

/* Tag icons for sidebar */
const TAG_ICONS: Record<string, string> = {
  "All": "M4 6h16M4 12h16M4 18h16",
  "Before & After": "M8 7h12M8 12h12M8 17h12M4 7h1M4 12h1M4 17h1",
  "Driveway": "M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2h-3",
  "House Washing": "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  "Roof": "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  "Paver": "M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z",
  "Gutter": "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  "Commercial": "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
};

const TAG_COUNTS: Record<string, number> = { All: IMAGES.length };
IMAGES.forEach((img) => { TAG_COUNTS[img.tag] = (TAG_COUNTS[img.tag] ?? 0) + 1; });

/* ── Lightbox ── */
function Lightbox({ item, onClose, onPrev, onNext }: { item: BAItem; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/92 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative max-w-5xl w-full max-h-[92vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/assets/before-after/${item.src}`} alt={buildPhotoAlt(item)} className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" />

        <button onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg>
        </button>
        <button onClick={onPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button onClick={onNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/80 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Photo card ── */
function PhotoCard({ item, onClick }: { item: BAItem; onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: EASE }}
      className="group relative overflow-hidden rounded-xl cursor-zoom-in shadow-[0_2px_12px_rgba(10,46,92,0.1)] hover:shadow-[0_8px_28px_rgba(10,46,92,0.18)] transition-shadow duration-300 bg-gray-100"
      style={{ aspectRatio: "4/3" }}
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/assets/before-after/${item.src}`}
        alt={buildPhotoAlt(item)}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Tag pill */}
      <div className="absolute top-2.5 left-2.5">
        <span className="text-[0.55rem] font-black tracking-[0.1em] uppercase px-2 py-0.5 rounded-full" style={{ background: "#00A651", color: "white" }}>
          {item.tag}
        </span>
      </div>

      {/* Zoom icon on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
        </div>
      </div>

      {/* Label on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white text-[0.75rem] font-bold">{item.label}</p>
      </div>
    </motion.div>
  );
}

/* ── Filter sidebar item ── */
function FilterItem({ tag, active, onClick }: { tag: string; active: boolean; onClick: () => void }) {
  const count = tag === "All" ? IMAGES.length : (TAG_COUNTS[tag] ?? 0);
  const iconPath = TAG_ICONS[tag] ?? TAG_ICONS["All"];

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left group"
      style={{
        background: active ? "rgba(0,166,81,0.1)" : "transparent",
        color: active ? "#00A651" : "#374151",
      }}
    >
      {/* Active indicator bar */}
      <span
        className="shrink-0 w-[3px] h-5 rounded-full transition-all duration-200"
        style={{ background: active ? "#00A651" : "transparent" }}
      />

      {/* Icon */}
      <span
        className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-200"
        style={{
          background: active ? "rgba(0,166,81,0.15)" : "rgba(10,46,92,0.05)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={active ? "#00A651" : "#6b7280"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d={iconPath} />
        </svg>
      </span>

      {/* Label */}
      <span className="flex-1 text-[0.78rem] font-bold tracking-[0.02em]">{tag}</span>

      {/* Count badge */}
      <span
        className="text-[0.65rem] font-black px-2 py-0.5 rounded-full min-w-[28px] text-center transition-colors duration-200"
        style={{
          background: active ? "#00A651" : "rgba(10,46,92,0.07)",
          color: active ? "white" : "#6b7280",
        }}
      >
        {count}
      </span>
    </button>
  );
}

/* ── Page ── */
export default function BeforeAfterPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const filtered = activeTag === "All" ? IMAGES : IMAGES.filter((i) => i.tag === activeTag);

  const openLightbox = useCallback((idx: number) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevPhoto = useCallback(() => setLightboxIdx((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)), [filtered.length]);
  const nextPhoto = useCallback(() => setLightboxIdx((i) => (i === null ? null : (i + 1) % filtered.length)), [filtered.length]);

  const handleTagSelect = useCallback((tag: string) => {
    setActiveTag(tag);
    setDrawerOpen(false);
  }, []);

  return (
    <>
      <Nav />
      <main className="bg-white min-h-screen pt-[120px] min-[1200px]:pt-[140px]">

        {/* ── Hero ── */}
        <section ref={heroRef} className="pb-10 px-[clamp(20px,4vw,80px)] max-w-[1920px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: EASE }} className="mb-5">
            <span className="inline-flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
              style={{ background: "rgba(0,166,81,0.08)", border: "1px solid rgba(0,166,81,0.2)", color: "#00A651" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Real Jobs · Real Results · Denver &amp; Lake Norman Area
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08, duration: 0.7, ease: EASE }}
            className="font-[family-name:var(--font-display)] uppercase text-blue-900 leading-[0.95] tracking-[0.02em] mb-5"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}
          >
            Before &amp; After<br />
            <span style={{ color: "#00A651" }}>The Stand Out Difference</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-gray-500 max-w-xl mx-auto leading-relaxed mb-8 text-[0.95rem]"
          >
            {IMAGES.length} real photos from real properties across Denver &amp; Lake Norman. Every single one is a job we did — no stock photos, no tricks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.28, duration: 0.6, ease: EASE }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { value: `${IMAGES.length}+`, label: "Photos" },
              { value: "5.0★", label: "Google Rating" },
              { value: "500+", label: "Jobs Completed" },
            ].map((s) => (
              <div key={s.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[0.75rem] font-bold"
                style={{ background: "rgba(10,46,92,0.05)", border: "1px solid rgba(10,46,92,0.1)", color: "#0A2E5C" }}>
                <span style={{ color: "#00A651" }}>{s.value}</span>{s.label}
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Main layout: sidebar + grid ── */}
        <div className="max-w-[1920px] mx-auto px-[clamp(20px,4vw,80px)] pb-10">

          {/* Mobile: filter bar above grid */}
          <div className="min-[900px]:hidden mb-5 flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[0.75rem] font-black tracking-[0.05em] uppercase transition-all"
              style={{ background: "#0A2E5C", color: "white" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
                <line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              Filter
            </button>

            {/* Active tag pill */}
            {activeTag !== "All" && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-[0.72rem] font-bold" style={{ background: "rgba(0,166,81,0.1)", color: "#00A651", border: "1px solid rgba(0,166,81,0.2)" }}>
                {activeTag}
                <button onClick={() => setActiveTag("All")} className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#00A651" strokeWidth="2" strokeLinecap="round">
                    <line x1="1" y1="1" x2="9" y2="9"/><line x1="9" y1="1" x2="1" y2="9"/>
                  </svg>
                </button>
              </div>
            )}

            <span className="ml-auto text-[0.72rem] text-gray-400 font-medium">
              {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex gap-8">

            {/* ── Desktop sidebar ── */}
            <aside className="hidden min-[900px]:block shrink-0 w-[220px]">
              <div className="sticky top-[84px]">
                {/* Sidebar card */}
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(10,46,92,0.08)", background: "rgba(255,255,255,0.98)", boxShadow: "0 4px 24px rgba(10,46,92,0.06)" }}>
                  {/* Header */}
                  <div className="px-4 py-4 border-b" style={{ borderColor: "rgba(10,46,92,0.08)", background: "rgba(10,46,92,0.02)" }}>
                    <p className="text-[0.62rem] font-black tracking-[0.14em] uppercase text-gray-400">Browse By</p>
                    <p className="text-[0.9rem] font-black text-blue-900 mt-0.5">Service Type</p>
                  </div>

                  {/* Filter items */}
                  <div className="p-2">
                    {ALL_TAGS.map((tag) => (
                      <FilterItem
                        key={tag}
                        tag={tag}
                        active={activeTag === tag}
                        onClick={() => setActiveTag(tag)}
                      />
                    ))}
                  </div>

                  {/* CTA at bottom of sidebar */}
                  <div className="mx-3 mb-3 p-4 rounded-xl" style={{ background: "linear-gradient(135deg, #0A2E5C, #1a4a8a)" }}>
                    <p className="text-white text-[0.72rem] font-black leading-tight mb-3">Ready for a<br />transformation?</p>
                    <Link
                      href="/contact"
                      className="block text-center text-[0.65rem] font-black tracking-[0.06em] uppercase py-2.5 rounded-lg transition-all hover:scale-105"
                      style={{ background: "#00A651", color: "white" }}
                    >
                      Free Estimate
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Grid area ── */}
            <div className="flex-1 min-w-0">
              {/* Results count — desktop */}
              <div className="hidden min-[900px]:flex items-center justify-between mb-5">
                <p className="text-[0.78rem] text-gray-400">
                  Showing <span className="font-bold text-blue-900">{filtered.length}</span> photo{filtered.length !== 1 ? "s" : ""}
                  {activeTag !== "All" && <> in <span className="font-bold text-green-600">{activeTag}</span></>}
                </p>
                {activeTag !== "All" && (
                  <button
                    onClick={() => setActiveTag("All")}
                    className="text-[0.68rem] font-bold tracking-[0.06em] uppercase px-3 py-1.5 rounded-full transition-colors"
                    style={{ background: "rgba(10,46,92,0.06)", color: "#0A2E5C" }}
                  >
                    Clear filter ×
                  </button>
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTag}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
                >
                  {filtered.map((item, idx) => (
                    <PhotoCard key={item.id} item={item} onClick={() => openLightbox(idx)} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="text-center py-20 text-gray-400 text-[0.9rem]">No photos in this category yet.</div>
              )}
            </div>
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <section className="py-16 px-[clamp(20px,4vw,80px)] max-w-[1920px] mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden text-white text-center py-20 px-8"
            style={{ background: "linear-gradient(135deg, #040f1e 0%, #0A2E5C 50%, #071828 100%)" }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,166,81,0.18) 0%, transparent 70%)" }} />
              <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 500, height: 300, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(43,125,233,0.14) 0%, transparent 70%)" }} />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 text-[0.62rem] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-6"
                style={{ background: "rgba(0,166,81,0.15)", border: "1px solid rgba(0,166,81,0.35)", color: "#4ade80" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Your Property Could Be Next
              </span>
              <h2 className="font-[family-name:var(--font-display)] uppercase leading-[0.95] tracking-[0.02em] mb-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}>
                Ready for a<br /><span style={{ color: "#00A651" }}>Stand Out Transformation?</span>
              </h2>
              <p className="text-white/70 text-[0.9rem] leading-relaxed mb-10 max-w-lg mx-auto">
                Join hundreds of Lake Norman homeowners who&apos;ve seen the difference. Free estimates, guaranteed results, zero pressure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 font-extrabold tracking-[0.06em] uppercase text-blue-900 bg-white hover:bg-white/90 px-8 py-4 rounded-full transition-all hover:scale-105 text-[0.78rem]">
                  Get Free Estimate
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 6h8M6 2l4 4-4 4"/></svg>
                </Link>
                <a href={PHONE_HREF}
                  className="inline-flex items-center gap-2 font-extrabold tracking-[0.06em] uppercase text-white px-8 py-4 rounded-full transition-all hover:scale-105 text-[0.78rem]"
                  style={{ border: "2px solid rgba(255,255,255,0.3)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  {PHONE}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Mobile filter drawer ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[300] bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer sliding up from bottom */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[301] bg-white rounded-t-3xl overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 40 }}
              style={{ maxHeight: "80vh" }}
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-gray-200" />
              </div>

              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "rgba(10,46,92,0.08)" }}>
                <div>
                  <p className="text-[0.62rem] font-black tracking-[0.14em] uppercase text-gray-400">Browse By</p>
                  <p className="text-[1rem] font-black text-blue-900">Service Type</p>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(10,46,92,0.06)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#0A2E5C" strokeWidth="2" strokeLinecap="round">
                    <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
                  </svg>
                </button>
              </div>

              {/* Filter list */}
              <div className="overflow-y-auto p-3" style={{ maxHeight: "calc(80vh - 120px)" }}>
                {ALL_TAGS.map((tag) => (
                  <FilterItem
                    key={tag}
                    tag={tag}
                    active={activeTag === tag}
                    onClick={() => handleTagSelect(tag)}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            item={filtered[lightboxIdx]}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-[90] min-[1200px]:hidden">
        <div className="flex">
          <Link href="/contact" className="flex-1 flex items-center justify-center gap-2 py-4 text-[0.72rem] font-extrabold tracking-[0.08em] uppercase text-white" style={{ background: "#00A651" }}>
            Free Estimate
          </Link>
          <a href={PHONE_HREF} className="flex-1 flex items-center justify-center gap-2 py-4 text-[0.72rem] font-extrabold tracking-[0.08em] uppercase text-white" style={{ background: "#0A2E5C" }}>
            Call Now
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
