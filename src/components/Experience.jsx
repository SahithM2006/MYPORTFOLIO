import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES, CAREER_STATUS, RESUME_DATA } from '../data-store.js';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressLineRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // GSAP Pinned Horizontal Scroll (Inspired by Reference Video Image 4)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 860;

    if (prefersReducedMotion || isMobile || !sectionRef.current || !trackRef.current) {
      return;
    }

    const sectionEl = sectionRef.current;
    const trackEl = trackRef.current;

    const ctx = gsap.context(() => {
      // Calculate total horizontal travel distance
      const getScrollAmount = () => -(trackEl.scrollWidth - window.innerWidth + 200);

      const horizontalTween = gsap.to(trackEl, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: () => `+=${trackEl.scrollWidth - window.innerWidth + 600}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressLineRef.current) {
              progressLineRef.current.style.transform = `scaleX(${self.progress})`;
            }
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hasVerifiedExperiences = EXPERIENCES && EXPERIENCES.length > 0;

  return (
    <section
      className="horizontal-timeline-section"
      id="experience"
      ref={sectionRef}
      aria-labelledby="timeline-headline"
    >
      {/* Background Section Watermark */}
      <div className="section-bg-watermark watermark-experience" aria-hidden="true">
        05 // TRAJECTORY
      </div>

      {/* Top Header & Progress Ribbon (Image 4 Reference) */}
      <div className="timeline-top-ribbon">
        <div className="ribbon-kicker-group">
          <span className="ribbon-kicker-dot" />
          <span className="ribbon-kicker-text">ORIGIN &amp; FOUNDATIONS</span>
          <span className="ribbon-kicker-sep">•</span>
          <span className="ribbon-kicker-sub">ACADEMIC &amp; COMPETITIVE MILESTONES</span>
        </div>
        <div className="ribbon-progress-track" aria-hidden="true">
          <div className="ribbon-progress-bar" ref={progressLineRef} />
        </div>
        <div className="ribbon-chapter-tag">STAGE 02 // UNDERSTANDING</div>
      </div>

      {/* Main Pinned Stage: Persistent Column on Left + Horizontal Track on Right */}
      <div className="timeline-stage-wrapper">
        {/* Persistent Column on Left (Image 4 Reference) */}
        <aside className="timeline-persistent-col">
          <div className="persistent-headline-wrap">
            <h2 className="persistent-title" id="timeline-headline">
              <span className="title-row">WHERE</span>
              <span className="title-row">I&apos;VE</span>
              <span className="title-row title-accent">BEEN</span>
            </h2>
            <div className="persistent-echo-shadow" aria-hidden="true">
              WHERE I&apos;VE BEEN
            </div>
          </div>

          <p className="persistent-desc">
            Documenting foundational academic engineering, national hackathon prototypes, and industry availability.
          </p>

          {/* Quick Filter / Milestone Pills */}
          <div className="persistent-filter-pills" role="tablist" aria-label="Filter milestones">
            <button
              type="button"
              className={`timeline-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
              role="tab"
              aria-selected={activeFilter === 'all'}
            >
              ALL MILESTONES
            </button>
            <button
              type="button"
              className={`timeline-filter-btn ${activeFilter === 'academic' ? 'active' : ''}`}
              onClick={() => setActiveFilter('academic')}
              role="tab"
              aria-selected={activeFilter === 'academic'}
            >
              ACADEMIC
            </button>
            <button
              type="button"
              className={`timeline-filter-btn ${activeFilter === 'hackathon' ? 'active' : ''}`}
              onClick={() => setActiveFilter('hackathon')}
              role="tab"
              aria-selected={activeFilter === 'hackathon'}
            >
              HACKATHONS
            </button>
          </div>

          <div className="persistent-footer-badge">
            <span className="badge-dot-live" />
            <span>STATUS: OPEN TO 2026 INTERNSHIPS</span>
          </div>
        </aside>

        {/* Horizontal Moving Track (Image 4 Reference) */}
        <div className="timeline-horizontal-viewport">
          <div className="timeline-horizontal-track" ref={trackRef}>
            {/* Oversized Background Parallax Watermarks */}
            <div className="timeline-bg-track-watermarks" aria-hidden="true">
              <span className="track-watermark-txt">2024</span>
              <span className="track-watermark-txt">SELF-DIRECTED</span>
              <span className="track-watermark-txt">2025</span>
              <span className="track-watermark-txt">HACKATHONS</span>
              <span className="track-watermark-txt">2026</span>
              <span className="track-watermark-txt">PRODUCTION</span>
            </div>

            {/* If verified corporate employment experiences exist */}
            {hasVerifiedExperiences ? (
              EXPERIENCES.map((exp, index) => {
                const itemNum = String(index + 1).padStart(2, '0');
                return (
                  <article key={exp.id || index} className="timeline-card-panel">
                    <div className="panel-kicker-strip">
                      <span className="panel-year-pill">{exp.period || '2024–2026'}</span>
                      <span className="panel-category-tag">{exp.employmentType || 'Engineering'}</span>
                      <span className="panel-num">#{itemNum}</span>
                    </div>

                    <h3 className="panel-headline">{exp.role}</h3>
                    <h4 className="panel-org">at {exp.organization}</h4>
                    {exp.location && <div className="panel-loc">📍 {exp.location}</div>}

                    <div className="panel-body">
                      {exp.responsibilities?.map((resp, rIdx) => (
                        <p key={rIdx} className="panel-resp-item">
                          <span className="bullet">▸</span> {resp}
                        </p>
                      ))}
                    </div>

                    {exp.skills?.length > 0 && (
                      <div className="panel-skills-chips">
                        {exp.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="exp-chip">{skill}</span>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })
            ) : (
              /* Verified Genuine Experience & Trajectory Panels (Verbatim Content) */
              <>
                {/* Panel 01: Academic Pre-Professional Foundation */}
                <article
                  className={`timeline-card-panel ${
                    activeFilter !== 'all' && activeFilter !== 'academic' ? 'panel-dimmed' : ''
                  }`}
                  id="timeline-panel-01"
                >
                  <div className="panel-kicker-strip">
                    <span className="panel-year-pill">{CAREER_STATUS.academicPeriod} // ACADEMIC FOUNDATION</span>
                    <span className="panel-num">#01</span>
                  </div>

                  <h3 className="panel-headline">PRE-PROFESSIONAL FOUNDATION</h3>
                  <h4 className="panel-org">Saveetha Engineering College (Autonomous)</h4>
                  <div className="panel-meta-row">
                    <span className="panel-meta-tag">B.Tech in AI &amp; DS (3rd Year)</span>
                    <span className="panel-meta-dot">•</span>
                    <span className="panel-meta-tag">CGPA: {CAREER_STATUS.cgpa}</span>
                    <span className="panel-meta-dot">•</span>
                    <span className="panel-meta-tag">📍 {CAREER_STATUS.location.split('(')[0].trim()}</span>
                  </div>

                  <div className="panel-body">
                    <p className="panel-resp-item">
                      <span className="bullet">▸</span>
                      <span>
                        Pursuing B.Tech in AI &amp; DS (3rd Year). Formal internships and corporate roles will be indexed here as they commence.
                      </span>
                    </p>
                    <p className="panel-resp-item">
                      <span className="bullet">▸</span>
                      <span>
                        Current competencies: procedural C fundamentals, async Python backends (FastAPI), ML pipelines, and remote systems telemetry (WinRM).
                      </span>
                    </p>
                  </div>

                  {/* Highlighted Milestones (Image 4 Reference) */}
                  <div className="panel-milestones-row">
                    <div className="milestone-box">
                      <span className="milestone-label">MILESTONE 01</span>
                      <p className="milestone-text">Completed 500+ hours of hands-on systems, ML, and backend development.</p>
                    </div>
                    <div className="milestone-box">
                      <span className="milestone-label">MILESTONE 02</span>
                      <p className="milestone-text">Maintained consistent academic excellence (8.44 CGPA) across advanced AI &amp; DS coursework.</p>
                    </div>
                  </div>

                  <div className="panel-skills-chips" aria-label="Core Competencies">
                    <span className="exp-chip">AI &amp; Machine Learning</span>
                    <span className="exp-chip">FastAPI &amp; REST</span>
                    <span className="exp-chip">Python Telemetry</span>
                    <span className="exp-chip">PostgreSQL</span>
                    <span className="exp-chip">Docker</span>
                  </div>
                </article>

                {/* Panel 02: Competitive Engineering & National Hackathons */}
                <article
                  className={`timeline-card-panel ${
                    activeFilter !== 'all' && activeFilter !== 'hackathon' ? 'panel-dimmed' : ''
                  }`}
                  id="timeline-panel-02"
                >
                  <div className="panel-kicker-strip">
                    <span className="panel-year-pill">2024–2025 // COMPETITIVE PROTOTYPING</span>
                    <span className="panel-num">#02</span>
                  </div>

                  <h3 className="panel-headline">HACKATHON HONORS &amp; WINNER</h3>
                  <h4 className="panel-org">National-Level Engineering Competitions</h4>
                  <div className="panel-meta-row">
                    <span className="panel-meta-tag">Competitive Engineering</span>
                    <span className="panel-meta-dot">•</span>
                    <span className="panel-meta-tag">Software Track Winner</span>
                    <span className="panel-meta-dot">•</span>
                    <span className="panel-meta-tag">📍 National Hackathons</span>
                  </div>

                  <div className="panel-body">
                    {RESUME_DATA.achievements.map((ach, aIdx) => (
                      <p key={aIdx} className="panel-resp-item">
                        <span className="bullet star-bullet">★</span>
                        <span>{ach}</span>
                      </p>
                    ))}
                    <p className="panel-resp-item">
                      <span className="bullet">▸</span>
                      <span>
                        Architected and prototyped solutions under competitive constraints, including AEGIS-TWIN (Cybersecurity Digital Twin, shortlisted for the next round at VIT Vellore) and Probe360 (Agentless Vulnerability Assessment Platform).
                      </span>
                    </p>
                  </div>

                  {/* Highlighted Milestones (Image 4 Reference) */}
                  <div className="panel-milestones-row">
                    <div className="milestone-box">
                      <span className="milestone-label">MILESTONE 01</span>
                      <p className="milestone-text">Shortlisted for next round at VIT Vellore for AEGIS-TWIN (Cybersecurity Digital Twin).</p>
                    </div>
                    <div className="milestone-box">
                      <span className="milestone-label">MILESTONE 02</span>
                      <p className="milestone-text">State-level Hackathon Winner (Software Track) for real-time telemetry systems.</p>
                    </div>
                  </div>

                  <div className="panel-skills-chips" aria-label="Competitive Technologies">
                    <span className="exp-chip">Python</span>
                    <span className="exp-chip">NetworkX</span>
                    <span className="exp-chip">FastAPI</span>
                    <span className="exp-chip">WinRM</span>
                    <span className="exp-chip">MITRE ATT&amp;CK</span>
                    <span className="exp-chip">Machine Learning</span>
                  </div>
                </article>

                {/* Panel 03: Industry Readiness & Target Opportunities */}
                <article
                  className={`timeline-card-panel panel-prospective ${
                    activeFilter !== 'all' ? 'panel-dimmed' : ''
                  }`}
                  id="timeline-panel-03"
                >
                  <div className="panel-kicker-strip">
                    <span className="panel-year-pill active-pill">{CAREER_STATUS.availability} // TARGET ROLES</span>
                    <span className="panel-num">#03</span>
                  </div>

                  <h3 className="panel-headline">TECHNICAL INTERNSHIP &amp; ENTRY-LEVEL ROLES</h3>
                  <h4 className="panel-org">Immediate Engineering Opportunities</h4>
                  <div className="panel-meta-row">
                    <span className="panel-meta-tag">Available for Hire</span>
                    <span className="panel-meta-dot">•</span>
                    <span className="panel-meta-tag">Ready for Assessments</span>
                    <span className="panel-meta-dot">•</span>
                    <span className="panel-meta-tag">📍 Open to Remote &amp; Relocation</span>
                  </div>

                  <div className="panel-body">
                    <p className="panel-resp-item">
                      <span className="bullet">▸</span>
                      <span>
                        <strong>Target Tracks:</strong> AI &amp; ML Engineering, Python Backend Systems (FastAPI), and Security Telemetry Analytics.
                      </span>
                    </p>
                    <p className="panel-resp-item">
                      <span className="bullet">▸</span>
                      <span>
                        <strong>Availability:</strong> Ready for technical screenings, code assessments, and interviews. Resume and project exhibits available for review.
                      </span>
                    </p>
                  </div>

                  <div className="panel-milestones-row">
                    <div className="milestone-box milestone-accent">
                      <span className="milestone-label">ROLE READINESS</span>
                      <p className="milestone-text">Production code quality, git workflows, Docker containerization, and REST API design.</p>
                    </div>
                  </div>

                  <div className="panel-actions-row">
                    <a
                      href={RESUME_DATA.pdfUrl}
                      download={RESUME_DATA.pdfFilename}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-timeline-action primary"
                      id="timeline-download-resume-btn"
                    >
                      <span>Download Resume (PDF)</span>
                      <span className="btn-icon" aria-hidden="true">&darr;</span>
                    </a>
                    <a href="#contact" className="btn-timeline-action secondary">
                      <span>Initiate Contact &rarr;</span>
                    </a>
                  </div>
                </article>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
