import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ARCHITECTURE_PROJECTS } from "../architecture-data.js";
import TechIcon from "./TechIcons.jsx";

function buildCompactData(project) {
  const { layers, flow } = project;
  const frontendLayers = layers.filter((l) => ["frontend", "interface"].includes(l.id));
  const frontendTechs = frontendLayers.flatMap((l) => l.technologies);
  const backendLayers = layers.filter((l) => l.id === "backend");
  const backendTechs = backendLayers.flatMap((l) => l.technologies);
  const supportingLayers = layers.filter((l) => !["frontend", "interface", "backend"].includes(l.id));
  const flowSteps = flow.nodes.map((n) => n.title).slice(0, 6).join(" → ");
  return { frontendLayers, frontendTechs, backendLayers, backendTechs, supportingLayers, flowSteps };
}

const DETAIL_TABS = [
  { id: "frontend", label: "Frontend", icon: "layout" },
  { id: "backend", label: "Backend & APIs", icon: "server" },
  { id: "data-ai", label: "Data & AI", icon: "cpu" },
  { id: "infra", label: "Infrastructure", icon: "shield" },
  { id: "flow", label: "Detailed Flow", icon: "network" },
];

function StatusDot({ status }) {
  const cls = status === "implemented" ? "implemented" : status === "development" ? "development" : "planned";
  return <span className={`ca-status-dot ca-dot-${cls}`} />;
}

const TechPill = React.memo(function TechPill({ tech }) {
  return (
    <div className={`ca-tech-pill ca-pill-${tech.status}`}>
      <TechIcon name={tech.icon} size={14} />
      <span className="ca-pill-name">{tech.name}</span>
      <StatusDot status={tech.status} />
    </div>
  );
});

