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

const CSI_STAGES = {
  forecast: {
    id: 'forecast',
    label: '01. Cash Forecast',
    title: 'Monte Carlo 90-Day Liquidity Forecast',
    code: `// [CSI ORIGIN // HELM: MONTE CARLO LIQUIDITY FORECAST (NumPy)]
[*] Horizon: 90 Days | Iterations: 10,000 | Deterministic Seed: 0x9f4a12b
[+] Starting Book Cash       : ₹28,50,000
[+] Mandatory Liquidity Floor: ₹10,00,000 (Protected operating covenant)
[+] 90-Day Cash Trajectory Distribution:
    ├── P10 (Pessimistic - 90% Bound) : ₹14,20,000
    ├── P50 (Expected Median Path)    : ₹22,80,000
    └── P90 (Optimistic High Cash)    : ₹31,40,000
[!] DEPLOYABLE CASH COMPUTED: ₹18,50,000
    (Safe to allocate today without causing shortfall on any horizon day)
[!] Binding Liquidity Date  : Sim Day 42 (Quarterly tax + vendor batch)
[✓] Vectorized simulation completed in 84ms. Zero insolvency probability.`
  },
  optimizer: {
    id: 'optimizer',
    label: '02. MILP Optimizer',
    title: 'Scenario MILP Constrained Optimizer',
    code: `// [CSI ORIGIN // HELM: SCENARIO MILP INVOICE OPTIMIZER (PuLP/CBC)]
[*] Objective: Min Net Working Capital Cost (Financing + Penalties - Discounts)
[*] Open Invoices Evaluated: 3 Active Claims (100% decision coverage)

[+] INV-2041 (Tata Steel B2B • ₹8,40,000 • Due: Day 10)
    ├── ACTION: PAY_EARLY_DISCOUNT (2.5% 10-day early capture)
    ├── Projected Benefit: +₹21,000 discount captured | Effective IRR: 32.4% APR
    └── Rejected Alternatives:
        ├── HOLD (Cost delta: +₹21,000 lost discount opportunity)
        └── FINANCE (Cost delta: +₹7,200 financing interest drag)

[+] INV-2042 (Logistics Fleet • ₹5,10,000 • Due: Day 18)
    ├── ACTION: HOLD (Scheduled on standard due date)
    ├── Rationale: Conserves cash buffer until RCV-0004 settles on Day 12
    └── Penalty: ₹0 (No early discount terms offered)

[+] INV-2043 (Cloud Infra • ₹3,80,000 • Due: Day 8)
    ├── ACTION: FINANCE_SUPPLIER (Draw on 8.5% Overdraft Line)
    └── Rationale: Protects deployable liquidity; interest cost ₹2,690

[✓] Solved via CBC in 142ms. 2-second greedy fallback: NOT_TRIGGERED.
[✓] Net Working Capital Cost: -₹38,400 (Net positive savings generated).`
  },
  shock: {
    id: 'shock',
    label: '03. Chaos Shock',
    title: 'Chaos Panel: Emergency Shock & Re-Optimization',
    code: `// [CSI ORIGIN // HELM: CHAOS PANEL INJECTION & RE-OPTIMIZATION]
[!] EVENT INGESTED: NEW_OBLIGATION (GST Emergency Notice ₹9,00,000 in 5 days)
[⟳] Materiality Score: 0.88 > 0.40 threshold → Immediate Re-Solve Triggered!
[!] DEPLOYABLE CASH IMPACT:
    ├── Prior Deployable Cash: ₹18,50,000
    ├── Statutory Tax Demand : -₹9,00,000
    └── Revised Deployable   :  ₹9,50,000

[!] DYNAMIC ACTION FLIP DETECTED:
    ├── Target Invoice: INV-2041 (Tata Steel • ₹8,40,000)
    ├── PREVIOUS DECISION: PAY_EARLY_DISCOUNT (+₹21,000 discount)
    ├── NEW DECISION     : HOLD (Forfeit discount, pay on standard due date)
    └── OPTIMIZER PROOF:
        Paying early would reduce cash to ₹1,10,000 on Day 5, severely breaching
        the ₹10,00,000 liquidity floor once the ₹9,00,000 tax notice executes.

[✓] CBC re-solve converged in 118ms. Statutory solvency 100% secured.`
  },
  explainer: {
    id: 'explainer',
    label: '04. Grounded Explainer',
    title: 'Numerically Grounded Decision Explainer',
    code: `// [CSI ORIGIN // HELM: NUMERICALLY GROUNDED DECISION EXPLAINER]
[*] Explainer Engine: Groq gpt-oss-120b (Fallback: Deterministic Templates)
[*] Numeric Grounding Audit: PASSED (Every number reconciled against engine state)
--------------------------------------------------------------------------------
"Today HELM evaluated ₹28.50L in treasury assets, determining ₹18.50L as safe
 deployable cash above the ₹10.00L mandatory liquidity floor.

 The optimizer captured ₹21,000 in net savings by paying INV-2041 (Tata Steel)
 early at a 32.4% annualized return, while financing INV-2043 via the bank
 overdraft line to shield buffer volatility.

 Under the ₹9.00L emergency GST tax notice shock, the agent immediately
 flipped INV-2041 from PAY_EARLY_DISCOUNT to HOLD, intentionally forfeiting the
 ₹21,000 discount to eliminate an insolvency shortfall on Day 5.

 WOULD CHANGE IF:
 • Customer receivable RCV-0004 (₹12.0L) clears 5 days ahead of schedule.
 • Bank facility APR drops below 7.20%."`
  }
};

