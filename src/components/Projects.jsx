import React, { useState, useEffect, useRef, useMemo } from 'react';
import { PROJECTS, SKILLS } from '../data-store.js';

const PROBE_OUTPUTS = {
  discovery: `// [ILLUSTRATIVE WINRM PROBE: SECURE TLS 5986]
[+] TARGET: WIN-SRV-2022-EAST (10.0.4.12)
[+] AUTH: CredSSP / Kerberos Mutual Authenticated
[+] WMI QUERY: Get-CimInstance Win32_OperatingSystem
    Caption           : Microsoft Windows Server 2022 Datacenter
    BuildNumber       : 20348.2461
    Endpoint Daemons  : 0 (Pure Agentless Architecture)
[✓] Status: Connection verified. Zero endpoint footprint.`,
  packages: `// [SOFTWARE INVENTORY AUDIT]
[+] TARGET: WIN-SRV-2022-EAST
[+] WMI QUERY: Win32_Product / Registry Uninstall Keys
    - OpenSSH-Win64               (v8.9.1.0)  [OK]
    - Microsoft Edge Webview2     (v122.0)    [OK]
    - Apache Tomcat (Daemon-less) (v9.0.73)   [ADVISORY]
[✓] 142 Software packages indexed without agent overhead.`,
  cve: `// [CVE BASELINE VULNERABILITY CORRELATION]
[!] SCAN RESULT: 1 Vulnerability Detected
    - CVE-2023-38146 (ThemeBleed): Remediated via KB5030219
    - CVE-2023-36802 (ProxyMan): Patched
    - CVE-2023-21716 (MS Word RTF): Not Applicable
[✓] Endpoint compliance rating: 98.4% (Pass).`,
  honeypot: `// [PLANNED DIRECTION: DECOY ENGAGEMENT]
[*] SUBNET HONEYPOT NODES:
    - 10.0.4.240 : Emulated RDP (Port 3389)
    - 10.0.4.241 : Emulated SMBv1 (Port 445)
    - 10.0.4.242 : Emulated WinRM (Port 5985)
[+] Behavioral anomaly scoring model queued for training.`
};

const FHIR_STAGES = {
  raw: `// STAGE 1: RAW LEGACY HOSPITAL JSON (Ingestion Buffer)
{
  "hospital_code": "SEC_HOSP_08",
  "patient_ref": "PT-94821",
  "pt_full_name": "Arun Kumar",
  "dob": "1994-06-12",
  "diagnosis_code": "E11.9",
  "coverage_policy": "NHCX-POL-7718"
}`,
  pydantic: `// STAGE 2: STRICT PYDANTIC MODEL VALIDATION (FastAPI)
class IngestionPayload(BaseModel):
    hospital_code: constr(regex=r"^SEC_HOSP_\\d{2}$") = "SEC_HOSP_08"
    patient_ref: str = Field(..., example="PT-94821")
    dob: datetime.date = Field(..., example="1994-06-12")
    icd10: str = Field("E11.9", description="Type 2 Diabetes Mellitus")

# [VALIDATION PASSED]: Payload schema compliant with NHCX standards`,
  fhir: `// STAGE 3: STANDARDIZED HL7 FHIR R4 JSON-LD BUNDLE
{
  "resourceType": "Bundle",
  "type": "collection",
  "entry": [
    {
      "resource": {
        "resourceType": "Patient",
        "id": "PT-94821",
        "name": [{ "use": "official", "text": "Arun Kumar" }],
        "birthDate": "1994-06-12"
      }
    },
    {
      "resource": {
        "resourceType": "Condition",
        "code": {
          "coding": [{ "system": "http://hl7.org/fhir/sid/icd-10", "code": "E11.9" }]
        }
      }
    }
  ]
}`
};

