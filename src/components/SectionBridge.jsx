import React from 'react';

export default function SectionBridge({ tag = "PHILOSOPHY &bull; TRAJECTORY" }) {
  return (
    <div className="section-bridge" aria-hidden="true">
      <div className="bridge-track-line bridge-line-left" />
      <div className="bridge-waypoint-pill">
        <span className="bridge-waypoint-pulse" />
        <span className="bridge-tag" dangerouslySetInnerHTML={{ __html: tag }} />
        <span className="bridge-waypoint-indicator">&bull;</span>
      </div>
      <div className="bridge-track-line bridge-line-right" />
    </div>
  );
}