const AEGIS_STEPS = [
  { id: 'vuln', num: '01', label: 'Topology', fullName: 'Asset & CVE Ingestion' },
  { id: 'attack', num: '02', label: 'Attack Path', fullName: 'MITRE ATT&CK Traversal' },
  { id: 'risk', num: '03', label: 'Risk Impact', fullName: 'Blast Radius Matrix' },
  { id: 'fix', num: '04', label: 'Optimal Fix', fullName: 'Minimum-Cut Defense Policy' },
  { id: 'resim', num: '05', label: 'Verified', fullName: 'Digital Twin Verification' }
];

const AEGIS_NODES = {
  attacker: {
    id: 'attacker',
    name: 'External Threat Vector',
    ip: '198.51.100.24',
    zone: 'External WAN',
    service: 'Adversarial C2 Vector',
    vuln: 'External Entrypoint',
    technique: 'T1190 (Exploit Public-Facing App)',
    status: 'Active Threat Source',
    severity: 'crit'
  },
  dmz: {
    id: 'dmz',
    name: 'DMZ Ingress (Nginx)',
    ip: '10.0.1.5',
    zone: 'DMZ Perimeter Subnet',
    service: 'HTTPS Reverse Proxy (Port 443)',
    vuln: 'CVE-2023-38606 (CVSS 9.8 Critical RCE)',
    technique: 'T1190 Initial Access (Reverse Shell)',
    status: 'Compromised Entrypoint',
    severity: 'crit'
  },
  app: {
    id: 'app',
    name: 'FastAPI Core Cluster',
    ip: '10.0.2.14',
    zone: 'Internal Application LAN',
    service: 'REST Workers & API (Port 8000)',
    vuln: 'CVE-2024-21413 (CVSS 8.8 High NTLM Relay)',
    technique: 'T1550.002 (Pass-the-Hash Lateral Pivot)',
    status: 'Lateral Pivot Target',
    severity: 'warn'
  },
  dc: {
    id: 'dc',
    name: 'Domain Controller DC-01',
    ip: '10.0.3.2',
    zone: 'Crown Jewel Core',
    service: 'Active Directory / KDC (Port 88/389)',
    vuln: 'Critical Asset (Kerberos KDC)',
    technique: 'T1003 (OS Credential Dumping)',
    status: 'Crown Jewel Target',
    severity: 'target'
  }
};

