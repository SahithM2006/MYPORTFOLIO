import React from 'react';

/**
 * Site Footer with Continuous Animated Technical Motif
 * Ensures the bottom of the page stays alive with an active telemetry heartbeat,
 * dynamic waveform signal line, and coordinate telemetry.
 */
export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" id="site-footer" aria-label="Site Footer">
      {/* Continuous Animated Technical Heartbeat Signal Waveform */}
      <div className="footer-telemetry-motif" aria-hidden="true">
        <div className="footer-signal-stream">
          <div className="signal-badge">
            <span className="signal-dot-pulse" />
            <span className="signal-text">SYSTEM TELEMETRY ONLINE</span>
            <span className="signal-meta">SEC-CHN // 13.08°N 80.27°E</span>
          </div>
          
          <div className="signal-waveform-wrap">
            <svg className="footer-waveform-svg" viewBox="0 0 600 32" preserveAspectRatio="none">
              <path
                d="M 0,16 L 120,16 L 135,4 L 145,28 L 155,8 L 165,22 L 175,16 L 360,16 L 375,6 L 385,26 L 395,10 L 405,20 L 415,16 L 600,16"
                fill="none"
                stroke="rgba(117, 150, 200, 0.25)"
                strokeWidth="1.5"
                className="waveform-path-base"
              />
              <path
                d="M 0,16 L 120,16 L 135,4 L 145,28 L 155,8 L 165,22 L 175,16 L 360,16 L 375,6 L 385,26 L 395,10 L 405,20 L 415,16 L 600,16"
                fill="none"
                stroke="#C6A45A"
                strokeWidth="2"
                strokeDasharray="24 160"
                className="waveform-path-pulse"
              />
            </svg>
          </div>

          <div className="signal-telemetry-stats">
            <span className="stat-item"><span className="stat-k">PING:</span> 12ms</span>
            <span className="stat-sep">•</span>
            <span className="stat-item"><span className="stat-k">STATUS:</span> OPERATIONAL</span>
          </div>
        </div>
      </div>

      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-text">SAHITH M. &mdash; PORTFOLIO</span>
            <p className="brand-sub">
              Department of Artificial Intelligence &amp; Data Science &bull; Saveetha Engineering College (Autonomous), Chennai
            </p>
          </div>
          <div className="footer-actions">
            <a
              href="#hero"
              className="btn-scroll-top"
              id="btn-scroll-top"
              aria-label="Back to top of page"
              onClick={scrollToTop}
            >
              <span className="btn-arrow-up" aria-hidden="true">&uarr;</span>
              <span>Back to Top</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom-row">
          <p className="footer-copy">
            &copy; 2026 Sahith M. Designed &amp; engineered as an experimental digital playground.
          </p>
        </div>
      </div>
    </footer>
  );
}
