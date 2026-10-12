import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCharacterRenderer } from '../character-renderer.js';

gsap.registerPlugin(ScrollTrigger);

const KINETIC_WORDS = ['THINK', 'ADAPT', 'DISCOVER', 'PROTECT', 'ORCHESTRATE'];

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
      // Scrubbed kinetic mask transition on hero headline rows as visitor scrolls out
      const headlineRows = headlineRef.current.querySelectorAll('.headline-row');
      const leadText = heroContainerRef.current.querySelector('.hero-lead');
      const metaText = heroContainerRef.current.querySelector('.hero-meta-summary');
      const ctaGroup = heroContainerRef.current.querySelector('.hero-cta-group');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom 40%',
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
        tl.to(leadText, {
          y: -24,
          opacity: 0.05,
          ease: 'power1.inOut'
        }, 0.05);
      }

      if (ctaGroup) {
        tl.to(ctaGroup, {
          y: -18,
          opacity: 0.1,
          ease: 'power1.inOut'
        }, 0.08);
      }

      if (metaText) {
        tl.to(metaText, {
          opacity: 0,
          ease: 'power1.inOut'
        }, 0.1);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" id="hero" aria-label="Introduction">
      {/* Original 360° Cursor-Tracking Character Canvas (PROTECTED BY RULE 1) */}
      <canvas id="character-canvas" className="character-canvas"></canvas>
      <div className="character-vignette" aria-hidden="true"></div>

      <div className="hero-container" ref={heroContainerRef}>
        <div className="hero-typography hero-revealed">
          <div className="hero-badges-row">
            <div className="hero-tagline-badge">
              <span className="badge-dot" aria-hidden="true"></span>
              <span>CREATIVE TECHNOLOGIST &bull; CHENNAI, IN</span>
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
            Artificial intelligence, agentless security telemetry, systems automation, and interactive digital experiments.
          </p>

          <div className="hero-meta-summary">
            <span>Saveetha Engineering College (Autonomous)</span>
            <span className="meta-sep">&bull;</span>
            <span>B.Tech AI &amp; DS (3rd Year)</span>
          </div>

          <div className="hero-cta-group">
            <a href="#projects" className="btn btn-primary" id="hero-btn-work">
              <span>Explore my work</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#contact" className="btn btn-ghost" id="hero-btn-contact">
              <span>Get in touch</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>

        {/* Visual Accent Flow carrying into About */}
        <div className="hero-to-about-flow" aria-hidden="true">
          <div className="flow-stem"></div>
        </div>
      </div>
    </section>
  );
}
