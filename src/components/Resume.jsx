import React, { useState, useEffect } from 'react';
import { RESUME_DATA } from '../data-store.js';

export default function Resume() {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'overview' | 'pdf'
  const [zoomLevel, setZoomLevel] = useState(100);
  const [modalViewType, setModalViewType] = useState('image'); // 'image' | 'object'

  // Close modal on Escape key
  useEffect(() => {
    if (!showPdfModal) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowPdfModal(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPdfModal]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 15, 160));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 15, 70));
  const handleZoomReset = () => setZoomLevel(100);

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
                  <strong>Fullscreen View</strong>
                  <small>Interactive Document Viewer</small>
                </span>
              </button>

              <a
                href={RESUME_DATA.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-resume-external"
                title="Open resume PDF directly in a new browser tab"
              >
                <span className="resume-btn-icon" aria-hidden="true">↗</span>
                <span className="resume-btn-text">
                  <strong>Direct PDF</strong>
                  <small>Open in New Tab</small>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* View Mode Toggle: Document Preview / ATS Structured / Embedded Engine */}
        <div className="resume-view-switcher" role="tablist" aria-label="Resume view options">
          <button
            type="button"
            className={`resume-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'preview'}
            onClick={() => setActiveTab('preview')}
            id="tab-resume-preview"
          >
            Document Preview (Verified PDF)
          </button>
          <button
            type="button"
            className={`resume-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            id="tab-resume-overview"
          >
            ATS Structured Profile
          </button>
          <button
            type="button"
            className={`resume-tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === 'pdf'}
            onClick={() => setActiveTab('pdf')}
            id="tab-resume-pdf"
          >
            Embedded PDF Engine
          </button>
        </div>

        {/* Content Panel 1: Default Document Preview (Never Blank on any browser) */}
        {activeTab === 'preview' && (
          <div className="resume-preview-layout">
            <div className="resume-preview-frame">
              <div className="resume-preview-toolbar">
                <span className="resume-doc-badge">
                  <span className="section-kicker-dot" style={{ width: 6, height: 6 }} />
                  OFFICIAL PLACEMENT CV • VERIFIED
                </span>

                <div className="resume-zoom-controls">
                  <button
                    type="button"
                    className="resume-zoom-btn"
                    onClick={handleZoomOut}
                    title="Zoom out"
                    aria-label="Zoom out"
                  >
                    −
                  </button>
                  <span className="resume-zoom-level">{zoomLevel}%</span>
                  <button
                    type="button"
                    className="resume-zoom-btn"
                    onClick={handleZoomIn}
                    title="Zoom in"
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="resume-zoom-btn"
                    onClick={handleZoomReset}
                    title="Reset zoom"
                    style={{ fontSize: '0.7rem', width: 'auto', padding: '0 4px' }}
                  >
                    Reset
                  </button>
                </div>

                <div className="resume-preview-toolbar-actions">
                  <a
                    href={RESUME_DATA.pdfUrl}
                    download={RESUME_DATA.pdfFilename}
                    className="btn-toolbar-download"
                  >
                    Download PDF ↓
                  </a>
                  <button
                    type="button"
                    className="btn-toolbar-external"
                    onClick={() => setShowPdfModal(true)}
                  >
                    Expand ⛶
                  </button>
                </div>
              </div>

              <div className="resume-preview-viewport">
                <div
                  className="resume-preview-sheet"
                  onClick={() => setShowPdfModal(true)}
                  title="Click to view resume in full screen"
                >
                  <img
                    src={RESUME_DATA.previewUrl}
                    alt="Sahith M. Placement Resume Preview"
                    className="resume-preview-img"
                    style={{
                      transform: `scale(${zoomLevel / 100})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.15s ease-out'
                    }}
                  />
                  <div className="resume-preview-overlay-hint">
                    <span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      Click to expand fullscreen
                    </span>
                  </div>
                </div>
              </div>

              <div className="resume-preview-footer">
                <span>
                  Source: <strong>{RESUME_DATA.pdfFilename}</strong> (1 Page • ReportLab Placement Edition)
                </span>
                <div style={{ display: 'flex', gap: 12 }}>
                  <a
                    href={RESUME_DATA.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-amber)', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Open raw PDF in tab ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Quick Verified Snapshot & ATS Link */}
            <div className="resume-preview-sidebar">
              <div className="resume-sidebar-card">
                <div className="resume-sidebar-kicker">CANDIDATE SNAPSHOT</div>
                <h3 className="resume-sidebar-title">{RESUME_DATA.name}</h3>
                <div className="resume-sidebar-meta-list">
                  <div className="resume-sidebar-meta-item">
                    <span className="resume-sidebar-meta-label">Discipline</span>
                    <span className="resume-sidebar-meta-value">B.Tech AI &amp; Data Science</span>
                  </div>
                  <div className="resume-sidebar-meta-item">
                    <span className="resume-sidebar-meta-label">Institution</span>
                    <span className="resume-sidebar-meta-value">Saveetha Engineering College</span>
                  </div>
                  <div className="resume-sidebar-meta-item">
                    <span className="resume-sidebar-meta-label">Status</span>
                    <span className="resume-sidebar-meta-value">3rd Year (2024 – 2028)</span>
                  </div>
                  <div className="resume-sidebar-meta-item">
                    <span className="resume-sidebar-meta-label">Academic CGPA</span>
                    <span className="resume-sidebar-meta-value highlight">7.5 / 10</span>
                  </div>
                  <div className="resume-sidebar-meta-item">
                    <span className="resume-sidebar-meta-label">Location</span>
                    <span className="resume-sidebar-meta-value">Chennai, Tamil Nadu</span>
                  </div>
                </div>
              </div>

              <div className="resume-sidebar-card">
                <div className="resume-sidebar-kicker">CORE PLACEMENT DOMAINS</div>
                <h3 className="resume-sidebar-title">Technical Expertise</h3>
                <div className="skill-pills-wrap" style={{ marginBottom: 16 }}>
                  {['Python', 'C', 'SQL', 'FastAPI', 'Machine Learning', 'Deep Learning', 'PyTorch', 'NetworkX', 'Docker'].map((s) => (
                    <span key={s} className="resume-pill highlight">{s}</span>
                  ))}
                </div>
                <button
                  type="button"
                  className="btn-toolbar-external"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setActiveTab('overview')}
                >
                  View Complete ATS Matrix &amp; Projects →
                </button>
              </div>

              <div className="resume-sidebar-card" style={{ borderLeft: '3px solid var(--color-amber)' }}>
                <div className="resume-sidebar-kicker">DIRECT VERIFIED ACTIONS</div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-slate-muted)', marginBottom: 14 }}>
                  Need an offline copy for corporate placement records or campus recruitment?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <a
                    href={RESUME_DATA.pdfUrl}
                    download={RESUME_DATA.pdfFilename}
                    className="btn-resume-download"
                    style={{ justifyContent: 'center', width: '100%' }}
                  >
                    Download Resume PDF ↓
                  </a>
                  <a
                    href={RESUME_DATA.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-resume-external"
                    style={{ justifyContent: 'center', width: '100%' }}
                  >
                    Open in New Tab ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Panel 2: Structured ATS-Aligned View */}
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

        {/* Content Panel 3: Interactive Embedded Document View */}
        {activeTab === 'pdf' && (
          <div className="resume-pdf-embedded-wrapper">
            <div className="resume-pdf-toolbar">
              <span className="resume-pdf-meta-label">
                Official PDF Document: <strong>{RESUME_DATA.pdfFilename}</strong>
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
              <object
                data={`${RESUME_DATA.pdfUrl}#view=FitH`}
                type="application/pdf"
                className="resume-pdf-iframe"
                title="Sahith M Placement Resume PDF"
              >
                {/* Fallback inside object if browser has no inline PDF plugin */}
                <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-slate-muted)' }}>
                  <p style={{ marginBottom: 16 }}>
                    Direct inline PDF preview is unavailable in this browser environment.
                  </p>
                  <img
                    src={RESUME_DATA.previewUrl}
                    alt="Resume Document"
                    style={{ maxWidth: 420, width: '100%', borderRadius: 8, margin: '0 auto 20px', display: 'block' }}
                  />
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <a href={RESUME_DATA.pdfUrl} download={RESUME_DATA.pdfFilename} className="btn-resume-download">
                      Download PDF
                    </a>
                    <a href={RESUME_DATA.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-resume-external">
                      Open PDF in Tab
                    </a>
                  </div>
                </div>
              </object>
            </div>

            <div className="resume-mobile-notice">
              <p>
                Mobile browser or privacy mode? You can view the document preview or download the raw PDF:
              </p>
              <div className="mobile-notice-btns">
                <button
                  type="button"
                  className="btn-mobile-view"
                  onClick={() => setActiveTab('preview')}
                >
                  Switch to Document Preview
                </button>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="resume-view-switcher" style={{ margin: 0, padding: 3 }}>
                  <button
                    type="button"
                    className={`resume-tab-btn ${modalViewType === 'image' ? 'active' : ''}`}
                    onClick={() => setModalViewType('image')}
                    style={{ padding: '4px 12px', fontSize: '0.76rem' }}
                  >
                    High-Res Document
                  </button>
                  <button
                    type="button"
                    className={`modal-tab-btn resume-tab-btn ${modalViewType === 'object' ? 'active' : ''}`}
                    onClick={() => setModalViewType('object')}
                    style={{ padding: '4px 12px', fontSize: '0.76rem' }}
                  >
                    Native PDF Engine
                  </button>
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
            </div>

            <div className="resume-modal-body" style={{ display: 'flex', justifyContent: 'center', overflow: 'auto', padding: 16 }}>
              {modalViewType === 'image' ? (
                <div style={{ maxWidth: 760, width: '100%', margin: '0 auto', background: '#FFFFFF', borderRadius: 4, boxShadow: '0 12px 36px rgba(0,0,0,0.8)' }}>
                  <img
                    src={RESUME_DATA.previewUrl}
                    alt="Sahith M Placement Resume Full Preview"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              ) : (
                <object
                  data={`${RESUME_DATA.pdfUrl}#view=FitH`}
                  type="application/pdf"
                  className="resume-modal-iframe"
                  title="Sahith M Resume Viewer"
                >
                  <div style={{ padding: 40, textAlign: 'center', color: '#FFFFFF' }}>
                    <p style={{ marginBottom: 16 }}>Native PDF viewer is not active in this browser mode.</p>
                    <button
                      type="button"
                      className="btn-resume-download"
                      onClick={() => setModalViewType('image')}
                    >
                      Switch to High-Res Document View
                    </button>
                  </div>
                </object>
              )}
            </div>

            <div className="resume-modal-footer">
              <div className="resume-modal-meta">
                <span>File: <strong>{RESUME_DATA.pdfFilename}</strong></span>
                <span>Institution: <strong>Saveetha Engineering College</strong></span>
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
