import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ARCHITECTURE_PROJECTS } from "../architecture-data.js";
import TechIcon from "./TechIcons.jsx";

export default function TechnicalArchitecture() {
  const [selectedProjId, setSelectedProjId] = useState("probe360");
  const [activeLayerFilter, setActiveLayerFilter] = useState("all");
  const [expandedTechId, setExpandedTechId] = useState(null);

  const currentProject = useMemo(
    () => ARCHITECTURE_PROJECTS.find((p) => p.id === selectedProjId) || ARCHITECTURE_PROJECTS[0],
    [selectedProjId]
  );

  const handleProjectChange = useCallback((projId) => {
    if (projId === selectedProjId) return;
    setSelectedProjId(projId);
    setActiveLayerFilter("all");
    setExpandedTechId(null);
  }, [selectedProjId]);

  // Keyboard navigation across projects
  useEffect(() => {
    const keyMap = { "1": "probe360", "2": "mule-matrix", "3": "carbon", "4": "aegis" };
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName) || e.target.isContentEditable) return;
      if (keyMap[e.key]) {
        e.preventDefault();
        handleProjectChange(keyMap[e.key]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleProjectChange]);

  // Categorize layers into standard architecture roles
  const frontendLayers = useMemo(
    () => currentProject.layers.filter((l) => ["frontend", "interface"].includes(l.id)),
    [currentProject]
  );
  const backendLayers = useMemo(
    () => currentProject.layers.filter((l) => l.id === "backend"),
    [currentProject]
  );
  const dataAiLayers = useMemo(
    () =>
      currentProject.layers.filter((l) =>
        ["ai-ml", "graph", "lineage", "risk", "simulation", "data-processing", "analytics", "visualisation"].includes(l.id)
      ),
    [currentProject]
  );
  const infraLayers = useMemo(
    () => currentProject.layers.filter((l) => l.id === "infrastructure"),
    [currentProject]
  );

  // All technologies for the audit matrix
  const allTechnologies = useMemo(() => {
    return currentProject.layers.flatMap((l) =>
      l.technologies.map((t) => ({ ...t, layerName: l.name, layerId: l.id }))
    );
  }, [currentProject]);

  const filteredTechnologies = useMemo(() => {
    if (activeLayerFilter === "all") return allTechnologies;
    if (activeLayerFilter === "implemented") return allTechnologies.filter((t) => t.status === "implemented");
    if (activeLayerFilter === "planned") return allTechnologies.filter((t) => t.status === "planned");
    return allTechnologies.filter((t) => t.layerId === activeLayerFilter);
  }, [allTechnologies, activeLayerFilter]);

  const toggleExpandTech = (techId) => {
    setExpandedTechId((prev) => (prev === techId ? null : techId));
  };

  return (
    <section
      className="architecture-section is-in-view"
      id="architecture"
      aria-labelledby="architecture-title"
      style={{
        "--project-accent": currentProject.accentColor,
        "--project-glow": currentProject.accentGlow
      }}
    >
      <div className="architecture-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot" />
            <span className="section-kicker">STAGE 05 // CREATION • SYSTEM BLUEPRINT</span>
          </div>
          <h2 className="section-title" id="architecture-title">
            Technical Architecture &amp; <span className="accent-text">System Design</span>
          </h2>
          <p className="section-subtitle">
            Component layers, technical responsibilities, and end-to-end data flows grounded strictly in existing code and verified project repositories.
          </p>
        </div>

        {/* 1. Project Selection Bar */}
        <div className="ca-project-selector" role="region" aria-label="Select project architecture">
          <div className="ca-selector-hint">
            <span className="ca-hint-kicker">PROJECT SELECTOR</span>
            <span className="ca-hint-keys">Press <kbd>1</kbd>–<kbd>4</kbd> to switch</span>
          </div>
          <div className="ca-selector-grid" role="tablist">
            {ARCHITECTURE_PROJECTS.map((proj, idx) => {
              const isActive = proj.id === selectedProjId;
              return (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`ca-proj-tab ${isActive ? "active" : ""}`}
                  style={{ "--tab-accent": proj.accentColor }}
                  onClick={() => handleProjectChange(proj.id)}
                >
                  <div className="ca-tab-top">
                    <span className="ca-tab-num">{proj.number}</span>
                    <span className={`ca-tab-status-dot ${proj.statusType}`} />
                  </div>
                  <strong className="ca-tab-name">{proj.name}</strong>
                  <span className="ca-tab-cat">{proj.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Project Overview & Identity Banner */}
        <div className="ca-overview-banner">
          <div className="ca-banner-header">
            <div className="ca-title-group">
              <span className="ca-banner-number">PROJECT {currentProject.number}</span>
              <h3 className="ca-project-title">{currentProject.fullTitle}</h3>
            </div>
            <span className={`ca-status-badge status-${currentProject.statusType}`}>
              {currentProject.status}
            </span>
          </div>
          <p className="ca-project-lead">{currentProject.lead}</p>
          <p className="ca-project-summary">{currentProject.summary}</p>
        </div>

        {/* 3. Clearly Separated 4-Area Architecture Blueprint */}
        <div className="ca-blueprint-grid">
          {/* Area 1: Frontend Responsibilities */}
          <div className="ca-blueprint-card">
            <div className="ca-card-topbar">
              <div className="ca-card-label">
                <TechIcon name="layout" size={16} />
                <span>Frontend &amp; Interface</span>
              </div>
              <span className="ca-card-badge">
                {frontendLayers.length > 0 ? "Interactive / CLI" : "Headless / CLI"}
              </span>
            </div>
            <div className="ca-card-content">
              {frontendLayers.length > 0 ? (
                <>
                  <p className="ca-card-role">{frontendLayers[0].roleSummary}</p>
                  <div className="ca-card-tech-pills">
                    {frontendLayers.flatMap((l) => l.technologies).map((t) => (
                      <span key={t.id} className={`ca-tech-badge status-${t.status}`}>
                        <span className="badge-dot" />
                        <span>{t.name}</span>
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="ca-card-role text-muted">
                  Command-line / script execution harness. No persistent browser frontend is deployed in this project.
                </p>
              )}
            </div>
          </div>

          {/* Area 2: Backend & API Responsibilities */}
          <div className="ca-blueprint-card">
            <div className="ca-card-topbar">
              <div className="ca-card-label">
                <TechIcon name="server" size={16} />
                <span>Backend &amp; APIs</span>
              </div>
              <span className="ca-card-badge">
                {backendLayers.length > 0 ? "Asynchronous / Core" : "In-Process Core"}
              </span>
            </div>
            <div className="ca-card-content">
              {backendLayers.length > 0 ? (
                <>
                  <p className="ca-card-role">{backendLayers[0].roleSummary}</p>
                  <div className="ca-card-tech-pills">
                    {backendLayers.flatMap((l) => l.technologies).map((t) => (
                      <span key={t.id} className={`ca-tech-badge status-${t.status}`}>
                        <span className="badge-dot" />
                        <span>{t.name}</span>
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="ca-card-role text-muted">
                  No dedicated external web API layer. Inspection execution runs in-process via Python systems runtime.
                </p>
              )}
            </div>
          </div>

          {/* Area 3: Data & AI Components */}
          <div className="ca-blueprint-card">
            <div className="ca-card-topbar">
              <div className="ca-card-label">
                <TechIcon name="cpu" size={16} />
                <span>Data &amp; AI Intelligence</span>
              </div>
              <span className="ca-card-badge">
                {dataAiLayers.length > 0 ? "Empirical / Graph Engine" : "Heuristic Rule Set"}
              </span>
            </div>
            <div className="ca-card-content">
              {dataAiLayers.length > 0 ? (
                <>
                  <p className="ca-card-role">
                    {dataAiLayers.map((l) => l.roleSummary).join(" ")}
                  </p>
                  <div className="ca-card-tech-pills">
                    {dataAiLayers.flatMap((l) => l.technologies).map((t) => (
                      <span key={t.id} className={`ca-tech-badge status-${t.status}`}>
                        <span className="badge-dot" />
                        <span>{t.name}</span>
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="ca-card-role text-muted">
                  Procedural rule-matching engine against CVE vulnerability databases and Windows configuration baselines.
                </p>
              )}
            </div>
          </div>

          {/* Area 4: Infrastructure & Protocol Integrations */}
          <div className="ca-blueprint-card">
            <div className="ca-card-topbar">
              <div className="ca-card-label">
                <TechIcon name="shield" size={16} />
                <span>Infrastructure &amp; Security Protocols</span>
              </div>
              <span className="ca-card-badge">Zero-Footprint / TLS</span>
            </div>
            <div className="ca-card-content">
              {infraLayers.length > 0 ? (
                <>
                  <p className="ca-card-role">{infraLayers[0].roleSummary}</p>
                  <div className="ca-card-tech-pills">
                    {infraLayers.flatMap((l) => l.technologies).map((t) => (
                      <span key={t.id} className={`ca-tech-badge status-${t.status}`}>
                        <span className="badge-dot" />
                        <span>{t.name}</span>
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <p className="ca-card-role text-muted">
                  Standard enterprise network protocols and operating system memory primitives.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 4. End-to-End Data Flow Pipeline */}
        <div className="ca-flow-section">
          <div className="ca-flow-header">
            <span className="ca-flow-kicker">OPERATIONAL LINEAGE</span>
            <h4 className="ca-flow-title">End-to-End Data Flow &amp; Protocol Pipeline</h4>
          </div>

          <div className="ca-flow-steps-grid">
            {currentProject.flow.steps.map((st) => (
              <div key={st.num} className="ca-flow-step-card">
                <div className="ca-step-badge">
                  <span className="ca-step-number">STAGE {st.num}</span>
                </div>
                <strong className="ca-step-title">{st.name}</strong>
                <p className="ca-step-desc">{st.desc}</p>
              </div>
            ))}
          </div>

          {/* Protocol Linkages Strip */}
          <div className="ca-protocols-bar">
            <span className="ca-protocols-label">INTER-COMPONENT PROTOCOLS:</span>
            <div className="ca-protocols-list">
              {currentProject.flow.links.map((link, i) => {
                const fromNode = currentProject.flow.nodes.find((n) => n.id === link.from);
                const toNode = currentProject.flow.nodes.find((n) => n.id === link.to);
                return (
                  <div key={i} className="ca-protocol-chip">
                    <span className="proto-from">{fromNode?.title || link.from}</span>
                    <span className="proto-arrow">→</span>
                    <span className="proto-to">{toNode?.title || link.to}</span>
                    <code className="proto-code">[{link.protocol}]</code>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. Verified Implementation & Roadmap Audit Matrix */}
        <div className="ca-audit-section">
          <div className="ca-audit-header">
            <div>
              <span className="ca-audit-kicker">VERIFIED CODE SPECIFICATIONS</span>
              <h4 className="ca-audit-title">Implementation Matrix &amp; Technical Deep-Dive</h4>
            </div>

            {/* Filter Tabs */}
            <div className="ca-audit-filter-tabs">
              <button
                type="button"
                className={`audit-filter-btn ${activeLayerFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveLayerFilter("all")}
              >
                All Components ({allTechnologies.length})
              </button>
              <button
                type="button"
                className={`audit-filter-btn ${activeLayerFilter === "implemented" ? "active" : ""}`}
                onClick={() => setActiveLayerFilter("implemented")}
              >
                ✓ Implemented ({allTechnologies.filter((t) => t.status === "implemented").length})
              </button>
              <button
                type="button"
                className={`audit-filter-btn ${activeLayerFilter === "planned" ? "active" : ""}`}
                onClick={() => setActiveLayerFilter("planned")}
              >
                Roadmap / Planned ({allTechnologies.filter((t) => t.status === "planned").length})
              </button>
            </div>
          </div>

          {/* Interactive Technology Detail Cards List */}
          <div className="ca-tech-cards-list">
            {filteredTechnologies.map((tech) => {
              const isExpanded = expandedTechId === tech.id;
              return (
                <div
                  key={tech.id}
                  className={`ca-tech-inspect-card ${isExpanded ? "expanded" : ""} status-${tech.status}`}
                >
                  <button
                    type="button"
                    className="ca-inspect-header"
                    onClick={() => toggleExpandTech(tech.id)}
                    aria-expanded={isExpanded}
                  >
                    <div className="ca-inspect-header-left">
                      <TechIcon name={tech.icon} size={18} />
                      <strong className="ca-inspect-name">{tech.name}</strong>
                      <span className="ca-inspect-layer">{tech.layerName}</span>
                    </div>

                    <div className="ca-inspect-header-right">
                      <span className={`ca-status-pill status-${tech.status}`}>
                        {tech.statusLabel}
                      </span>
                      <span className="ca-inspect-chevron">{isExpanded ? "▴" : "▾"}</span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="ca-inspect-body">
                      <div className="ca-inspect-row">
                        <span className="inspect-label">SYSTEM ROLE:</span>
                        <p className="inspect-value">{tech.role}</p>
                      </div>

                      <div className="ca-inspect-row">
                        <span className="inspect-label">ENGINEERING RATIONALE:</span>
                        <p className="inspect-value">{tech.whyUsed}</p>
                      </div>

                      {tech.connections && (
                        <div className="ca-inspect-row">
                          <span className="inspect-label">CONNECTIONS:</span>
                          <p className="inspect-value">{tech.connections}</p>
                        </div>
                      )}

                      {tech.codeSpecs && (
                        <div className="ca-inspect-row">
                          <span className="inspect-label">VERIFIED SPECIFICATIONS:</span>
                          <code className="inspect-code">{tech.codeSpecs}</code>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Reviewer / Architecture Audit Notes */}
          {currentProject.audit && currentProject.audit.reviewerNotes && (
            <div className="ca-audit-reviewer-box">
              <span className="reviewer-tag">📝 ARCHITECTURE REVIEWER AUDIT NOTES</span>
              <ul className="reviewer-bullets">
                {currentProject.audit.reviewerNotes.map((note, idx) => (
                  <li key={idx}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
