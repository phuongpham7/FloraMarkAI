// src/lib/affiliateDatabase.js

export const affiliateGearDatabase = {
  "Poison Ivy": {
    item: "Tecnu Extreme Poison Ivy Scrub",
    description: "Removes plant oils (urushiol) from skin to prevent rashes.",
    asinOrSku: "B001OBZFY2", // Example Amazon ASIN or product ID
    imageUrl: "https://m.media-amazon.com/images/I/71..._AC_SL1500_.jpg",
    affiliateUrl: "https://www.amazon.s/dp/B001OBZFY2?tag=YOUR_TRACKING_ID"
  },
  "Poison Oak": {
    item: "IvyCrest Poison Oak Relief Spray",
    description: "Instant itch relief spray for trail exposure.",
    asinOrSku: "B00...example",
    imageUrl: "https://m.media-amazon.com/images/I/...",
    affiliateUrl: "https://www.amazon.com/dp/B00...&tag=YOUR_TRACKING_ID"
  },
  "General Hiking": {
    item: "Sawyer Products Insect Repellent & Permethrin",
    description: "Essential spray to protect against ticks and biting insects on the trail.",
    asinOrSku: "B001ANQVYU",
    imageUrl: "https://m.media-amazon.com/images/I/...",
    affiliateUrl: "https://www.amazon.com/dp/B001ANQVYU?tag=YOUR_TRACKING_ID"
  }
};

export function getRecommendedGear(hazardName) {
  // Return specific gear if matched, otherwise return a default essential gear item
  return affiliateGearDatabase[hazardName] || affiliateGearDatabase["General Hiking"];
}