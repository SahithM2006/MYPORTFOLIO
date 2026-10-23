import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KINETIC_WORDS = ['ENGINEER', 'PROTECT', 'ANALYZE', 'DISCOVER', 'ORCHESTRATE'];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [isWordTransitioning, setIsWordTransitioning] = useState(false);
  const headlineRef = useRef(null);
  const heroContainerRef = useRef(null);
  const apertureStageRef = useRef(null);

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

  // Cinematic scroll-driven perspective transition into subsequent chapters
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !headlineRef.current || !heroContainerRef.current) return;

    const ctx = gsap.context(() => {
      const headlineRows = headlineRef.current.querySelectorAll('.headline-row');
      const leadText = heroContainerRef.current.querySelector('.hero-lead');
      const metaText = heroContainerRef.current.querySelector('.hero-meta-summary');
      const ctaGroup = heroContainerRef.current.querySelector('.hero-cta-group');
      const scrollCue = heroContainerRef.current.querySelector('.hero-scroll-cue');
      const apertureStage = apertureStageRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom 20%',
          scrub: 0.6,
          invalidateOnRefresh: true
        }
      });

      // Subtle, cinematic depth retreat for the architectural aperture stage
      if (apertureStage) {
        tl.to(apertureStage, {
          scale: 0.90,
          y: 45,
          opacity: 0.18,
          ease: 'power1.inOut'
        }, 0);
      }

      tl.to(headlineRows, {
        clipPath: 'inset(0% 0% 85% 0%)',
        y: -24,
        opacity: 0.15,
        stagger: 0.08,
        ease: 'power1.inOut'
      }, 0);

      if (leadText) {
        tl.to(leadText, { y: -20, opacity: 0.08, ease: 'power1.inOut' }, 0.05);
      }

      if (ctaGroup) {
        tl.to(ctaGroup, { y: -16, opacity: 0.1, ease: 'power1.inOut' }, 0.08);
      }

      if (metaText) {
        tl.to(metaText, { opacity: 0, ease: 'power1.inOut' }, 0.1);
      }

      if (scrollCue) {
        tl.to(scrollCue, { y: -12, opacity: 0, ease: 'power1.out' }, 0.02);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" id="hero" aria-label="Introduction">
      {/* Oversized Cinematic Typography Watermark */}
      <div className="section-bg-watermark watermark-hero" aria-hidden="true">01 // ORIGIN</div>

      {/* Precision Architectural Focal Aperture & Atmospheric Lighting Stage */}
      <div className="hero-aperture-stage" ref={apertureStageRef} aria-hidden="true">
        {/* Volumetric Midnight & Gold Ambient Lighting */}
        <div className="aperture-ambient-lighting" />
        <div className="aperture-depth-vignette" />

        {/* Precision Geometric Astrolabe & Telemetry Lens */}
        <div className="aperture-astrolabe-wrap">
          <svg className="aperture-astrolabe-svg" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="astrolabeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C6A45A" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#7596C8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#C6A45A" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="astrolabeSteelGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7596C8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#263B60" stopOpacity="0.2" />
              </linearGradient>
              <radialGradient id="astrolabeCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C6A45A" stopOpacity="0.18" />
                <stop offset="45%" stopColor="#182338" stopOpacity="0.12" />
                <stop offset="85%" stopColor="#07090E" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient Radial Core Atmosphere */}
            <circle cx="350" cy="350" r="320" fill="url(#astrolabeCoreGlow)" />

            {/* Outermost Precision Coordinate Ring */}
            <circle cx="350" cy="350" r="310" stroke="rgba(117, 150, 200, 0.15)" strokeWidth="1" />
            <circle cx="350" cy="350" r="290" stroke="rgba(198, 164, 90, 0.22)" strokeWidth="1.2" strokeDasharray="4 8" />

            {/* Rotating Cardinal Alignment Ring */}
            <g className="astrolabe-ring-outer">
              <circle cx="350" cy="350" r="255" stroke="url(#astrolabeSteelGrad)" strokeWidth="1.5" strokeDasharray="18 40" />
              {/* Telemetry Degree Ticks */}
              <line x1="350" y1="35" x2="350" y2="48" stroke="#C6A45A" strokeWidth="2" />
              <line x1="350" y1="652" x2="350" y2="665" stroke="#C6A45A" strokeWidth="2" />
              <line x1="35" y1="350" x2="48" y2="350" stroke="#7596C8" strokeWidth="2" />
              <line x1="652" y1="350" x2="665" y2="350" stroke="#7596C8" strokeWidth="2" />
              <circle cx="350" cy="42" r="3" fill="#C6A45A" />
              <circle cx="350" cy="658" r="3" fill="#C6A45A" />
              <circle cx="42" cy="350" r="3" fill="#7596C8" />
              <circle cx="658" cy="350" r="3" fill="#7596C8" />
            </g>

            {/* Mid-Radius Geometric Polygon Facets */}
            <g className="astrolabe-ring-mid">
              <polygon
                points="350,150 523,250 523,450 350,550 177,450 177,250"
                stroke="rgba(117, 150, 200, 0.2)"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="350" cy="350" r="195" stroke="rgba(198, 164, 90, 0.18)" strokeWidth="1" strokeDasharray="12 24" />
            </g>

            {/* Inner Precision Focal Aperture */}
            <g className="astrolabe-ring-inner">
              <circle cx="350" cy="350" r="130" stroke="url(#astrolabeGoldGrad)" strokeWidth="1.5" />
              <polygon
                points="350,230 454,290 454,410 350,470 246,410 246,290"
                stroke="rgba(198, 164, 90, 0.35)"
                strokeWidth="1.2"
                strokeDasharray="6 6"
                fill="none"
              />
              <line x1="350" y1="220" x2="350" y2="480" stroke="rgba(117, 150, 200, 0.25)" strokeWidth="1" strokeDasharray="3 5" />
              <line x1="220" y1="350" x2="480" y2="350" stroke="rgba(117, 150, 200, 0.25)" strokeWidth="1" strokeDasharray="3 5" />
              <circle cx="350" cy="350" r="28" stroke="#C6A45A" strokeWidth="1.5" fill="rgba(7, 9, 14, 0.7)" />
              <circle cx="350" cy="350" r="6" fill="#C6A45A" className="astrolabe-core-dot" />
            </g>
          </svg>

          {/* Floating Telemetry HUD Readout */}
          <div className="aperture-telemetry-badge">
            <span className="aperture-beacon-pulse" />
            <span className="aperture-status-text">SYSTEM PERSPECTIVE // AUTONOMOUS</span>
            <span className="aperture-coords">13.08°N 80.27°E</span>
          </div>
        </div>
      </div>

      <div className="hero-container" ref={heroContainerRef}>
        <div className="hero-typography hero-revealed">
          <div className="hero-badges-row">
            <div className="hero-tagline-badge">
              <span className="badge-dot" aria-hidden="true" />
              <span>AI &amp; DS UNDERGRADUATE &bull; CHENNAI, IN</span>
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
            <span>B.Tech in AI &amp; DS (3rd Year)</span>
            <span className="meta-sep">&bull;</span>
            <span>Chennai, Tamil Nadu</span>
          </div>

          <div className="hero-cta-group">
            <a href="#projects" className="btn btn-primary" id="hero-btn-work">
              <span>Explore my work</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-ghost" id="hero-btn-contact">
              <span>Get in touch</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>

          {/* Restrained Cinematic Scroll Cue */}
          <a href="#about" className="hero-scroll-cue" id="hero-scroll-cue" aria-label="Scroll to explore portfolio">
            <span className="scroll-cue-pill">
              <span className="scroll-cue-dot" />
            </span>
            <span className="scroll-cue-text">01 / 09 &bull; SCROLL TO EXPLORE</span>
            <span className="scroll-cue-arrow" aria-hidden="true">&darr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
