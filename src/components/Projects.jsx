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

const MULE_STAGES = {
  simulation: {
    id: 'simulation',
    label: '01. Tx Simulation',
    title: 'Synthetic e₹ Token & Programmable Lineage Generator',
    disclaimer: 'Offline Simulation Sandbox • No Live Banking / RBI Infrastructure',
    metrics: [
      { kicker: 'DATASET TYPE', val: 'Synthetic e₹ (CBDC)', cls: 'val-opt' },
      { kicker: 'TX HOPS TRACED', val: '4 Intermediary Hops', cls: '' },
      { kicker: 'ENGINE', val: 'Python / NetworkX', cls: 'val-cash' },
      { kicker: 'RISK INDICATION', val: 'Potential Risk (Investigate)', cls: 'val-warn' }
    ],
    code: `// [MULE MATRIX // COMPONENT 1: SYNTHETIC e₹ TRANSACTION & LINEAGE SIMULATION]
[*] Environment: Synthetic programmable CBDC / e₹ testbed (Offline Simulation Sandbox)
[!] NOTICE: Simulation environment only; no connection to live banking or RBI infrastructure.
[*] Token Specification: Programmable purpose-bound tokens with cryptographic lineage metadata

[+] Genesis Ingestion Batch: 2,450 synthetic transaction records
    ├── Origin Account: ACC_EXT_9921 (Simulated external off-ramp entry)
    ├── Simulated Seed Amount: e₹ 4,80,000 (Time: 2026-03-12 04:12:00 IST)
    └── Token Metadata: TokenID #eINR-9921-A ... #eINR-9921-Z [Programmable transfer flag: ENABLED]

[+] Initial Fan-Out Dispersal (Layer 1 - Within 14 minutes):
    ├── TX-88102 → ACC_MULE_101 : e₹ 1,20,000 (Δt = +04m 12s)
    ├── TX-88103 → ACC_MULE_102 : e₹ 1,20,000 (Δt = +06m 45s)
    ├── TX-88104 → ACC_MULE_103 : e₹ 1,20,000 (Δt = +09m 10s)
    └── TX-88105 → ACC_MULE_104 : e₹ 1,20,000 (Δt = +13m 52s)

[✓] Synthetic lineage stream verified. 100% token sequence and timestamp integrity preserved.`
  },
  lineage: {
    id: 'lineage',
    label: '02. Lineage Tracer',
    title: 'Multi-Hop Fund Flow & Provenance Lineage Engine',
    disclaimer: 'Recursive Provenance Traverser (Breadth/Depth Directed Lineage)',
    metrics: [
      { kicker: 'DISPERSAL RATE', val: '4 Splits → 8 Sub-paths', cls: 'val-opt' },
      { kicker: 'LAYER DEPTH', val: '4 Intermediary Tiers', cls: '' },
      { kicker: 'HOP VELOCITY', val: 'avg 6.2 min / hop', cls: 'val-cash' },
      { kicker: 'PATTERN', val: 'Layering Scheme', cls: 'val-warn' }
    ],
    code: `// [MULE MATRIX // COMPONENT 2: MULTI-HOP FUND FLOW & LINEAGE TRACING ENGINE]
[*] Algorithm: Recursive multi-hop lineage traversal across directed transaction DAG
[*] Traversal Depth: Max 6 hops | Time window constraint: Δt ≤ 120 minutes

[+] Path Provenance Trace (Origin ACC_EXT_9921 → Destination Endpoints):
    ├── HOP 0: ACC_EXT_9921 [e₹ 4,80,000]
    ├── HOP 1 (Rapid Fan-Out Dispersal):
    │   ├── Sub-split A: ACC_MULE_101 [e₹ 1,20,000] → Split to 2 sub-accounts in 8 mins
    │   ├── Sub-split B: ACC_MULE_102 [e₹ 1,20,000] → Split to 2 sub-accounts in 11 mins
    │   ├── Sub-split C: ACC_MULE_103 [e₹ 1,20,000] → Forwarded directly in 5 mins
    │   └── Sub-split D: ACC_MULE_104 [e₹ 1,20,000] → Dormant account activated
    ├── HOP 2 (Intermediary Layering):
    │   └── Funds dispersed into 8 micro-transfers (avg e₹ 60,000 each)
    └── HOP 3 (Re-aggregation Convergence / Pooling):
        ├── 6 micro-transfers funnel into ACC_POOL_808 within 22 minutes (e₹ 3,60,000)
        └── 2 micro-transfers routed to ACC_POS_MERCHANT_44 (e₹ 1,20,000)

[✓] Full lineage path assembled: 14 directed edges, zero orphan transactions.`
  },
  graph: {
    id: 'graph',
    label: '03. Graph Intelligence',
    title: 'Temporal Directed Multigraph & Mule Cluster Detection',
    disclaimer: 'NetworkX Graph Analytics Engine • Dynamic Time-Associated Edges',
    metrics: [
      { kicker: 'GRAPH TOPOLOGY', val: '28 Nodes • 42 Edges', cls: 'val-opt' },
      { kicker: 'FAN-IN RATIO', val: '6:1 Inflow Velocity', cls: '' },
      { kicker: 'BURST DETECTED', val: '< 18 min Window', cls: 'val-cash' },
      { kicker: 'CLUSTER STATE', val: 'Coordinated Ring', cls: 'val-warn' }
    ],
    code: `// [MULE MATRIX // COMPONENT 3: TEMPORAL GRAPH INTELLIGENCE & CLUSTER ANALYTICS]
[*] Graph Structure: Directed Temporal Multigraph G = (V, E, T)
[*] Node Attributes: AccountID, account_tenure, mean_historical_balance, in_degree, out_degree
[*] Edge Attributes: tx_id, token_amount_e₹, timestamp_utc, latency_from_prev_tx

[+] Network Topology & Anomaly Analysis:
    ├── Rapid Fan-Out Velocity: In-degree 1 → Out-degree 4 within 14 min (Z-score: +4.2)
    ├── Rapid Pooling (Fan-In): In-degree 6 → Out-degree 1 at ACC_POOL_808 (Concentration: 75%)
    ├── Temporal Closeness Metric: 89.4% of total funds transferred across 3 hops in < 45 min
    └── Account Profile Mismatch:
        ├── ACC_MULE_101: 180-day dormant account suddenly handling 12x median volume
        └── ACC_POOL_808: Registered personal wallet receiving 6 concurrent third-party flows

[!] Heuristic Flag: High-confidence money-mule layering & pooling cluster topology identified.
[✓] Network anomaly cluster isolated for explainable risk assessment.`
  },
  findings: {
    id: 'findings',
    label: '04. Risk & Findings',
    title: 'Explainable Risk Analysis & Cash-Out Point Investigation',
    disclaimer: 'Potential Risk Indicators Requiring Human Investigation • Not Conclusive Proof',
    metrics: [
      { kicker: 'SUSPICIOUS FLOW', val: 'e₹ 4,80,000 Traced', cls: 'val-opt' },
      { kicker: 'CASHOUT TARGETS', val: '2 Flagged Endpoints', cls: 'val-warn' },
      { kicker: 'EVIDENCE ITEMS', val: '14 Correlated Txs', cls: 'val-cash' },
      { kicker: 'INVESTIGATION', val: 'PRIORITY_HIGH', cls: 'val-warn' }
    ],
    code: `// [MULE MATRIX // COMPONENT 4 & 5: EXPLAINABLE RISK FINDINGS & INVESTIGATION REPORT]
[*] Status: Suspicious transaction pattern flagged for human investigator review
[!] CLASSIFICATION: POTENTIAL MONEY-MULE NETWORK (Requires formal compliance review)
[*] Note: Indicators represent potential risk heuristics; definitive determination rests with investigators.

[+] Summary of Investigation Findings:
    ├── Potential Source of Suspicious Inflow: ACC_EXT_9921 (Simulated external transfer)
    ├── Amount at Risk: e₹ 4,80,000 transferred via 4-hop layering scheme
    ├── Primary Cash-Out Suspects:
    │   ├── Endpoint A: ACC_POOL_808 (P2P wallet, e₹ 3,60,000 accumulated, withdrawal pending)
    │   └── Endpoint B: ACC_POS_MERCHANT_44 (Point-of-Sale cash-equivalent voucher route, e₹ 1,20,000)
    └── Supporting Forensic Evidence Chain:
        • Evidence #1: 4 rapid split transactions originating < 15 min from genesis
        • Evidence #2: Intermediary accounts exhibit zero balance retention (< 3 min dwell time)
        • Evidence #3: Temporal multigraph in-degree burst exceeds baseline by 6.8x

[✓] Investigation dossier compiled with timestamped transaction lineage graph.`
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

/* ==========================================================================
   ISOLATED EXHIBIT COMPONENTS (Dedicated state, zero cross-project leakage)
   ========================================================================== */

function ProbeExhibit() {
  const [probeView, setProbeView] = useState('discovery');
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const copyTextToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedSnippetId('probe');
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => setCopiedSnippetId(null), 2000);
      });
    }
  };

  return (
    <div className="project-interactive-exhibit exhibit-box-security">
      <div className="exhibit-header">
        <span className="exhibit-label">WinRM Remote Audit Probe</span>
        <button
          type="button"
          className="btn-copy-snippet"
          onClick={() => copyTextToClipboard(PROBE_OUTPUTS[probeView])}
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
}

