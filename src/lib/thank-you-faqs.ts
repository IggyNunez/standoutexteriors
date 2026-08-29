import type { FAQ } from "@/types";

/**
 * FAQs for the /thank-you page.
 *
 * Deliberately NOT the homepage FAQ list. Someone who just submitted a quote
 * request has different questions than someone still deciding: what happens
 * next, do I need to be home, how soon can you come out. Answering those on
 * the confirmation page is what prevents the "did that even go through?"
 * phone call.
 *
 * This lives in lib/ rather than inside ThankYouContent.tsx because that file
 * is a client component. Importing a value out of a "use client" module into
 * a server component yields a client reference proxy, not the array, so the
 * page's FAQPage JSON-LD could not be generated at build time.
 */
export const POST_SUBMIT_FAQS: FAQ[] = [
  {
    question: "How soon will I hear back?",
    answer:
      "Ridge personally reviews every request, usually within a few hours during business hours and first thing the next morning if you submitted overnight. You'll get a call or text at the number you gave us, plus a written estimate by email.",
  },
  {
    question: "Do I need to be home for the estimate?",
    answer:
      "Almost never. For most house washing, driveway, and roof jobs we can quote from the address, satellite imagery, and the details you gave us. If your property has something unusual going on, we'll ask for a couple of photos or set up a quick walkthrough.",
  },
  {
    question: "Is the estimate really free, and am I committed to anything?",
    answer:
      "Completely free, and there's no obligation. No contracts, no deposit to get a number, no pressure. If the price isn't right for you, that's the end of it and we part on good terms.",
  },
  {
    question: "How do you price the work?",
    answer:
      "By the actual surface, not a flat guess. Square footage, surface material, how much organic growth has built up, and access all factor in. Bundling services, for example a house wash plus the driveway on the same visit, is where most customers save the most.",
  },
  {
    question: "Do I need to move anything or prep the property?",
    answer:
      "We handle the prep. On the day of service we just ask that vehicles be moved off the driveway, patio furniture and grills be pulled clear if you can, and windows be closed. We cover and rinse landscaping ourselves before and after every soft wash.",
  },
  {
    question: "What if it rains on my scheduled day?",
    answer:
      "We watch the forecast and will call you ahead of time to reschedule. Light rain is usually fine and doesn't affect results, but we won't run equipment in a storm, and we never charge for a weather delay.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. Stand Out Exterior Cleaning LLC is fully licensed and carries general liability insurance. We're happy to send a certificate of insurance before we start, and HOAs and commercial property managers get it automatically.",
  },
];
