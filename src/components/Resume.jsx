import React, { useState, useEffect } from 'react';
import { RESUME_DATA } from '../data-store.js';

export default function Resume() {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'pdf'

  // Close modal on Escape key
  useEffect(() => {
    if (!showPdfModal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowPdfModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPdfModal]);

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
            <div>
              <h2 className="section-title" id="resume-title">Resume &amp; Profile</h2>
              <p className="section-subtitle">
                Official placement resume reflecting verified academic coursework, hackathon prototypes, and technical domains.
              </p>
            </div>

            {/* Prominent Action Controls */}
            <div className="resume-action-buttons">
              <a
                href={RESUME_DATA.pdfUrl}
                download={RESUME_DATA.pdfFilename}
                className="btn-resume-download"
                title="Download Placement Resume (PDF)"
                id="download-resume-btn"
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

              <button
                type="button"
                className="btn-resume-view"
                onClick={() => setShowPdfModal(true)}
                title="View Resume in Fullscreen Modal"
                id="view-resume-modal-btn"
              >
                <span className="resume-btn-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <span className="resume-btn-text">
                  <strong>View Resume</strong>
                  <small>Interactive Document Viewer</small>
                </span>
              </button>

              <a
                href={RESUME_DATA.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-resume-external"
                title="Open resume PDF in a new browser tab"
              >
                <span className="resume-btn-icon" aria-hidden="true">↗</span>
                <span className="resume-btn-text">
                  <strong>Open Tab</strong>
                  <small>Direct PDF URL</small>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* View Mode Toggle: Interactive Split / Embedded */}
        <div className="resume-view-switcher" role="tablist" aria-label="Resume view options">
          <button
            type="button"
            className={`resume-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            ATS Summary &amp; Structured Profile
          </button>
          <button
            type="button"
            className={`resume-tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'pdf'}
            onClick={() => setActiveTab('pdf')}
          >
            Embedded PDF Document
          </button>
        </div>

        {/* Content Panel 1: Structured ATS-Aligned View */}
        {activeTab === 'overview' && (
          <div className="resume-content-grid">
            {/* Left Column: Education & Skills */}
            <div className="resume-col resume-col-primary">
              {/* Education Card */}
              <div className="resume-card resume-education-card">
                <div className="resume-card-kicker">ACADEMIC CREDENTIALS</div>
                <h3 className="resume-card-title">{RESUME_DATA.education.institution}</h3>
                <div className="resume-meta-badge-row">
                  <span className="resume-badge-item degree">{RESUME_DATA.education.degree}</span>
                  <span className="resume-badge-item period">{RESUME_DATA.education.period}</span>
                  <span className="resume-badge-item status">{RESUME_DATA.education.status}</span>
                </div>
                <div className="resume-cgpa-highlight">
                  <span className="cgpa-label">Cumulative Grade Point Average</span>
                  <strong className="cgpa-score">{RESUME_DATA.education.cgpa}</strong>
                </div>

                <div className="resume-schooling-list">
                  {RESUME_DATA.education.schooling.map((item, idx) => (
                    <div key={idx} className="resume-schooling-item">
                      <span className="schooling-name">{item.standard}</span>
                      <strong className="schooling-score">{item.score}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Core Skills */}
              <div className="resume-card resume-skills-card">
                <div className="resume-card-kicker">TECHNICAL CORE MATRIX</div>
                <h3 className="resume-card-title">Placement Competencies</h3>

                <div className="resume-skill-group">
                  <span className="skill-group-label">Languages:</span>
                  <div className="skill-pills-wrap">
                    {RESUME_DATA.skills.languages.map((l) => (
                      <span key={l} className="resume-pill highlight">{l}</span>
                    ))}
                  </div>
                </div>

                <div className="resume-skill-group">
                  <span className="skill-group-label">AI &amp; Data Science:</span>
                  <div className="skill-pills-wrap">
                    {RESUME_DATA.skills.aiData.map((s) => (
                      <span key={s} className="resume-pill">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="resume-skill-group">
                  <span className="skill-group-label">Libraries &amp; Frameworks:</span>
                  <div className="skill-pills-wrap">
                    {RESUME_DATA.skills.libraries.map((l) => (
                      <span key={l} className="resume-pill">{l}</span>
                    ))}
                  </div>
                </div>

                <div className="resume-skill-group">
                  <span className="skill-group-label">Backend &amp; Infrastructure:</span>
                  <div className="skill-pills-wrap">
                    {RESUME_DATA.skills.backendDev.map((b) => (
                      <span key={b} className="resume-pill">{b}</span>
                    ))}
                  </div>
                </div>

                <div className="resume-skill-group">
                  <span className="skill-group-label">Tools &amp; Environments:</span>
                  <div className="skill-pills-wrap">
                    {RESUME_DATA.skills.tools.map((t) => (
                      <span key={t} className="resume-pill">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="resume-skill-group">
                  <span className="skill-group-label">Specialized Domains:</span>
                  <div className="skill-pills-wrap">
                    {RESUME_DATA.skills.domains.map((d) => (
                      <span key={d} className="resume-pill domain">{d}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="resume-card resume-achievements-card">
                <div className="resume-card-kicker">COMPETITIVE HONORS</div>
                <h3 className="resume-card-title">Hackathon Achievements</h3>
                <ul className="resume-achievements-list">
                  {RESUME_DATA.achievements.map((ach, idx) => (
                    <li key={idx} className="resume-achievement-item">
                      <span className="achievement-icon" aria-hidden="true">★</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Projects & Relevant Coursework */}
            <div className="resume-col resume-col-secondary">
              {/* Projects Card */}
              <div className="resume-card resume-projects-card">
                <div className="resume-card-kicker">HACKATHON &amp; TECHNICAL PROJECTS</div>
                <h3 className="resume-card-title">Placement Project Highlights</h3>

                <div className="resume-project-items">
                  {RESUME_DATA.projects.map((proj, idx) => (
                    <div key={idx} className="resume-project-item">
                      <div className="resume-proj-header">
                        <h4 className="resume-proj-title">{proj.title}</h4>
                        <span className="resume-proj-domain">{proj.domain}</span>
                      </div>
                      <ul className="resume-proj-bullets">
                        {proj.points.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relevant Coursework */}
              <div className="resume-card resume-coursework-card">
                <div className="resume-card-kicker">ACADEMIC FOUNDATION</div>
                <h3 className="resume-card-title">Relevant Coursework</h3>
                <div className="resume-coursework-grid">
                  {RESUME_DATA.coursework.map((course, idx) => (
                    <div key={idx} className="coursework-chip">
                      <span className="coursework-bullet" aria-hidden="true">▸</span>
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Panel 2: Embedded Document View */}
        {activeTab === 'pdf' && (
          <div className="resume-pdf-embedded-wrapper">
            <div className="resume-pdf-toolbar">
              <span className="resume-pdf-meta-label">
                Official Document: <strong>{RESUME_DATA.pdfFilename}</strong>
              </span>
              <div className="resume-pdf-toolbar-actions">
                <a
                  href={RESUME_DATA.pdfUrl}
                  download={RESUME_DATA.pdfFilename}
                  className="btn-toolbar-download"
                >
                  Download PDF ↓
                </a>
                <a
                  href={RESUME_DATA.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-toolbar-external"
                >
                  Full Window ↗
                </a>
              </div>
            </div>

            <div className="resume-iframe-container">
              <iframe
                src={`${RESUME_DATA.pdfUrl}#view=FitH`}
                title="Sahith M Placement Resume PDF"
                className="resume-pdf-iframe"
              />
            </div>

            <div className="resume-mobile-notice">
              <p>
                Mobile browser? You can view or download the complete PDF directly:
              </p>
              <div className="mobile-notice-btns">
                <a href={RESUME_DATA.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-mobile-view">
                  View PDF in Browser ↗
                </a>
                <a href={RESUME_DATA.pdfUrl} download={RESUME_DATA.pdfFilename} className="btn-mobile-dl">
                  Save PDF Locally ↓
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen PDF Modal Viewer */}
      {showPdfModal && (
        <div
          className="resume-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          onClick={() => setShowPdfModal(false)}
        >
          <div className="resume-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <div className="resume-modal-title-wrap">
                <span className="resume-platform-pill">OFFICIAL PLACEMENT CV</span>
                <h3 id="resume-modal-title" className="resume-modal-title">
                  {RESUME_DATA.name} — Placement Resume
                </h3>
              </div>
              <button
                type="button"
                className="resume-modal-close"
                onClick={() => setShowPdfModal(false)}
                aria-label="Close resume viewer"
              >
                ✕
              </button>
            </div>

            <div className="resume-modal-body">
              <iframe
                src={`${RESUME_DATA.pdfUrl}#view=FitH`}
                title="Sahith M Resume Viewer"
                className="resume-modal-iframe"
              />
            </div>

            <div className="resume-modal-footer">
              <div className="resume-modal-meta">
                <span>File: <strong>{RESUME_DATA.pdfFilename}</strong></span>
                <span>Location: <strong>{RESUME_DATA.location}</strong></span>
              </div>
              <div className="resume-modal-actions">
                <a
                  href={RESUME_DATA.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-modal-open"
                >
                  Open in New Tab ↗
                </a>
                <a
                  href={RESUME_DATA.pdfUrl}
                  download={RESUME_DATA.pdfFilename}
                  className="btn-modal-download"
                >
                  Download PDF ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
