export const offlineHazardDatabase = [
  {
    name: "Poison Ivy",
    keywords: ["ivy", "three leaves", "cluster", "itch"],
    warning: "HIGHLY TOXIC: Urushiol oil causes severe skin rashes. Do not touch!",
    action: "Wash exposed skin immediately with soap and cold water."
  },
  {
    name: "Poison Oak",
    keywords: ["oak-like", "lobed leaves", "shrub"],
    warning: "TOXIC: Contains contact irritants similar to poison ivy.",
    action: "Avoid contact; rinse skin thoroughly if exposed."
  },
  {
    name: "Amanita Mushroom (Death Cap)",
    keywords: ["white mushroom", "cap", "gills", "fungus"],
    warning: "FATAL IF INGESTED: Extremely dangerous toxic mushroom.",
    action: "Do not forage or consume wild fungi."
  }
];

export function checkOfflineHazards(aiDescription) {
  const lowerDesc = aiDescription.toLowerCase();
  const matched = offlineHazardDatabase.find(item => 
    item.keywords.some(kw => lowerDesc.includes(kw))
  );
  return matched || null;
}