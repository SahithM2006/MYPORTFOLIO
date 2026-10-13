import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ARCHITECTURE_PROJECTS, getArchitectureProject } from '../architecture-data.js';
import TechIcon from './TechIcons.jsx';

export default function TechnicalArchitecture({
  activeProjectId = 'prj-probe360',
  onSelectProject
}) {
  // Normalize current project ID
  const initialProjectId = activeProjectId ? activeProjectId.replace(/^prj-/, '') : 'probe360';
  const [selectedProjId, setSelectedProjId] = useState(initialProjectId);
  const [activeLayerFilter, setActiveLayerFilter] = useState('all');
  const [activeViewMode, setActiveViewMode] = useState('flow'); // 'flow' | 'layers' | 'audit'
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedTechObj, setSelectedTechObj] = useState(null);

  // Sync when activeProjectId changes from outside
  useEffect(() => {
    if (activeProjectId) {
      const clean = activeProjectId.replace(/^prj-/, '');
      if (clean !== selectedProjId) {
        setSelectedProjId(clean);
        setActiveLayerFilter('all');
        setSelectedNodeId(null);
        setSelectedTechObj(null);
        setActiveStepIdx(0);
      }
    }
  }, [activeProjectId]);

  // Current active project data
  const currentProject = useMemo(() => {
    return ARCHITECTURE_PROJECTS.find((p) => p.id === selectedProjId) || ARCHITECTURE_PROJECTS[0];
  }, [selectedProjId]);

  // Handle project change
  const handleProjectChange = (projId) => {
    setSelectedProjId(projId);
    setActiveLayerFilter('all');
    setSelectedNodeId(null);
    setSelectedTechObj(null);
    setActiveStepIdx(0);
    if (onSelectProject) {
      onSelectProject(`prj-${projId}`);
    }
  };

  // Filtered layers for the selected project
  const filteredLayers = useMemo(() => {
    if (activeLayerFilter === 'all') return currentProject.layers;
    return currentProject.layers.filter((l) => l.id === activeLayerFilter);
  }, [currentProject, activeLayerFilter]);

  // Find all technologies flattened for quick lookup
  const allProjectTechs = useMemo(() => {
    const list = [];
    currentProject.layers.forEach((l) => {
      l.technologies.forEach((t) => {
        list.push({ ...t, layerName: l.name, layerId: l.id });
      });
    });
    return list;
  }, [currentProject]);

  // Handle component inspection
  const handleSelectTech = (tech) => {
    setSelectedTechObj(tech);
    // Also select corresponding node in diagram if any
    const matchingNode = currentProject.flow.nodes.find(
      (n) => n.id.includes(tech.id) || tech.id.includes(n.id.replace('n-', ''))
    );
    if (matchingNode) {
      setSelectedNodeId(matchingNode.id);
    }
  };

  // Keyboard navigation for [1..4]
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable) return;
      const keyMap = {
        '1': 'probe360',
        '2': 'csi-origin',
        '3': 'carbon',
        '4': 'aegis'
      };
      if (keyMap[e.key]) {
        handleProjectChange(keyMap[e.key]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute active connection highlights for flow diagram
  const activeHighlightedLinks = useMemo(() => {
    const targetId = hoveredNodeId || selectedNodeId;
    if (!targetId) return [];
    return currentProject.flow.links.filter(
      (l) => l.from === targetId || l.to === targetId
    );
  }, [hoveredNodeId, selectedNodeId, currentProject]);

  return (
    <section
      className="architecture-section is-in-view"
      id="architecture"
      aria-labelledby="architecture-title"
      style={{ '--project-accent': currentProject.accentColor, '--project-glow': currentProject.accentGlow }}
    >
      <div className="architecture-container">
        {/* Section Header */}
        <div className="section-header-block architecture-header-center">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot architecture-kicker-dot" />
            <span className="section-kicker architecture-kicker">
              SYSTEM DESIGN &amp; IMPLEMENTATION BLUEPRINT
            </span>
          </div>
          <h2 className="section-title architecture-title" id="architecture-title">
            Technical Architecture &amp; Tech Stack
          </h2>
          <p className="section-subtitle architecture-subtitle">
            An engineering-focused explorer detailing verified component layers, technical roles, design rationales, and runtime data flows for my core portfolio projects.
          </p>
        </div>

        {/* Project Selector Tab Navigation */}
        <div className="arch-project-tabs-wrap" role="tablist" aria-label="Select Project Architecture">
          <div className="arch-tabs-hint">
            <span className="arch-hint-kicker">PROJECT ARCHITECTURE EXPLORER:</span>
            <span className="arch-hint-shortcut">Press <kbd>1</kbd>–<kbd>4</kbd> to toggle</span>
          </div>
          <div className="arch-project-tabs-grid">
            {ARCHITECTURE_PROJECTS.map((proj) => {
              const isActive = proj.id === selectedProjId;
              return (
                <button
                  key={proj.id}
                  className={`arch-tab-btn ${isActive ? 'active' : ''}`}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => handleProjectChange(proj.id)}
                  style={{
                    '--tab-accent': proj.accentColor,
                    '--tab-glow': proj.accentGlow
                  }}
                >
                  <div className="arch-tab-meta">
                    <span className="arch-tab-num">{proj.number}</span>
                    <span className="arch-tab-cat">{proj.category}</span>
                  </div>
                  <div className="arch-tab-title">{proj.name}</div>
                  <div className="arch-tab-status-strip">
                    <span className={`arch-status-dot ${proj.statusType}`} />
                    <span className="arch-status-text">{proj.status.split('•')[0].trim()}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Architectural Explorer Canvas */}
        <div className="arch-workbench-card">
          {/* Top Bar: Project Overview & Mode Switcher */}
          <div className="arch-workbench-topbar">
            <div className="arch-topbar-info">
              <div className="arch-title-row">
                <h3 className="arch-project-name">{currentProject.fullTitle}</h3>
                <span className={`arch-badge-status status-${currentProject.statusType}`}>
                  {currentProject.status}
                </span>
              </div>
              <p className="arch-project-lead">{currentProject.lead}</p>
            </div>

            {/* Mode Switcher */}
            <div className="arch-mode-switcher" role="tablist" aria-label="Architecture View Mode">
              <button
                type="button"
                className={`arch-mode-btn ${activeViewMode === 'flow' ? 'active' : ''}`}
                onClick={() => setActiveViewMode('flow')}
                aria-selected={activeViewMode === 'flow'}
                role="tab"
              >
                <TechIcon name="network" size={15} />
                <span>Architecture Flow</span>
              </button>
              <button
                type="button"
                className={`arch-mode-btn ${activeViewMode === 'layers' ? 'active' : ''}`}
                onClick={() => setActiveViewMode('layers')}
                aria-selected={activeViewMode === 'layers'}
                role="tab"
              >
                <TechIcon name="layout" size={15} />
                <span>Layers &amp; Stack ({allProjectTechs.length})</span>
              </button>
              <button
                type="button"
                className={`arch-mode-btn ${activeViewMode === 'audit' ? 'active' : ''}`}
                onClick={() => setActiveViewMode('audit')}
                aria-selected={activeViewMode === 'audit'}
                role="tab"
              >
                <TechIcon name="check-circle" size={15} />
                <span>Verification Audit</span>
              </button>
            </div>
          </div>

          {/* VIEW 1: Interactive System Architecture Flow */}
          {activeViewMode === 'flow' && (
            <div className="arch-flow-view-container">
              {/* Flow Intro Ribbon */}
              <div className="arch-flow-ribbon">
                <div className="ribbon-left">
                  <span className="ribbon-glyph">✦</span>
                  <span className="ribbon-text">
                    <strong>Runtime Interaction Graph:</strong> Visualizing end-to-end request lifecycle, mathematical models, and service boundaries.
                  </span>
                </div>
                <div className="ribbon-right">
                  <span className="ribbon-tag">Hover or click nodes to inspect component connections</span>
                </div>
              </div>

              {/* Step-by-Step Pipeline Ribbon */}
              <div className="arch-step-lifecycle-track" role="tablist" aria-label="End-to-End Execution Lifecycle">
                {currentProject.flow.steps.map((st, idx) => {
                  const isCurrent = activeStepIdx === idx;
                  return (
                    <button
                      key={st.num}
                      type="button"
                      className={`arch-step-node ${isCurrent ? 'active' : ''}`}
                      role="tab"
                      aria-selected={isCurrent}
                      onClick={() => setActiveStepIdx(idx)}
                    >
                      <span className="step-idx">{st.num}</span>
                      <span className="step-name">{st.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Step Detail Explanation Banner */}
              <div className="arch-step-detail-banner">
                <div className="step-banner-header">
                  <span className="step-banner-badge">STAGE {currentProject.flow.steps[activeStepIdx]?.num}</span>
                  <span className="step-banner-title">{currentProject.flow.steps[activeStepIdx]?.name}</span>
                </div>
                <p className="step-banner-desc">{currentProject.flow.steps[activeStepIdx]?.desc}</p>
              </div>

              {/* Interactive Node Graph Viewport */}
              <div className="arch-flow-graph-viewport">
                <div className="arch-nodes-flow-grid">
                  {currentProject.flow.nodes.map((node, i) => {
                    const isSelected = selectedNodeId === node.id;
                    const isHovered = hoveredNodeId === node.id;
                    const isLinked = activeHighlightedLinks.some(
                      (l) => l.from === node.id || l.to === node.id
                    );

                    return (
                      <div
                        key={node.id}
                        className={`arch-flow-node-card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''} ${isLinked ? 'connected-link' : ''} layer-${node.layer}`}
                        tabIndex={0}
                        onClick={() => {
                          setSelectedNodeId(isSelected ? null : node.id);
                          // Select matching tech object
                          const match = allProjectTechs.find(
                            (t) => t.id.includes(node.id.replace('n-', '')) || node.tech.toLowerCase().includes(t.name.toLowerCase().split(' ')[0])
                          );
                          if (match) setSelectedTechObj(match);
                        }}
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedNodeId(isSelected ? null : node.id);
                          }
                        }}
                        role="button"
                        aria-pressed={isSelected}
                      >
                        <div className="node-card-top">
                          <span className={`node-layer-pill pill-${node.layer}`}>
                            {node.layer.toUpperCase()}
                          </span>
                          <span className={`node-status-indicator status-${node.status}`} title={node.status} />
                        </div>
                        <h4 className="node-title">{node.title}</h4>
                        <div className="node-subtitle">{node.subtitle}</div>
                        <div className="node-tech-badge">
                          <code>{node.tech}</code>
                        </div>

                        {/* Interactive Ingress/Egress Link Tag */}
                        {isLinked && (
                          <div className="node-active-flow-tag">
                            Active Stream Attached
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Data Flow Link Descriptions */}
                <div className="arch-flow-connections-summary">
                  <div className="connections-header">
                    <span className="conn-dot" />
                    <span className="conn-title">Component Interaction &amp; Request Protocols:</span>
                  </div>
                  <div className="connections-list">
                    {currentProject.flow.links.map((link, idx) => {
                      const isHighlight =
                        (hoveredNodeId && (link.from === hoveredNodeId || link.to === hoveredNodeId)) ||
                        (selectedNodeId && (link.from === selectedNodeId || link.to === selectedNodeId));

                      return (
                        <div
                          key={idx}
                          className={`connection-item ${isHighlight ? 'active-highlight' : ''}`}
                          onMouseEnter={() => {
                            setHoveredNodeId(link.from);
                          }}
                          onMouseLeave={() => setHoveredNodeId(null)}
                        >
                          <span className="conn-num">{String(idx + 1).padStart(2, '0')}</span>
                          <span className="conn-from">
                            {currentProject.flow.nodes.find((n) => n.id === link.from)?.title}
                          </span>
                          <span className="conn-arrow">&rarr;</span>
                          <span className="conn-to">
                            {currentProject.flow.nodes.find((n) => n.id === link.to)?.title}
                          </span>
                          <span className="conn-label">[{link.label}]</span>
                          <span className="conn-protocol">{link.protocol}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: Architectural Layers & Tech Stack */}
          {activeViewMode === 'layers' && (
            <div className="arch-layers-view-container">
              {/* Layer Filter Toolbar */}
              <div className="arch-layer-filter-bar">
                <span className="filter-label">ARCHITECTURAL LAYERS:</span>
                <div className="filter-pills-row" role="tablist">
                  <button
                    type="button"
                    className={`layer-filter-pill ${activeLayerFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveLayerFilter('all')}
                    role="tab"
                    aria-selected={activeLayerFilter === 'all'}
                  >
                    All Relevant Layers ({currentProject.layers.length})
                  </button>
                  {currentProject.layers.map((layer) => (
                    <button
                      key={layer.id}
                      type="button"
                      className={`layer-filter-pill ${activeLayerFilter === layer.id ? 'active' : ''}`}
                      onClick={() => setActiveLayerFilter(layer.id)}
                      role="tab"
                      aria-selected={activeLayerFilter === layer.id}
                    >
                      <TechIcon name={layer.icon} size={13} />
                      <span>{layer.name}</span>
                      <span className="pill-count">({layer.technologies.length})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Layers Content Grid */}
              <div className="arch-layers-cards-stack">
                {filteredLayers.map((layer) => (
                  <div key={layer.id} className="arch-layer-group-box">
                    <div className="layer-group-header">
                      <div className="layer-header-icon-box">
                        <TechIcon name={layer.icon} size={20} />
                      </div>
                      <div className="layer-header-title-block">
                        <h4 className="layer-group-title">{layer.name}</h4>
                        <p className="layer-group-role">{layer.roleSummary}</p>
                      </div>
                      <span className="layer-tech-count-badge">
                        {layer.technologies.length} {layer.technologies.length === 1 ? 'Technology' : 'Technologies'}
                      </span>
                    </div>

                    <div className="layer-tech-cards-grid">
                      {layer.technologies.map((tech) => {
                        const isSelected = selectedTechObj?.id === tech.id;
                        return (
                          <article
                            key={tech.id}
                            className={`arch-tech-card ${isSelected ? 'selected' : ''}`}
                            tabIndex={0}
                            onClick={() => handleSelectTech(tech)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleSelectTech(tech);
                              }
                            }}
                          >
                            <div className="tech-card-header">
                              <div className="tech-icon-title-wrap">
                                <span className="tech-icon-holder">
                                  <TechIcon name={tech.icon} size={22} />
                                </span>
                                <div>
                                  <h5 className="tech-name">{tech.name}</h5>
                                  <span className="tech-layer-tag">{layer.name}</span>
                                </div>
                              </div>
                              <span className={`tech-status-badge status-${tech.status}`}>
                                {tech.statusLabel}
                              </span>
                            </div>

                            <div className="tech-details-body">
                              <div className="tech-detail-row">
                                <span className="detail-label">Specific Role in Project:</span>
                                <p className="detail-value">{tech.role}</p>
                              </div>

                              <div className="tech-detail-row">
                                <span className="detail-label">Why Used (Implementation Rationale):</span>
                                <p className="detail-value rationale">{tech.whyUsed}</p>
                              </div>

                              <div className="tech-detail-row">
                                <span className="detail-label">How It Connects:</span>
                                <p className="detail-value connection-flow">{tech.connections}</p>
                              </div>

                              <div className="tech-code-specs-row">
                                <span className="detail-label">Code / Protocol Reference:</span>
                                <code className="tech-code-snippet">{tech.codeSpecs}</code>
                              </div>
                            </div>

                            <div className="tech-card-footer">
                              <span className="inspect-cta">
                                {isSelected ? 'Currently Selected in Inspector ✓' : 'Click to inspect component &rarr;'}
                              </span>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: Technical Verification & Implementation Audit */}
          {activeViewMode === 'audit' && (
            <div className="arch-audit-view-container">
              <div className="audit-lead-banner">
                <div className="audit-badge-strip">
                  <span className="audit-shield-icon">🛡️</span>
                  <span className="audit-shield-text">VERIFIED IMPLEMENTATION AUDIT &bull; ZERO FABRICATED STACKS</span>
                </div>
                <h4 className="audit-banner-title">
                  Transparency Matrix: What is Actually Built vs. Tooling vs. Planned Roadmap
                </h4>
                <p className="audit-banner-desc">
                  To provide absolute technical honesty to recruiters and interviewers, every technology in this project is verified against real code, commits, and prototype specifications.
                </p>
              </div>

              <div className="audit-columns-grid">
                {/* 1. Verified Implemented */}
                <div className="audit-panel panel-implemented">
                  <div className="audit-panel-header">
                    <span className="panel-dot dot-implemented" />
                    <h5 className="panel-title">1. Verified Implemented in Codebase</h5>
                    <span className="panel-count">{currentProject.audit.implemented.length} Verified</span>
                  </div>
                  <ul className="audit-items-list">
                    {currentProject.audit.implemented.map((item, i) => (
                      <li key={i} className="audit-item">
                        <span className="audit-check-glyph">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Development Tooling */}
                <div className="audit-panel panel-development">
                  <div className="audit-panel-header">
                    <span className="panel-dot dot-development" />
                    <h5 className="panel-title">2. Development Tooling &amp; Environment</h5>
                    <span className="panel-count">{currentProject.audit.development.length} Tools</span>
                  </div>
                  <ul className="audit-items-list">
                    {currentProject.audit.development.map((item, i) => (
                      <li key={i} className="audit-item">
                        <span className="audit-tool-glyph">⚙</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Planned Roadmap */}
                <div className="audit-panel panel-planned">
                  <div className="audit-panel-header">
                    <span className="panel-dot dot-planned" />
                    <h5 className="panel-title">3. Planned Architecture &amp; Future Integrations</h5>
                    <span className="panel-count">{currentProject.audit.planned.length} Planned</span>
                  </div>
                  <ul className="audit-items-list">
                    {currentProject.audit.planned.map((item, i) => (
                      <li key={i} className="audit-item">
                        <span className="audit-plan-glyph">&rarr;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reviewer / Technical Interviewer Notes */}
              <div className="audit-reviewer-callout">
                <div className="callout-header">
                  <span className="callout-glyph">📝</span>
                  <span className="callout-heading">Verified Scope Notes for Technical Interviewers</span>
                </div>
                <div className="callout-content">
                  <ul className="reviewer-notes-list">
                    {currentProject.audit.reviewerNotes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Component Deep Inspector Drawer (Active when any tech is clicked) */}
          {selectedTechObj && (
            <div className="arch-inspector-drawer" role="region" aria-label="Component Inspector">
              <div className="inspector-top">
                <div className="inspector-tech-title">
                  <span className="inspector-icon">
                    <TechIcon name={selectedTechObj.icon} size={20} />
                  </span>
                  <div>
                    <h4 className="inspector-name">{selectedTechObj.name}</h4>
                    <span className="inspector-layer-sub">{selectedTechObj.layerName}</span>
                  </div>
                </div>
                <div className="inspector-top-right">
                  <span className={`inspector-status-pill status-${selectedTechObj.status}`}>
                    {selectedTechObj.statusLabel}
                  </span>
                  <button
                    type="button"
                    className="btn-close-inspector"
                    onClick={() => {
                      setSelectedTechObj(null);
                      setSelectedNodeId(null);
                    }}
                    aria-label="Close Inspector"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="inspector-content-grid">
                <div className="inspector-block">
                  <span className="inspector-label">ENGINEERING ROLE</span>
                  <p className="inspector-text">{selectedTechObj.role}</p>
                </div>
                <div className="inspector-block">
                  <span className="inspector-label">DESIGN RATIONALE</span>
                  <p className="inspector-text">{selectedTechObj.whyUsed}</p>
                </div>
                <div className="inspector-block">
                  <span className="inspector-label">INTER-COMPONENT CONNECTIONS</span>
                  <p className="inspector-text">{selectedTechObj.connections}</p>
                </div>
                <div className="inspector-block">
                  <span className="inspector-label">VERIFIED CODE SYMBOLS / APIS</span>
                  <code className="inspector-code">{selectedTechObj.codeSpecs}</code>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