const TechDetailCard = React.memo(function TechDetailCard({ tech, layerName }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`ca-detail-card ${open ? "open" : ""}`}>
      <button type="button" className="ca-detail-card-header" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <div className="ca-detail-header-left">
          <TechIcon name={tech.icon} size={18} />
          <span className="ca-detail-name">{tech.name}</span>
          <span className="ca-detail-layer-tag">{layerName}</span>
        </div>
        <div className="ca-detail-header-right">
          <span className={`ca-detail-status-badge status-${tech.status}`}>{tech.statusLabel}</span>
          <span className="ca-detail-chevron">{open ? "▴" : "▾"}</span>
        </div>
      </button>
      {open && (
        <div className="ca-detail-body">
          <div className="ca-detail-row">
            <span className="ca-detail-label">ROLE</span>
            <p className="ca-detail-text">{tech.role}</p>
          </div>
          <div className="ca-detail-row">
            <span className="ca-detail-label">WHY USED</span>
            <p className="ca-detail-text">{tech.whyUsed}</p>
          </div>
          {tech.connections && (
            <div className="ca-detail-row">
              <span className="ca-detail-label">CONNECTIONS</span>
              <p className="ca-detail-text">{tech.connections}</p>
            </div>
          )}
          {tech.codeSpecs && (
            <div className="ca-detail-row">
              <span className="ca-detail-label">VERIFIED SPECS</span>
              <code className="ca-detail-code">{tech.codeSpecs}</code>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

function FlowDetail({ project }) {
  const { flow } = project;
  return (
    <div className="ca-flow-detail">
      <div className="ca-flow-steps-row">
        {flow.steps.map((st) => (
          <div key={st.num} className="ca-flow-step-item">
            <span className="ca-flow-step-num">{st.num}</span>
            <div className="ca-flow-step-body">
              <strong className="ca-flow-step-name">{st.name}</strong>
              <p className="ca-flow-step-desc">{st.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="ca-flow-connections">
        <div className="ca-conn-header">Component Interaction Protocols</div>
        {flow.links.map((link, i) => {
          const fromNode = flow.nodes.find((n) => n.id === link.from);
          const toNode = flow.nodes.find((n) => n.id === link.to);
          return (
            <div key={i} className="ca-conn-row">
              <span className="ca-conn-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="ca-conn-from">{fromNode?.title}</span>
              <span className="ca-conn-arrow">→</span>
              <span className="ca-conn-to">{toNode?.title}</span>
              <span className="ca-conn-label">[{link.label}]</span>
              <span className="ca-conn-protocol">{link.protocol}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DetailPanel({ tabId, project }) {
  const { layers, audit } = project;

  const renderLayer = (layerIds, fallbackLabel) => {
    const matched = layers.filter((l) => layerIds.includes(l.id));
    if (matched.length === 0) {
      return <p className="ca-no-data">No {fallbackLabel} layer in this project.</p>;
    }
    return matched.map((layer) => (
      <div key={layer.id} className="ca-panel-layer">
        <div className="ca-panel-layer-header">
          <TechIcon name={layer.icon} size={16} />
          <span className="ca-panel-layer-name">{layer.name}</span>
          <p className="ca-panel-layer-role">{layer.roleSummary}</p>
        </div>
        <div className="ca-panel-tech-list">
          {layer.technologies.map((tech) => (
            <TechDetailCard key={tech.id} tech={tech} layerName={layer.name} />
          ))}
        </div>
      </div>
    ));
  };

  if (tabId === "frontend") return <div className="ca-panel-body">{renderLayer(["frontend", "interface"], "frontend / interface")}</div>;
  if (tabId === "backend") return <div className="ca-panel-body">{renderLayer(["backend"], "backend")}</div>;
  if (tabId === "data-ai") return (
    <div className="ca-panel-body">
      {renderLayer(["ai-ml", "graph", "lineage", "risk", "simulation", "data-processing", "analytics", "visualisation"], "data & AI")}
    </div>
  );
  if (tabId === "infra") return (
    <div className="ca-panel-body">
      {renderLayer(["infrastructure"], "infrastructure")}
      <div className="ca-audit-mini">
        <div className="ca-audit-col">
          <div className="ca-audit-col-header">
            <span className="ca-audit-dot ca-dot-implemented" />
            <span>Verified Implemented ({audit.implemented.length})</span>
          </div>
          <ul className="ca-audit-list">
            {audit.implemented.map((item, i) => (
              <li key={i}><span className="ca-audit-check">✓</span>{item}</li>
            ))}
          </ul>
        </div>
        <div className="ca-audit-col">
          <div className="ca-audit-col-header">
            <span className="ca-audit-dot ca-dot-planned" />
            <span>Planned / Roadmap ({audit.planned.length})</span>
          </div>
          <ul className="ca-audit-list">
            {audit.planned.map((item, i) => (
              <li key={i}><span className="ca-audit-arrow">→</span>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      {audit.reviewerNotes && audit.reviewerNotes.length > 0 && (
        <div className="ca-reviewer-notes">
          <span className="ca-reviewer-label">📝 Reviewer Notes</span>
          <ul className="ca-reviewer-list">
            {audit.reviewerNotes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  if (tabId === "flow") return <div className="ca-panel-body"><FlowDetail project={project} /></div>;
  return null;
}

export default function TechnicalArchitecture() {
  const [selectedProjId, setSelectedProjId] = useState("probe360");
  const [openTabId, setOpenTabId] = useState(null);
  const currentProject = useMemo(
    () => ARCHITECTURE_PROJECTS.find((p) => p.id === selectedProjId) || ARCHITECTURE_PROJECTS[0],
    [selectedProjId]
  );
  const compact = useMemo(() => buildCompactData(currentProject), [currentProject]);

  const handleProjectChange = useCallback((projId) => {
    if (projId === selectedProjId) return;
    setSelectedProjId(projId);
    setOpenTabId(null);
  }, [selectedProjId]);

  const handleTabToggle = useCallback((tabId) => {
    setOpenTabId((prev) => (prev === tabId ? null : tabId));
  }, []);

  useEffect(() => {
    const keyMap = { "1": "probe360", "2": "mule-matrix", "3": "carbon", "4": "aegis" };
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName) || e.target.isContentEditable) return;
      if (keyMap[e.key]) { e.preventDefault(); handleProjectChange(keyMap[e.key]); }
      else if (e.key === "Escape") { setOpenTabId(null); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleProjectChange]);

  const relevantTabs = useMemo(() => {
    return DETAIL_TABS.filter((tab) => {
      if (tab.id === "frontend") return true;
      if (tab.id === "backend") return true;
      if (tab.id === "data-ai") {
        return compact.supportingLayers.some((l) =>
          ["ai-ml", "graph", "lineage", "risk", "simulation", "data-processing", "analytics", "visualisation"].includes(l.id)
        );
      }
      return true;
    });
  }, [compact.supportingLayers]);

  return (
    <section
      className="architecture-section is-in-view"
      id="architecture"
      aria-labelledby="architecture-title"
      style={{ "--project-accent": currentProject.accentColor, "--project-glow": currentProject.accentGlow }}
    >
      {/* Oversized Cinematic Typography Watermark */}
      <div className="section-bg-watermark watermark-architecture" aria-hidden="true">05 // SYSTEMS</div>

      <div className="architecture-container">
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
            Verified component layers, technical roles, and data flows for each project. Select a project, then expand any section for full details.
          </p>
        </div>

        <div className="ca-project-selector" role="region" aria-label="Select project architecture">
          <div className="ca-selector-hint">
            <span className="ca-hint-kicker">PROJECT EXPLORER</span>
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
                  onClick={(e) => { e.stopPropagation(); handleProjectChange(proj.id); }}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                      e.preventDefault();
                      handleProjectChange(ARCHITECTURE_PROJECTS[(idx + 1) % ARCHITECTURE_PROJECTS.length].id);
                    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                      e.preventDefault();
                      handleProjectChange(ARCHITECTURE_PROJECTS[(idx - 1 + ARCHITECTURE_PROJECTS.length) % ARCHITECTURE_PROJECTS.length].id);
                    }
                  }}
                >
                  <div className="ca-tab-top">
                    <span className="ca-tab-num">{proj.number}</span>
                    <span className={`ca-tab-dot ${proj.statusType}`} />
                  </div>
                  <span className="ca-tab-name">{proj.name}</span>
                  <span className="ca-tab-cat">{proj.category}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="ca-canvas">
          <div className="ca-project-identity">
            <h3 className="ca-project-title">{currentProject.fullTitle}</h3>
            <span className={`ca-status-badge status-${currentProject.statusType}`}>{currentProject.status}</span>
          </div>

          <p className="ca-project-lead">{currentProject.lead}</p>

          <div className="ca-overview-grid">
            <div className="ca-overview-card ca-card-frontend">
              <div className="ca-card-label">
                <TechIcon name="layout" size={14} />
                <span>Frontend</span>
              </div>
              {compact.frontendTechs.length > 0 ? (
                <>
                  <div className="ca-pills-row">
                    {compact.frontendTechs.filter((t) => t.status === "implemented").slice(0, 4).map((t) => <TechPill key={t.id} tech={t} />)}
                  </div>
                  <p className="ca-card-summary">{compact.frontendLayers[0]?.roleSummary}</p>
                </>
              ) : (
                <p className="ca-card-summary ca-card-none">CLI / script interface — no browser frontend in this project.</p>
              )}
            </div>

            <div className="ca-flow-arrow" aria-hidden="true">→</div>

            <div className="ca-overview-card ca-card-backend">
              <div className="ca-card-label">
                <TechIcon name="server" size={14} />
                <span>Backend &amp; APIs</span>
              </div>
              {compact.backendTechs.length > 0 ? (
                <>
                  <div className="ca-pills-row">
                    {compact.backendTechs.filter((t) => t.status === "implemented").slice(0, 4).map((t) => <TechPill key={t.id} tech={t} />)}
                  </div>
                  <p className="ca-card-summary">{compact.backendLayers[0]?.roleSummary}</p>
                </>
              ) : (
                <p className="ca-card-summary ca-card-none">No dedicated web API layer — processing runs in-process / CLI.</p>
              )}
            </div>

            <div className="ca-flow-arrow" aria-hidden="true">→</div>

            <div className="ca-overview-card ca-card-supporting">
              <div className="ca-card-label">
                <TechIcon name="cpu" size={14} />
                <span>Supporting Stack</span>
              </div>
              <div className="ca-pills-row">
                {compact.supportingLayers.flatMap((l) => l.technologies).filter((t) => t.status === "implemented").slice(0, 5).map((t) => <TechPill key={t.id} tech={t} />)}
              </div>
            </div>
          </div>

          <div className="ca-flow-line">
            <span className="ca-flow-line-label">DATA FLOW</span>
            <span className="ca-flow-line-path">{compact.flowSteps}</span>
          </div>

          <div className="ca-detail-tabs">
            <div className="ca-tabs-header-row">
              <span className="ca-tabs-heading">IMPLEMENTATION DETAILS</span>
              {openTabId && (
                <button type="button" className="ca-tabs-collapse-all" onClick={() => setOpenTabId(null)}>Collapse ▴</button>
              )}
            </div>
            <div className="ca-tabs-accordion">
              {relevantTabs.map((tab) => {
                const isOpen = openTabId === tab.id;
                return (
                  <div key={tab.id} className={`ca-accordion-item ${isOpen ? "open" : ""}`}>
                    <button type="button" className="ca-accordion-trigger" aria-expanded={isOpen} onClick={() => handleTabToggle(tab.id)}>
                      <div className="ca-acc-trigger-left">
                        <TechIcon name={tab.icon} size={15} />
                        <span className="ca-acc-label">{tab.label}</span>
                      </div>
                      <span className="ca-acc-chevron">{isOpen ? "▴" : "▾"}</span>
                    </button>
                    {isOpen && (
                      <div className="ca-accordion-body">
                        <DetailPanel tabId={tab.id} project={currentProject} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
