import { writeFileSync, mkdirSync } from "fs";

const DATA_ID = "0x440d9c5cfaf7d2dd:0x2de08443031a2dbd";
const API_KEY = "81054915d0108d7978f2e95639989d79829f1396780df05c11b87beac330780b";

async function fetchAll() {
  const reviews = [];
  let nextPageToken = null;
  let page = 1;
  do {
    const params = new URLSearchParams({
      engine: "google_maps_reviews",
      data_id: DATA_ID,
      sort_by: "ratingHigh",
      api_key: API_KEY,
    });
    if (nextPageToken) params.set("next_page_token", nextPageToken);
    const res = await fetch("https://serpapi.com/search.json?" + params);
    const data = await res.json();
    if (data.error) { console.error("SerpAPI error:", data.error); break; }
    const batch = data.reviews || [];
    reviews.push(...batch);
    console.log(`Page ${page} — got ${batch.length} (total: ${reviews.length})`);
    nextPageToken = data.serpapi_pagination?.next_page_token || null;
    page++;
    if (nextPageToken) await new Promise(r => setTimeout(r, 400));
  } while (nextPageToken);
  return reviews;
}

const raw = await fetchAll();

const normalized = raw.map(r => ({
  name: r.user?.name || "Anonymous",
  avatar: r.user?.thumbnail || null,
  isLocalGuide: r.user?.local_guide || false,
  reviewCount: r.user?.reviews || null,
  rating: r.rating || 5,
  text: r.snippet || "",
  ago: r.date || "",
  isoDate: r.iso_date || null,
  photos: (r.images || []).map(url => ({
    src: url.replace(/=w\d+-h\d+.*$/, "=w800-h600-k-no"),
    caption: "Customer photo",
  })),
  source: "google",
}));

normalized.sort((a, b) => {
  if (b.rating !== a.rating) return b.rating - a.rating;
  if (a.isoDate && b.isoDate) return new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime();
  return 0;
});

mkdirSync("src/data", { recursive: true });
writeFileSync(
  "src/data/google-reviews.json",
  JSON.stringify({ fetchedAt: new Date().toISOString(), total: normalized.length, reviews: normalized }, null, 2),
  "utf-8"
);

console.log(`\n✅ Saved ${normalized.length} reviews → src/data/google-reviews.json`);
console.log(`   Reviews with photos: ${normalized.filter(r => r.photos.length > 0).length}`);
console.log("\nTop reviews:");
normalized.slice(0, 5).forEach(r => console.log(` - ${r.name} | ${r.rating}★ | ${r.text.slice(0, 70)}...`));
