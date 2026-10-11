import React from 'react';

export default function SectionBridge({ tag = "PHILOSOPHY &bull; TRAJECTORY" }) {
  return (
    <div className="section-bridge" aria-hidden="true">
      <span className="bridge-line"></span>
      <span className="bridge-tag" dangerouslySetInnerHTML={{ __html: tag }}></span>
      <span className="bridge-line"></span>
    </div>
  );
}
