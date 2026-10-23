import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KINETIC_WORDS = ['ENGINEER', 'PROTECT', 'ANALYZE', 'DISCOVER', 'ORCHESTRATE'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [isWordTransitioning, setIsWordTransitioning] = useState(false);
  const heroRef = useRef(null);
  const typographyRef = useRef(null);
  const subjectRef = useRef(null);
  const cornersRef = useRef(null);

  // Kinetic Word auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      cycleWord();
    }, 3800);
    return () => clearInterval(interval);
  }, [wordIdx]);

  const cycleWord = () => {
    if (document.hidden) return;
    setIsWordTransitioning(true);
    setTimeout(() => {
      setWordIdx((prev) => (prev + 1) % KINETIC_WORDS.length);
      setIsWordTransitioning(false);
    }, 200);
  };

  // Cinematic scroll-driven scene transition (Inspired by Reference Video Image 1 -> 2)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !heroRef.current || !typographyRef.current) return;

    const ctx = gsap.context(() => {
      const topRow = typographyRef.current.querySelector('.monumental-row-top');
      const bottomRow = typographyRef.current.querySelector('.monumental-row-bottom');
      const subject = subjectRef.current;
      const corners = cornersRef.current?.children;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      });

      // Typography expands slightly and fades with cinematic depth
      if (topRow) {
        tl.to(topRow, { y: -60, opacity: 0.1, scale: 1.04, ease: 'power1.inOut' }, 0);
      }
      if (bottomRow) {
        tl.to(bottomRow, { y: -40, opacity: 0.12, scale: 1.02, ease: 'power1.inOut' }, 0.05);
      }

      // Central subject portrait softly sinks and dissolves into the gate
      if (subject) {
        tl.to(subject, { y: 60, scale: 0.94, opacity: 0.2, ease: 'power1.inOut' }, 0);
      }

      // Corner editorial metadata fades quickly to clear stage
      if (corners && corners.length) {
        tl.to(corners, { y: -20, opacity: 0, ease: 'power1.out', stagger: 0.04 }, 0);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-monumental-scene" id="hero" ref={heroRef} aria-label="Introduction">
      {/* Background Volumetric Ambient Lighting */}
      <div className="hero-atmospheric-backdrop" aria-hidden="true">
        <div className="hero-radial-beam-center" />
        <div className="hero-noise-overlay" />
        <div className="section-bg-watermark watermark-hero">01 // ORIGIN</div>
      </div>

      {/* Screen-Spanning Oversized Monumental Typography (Image 1 Reference) */}
      <div className="hero-monumental-typography" ref={typographyRef}>
        <div className="monumental-row monumental-row-top">
          <div className="monumental-kicker-badge">
            <span className="badge-pulse-dot" />
            <span>AI &amp; DS UNDERGRADUATE &bull; EST 2024</span>
          </div>
          <h1 className="monumental-title-top">
            EXPLORE MY
          </h1>
        </div>

        <div className="monumental-row monumental-row-bottom">
          <div className="monumental-title-bottom">
            PORTFOLIO
            <span className="monumental-period">.</span>
          </div>

          <div className="hero-kinetic-pill">
            <span className="kinetic-pill-label">DIRECTIVE:</span>
            <button
              type="button"
              className={`kinetic-pill-btn ${isWordTransitioning ? 'transitioning' : ''}`}
              onClick={cycleWord}
              title="Click to cycle verbs"
            >
              {KINETIC_WORDS[wordIdx]}
            </button>
          </div>
        </div>
      </div>

      {/* Center Subject Portrait Emerging from Bottom (Image 1 Reference) */}
      <div className="hero-subject-silhouette" ref={subjectRef} aria-hidden="true">
        <div className="hero-subject-halo" />
        <div className="hero-subject-rim-light" />
        <div className="hero-subject-mask">
          <img
            src="./user_photo.jpg"
            alt="Sahith M. Portrait Silhouette"
            className="hero-subject-img"
            loading="eager"
            decoding="async"
            width="520"
            height="680"
          />
        </div>
      </div>

      {/* Editorial Corner Anchors (Image 1 Reference) */}
      <div className="hero-editorial-corners" ref={cornersRef}>
        {/* Bottom Left Corner: Circular Badge & Credentials */}
        <div className="hero-corner hero-corner-left">
          <div className="corner-badge-rotating" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="corner-rotate-svg">
              <path
                id="heroCirclePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text fontSize="8.2" letterSpacing="2.5" fill="#C6A45A">
                <textPath href="#heroCirclePath">SAHITH M • AI &amp; DS • 2024–2028 •</textPath>
              </text>
            </svg>
            <span className="corner-center-arrow">&darr;</span>
          </div>
          <div className="corner-info-text">
            <span className="corner-title">B.TECH IN AI &amp; DS (3RD YEAR)</span>
            <span className="corner-sub">Saveetha Engineering College (Autonomous), Chennai</span>
          </div>
        </div>

        {/* Bottom Right Corner: Discipline Lead & Direct CTA */}
        <div className="hero-corner hero-corner-right">
          <p className="corner-lead-statement">
            Engineering practical software systems, intelligent applications, and security-oriented solutions that bridge analytical models with real-world infrastructure.
          </p>
          <div className="corner-chips-row" aria-label="Core disciplines">
            <span className="corner-chip">AI &amp; DS</span>
            <span className="corner-chip-sep">&bull;</span>
            <span className="corner-chip">SYSTEMS TELEMETRY</span>
            <span className="corner-chip-sep">&bull;</span>
            <span className="corner-chip">GRAPH ANALYTICS</span>
          </div>
          <div className="corner-actions-group">
            <a href="#projects" className="btn-hero-primary" id="hero-btn-work">
              <span>Explore Exhibits</span>
              <span className="btn-arrow" aria-hidden="true">&rarr;</span>
            </a>
            <a href="#contact" className="btn-hero-ghost" id="hero-btn-contact">
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </div>

      {/* Minimalist Bottom Scroll Indicator */}
      <a href="#about-gate" className="hero-scroll-indicator" id="hero-scroll-cue" aria-label="Scroll to explore portfolio">
        <span className="scroll-pill-track">
          <span className="scroll-pill-thumb" />
        </span>
        <span className="scroll-cue-label">SCROLL TO EXPLORE</span>
      </a>
    </section>
  );
}

