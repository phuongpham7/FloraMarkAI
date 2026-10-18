// src/components/GearRecommendationCard.jsx
import React from "react";
import { getRecommendedGear } from "../lib/affiliateDatabase";

export default function GearRecommendationCard({ hazardName }) {
  const gear = getRecommendedGear(hazardName);

  if (!gear) return null;

  return (
    <div className="affiliate-card">
      <div className="affiliate-header">
        <span>🎒 Recommended Trail Gear</span>
        <span className="sponsored-tag">Partner Link</span>
      </div>
      <div className="affiliate-content">
        <div className="affiliate-info">
          <strong>{gear.item}</strong>
          <p>{gear.description}</p>
        </div>
        <a
          href={gear.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="affiliate-btn"
        >
          Check Price on Amazon ↗
        </a>
      </div>
    </div>
  );
}
