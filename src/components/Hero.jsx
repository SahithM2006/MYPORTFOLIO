import React, { useState, useEffect } from 'react';

const DIRECTIVE_VERBS = ['ENGINEER', 'EXPLORE', 'ANALYZE', 'ARCHITECT', 'EVOLVE'];

export default function Hero() {
  const [verbIdx, setVerbIdx] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      cycleVerb();
    }, 3600);
    return () => clearInterval(timer);
  }, [verbIdx]);

  const cycleVerb = () => {
    setIsFading(true);
    setTimeout(() => {
      setVerbIdx((prev) => (prev + 1) % DIRECTIVE_VERBS.length);
      setIsFading(false);
    }, 220);
  };

  return (
    <section className="hero-scene" id="hero" aria-label="Introduction to Sahith M.">
      {/* Background Atmosphere */}
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-ambient-glow-left" />
        <div className="hero-ambient-glow-right" />
        <div className="hero-grid-underlay" />
      </div>

      <div className="hero-container">
        {/* Top Kicker Pill */}
        <div className="hero-kicker-strip">
          <div className="hero-kicker-badge">
            <span className="hero-kicker-dot" />
            <span className="hero-kicker-theme">AN INDEPENDENT MIND, ALWAYS EVOLVING</span>
          </div>
          <span className="hero-kicker-academic">
            B.TECH IN AI &amp; DS &bull; SAVEETHA ENGINEERING COLLEGE
          </span>
        </div>

        {/* Main Hero Content Grid */}
        <div className="hero-split-grid">
          {/* Left Column: Personal & Professional Identity */}
          <div className="hero-intro-col">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-num">01 // ORIGIN</span>
              <span className="hero-eyebrow-sep">&bull;</span>
              <span className="hero-eyebrow-tag">APPLIED AI &bull; SYSTEMS TELEMETRY</span>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-greeting">Hello, I&apos;m</span>
              <span className="hero-title-name">Sahith M.</span>
            </h1>

            <div className="hero-directive-bar">
              <span className="hero-directive-label">DIRECTIVE:</span>
              <button
                type="button"
                className={`hero-verb-pill ${isFading ? 'fading' : ''}`}
                onClick={cycleVerb}
                title="Click to advance directive"
              >
                <span className="verb-text">{DIRECTIVE_VERBS[verbIdx]}</span>
                <span className="verb-icon">↺</span>
              </button>
              <span className="hero-directive-caption">
                Turning computational theory into resilient systems.
              </span>
            </div>

            <p className="hero-statement">
              Undergraduate in Artificial Intelligence &amp; Data Science at Saveetha Engineering
              College (Autonomous), Chennai. I engineer software systems from memory primitives
              up &mdash; bridging applied machine learning, agentless Windows telemetry, and temporal
              graph intelligence to solve real operational problems.
            </p>

            {/* Discipline Badges */}
            <div className="hero-disciplines-row" aria-label="Core disciplines">
              <span className="hero-discipline-tag">
                <span className="tag-dot gold" />
                <span>Agentless WinRM Telemetry</span>
              </span>
              <span className="hero-discipline-tag">
                <span className="tag-dot steel" />
                <span>Applied Machine Learning</span>
              </span>
              <span className="hero-discipline-tag">
                <span className="tag-dot gold" />
                <span>Temporal Graph Analytics</span>
              </span>
              <span className="hero-discipline-tag">
                <span className="tag-dot steel" />
                <span>FastAPI Microservices</span>
              </span>
            </div>

            {/* Action Group */}
            <div className="hero-cta-group">
              <a href="#about" className="btn-hero-primary" id="hero-cta-journey">
                <span>Explore Journey</span>
                <span className="btn-arrow" aria-hidden="true">↓</span>
              </a>
              <a href="#projects" className="btn-hero-secondary" id="hero-cta-projects">
                <span>View Systems &amp; Projects</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#resume" className="btn-hero-ghost" id="hero-cta-resume">
                <span>Curriculum Vitae</span>
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>
            </div>

            {/* Real-time Status Capsule */}
            <div className="hero-status-strip">
              <div className="hero-status-indicator">
                <span className="status-beacon-pulse" />
                <span className="status-text">
                  3rd Year Undergraduate (2024–2028) &bull; Open for Summer/Fall Technical Internships
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Portrait Composition with Technical Depth */}
          <div className="hero-portrait-col">
            <div className="hero-portrait-card">
              <div className="portrait-frame-halo" aria-hidden="true" />
              <div className="portrait-inner-frame">
                <img
                  src="/user_photo.jpg"
                  alt="Sahith M. — AI & Data Science Undergraduate"
                  className="hero-portrait-image"
                  loading="eager"
                  decoding="async"
                  width="440"
                  height="560"
                />
                <div className="portrait-vignette-overlay" aria-hidden="true" />
                <div className="portrait-corner-bracket top-left" aria-hidden="true" />
                <div className="portrait-corner-bracket top-right" aria-hidden="true" />
                <div className="portrait-corner-bracket bottom-left" aria-hidden="true" />
                <div className="portrait-corner-bracket bottom-right" aria-hidden="true" />
              </div>

              {/* Technical Caption Box (Below Portrait, Never Covering Face) */}
              <div className="portrait-caption-box">
                <div className="portrait-caption-header">
                  <span className="caption-badge">AUTONOMOUS RESEARCHER</span>
                  <span className="caption-coords">13.08°N &bull; 80.27°E</span>
                </div>
                <div className="portrait-caption-body">
                  <strong className="caption-name">Sahith M.</strong>
                  <span className="caption-desc">
                    AI &amp; Data Science &bull; Saveetha Engineering College (Autonomous)
                  </span>
                </div>
                <div className="portrait-caption-footer">
                  <span className="footer-status-pill">CGPA: 7.5 / 10</span>
                  <span className="footer-status-pill">Chennai, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Cue at Bottom */}
        <div className="hero-bottom-cue">
          <a href="#about" className="hero-scroll-cue-link" aria-label="Scroll to explore the story">
            <span className="scroll-track">
              <span className="scroll-thumb" />
            </span>
            <span className="scroll-cue-text">SCROLL TO EXPLORE THE JOURNEY</span>
          </a>
        </div>
      </div>
    </section>
  );
}
