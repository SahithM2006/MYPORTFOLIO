import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAREER_STATUS, MINDSET_PILLARS } from '../data-store.js';

gsap.registerPlugin(ScrollTrigger);

export default function About({ onSelectSkill, onSelectProject }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const photoRef = useRef(null);
  const [activePillarKey, setActivePillarKey] = useState('systems');

  const activePillar = MINDSET_PILLARS[activePillarKey] || MINDSET_PILLARS.systems;

  // Scroll-driven headline wipe via GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0.2 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            end: 'bottom 65%',
            scrub: 0.5
          }
        }
      );

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { y: 30, opacity: 0.8 },
          {
            y: -25,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section is-in-view" id="about" ref={sectionRef} aria-labelledby="about-title">
      {/* Oversized Cinematic Typography Watermark */}
      <div className="section-bg-watermark watermark-about" aria-hidden="true">02 // MINDSET</div>

      <div className="about-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot" />
            <span className="section-kicker">02 // MINDSET &amp; FOUNDATIONS</span>
          </div>
          <h2 className="about-headline" id="about-title" ref={headlineRef}>
            <span className="statement-prefix">Engineering mindset grounded in </span>
            <span className="statement-highlight scroll-chromatic-phrase">first principles, telemetry &amp; models.</span>
          </h2>
        </div>

        {/* Profile Grid: Left column (Photograph), Right column (Bio & Education & Mindset Pillars) */}
        <div className="about-portrait-row">
          {/* Left Column: Portrait Photograph */}
          <div className="about-portrait-col" ref={photoRef}>
            <div className="about-portrait-frame" id="about-portrait-frame">
              <div className="about-portrait-inner">
                <img
                  src="./user_photo.jpg"
                  alt="Sahith M. — AI & Data Science undergraduate at Saveetha Engineering College, Chennai"
                  className="about-portrait-img"
                  loading="eager"
                  decoding="async"
                  width="480"
                  height="640"
                />
              </div>
              <div className="about-portrait-hud" aria-hidden="true">
                <div className="hud-badge-left">
                  <span className="hud-dot" />
                  <span>SAHITH M. &bull; PROFILE</span>
                </div>
                <div className="hud-badge-right">
                  <span>13.08&deg;N 80.27&deg;E &bull; SEC CHENNAI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative, Education, and Interactive Mindset Pillars */}
          <div className="about-bio-main-col">
            <div className="about-bio-column">
              <p className="about-intro-paragraph">
                I am <strong>Sahith M.</strong>, an AI &amp; Data Science undergraduate at{' '}
                <strong>Saveetha Engineering College (Autonomous), Chennai</strong>. I build practical software where applied machine learning, agentless systems telemetry, and graph intelligence converge on real operational problems — from memory primitives up, not from frameworks down.
              </p>

              <div className="about-compact-education" aria-label="Academic details">
                <span className="edu-tag-icon" aria-hidden="true">&bull;</span>
                <div className="edu-details-text">
                  <span className="edu-degree-text">B.Tech in AI &amp; DS (3rd Year)</span>
                  <span className="edu-divider">&bull;</span>
                  <span className="edu-college-text">Saveetha Engineering College (Autonomous)</span>
                  <span className="edu-divider">&bull;</span>
                  <span className="edu-timeline-text">{CAREER_STATUS.academicPeriod}</span>
                </div>
              </div>

              {/* Core Engineering Domains */}
              <div className="about-domain-pills-row" aria-label="Primary technical domains">
                <span className="domain-pill">
                  <span className="domain-pill-dot dot-security" />
                  <span>Agentless Systems Telemetry</span>
                </span>
                <span className="domain-pill">
                  <span className="domain-pill-dot dot-graphs" />
                  <span>Temporal Graph Analytics</span>
                </span>
                <span className="domain-pill">
                  <span className="domain-pill-dot dot-aiml" />
                  <span>Applied Machine Learning</span>
                </span>
                <span className="domain-pill">
                  <span className="domain-pill-dot dot-systems" />
                  <span>Low-Level Primitives (C &amp; Python)</span>
                </span>
              </div>

              {/* Interactive Mindset Pillars: Concrete Technical Principles */}
              <div className="about-pillars-card">
                <div className="pillars-card-kicker">ENGINEERING PHILOSOPHY &bull; CORE PILLARS</div>
                <div className="pillars-tabs-row" role="tablist" aria-label="Mindset Pillars">
                  {Object.values(MINDSET_PILLARS).map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      className={`pillar-tab-btn ${activePillarKey === p.key ? 'active' : ''}`}
                      role="tab"
                      aria-selected={activePillarKey === p.key}
                      onClick={() => setActivePillarKey(p.key)}
                    >
                      <span className="pillar-tab-name">{p.tag.split('&')[0].trim()}</span>
                    </button>
                  ))}
                </div>

                <div className="pillar-detail-body">
                  <h4 className="pillar-detail-title">{activePillar.title}</h4>
                  <p className="pillar-detail-desc">{activePillar.desc}</p>
                  <ul className="pillar-principles-list">
                    {activePillar.principles.map((pr, idx) => (
                      <li key={idx} className="pillar-principle-item">
                        <span className="principle-bullet" aria-hidden="true">&bull;</span>
                        <span>{pr}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pillar-tools-footer">
                    <span className="tools-kicker">PRIMITIVES &amp; TOOLS:</span>
                    <span className="tools-text">{activePillar.tools}</span>
                  </div>
                </div>
              </div>

              {/* Direct Action Links */}
              <div className="about-actions-row">
                <a href="#projects" className="about-action-btn btn-primary-action">
                  <span>Explore Projects</span>
                  <span className="btn-arrow" aria-hidden="true">&darr;</span>
                </a>
                <a href="#skills" className="about-action-btn btn-secondary-action">
                  <span>Skill Constellation</span>
                  <span className="btn-arrow" aria-hidden="true">&rarr;</span>
                </a>
                <a href="#resume" className="about-action-btn btn-tertiary-action">
                  <span>View Resume</span>
                  <span className="btn-arrow" aria-hidden="true">&nearr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
