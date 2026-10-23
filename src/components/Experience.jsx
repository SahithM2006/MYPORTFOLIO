import React from 'react';
import { EXPERIENCES, CAREER_STATUS, RESUME_DATA } from '../data-store.js';

export default function Experience() {
  const hasVerifiedExperiences = EXPERIENCES && EXPERIENCES.length > 0;

  return (
    <section
      className="experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      {/* Oversized Cinematic Typography Watermark */}
      <div className="section-bg-watermark watermark-experience" aria-hidden="true">06 // TIMELINE</div>

      <div className="experience-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot experience-kicker-dot" />
            <span className="section-kicker experience-kicker">
              CAREER &amp; INDUSTRY TRAJECTORY
            </span>
          </div>
          <h2 className="section-title experience-title" id="experience-title">
            Professional Experience
          </h2>
          <p className="section-subtitle experience-subtitle">
            A chronological timeline documenting formal engineering roles, technical internships, and professional appointments.
          </p>
        </div>

        {/* Vertical Timeline Layout with Scrubbed Animated Spine */}
        <div className="experience-timeline" role="list" aria-label="Professional Experience Timeline">
          {/* Continuous Animated Timeline Spine Track */}
          <div className="exp-timeline-spine-track" aria-hidden="true">
            <div className="exp-timeline-spine-fill" id="exp-timeline-spine-fill"></div>
            <div className="exp-timeline-spine-glow"></div>
          </div>

          {hasVerifiedExperiences ? (
            /* Rendered when verified employment entries exist in data-store */
            EXPERIENCES.map((exp, index) => {
              const itemNumber = String(index + 1).padStart(2, '0');
              const isLast = index === EXPERIENCES.length - 1;

              return (
                <div key={exp.id || index} className="exp-timeline-item" role="listitem" id={`exp-item-${itemNumber}`}>
                  {/* Subtle Vertical Timeline Rail */}
                  <div className="exp-timeline-rail" aria-hidden="true">
                    <span className="exp-timeline-index">{itemNumber}</span>
                    <span className="exp-timeline-node" id={`exp-node-${itemNumber}`} />
                    <span className="exp-node-pulse-ring" />
                  </div>

                  {/* Clean Content Block */}
                  <div className="exp-timeline-content">
                    <div className="exp-meta-row">
                      {exp.period && (
                        <span className="exp-period-badge">{exp.period}</span>
                      )}
                      {exp.duration && (
                        <span className="exp-duration-text">• {exp.duration}</span>
                      )}
                      {exp.employmentType && (
                        <span className={`exp-type-pill type-${exp.employmentType.toLowerCase().replace(/\s+/g, '-')}`}>
                          {exp.employmentType}
                        </span>
                      )}
                      {exp.location && (
                        <span className="exp-location-tag">📍 {exp.location}</span>
                      )}
                    </div>

                    <h3 className="exp-role-title">
                      {exp.role}{' '}
                      <span className="exp-org-sep">at</span>{' '}
                      <span className="exp-org-name">{exp.organization}</span>
                    </h3>

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="exp-resp-list">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="exp-resp-item">
                            <span className="exp-resp-bullet" aria-hidden="true">▸</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {exp.skills && exp.skills.length > 0 && (
                      <div className="exp-skills-row" aria-label="Technologies used">
                        {exp.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="exp-skill-chip">{skill}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            /*
              Verified Career Trajectory Timeline:
              When no formal corporate employment is recorded yet,
              displays genuine academic engineering milestones and active readiness for roles.
              Does NOT fabricate jobs, companies, or dates, and does NOT falsely label coursework as employment.
            */
            <>
              {/* Timeline Node 1: Current Academic Pre-Professional Trajectory */}
              <div className="exp-timeline-item" role="listitem" id="exp-item-01">
                <div className="exp-timeline-rail" aria-hidden="true">
                  <span className="exp-timeline-index">01</span>
                  <span className="exp-timeline-node" id="exp-node-01" />
                  <span className="exp-node-pulse-ring" />
                </div>

                <div className="exp-timeline-content">
                  <div className="exp-meta-row">
                    <span className="exp-period-badge">{CAREER_STATUS.academicPeriod}</span>
                    <span className="exp-duration-text">• 3rd Year (CGPA: {CAREER_STATUS.cgpa})</span>
                    <span className="exp-type-pill">Undergraduate Candidate</span>
                    <span className="exp-location-tag">📍 {CAREER_STATUS.location.split('(')[0].trim()}</span>
                  </div>

                  <h3 className="exp-role-title">
                    Pre-Professional Foundation{' '}
                    <span className="exp-org-sep">at</span>{' '}
                    <span className="exp-org-name">{CAREER_STATUS.institution}</span>
                  </h3>

                  <ul className="exp-resp-list">
                    <li className="exp-resp-item">
                      <span className="exp-resp-bullet" aria-hidden="true">▸</span>
                      <span>
                        Pursuing B.Tech in AI &amp; DS (3rd Year). Formal internships and corporate roles will be indexed here as they commence.
                      </span>
                    </li>
                    <li className="exp-resp-item">
                      <span className="exp-resp-bullet" aria-hidden="true">▸</span>
                      <span>
                        Current competencies: procedural C fundamentals, async Python backends (FastAPI), ML pipelines, and remote systems telemetry (WinRM).
                      </span>
                    </li>
                  </ul>

                  <div className="exp-skills-row" aria-label="Target Technical Competencies">
                    <span className="exp-skill-chip">AI &amp; Machine Learning</span>
                    <span className="exp-skill-chip">FastAPI &amp; REST</span>
                    <span className="exp-skill-chip">Python Telemetry</span>
                    <span className="exp-skill-chip">PostgreSQL</span>
                    <span className="exp-skill-chip">Docker</span>
                  </div>
                </div>
              </div>

              {/* Timeline Node 2: National-Level Hackathons & Competitive Engineering Prototypes */}
              <div className="exp-timeline-item" role="listitem" id="exp-item-02">
                <div className="exp-timeline-rail" aria-hidden="true">
                  <span className="exp-timeline-index">02</span>
                  <span className="exp-timeline-node" id="exp-node-02" />
                  <span className="exp-node-pulse-ring" />
                </div>

                <div className="exp-timeline-content">
                  <div className="exp-meta-row">
                    <span className="exp-period-badge">2024 – 2025</span>
                    <span className="exp-duration-text">• Hackathon Honors</span>
                    <span className="exp-type-pill type-hackathon">Competitive Engineering</span>
                    <span className="exp-location-tag">📍 National Hackathons</span>
                  </div>

                  <h3 className="exp-role-title">
                    Hackathon Finalist &amp; Software Winner{' '}
                    <span className="exp-org-sep">at</span>{' '}
                    <span className="exp-org-name">National-Level Competitions</span>
                  </h3>

                  <ul className="exp-resp-list">
                    {RESUME_DATA.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="exp-resp-item">
                        <span className="exp-resp-bullet" aria-hidden="true">★</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                    <li className="exp-resp-item">
                      <span className="exp-resp-bullet" aria-hidden="true">▸</span>
                      <span>
                        Architected and prototyped solutions under competitive constraints, including AEGIS-TWIN (Cybersecurity Digital Twin, shortlisted for the next round at VIT Vellore) and Probe360 (Agentless Vulnerability Assessment Platform).
                      </span>
                    </li>
                  </ul>

                  <div className="exp-skills-row" aria-label="Hackathon Technologies">
                    <span className="exp-skill-chip">Python</span>
                    <span className="exp-skill-chip">NetworkX</span>
                    <span className="exp-skill-chip">FastAPI</span>
                    <span className="exp-skill-chip">WinRM</span>
                    <span className="exp-skill-chip">MITRE ATT&amp;CK</span>
                    <span className="exp-skill-chip">Machine Learning</span>
                  </div>
                </div>
              </div>

              {/* Timeline Node 3: Prospective Industry Roles & Availability */}
              <div className="exp-timeline-item" role="listitem" id="exp-item-03">
                <div className="exp-timeline-rail" aria-hidden="true">
                  <span className="exp-timeline-index">03</span>
                  <span className="exp-timeline-node status-active" id="exp-node-03" />
                  <span className="exp-node-pulse-ring" />
                </div>

                <div className="exp-timeline-content prospective-content">
                  <div className="exp-meta-row">
                    <span className="exp-period-badge active-badge">{CAREER_STATUS.availability}</span>
                    <span className="exp-type-pill status-open">Available for Hire</span>
                    <span className="exp-location-tag">📍 Open to Remote &amp; Relocation</span>
                  </div>

                  <h3 className="exp-role-title">
                    Technical Internship &amp; Entry-Level Engineering{' '}
                    <span className="exp-org-sep">•</span>{' '}
                    <span className="exp-org-name">Target Opportunities</span>
                  </h3>

                  <ul className="exp-resp-list">
                    <li className="exp-resp-item">
                      <span className="exp-resp-bullet" aria-hidden="true">▸</span>
                      <span>
                        <strong>Target Tracks:</strong> AI &amp; ML Engineering, Python Backend Systems (FastAPI), and Security Telemetry Analytics.
                      </span>
                    </li>
                    <li className="exp-resp-item">
                      <span className="exp-resp-bullet" aria-hidden="true">▸</span>
                      <span>
                        <strong>Availability:</strong> Ready for technical screenings, code assessments, and interviews. Resume and project exhibits available for review.
                      </span>
                    </li>
                  </ul>

                  <div className="exp-actions-row">
                    <a
                      href={RESUME_DATA.pdfUrl}
                      download={RESUME_DATA.pdfFilename}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="exp-btn-action primary"
                      id="exp-download-resume-btn"
                      title="Download verified placement resume PDF"
                      onClick={(e) => {
                        // Ensure direct trigger if browser blocks attribute
                        if (typeof window !== 'undefined' && window.navigator && window.navigator.msSaveOrOpenBlob) {
                          e.preventDefault();
                          window.open(RESUME_DATA.pdfUrl, '_blank');
                        }
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Download Resume (PDF)</span>
                    </a>

                    <a
                      href="#resume"
                      className="exp-btn-action secondary exp-btn-view-resume"
                      id="exp-view-resume-btn"
                      title="Inspect full resume and document viewer"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <span>View Resume Document →</span>
                    </a>

                    <a
                      href="#contact"
                      className="exp-btn-action secondary"
                      id="exp-contact-btn"
                      title="Navigate to contact section"
                    >
                      <span>Get in Touch →</span>
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

