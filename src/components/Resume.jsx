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
            <span className="section-kicker">CURRICULUM VITAE &amp; CREDENTIALS</span>
          </div>

          <div className="resume-headline-row">
            <div className="resume-intro-col">
              <h2 className="section-title" id="resume-title">My Resume</h2>
              <p className="section-subtitle">
                Undergraduate in Artificial Intelligence &amp; Data Science at Saveetha Engineering College, engineering practical machine learning applications, agentless telemetry systems, and data-driven infrastructure.
              </p>
            </div>

            {/* Prominent Action Group */}
            <div className="resume-action-buttons">
              <a
                href={RESUME_DATA.pdfUrl}
                download="Sahith_M_Resume.pdf"
                className="btn-resume-download"
                id="download-resume-btn"
                title="Download Sahith M. Resume (PDF)"
              >
                <span className="resume-btn-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </span>
                <span className="resume-btn-text">
                  <strong>Download Resume</strong>
                  <small>PDF • Placement Edition</small>
                </span>
              </a>

              <a
                href={RESUME_DATA.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-resume-external"
                id="view-resume-external-btn"
                title="Open resume PDF in a new tab"
              >
                <span className="resume-btn-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </span>
                <span className="resume-btn-text">
                  <strong>View Full Resume</strong>
                  <small>Open in New Tab ↗</small>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Premium Curated Resume Showcase Card */}
        <div className="resume-showcase-card">
          {/* Top Status Bar */}
          <div className="resume-card-topbar">
            <div className="resume-card-badge">
              <span className="resume-beacon-pulse" aria-hidden="true" />
              <span>OFFICIAL TECHNICAL DOSSIER</span>
              <span className="resume-badge-divider">•</span>
              <span className="resume-badge-muted">CHENNAI, IN</span>
            </div>

            <div className="resume-card-meta-pill">
              <span>B.Tech AI &amp; DS (2024 – 2028)</span>
              <span className="resume-pill-accent">CGPA {RESUME_DATA.education.cgpa}</span>
            </div>
          </div>

          {/* Dual-Column Main Content (Animated with GSAP scroll-engine) */}
          <div className="resume-content-grid">
            {/* Primary Column: Summary, Education & Core Skills */}
            <div className="resume-col resume-col-primary">
              {/* Executive Summary Mini-Card */}
              <div className="resume-subcard">
                <div className="resume-subcard-kicker">PROFESSIONAL SUMMARY</div>
                <h3 className="resume-subcard-title">Engineering from Primitives Up</h3>
                <p className="resume-summary-text">
                  Passionate about bridging mathematical machine learning theory with robust, operational systems engineering. Experienced in building agentless security discovery platforms, temporal financial graph intelligence, and full-stack analytical pipelines with high reliability.
                </p>
                <div className="resume-highlight-metrics">
                  <div className="resume-metric-box">
                    <span className="metric-box-label">Institution</span>
                    <strong className="metric-box-val">{RESUME_DATA.education.institution}</strong>
                  </div>
                  <div className="resume-metric-box">
                    <span className="metric-box-label">Specialization</span>
                    <strong className="metric-box-val">{RESUME_DATA.education.degree}</strong>
                  </div>
                  <div className="resume-metric-box highlight">
                    <span className="metric-box-label">Academic CGPA</span>
                    <strong className="metric-box-val gold">{RESUME_DATA.education.cgpa}</strong>
                  </div>
                </div>
              </div>

              {/* Technical Competencies Matrix */}
              <div className="resume-subcard">
                <div className="resume-subcard-kicker">TECHNICAL ARSENAL</div>
                <h3 className="resume-subcard-title">Core Competencies</h3>
                <div className="resume-skill-categories">
                  <div className="resume-skill-group">
                    <span className="skill-cat-title">Languages &amp; Core:</span>
                    <div className="skill-pills-row">
                      {RESUME_DATA.skills.languages.map((l) => (
                        <span key={l} className="resume-pill gold">{l}</span>
                      ))}
                    </div>
                  </div>
                  <div className="resume-skill-group">
                    <span className="skill-cat-title">AI, ML &amp; Frameworks:</span>
                    <div className="skill-pills-row">
                      {['Machine Learning', 'Deep Learning', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy'].map((s) => (
                        <span key={s} className="resume-pill blue">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="resume-skill-group">
                    <span className="skill-cat-title">Systems, Databases &amp; Tools:</span>
                    <div className="skill-pills-row">
                      {['FastAPI', 'PostgreSQL', 'Docker', 'Git', 'Linux / WinRM', 'Jupyter'].map((t) => (
                        <span key={t} className="resume-pill slate">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="resume-skill-group">
                    <span className="skill-cat-title">Specialized Domains:</span>
                    <div className="skill-pills-row">
                      {['Agentless Telemetry', 'Temporal Graph Intelligence', 'Digital Twins', 'Cybersecurity'].map((d) => (
                        <span key={d} className="resume-pill domain">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Column: Selected Flagship Projects & Achievements */}
            <div className="resume-col resume-col-secondary">
              <div className="resume-subcard">
                <div className="resume-subcard-kicker">SELECTED PROJECTS (FROM RESUME)</div>
                <h3 className="resume-subcard-title">Flagship Implementations</h3>

                <div className="resume-curated-projects">
                  {RESUME_DATA.projects.slice(0, 3).map((proj, idx) => (
                    <div key={idx} className="curated-project-item">
                      <div className="curated-proj-top">
                        <span className="curated-proj-idx">0{idx + 1}</span>
                        <div>
                          <h4 className="curated-proj-name">{proj.title.split('—')[0].trim()}</h4>
                          <span className="curated-proj-domain">{proj.domain.split('•')[0].trim()}</span>
                        </div>
                      </div>
                      <p className="curated-proj-desc">
                        {proj.points[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Foundations & Honors */}
              <div className="resume-subcard">
                <div className="resume-subcard-kicker">ACADEMIC &amp; COMPETITIVE HIGHLIGHTS</div>
                <h3 className="resume-subcard-title">Foundations &amp; Recognition</h3>
                <ul className="resume-honors-list">
                  <li className="resume-honor-item">
                    <span className="honor-icon" aria-hidden="true">★</span>
                    <span>National-level Hackathon prototypes in autonomous cybersecurity digital twins &amp; financial fraud detection.</span>
                  </li>
                  <li className="resume-honor-item">
                    <span className="honor-icon" aria-hidden="true">▸</span>
                    <span>Class XII Higher Secondary: <strong>80%</strong> • Class X Secondary School: <strong>85%</strong>.</span>
                  </li>
                  <li className="resume-honor-item">
                    <span className="honor-icon" aria-hidden="true">▸</span>
                    <span>Verified coursework: Data Structures, Analysis of Algorithms, Object-Oriented Programming, and Applied Deep Learning.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Call-To-Action Ribbon */}
          <div className="resume-cta-ribbon">
            <div className="resume-cta-content">
              <span className="resume-cta-kicker">OPPORTUNITIES &amp; COLLABORATIONS</span>
              <p className="resume-cta-text">
                Interested in discussing summer internships, technical AI/ML engineering roles, or research prototypes?
              </p>
            </div>
            <div className="resume-cta-actions">
              <a href="#contact" className="btn-resume-cta-primary" id="resume-btn-contact">
                <span>Discuss Opportunities</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={RESUME_DATA.pdfUrl}
                download="Sahith_M_Resume.pdf"
                className="btn-resume-cta-secondary"
                id="resume-btn-quick-download"
                title="Download Placement PDF"
              >
                <span>Download PDF</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
