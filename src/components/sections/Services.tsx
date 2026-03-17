"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { SERVICES } from "@/lib/constants";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  home: <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
  road: <><path d="M4 19L20 19" /><path d="M4 15L20 15" /><path d="M4 11L20 11" /><path d="M12 3L12 19" /></>,
  roof: <><path d="M3 9l9-7 9 7" /><path d="M9 22V12h6v10" /></>,
  gutter: <><path d="M4 4h16v4H4z" /><path d="M6 8v12" /><path d="M18 8v12" /></>,
  fence: <><path d="M4 6v14" /><path d="M12 6v14" /><path d="M20 6v14" /><path d="M2 10h20" /><path d="M2 16h20" /></>,
  paver: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
  building: <><path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18" /><path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2" /><path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></>,
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section ref={ref} id="services" className="relative py-24 md:py-32 bg-canvas">
      {/* Subtle decorative element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />

      <div className="relative max-w-[1200px] mx-auto px-[clamp(20px,4vw,48px)]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-4"
          >
            <span className="section-eyebrow text-blue-500">What We Do</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="section-title mb-4"
          >
            Our Services
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-16 h-[2px] bg-blue-700 mx-auto mb-6"
            style={{ transformOrigin: "left" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="body-text max-w-[520px] mx-auto"
          >
            From gentle soft washes to heavy-duty pressure cleaning, we have the
            right solution for every surface on your property.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: EASE }}
            >
              <Link href={`/services#${service.slug}`} className="group block">
                <div className="card-frost p-0 overflow-hidden h-full hover:-translate-y-2 transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                    {/* Icon badge */}
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A2E5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {SERVICE_ICONS[service.icon]}
                      </svg>
                    </div>
                    {/* Label */}
                    <div className="absolute top-4 right-4">
                      <span className="text-[0.6rem] font-bold tracking-[0.1em] uppercase text-white/90 bg-blue-900/60 backdrop-blur-sm px-3 py-1 rounded-full">
                        {service.label}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.2rem,2vw,1.4rem)] uppercase text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[0.82rem] text-gray-600 leading-relaxed line-clamp-2 mb-4">
                      {service.description}
                    </p>
                    <span className="text-[0.72rem] font-bold text-orange-500 tracking-wide uppercase group-hover:text-orange-600 transition-colors">
                      Learn More &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