export default function Projects({
  activeProjectId = 'prj-probe360',
  onSelectProject,
  selectedSkillId,
  onSelectSkill
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [openDrawers, setOpenDrawers] = useState({});
  const [activeSpotlight, setActiveSpotlight] = useState(activeProjectId);
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);

  // Exhibit 1: Probe360 state
  const [probeView, setProbeView] = useState('discovery');

  // Exhibit 2: Healthbridge state
  const [fhirStage, setFhirStage] = useState('raw');

  // Exhibit 3: Carbon state
  const [distance, setDistance] = useState(1200);
  const [renewable, setRenewable] = useState(30);
  const [volume, setVolume] = useState(2500);

  // Exhibit 4: Jarvis state
  const [terminalLines, setTerminalLines] = useState([
    '[JARVIS KERNEL INITIALIZED]',
    'Type "help" or click any command chip above to query daemon state.'
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // Sync with prop if provided
  useEffect(() => {
    if (activeProjectId && activeProjectId !== activeSpotlight) {
      setActiveSpotlight(activeProjectId);
    }
  }, [activeProjectId]);

  const handleSpotlightChange = (prjId) => {
    setActiveSpotlight(prjId);
    if (onSelectProject) {
      onSelectProject(prjId);
    }
  };

  // Copy Snippet Helper
  const copyTextToClipboard = (text, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedSnippetId(id);
        setTimeout(() => setCopiedSnippetId(null), 2000);
      });
    }
  };

  // Toggle Drawers inline
  const toggleDrawer = (id) => {
    setOpenDrawers((prev) => ({ ...prev, [id]: !prev[id] }));
    if (typeof window.__recomputeScrollGeometry === 'function') {
      setTimeout(window.__recomputeScrollGeometry, 250);
    }
  };

  // Exhibit 3: Carbon calculations
  const scope1 = Math.round((volume * 0.08) * (1 - renewable * 0.005));
  const scope2 = Math.round((volume * 0.06) * (1 - renewable * 0.008));
  const scope3 = Math.round(distance * 0.065 + volume * 0.015);
  const totalCo2 = scope1 + scope2 + scope3;

  // Exhibit 4: Jarvis command execution
  const executeJarvisCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    let response = '';

    switch (cleanCmd) {
      case 'help':
        response = `Available commands:
  - status    : Query service daemon uptime & background memory
  - telemetry : Sample live CPU, RAM, and Disk utilization probes
  - specs     : Inspect Python runtime & OS kernel hook specifications
  - skills    : List connected technical dependencies
  - clear     : Flush the terminal buffer`;
        break;
      case 'status':
        response = `[SERVICE DAEMON STATUS: ACTIVE]
  - Uptime          : 18h 42m 11s
  - Daemon Mode     : Local Event Loop (Zero Cloud Telemetry)
  - Memory Footprint: 26.4 MB RSS
  - Active Hotkeys  : Win+Shift+J, Ctrl+Alt+Space`;
        break;
      case 'telemetry':
        response = `[KERNEL HARDWARE TELEMETRY]
  - CPU Usage       : 4.2% across 8 logical cores
  - RAM In-Use      : 8.1 GB / 16.0 GB (50.6%)
  - Disk Activity   : Read 1.2 MB/s • Write 0.4 MB/s
  - Battery/Thermal : 42°C [Nominal]`;
        break;
      case 'specs':
        response = `[JARVIS ARCHITECTURE SPECIFICATIONS]
  - Runtime   : Python 3.11 (Asynchronous Event Loop)
  - Libraries : psutil, pywin32, ctypes, keyboard hooks
  - IPC       : Named pipes for secure sub-process dispatch`;
        break;
      case 'skills':
        response = `[CONNECTED SKILL MATRIX]
  - Python (Core Service) • OS Automation • psutil • Windows APIs • Procedural C`;
        break;
      case 'clear':
        setTerminalLines([]);
        return;
      default:
        response = `Command "${cleanCmd}" not recognized. Type "help" or click a quick command chip.`;
    }

    setTerminalLines((prev) => [...prev, `jarvis@sec-lab:~$ ${cleanCmd}`, response]);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    executeJarvisCommand(terminalInput);
    setTerminalInput('');
  };

  // Keyboard navigation [1..4] to jump to exhibits
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable) return;
      const keyMap = {
        '1': 'prj-probe360',
        '2': 'prj-healthbridge',
        '3': 'prj-carbon',
        '4': 'prj-jarvis'
      };
      const targetId = keyMap[e.key];
      if (targetId) {
        handleSpotlightChange(targetId);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter projects list (4 projects)
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Keep active spotlight synchronized if filtered out
  useEffect(() => {
    const isVisible = filteredProjects.some((p) => `prj-${p.id}` === activeSpotlight);
    if (!isVisible && filteredProjects.length > 0) {
      handleSpotlightChange(`prj-${filteredProjects[0].id}`);
    }
  }, [activeFilter, filteredProjects]);

  // Scroll synchronization: Observer detects which card is centered in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            handleSpotlightChange(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -25% 0px', threshold: [0.4, 0.7] }
    );

    const cards = document.querySelectorAll('.project-narrative-entry');
    cards.forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  }, [filteredProjects]);

  const handleStepperClick = (e, prjId) => {
    e.preventDefault();
    handleSpotlightChange(prjId);
    const target = document.getElementById(prjId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Helper to render interactive exhibits (4 exhibits)
  const renderInteractiveExhibit = (prjId) => {
    switch (prjId) {
      case 'prj-probe360':
        return (
          <div className="project-interactive-exhibit exhibit-box-security">
            <div className="exhibit-header">
              <span className="exhibit-label">✦ WINRM TELEMETRY PROBE</span>
              <button
                type="button"
                className="btn-copy-snippet"
                onClick={() => copyTextToClipboard(PROBE_OUTPUTS[probeView], 'probe')}
                aria-label="Copy telemetry probe output"
              >
                {copiedSnippetId === 'probe' ? 'Copied ✓' : 'Copy Output'}
              </button>
            </div>
            <div className="probe-tabs-row" role="tablist">
              {[
                { id: 'discovery', label: '01. Host Discovery' },
                { id: 'packages', label: '02. Software Audit' },
                { id: 'cve', label: '03. CVE Correlation' },
                { id: 'honeypot', label: '04. Planned Decoys' }
              ].map((t) => (
                <button
                  key={t.id}
                  className={`probe-tab-btn ${probeView === t.id ? 'active' : ''}`}
                  role="tab"
                  aria-selected={probeView === t.id}
                  type="button"
                  onClick={() => setProbeView(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <pre className="telemetry-console">{PROBE_OUTPUTS[probeView]}</pre>
          </div>
        );

      case 'prj-healthbridge':
        return (
          <div className="project-interactive-exhibit exhibit-box-health">
            <div className="exhibit-header">
              <span className="exhibit-label">✦ SCHEMA TRANSFORMATION PIPELINE</span>
              <button
                type="button"
                className="btn-copy-snippet"
                onClick={() => copyTextToClipboard(FHIR_STAGES[fhirStage], 'fhir')}
                aria-label="Copy FHIR schema stage"
              >
                {copiedSnippetId === 'fhir' ? 'Copied ✓' : 'Copy Payload'}
              </button>
            </div>
            <div className="fhir-steps-row" role="tablist">
              {[
                { id: 'raw', label: 'Step 1: Hospital Ingestion' },
                { id: 'pydantic', label: 'Step 2: Pydantic Validation' },
                { id: 'fhir', label: 'Step 3: HL7 FHIR Bundle' }
              ].map((s) => (
                <button
                  key={s.id}
                  className={`fhir-step-btn ${fhirStage === s.id ? 'active' : ''}`}
                  role="tab"
                  aria-selected={fhirStage === s.id}
                  type="button"
                  onClick={() => setFhirStage(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <pre className="telemetry-console">{FHIR_STAGES[fhirStage]}</pre>
          </div>
        );

      case 'prj-carbon':
        return (
          <div className="project-interactive-exhibit exhibit-box-carbon">
            <div className="exhibit-header">
              <span className="exhibit-label">✦ SCENARIO FORECASTER REGRESSION</span>
              <button
                type="button"
                className="btn-copy-snippet"
                onClick={() => copyTextToClipboard(`Scope 1: ${scope1} MT | Scope 2: ${scope2} MT | Scope 3: ${scope3} MT | Total: ${totalCo2} MT CO2e`, 'carbon')}
                aria-label="Copy carbon forecast summary"
              >
                {copiedSnippetId === 'carbon' ? 'Copied ✓' : 'Copy Metrics'}
              </button>
            </div>
            <div className="carbon-controls-grid">
              <div className="slider-group">
                <div className="slider-label-row">
                  <span>Freight Distance:</span>
                  <strong>{distance} km</strong>
                </div>
                <input
                  type="range"
                  min="100"
                  max="4000"
                  step="50"
                  value={distance}
                  aria-label="Freight distance slider"
                  onChange={(e) => setDistance(Number(e.target.value))}
                />
              </div>
              <div className="slider-group">
                <div className="slider-label-row">
                  <span>Renewable Energy:</span>
                  <strong>{renewable}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={renewable}
                  aria-label="Renewable energy mix slider"
                  onChange={(e) => setRenewable(Number(e.target.value))}
                />
              </div>
              <div className="slider-group">
                <div className="slider-label-row">
                  <span>Production Volume:</span>
                  <strong>{volume} units</strong>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={volume}
                  aria-label="Production volume slider"
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="carbon-output-bars">
              <div className="output-stat-row">
                <span>Scope 1 (Fuels):</span>
                <strong>{scope1} MT</strong>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill bar-s1" style={{ width: `${Math.min(100, (scope1 / 300) * 100)}%` }}></div>
                </div>
              </div>
              <div className="output-stat-row">
                <span>Scope 2 (Power):</span>
                <strong>{scope2} MT</strong>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill bar-s2" style={{ width: `${Math.min(100, (scope2 / 200) * 100)}%` }}></div>
                </div>
              </div>
              <div className="output-stat-row">
                <span>Scope 3 (Logistics):</span>
                <strong>{scope3} MT</strong>
                <div className="stat-bar-track">
                  <div className="stat-bar-fill bar-s3" style={{ width: `${Math.min(100, (scope3 / 300) * 100)}%` }}></div>
                </div>
              </div>
              <div className="total-emission-badge">
                <span>PROJECTED TOTAL:</span>
                <strong>{totalCo2} MT CO2e</strong>
              </div>
            </div>
          </div>
        );

      case 'prj-jarvis':
        return (
          <div className="project-interactive-exhibit exhibit-box-jarvis">
            <div className="exhibit-header">
              <span className="exhibit-label">✦ JARVIS CLI TERMINAL SANDBOX</span>
              <button
                type="button"
                className="btn-copy-snippet"
                onClick={() => copyTextToClipboard(terminalLines.join('\n'), 'jarvis')}
                aria-label="Copy terminal buffer"
              >
                {copiedSnippetId === 'jarvis' ? 'Copied ✓' : 'Copy Buffer'}
              </button>
            </div>
            <div className="jarvis-quick-chips">
              <span className="quick-chips-label">Commands:</span>
              {['status', 'telemetry', 'specs', 'skills', 'help', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  className="jarvis-cmd-chip"
                  type="button"
                  onClick={() => executeJarvisCommand(cmd)}
                >
                  {cmd}
                </button>
              ))}
            </div>
            <div className="jarvis-terminal-window">
              <div className="jarvis-terminal-body">
                {terminalLines.map((line, idx) => (
                  <div key={idx} className="term-line term-response">
                    {line}
                  </div>
                ))}
              </div>
              <form className="jarvis-terminal-input-bar" onSubmit={handleTerminalSubmit}>
                <span className="term-user-prompt">jarvis@sec-lab:~$</span>
                <input
                  type="text"
                  className="jarvis-terminal-input"
                  placeholder="Type command (e.g. status, telemetry)..."
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                />
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const activeProjectObj = PROJECTS.find((p) => `prj-${p.id}` === activeSpotlight) || PROJECTS[0];

  return (
    <section className="projects-section is-in-view" id="projects" aria-labelledby="projects-title">
      <div className="projects-container">
        <div className="projects-header-block">
          <h2 className="projects-title" id="projects-title">Project Gallery Exhibition</h2>
          <p className="projects-subtitle">
            An interactive showcase of engineering projects spanning agentless security telemetry, healthcare interoperability, sustainability forecasting, and localized OS automation.
          </p>

          {/* Filter Category Tabs */}
          <div className="project-filters-bar" role="tablist" aria-label="Filter projects">
            {[
              { id: 'all', label: 'All Exhibits' },
              { id: 'security', label: 'Cybersecurity' },
              { id: 'backend', label: 'Healthcare' },
              { id: 'ai', label: 'AI & Models' },
              { id: 'automation', label: 'Automation' }
            ].map((f) => (
              <button
                key={f.id}
                className={`project-filter-btn ${activeFilter === f.id ? 'active' : ''}`}
                data-filter={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Exhibition Stepper Bar (4 Projects) */}
          <div className="project-gallery-stepper" id="project-gallery-stepper" aria-label="Exhibition index">
            <span className="stepper-label">ACTIVE SPOTLIGHT:</span>
            <div className="stepper-track">
              {PROJECTS.map((p) => {
                const prjId = `prj-${p.id}`;
                const isActive = activeSpotlight === prjId;
                return (
                  <a
                    key={p.id}
                    href={`#${prjId}`}
                    className={`stepper-node ${isActive ? 'active' : ''}`}
                    data-project={prjId}
                    aria-current={isActive ? 'true' : 'false'}
                    onClick={(e) => handleStepperClick(e, prjId)}
                  >
                    <span className="stepper-num">{p.number}</span>
                    <span className="stepper-title">{p.title.split('—')[0].trim()}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bounded Exhibition Workspace (2-Column Desktop Grid / Stacked Mobile) */}
        <div className="projects-exhibition-wrap">
          {/* Column 1: Narrative Scroll Ledger */}
          <div className="projects-narrative-column">
            {filteredProjects.map((project) => {
              const prjId = `prj-${project.id}`;
              const isSpotlight = activeSpotlight === prjId;
              const isExpanded = !!openDrawers[project.id];
              const isLinkedToSelectedSkill = selectedSkillId && project.skills.includes(selectedSkillId);

              return (
                <article
                  key={project.id}
                  id={prjId}
                  className={`project-narrative-entry ${isSpotlight ? 'active-spotlight' : ''} ${isLinkedToSelectedSkill ? 'skill-connected-highlight' : ''}`}
                  data-category={project.category}
                  tabIndex={0}
                  onMouseEnter={() => handleSpotlightChange(prjId)}
                  onClick={() => handleSpotlightChange(prjId)}
                >
                  <div className="project-card-header">
                    <div className="project-meta-strip">
                      <span className="project-kicker">
                        {project.number} // {project.categoryLabel.toUpperCase()}
                      </span>
                      <span className={`project-status ${project.statusType === 'implemented' ? 'status-prototype' : 'status-concept'}`}>
                        <span className="status-pulse-dot" />
                        {project.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="project-name">{project.title}</h3>
                  </div>

                  <div className="project-card-body">
                    <p className="project-lead">{project.lead}</p>

                    <div className="project-specs-highlights">
                      <div className="spec-item">
                        <span className="spec-check">✓</span>
                        <span>
                          <strong>Implemented:</strong> {project.implementedSpec}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-plan">→</span>
                        <span>
                          <strong>Planned:</strong> {project.plannedSpec}
                        </span>
                      </div>
                    </div>

                    {/* Mobile Only: Inline Exhibit (hidden on desktop where sticky preview stage lives) */}
                    <div className="mobile-exhibit-container">
                      {renderInteractiveExhibit(prjId)}
                    </div>

                    {/* Interactive Connected Skills Row */}
                    <div className="project-tags-row">
                      {project.skills.map((skillId) => {
                        const skillObj = SKILLS.find((s) => s.id === skillId);
                        const isSkillActive = selectedSkillId === skillId;
                        return (
                          <button
                            key={skillId}
                            type="button"
                            className={`tag project-skill-pill ${isSkillActive ? 'tag-skill-active' : ''}`}
                            title={`Inspect skill: ${skillObj ? skillObj.title : skillId}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSkill) onSelectSkill(skillId);
                              const skillsSection = document.getElementById('skills');
                              if (skillsSection) {
                                skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }}
                          >
                            <span>{skillObj ? skillObj.title : skillId}</span>
                            {isSkillActive && <span className="active-dot">•</span>}
                          </button>
                        );
                      })}
                    </div>

                    <div className="project-card-actions">
                      <button
                        className="btn-project-expand"
                        aria-expanded={isExpanded}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDrawer(project.id);
                        }}
                      >
                        <span className="btn-text">
                          {isExpanded ? 'Collapse Architecture Specs' : 'Inspect Architecture & Specs'}
                        </span>
                        <span className="btn-icon">{isExpanded ? '−' : '+'}</span>
                      </button>
                    </div>

                    {/* Inline Architecture Drawer */}
                    <div className={`project-inline-drawer ${isExpanded ? 'open' : ''}`}>
                      <div className="drawer-detail-box">
                        <h4 className="drawer-subhead">System Architecture Breakdown</h4>
                        <p>{project.architecture}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Column 2: Bounded Sticky Interactive Preview Stage (Desktop Only) */}
          <aside className="projects-sticky-column" aria-label="Interactive Project Preview Stage">
            <div className="sticky-exhibit-card">
              <div className="sticky-stage-topbar">
                <div className="stage-topbar-info">
                  <span className="stage-kicker">
                    EXHIBIT {activeProjectObj.number} &bull; {activeProjectObj.categoryLabel}
                  </span>
                  <h4 className="stage-title">{activeProjectObj.title.split('—')[0].trim()}</h4>
                </div>
                <div className="stage-topbar-badge">
                  <span className={`status-badge-mini ${activeProjectObj.statusType === 'implemented' ? 'status-live' : 'status-proto'}`}>
                    {activeProjectObj.statusType === 'implemented' ? 'LIVE LAB' : 'CONCEPT LAB'}
                  </span>
                </div>
              </div>

              {/* Dynamic Exhibit Renderer */}
              <div className="sticky-stage-content">
                {renderInteractiveExhibit(activeSpotlight)}
              </div>

              <div className="sticky-stage-footer">
                <span className="stage-hint">
                  Scroll through entries or press <kbd className="kbd-mini">1</kbd> to <kbd className="kbd-mini">4</kbd> to navigate exhibits.
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Dynamic Transitional Motif leading smoothly from the final project into Contact */}
        <div className="projects-to-contact-flow" aria-hidden="true">
          <div className="flow-ambient-glow"></div>
          <div className="flow-connector-line"></div>
        </div>
      </div>
    </section>
  );
}