function MuleExhibit() {
  const [muleStage, setMuleStage] = useState('simulation');
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const currentStageObj = MULE_STAGES[muleStage] || MULE_STAGES.simulation;

  const copyTextToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedSnippetId('mule');
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => setCopiedSnippetId(null), 2000);
      });
    }
  };

  return (
    <div className="project-interactive-exhibit exhibit-box-mule exhibit-box-csi">
      <div className="exhibit-header">
        <span className="exhibit-label">Synthetic e₹ Lineage &amp; Mule Tracing</span>
        <button
          type="button"
          className="btn-copy-snippet"
          onClick={() => copyTextToClipboard(currentStageObj.code)}
          aria-label="Copy fraud investigation stage output"
        >
          {copiedSnippetId === 'mule' ? 'Copied ✓' : 'Copy Output'}
        </button>
      </div>
      <div className="csi-steps-row mule-steps-row" role="tablist">
        {Object.values(MULE_STAGES).map((s) => (
          <button
            key={s.id}
            className={`csi-step-btn mule-step-btn ${muleStage === s.id ? 'active' : ''}`}
            role="tab"
            aria-selected={muleStage === s.id}
            type="button"
            onClick={() => setMuleStage(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="csi-metrics-bar mule-metrics-bar">
        {currentStageObj.metrics.map((m, idx) => (
          <div key={idx} className="csi-metric-pill mule-metric-pill">
            <span className="pill-kicker">{m.kicker}</span>
            <span className={`pill-val ${m.cls || ''}`}>{m.val}</span>
          </div>
        ))}
      </div>
      <div
        className="mule-sandbox-notice"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          background: 'rgba(45, 212, 167, 0.08)',
          border: '1px solid rgba(45, 212, 167, 0.2)',
          borderRadius: '6px',
          marginBottom: '10px',
          fontSize: '0.68rem',
          color: '#99f6e4',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <span>•</span>
        <span>{currentStageObj.disclaimer}</span>
      </div>
      <pre className="telemetry-console csi-console mule-console">{currentStageObj.code}</pre>
    </div>
  );
}

function CarbonExhibit() {
  const PRESETS = {
    baseline: { label: 'Baseline Ops', distance: 1200, renewable: 30, volume: 2500 },
    green: { label: 'Green Transition', distance: 800, renewable: 75, volume: 2500 },
    nearshore: { label: 'Nearshore Sourcing', distance: 350, renewable: 30, volume: 2500 },
    highvol: { label: 'High Volume', distance: 1200, renewable: 30, volume: 4800 }
  };

  const [distance, setDistance] = useState(1200);
  const [renewable, setRenewable] = useState(30);
  const [volume, setVolume] = useState(2500);
  const [activePreset, setActivePreset] = useState('baseline');
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const applyPreset = (key) => {
    const p = PRESETS[key];
    setDistance(p.distance);
    setRenewable(p.renewable);
    setVolume(p.volume);
    setActivePreset(key);
  };

  const scope1 = Math.round((volume * 0.08) * (1 - renewable * 0.005));
  const scope2 = Math.round((volume * 0.06) * (1 - renewable * 0.008));
  const scope3 = Math.round(distance * 0.065 + volume * 0.015);
  const totalCo2 = scope1 + scope2 + scope3;
  const intensityKg = totalCo2 > 0 ? ((totalCo2 * 1000) / volume).toFixed(1) : '0.0';

  const renewableAbatement = Math.round((100 - renewable) * 0.8);
  const logisticsExposure = Math.round((distance / 4000) * 100);
  const prodElasticity = Math.round((volume / 5000) * 100);

  const copyTextToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedSnippetId('carbon');
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => setCopiedSnippetId(null), 2000);
      });
    }
  };

  return (
    <div className="project-interactive-exhibit exhibit-box-carbon">
      <div className="exhibit-header">
        <span className="exhibit-label">GHG Emissions Scenario Forecaster</span>
        <button
          type="button"
          className="btn-copy-snippet"
          onClick={() =>
            copyTextToClipboard(
              `Scope 1: ${scope1} MT | Scope 2: ${scope2} MT | Scope 3: ${scope3} MT | Total: ${totalCo2} MT CO2e | Intensity: ${intensityKg} kg/unit`
            )
          }
          aria-label="Copy carbon forecast summary"
        >
          {copiedSnippetId === 'carbon' ? 'Copied ✓' : 'Copy Metrics'}
        </button>
      </div>

      {/* Scenario Presets */}
      <div className="carbon-presets-row">
        {Object.entries(PRESETS).map(([key, p]) => (
          <button
            key={key}
            type="button"
            className={`carbon-preset-btn ${activePreset === key ? 'active' : ''}`}
            onClick={() => applyPreset(key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Sandbox disclaimer */}
      <div className="carbon-sandbox-notice">
        <span>•</span>
        <span>Research Scenario Sandbox · GHG Protocol Scope 1/2/3 Framework · Illustrative Model Outputs</span>
      </div>

      {/* Sliders */}
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
            onChange={(e) => { setDistance(Number(e.target.value)); setActivePreset(''); }}
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
            onChange={(e) => { setRenewable(Number(e.target.value)); setActivePreset(''); }}
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
            onChange={(e) => { setVolume(Number(e.target.value)); setActivePreset(''); }}
          />
        </div>
      </div>

      {/* GHG Protocol Scope Breakdown */}
      <div className="carbon-output-bars">
        <div className="output-stat-row">
          <span>Scope 1 — Direct Fuels:</span>
          <strong>{scope1} MT</strong>
          <div className="stat-bar-track">
            <div className="stat-bar-fill bar-s1" style={{ width: `${Math.min(100, (scope1 / 300) * 100)}%` }}></div>
          </div>
        </div>
        <div className="output-stat-row">
          <span>Scope 2 — Purchased Power:</span>
          <strong>{scope2} MT</strong>
          <div className="stat-bar-track">
            <div className="stat-bar-fill bar-s2" style={{ width: `${Math.min(100, (scope2 / 200) * 100)}%` }}></div>
          </div>
        </div>
        <div className="output-stat-row">
          <span>Scope 3 — Logistics & Supply:</span>
          <strong>{scope3} MT</strong>
          <div className="stat-bar-track">
            <div className="stat-bar-fill bar-s3" style={{ width: `${Math.min(100, (scope3 / 300) * 100)}%` }}></div>
          </div>
        </div>
        <div className="total-emission-badge">
          <span>PROJECTED TOTAL:</span>
          <strong>{totalCo2} MT CO2e</strong>
          <span className="emission-intensity-badge">{intensityKg} kg / unit</span>
        </div>
      </div>

      {/* Sensitivity & Scenario Impact */}
      <div className="carbon-sensitivity-grid">
        <div className="sensitivity-card">
          <div className="sens-header">
            <span className="sens-label">Renewable Abatement</span>
            <span className={`sens-val ${renewableAbatement > 60 ? 'sens-good' : renewableAbatement > 30 ? 'sens-warn' : 'sens-crit'}`}>
              {renewableAbatement}% reduction potential
            </span>
          </div>
          <div className="sens-bar-track">
            <div className="sens-bar-fill sens-green" style={{ width: `${renewableAbatement}%` }} />
          </div>
          <span className="sens-desc">PPA clean power procurement impact on Scope 2 exposure</span>
        </div>
        <div className="sensitivity-card">
          <div className="sens-header">
            <span className="sens-label">Logistics Exposure</span>
            <span className={`sens-val ${logisticsExposure > 60 ? 'sens-crit' : logisticsExposure > 35 ? 'sens-warn' : 'sens-good'}`}>
              {logisticsExposure}% of cap
            </span>
          </div>
          <div className="sens-bar-track">
            <div className="sens-bar-fill sens-amber" style={{ width: `${logisticsExposure}%` }} />
          </div>
          <span className="sens-desc">Scope 3 sensitivity to freight distance vs budget ceiling</span>
        </div>
        <div className="sensitivity-card">
          <div className="sens-header">
            <span className="sens-label">Production Elasticity</span>
            <span className={`sens-val ${prodElasticity > 70 ? 'sens-crit' : prodElasticity > 45 ? 'sens-warn' : 'sens-good'}`}>
              {prodElasticity}% load factor
            </span>
          </div>
          <div className="sens-bar-track">
            <div className="sens-bar-fill sens-blue" style={{ width: `${prodElasticity}%` }} />
          </div>
          <span className="sens-desc">Scope 1 linear scaling vs unit volume throughput</span>
        </div>
      </div>

      {/* Mitigation Guidance Banner */}
      <div className="carbon-mitigation-banner">
        <span className="mitigation-icon">⚡</span>
        <div className="mitigation-text">
          <strong>Mitigation Lever:</strong>
          {renewable < 50
            ? ' Increase renewable mix via PPA contracts — highest Scope 2 ROI pathway.'
            : distance > 2000
            ? ' Nearshore supplier network — Scope 3 freight is dominant emission driver.'
            : ' Profile is within low-risk threshold. Optimise volume scheduling to reduce Scope 1 variance.'}
        </div>
      </div>

      {/* Tech Stack Badges */}
      <div className="carbon-tech-badges">
        {['Python 3.11', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'].map((badge) => (
          <span key={badge} className="carbon-tech-badge">{badge}</span>
        ))}
      </div>
    </div>
  );
}


function AegisExhibit() {
  const [aegisStep, setAegisStep] = useState('vuln');
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showLogs, setShowLogs] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);

  const simTimeoutRef = useRef(null);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (simTimeoutRef.current) clearTimeout(simTimeoutRef.current);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleRunAttack = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setAegisStep('attack');
    simTimeoutRef.current = setTimeout(() => {
      setAegisStep('risk');
      setIsSimulating(false);
    }, 1200);
  };

  const handleApplyFix = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setAegisStep('fix');
    simTimeoutRef.current = setTimeout(() => {
      setAegisStep('resim');
      setIsSimulating(false);
    }, 1200);
  };

  const handleResetAegis = () => {
    if (simTimeoutRef.current) clearTimeout(simTimeoutRef.current);
    setAegisStep('vuln');
    setSelectedNodeId(null);
    setIsSimulating(false);
  };

  const copyTextToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedSnippetId('aegis');
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => setCopiedSnippetId(null), 2000);
      });
    }
  };

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
            <span
              className={`aegis-indicator-dot ${
                isSevered ? 'dot-safe' : isAttackActive ? 'dot-alert' : 'dot-active'
              } ${isSimulating ? 'pulse-fast' : ''}`}
            />
            <span className="aegis-state-text">
              {isSimulating ? 'Simulating graph traversal...' : currData.status}
            </span>
          </div>
        </div>

        <div className="aegis-toolbar-actions">
          <button
            type="button"
            className={`btn-aegis-toolbar btn-attack ${isAttackActive ? 'active' : ''} ${
              isSimulating && aegisStep === 'attack' ? 'loading' : ''
            }`}
            onClick={handleRunAttack}
            disabled={isSimulating}
            title="Simulate adversarial attack traversal across network graph"
          >
            <span className="btn-icon">⚡</span>
            <span>{isSimulating && aegisStep === 'attack' ? 'Simulating...' : 'Simulate Attack'}</span>
          </button>

          <button
            type="button"
            className={`btn-aegis-toolbar btn-mitigate ${isSevered ? 'active' : ''} ${
              isSimulating && aegisStep === 'fix' ? 'loading' : ''
            }`}
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
            onClick={() => copyTextToClipboard(currData.code)}
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
          <span className="hint-glyph">•</span>
          <span>Enterprise Network Topology &bull; Select any asset node to inspect vulnerability details</span>
        </div>

        <svg viewBox="0 0 760 220" className="aegis-graph-svg" aria-label="AEGIS-TWIN Cybersecurity Network Graph">
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
          <rect width="760" height="220" className="aegis-grid-canvas" rx="10" />
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
            {selectedNodeId === 'attacker' && <circle r="34" className="node-select-ring threat" />}
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
            {selectedNodeId === 'dmz' && <circle r="34" className="node-select-ring warn" />}
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
              <circle
                r="34"
                className={`node-select-ring ${isSevered ? 'safe' : aegisStep === 'risk' ? 'threat' : 'core'}`}
              />
            )}
            <circle
              r="24"
              className={`node-base-circle ${
                isSevered ? 'node-core-safe' : aegisStep === 'risk' ? 'node-core-compromised' : 'node-core'
              }`}
              filter={isSevered ? 'url(#cyanGlow)' : aegisStep === 'risk' ? 'url(#redGlow)' : ''}
            />
            <text textAnchor="middle" dy="5" fontSize="13">👑</text>
            <text x="0" y="37" textAnchor="middle" className="node-title-text">Domain Controller</text>
            <g className="node-pill-group">
              <rect
                x="-48"
                y="44"
                width="96"
                height="15"
                rx="3"
                className={`node-pill-bg ${isSevered ? 'safe' : aegisStep === 'risk' ? 'threat' : 'core'}`}
              />
              <text
                x="0"
                y="55"
                textAnchor="middle"
                className={`node-pill-text ${isSevered ? 'safe' : aegisStep === 'risk' ? 'threat' : 'core'}`}
              >
                {isSevered ? 'SECURED ✓' : aegisStep === 'risk' ? 'COMPROMISED ✕' : 'Crown Jewel'}
              </text>
            </g>
            <circle r="36" fill="transparent" cursor="pointer" />
          </g>
        </svg>
      </div>

      {/* 4. Contextual Asset Inspector (Drawer when node clicked) */}
      {selectedNode ? (
        <div className="aegis-node-inspector" role="region" aria-label="Asset Inspector">
          <div className="inspector-head">
            <div className="inspector-title">
              <span className="inspector-glyph">•</span>
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
              <span className="item-lbl">Vulnerability</span>
              <span className="item-val val-warn">{selectedNode.vuln}</span>
            </div>
            <div className="inspector-item">
              <span className="item-lbl">ATT&amp;CK Technique</span>
              <span className="item-val val-mono">{selectedNode.technique}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="aegis-inspector-empty-hint">
          <span className="hint-glyph">•</span>
          <span>Click any node in the topology above to inspect vulnerabilities &amp; ATT&amp;CK mappings</span>
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
              <strong className="stat-value">3 Hops (Direct)</strong>
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
            <span className="toggle-action-text">{showLogs ? '▲ Collapse' : '▼ Expand'}</span>
          </div>
        </button>
        {showLogs && (
          <pre
            className="telemetry-console aegis-console"
            style={{ maxHeight: '140px', overflowY: 'auto', overscrollBehavior: 'contain', margin: 0 }}
          >
            {currData.code}
          </pre>
        )}
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN PROJECTS COMPONENT
   ========================================================================== */

export default function Projects({
  activeProjectId = 'prj-probe360',
  onSelectProject,
  selectedSkillId,
  onSelectSkill
}) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [openDrawers, setOpenDrawers] = useState({});
  const [activeSpotlight, setActiveSpotlight] = useState(activeProjectId);
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth <= 992 : false));

  const activeSpotlightRef = useRef(activeSpotlight);
  activeSpotlightRef.current = activeSpotlight;

  const isProgrammaticScrollRef = useRef(false);
  const scrollLockTimeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 992px)');
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const handleSpotlightChange = (prjId, isManual = false) => {
    if (isManual) {
      isProgrammaticScrollRef.current = true;
      if (scrollLockTimeoutRef.current) clearTimeout(scrollLockTimeoutRef.current);
      scrollLockTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 750);
    }
    setActiveSpotlight(prjId);
    if (onSelectProject) {
      onSelectProject(prjId);
    }
    const colorMap = {
      'prj-probe360': '#8fa89b',
      'prj-mule-matrix': '#2dd4a7',
      'prj-carbon': '#b8a9c9',
      'prj-aegis': '#8fa89b'
    };
    if (colorMap[prjId]) {
      document.documentElement.style.setProperty('--active-project-color', colorMap[prjId]);
    }
  };

  // Sync with prop if provided externally
  useEffect(() => {
    if (activeProjectId && activeProjectId !== activeSpotlightRef.current) {
      handleSpotlightChange(activeProjectId, true);
    }
  }, [activeProjectId]);

  // Filter projects list (4 projects)
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return PROJECTS;
    if (activeFilter === 'security') {
      return PROJECTS.filter((p) => p.category === 'security' || p.id === 'aegis');
    }
    if (activeFilter === 'fintech' || activeFilter === 'backend') {
      return PROJECTS.filter((p) => p.category === 'fintech' || p.id === 'mule-matrix');
    }
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Keep active spotlight synchronized if filtered out
  useEffect(() => {
    const isVisible = filteredProjects.some((p) => `prj-${p.id}` === activeSpotlightRef.current);
    if (!isVisible && filteredProjects.length > 0) {
      handleSpotlightChange(`prj-${filteredProjects[0].id}`, true);
    }
  }, [activeFilter, filteredProjects]);

  // Robust, stabilized IntersectionObserver with strict hysteresis for smooth project focal alignment
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const entries = document.querySelectorAll('.project-narrative-entry');
    if (!entries.length) return;

    const ratioMap = new Map();
    // Minimum ratio any card must reach to be considered at all
    const MIN_QUALIFYING_RATIO = 0.25;
    // The candidate must beat the current active card's ratio by this margin to trigger a switch
    const HYSTERESIS_MARGIN = 0.10;

    const observer = new IntersectionObserver(
      (observed) => {
        if (isProgrammaticScrollRef.current) return;

        observed.forEach((entry) => {
          ratioMap.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        // Find the best visible candidate
        let bestId = null;
        let maxRatio = MIN_QUALIFYING_RATIO;

        ratioMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestId = id;
          }
        });

        if (!bestId) return;
        if (bestId === activeSpotlightRef.current) return;

        // Apply hysteresis: only switch if the new candidate beats the active card by a margin
        const activeRatio = ratioMap.get(activeSpotlightRef.current) || 0;
        if (maxRatio < activeRatio + HYSTERESIS_MARGIN) return;

        handleSpotlightChange(bestId, false);
      },
      {
        rootMargin: '-15% 0px -35% 0px',
        threshold: [0.1, 0.25, 0.4, 0.55, 0.75]
      }
    );

    entries.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      if (scrollLockTimeoutRef.current) clearTimeout(scrollLockTimeoutRef.current);
    };
  }, [filteredProjects]);


  // Stepper click handler with programmatic scroll lock
  const handleStepperClick = (e, prjId) => {
    e.preventDefault();
    handleSpotlightChange(prjId, true);
    const target = document.getElementById(prjId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Keyboard navigation [1..4] to jump to exhibits
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable) return;
      const keyMap = {
        '1': 'prj-probe360',
        '2': 'prj-mule-matrix',
        '3': 'prj-carbon',
        '4': 'prj-aegis'
      };
      const targetId = keyMap[e.key];
      if (targetId) {
        handleSpotlightChange(targetId, true);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Toggle Drawers inline
  const toggleDrawer = (id) => {
    setOpenDrawers((prev) => ({ ...prev, [id]: !prev[id] }));
    if (typeof window.__recomputeScrollGeometry === 'function') {
      setTimeout(window.__recomputeScrollGeometry, 250);
    }
  };

  const activeProjectObj =
    PROJECTS.find((p) => `prj-${p.id}` === activeSpotlight) || PROJECTS[0];

  const renderExhibitComponent = (prjId) => {
    switch (prjId) {
      case 'prj-probe360':
        return <ProbeExhibit key="probe-component" />;
      case 'prj-mule-matrix':
      case 'prj-csi-origin':
        return <MuleExhibit key="mule-component" />;
      case 'prj-carbon':
        return <CarbonExhibit key="carbon-component" />;
      case 'prj-aegis':
        return <AegisExhibit key="aegis-component" />;
      default:
        return <ProbeExhibit key="probe-default" />;
    }
  };

  return (
    <section className="projects-section is-in-view" id="projects" aria-labelledby="projects-title">
      <div className="projects-container">
        <div className="projects-header-block">
          <h2 className="projects-title" id="projects-title">Project Gallery Exhibition</h2>
          <p className="projects-subtitle">
            An interactive showcase of engineering projects spanning agentless security telemetry, financial fraud detection &amp; money-mule tracing, sustainability forecasting, and autonomous cybersecurity digital twins.
          </p>

          {/* Filter Category Tabs */}
          <div className="project-filters-bar" role="tablist" aria-label="Filter projects">
            {[
              { id: 'all', label: 'All Exhibits' },
              { id: 'security', label: 'Cybersecurity' },
              { id: 'fintech', label: 'Fraud & Mule Tracing' },
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
                  className={`project-narrative-entry ${isSpotlight ? 'active-spotlight' : ''} ${
                    isLinkedToSelectedSkill ? 'skill-connected-highlight' : ''
                  }`}
                  data-category={project.category}
                  tabIndex={0}
                  onClick={() => handleSpotlightChange(prjId, true)}
                >
                  <div className="project-card-header">
                    <div className="project-meta-strip">
                      <span className="project-kicker">
                        Project {project.number} &bull; {project.categoryLabel}
                      </span>
                      <span
                        className={`project-status ${
                          project.statusType === 'implemented' ? 'status-prototype' : 'status-concept'
                        }`}
                      >
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

                    {/* Mobile Only: Inline Exhibit */}
                    {isMobile && (
                      <div className="mobile-exhibit-container">
                        {renderExhibitComponent(prjId)}
                      </div>
                    )}

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
          {!isMobile && (
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
                    <span
                      className={`status-badge-mini ${
                        activeProjectObj.statusType === 'implemented' ? 'status-live' : 'status-proto'
                      }`}
                    >
                      {activeProjectObj.statusType === 'implemented' ? 'Interactive Demo' : 'Simulation'}
                    </span>
                  </div>
                </div>

                {/* Dynamic Exhibit Renderer with explicit keyed mounting */}
                <div className="sticky-stage-content" id="sticky-stage-content">
                  {renderExhibitComponent(activeSpotlight)}
                </div>

                <div className="sticky-stage-footer">
                  <span className="stage-hint">
                    Scroll through entries or press <kbd className="kbd-mini">1</kbd> to <kbd className="kbd-mini">4</kbd> to navigate exhibits.
                  </span>
                </div>
              </div>
            </aside>
          )}
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
