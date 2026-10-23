import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAREER_STATUS, MINDSET_PILLARS } from '../data-store.js';

gsap.registerPlugin(ScrollTrigger);

export default function About({ onSelectSkill, onSelectProject }) {
  const sectionRef = useRef(null);
  const gateRef = useRef(null);
  const gateCardRef = useRef(null);
  const spotlightSceneRef = useRef(null);
  const [activePillarKey, setActivePillarKey] = useState('systems');

  const activePillar = MINDSET_PILLARS[activePillarKey] || MINDSET_PILLARS.systems;

  // Pinned Scene Transitions (Inspired by Reference Video Images 2 & 3)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !gateRef.current) return;

    const ctx = gsap.context(() => {
      // Gate Card Zoom-through reveal into Spotlight Scene
      if (gateCardRef.current && spotlightSceneRef.current) {
        const gateTl = gsap.timeline({
          scrollTrigger: {
            trigger: gateRef.current,
            start: 'top top',
            end: '+=700',
            pin: true,
            scrub: 0.8,
            anticipatePin: 1
          }
        });

        gateTl.fromTo(
          gateCardRef.current,
          { scale: 0.88, opacity: 0.95 },
          { scale: 1.25, opacity: 0, ease: 'power2.inOut' }
        );

        gateTl.fromTo(
          spotlightSceneRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0.3
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-composite-universe" id="about" ref={sectionRef} aria-labelledby="about-gate-title">
      {/* =========================================================================
          STAGE 01 // CURIOSITY: THE PINNED CHAPTER GATE (Image 2 Reference)
          ========================================================================= */}
      <div className="about-pinned-gate" id="about-gate" ref={gateRef}>
        <div className="gate-celestial-canvas" aria-hidden="true">
          <div className="gate-star-mesh" />
          <div className="gate-landscape-silhouette" />
          <div className="section-bg-watermark watermark-gate">02 // MINDSET</div>
        </div>

        <div className="about-gate-card" ref={gateCardRef}>
          <span className="gate-card-kicker">STAGE 01 // CURIOSITY</span>
          <h2 className="gate-card-title" id="about-gate-title">ABOUT ME</h2>
          <div className="gate-card-meta">
            <span>SAVEETHA ENGINEERING COLLEGE</span>
            <span className="gate-meta-dot">&bull;</span>
            <span>AI &amp; DS (3RD YEAR)</span>
          </div>
          <div className="gate-scroll-cue">
            <span className="gate-cue-dot" />
            <span>PULL TO ENTER THE JOURNEY</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          THE VOLUMETRIC SPOTLIGHT BEAM SCENE (Image 3 Reference)
          ========================================================================= */}
      <div className="about-spotlight-scene" ref={spotlightSceneRef} id="about-spotlight">
        {/* Volumetric Angled Light Beam from Top-Right */}
        <div className="spotlight-beam-layer" aria-hidden="true">
          <div className="spotlight-cone-gradient" />
          <div className="spotlight-core-flare" />
        </div>

        <div className="about-spotlight-container">
          {/* Top Bar Header (Image 3 Reference: Left headline & Right location) */}
          <div className="spotlight-top-strip">
            <h3 className="spotlight-headline">
              TURNING RIGOROUS ML THEORY INTO ROBUST SYSTEMS INFRASTRUCTURE
            </h3>
            <div className="spotlight-location-badge">
              <span className="location-dot" />
              <span>BASED IN CHENNAI, INDIA &bull; SEC (AUTONOMOUS)</span>
            </div>
          </div>

          {/* Central Illuminated Subject & Credentials Row */}
          <div className="spotlight-central-row">
            {/* Left/Center: Illuminated Subject Portrait with Ambient Aura */}
            <div className="spotlight-portrait-col">
              <div className="spotlight-portrait-frame">
                <div className="spotlight-halo" aria-hidden="true" />
                <div className="spotlight-portrait-img-wrap">
                  <img
                    src="./user_photo.jpg"
                    alt="Sahith M. — AI & Data Science Undergraduate at Saveetha Engineering College"
                    className="spotlight-portrait-img"
                    loading="lazy"
                    decoding="async"
                    width="440"
                    height="580"
                  />
                  <div className="spotlight-portrait-overlay" />
                </div>
                <div className="spotlight-portrait-hud" aria-hidden="true">
                  <span className="hud-status">SYSTEM PERSPECTIVE // AUTONOMOUS</span>
                  <span className="hud-coords">13.08&deg;N 80.27&deg;E</span>
                </div>
              </div>
            </div>

            {/* Right: Narrative Bio, Education, & Mindset Pillars */}
            <div className="spotlight-narrative-col">
              <p className="spotlight-bio-text">
                I am <strong>Sahith M.</strong>, an AI &amp; Data Science undergraduate at{' '}
                <strong>Saveetha Engineering College (Autonomous), Chennai</strong>. I build practical software where applied machine learning, agentless systems telemetry, and graph intelligence converge on real operational problems — from memory primitives up, not from frameworks down.
              </p>

              {/* Verified Education Capsule */}
              <div className="spotlight-edu-capsule" aria-label="Education details">
                <div className="edu-capsule-badge">ACADEMIC CREDENTIALS</div>
                <div className="edu-capsule-details">
                  <span className="edu-capsule-degree">B.Tech in AI &amp; DS (3rd Year)</span>
                  <span className="edu-capsule-sep">&bull;</span>
                  <span className="edu-capsule-inst">Saveetha Engineering College (Autonomous)</span>
                  <span className="edu-capsule-sep">&bull;</span>
                  <span className="edu-capsule-period">{CAREER_STATUS.academicPeriod}</span>
                  <span className="edu-capsule-cgpa">CGPA: {CAREER_STATUS.cgpa}</span>
                </div>
              </div>

              {/* 4 Interactive Mindset Pillars */}
              <div className="spotlight-pillars-block">
                <div className="pillars-header-bar">
                  <span className="pillars-kicker">ENGINEERING PHILOSOPHY &bull; CORE PILLARS</span>
                </div>
                <div className="pillars-tabs-strip" role="tablist" aria-label="Mindset Pillars">
                  {Object.values(MINDSET_PILLARS).map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      className={`pillar-pill-btn ${activePillarKey === p.key ? 'active' : ''}`}
                      role="tab"
                      aria-selected={activePillarKey === p.key}
                      onClick={() => setActivePillarKey(p.key)}
                    >
                      <span className="pillar-num">{p.num}</span>
                      <span className="pillar-name">{p.tag.split('&')[0].trim()}</span>
                    </button>
                  ))}
                </div>

                <div className="pillar-active-card">
                  <h4 className="pillar-card-title">{activePillar.title}</h4>
                  <p className="pillar-card-desc">{activePillar.desc}</p>
                  <ul className="pillar-bullets-list">
                    {activePillar.principles.map((pr, idx) => (
                      <li key={idx} className="pillar-bullet-item">
                        <span className="bullet-chevron" aria-hidden="true">&bull;</span>
                        <span>{pr}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pillar-tools-tagline">
                    <span className="tools-lead">PRIMITIVES &amp; TOOLS:</span>
                    <span className="tools-val">{activePillar.tools}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar (Image 3 Reference: Craft Matrix on Left & Action Buttons on Right) */}
          <div className="spotlight-bottom-strip">
            <div className="craft-matrix-block">
              <span className="craft-label">DISCIPLINE &amp; CRAFT</span>
              <p className="craft-desc">
                UI/UX &bull; AGENTLESS WINRM &bull; TEMPORAL GRAPH INTEL &bull; FASTAPI &bull; PYTORCH &bull; SCIKIT-LEARN &bull; C
              </p>
            </div>

            <div className="spotlight-action-buttons">
              <a href="#projects" className="btn-spotlight-primary">
                <span>Explore Exhibits</span>
                <span className="btn-arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a href="#resume" className="btn-spotlight-secondary">
                <span>View Full CV ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
