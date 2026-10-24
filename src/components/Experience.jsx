import React, { useState } from 'react';
import { CAREER_STATUS, RESUME_DATA } from '../data-store.js';

const TRAJECTORY_MILESTONES = [
  {
    id: 'm1',
    category: 'academic',
    year: '2024 – PRESENT',
    phase: 'PHASE 01 // FOUNDATIONS',
    title: 'B.Tech in Artificial Intelligence & Data Science',
    org: 'Saveetha Engineering College (Autonomous), Chennai',
    desc: 'Began undergraduate engineering focusing on procedural C, memory pointers, operating systems syscalls, algorithmic data structures, and database management systems.',
    status: 'Currently 3rd Year • CGPA 7.5 / 10',
    tags: ['Procedural C', 'Data Structures & Algorithms', 'DBMS', 'OS Primitives']
  },
  {
    id: 'm2',
    category: 'ml',
    year: '2025',
    phase: 'PHASE 02 // DATA & MODELS',
    title: 'Deep Learning & Empirical ML Modeling',
    org: 'Applied Coursework & Specialized Certifications',
    desc: 'Completed Coursera PyTorch Ultimate Specialization (Packt) and Infosys Springboard RNN architectures. Engineered statistical regression pipelines, CNN feature extraction, and time-series models with cross-validated error bounds.',
    status: 'Verified Credential Portfolio',
    tags: ['PyTorch', 'Scikit-learn', 'NumPy', 'Pandas', 'OpenCV']
  },
  {
    id: 'm3',
    category: 'hackathons',
    year: '2025 – 2026',
    phase: 'PHASE 03 // HIGH-STAKES CREATION',
    title: 'National-Level Hackathon Honors & Prototyping',
    org: 'Competitive Software & AI Hackathons',
    desc: 'Won 3rd Prize in the Software Category at a National-Level Hackathon. Shortlisted among the Top 15 teams at the prestigious VIT Vellore national hackathon for developing AEGIS-TWIN, an autonomous cyber digital twin with graph-based minimum-cut defense.',
    status: '3rd Prize National Winner • Top 15 Shortlist (VIT)',
    tags: ['AEGIS-TWIN', 'Probe360', 'Mule Matrix', 'FastAPI', 'NetworkX']
  },
  {
    id: 'm4',
    category: 'industry',
    year: '2026 – 2027',
    phase: 'PHASE 04 // EVOLUTION & INDUSTRY',
    title: 'Pre-Professional Industry Availability',
    org: 'Open for Summer/Fall Technical Internships & Engineering Roles',
    desc: 'Actively seeking technical internships and entry-level positions in applied AI/ML engineering, Python/FastAPI backend services, and systems analysis. Available for remote, hybrid, or on-site roles in Chennai or across India.',
    status: 'Ready for Immediate Engagement • Placement Drive',
    tags: ['AI/ML Engineer Intern', 'Backend Developer (FastAPI)', 'Systems Analyst']
  }
];

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredMilestones = TRAJECTORY_MILESTONES.filter((m) => {
    if (activeFilter === 'all') return true;
    return m.category === activeFilter;
  });

  return (
    <section className="trajectory-section" id="experience" aria-labelledby="trajectory-title">
      <div className="trajectory-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot" />
            <span className="section-kicker">STAGE 04 // EVOLUTION &bull; TRAJECTORY &amp; ACHIEVEMENTS</span>
          </div>
          <h2 className="section-title" id="trajectory-title">
            Engineering <span className="accent-text">Trajectory &amp; Milestones</span>
          </h2>
          <p className="section-subtitle">
            Documenting academic foundations, rigorous self-directed ML exploration,
            national hackathon honors, and current industry availability.
          </p>
        </div>

        {/* Milestone Filter Toolbar */}
        <div className="trajectory-toolbar">
          <div className="trajectory-filters" role="tablist" aria-label="Filter milestones">
            <button
              type="button"
              className={`timeline-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
              role="tab"
              aria-selected={activeFilter === 'all'}
            >
              All Milestones ({TRAJECTORY_MILESTONES.length})
            </button>
            <button
              type="button"
              className={`timeline-filter-btn ${activeFilter === 'hackathons' ? 'active' : ''}`}
              onClick={() => setActiveFilter('hackathons')}
              role="tab"
              aria-selected={activeFilter === 'hackathons'}
            >
              Hackathon Honors
            </button>
            <button
              type="button"
              className={`timeline-filter-btn ${activeFilter === 'academic' ? 'active' : ''}`}
              onClick={() => setActiveFilter('academic')}
              role="tab"
              aria-selected={activeFilter === 'academic'}
            >
              Academics
            </button>
            <button
              type="button"
              className={`timeline-filter-btn ${activeFilter === 'industry' ? 'active' : ''}`}
              onClick={() => setActiveFilter('industry')}
              role="tab"
              aria-selected={activeFilter === 'industry'}
            >
              Industry Availability
            </button>
          </div>
        </div>

        {/* Vertical Timeline Tree */}
        <div className="trajectory-tree">
          <div className="trajectory-spine-line" aria-hidden="true" />

          {filteredMilestones.map((item, idx) => (
            <article key={item.id} className="trajectory-item">
              <div className="trajectory-marker">
                <span className="marker-dot" />
                <span className="marker-num">0{idx + 1}</span>
              </div>

              <div className="trajectory-card">
                <div className="trajectory-card-header">
                  <div className="trajectory-phase-strip">
                    <span className="phase-tag">{item.phase}</span>
                    <span
                      className="year-tag"
                      dangerouslySetInnerHTML={{ __html: item.year }}
                    />
                  </div>
                  <h3 className="trajectory-item-title">{item.title}</h3>
                  <div className="trajectory-item-org">{item.org}</div>
                </div>

                <p className="trajectory-item-desc">{item.desc}</p>

                <div className="trajectory-card-footer">
                  <span
                    className="trajectory-status-badge"
                    dangerouslySetInnerHTML={{ __html: item.status }}
                  />
                  <div className="trajectory-chips">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="trajectory-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Placement Callout Banner */}
        <div className="trajectory-availability-card">
          <div className="availability-beacon" />
          <div className="availability-body">
            <h4 className="availability-heading">Ready for Technical Internships &amp; Placement Drives</h4>
            <p className="availability-p">
              Target roles: <strong>AI/ML Engineer Intern</strong>, <strong>Backend Developer (Python/FastAPI)</strong>, and <strong>Systems/Security Analyst</strong>.
              Based in Chennai, India (open to remote or on-site relocation).
            </p>
          </div>
          <div className="availability-actions">
            <a href="#contact" className="btn-avail-primary">
              <span>Initiate Contact →</span>
            </a>
            <a href="#resume" className="btn-avail-secondary">
              <span>View Full CV ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
