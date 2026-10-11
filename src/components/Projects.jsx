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

const AEGIS_STEPS = [
  { id: 'vuln', label: '01. Vulnerability', short: 'Vuln' },
  { id: 'attack', label: '02. Attack Path', short: 'Attack' },
  { id: 'risk', label: '03. Risk Impact', short: 'Risk' },
  { id: 'fix', label: '04. Optimal Fix', short: 'Fix' },
  { id: 'resim', label: '05. Re-simulation', short: 'Re-sim' }
];

const AEGIS_DATA = {
  vuln: {
    title: 'Vulnerability Ingestion & Asset Topology',
    status: 'CVE TELEMETRY INGESTED',
    riskScore: '9.4',
    riskClass: 'val-crit',
    hopCount: '3 Hops',
    blastRadius: '4 Nodes Exposed',
    defenseStatus: 'Vulnerabilities Unpatched',
    edgeState: 'dormant',
    code: `// [STAGE 1: ASSET TOPOLOGY & CVE/CVSS INGESTION (FastAPI)]
[*] NetworkX Directed Graph: G = nx.DiGraph()
[+] Node 1: Attacker (External Vector 198.51.100.24)
[+] Node 2: Nginx Web Ingress (10.0.1.5)
    ├── [CVE-2023-38606] CVSS 9.8 (Critical) | Port 443 RCE
[+] Node 3: FastAPI App Cluster (10.0.2.14)
    ├── [CVE-2024-21413] CVSS 8.8 (High) | NTLM Credential Relay
[+] Node 4: Domain Controller DC-01 (10.0.3.2)
    └── [CROWN JEWEL] Kerberos Domain Admin (Port 389/88)
[!] Topology graph initialized. Attack surface ready for simulation.`
  },
  attack: {
    title: 'Adversarial Lateral Path Traversal',
    status: 'MITRE ATT&CK TRAVERSAL SIMULATED',
    riskScore: '9.8',
    riskClass: 'val-crit',
    hopCount: '3 Hops (Direct)',
    blastRadius: 'Crown Jewels Targeted',
    defenseStatus: 'Lateral Path Active',
    edgeState: 'attacking',
    code: `// [STAGE 2: ADVERSARIAL PATH SIMULATION (MITRE ATT&CK)]
[*] Traversal Algorithm: Dijkstra Shortest Vulnerability Path
[>] HOP 1: Attacker ──> Nginx Web Ingress
    ├── Technique: T1190 (Exploit Public-Facing Application)
    └── Vector: Reverse shell established via CVE-2023-38606
[>] HOP 2: Nginx Web ──> App Cluster
    ├── Technique: T1550.002 (Pass-the-Hash / Alternate Auth)
    └── Vector: Pivoting over internal SSH tunnel to Port 8000
[>] HOP 3: App Cluster ──> Domain Controller DC-01
    ├── Technique: T1003 (OS Credential Dumping)
    └── Vector: Golden Ticket forged via Kerberos compromise
[!] CRITICAL: Full compromise path verified from External to DC-01.`
  },
  risk: {
    title: 'Multi-Hop Blast Radius & Impact Quantifier',
    status: 'BLAST RADIUS EVALUATED',
    riskScore: '9.8',
    riskClass: 'val-crit',
    hopCount: '3 Hops',
    blastRadius: '100% Crown Jewels Exposed',
    defenseStatus: 'Immediate Cut Required',
    edgeState: 'attacking',
    code: `// [STAGE 3: RISK IMPACT & BLAST RADIUS METRICS]
[*] NetworkX Graph Centrality & Exposure Analysis:
    ├── Composite CVSS Risk Index : 9.8 / 10.0 [EXTREME RISK]
    ├── Critical Lateral Hop Depth: 3 Hops (Zero Segmentation)
    ├── Mean Time-to-Compromise   : 3.8 minutes
    ├── Domain Controller Reach   : EXPOSED (100% Likelihood)
    └── Business Impact Rating    : Tier-1 Catastrophic Exposure
[!] Optimization Directive: Synthesize minimum-cost defense policy.`
  },
  fix: {
    title: 'Optimal Defense Policy Synthesis',
    status: 'OPTIMAL CUT COMPUTED',
    riskScore: '3.2',
    riskClass: 'val-safe',
    hopCount: '0 Valid Paths',
    blastRadius: 'Attack Trajectory Severed',
    defenseStatus: 'Zero-Trust ACL-901 Applied',
    edgeState: 'severed',
    code: `// [STAGE 4: OPTIMAL DEFENSE ORCHESTRATION (Minimum-Cut Heuristic)]
[*] Graph Cut Evaluation:
    ├── Option A: Patch both CVEs (Downtime: 48h | Feasibility: 34%)
    └── Option B (OPTIMAL): Microsegmentation Rule ACL-901
        ├── Action: Sever lateral bridge between DMZ & App (Port 8000)
        ├── Action: Enforce mTLS & Ephemeral Kerberos Guardrails
        ├── Operational Downtime: 0 seconds (Cost Score: 1.2 pts)
        └── Attack Path Disruption: 100% of adversarial flow severed
[✓] Optimal Remediation Action Pushed to Network Twin.`
  },
  resim: {
    title: 'Digital Twin Verification & Posture Re-simulation',
    status: 'RE-SIMULATION VERIFIED',
    riskScore: '1.2',
    riskClass: 'val-safe',
    hopCount: '0 Paths (Cut)',
    blastRadius: '1 Node Contained (DMZ)',
    defenseStatus: 'Crown Jewels Protected ✓',
    edgeState: 'severed',
    code: `// [STAGE 5: DIGITAL TWIN RE-SIMULATION & VERIFICATION]
[*] Executing: nx.has_path(G, source='Attacker', target='DC-01')
    └── Result: False (No adversarial path exists!)
[*] Residual Enterprise Posture:
    ├── Active Lateral Attack Paths: 0
    ├── Residual Risk Index        : 1.2 / 10.0 [CONTAINED]
    ├── Crown Jewel (DC-01)        : ISOLATED & SECURE
    └── MITRE ATT&CK Mitigation    : M1030 (Network Segmentation) Verified
[✓] Posture validation complete: Hackathon prototype verified.`
  }
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

  // Exhibit 4: AEGIS-TWIN state
  const [aegisStep, setAegisStep] = useState('vuln');

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

  // Exhibit 4: AEGIS-TWIN step next helper
  const handleAegisStepNext = () => {
    const stepIds = AEGIS_STEPS.map((s) => s.id);
    const currentIdx = stepIds.indexOf(aegisStep);
    const nextIdx = (currentIdx + 1) % stepIds.length;
    setAegisStep(stepIds[nextIdx]);
  };

  // Keyboard navigation [1..4] to jump to exhibits
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable) return;
      const keyMap = {
        '1': 'prj-probe360',
        '2': 'prj-healthbridge',
        '3': 'prj-carbon',
        '4': 'prj-aegis'
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
    if (activeFilter === 'security') {
      return PROJECTS.filter((p) => p.category === 'security' || p.id === 'aegis');
    }
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

      case 'prj-aegis': {
        const currData = AEGIS_DATA[aegisStep] || AEGIS_DATA.vuln;
        const isSevered = aegisStep === 'fix' || aegisStep === 'resim';

        return (
          <div className="project-interactive-exhibit exhibit-box-aegis">
            <div className="exhibit-header">
              <span className="exhibit-label">✦ AEGIS-TWIN ADVERSARIAL PATH SIMULATOR</span>
              <button
                type="button"
                className="btn-copy-snippet"
                onClick={() => copyTextToClipboard(currData.code, 'aegis')}
                aria-label="Copy simulation report"
              >
                {copiedSnippetId === 'aegis' ? 'Copied ✓' : 'Copy Report'}
              </button>
            </div>

            {/* Core Workflow Stepper (Vulnerability -> Attack Path -> Risk Impact -> Optimal Fix -> Re-simulation) */}
            <div className="aegis-workflow-nav" role="tablist" aria-label="AEGIS-TWIN 5-step workflow">
              <span className="aegis-workflow-label">Workflow:</span>
              {AEGIS_STEPS.map((s) => (
                <button
                  key={s.id}
                  className={`aegis-step-chip ${aegisStep === s.id ? 'active' : ''}`}
                  role="tab"
                  aria-selected={aegisStep === s.id}
                  type="button"
                  onClick={() => setAegisStep(s.id)}
                >
                  <span className="aegis-step-num">{s.label.split('.')[0]}</span>
                  <span>{s.short}</span>
                </button>
              ))}
            </div>

            {/* Cybersecurity Network Graph / Digital Twin Visual */}
            <div className="aegis-twin-viewport">
              <svg viewBox="0 0 500 170" className="aegis-graph-svg" aria-label="AEGIS-TWIN Cybersecurity Network Graph">
                <defs>
                  <linearGradient id="cyberGrid" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#040e16" />
                    <stop offset="100%" stopColor="#081b26" />
                  </linearGradient>
                  <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <marker id="arrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#f43f5e" />
                  </marker>
                  <marker id="arrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#00f5d4" />
                  </marker>
                  <marker id="arrowMuted" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569" />
                  </marker>
                </defs>

                {/* Background Grid Pattern */}
                <rect width="500" height="170" fill="url(#cyberGrid)" />
                <line x1="0" y1="42" x2="500" y2="42" stroke="rgba(0, 245, 212, 0.05)" strokeDasharray="4,4" />
                <line x1="0" y1="128" x2="500" y2="128" stroke="rgba(0, 245, 212, 0.05)" strokeDasharray="4,4" />

                {/* Network Edge 1: Attacker -> DMZ */}
                <line
                  x1="88"
                  y1="85"
                  x2="152"
                  y2="85"
                  stroke={aegisStep === 'vuln' ? '#475569' : '#f43f5e'}
                  strokeWidth={aegisStep === 'vuln' ? '1.5' : '2.5'}
                  strokeDasharray={aegisStep === 'attack' || aegisStep === 'risk' ? '4,3' : 'none'}
                  markerEnd={aegisStep === 'vuln' ? 'url(#arrowMuted)' : 'url(#arrowRed)'}
                />

                {/* Network Edge 2: DMZ -> App Cluster (The Critical Bridge!) */}
                {isSevered ? (
                  <>
                    <line x1="228" y1="85" x2="252" y2="85" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3" />
                    {/* Severed Barrier / Shield */}
                    <g transform="translate(262, 85)">
                      <circle r="14" fill="#06151f" stroke="#00f5d4" strokeWidth="2" filter="url(#cyanGlow)" />
                      <text textAnchor="middle" dy="4" fill="#00f5d4" fontSize="11" fontFamily="var(--font-mono)">🛡️</text>
                    </g>
                    <line x1="272" y1="85" x2="312" y2="85" stroke="#334155" strokeWidth="1.5" strokeDasharray="2,2" markerEnd="url(#arrowMuted)" />
                    <text x="262" y="112" textAnchor="middle" fill="#00f5d4" fontSize="8" fontFamily="var(--font-mono)" fontWeight="bold">SEVERED [ACL-901]</text>
                  </>
                ) : (
                  <line
                    x1="228"
                    y1="85"
                    x2="312"
                    y2="85"
                    stroke={aegisStep === 'attack' || aegisStep === 'risk' ? '#f43f5e' : '#475569'}
                    strokeWidth={aegisStep === 'attack' || aegisStep === 'risk' ? '2.5' : '1.5'}
                    strokeDasharray={aegisStep === 'attack' || aegisStep === 'risk' ? '4,3' : 'none'}
                    markerEnd={aegisStep === 'attack' || aegisStep === 'risk' ? 'url(#arrowRed)' : 'url(#arrowMuted)'}
                  />
                )}

                {/* Network Edge 3: App Cluster -> Domain Controller */}
                <line
                  x1="388"
                  y1="85"
                  x2="418"
                  y2="85"
                  stroke={isSevered ? '#10b981' : (aegisStep === 'attack' || aegisStep === 'risk' ? '#f43f5e' : '#475569')}
                  strokeWidth={aegisStep === 'attack' || aegisStep === 'risk' ? '2.5' : '1.5'}
                  strokeDasharray={!isSevered && (aegisStep === 'attack' || aegisStep === 'risk') ? '4,3' : 'none'}
                  markerEnd={isSevered ? 'url(#arrowCyan)' : (aegisStep === 'attack' || aegisStep === 'risk' ? 'url(#arrowRed)' : 'url(#arrowMuted)')}
                />

                {/* Node 1: External Attacker */}
                <g transform="translate(52, 85)">
                  <circle r="22" fill="#180b12" stroke="#f43f5e" strokeWidth="2" filter={aegisStep !== 'vuln' ? 'url(#redGlow)' : ''} />
                  <text textAnchor="middle" dy="4" fill="#f43f5e" fontSize="12" fontFamily="var(--font-mono)">⚔️</text>
                  <text x="0" y="32" textAnchor="middle" fill="#f43f5e" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">Attacker</text>
                  <text x="0" y="42" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="var(--font-mono)">External Vector</text>
                </g>

                {/* Node 2: DMZ Web Ingress */}
                <g transform="translate(190, 85)">
                  <circle r="22" fill="#1f1408" stroke="#f97316" strokeWidth="2" />
                  <text textAnchor="middle" dy="4" fill="#f97316" fontSize="12" fontFamily="var(--font-mono)">🌐</text>
                  <text x="0" y="32" textAnchor="middle" fill="#f97316" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">DMZ Ingress</text>
                  <text x="0" y="42" textAnchor="middle" fill="#f87171" fontSize="7.5" fontFamily="var(--font-mono)">CVE-2023-38606</text>
                </g>

                {/* Node 3: App Cluster */}
                <g transform="translate(350, 85)">
                  <circle r="22" fill="#160e22" stroke={isSevered ? '#10b981' : '#a855f7'} strokeWidth="2" />
                  <text textAnchor="middle" dy="4" fill={isSevered ? '#10b981' : '#a855f7'} fontSize="12" fontFamily="var(--font-mono)">⚙️</text>
                  <text x="0" y="32" textAnchor="middle" fill={isSevered ? '#10b981' : '#c084fc'} fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">App Cluster</text>
                  <text x="0" y="42" textAnchor="middle" fill="#94a3b8" fontSize="7.5" fontFamily="var(--font-mono)">{isSevered ? 'Zero-Trust mTLS' : 'T1550 Pivot'}</text>
                </g>

                {/* Node 4: Crown Jewel DC-01 */}
                <g transform="translate(452, 85)">
                  <circle r="22" fill="#041f1a" stroke={isSevered ? '#00f5d4' : (aegisStep === 'risk' || aegisStep === 'attack' ? '#f43f5e' : '#00f5d4')} strokeWidth="2" filter={isSevered ? 'url(#cyanGlow)' : ''} />
                  <text textAnchor="middle" dy="4" fill="#00f5d4" fontSize="12" fontFamily="var(--font-mono)">👑</text>
                  <text x="0" y="32" textAnchor="middle" fill={isSevered ? '#00f5d4' : (aegisStep === 'risk' ? '#f87171' : '#00f5d4')} fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">Domain Controller</text>
                  <text x="0" y="42" textAnchor="middle" fill={isSevered ? '#34d399' : '#f87171'} fontSize="7.5" fontFamily="var(--font-mono)">{isSevered ? 'SECURED ✓' : 'Crown Jewel'}</text>
                </g>

                {/* Top Badge: Active Phase */}
                <g transform="translate(16, 20)">
                  <rect width="210" height="18" rx="4" fill="rgba(0, 245, 212, 0.08)" stroke="rgba(0, 245, 212, 0.25)" />
                  <text x="8" y="13" fill="#00f5d4" fontSize="8" fontFamily="var(--font-mono)" fontWeight="bold">
                    TWIN STATE: {currData.status}
                  </text>
                </g>
              </svg>
            </div>

            {/* Metrics Strip */}
            <div className="aegis-metrics-strip">
              <div className="aegis-metric-pill">
                <span className="aegis-metric-kicker">CVSS Impact</span>
                <span className={`aegis-metric-val ${currData.riskClass}`}>{currData.riskScore}</span>
                <span className="aegis-metric-sub">Composite index</span>
              </div>
              <div className="aegis-metric-pill">
                <span className="aegis-metric-kicker">Lateral Path</span>
                <span className="aegis-metric-val">{currData.hopCount}</span>
                <span className="aegis-metric-sub">Dijkstra shortest</span>
              </div>
              <div className="aegis-metric-pill">
                <span className="aegis-metric-kicker">Defense Posture</span>
                <span className={`aegis-metric-val ${isSevered ? 'val-safe' : 'val-crit'}`}>{isSevered ? 'SEVERED' : 'EXPOSED'}</span>
                <span className="aegis-metric-sub">{currData.defenseStatus}</span>
              </div>
            </div>

            {/* Controls Row */}
            <div className="aegis-controls-row">
              <span className="aegis-flow-status">
                <span className={`aegis-flow-dot ${isSevered ? '' : 'dot-alert'}`} />
                {currData.title}
              </span>
              <div className="aegis-action-btn-group">
                <button
                  type="button"
                  className="btn-aegis-action"
                  onClick={handleAegisStepNext}
                >
                  Next Stage →
                </button>
                <button
                  type="button"
                  className="btn-aegis-action btn-fix"
                  onClick={() => setAegisStep(isSevered ? 'attack' : 'resim')}
                >
                  {isSevered ? '⚡ Re-run Attack' : '🛡️ Deploy Fix & Re-sim'}
                </button>
              </div>
            </div>

            {/* NetworkX Telemetry Console Window */}
            <div className="aegis-console-window">
              <div className="aegis-console-bar">
                <span>✦ NETWORKX &amp; FASTAPI DIGITAL TWIN LOGS</span>
                <span>PYTHON 3.11</span>
              </div>
              <pre className="aegis-console-body">{currData.code}</pre>
            </div>
          </div>
        );
      }

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
            An interactive showcase of engineering projects spanning agentless security telemetry, healthcare interoperability, sustainability forecasting, and autonomous cybersecurity digital twins.
          </p>

          {/* Filter Category Tabs */}
          <div className="project-filters-bar" role="tablist" aria-label="Filter projects">
            {[
              { id: 'all', label: 'All Exhibits' },
              { id: 'security', label: 'Cybersecurity' },
              { id: 'backend', label: 'Healthcare' },
              { id: 'ai', label: 'AI & Models' },
              { id: 'automation', label: 'Cyber Digital Twin' }
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
