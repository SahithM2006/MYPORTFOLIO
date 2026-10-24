import React from 'react';

export default function SectionBridge({ tag = "PHILOSOPHY • TRAJECTORY" }) {
  return (
    <div className="section-bridge" aria-hidden="true">
      <div className="bridge-track-line bridge-line-left" />
      <div className="bridge-waypoint-pill">
        <span className="bridge-waypoint-pulse" />
        <span className="bridge-tag">{tag}</span>
        <span className="bridge-waypoint-indicator">•</span>
      </div>
      <div className="bridge-track-line bridge-line-right" />
    </div>
  );
}
