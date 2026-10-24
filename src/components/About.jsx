import React, { useState } from 'react';
import { CAREER_STATUS, MINDSET_PILLARS, RESUME_DATA } from '../data-store.js';

export default function About({ onSelectSkill, onSelectProject }) {
  const [activePillarKey, setActivePillarKey] = useState('systems');

  const activePillar = MINDSET_PILLARS[activePillarKey] || MINDSET_PILLARS.systems;

  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot" />
            <span className="section-kicker">STAGE 01 &bull; 02 // CURIOSITY &amp; UNDERSTANDING</span>
          </div>
          <h2 className="section-title" id="about-title">
            The Path of an <span className="accent-text">Independent Mind</span>
          </h2>
          <p className="section-subtitle">
            Grounded in low-level procedural fundamentals and driven to understand how systems
            behave at the metal before layering machine learning models or distributed services.
          </p>
        </div>

        {/* Narrative & Academic Overview Grid */}
        <div className="about-overview-grid">
          {/* Narrative Column */}
          <div className="about-narrative-card">
            <div className="about-card-badge">ENGINEERING BACKGROUND</div>
            <h3 className="about-narrative-heading">
              Building From First Principles, Not Framework Defaults
            </h3>
            <p className="about-narrative-p">
              I am <strong>Sahith M.</strong>, an Artificial Intelligence &amp; Data Science
              undergraduate at <strong>Saveetha Engineering College (Autonomous), Chennai</strong>.
              My work centers on designing real engineering systems where applied machine learning,
              agentless telemetry, and temporal graph intelligence converge.
            </p>
            <p className="about-narrative-p">
              Rather than treating models as opaque predictors or relying on bloated third-party
              client daemons, I prioritize architectural clarity: understanding memory layouts and
              syscalls in C, exploiting native protocols like WinRM for zero-footprint endpoint audits,
              and tracing complex fraud or lateral attack paths through mathematical graph algorithms.
            </p>

            {/* Coursework Tags */}
            <div className="about-coursework-box">
              <span className="coursework-label">CORE RIGOR &bull; VERIFIED COURSEWORK:</span>
              <div className="coursework-chips">
                {RESUME_DATA.coursework.map((course, i) => (
                  <span key={i} className="coursework-chip">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Academic & Verification Column */}
          <div className="about-academic-card">
            <div className="about-card-badge">ACADEMIC STANDING</div>
            <h3 className="about-academic-inst">
              Saveetha Engineering College
              <span className="inst-sub">(Autonomous) &bull; Chennai, Tamil Nadu</span>
            </h3>

            <div className="about-stats-list">
              <div className="about-stat-row">
                <span className="stat-label">Degree</span>
                <strong className="stat-val">B.Tech in Artificial Intelligence &amp; Data Science</strong>
              </div>
              <div className="about-stat-row">
                <span className="stat-label">Academic Standing</span>
                <strong className="stat-val highlight-gold">3rd Year (Class of 2024–2028)</strong>
              </div>
              <div className="about-stat-row">
                <span className="stat-label">Cumulative GPA</span>
                <strong className="stat-val highlight-gold">{CAREER_STATUS.cgpa}</strong>
              </div>
              <div className="about-stat-row">
                <span className="stat-label">Higher Secondary (Class XII)</span>
                <strong className="stat-val">{RESUME_DATA.education.schooling[0].score}</strong>
              </div>
              <div className="about-stat-row">
                <span className="stat-label">Secondary School (Class X)</span>
                <strong className="stat-val">{RESUME_DATA.education.schooling[1].score}</strong>
              </div>
              <div className="about-stat-row">
                <span className="stat-label">Current Availability</span>
                <strong className="stat-val highlight-steel">{CAREER_STATUS.availability}</strong>
              </div>
            </div>

            <div className="about-links-row">
              <a href="#projects" className="btn-about-link">
                <span>View Projects →</span>
              </a>
              <a href="#resume" className="btn-about-link secondary">
                <span>Official Dossier ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Mindset Pillars (The Philosophy of Curiosity & Understanding) */}
        <div className="about-pillars-container">
          <div className="about-pillars-header">
            <div className="pillars-kicker-strip">
              <span className="pillars-kicker-num">02 // MINDSET</span>
              <span className="pillars-kicker-sep">&bull;</span>
              <span className="pillars-kicker-title">CORE ENGINEERING PILLARS</span>
            </div>
            <p className="pillars-caption">
              Select any pillar to examine how foundational principles translate into system architecture.
            </p>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="pillars-tab-row" role="tablist" aria-label="Mindset Pillars">
            {Object.values(MINDSET_PILLARS).map((p, idx) => (
              <button
                key={p.key}
                type="button"
                className={`pillar-tab-btn ${activePillarKey === p.key ? 'active' : ''}`}
                role="tab"
                aria-selected={activePillarKey === p.key}
                onClick={() => setActivePillarKey(p.key)}
              >
                <span className="tab-idx">0{idx + 1}</span>
                <span className="tab-label">{p.tag}</span>
              </button>
            ))}
          </div>

          {/* Active Pillar Card */}
          <div className="pillar-detail-card">
            <div className="pillar-card-topbar">
              <div className="pillar-tag-badge">
                <span className="tag-dot" />
                <span>{activePillar.tag}</span>
              </div>
              <span className="pillar-tools-pill">
                <strong>PRIMITIVES:</strong> {activePillar.tools}
              </span>
            </div>

            <h3 className="pillar-detail-title">{activePillar.title}</h3>
            <p className="pillar-detail-desc">{activePillar.desc}</p>

            <div className="pillar-principles-block">
              <h4 className="principles-heading">OPERATIONAL PRINCIPLES:</h4>
              <ul className="principles-list">
                {activePillar.principles.map((pr, idx) => (
                  <li key={idx} className="principle-item">
                    <span className="principle-bullet">&bull;</span>
                    <span>{pr}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
