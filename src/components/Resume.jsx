import React from 'react';
import { RESUME_DATA } from '../data-store.js';

export default function Resume() {
  return (
    <section className="resume-section" id="resume" aria-labelledby="resume-title">
      <div className="resume-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot" />
            <span className="section-kicker">STAGE 04 // EVOLUTION &bull; CURRICULUM VITAE</span>
          </div>

          <div className="resume-header-row">
            <div className="resume-title-wrap">
              <h2 className="section-title" id="resume-title">
                Curriculum <span className="accent-text">Vitae &amp; Dossier</span>
              </h2>
              <p className="section-subtitle">
                Official placement dossier documenting undergraduate academics, applied AI/ML engineering,
                agentless systems telemetry, and national hackathon achievements.
              </p>
            </div>

            {/* Verified Working Action Buttons */}
            <div className="resume-actions-group">
              <a
                href={RESUME_DATA.pdfUrl}
                download="Sahith_M_Placement_Resume.pdf"
                className="btn-resume-primary"
                id="btn-download-resume"
                title="Download verified PDF resume directly"
              >
                <span className="btn-icon" aria-hidden="true">↓</span>
                <span className="btn-text-wrap">
                  <strong>Download Resume</strong>
                  <small>Verified PDF &bull; Placement Edition</small>
                </span>
              </a>

              <a
                href={RESUME_DATA.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-resume-secondary"
                id="btn-view-resume-pdf"
                title="Open PDF resume in a new browser tab"
              >
                <span className="btn-icon" aria-hidden="true">↗</span>
                <span className="btn-text-wrap">
                  <strong>View Full PDF</strong>
                  <small>Open in New Tab</small>
                </span>
              </a>

              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-resume-ghost"
                id="btn-view-resume-html"
                title="Open formatted web resume"
              >
                <span>Interactive HTML Version →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Structured Editorial Showcase Card */}
        <div className="resume-dossier-card">
          <div className="dossier-topbar">
            <div className="dossier-badge">
              <span className="beacon-pulse" />
              <span>OFFICIAL TECHNICAL DOSSIER</span>
              <span className="badge-sep">&bull;</span>
              <span className="badge-muted">CHENNAI, INDIA</span>
            </div>

            <div className="dossier-academic-tag">
              <span>Saveetha Engineering College (Autonomous)</span>
              <span className="badge-sep">&bull;</span>
              <span className="cgpa-pill">CGPA {RESUME_DATA.education.cgpa}</span>
            </div>
          </div>

          <div className="dossier-grid">
            {/* Left Column: Profile, Education, Coursework */}
            <div className="dossier-col">
              <div className="dossier-subcard">
                <span className="subcard-kicker">EXECUTIVE SUMMARY</span>
                <h3 className="subcard-heading">Engineering From Primitives Up</h3>
                <p className="subcard-text">
                  Artificial Intelligence &amp; Data Science undergraduate engineering practical
                  software systems from memory primitives up. Experienced in architecting agentless
                  Windows security telemetry, temporal financial graph intelligence, and full-stack
                  analytical pipelines with high operational reliability.
                </p>
              </div>

              <div className="dossier-subcard">
                <span className="subcard-kicker">ACADEMIC BACKGROUND</span>
                <div className="dossier-edu-item">
                  <strong className="edu-degree">B.Tech in Artificial Intelligence &amp; Data Science</strong>
                  <span className="edu-inst">Saveetha Engineering College (Autonomous), Chennai</span>
                  <div className="edu-dates-row">
                    <span>2024–2028 &bull; 3rd Year</span>
                    <strong className="highlight-gold">CGPA: 7.5 / 10</strong>
                  </div>
                </div>

                <div className="dossier-schooling-grid">
                  <div className="schooling-box">
                    <span className="school-lbl">Class XII (Higher Secondary)</span>
                    <strong className="school-val">80%</strong>
                  </div>
                  <div className="schooling-box">
                    <span className="school-lbl">Class X (Secondary School)</span>
                    <strong className="school-val">85%</strong>
                  </div>
                </div>
              </div>

              <div className="dossier-subcard">
                <span className="subcard-kicker">VERIFIED RELEVANT COURSEWORK</span>
                <div className="coursework-tags-list">
                  {RESUME_DATA.coursework.map((course, idx) => (
                    <span key={idx} className="course-pill">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Technical Competencies & Hackathon Honors */}
            <div className="dossier-col">
              <div className="dossier-subcard">
                <span className="subcard-kicker">COMPETENCY INVENTORY</span>
                <div className="skills-inventory-list">
                  <div className="skill-cat-row">
                    <span className="cat-lead">Programming:</span>
                    <span className="cat-val">{RESUME_DATA.skills.languages.join(', ')}</span>
                  </div>
                  <div className="skill-cat-row">
                    <span className="cat-lead">AI &amp; Data Science:</span>
                    <span className="cat-val">{RESUME_DATA.skills.aiData.join(', ')}</span>
                  </div>
                  <div className="skill-cat-row">
                    <span className="cat-lead">Libraries &amp; ML:</span>
                    <span className="cat-val">{RESUME_DATA.skills.libraries.join(', ')}</span>
                  </div>
                  <div className="skill-cat-row">
                    <span className="cat-lead">Backend &amp; APIs:</span>
                    <span className="cat-val">{RESUME_DATA.skills.backendDev.join(', ')}</span>
                  </div>
                  <div className="skill-cat-row">
                    <span className="cat-lead">Tools &amp; Versioning:</span>
                    <span className="cat-val">{RESUME_DATA.skills.tools.join(', ')}</span>
                  </div>
                  <div className="skill-cat-row">
                    <span className="cat-lead">Core Domains:</span>
                    <span className="cat-val">{RESUME_DATA.skills.domains.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="dossier-subcard">
                <span className="subcard-kicker">NATIONAL HACKATHON ACHIEVEMENTS</span>
                <ul className="achievements-bullet-list">
                  {RESUME_DATA.achievements.map((ach, idx) => (
                    <li key={idx} className="achievement-item">
                      <span className="ach-icon" aria-hidden="true">★</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dossier-subcard">
                <span className="subcard-kicker">KEY HACKATHON PROJECTS</span>
                <div className="key-projects-list">
                  {RESUME_DATA.projects.slice(0, 3).map((p, idx) => (
                    <div key={idx} className="key-project-item">
                      <strong className="key-proj-title">{p.title}</strong>
                      <span className="key-proj-domain">{p.domain}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
