import React from 'react';

/**
 * Coordinated Multi-Layer Ambient Background
 * Provides subtle scroll-responsive parallax depth across the entire portfolio.
 * 
 * Layer 1: Deep coordinate grid with intersection marks in muted steel/gold.
 * Layer 2: Mid-depth technical telemetry glyphs.
 * Layer 3: Ambient atmospheric glow.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient-background-system" aria-hidden="true">
      {/* Dynamic Atmosphere Gradient Layer */}
      <div className="ambient-atmosphere-layer" id="ambient-atmosphere-layer" />

      {/* Layer 1: Deep Parallax Coordinate Grid */}
      <div className="ambient-parallax-layer layer-deep" id="bg-layer-deep">
        <svg className="ambient-grid-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ambient-coord-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(52, 59, 73, 0.2)" strokeWidth="1" />
              <circle cx="80" cy="0" r="1.5" fill="rgba(198, 164, 90, 0.22)" />
              <circle cx="0" cy="80" r="1.5" fill="rgba(198, 164, 90, 0.22)" />
              <line x1="38" y1="40" x2="42" y2="40" stroke="rgba(117, 150, 200, 0.2)" strokeWidth="1" />
              <line x1="40" y1="38" x2="40" y2="42" stroke="rgba(117, 150, 200, 0.2)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ambient-coord-grid)" />
        </svg>
      </div>

      {/* Layer 2: Mid-Depth Technical Glyphs */}
      <div className="ambient-parallax-layer layer-mid" id="bg-layer-mid">
        <div className="ambient-glyph glyph-1" style={{ top: '14%', left: '6%' }}>
          <span className="glyph-cross">+</span>
          <span className="glyph-text">SEC_AUTONOMOUS // 13.08&deg;N</span>
        </div>
        <div className="ambient-glyph glyph-2" style={{ top: '34%', right: '6%' }}>
          <span className="glyph-cross">&#x2B21;</span>
          <span className="glyph-text">TEMPORAL_GRAPH // L3</span>
        </div>
        <div className="ambient-glyph glyph-3" style={{ top: '54%', left: '4%' }}>
          <span className="glyph-cross">&#x25C7;</span>
          <span className="glyph-text">WINRM_TLS // 5986</span>
        </div>
        <div className="ambient-glyph glyph-4" style={{ top: '74%', right: '8%' }}>
          <span className="glyph-cross">&#x25CE;</span>
          <span className="glyph-text">AEGIS_TWIN // MIN_CUT</span>
        </div>
        <div className="ambient-glyph glyph-5" style={{ top: '90%', left: '8%' }}>
          <span className="glyph-cross">+</span>
          <span className="glyph-text">SYS_TELEMETRY // VERIFIED</span>
        </div>
      </div>

      {/* Layer 3: Ambient Particle Beacon Stream */}
      <div className="ambient-parallax-layer layer-near" id="bg-layer-near">
        <div className="ambient-beacon beacon-1" style={{ top: '20%', left: '18%' }} />
        <div className="ambient-beacon beacon-2" style={{ top: '42%', right: '16%' }} />
        <div className="ambient-beacon beacon-3" style={{ top: '64%', left: '22%' }} />
        <div className="ambient-beacon beacon-4" style={{ top: '84%', right: '20%' }} />
      </div>
    </div>
  );
}
