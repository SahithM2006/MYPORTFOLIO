import React, { useState } from 'react';
import { PROJECTS } from '../data-store.js';

const PROBE_OUTPUTS = {
  discovery: `[+] TARGET: WIN-SRV-2022-EAST (10.0.4.12)
[+] PROTOCOL: WinRM over HTTPS (Port 5986) • TLS 1.3
[+] AUTHENTICATION: CredSSP / Kerberos Mutual Verification
[+] CIM QUERY: Get-CimInstance Win32_OperatingSystem
    Caption          : Microsoft Windows Server 2022 Datacenter
    BuildNumber      : 20348.2461
    Persistent Daemons: 0 (Pure Agentless Architecture)
[✓] Status: Connection verified. Zero endpoint footprint.`,
  software: `[+] TARGET: WIN-SRV-2022-EAST
[+] CIM QUERY: Win32_Product & Registry Uninstall Keys
    - OpenSSH-Win64               (v8.9.1.0)  [PASS]
    - Microsoft Edge Webview2     (v122.0)    [PASS]
    - Apache Tomcat (Daemon-less) (v9.0.73)   [ADVISORY]
[✓] 142 software packages audited without deploying binary agent.`,
  cve: `[!] CVE BASELINE CORRELATION:
    - CVE-2023-38146 (ThemeBleed): Remediated via KB5030219
    - CVE-2023-36802 (ProxyMan): Patched
    - CVE-2023-21716 (MS Word RTF): Not Applicable
[✓] Endpoint compliance rating: 98.4% (PASS).`,
  honeypot: `[*] PLANNED DIRECTION: DECOY ENGAGEMENT NODES
    - 10.0.4.240 : Emulated RDP (Port 3389)
    - 10.0.4.241 : Emulated SMBv1 (Port 445)
    - 10.0.4.242 : Emulated WinRM (Port 5985)
[+] Behavioral anomaly scoring pipeline queued for future release.`
};

const MULE_HOPS = [
  {
    step: 0,
    title: 'Hop 0: Origin Inflow',
    source: 'ACC_EXT_9921 (Simulated Off-Ramp)',
    amount: 'e₹ 4,80,000',
    time: '04:12:00 IST',
    desc: 'Simulated seed capital introduced via single external transaction into seed wallet.',
    velocity: 'Baseline',
    risk: 'Low'
  },
  {
    step: 1,
    title: 'Hop 1: Rapid Fan-Out Dispersal',
    source: 'ACC_EXT_9921 → 4 Intermediary Mules',
    amount: '4 × e₹ 1,20,000',
    time: '04:26:00 IST (+14 min)',
    desc: 'Structured fan-out split across 4 dormant mule accounts in under 14 minutes.',
    velocity: 'High (+4.2 Z-score)',
    risk: 'Suspicious Structuring'
  },
  {
    step: 2,
    title: 'Hop 2: Intermediary Layering',
    source: '4 Mules → 8 Micro-Accounts',
    amount: '8 × e₹ 60,000',
    time: '04:48:00 IST (+22 min)',
    desc: 'Funds layered through 8 secondary wallets to evade single-hop transfer thresholds.',
    velocity: 'High Flow Rate',
    risk: 'Layering Pattern'
  },
  {
    step: 3,
    title: 'Hop 3: Pooling Convergence',
    source: '8 Accounts → ACC_POOL_808 & POS Merchant',
    amount: 'e₹ 3,60,000 (Pool) + e₹ 1,20,000 (POS)',
    time: '05:04:00 IST (+16 min)',
    desc: 'Rapid fan-in convergence: 75% of funds pooled into single cash-out endpoint.',
    velocity: '6:1 Inflow Velocity',
    risk: 'High Risk (Flagged)'
  }
];

