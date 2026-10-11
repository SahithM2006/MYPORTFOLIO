import React, { useState } from 'react';

export default function Footer() {
  const [beaconText, setBeaconText] = useState('✦ Client Telemetry OK • 60 FPS Canvas');
  const [isPulsing, setIsPulsing] = useState(false);

  const handleBeaconClick = () => {
    setIsPulsing(true);
    setBeaconText('✦ Telemetry OK • 60 FPS • 0 Tracking Cookies • Clean React Build');
    setTimeout(() => {
      setIsPulsing(false);
    }, 4000);
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-text">SAHITH M. &mdash; DIGITAL PLAYGROUND</span>
            <p className="brand-sub">Department of Artificial Intelligence &amp; Data Science &bull; Saveetha Engineering College (Autonomous), Chennai</p>
          </div>
          <div className="footer-actions">
            {/* Footer Discovery Beacon */}
            <button
              className={`footer-status-beacon ${isPulsing ? 'beacon-pulsing' : ''}`}
              id="footer-status-beacon"
              title="Click for live client telemetry status"
              type="button"
              onClick={handleBeaconClick}
            >
              <span className="beacon-dot"></span>
              <span id="beacon-msg">{beaconText}</span>
            </button>
            <a href="#hero" className="btn-scroll-top" id="btn-scroll-top" aria-label="Back to top of page" onClick={scrollToTop}>
              <span>Back to Top &uarr;</span>
            </a>
          </div>
        </div>
        <div className="footer-bottom-row">
          <p className="footer-copy">&copy; 2026 Sahith M. Designed &amp; engineered as an experimental digital playground.</p>
        </div>
      </div>
    </footer>
  );
}
