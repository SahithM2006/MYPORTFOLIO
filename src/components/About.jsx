import React, { useState } from 'react';
import { CAREER_STATUS, MINDSET_PILLARS, RESUME_DATA } from '../data-store.js';

export default function About({ onSelectSkill, onSelectProject }) {
  const [activePillarKey, setActivePillarKey] = useState('systems');
  const [activeWaypoint, setActiveWaypoint] = useState(0);

  const activePillar = MINDSET_PILLARS[activePillarKey] || MINDSET_PILLARS.systems;

  const EXPLORATION_WAYPOINTS = [
    {
      step: '01',
      title: 'Procedural C & Memory Primitives',
      subtitle: 'The Solitude of Low-Level Mechanics',
      desc: 'Before touching deep learning or asynchronous web frameworks, I immersed myself in procedural C — understanding memory addresses, stack frames, heap fragmentation, and OS syscalls. This discipline taught me that systems are not abstract magic; every abstraction carries an electrical and architectural cost.',
      primitive: 'Pointers • Dynamic Allocation • Syscalls • Cache Line Locality'
    },
    {
      step: '02',
      title: 'Agentless Windows Telemetry',
      subtitle: 'Questioning Conventional Security Postures',
      desc: 'Observing enterprise IT deploying intrusive binary daemons that consume memory and introduce attack surfaces, I explored native OS capabilities. Windows already provides WinRM over TLS 5986 and CIM/WMI namespaces. Why deploy an agent when the operating system can be queried natively with zero endpoint footprint?',
      primitive: 'WinRM • TLS 5986 • CIM/WMI Classes • CredSSP Authentication'
    },
    {
      step: '03',
      title: 'Temporal Graphs as Reality',
      subtitle: 'From Data Points to Lineage Flow',
      desc: 'Real-world operations — whether money-mule transactions laundering stolen digital rupees or adversaries executing lateral movement across enterprise subnets — are directed graphs evolving across time. Seeing data as graphs unlocked the ability to compute minimum-cut interventions and sever malicious paths mathematically.',
      primitive: 'NetworkX • Directed DAGs • Minimum-Cut Algorithms • Token Lineage'
    }
  ];

  return (
    <section className="about-section is-in-view" id="about" aria-labelledby="about-title">
      <div className="about-container">
        {/* =========================================================================
            STAGE 02: SOLITUDE & INDEPENDENT EXPLORATION
           ========================================================================= */}
        <div className="journey-stage-block" id="exploration">
          <div className="section-header-block">
            <div className="section-kicker-strip">
              <span className="section-kicker-dot" />
              <span className="section-kicker">STAGE 02 // EXPLORATION • SOLITUDE &amp; INDEPENDENT THOUGHT</span>
            </div>
            <h2 className="section-title" id="about-title">
              The Discipline of an <span className="accent-text">Independent Mind</span>
            </h2>
            <p className="section-subtitle">
              True understanding is not gathered from framework tutorials. It begins in quiet solitude — questioning defaults, tracing memory at the metal, and asking why systems behave the way they do.
            </p>
          </div>

          {/* Solitude & Exploration Visual Split */}
          <div className="exploration-layout-grid">
            {/* Left: Narrative & Background */}
            <div className="exploration-narrative-col">
              <div className="narrative-editorial-card">
                <span className="editorial-kicker">PHILOSOPHICAL GROUNDING</span>
                <h3 className="editorial-heading">
                  Building From First Principles, Not Framework Presets
                </h3>
                <p className="editorial-p">
                  I am <strong>Sahith M.</strong>, an undergraduate in Artificial Intelligence &amp; Data Science at <strong>Saveetha Engineering College (Autonomous), Chennai</strong>. My technical journey is shaped by a relentless drive to understand the computational layer underneath high-level frameworks.
                </p>
                <p className="editorial-p">
                  While modern software development often encourages stacking opaque dependencies, my independent exploration led me the other way: inward. How does an operating system kernel dispatch IO? How does a packet traverse an encrypted WinRM session? How does a fraud network conceal capital flow across multi-hop directed graphs?
                </p>

                {/* Academic Context Strip */}
                <div className="exploration-academic-badge">
                  <div className="academic-badge-dot" />
                  <div className="academic-badge-info">
                    <strong>Saveetha Engineering College (Autonomous)</strong>
                    <span>Class of 2024–2028 (3rd Year) • B.Tech AI &amp; DS • CGPA {CAREER_STATUS.cgpa}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Exploration Waypoints */}
            <div className="exploration-waypoints-col">
              <div className="waypoints-container">
                <span className="waypoints-kicker">INDEPENDENT EXPLORATION MILESTONES:</span>

                <div className="waypoints-interactive-list">
                  {EXPLORATION_WAYPOINTS.map((wp, idx) => {
                    const isSelected = activeWaypoint === idx;
                    return (
                      <div
                        key={wp.step}
                        className={`waypoint-card ${isSelected ? 'active' : ''}`}
                        onClick={() => setActiveWaypoint(idx)}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isSelected}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') setActiveWaypoint(idx);
                        }}
                      >
                        <div className="waypoint-card-top">
                          <span className="waypoint-step-num">{wp.step}</span>
                          <strong className="waypoint-step-title">{wp.title}</strong>
                          <span className="waypoint-chevron">{isSelected ? '▾' : '▸'}</span>
                        </div>
                        <span className="waypoint-subtitle">{wp.subtitle}</span>

                        {isSelected && (
                          <div className="waypoint-expanded-content">
                            <p className="waypoint-desc">{wp.desc}</p>
                            <div className="waypoint-primitives-tag">
                              <span className="tag-label">CORE PRIMITIVES:</span>
                              <span className="tag-val">{wp.primitive}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STAGE 03: UNDERSTANDING — CONNECTIONS EMERGE
           ========================================================================= */}
        <div className="journey-stage-block stage-understanding" id="understanding">
          <div className="section-header-block">
            <div className="section-kicker-strip">
              <span className="section-kicker-dot" />
              <span className="section-kicker">STAGE 03 // UNDERSTANDING • CONNECTIONS EMERGE</span>
            </div>
            <h2 className="section-title">
              From Primitives to <span className="accent-text">Architectural Clarity</span>
            </h2>
            <p className="section-subtitle">
              As independent exploration matures, isolated insights connect into an overarching engineering philosophy: four core pillars that guide every system I build.
            </p>
          </div>

          {/* Interactive Mindset Pillars */}
          <div className="about-pillars-container">
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
                  <strong>FOUNDATIONAL PRIMITIVES:</strong> {activePillar.tools}
                </span>
              </div>

              <h3 className="pillar-detail-title">{activePillar.title}</h3>
              <p className="pillar-detail-desc">{activePillar.desc}</p>

              <div className="pillar-principles-block">
                <h4 className="principles-heading">OPERATIONAL PRINCIPLES:</h4>
                <ul className="principles-list">
                  {activePillar.principles.map((pr, idx) => (
                    <li key={idx} className="principle-item">
                      <span className="principle-bullet">•</span>
                      <span>{pr}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coursework Rigor Verification */}
              <div className="about-coursework-footer">
                <span className="coursework-label">VERIFIED ACADEMIC COURSEWORK:</span>
                <div className="coursework-chips">
                  {RESUME_DATA.coursework.map((course, i) => (
                    <span key={i} className="coursework-chip">
                      {course}
                    </span>
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
