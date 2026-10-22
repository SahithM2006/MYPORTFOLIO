import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCharacterRenderer } from '../character-renderer.js';

gsap.registerPlugin(ScrollTrigger);

const KINETIC_WORDS = ['ENGINEER', 'PROTECT', 'ANALYZE', 'DISCOVER', 'ORCHESTRATE'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [isWordTransitioning, setIsWordTransitioning] = useState(false);
  const headlineRef = useRef(null);
  const heroContainerRef = useRef(null);

  // Initialize original 360 degree character renderer (RULE 1: COMPLETELY OFF-LIMITS)
  useEffect(() => {
    const cleanup = initCharacterRenderer();
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  // Kinetic Word auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      cycleWord();
    }, 4200);
    return () => clearInterval(interval);
  }, [wordIdx]);

  const cycleWord = () => {
    if (document.hidden) return;
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      const rect = heroEl.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > (window.innerHeight || 800)) return;
    }
    setIsWordTransitioning(true);
    setTimeout(() => {
      setWordIdx((prev) => (prev + 1) % KINETIC_WORDS.length);
      setIsWordTransitioning(false);
    }, 200);
  };

  // Controlled clipping & masking transition as visitor leaves opening scene
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !headlineRef.current || !heroContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Scrubbed parallax & environmental movement around character
      const headlineRows = headlineRef.current.querySelectorAll('.headline-row');
      const leadText = heroContainerRef.current.querySelector('.hero-lead');
      const metaText = heroContainerRef.current.querySelector('.hero-meta-summary');
      const ctaGroup = heroContainerRef.current.querySelector('.hero-cta-group');
      const scrollCue = heroContainerRef.current.querySelector('.hero-scroll-cue');
      const flowStem = heroContainerRef.current.querySelector('.flow-stem');
      const reticle = document.querySelector('.hero-ambient-reticle');
      const chips = document.querySelectorAll('.hero-telemetry-chip');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom 25%',
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      });

      tl.to(headlineRows, {
        clipPath: 'inset(0% 0% 85% 0%)',
        y: -30,
        opacity: 0.15,
        stagger: 0.08,
        ease: 'power1.inOut'
      }, 0);

      if (leadText) {
        tl.to(leadText, { y: -24, opacity: 0.05, ease: 'power1.inOut' }, 0.05);
      }

      if (ctaGroup) {
        tl.to(ctaGroup, { y: -18, opacity: 0.1, ease: 'power1.inOut' }, 0.08);
      }

      if (metaText) {
        tl.to(metaText, { opacity: 0, ease: 'power1.inOut' }, 0.1);
      }

      if (scrollCue) {
        tl.to(scrollCue, { y: -15, opacity: 0, ease: 'power1.out' }, 0.02);
      }

      if (flowStem) {
        tl.to(flowStem, { scaleY: 1, opacity: 1, ease: 'none' }, 0);
      }

      if (reticle) {
        tl.to(reticle, { rotation: 75, scale: 1.15, opacity: 0.2, ease: 'none' }, 0);
      }

      if (chips.length >= 3) {
        tl.to(chips[0], { y: -110, x: 25, opacity: 0.05, ease: 'none' }, 0);
        tl.to(chips[1], { y: -160, x: -30, opacity: 0.05, ease: 'none' }, 0);
        tl.to(chips[2], { y: -80, x: 15, opacity: 0.1, ease: 'none' }, 0);
      }

      const geo1 = document.getElementById('hero-geo-1');
      const geo2 = document.getElementById('hero-geo-2');
      if (geo1) {
        tl.to(geo1, { y: -170, x: -35, rotation: 45, opacity: 0.1, ease: 'none' }, 0);
      }
      if (geo2) {
        tl.to(geo2, { y: -110, x: 25, rotation: -40, opacity: 0.1, ease: 'none' }, 0);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" id="hero" aria-label="Introduction">
      {/* Original 360° Cursor-Tracking Character Canvas (PROTECTED BY RULE 1) */}
      <canvas id="character-canvas" className="character-canvas"></canvas>
      <div className="character-vignette" aria-hidden="true"></div>

      {/* Floating Technical Telemetry Objects that parallax at different rates */}
      <div className="hero-floating-telemetry" aria-hidden="true">
        <div className="hero-telemetry-chip chip-top-right">
          <span className="telemetry-dot dot-teal"></span>
          <span className="telemetry-label">SYS_TELEMETRY // WINRM 5986</span>
        </div>
        <div className="hero-telemetry-chip chip-mid-left">
          <span className="telemetry-dot dot-amber"></span>
          <span className="telemetry-label">CBDC_LINEAGE // 4-HOP DAG</span>
        </div>
        <div className="hero-telemetry-chip chip-bottom-right">
          <span className="telemetry-dot dot-jade"></span>
          <span className="telemetry-label">DIGITAL_TWIN // AEGIS ACTIVE</span>
        </div>
      </div>

      {/* Independent Floating 3D Geometric Prisms (Moving around hero space, independent of character) */}
      <div className="hero-floating-geometry" aria-hidden="true">
        <div className="hero-geo-prism geo-prism-1" id="hero-geo-1">
          <svg width="68" height="68" viewBox="0 0 64 64" fill="none">
            <polygon points="32,4 60,20 32,36 4,20" stroke="rgba(117, 150, 200, 0.45)" strokeWidth="1.2" fill="rgba(117, 150, 200, 0.06)" />
            <polygon points="4,20 32,36 32,60 4,44" stroke="rgba(117, 150, 200, 0.35)" strokeWidth="1.2" fill="rgba(117, 150, 200, 0.04)" />
            <polygon points="60,20 32,36 32,60 60,44" stroke="rgba(117, 150, 200, 0.28)" strokeWidth="1.2" fill="none" />
            <circle cx="32" cy="36" r="2.5" fill="#C6A45A" />
          </svg>
        </div>
        <div className="hero-geo-prism geo-prism-2" id="hero-geo-2">
          <svg width="60" height="60" viewBox="0 0 56 56" fill="none">
            <polygon points="28,4 52,28 28,52 4,28" stroke="rgba(198, 164, 90, 0.45)" strokeWidth="1.2" fill="rgba(198, 164, 90, 0.06)" />
            <line x1="28" y1="4" x2="28" y2="52" stroke="rgba(198, 164, 90, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="4" y1="28" x2="52" y2="28" stroke="rgba(198, 164, 90, 0.25)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="28" cy="28" r="2.5" fill="#C6A45A" />
          </svg>
        </div>
      </div>

      <div className="hero-container" ref={heroContainerRef}>
        <div className="hero-typography hero-revealed">
          <div className="hero-badges-row">
            <div className="hero-tagline-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              <span>AI &amp; DATA SCIENCE UNDERGRADUATE &bull; CHENNAI, IN</span>
            </div>
          </div>

          <h1 className="hero-headline" id="hero-headline" ref={headlineRef}>
            <span className="headline-row">
              <span className="word-mask"><span className="word-reveal word-1">HEY,</span></span>{' '}
              <span className="word-mask"><span className="word-reveal word-2">I'M</span></span>{' '}
              <span className="word-mask"><span className="word-reveal word-3 highlight-name">SAHITH</span><span className="word-punct">.</span></span>
            </span>
            <span className="headline-row">
              <span className="word-mask"><span className="word-reveal word-4">I BUILD</span></span>{' '}
              <span className="word-mask"><span className="word-reveal word-5">THINGS</span></span>{' '}
              <span className="word-mask"><span className="word-reveal word-6">THAT</span></span>{' '}
              <span className="word-mask word-mask-btn">
                <button
                  className={`kinetic-word-btn word-reveal word-7 ${isWordTransitioning ? 'word-transition' : ''}`}
                  id="kinetic-word"
                  title="Click to cycle verbs"
                  type="button"
                  onClick={cycleWord}
                >
                  {KINETIC_WORDS[wordIdx]}
                </button>
              </span>
              <span className="word-punct">.</span>
            </span>
          </h1>

          <p className="hero-lead">
            AI and Data Science student engineering practical software systems, intelligent applications, and security-oriented solutions that bridge analytical models with real-world infrastructure.
          </p>

          <div className="hero-meta-summary">
            <span>Saveetha Engineering College (Autonomous)</span>
            <span className="meta-sep">&bull;</span>
            <span>B.Tech AI &amp; DS (3rd Year)</span>
            <span className="meta-sep">&bull;</span>
            <span>Chennai, Tamil Nadu</span>
          </div>

          <div className="hero-cta-group">
            <a href="#projects" className="btn btn-primary" id="hero-btn-work">
              <span>Explore my work</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#about-video-card" className="btn btn-intro-video" id="hero-btn-intro-video" title="Watch 12-second portfolio intro video">
              <span className="btn-intro-icon" aria-hidden="true">▶</span>
              <span>Watch Intro</span>
            </a>
            <a href="#contact" className="btn btn-ghost" id="hero-btn-contact">
              <span>Get in touch</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>

          {/* Restrained Scroll Cue that responds as visitor progresses */}
          <a href="#about" className="hero-scroll-cue" id="hero-scroll-cue" aria-label="Scroll to explore portfolio">
            <span className="scroll-cue-pill">
              <span className="scroll-cue-dot"></span>
            </span>
            <span className="scroll-cue-text">EXPLORE JOURNEY</span>
            <span className="scroll-cue-arrow" aria-hidden="true">↓</span>
          </a>
        </div>

        {/* Visual Accent Flow carrying into About */}
        <div className="hero-to-about-flow" aria-hidden="true">
          <div className="flow-stem"></div>
        </div>
      </div>

      {/* Restrained Environmental Tech Depth Backdrop (Independent of character canvas) */}
      <div className="hero-ambient-depth" aria-hidden="true">
        <div className="hero-ambient-grid"></div>
        <div className="hero-ambient-glow"></div>
        <div className="hero-ambient-reticle">
          <svg viewBox="0 0 400 400" className="hero-reticle-svg" aria-hidden="true">
            <circle cx="200" cy="200" r="185" stroke="rgba(20, 184, 166, 0.18)" strokeWidth="1" strokeDasharray="6 8" fill="none" />
            <circle cx="200" cy="200" r="135" stroke="rgba(94, 153, 179, 0.15)" strokeWidth="1" strokeDasharray="14 12" fill="none" />
            <circle cx="200" cy="200" r="85" stroke="rgba(229, 169, 60, 0.16)" strokeWidth="1" strokeDasharray="4 6" fill="none" />
            <line x1="200" y1="5" x2="200" y2="395" stroke="rgba(74, 134, 153, 0.12)" strokeWidth="1" />
            <line x1="5" y1="200" x2="395" y2="200" stroke="rgba(74, 134, 153, 0.12)" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </section>
  );
}
