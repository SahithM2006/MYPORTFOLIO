import React from 'react';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-text">SAHITH M. &mdash; PORTFOLIO</span>
            <p className="brand-sub">Department of Artificial Intelligence &amp; Data Science &bull; Saveetha Engineering College (Autonomous), Chennai</p>
          </div>
          <div className="footer-actions">
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