export default function Projects({
  activeProjectId,
  onSelectProject,
  selectedSkillId,
  onSelectSkill
}) {
  // Probe360 demo state
  const [probeTab, setProbeTab] = useState('discovery');
  const [probeCopied, setProbeCopied] = useState(false);

  // Mule Matrix demo state
  const [muleHopIdx, setMuleHopIdx] = useState(1);

  // AI Carbon demo state
  const [distanceKm, setDistanceKm] = useState(450);
  const [payloadTons, setPayloadTons] = useState(18);

  // AEGIS-TWIN demo state
  const [aegisDefenseActive, setAegisDefenseActive] = useState(false);
  const [aegisStep, setAegisStep] = useState(2);

  const copyProbeOutput = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PROBE_OUTPUTS[probeTab]);
      setProbeCopied(true);
      setTimeout(() => setProbeCopied(false), 2000);
    }
  };

  // Calculated emissions for AI Carbon
  const calculatedEmissions = Math.round(
    (distanceKm * 0.85 + payloadTons * distanceKm * 0.042) * 1.15
  );
  const uncertaintyMargin = Math.round(calculatedEmissions * 0.065);

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="projects-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot" />
            <span className="section-kicker">STAGE 03 // CREATION &bull; BUILDING REAL SYSTEMS</span>
          </div>
          <h2 className="section-title" id="projects-title">
            Featured <span className="accent-text">Engineering Systems</span>
          </h2>
          <p className="section-subtitle">
            Compact, functional representations of each project&apos;s core idea &mdash;
            from agentless Windows security telemetry to temporal financial graph intelligence.
          </p>
        </div>

        {/* Project 1: Probe360 */}
        <article className="project-feature-card" id="prj-probe360">
          <div className="project-card-header">
            <div className="project-card-meta">
              <span className="project-num-tag">PROJECT 01</span>
              <span className="project-cat-tag">CYBERSECURITY PLATFORM</span>
              <span className="project-status-badge implemented">Prototype &bull; Implemented</span>
            </div>
            <h3 className="project-title">Probe360 &mdash; Agentless Windows Security Platform</h3>
            <p className="project-lead">
              Agentless Windows endpoint discovery, credentialed software inventorying, and
              vulnerability baseline correlation designed to eliminate persistent daemon footprint
              vulnerabilities on monitored hosts.
            </p>
          </div>

          <div className="project-content-grid">
            {/* Technical Context & Specifications */}
            <div className="project-specs-col">
              <div className="spec-card">
                <h4 className="spec-heading">Problem Addressed</h4>
                <p className="spec-text">
                  Traditional endpoint auditing requires installing third-party background daemons
                  across servers, introducing software supply-chain attack surfaces, CPU/memory bloat,
                  and administrative change-management hurdles.
                </p>
              </div>

              <div className="spec-card">
                <h4 className="spec-heading">Technical Concept &amp; Approach</h4>
                <p className="spec-text">
                  Harnesses native Windows Remote Management (WinRM over HTTPS/Port 5986) with
                  Kerberos/CredSSP mutual authentication to conduct credentialed remote audits
                  without deploying any agent binary. Queries CIM/WMI classes for installed MSI packages,
                  audits service DACLs, and cross-references discovered packages against CVE baselines.
                </p>
              </div>

              {/* Architecture Breakdown */}
              <div className="project-arch-summary">
                <div className="arch-layer-item">
                  <span className="layer-tag">FRONTEND</span>
                  <p className="layer-desc">
                    CLI telemetry runner and real-time audit stream visualizer for operators.
                  </p>
                </div>
                <div className="arch-layer-item">
                  <span className="layer-tag">BACKEND</span>
                  <p className="layer-desc">
                    Python systems engine, WinRM session pooling, CIM/WMI parsing, and CVE baseline matching.
                  </p>
                </div>
                <div className="arch-layer-item">
                  <span className="layer-tag">DATA FLOW</span>
                  <p className="layer-desc">
                    Target IP → TLS 5986 Session → CIM/WMI Query → Software Index → CVE Baseline Match → Compliance Dossier
                  </p>
                </div>
              </div>

              <div className="project-tech-pills">
                <span className="tech-pill">Python</span>
                <span className="tech-pill">WinRM (HTTPS 5986)</span>
                <span className="tech-pill">Windows WMI/CIM</span>
                <span className="tech-pill">Kerberos / CredSSP</span>
                <span className="tech-pill">CVE / CVSS</span>
              </div>
            </div>

            {/* Compact Interactive Demo */}
            <div className="project-demo-col">
              <div className="compact-demo-box">
                <div className="demo-box-topbar">
                  <div className="demo-box-title">
                    <span className="demo-beacon" />
                    <span>INTERACTIVE PROBE TELEMETRY</span>
                  </div>
                  <span className="demo-disclaimer">Verified CLI Output</span>
                </div>

                {/* Query Tabs */}
                <div className="demo-tabs-row" role="tablist">
                  <button
                    type="button"
                    className={`demo-tab-btn ${probeTab === 'discovery' ? 'active' : ''}`}
                    onClick={() => setProbeTab('discovery')}
                  >
                    01. Host Discovery
                  </button>
                  <button
                    type="button"
                    className={`demo-tab-btn ${probeTab === 'software' ? 'active' : ''}`}
                    onClick={() => setProbeTab('software')}
                  >
                    02. Software Audit
                  </button>
                  <button
                    type="button"
                    className={`demo-tab-btn ${probeTab === 'cve' ? 'active' : ''}`}
                    onClick={() => setProbeTab('cve')}
                  >
                    03. CVE Baseline
                  </button>
                  <button
                    type="button"
                    className={`demo-tab-btn ${probeTab === 'honeypot' ? 'active' : ''}`}
                    onClick={() => setProbeTab('honeypot')}
                  >
                    04. Decoy Nodes
                  </button>
                </div>

                {/* Console Output */}
                <div className="demo-terminal-screen">
                  <pre className="demo-terminal-code">{PROBE_OUTPUTS[probeTab]}</pre>
                </div>

                <div className="demo-box-footer">
                  <span className="demo-status-pill">Protocol: WinRM TLS 5986 (Zero Agent)</span>
                  <button
                    type="button"
                    className="demo-action-btn"
                    onClick={copyProbeOutput}
                  >
                    {probeCopied ? 'Copied ✓' : 'Copy Output'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Project 2: Mule Matrix */}
        <article className="project-feature-card" id="prj-mule-matrix">
          <div className="project-card-header">
            <div className="project-card-meta">
              <span className="project-num-tag">PROJECT 02</span>
              <span className="project-cat-tag">FINANCIAL FRAUD INTELLIGENCE</span>
              <span className="project-status-badge concept">Analytical Prototype &bull; Graph Simulation</span>
            </div>
            <h3 className="project-title">Mule Matrix &mdash; Financial Fraud Detection &amp; Money-Mule Tracing</h3>
            <p className="project-lead">
              An analytical platform combining programmable CBDC/e₹ transaction lineage with temporal
              graph intelligence to trace suspicious fund movements, identify connected money-mule
              networks, and highlight cash-out points for investigation.
            </p>
          </div>

          <div className="project-content-grid">
            <div className="project-specs-col">
              <div className="spec-card">
                <h4 className="spec-heading">Problem Addressed</h4>
                <p className="spec-text">
                  Financial fraud networks rapidly structure illicit funds across multi-hop intermediary
                  accounts (fan-out) within minutes before re-aggregating into cash-out accounts (fan-in),
                  rendering isolated, flat transaction rule checks ineffective.
                </p>
              </div>

              <div className="spec-card">
                <h4 className="spec-heading">Technical Concept &amp; Approach</h4>
                <p className="spec-text">
                  Constructs an offline analytical testbed combining synthetic programmable CBDC/e₹
                  token lineage with temporal directed multigraph modeling in NetworkX. A recursive lineage
                  engine traverses paths across intermediary tiers, calculating temporal burst velocity,
                  fan-in/fan-out ratios, and cyclic flow heuristics.
                </p>
              </div>

              <div className="project-arch-summary">
                <div className="arch-layer-item">
                  <span className="layer-tag">FRONTEND</span>
                  <p className="layer-desc">
                    Temporal graph path visualizer, velocity metric monitors, and investigation dossier inspector.
                  </p>
                </div>
                <div className="arch-layer-item">
                  <span className="layer-tag">BACKEND</span>
                  <p className="layer-desc">
                    Python NetworkX multigraph engine, recursive lineage tracer, Pydantic contracts, and SQLite store.
                  </p>
                </div>
                <div className="arch-layer-item">
                  <span className="layer-tag">DATA FLOW</span>
                  <p className="layer-desc">
                    Synthetic e₹ Tokens → Recursive Lineage Traversal → Directed Multigraph Modeling → Velocity &amp; Anomaly Scoring → Investigation Dossier
                  </p>
                </div>
              </div>

              <div className="project-tech-pills">
                <span className="tech-pill">Python</span>
                <span className="tech-pill">NetworkX</span>
                <span className="tech-pill">NumPy</span>
                <span className="tech-pill">Pydantic</span>
                <span className="tech-pill">SQL</span>
                <span className="tech-pill">Temporal Graphs</span>
              </div>
            </div>

            {/* Compact Interactive Demo: Multi-Hop Lineage Stepper */}
            <div className="project-demo-col">
              <div className="compact-demo-box">
                <div className="demo-box-topbar">
                  <div className="demo-box-title">
                    <span className="demo-beacon" />
                    <span>MULTI-HOP LINEAGE EXPLORER</span>
                  </div>
                  <span className="demo-disclaimer">Offline Simulation Sandbox</span>
                </div>

                {/* Hop Navigation Stepper */}
                <div className="mule-step-nav">
                  {MULE_HOPS.map((h, i) => (
                    <button
                      key={h.step}
                      type="button"
                      className={`mule-step-pill ${muleHopIdx === i ? 'active' : ''}`}
                      onClick={() => setMuleHopIdx(i)}
                    >
                      <span>Hop {h.step}</span>
                    </button>
                  ))}
                </div>

                {/* Active Hop Display Card */}
                <div className="mule-active-hop-card">
                  <div className="hop-card-header">
                    <strong className="hop-card-title">{MULE_HOPS[muleHopIdx].title}</strong>
                    <span className={`hop-risk-badge risk-${MULE_HOPS[muleHopIdx].risk.toLowerCase().replace(/[^a-z]/g, '')}`}>
                      {MULE_HOPS[muleHopIdx].risk}
                    </span>
                  </div>

                  <div className="hop-meta-grid">
                    <div className="hop-meta-item">
                      <span className="meta-lbl">TRANSFER PATH:</span>
                      <strong className="meta-val">{MULE_HOPS[muleHopIdx].source}</strong>
                    </div>
                    <div className="hop-meta-item">
                      <span className="meta-lbl">TRANSACTION VOLUME:</span>
                      <strong className="meta-val highlight-gold">{MULE_HOPS[muleHopIdx].amount}</strong>
                    </div>
                    <div className="hop-meta-item">
                      <span className="meta-lbl">TIMESTAMP / INTERVAL:</span>
                      <strong className="meta-val">{MULE_HOPS[muleHopIdx].time}</strong>
                    </div>
                    <div className="hop-meta-item">
                      <span className="meta-lbl">FLOW VELOCITY:</span>
                      <strong className="meta-val highlight-steel">{MULE_HOPS[muleHopIdx].velocity}</strong>
                    </div>
                  </div>

                  <p className="hop-desc-text">{MULE_HOPS[muleHopIdx].desc}</p>
                </div>

                <div className="demo-box-footer">
                  <span className="demo-status-pill">
                    Step {muleHopIdx + 1} of 4 &bull; NetworkX Directed DAG
                  </span>
                  <div className="mule-step-controls">
                    <button
                      type="button"
                      className="btn-mule-nav"
                      disabled={muleHopIdx === 0}
                      onClick={() => setMuleHopIdx((prev) => Math.max(0, prev - 1))}
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      className="btn-mule-nav"
                      disabled={muleHopIdx === MULE_HOPS.length - 1}
                      onClick={() => setMuleHopIdx((prev) => Math.min(MULE_HOPS.length - 1, prev + 1))}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Project 3: AI Carbon Intelligence */}
        <article className="project-feature-card" id="prj-carbon">
          <div className="project-card-header">
            <div className="project-card-meta">
              <span className="project-num-tag">PROJECT 03</span>
              <span className="project-cat-tag">SUSTAINABILITY ANALYTICS</span>
              <span className="project-status-badge concept">Research Concept &bull; Modeling Pipeline</span>
            </div>
            <h3 className="project-title">AI Carbon Intelligence &mdash; Supply-Chain Emissions Analytics</h3>
            <p className="project-lead">
              A data-driven decision-support pipeline combining multi-variable statistical regression
              and machine learning estimators to evaluate operational carbon hotspots across supply chains.
            </p>
          </div>

          <div className="project-content-grid">
            <div className="project-specs-col">
              <div className="spec-card">
                <h4 className="spec-heading">Problem Addressed</h4>
                <p className="spec-text">
                  Industrial logistics chains struggle to accurately quantify Scope 1, 2, and 3 carbon
                  emissions due to non-linear fuel consumption curves, payload weight variations, and
                  fragmented transport records, making mitigation planning speculative.
                </p>
              </div>

              <div className="spec-card">
                <h4 className="spec-heading">Technical Concept &amp; Approach</h4>
                <p className="spec-text">
                  Preprocesses heterogeneous freight logistics logs using Pandas/NumPy, then fits
                  cross-validated Scikit-learn multivariate regression models to project emissions
                  trajectories with empirical 95% uncertainty confidence intervals across distance and cargo payload weights.
                </p>
              </div>

              <div className="project-arch-summary">
                <div className="arch-layer-item">
                  <span className="layer-tag">FRONTEND</span>
                  <p className="layer-desc">
                    Interactive parameter simulation sliders, confidence bounds charts, and hotspot maps.
                  </p>
                </div>
                <div className="arch-layer-item">
                  <span className="layer-tag">BACKEND</span>
                  <p className="layer-desc">
                    Scikit-learn multivariate regression pipeline, Pandas data wrangling, and NumPy array transforms.
                  </p>
                </div>
                <div className="arch-layer-item">
                  <span className="layer-tag">DATA FLOW</span>
                  <p className="layer-desc">
                    Freight Logs → Pandas Normalization → Scikit-learn Estimator → Uncertainty Interval → Hotspot Mitigation
                  </p>
                </div>
              </div>

              <div className="project-tech-pills">
                <span className="tech-pill">Python</span>
                <span className="tech-pill">Scikit-learn</span>
                <span className="tech-pill">Pandas</span>
                <span className="tech-pill">NumPy</span>
                <span className="tech-pill">Matplotlib</span>
                <span className="tech-pill">Regression Modeling</span>
              </div>
            </div>

            {/* Compact Interactive Demo: Real-time Regression Calculator */}
            <div className="project-demo-col">
              <div className="compact-demo-box">
                <div className="demo-box-topbar">
                  <div className="demo-box-title">
                    <span className="demo-beacon" />
                    <span>EMISSIONS SCENARIO ESTIMATOR</span>
                  </div>
                  <span className="demo-disclaimer">Empirical Regression Model</span>
                </div>

                <div className="carbon-calculator-body">
                  {/* Slider 1: Distance */}
                  <div className="calc-slider-group">
                    <div className="calc-slider-header">
                      <label htmlFor="carbon-dist-input" className="calc-label">Transit Distance:</label>
                      <span className="calc-val-badge">{distanceKm} km</span>
                    </div>
                    <input
                      id="carbon-dist-input"
                      type="range"
                      min="50"
                      max="1500"
                      step="25"
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Number(e.target.value))}
                      className="calc-range-slider"
                    />
                  </div>

                  {/* Slider 2: Payload */}
                  <div className="calc-slider-group">
                    <div className="calc-slider-header">
                      <label htmlFor="carbon-payload-input" className="calc-label">Cargo Payload:</label>
                      <span className="calc-val-badge">{payloadTons} metric tons</span>
                    </div>
                    <input
                      id="carbon-payload-input"
                      type="range"
                      min="2"
                      max="40"
                      step="2"
                      value={payloadTons}
                      onChange={(e) => setPayloadTons(Number(e.target.value))}
                      className="calc-range-slider"
                    />
                  </div>

                  {/* Calculated Output Box */}
                  <div className="calc-results-card">
                    <div className="results-primary">
                      <span className="results-label">PREDICTED EMISSIONS (SCOPE 1&ndash;3):</span>
                      <strong className="results-number">{calculatedEmissions}</strong>
                      <span className="results-unit">kg CO<sub>2</sub>e</span>
                    </div>

                    <div className="results-uncertainty">
                      <span className="uncertainty-tag">95% Confidence Bounds:</span>
                      <span className="uncertainty-val">
                        &plusmn;{uncertaintyMargin} kg CO<sub>2</sub>e ({calculatedEmissions - uncertaintyMargin} &ndash; {calculatedEmissions + uncertaintyMargin})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="demo-box-footer">
                  <span className="demo-status-pill">Scikit-learn Non-linear Polynomial Fit</span>
                  <button
                    type="button"
                    className="demo-action-btn"
                    onClick={() => {
                      setDistanceKm(450);
                      setPayloadTons(18);
                    }}
                  >
                    Reset Benchmark
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Project 4: AEGIS-TWIN */}
        <article className="project-feature-card" id="prj-aegis">
          <div className="project-card-header">
            <div className="project-card-meta">
              <span className="project-num-tag">PROJECT 04</span>
              <span className="project-cat-tag">CYBER DIGITAL TWIN</span>
              <span className="project-status-badge prototype">Hackathon Prototype &bull; Shortlisted (VIT)</span>
            </div>
            <h3 className="project-title">AEGIS-TWIN &mdash; Autonomous Cyber Digital Twin &amp; Attack Simulation</h3>
            <p className="project-lead">
              A cybersecurity digital twin developed for the VIT Vellore national-level hackathon
              (shortlisted for the next round). Models enterprise assets, simulates adversarial attack paths,
              and prioritizes minimum-cut defensive interventions based on risk reduction.
            </p>
          </div>

          <div className="project-content-grid">
            <div className="project-specs-col">
              <div className="spec-card">
                <h4 className="spec-heading">Problem Addressed</h4>
                <p className="spec-text">
                  Enterprise security teams assess software vulnerabilities in isolation, failing to
                  anticipate how attackers chain low- and medium-severity flaws across adjacent network
                  assets to reach mission-critical crown jewels.
                </p>
              </div>

              <div className="spec-card">
                <h4 className="spec-heading">Technical Concept &amp; Approach</h4>
                <p className="spec-text">
                  Constructs weighted directed graph topologies in NetworkX, maps discovered CVEs to
                  MITRE ATT&amp;CK tactics (Initial Access → Lateral Movement → Privilege Escalation),
                  executes shortest-path exploit traversal, and applies graph-cut heuristics to identify
                  the minimal network isolation rules that sever exploit paths.
                </p>
              </div>

              <div className="project-arch-summary">
                <div className="arch-layer-item">
                  <span className="layer-tag">FRONTEND</span>
                  <p className="layer-desc">
                    Directed attack graph viewer, step-through chain simulator, and defensive cut toggles.
                  </p>
                </div>
                <div className="arch-layer-item">
                  <span className="layer-tag">BACKEND</span>
                  <p className="layer-desc">
                    FastAPI asynchronous service, NetworkX weighted directed graph, and CVSS risk weighting.
                  </p>
                </div>
                <div className="arch-layer-item">
                  <span className="layer-tag">DATA FLOW</span>
                  <p className="layer-desc">
                    Asset Inventory → MITRE ATT&amp;CK Mapping → Exploit Chain Traversal → Minimum-Cut Algorithm → Optimal Defense Rule
                  </p>
                </div>
              </div>

              <div className="project-tech-pills">
                <span className="tech-pill">Python</span>
                <span className="tech-pill">FastAPI</span>
                <span className="tech-pill">NetworkX</span>
                <span className="tech-pill">MITRE ATT&amp;CK</span>
                <span className="tech-pill">Vulnerability Modeling</span>
              </div>
            </div>

            {/* Compact Interactive Demo: Attack Path & Min-Cut Severing */}
            <div className="project-demo-col">
              <div className="compact-demo-box">
                <div className="demo-box-topbar">
                  <div className="demo-box-title">
                    <span className="demo-beacon" />
                    <span>ADVERSARIAL ATTACK SIMULATION</span>
                  </div>
                  <span className="demo-disclaimer">VIT Hackathon Prototype</span>
                </div>

                <div className="aegis-sim-body">
                  {/* Defense Toggle */}
                  <div className="aegis-toggle-row">
                    <span className="toggle-label">Defensive Minimum-Cut Chokepoint Isolation:</span>
                    <button
                      type="button"
                      className={`aegis-toggle-btn ${aegisDefenseActive ? 'active' : ''}`}
                      onClick={() => setAegisDefenseActive((prev) => !prev)}
                    >
                      <span className="toggle-knob" />
                      <span className="toggle-state-text">
                        {aegisDefenseActive ? 'ARMED (Exploit Path Severed)' : 'DISABLED (Vulnerable)'}
                      </span>
                    </button>
                  </div>

                  {/* Chain Stepper */}
                  <div className="aegis-path-steps">
                    <div className="aegis-step-item active">
                      <span className="step-badge">STAGE 1</span>
                      <div className="step-body">
                        <strong>DMZ Web Gateway</strong>
                        <small>Initial Access &bull; CVE-2023-38606</small>
                      </div>
                      <span className="step-status compromised">Compromised</span>
                    </div>

                    <div className="aegis-step-arrow">↓</div>

                    <div className={`aegis-step-item ${aegisDefenseActive ? 'severed' : 'active'}`}>
                      <span className="step-badge">STAGE 2 (CHOKEPOINT)</span>
                      <div className="step-body">
                        <strong>Internal Jump Host (10.0.2.15)</strong>
                        <small>Lateral Movement &bull; Pass-the-Hash / SMB</small>
                      </div>
                      <span className={`step-status ${aegisDefenseActive ? 'blocked' : 'compromised'}`}>
                        {aegisDefenseActive ? 'ISOLATED (Cut)' : 'Exploited'}
                      </span>
                    </div>

                    <div className="aegis-step-arrow">↓</div>

                    <div className={`aegis-step-item ${aegisDefenseActive ? 'protected' : 'active'}`}>
                      <span className="step-badge">STAGE 3 (CROWN JEWEL)</span>
                      <div className="step-body">
                        <strong>Core Financial Database</strong>
                        <small>Impact &bull; Exfiltration Target</small>
                      </div>
                      <span className={`step-status ${aegisDefenseActive ? 'safe' : 'compromised'}`}>
                        {aegisDefenseActive ? 'PROTECTED (Zero Access)' : 'Compromised'}
                      </span>
                    </div>
                  </div>

                  {/* Attack Surface Metric */}
                  <div className="aegis-metric-strip">
                    <span className="metric-tag">ENTERPRISE RISK REDUCTION:</span>
                    <strong className={`metric-val ${aegisDefenseActive ? 'highlight-gold' : ''}`}>
                      {aegisDefenseActive ? '84.2% Risk Neutralized (1 Rule)' : '0% (Critical Exposure)'}
                    </strong>
                  </div>
                </div>

                <div className="demo-box-footer">
                  <span className="demo-status-pill">Graph-Cut Centrality Heuristic &bull; FastAPI</span>
                  <button
                    type="button"
                    className="demo-action-btn"
                    onClick={() => setAegisDefenseActive(!aegisDefenseActive)}
                  >
                    {aegisDefenseActive ? 'Reset Simulation' : 'Apply Min-Cut Rule'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
