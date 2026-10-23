import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES, CAREER_STATUS, RESUME_DATA } from '../data-store.js';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const spineProgressRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate vertical spine progress on natural vertical scroll
      if (spineProgressRef.current) {
        gsap.to(spineProgressRef.current, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 85%',
            scrub: true
          }
        });
      }

      // Staggered reveal for timeline nodes
      const nodes = gsap.utils.toArray('.trajectory-node');
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hasVerifiedExperiences = EXPERIENCES && EXPERIENCES.length > 0;

  return (
    <section
      className="trajectory-vertical-section"
      id="experience"
      ref={sectionRef}
      aria-labelledby="trajectory-headline"
    >
      {/* Background Watermark */}
      <div className="section-bg-watermark watermark-experience" aria-hidden="true">
        05 // TRAJECTORY
      </div>

      <div className="trajectory-container">
        {/* Section Header */}
        <header className="trajectory-header">
          <div className="section-kicker">
            <span className="kicker-dot" />
            <span className="kicker-code">STAGE 02 // UNDERSTANDING</span>
            <span className="kicker-sep">•</span>
            <span className="kicker-label">CAREER &amp; ACADEMIC TRAJECTORY</span>
          </div>

          <div className="trajectory-headline-wrap">
            <h2 className="trajectory-title" id="trajectory-headline">
              WHERE I&apos;VE <span className="title-accent">BEEN</span>
            </h2>
            <p className="trajectory-subtitle">
              Documenting foundational academic engineering, national hackathon prototypes, and industry availability.
            </p>
          </div>

          {/* Milestone Filter Pills */}
          <div className="trajectory-filter-pills" role="tablist" aria-label="Filter trajectory milestones">
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
            <button
              type="button"
              className={`timeline-filter-btn ${activeFilter === 'prospective' ? 'active' : ''}`}
              onClick={() => setActiveFilter('prospective')}
              role="tab"
              aria-selected={activeFilter === 'prospective'}
            >
              TARGET ROLES (2026)
            </button>
          </div>
        </header>

        {/* Vertical Timeline Track */}
        <div className="trajectory-timeline-flow">
          {/* Continuous Vertical Spine */}
          <div className="trajectory-spine-track" aria-hidden="true">
            <div className="trajectory-spine-fill" ref={spineProgressRef} />
          </div>

          <div className="trajectory-nodes-stream">
            {hasVerifiedExperiences ? (
              EXPERIENCES.map((exp, index) => {
                const itemNum = String(index + 1).padStart(2, '0');
                return (
                  <article key={exp.id || index} className="trajectory-node">
                    <div className="node-marker">
                      <div className="node-marker-dot" />
                      <span className="node-marker-num">#{itemNum}</span>
                    </div>

                    <div className="node-content-card">
                      <div className="panel-kicker-strip">
                        <span className="panel-year-pill">{exp.period || '2024–2026'}</span>
                        <span className="panel-category-tag">{exp.employmentType || 'Engineering'}</span>
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
                    </div>
                  </article>
                );
              })
            ) : (
              <>
                {/* Node 01: Academic Pre-Professional Foundation */}
                <article
                  className={`trajectory-node ${
                    activeFilter !== 'all' && activeFilter !== 'academic' ? 'node-dimmed' : ''
                  }`}
                  id="trajectory-node-01"
                >
                  <div className="node-marker">
                    <div className="node-marker-dot" />
                    <span className="node-marker-num">#01</span>
                  </div>

                  <div className="node-content-card">
                    <div className="panel-kicker-strip">
                      <span className="panel-year-pill">{CAREER_STATUS.academicPeriod} // ACADEMIC FOUNDATION</span>
                      <span className="panel-category-tag">UNDERGRADUATE</span>
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
                  </div>
                </article>

                {/* Node 02: Competitive Engineering & National Hackathons */}
                <article
                  className={`trajectory-node ${
                    activeFilter !== 'all' && activeFilter !== 'hackathon' ? 'node-dimmed' : ''
                  }`}
                  id="trajectory-node-02"
                >
                  <div className="node-marker">
                    <div className="node-marker-dot node-marker-gold" />
                    <span className="node-marker-num">#02</span>
                  </div>

                  <div className="node-content-card">
                    <div className="panel-kicker-strip">
                      <span className="panel-year-pill active-pill">2024–2025 // COMPETITIVE PROTOTYPING</span>
                      <span className="panel-category-tag">HONORS &amp; AWARDS</span>
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
                  </div>
                </article>

                {/* Node 03: Industry Readiness & Target Opportunities */}
                <article
                  className={`trajectory-node ${
                    activeFilter !== 'all' && activeFilter !== 'prospective' ? 'node-dimmed' : ''
                  }`}
                  id="trajectory-node-03"
                >
                  <div className="node-marker">
                    <div className="node-marker-dot node-marker-live" />
                    <span className="node-marker-num">#03</span>
                  </div>

                  <div className="node-content-card node-prospective">
                    <div className="panel-kicker-strip">
                      <span className="panel-year-pill active-pill">{CAREER_STATUS.availability} // TARGET ROLES</span>
                      <span className="panel-category-tag live-tag">IMMEDIATELY AVAILABLE</span>
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
                      <div className="milestone-box">
                        <span className="milestone-label">IMMEDIATE IMPACT</span>
                        <p className="milestone-text">Proven self-starter who writes structured, documented, and resilient systems code.</p>
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