const AEGIS_DATA = {
  vuln: {
    title: 'Vulnerability Ingestion & Asset Topology',
    status: 'Vulnerability Topology Ready',
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
    status: 'Attack Path Simulated',
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
    status: 'Blast Radius Evaluated',
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
    status: 'Mitigation Policy Enforced',
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
    status: 'Defense Verified',
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

  // Exhibit 2: CSI Origin state
  const [csiStage, setCsiStage] = useState('forecast');

  // Exhibit 3: Carbon state
  const [distance, setDistance] = useState(1200);
  const [renewable, setRenewable] = useState(30);
  const [volume, setVolume] = useState(2500);

  // Exhibit 4: AEGIS-TWIN state
  const [aegisStep, setAegisStep] = useState('vuln');
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showLogs, setShowLogs] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunAttack = () => {
    setIsSimulating(true);
    setAegisStep('attack');
    setTimeout(() => {
      setAegisStep('risk');
      setIsSimulating(false);
    }, 650);
  };

  const handleApplyFix = () => {
    setIsSimulating(true);
    setAegisStep('fix');
    setTimeout(() => {
      setAegisStep('resim');
      setIsSimulating(false);
    }, 650);
  };

  const handleResetAegis = () => {
    setAegisStep('vuln');
    setSelectedNodeId(null);
    setIsSimulating(false);
  };

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
        '2': 'prj-csi-origin',
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

  // Scroll synchronization: Listen for high-precision scroll engine spotlight updates
  useEffect(() => {
    const handleSync = (e) => {
      const prjId = e.detail && e.detail.projectId;
      if (prjId && prjId !== activeSpotlight) {
        setActiveSpotlight(prjId);
        if (onSelectProject) {
          onSelectProject(prjId);
        }
      }
    };
    window.addEventListener('project-spotlight-sync', handleSync);
    return () => window.removeEventListener('project-spotlight-sync', handleSync);
  }, [activeSpotlight, onSelectProject]);

  // Fallback IntersectionObserver for direct viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleSpotlightChange(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px', threshold: 0.15 }
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
              <span className="exhibit-label">✦ WinRM Remote Audit Probe</span>
              <button
                type="button"
                className="btn-copy-snippet"
                onClick={() => copyTextToClipboard(PROBE_OUTPUTS[probeView], 'probe')}
                aria-label="Copy audit output"
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

      case 'prj-csi-origin':
        return (
          <div className="project-interactive-exhibit exhibit-box-csi">
            <div className="exhibit-header">
              <span className="exhibit-label">✦ Autonomous Treasury Decision System</span>
              <button
                type="button"
                className="btn-copy-snippet"
                onClick={() => copyTextToClipboard(CSI_STAGES[csiStage].code, 'csi')}
                aria-label="Copy optimization stage"
              >
                {copiedSnippetId === 'csi' ? 'Copied ✓' : 'Copy Output'}
              </button>
            </div>
            <div className="csi-steps-row" role="tablist">
              {Object.values(CSI_STAGES).map((s) => (
                <button
                  key={s.id}
                  className={`csi-step-btn ${csiStage === s.id ? 'active' : ''}`}
                  role="tab"
                  aria-selected={csiStage === s.id}
                  type="button"
                  onClick={() => setCsiStage(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="csi-metrics-bar">
              <div className="csi-metric-pill">
                <span className="pill-kicker">DEPLOYABLE CASH</span>
                <span className={`pill-val ${csiStage === 'shock' ? 'val-warn' : 'val-cash'}`}>
                  {csiStage === 'shock' ? '₹9.50L (-₹9.0L)' : '₹18.50L'}
                </span>
              </div>
              <div className="csi-metric-pill">
                <span className="pill-kicker">LIQUIDITY FLOOR</span>
                <span className="pill-val">₹10.00L</span>
              </div>
              <div className="csi-metric-pill">
                <span className="pill-kicker">OPTIMIZER</span>
                <span className="pill-val val-opt">CBC (142ms)</span>
              </div>
              <div className="csi-metric-pill">
                <span className="pill-kicker">DECISION DIFF</span>
                <span className={`pill-val ${csiStage === 'shock' ? 'val-warn' : 'val-opt'}`}>
                  {csiStage === 'shock' ? '1 FLIP (HOLD)' : 'OPTIMAL'}
                </span>
              </div>
            </div>
            <pre className="telemetry-console csi-console">{CSI_STAGES[csiStage].code}</pre>
          </div>
        );

      case 'prj-carbon':
        return (
          <div className="project-interactive-exhibit exhibit-box-carbon">
            <div className="exhibit-header">
              <span className="exhibit-label">✦ Emissions Scenario Forecaster</span>
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
        const isAttackActive = aegisStep === 'attack' || aegisStep === 'risk';
        const selectedNode = selectedNodeId ? AEGIS_NODES[selectedNodeId] : null;

        return (
          <div className="project-interactive-exhibit exhibit-box-aegis">
            {/* 1. Cyber Range Header & Operations Toolbar */}
            <div className="aegis-dashboard-header">
              <div className="aegis-header-title-block">
                <div className="aegis-kicker-row">
                  <span className="aegis-kicker-tag">Cyber Digital Twin</span>
                  <span className="aegis-kicker-sep">&bull;</span>
                  <span className="aegis-kicker-sub">Adversarial Attack Graph</span>
                </div>
                <div className="aegis-state-indicator">
                  <span className={`aegis-indicator-dot ${isSevered ? 'dot-safe' : isAttackActive ? 'dot-alert' : 'dot-active'} ${isSimulating ? 'pulse-fast' : ''}`} />
                  <span className="aegis-state-text">
                    {isSimulating ? 'Simulating graph traversal...' : currData.status}
                  </span>
                </div>
              </div>

              <div className="aegis-toolbar-actions">
                <button
                  type="button"
                  className={`btn-aegis-toolbar btn-attack ${isAttackActive ? 'active' : ''} ${isSimulating && aegisStep === 'attack' ? 'loading' : ''}`}
                  onClick={handleRunAttack}
                  disabled={isSimulating}
                  title="Simulate adversarial attack traversal across network graph"
                >
                  <span className="btn-icon">⚡</span>
                  <span>{isSimulating && aegisStep === 'attack' ? 'Simulating...' : 'Simulate Attack'}</span>
                </button>

                <button
                  type="button"
                  className={`btn-aegis-toolbar btn-mitigate ${isSevered ? 'active' : ''} ${isSimulating && aegisStep === 'fix' ? 'loading' : ''}`}
                  onClick={handleApplyFix}
                  disabled={isSimulating}
                  title="Synthesize and enforce minimum-cut defense policy (ACL-901)"
                >
                  <span className="btn-icon">🛡️</span>
                  <span>{isSimulating && aegisStep === 'fix' ? 'Applying...' : 'Enforce Mitigation'}</span>
                </button>

                <button
                  type="button"
                  className="btn-aegis-toolbar btn-reset"
                  onClick={handleResetAegis}
                  disabled={isSimulating}
                  title="Reset digital twin topology to baseline state"
                >
                  <span className="btn-icon">↺</span>
                  <span>Reset</span>
                </button>

                <button
                  type="button"
                  className="btn-aegis-toolbar btn-copy"
                  onClick={() => copyTextToClipboard(currData.code, 'aegis')}
                  aria-label="Copy execution log"
                  title="Copy execution log to clipboard"
                >
                  <span>{copiedSnippetId === 'aegis' ? 'Copied ✓' : 'Copy Log'}</span>
                </button>
              </div>
            </div>

            {/* 2. Structured 5-Stage Stepper Ribbon */}
            <div className="aegis-pipeline-track" role="tablist" aria-label="AEGIS-TWIN 5-stage simulation pipeline">
              {AEGIS_STEPS.map((s, idx) => {
                const isActive = aegisStep === s.id;
                const isPassed = AEGIS_STEPS.findIndex((item) => item.id === aegisStep) > idx;

                return (
                  <button
                    key={s.id}
                    className={`aegis-pipeline-node ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                    role="tab"
                    aria-selected={isActive}
                    type="button"
                    onClick={() => {
                      setAegisStep(s.id);
                      setIsSimulating(false);
                    }}
                  >
                    <span className="node-num">{s.num}</span>
                    <span className="node-label">{s.label}</span>
                  </button>
                );
              })}
            </div>

            {/* 3. Primary Visual Centerpiece: Enterprise Network Simulation Viewport */}
            <div className="aegis-twin-viewport">
              <div className="aegis-viewport-hint">
                <span className="hint-glyph">✦</span>
                <span>Enterprise Network Topology &bull; Select any asset node to inspect vulnerability details</span>
              </div>

              <svg viewBox="0 0 760 215" className="aegis-graph-svg" aria-label="AEGIS-TWIN Cybersecurity Network Graph">
                <defs>
                  <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="redGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="emeraldGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <marker id="arrowRed" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#b37583" />
                  </marker>
                  <marker id="arrowEmerald" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8fa89b" />
                  </marker>
                  <marker id="arrowMuted" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6c8ea4" />
                  </marker>
                </defs>

                {/* Tactical Cyber Grid Background */}
                <rect width="760" height="215" className="aegis-grid-canvas" rx="10" />
                <line x1="0" y1="52" x2="760" y2="52" className="aegis-grid-line" strokeDasharray="4,4" />
                <line x1="0" y1="162" x2="760" y2="162" className="aegis-grid-line" strokeDasharray="4,4" />

                {/* Subnet Zone 1: External Threat Surface */}
                <g className="aegis-zone-group zone-wan">
                  <rect x="14" y="16" width="135" height="183" rx="8" className="aegis-zone-box zone-wan-box" />
                  <text x="24" y="32" className="aegis-zone-title zone-wan-title">EXTERNAL WAN</text>
                  <text x="24" y="43" className="aegis-zone-sub">UNTRUSTED VECTOR</text>
                </g>

                {/* Subnet Zone 2: DMZ Perimeter Subnet */}
                <g className="aegis-zone-group zone-dmz">
                  <rect x="165" y="16" width="175" height="183" rx="8" className="aegis-zone-box zone-dmz-box" />
                  <text x="175" y="32" className="aegis-zone-title zone-dmz-title">PERIMETER DMZ</text>
                  <text x="175" y="43" className="aegis-zone-sub">10.0.1.0/24 &bull; PORT 443</text>
                </g>

                {/* Subnet Zone 3: Internal Application LAN */}
                <g className="aegis-zone-group zone-app">
                  <rect x="355" y="16" width="185" height="183" rx="8" className="aegis-zone-box zone-app-box" />
                  <text x="365" y="32" className="aegis-zone-title zone-app-title">INTERNAL APP LAN</text>
                  <text x="365" y="43" className="aegis-zone-sub">10.0.2.0/24 &bull; PORT 8000</text>
                </g>

                {/* Subnet Zone 4: Crown Jewel Core Tier */}
                <g className="aegis-zone-group zone-core">
                  <rect x="555" y="16" width="190" height="183" rx="8" className="aegis-zone-box zone-core-box" />
                  <text x="565" y="32" className="aegis-zone-title zone-core-title">IDENTITY TIER</text>
                  <text x="565" y="43" className="aegis-zone-sub">10.0.3.0/24 &bull; KDC CORE</text>
                </g>

                {/* Network Edge 1: Attacker -> DMZ */}
                <line
                  x1="108"
                  y1="108"
                  x2="225"
                  y2="108"
                  className={`aegis-edge-line ${aegisStep !== 'vuln' ? 'edge-active-threat' : 'edge-muted'}`}
                  stroke={aegisStep !== 'vuln' ? '#b37583' : '#6c8ea4'}
                  strokeWidth={aegisStep !== 'vuln' ? '2.5' : '1.5'}
                  strokeDasharray={isAttackActive ? '6,4' : 'none'}
                  markerEnd={aegisStep !== 'vuln' ? 'url(#arrowRed)' : 'url(#arrowMuted)'}
                />
                {aegisStep !== 'vuln' && (
                  <g className="aegis-edge-badge">
                    <rect x="126" y="81" width="80" height="16" rx="4" className="aegis-edge-badge-bg threat" />
                    <text x="166" y="92" textAnchor="middle" className="aegis-edge-badge-text threat">
                      T1190 EXPLOIT
                    </text>
                  </g>
                )}

                {/* Network Edge 2: DMZ -> App Cluster (The Bridge / Severed Barrier) */}
                {isSevered ? (
                  <>
                    <line x1="279" y1="108" x2="318" y2="108" stroke="#b37583" strokeWidth="2" strokeDasharray="3,3" />
                    <g transform="translate(350, 108)" className="aegis-severed-shield">
                      <circle r="18" className="aegis-shield-circle" filter="url(#cyanGlow)" />
                      <text textAnchor="middle" dy="5" fontSize="13">🛡️</text>
                      <g className="aegis-shield-tag-top">
                        <rect x="-44" y="-34" width="88" height="17" rx="4" className="shield-tag-bg" />
                        <text x="0" y="-22" textAnchor="middle" className="shield-tag-text">ACL-901 SEVERED</text>
                      </g>
                      <g className="aegis-shield-tag-bottom">
                        <rect x="-40" y="24" width="80" height="16" rx="3" className="shield-tag-sub-bg" />
                        <text x="0" y="35" textAnchor="middle" className="shield-tag-sub-text">mTLS ENFORCED</text>
                      </g>
                    </g>
                    <line x1="382" y1="108" x2="420" y2="108" stroke="#8fa89b" strokeWidth="1.8" strokeDasharray="3,3" markerEnd="url(#arrowEmerald)" />
                  </>
                ) : (
                  <>
                    <line
                      x1="279"
                      y1="108"
                      x2="420"
                      y2="108"
                      className={`aegis-edge-line ${isAttackActive ? 'edge-active-threat' : 'edge-muted'}`}
                      stroke={isAttackActive ? '#b37583' : '#6c8ea4'}
                      strokeWidth={isAttackActive ? '2.5' : '1.5'}
                      strokeDasharray={isAttackActive ? '6,4' : 'none'}
                      markerEnd={isAttackActive ? 'url(#arrowRed)' : 'url(#arrowMuted)'}
                    />
                    {isAttackActive && (
                      <g className="aegis-edge-badge">
                        <rect x="306" y="81" width="88" height="16" rx="4" className="aegis-edge-badge-bg threat" />
                        <text x="350" y="92" textAnchor="middle" className="aegis-edge-badge-text threat">
                          T1550 LATERAL PIVOT
                        </text>
                      </g>
                    )}
                  </>
                )}

                {/* Network Edge 3: App Cluster -> Domain Controller */}
                <line
                  x1="474"
                  y1="108"
                  x2="623"
                  y2="108"
                  className={`aegis-edge-line ${isSevered ? 'edge-secure' : isAttackActive ? 'edge-active-threat' : 'edge-muted'}`}
                  stroke={isSevered ? '#8fa89b' : isAttackActive ? '#b37583' : '#6c8ea4'}
                  strokeWidth={isSevered || isAttackActive ? '2.5' : '1.5'}
                  strokeDasharray={!isSevered && isAttackActive ? '6,4' : 'none'}
                  markerEnd={isSevered ? 'url(#arrowEmerald)' : isAttackActive ? 'url(#arrowRed)' : 'url(#arrowMuted)'}
                />
                {isSevered ? (
                  <g className="aegis-edge-badge">
                    <rect x="500" y="81" width="96" height="16" rx="4" className="aegis-edge-badge-bg safe" />
                    <text x="548" y="92" textAnchor="middle" className="aegis-edge-badge-text safe">
                      ISOLATED &bull; SECURE ✓
                    </text>
                  </g>
                ) : isAttackActive ? (
                  <g className="aegis-edge-badge">
                    <rect x="498" y="81" width="100" height="16" rx="4" className="aegis-edge-badge-bg threat" />
                    <text x="548" y="92" textAnchor="middle" className="aegis-edge-badge-text threat">
                      T1003 GOLDEN TICKET
                    </text>
                  </g>
                ) : null}

                {/* Node 1: External Threat Vector */}
                <g
                  transform="translate(81, 108)"
                  className={`aegis-interactive-node ${selectedNodeId === 'attacker' ? 'is-selected' : ''}`}
                  onClick={() => setSelectedNodeId(selectedNodeId === 'attacker' ? null : 'attacker')}
                >
                  {selectedNodeId === 'attacker' && (
                    <circle r="34" className="node-select-ring threat" />
                  )}
                  <circle
                    r="24"
                    className="node-base-circle node-attacker"
                    filter={aegisStep !== 'vuln' ? 'url(#redGlow)' : ''}
                  />
                  <text textAnchor="middle" dy="5" fontSize="13">⚔️</text>
                  <text x="0" y="37" textAnchor="middle" className="node-title-text">Attacker</text>
                  <g className="node-pill-group">
                    <rect x="-42" y="44" width="84" height="15" rx="3" className="node-pill-bg threat" />
                    <text x="0" y="55" textAnchor="middle" className="node-pill-text threat">198.51.100.24</text>
                  </g>
                  <circle r="36" fill="transparent" cursor="pointer" />
                </g>

                {/* Node 2: DMZ Web Ingress */}
                <g
                  transform="translate(252, 108)"
                  className={`aegis-interactive-node ${selectedNodeId === 'dmz' ? 'is-selected' : ''}`}
                  onClick={() => setSelectedNodeId(selectedNodeId === 'dmz' ? null : 'dmz')}
                >
                  {selectedNodeId === 'dmz' && (
                    <circle r="34" className="node-select-ring warn" />
                  )}
                  <circle r="24" className="node-base-circle node-dmz" />
                  <text textAnchor="middle" dy="5" fontSize="13">🌐</text>
                  <text x="0" y="37" textAnchor="middle" className="node-title-text">DMZ Ingress</text>
                  <g className="node-pill-group">
                    <rect x="-48" y="44" width="96" height="15" rx="3" className="node-pill-bg warn" />
                    <text x="0" y="55" textAnchor="middle" className="node-pill-text warn">CVE-2023-38606</text>
                  </g>
                  <circle r="36" fill="transparent" cursor="pointer" />
                </g>

                {/* Node 3: App Cluster */}
                <g
                  transform="translate(447, 108)"
                  className={`aegis-interactive-node ${selectedNodeId === 'app' ? 'is-selected' : ''}`}
                  onClick={() => setSelectedNodeId(selectedNodeId === 'app' ? null : 'app')}
                >
                  {selectedNodeId === 'app' && (
                    <circle r="34" className={`node-select-ring ${isSevered ? 'safe' : 'app'}`} />
                  )}
                  <circle
                    r="24"
                    className={`node-base-circle ${isSevered ? 'node-app-safe' : 'node-app'}`}
                    filter={isSevered ? 'url(#emeraldGlow)' : ''}
                  />
                  <text textAnchor="middle" dy="5" fontSize="13">⚙️</text>
                  <text x="0" y="37" textAnchor="middle" className="node-title-text">App Cluster</text>
                  <g className="node-pill-group">
                    <rect x="-48" y="44" width="96" height="15" rx="3" className={`node-pill-bg ${isSevered ? 'safe' : 'app'}`} />
                    <text x="0" y="55" textAnchor="middle" className={`node-pill-text ${isSevered ? 'safe' : 'app'}`}>
                      {isSevered ? 'mTLS Guarded ✓' : 'CVE-2024-21413'}
                    </text>
                  </g>
                  <circle r="36" fill="transparent" cursor="pointer" />
                </g>

                {/* Node 4: Crown Jewel DC-01 */}
                <g
                  transform="translate(650, 108)"
                  className={`aegis-interactive-node ${selectedNodeId === 'dc' ? 'is-selected' : ''}`}
                  onClick={() => setSelectedNodeId(selectedNodeId === 'dc' ? null : 'dc')}
                >
                  {selectedNodeId === 'dc' && (
                    <circle r="34" className={`node-select-ring ${isSevered ? 'safe' : aegisStep === 'risk' ? 'threat' : 'core'}`} />
                  )}
                  <circle
                    r="24"
                    className={`node-base-circle ${isSevered ? 'node-core-safe' : aegisStep === 'risk' ? 'node-core-compromised' : 'node-core'}`}
                    filter={isSevered ? 'url(#cyanGlow)' : aegisStep === 'risk' ? 'url(#redGlow)' : ''}
                  />
                  <text textAnchor="middle" dy="5" fontSize="13">👑</text>
                  <text x="0" y="37" textAnchor="middle" className="node-title-text">Domain Controller</text>
                  <g className="node-pill-group">
                    <rect x="-48" y="44" width="96" height="15" rx="3" className={`node-pill-bg ${isSevered ? 'safe' : aegisStep === 'risk' ? 'threat' : 'core'}`} />
                    <text x="0" y="55" textAnchor="middle" className={`node-pill-text ${isSevered ? 'safe' : aegisStep === 'risk' ? 'threat' : 'core'}`}>
                      {isSevered ? 'SECURED ✓' : aegisStep === 'risk' ? 'COMPROMISED ✕' : 'Crown Jewel'}
                    </text>
                  </g>
                  <circle r="36" fill="transparent" cursor="pointer" />
                </g>
              </svg>
            </div>

            {/* 4. Contextual Asset Inspector */}
            {selectedNode ? (
              <div className="aegis-node-inspector" role="region" aria-label="Asset Inspector">
                <div className="inspector-head">
                  <div className="inspector-title">
                    <span className="inspector-glyph">✦</span>
                    <strong className="inspector-name">{selectedNode.name}</strong>
                    <code className="inspector-ip">{selectedNode.ip}</code>
                    <span className={`inspector-status-pill status-${selectedNode.severity}`}>
                      {selectedNode.status}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn-close-inspector"
                    onClick={() => setSelectedNodeId(null)}
                    aria-label="Close inspector"
                  >
                    ✕
                  </button>
                </div>
                <div className="inspector-grid">
                  <div className="inspector-item">
                    <span className="item-lbl">Network Zone</span>
                    <span className="item-val">{selectedNode.zone}</span>
                  </div>
                  <div className="inspector-item">
                    <span className="item-lbl">Running Service</span>
                    <span className="item-val">{selectedNode.service}</span>
                  </div>
                  <div className="inspector-item">
                    <span className="item-lbl">Vulnerability Details</span>
                    <span className="item-val val-warn">{selectedNode.vuln}</span>
                  </div>
                  <div className="inspector-item">
                    <span className="item-lbl">MITRE ATT&amp;CK Technique</span>
                    <span className="item-val val-mono">{selectedNode.technique}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aegis-inspector-empty-hint">
                <span className="hint-glyph">✦</span>
                <span>Select an asset node above to inspect vulnerability details &amp; MITRE ATT&amp;CK mappings</span>
              </div>
            )}

            {/* 5. Actionable Risk Matrix: Before vs. After Impact */}
            <div className="aegis-impact-matrix">
              <div className={`impact-card pre-defense ${isAttackActive ? 'highlight-threat' : ''}`}>
                <div className="impact-card-top">
                  <div className="impact-kicker-group">
                    <span className="impact-card-dot threat" />
                    <span className="impact-kicker threat">PRE-MITIGATION RISK</span>
                  </div>
                  <span className="impact-score score-crit">9.8 <small>/ 10.0</small></span>
                </div>
                <div className="impact-stats-list">
                  <div className="impact-stat-item">
                    <span className="stat-label">Lateral Hop Path</span>
                    <strong className="stat-value">3 Hops (Direct Penetration)</strong>
                  </div>
                  <div className="impact-stat-item">
                    <span className="stat-label">Crown Jewel Reach</span>
                    <strong className="stat-value val-danger">100% Compromised</strong>
                  </div>
                  <div className="impact-stat-item">
                    <span className="stat-label">Exploit Sequence</span>
                    <strong className="stat-value val-mono">T1190 &rarr; T1550 &rarr; T1003</strong>
                  </div>
                </div>
              </div>

              <div className="impact-matrix-delta">
                <div className="delta-pill">
                  <span className="delta-arrow">&darr;</span>
                  <span className="delta-number">-88%</span>
                  <span className="delta-label">RISK REDUCTION</span>
                </div>
                <span className="delta-subtext">Zero-Downtime Microsegmentation</span>
              </div>

              <div className={`impact-card post-defense ${isSevered ? 'highlight-safe' : ''}`}>
                <div className="impact-card-top">
                  <div className="impact-kicker-group">
                    <span className={`impact-card-dot ${isSevered ? 'safe' : 'pending'}`} />
                    <span className={`impact-kicker ${isSevered ? 'safe' : 'pending'}`}>
                      {isSevered ? 'POST-DEFENSE VERIFIED' : 'DEFENSE POLICY PENDING'}
                    </span>
                  </div>
                  <span className={`impact-score ${isSevered ? 'score-safe' : 'score-pending'}`}>
                    {isSevered ? '1.2' : '3.2'} <small>/ 10.0</small>
                  </span>
                </div>
                <div className="impact-stats-list">
                  <div className="impact-stat-item">
                    <span className="stat-label">Residual Attack Paths</span>
                    <strong className="stat-value">{isSevered ? '0 Valid Paths (Severed)' : 'Pending Synthesis'}</strong>
                  </div>
                  <div className="impact-stat-item">
                    <span className="stat-label">Crown Jewel Reach</span>
                    <strong className={`stat-value ${isSevered ? 'val-success' : 'val-warn'}`}>
                      {isSevered ? 'Isolated & Protected ✓' : 'Cut Required'}
                    </strong>
                  </div>
                  <div className="impact-stat-item">
                    <span className="stat-label">Policy Enforcement</span>
                    <strong className="stat-value">{isSevered ? 'Microsegmentation ACL-901' : 'Awaiting Mitigation Run'}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Collapsible Technical Execution Logs */}
            <div className="aegis-collapsible-logs">
              <button
                type="button"
                className="aegis-logs-toggle-btn"
                onClick={() => setShowLogs((prev) => !prev)}
                aria-expanded={showLogs}
              >
                <div className="toggle-left">
                  <span className="toggle-terminal-prompt">&gt;_</span>
                  <span>Simulation Execution Output ({currData.title})</span>
                </div>
                <div className="toggle-right">
                  <span className="py-tag">Python 3.11</span>
                  <span className="toggle-action-text">{showLogs ? '▲ Collapse Logs' : '▼ Expand Logs'}</span>
                </div>
              </button>

              {showLogs && (
                <div className="aegis-console-wrapper">
                  <pre className="aegis-console-body">{currData.code}</pre>
                </div>
              )}
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
            An interactive showcase of engineering projects spanning agentless security telemetry, autonomous working-capital management, sustainability forecasting, and autonomous cybersecurity digital twins.
          </p>

          {/* Filter Category Tabs */}
          <div className="project-filters-bar" role="tablist" aria-label="Filter projects">
            {[
              { id: 'all', label: 'All Exhibits' },
              { id: 'security', label: 'Cybersecurity' },
              { id: 'backend', label: 'Autonomous Treasury' },
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
                        Project {project.number} &bull; {project.categoryLabel}
                      </span>
                      <span className={`project-status ${project.statusType === 'implemented' ? 'status-prototype' : 'status-concept'}`}>
                        <span className="status-pulse-dot" />
                        {project.status}
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
                    Project {activeProjectObj.number} &bull; {activeProjectObj.categoryLabel}
                  </span>
                  <h4 className="stage-title">{activeProjectObj.title.split('—')[0].trim()}</h4>
                </div>
                <div className="stage-topbar-badge">
                  <span className={`status-badge-mini ${activeProjectObj.statusType === 'implemented' ? 'status-live' : 'status-proto'}`}>
                    {activeProjectObj.statusType === 'implemented' ? 'Interactive Demo' : 'Simulation'}
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
