import React from 'react';

/**
 * Coordinated Multi-Layer Ambient Background
 * Provides continuous scroll-responsive parallax depth across the entire portfolio.
 * 
 * Layer 1 (Deepest, Parallax Rate ~0.06): Technical coordinate grid with intersection crosses.
 * Layer 2 (Mid-Depth, Parallax Rate ~0.15): Subtle drifting technical glyphs and telemetry runes.
 * Layer 3 (Atmosphere): Dynamically transitioning ambient luminous auras that shift with scroll progress.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient-background-system" aria-hidden="true">
      {/* Dynamic Multi-Section Atmosphere Gradient (Transitions smoothly as user scrolls) */}
      <div className="ambient-atmosphere-layer" id="ambient-atmosphere-layer" />

      {/* Layer 1: Deep Parallax Coordinate Grid */}
      <div className="ambient-parallax-layer layer-deep" id="bg-layer-deep">
        <svg className="ambient-grid-svg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ambient-coord-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(74, 134, 153, 0.05)" strokeWidth="1" />
              <circle cx="80" cy="0" r="1.5" fill="rgba(45, 212, 191, 0.12)" />
              <circle cx="0" cy="80" r="1.5" fill="rgba(45, 212, 191, 0.12)" />
              {/* Subtle crosshair at (40, 40) */}
              <line x1="38" y1="40" x2="42" y2="40" stroke="rgba(94, 153, 179, 0.10)" strokeWidth="1" />
              <line x1="40" y1="38" x2="40" y2="42" stroke="rgba(94, 153, 179, 0.10)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ambient-coord-grid)" />
        </svg>
      </div>

      {/* Layer 2: Mid-Depth Technical Glyphs & Drifting Markers */}
      <div className="ambient-parallax-layer layer-mid" id="bg-layer-mid">
        <div className="ambient-glyph glyph-1" style={{ top: '15%', left: '8%' }}>
          <span className="glyph-cross">+</span>
          <span className="glyph-text">SEC_DAG // 13.08°N</span>
        </div>
        <div className="ambient-glyph glyph-2" style={{ top: '32%', right: '7%' }}>
          <span className="glyph-cross">⬡</span>
          <span className="glyph-text">GRAPH_NET // L3</span>
        </div>
        <div className="ambient-glyph glyph-3" style={{ top: '52%', left: '5%' }}>
          <span className="glyph-cross">◇</span>
          <span className="glyph-text">WINRM // 5986</span>
        </div>
        <div className="ambient-glyph glyph-4" style={{ top: '71%', right: '9%' }}>
          <span className="glyph-cross">◎</span>
          <span className="glyph-text">AEGIS_TWIN // OPT</span>
        </div>
        <div className="ambient-glyph glyph-5" style={{ top: '88%', left: '10%' }}>
          <span className="glyph-cross">+</span>
          <span className="glyph-text">TELEMETRY // STREAM</span>
        </div>
      </div>

      {/* Layer 3: Ambient Particle Beacon Stream */}
      <div className="ambient-parallax-layer layer-near" id="bg-layer-near">
        <div className="ambient-beacon beacon-1" style={{ top: '22%', left: '20%' }} />
        <div className="ambient-beacon beacon-2" style={{ top: '45%', right: '18%' }} />
        <div className="ambient-beacon beacon-3" style={{ top: '65%', left: '25%' }} />
        <div className="ambient-beacon beacon-4" style={{ top: '85%', right: '22%' }} />
      </div>
    </div>
  );
}
