import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INTERESTS } from '../data-store.js';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { key: 'ai', icon: '🧠', label: 'AI & Data Science' },
  { key: 'security', icon: '🛡️', label: 'Cybersecurity' },
  { key: 'automation', icon: '⚡', label: 'Systems Automation' },
  { key: 'software', icon: '⚙️', label: 'Software Engineering' }
];

export default function About({ onSelectSkill, onSelectProject }) {
  const [activeCategoryKey, setActiveCategoryKey] = useState('ai');
  const [isPanelMorphing, setIsPanelMorphing] = useState(false);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  // Scroll-driven expressive headline wipe via GSAP ScrollTrigger
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSelectCategory = (key) => {
    setIsPanelMorphing(true);
    const data = INTERESTS[key];
    setActiveCategoryKey(key);

    if (data) {
      if (onSelectProject) {
        onSelectProject(`prj-${data.projectId}`);
      }
      if (onSelectSkill && data.relatedSkillIds && data.relatedSkillIds.length > 0) {
        onSelectSkill(data.relatedSkillIds[0]);
      }
    }

    setTimeout(() => {
      setIsPanelMorphing(false);
    }, 130);
  };

  const handleJumpToProject = (e, projectId) => {
    e.preventDefault();
    const fullId = `prj-${projectId}`;
    if (onSelectProject) onSelectProject(fullId);
    const target = document.getElementById(fullId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const currentFocus = INTERESTS[activeCategoryKey] || INTERESTS.ai;

  return (
    <section className="about-section is-in-view" id="about" ref={sectionRef} aria-labelledby="about-title">
      <div className="about-container">
        {/* Section Headline */}
        <div className="about-header-block">
          <h2 className="about-headline" id="about-title" ref={headlineRef}>
            <span className="statement-prefix">Engineering logic where </span>
            <span className="statement-highlight scroll-chromatic-phrase">intelligent models meet telemetry.</span>
          </h2>
        </div>

        {/* Compact 2-Column Responsive Layout */}
        <div className="about-streamlined-grid">
          {/* Left Column: Focused Bio & Compact Education Detail */}
          <div className="about-bio-column">
            <p className="about-intro-paragraph">
              I am <strong>Sahith M.</strong>, an AI &amp; Data Science technologist pursuing my B.Tech at{' '}
              <strong>Saveetha Engineering College (Autonomous), Chennai</strong>. I build clean architectures connecting machine learning models, agentless security telemetry, and systems automation.
            </p>

            <div className="about-compact-education" aria-label="Academic details">
              <span className="edu-tag-icon" aria-hidden="true">🎓</span>
              <div className="edu-details-text">
                <span className="edu-degree-text">B.Tech in AI &amp; Data Science (3rd Year)</span>
                <span className="edu-divider">&bull;</span>
                <span className="edu-college-text">Saveetha Engineering College (Autonomous)</span>
                <span className="edu-divider">&bull;</span>
                <span className="edu-timeline-text">2022 &ndash; 2026</span>
              </div>
            </div>

            <div className="about-interaction-hint">
              <span className="hint-indicator">✦</span>
              <span>Select a focus area on the right to inspect technical scope and connected projects.</span>
            </div>
          </div>

          {/* Right Column: Compact Category Selector & Single Shared Description Panel */}
          <div className="about-focus-column">
            {/* Compact Category Tabs */}
            <div className="focus-category-tabs" role="tablist" aria-label="Technical focus areas">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategoryKey === cat.key;
                return (
                  <button
                    key={cat.key}
                    className={`focus-pill-btn ${isActive ? 'active' : ''}`}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => handleSelectCategory(cat.key)}
                  >
                    <span className="pill-glyph">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Single Shared Description Panel */}
            <div
              className={`about-shared-card ${isPanelMorphing ? 'morphing' : ''}`}
              id="about-shared-panel"
              aria-live="polite"
            >
              <div className="shared-card-header">
                <span className="shared-card-tag">{currentFocus.tag}</span>
                <a
                  href={`#prj-${currentFocus.projectId}`}
                  className="shared-project-link"
                  onClick={(e) => handleJumpToProject(e, currentFocus.projectId)}
                  title={`Jump to ${currentFocus.projectName}`}
                >
                  <span>Project: {currentFocus.projectName}</span>
                </a>
              </div>

              <h3 className="shared-card-title">{currentFocus.title}</h3>
              <p className="shared-card-description">{currentFocus.desc}</p>

              <div className="shared-card-footer">
                <span className="shared-stack-label">Core Stack:</span>
                <span className="shared-stack-value">{currentFocus.tools}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
