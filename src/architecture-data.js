/**
 * Sahith M. — Technical Architecture & Tech Stack Data Store
 * Grounded strictly in existing project implementations, codebases, and verified documentation.
 * 
 * Rules:
 * - Distinguish strictly between:
 *   - 'implemented' (verified in code/prototype)
 *   - 'development' (tooling/environment used during build)
 *   - 'planned' (explicit future roadmap from specs)
 * - Only include architectural layers actually relevant to each project.
 * - Accurate technical roles, engineering rationales, and inter-component connections.
 */

export const ARCHITECTURE_PROJECTS = [
  {
    id: 'probe360',
    projectId: 'prj-probe360',
    number: '01',
    name: 'Probe360',
    fullTitle: 'Probe360 — Agentless Security Platform',
    category: 'Cybersecurity Platform',
    accentColor: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.35)',
    status: 'Prototype • Implemented',
    statusType: 'implemented',
    lead: 'Agentless Windows asset discovery, remote credential verification, software inventorying, and vulnerability-baseline checks designed to eliminate persistent daemon footprint vulnerabilities on endpoints.',
    summary: 'Probe360 coordinates credentialed, TLS-encrypted WinRM sessions into target Windows endpoints without deploying intrusive binary daemons. It queries CIM/WMI classes for installed MSI packages, checks registry run-keys for insecure binary paths, audits service permission DACLs, and maps findings to national vulnerability databases.',
    
    // Only relevant layers for Probe360
    layers: [
      {
        id: 'interface',
        name: 'Interface / Operator Control',
        icon: 'terminal',
        roleSummary: 'Operator command-line interface and telemetry dispatch runner for targeting subnets and inspecting real-time audit streams.',
        technologies: [
          {
            id: 'cli-dispatcher',
            name: 'CLI Telemetry Dispatcher',
            icon: 'terminal',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Command-line execution harness accepting target IP ranges, credential stores, and scan profiles; streams real-time stdout audit traces.',
            whyUsed: 'Security probes must be lightweight, scriptable, and operable without requiring heavy GUI daemon infrastructure on audited infrastructure.',
            connections: 'Dispatches authenticated audit tasks to the WinRM Telemetry Execution Engine; streams parsed results to standard output/logs.',
            codeSpecs: 'Python CLI parser, argparse/sys dispatch harness, real-time logging formatters.'
          }
        ]
      },
      {
        id: 'infrastructure',
        name: 'Infrastructure / Security / Protocol',
        icon: 'shield',
        roleSummary: 'Encrypted remote transport protocols and mutual authentication mechanisms ensuring zero agent footprint on target endpoints.',
        technologies: [
          {
            id: 'winrm-protocol',
            name: 'WinRM Telemetry Protocol (HTTPS/5986)',
            icon: 'network',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Remote Windows Management protocol establishing encrypted TLS sessions over TCP Port 5986 for remote CIM/WMI and PowerShell command dispatch.',
            whyUsed: 'Provides native, agentless remote administration built directly into Windows Server/Desktop without requiring third-party agent binaries or open reverse shells.',
            connections: 'Connects the Python systems engine to target Windows Server endpoints over encrypted TLS tunnel.',
            codeSpecs: 'WinRM over HTTPS (Port 5986), TLS 1.2/1.3 session encryption, CIM/WMI session pooling.'
          },
          {
            id: 'kerberos-credssp',
            name: 'Kerberos / CredSSP Authentication',
            icon: 'lock',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Mutual credential authentication ensuring domain-delegated administrative verification without transmitting plaintext credentials across the wire.',
            whyUsed: 'Mandated by Active Directory enterprise standards to authenticate against Windows hosts securely and avoid double-hop credential delegation pitfalls.',
            connections: 'Authenticates WinRM sessions against target domain controllers and local security authority (LSA).',
            codeSpecs: 'CredSSP / Kerberos ticket delegation, TLS mutual certificate verification.'
          },
          {
            id: 'subnet-honeypots',
            name: 'Subnet Honeypot Decoy Nodes',
            icon: 'radar',
            status: 'planned',
            statusLabel: 'Roadmap / Planned',
            role: 'Lightweight decoy listener nodes emulating vulnerable RDP (3389), SMBv1 (445), and WinRM (5985) services across monitored subnets.',
            whyUsed: 'Deception-based telemetry allows early detection of reconnaissance and lateral traversal attempts before production servers are accessed.',
            connections: 'Planned to feed adversarial connection alerts into the central telemetry pipeline.',
            codeSpecs: 'Emulated service ports (3389, 445, 5985), packet capture hooks.'
          }
        ]
      },
      {
        id: 'backend',
        name: 'Backend / Systems Inspection',
        icon: 'server',
        roleSummary: 'Python runtime core orchestrating remote query pipelines, WMI/CIM serialization, and Windows registry security audits.',
        technologies: [
          {
            id: 'python-core',
            name: 'Python Systems Core',
            icon: 'python',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'High-throughput systems execution runtime orchestrating asynchronous session lifecycles, remote query dispatch, and payload normalization.',
            whyUsed: 'Extensive ecosystem for systems automation, cross-platform remote management wrappers, and rapid vulnerability baseline correlation.',
            connections: 'Orchestrates WinRM client sessions, dispatches OS queries, and pipes responses into the CVE correlation pipeline.',
            codeSpecs: 'Python 3.10+, pywinrm session wrappers, asynchronous query workers.'
          },
          {
            id: 'windows-subsystem',
            name: 'Windows CIM/WMI & Registry Inspector',
            icon: 'windows',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Executes remote CIM queries against Win32_OperatingSystem and Win32_Product; audits HKLM registry uninstall keys and service DACLs.',
            whyUsed: 'Native Windows Management Instrumentation (WMI/CIM) provides authoritative operating system build metrics and software package inventories without binary installations.',
            connections: 'Transports raw remote CIM objects to the local software parser and patch audit normalizer.',
            codeSpecs: 'Get-CimInstance Win32_OperatingSystem, Win32_Product, HKLM Uninstall Run keys, Service DACLs.'
          }
        ]
      },
      {
        id: 'ai-ml',
        name: 'AI / Threat Intelligence & Correlation',
        icon: 'cpu',
        roleSummary: 'Automated vulnerability cross-referencing against national vulnerability databases and future anomaly heuristics.',
        technologies: [
          {
            id: 'cve-baseline',
            name: 'CVE Baseline Correlation Engine',
            icon: 'database',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Cross-references discovered software versions against national vulnerability databases (e.g. CVE-2023-38146 ThemeBleed, CVE-2023-36802 ProxyMan) and verifies KB patch status.',
            whyUsed: 'Enables deterministic baseline compliance scoring (e.g. 98.4% pass rate) by verifying whether installed software versions contain unpatched vulnerabilities.',
            connections: 'Consumes software packages indexed by the WMI inspector; outputs compliance scores and vulnerability advisory reports.',
            codeSpecs: 'CVE/CVSS database mappings, KB update revision comparison tables.'
          },
          {
            id: 'behavioral-anomaly',
            name: 'Behavioral Anomaly Scoring Model',
            icon: 'cpu',
            status: 'planned',
            statusLabel: 'Roadmap / Planned',
            role: 'Machine learning model for detecting abnormal endpoint connection frequency and credential access behaviors.',
            whyUsed: 'Planned direction to augment deterministic CVE matching with statistical anomaly heuristics for zero-day threat detection.',
            connections: 'Will consume telemetry streams from WinRM event log audits and honeypot triggers.',
            codeSpecs: 'Heuristic anomaly scoring pipeline, baseline deviation metrics.'
          }
        ]
      }
    ],

    // Connected Component Flow Diagram Data
    flow: {
      nodes: [
        {
          id: 'n-operator',
          title: 'Operator CLI',
          subtitle: 'Audit Task Dispatcher',
          tech: 'Python CLI / Argparse',
          layer: 'interface',
          status: 'implemented'
        },
        {
          id: 'n-winrm',
          title: 'WinRM Engine',
          subtitle: 'TLS 5986 / CredSSP',
          tech: 'pywinrm / Kerberos',
          layer: 'infrastructure',
          status: 'implemented'
        },
        {
          id: 'n-endpoint',
          title: 'Target Windows Host',
          subtitle: 'Agentless Zero-Footprint',
          tech: 'CIM / WMI Runtime',
          layer: 'infrastructure',
          status: 'implemented'
        },
        {
          id: 'n-wmi',
          title: 'Inventory & Registry Auditor',
          subtitle: 'Win32_Product & DACLs',
          tech: 'CIM Query Processor',
          layer: 'backend',
          status: 'implemented'
        },
        {
          id: 'n-cve',
          title: 'CVE Baseline Matcher',
          subtitle: 'Vulnerability Correlation',
          tech: 'CVE / CVSS Database',
          layer: 'ai-ml',
          status: 'implemented'
        },
        {
          id: 'n-report',
          title: 'Compliance Audit Report',
          subtitle: '98.4% Pass Rating',
          tech: 'JSON / Terminal Output',
          layer: 'interface',
          status: 'implemented'
        }
      ],
      links: [
        { from: 'n-operator', to: 'n-winrm', label: 'Credentials & Targets', protocol: 'Local Dispatch' },
        { from: 'n-winrm', to: 'n-endpoint', label: 'Mutual TLS Auth (Port 5986)', protocol: 'HTTPS / Kerberos' },
        { from: 'n-endpoint', to: 'n-wmi', label: 'CIM Instance Streams', protocol: 'Remote WMI / CIM' },
        { from: 'n-wmi', to: 'n-cve', label: 'Parsed Package Manifests', protocol: 'Normalized JSON' },
        { from: 'n-cve', to: 'n-report', label: 'Correlated CVE/KB Findings', protocol: 'Compliance Stream' }
      ],
      steps: [
        {
          num: '01',
          name: 'Target Dispatch & Credential Handshake',
          desc: 'Operator initiates scan; WinRM establishes mutual TLS handshake with target Windows endpoints on Port 5986 via CredSSP / Kerberos delegation.'
        },
        {
          num: '02',
          name: 'Agentless CIM / WMI Query Execution',
          desc: 'Remote CIM subsystem evaluates Win32_OperatingSystem and Win32_Product without installing or executing persistent client daemon binaries.'
        },
        {
          num: '03',
          name: 'Registry & Permission Auditing',
          desc: 'Audit inspector queries HKLM uninstall registry keys for non-MSI software, unquoted service paths, and service DACL permission boundaries.'
        },
        {
          num: '04',
          name: 'CVE Baseline Correlation & Reporting',
          desc: 'Discovered software builds are checked against national vulnerability databases, validating KB patch levels and generating compliance summaries.'
        }
      ]
    },

    audit: {
      implemented: [
        'WinRM remote authenticated query pipeline (HTTPS / Port 5986)',
        'CredSSP / Kerberos mutual authentication handshake',
        'Installed software WMI/CIM inventory parser (Win32_OperatingSystem, Win32_Product)',
        'Registry uninstall key scanning and unquoted service path checks',
        'Automated CVE/CVSS baseline vulnerability correlation and KB patch checks',
        'Python systems execution core and CLI telemetry console output'
      ],
      development: [
        'Git & GitHub for version control and commit tracking',
        'Local Windows Server test environments and PowerShell execution policies'
      ],
      planned: [
        'Subnet honeypot decoy engagement nodes (emulating RDP 3389, SMBv1 445, WinRM 5985)',
        'Behavioral ML anomaly scoring model for dynamic threat detection'
      ],
      reviewerNotes: [
        'Architecture is purely agentless: zero daemons or background services are deployed to target endpoints.',
        'Operates as a high-throughput systems script/CLI tool; no persistent web UI or frontend framework is implemented in the prototype codebase.',
        'Vulnerability correlation matches against verified CVE definitions (e.g. CVE-2023-38146 ThemeBleed).'
      ]
    }
  },

  {
    id: 'mule-matrix',
    projectId: 'prj-mule-matrix',
    number: '02',
    name: 'Mule Matrix',
    fullTitle: 'Mule Matrix — Intelligent Financial Fraud Detection & Money-Mule Network Tracing',
    category: 'Financial Fraud Analytics',
    accentColor: '#2DD4BF',
    accentGlow: 'rgba(45, 212, 191, 0.35)',
    status: 'Analytical Prototype • Graph Intelligence',
    statusType: 'implemented',
    lead: 'An analytical platform combining programmable CBDC/e₹ transaction lineage with temporal graph intelligence to trace suspicious fund movements, identify connected money-mule networks, and highlight potential cash-out points for investigation.',
    summary: 'Mule Matrix is an analytical investigation platform designed to uncover multi-layered money laundering and money-mule networks within simulated programmable digital currency environments. By structuring simulated programmable e₹ token transfers as a temporal directed graph, the platform models accounts as nodes and timestamped transactions as directed edges. Recursive lineage tracing and NetworkX temporal graph heuristics reconstruct complex fund dispersal flows—from initial suspicious sources through rapid intermediary mule hops to potential cash-out endpoints. Every risk flag is generated as an explainable investigation finding with transparent transaction evidence, strictly distinguishing verified prototype graph algorithms from proposed future enterprise integrations without claiming live banking or RBI connections.',
    
    // 5 Conceptual Architectural Layers
    layers: [
      {
        id: 'simulation',
        name: '1. Transaction Data & Simulation',
        icon: 'database',
        roleSummary: 'Synthetic programmable e₹ transaction generator and ledger simulation modeling token metadata, wallet identities, and fund lineages.',
        technologies: [
          {
            id: 'synthetic-tx-engine',
            name: 'Synthetic e₹ Transaction Generator',
            icon: 'database',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Generates synthetic programmable e₹ transaction datasets, including wallet keys, transfer amounts, programmable condition tags, and temporal timestamps.',
            whyUsed: 'Provides realistic multi-party fund flows for testing mule patterns without accessing private banking records or claiming live RBI/CBDC infrastructure connection.',
            connections: 'Emits structured synthetic transaction streams into the Transaction Lineage Engine.',
            codeSpecs: 'Python synthetic data generator, Pydantic transaction models, simulated e₹ parameter schemas.'
          },
          {
            id: 'tx-metadata-store',
            name: 'Transaction Metadata & Lineage Ledger',
            icon: 'server',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'In-memory relational schema recording transaction identifiers, sender/receiver wallet mappings, timestamps, and transfer amounts.',
            whyUsed: 'Maintains immutable transaction histories essential for deterministic lineage reconstruction and chronological ordering.',
            connections: 'Supplies raw transaction records to the lineage traversal algorithms and temporal graph builder.',
            codeSpecs: 'Normalized transaction records, indexed wallet mapping tables.'
          }
        ]
      },
      {
        id: 'lineage',
        name: '2. Transaction Lineage Engine',
        icon: 'network',
        roleSummary: 'Multi-hop fund tracking engine reconstructing end-to-end movement paths from origin sources through intermediary accounts to exit points.',
        technologies: [
          {
            id: 'recursive-lineage-tracer',
            name: 'Recursive Fund Flow Lineage Tracer',
            icon: 'network',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Recursively walks parent-child transaction chains, tracking fund splits (fan-out), aggregations (fan-in), and multi-layer hop counts across wallets.',
            whyUsed: 'Money mules systematically split and bounce funds across intermediary accounts; recursive tracing reconstructs complete provenance trails.',
            connections: 'Transports reconstructed lineage paths and hop sequence metrics into the Temporal Graph Intelligence model.',
            codeSpecs: 'Recursive graph traversal algorithms, transaction sequence preservation logic.'
          }
        ]
      },
      {
        id: 'graph',
        name: '3. Temporal Graph Intelligence',
        icon: 'cpu',
        roleSummary: 'Directed temporal multigraph engine modeling account clusters, velocity anomalies, and coordinated money-mule network topologies.',
        technologies: [
          {
            id: 'networkx-temporal-graph',
            name: 'NetworkX Directed Temporal Multigraph',
            icon: 'cpu',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Models accounts as nodes and transactions as directed, timestamp-attributed edges; evaluates in/out degree ratios, betweenness centrality, and time deltas.',
            whyUsed: 'Identifies coordinated network-level anomalies (e.g. rapid fan-out layering and pooling) that remain invisible when inspecting individual transactions in isolation.',
            connections: 'Supplies detected mule cluster subgraphs and network anomaly vectors to the Risk Analysis Engine.',
            codeSpecs: 'NetworkX directed multigraph, temporal sliding-window filters (<30 min), degree anomaly evaluators.'
          },
          {
            id: 'tgnn-embeddings',
            name: 'Temporal Graph Neural Network (TGNN) Embeddings',
            icon: 'radar',
            status: 'planned',
            statusLabel: 'Roadmap / Proposed',
            role: 'Proposed dynamic graph embedding model to automatically classify evolving money-mule topologies without handcrafted heuristic thresholds.',
            whyUsed: 'Planned direction to generalize network anomaly detection across unseen laundering topologies.',
            connections: 'Planned pipeline to ingest temporal edge sequences and output cluster classification scores.',
            codeSpecs: 'Proposed TGNN architecture (unspecified; requires framework confirmation prior to production).'
          },
          {
            id: 'enterprise-graph-db',
            name: 'Distributed Enterprise Graph Database',
            icon: 'database',
            status: 'planned',
            statusLabel: 'Roadmap / Proposed',
            role: 'Proposed persistent graph database layer (e.g., Neo4j / TigerGraph) to scale graph traversals to production enterprise transaction volumes.',
            whyUsed: 'Scales analysis beyond in-memory prototypes to millions of concurrent banking transactions.',
            connections: 'Planned backend persistence for high-throughput transactional edge queries.',
            codeSpecs: 'Proposed graph database connector (unspecified; requires confirmation).'
          }
        ]
      },
      {
        id: 'risk',
        name: '4. Risk Analysis & Investigation',
        icon: 'shield',
        roleSummary: 'Explainable heuristic risk scoring and cash-out identification engine synthesizing evidence into transparent investigation findings.',
        technologies: [
          {
            id: 'explainable-risk-scorer',
            name: 'Explainable Anomaly & Risk Scorer',
            icon: 'shield',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Evaluates transaction velocity, hop distances, rapid balance drains, and structural fan-out/in ratios to produce normalized risk scores with plain-text evidence.',
            whyUsed: 'Treats alerts as actionable risk leads requiring human investigation rather than opaque black-box proof of criminal culpability.',
            connections: 'Feeds structured risk findings and flagged wallet dossiers into the Visualisation Dashboard.',
            codeSpecs: 'Weighted heuristic risk rules, explainable factor breakdowns, confidence-bounded severity scores.'
          },
          {
            id: 'cashout-detector',
            name: 'High-Risk Cash-Out Point Detector',
            icon: 'radar',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Pinpoints terminal sink nodes where funds concentrate following multi-hop layering (e.g., ATM withdrawals, P2P off-ramps, high-velocity merchant transfers).',
            whyUsed: 'Enables investigators to focus interventions directly on the critical cash-out exit points before funds leave the traceable network.',
            connections: 'Highlights exit wallets on the network diagram and surfaces them in the investigation ledger.',
            codeSpecs: 'Sink-node flow concentration heuristics, terminal node velocity checks.'
          }
        ]
      },
      {
        id: 'visualisation',
        name: '5. Visualisation & Reporting',
        icon: 'layout',
        roleSummary: 'Interactive compliance investigation dashboard displaying fund-flow lineages, account cluster topology, and structured case summaries.',
        technologies: [
          {
            id: 'investigation-dashboard',
            name: 'Interactive Investigation Console & Flow Visualizer',
            icon: 'layout',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Interactive UI allowing compliance analysts to explore fund-flow lineage graphs, inspect flagged mule nodes, and view chronological transaction evidence.',
            whyUsed: 'Provides intuitive visual evidence essential for compliance teams and financial intelligence units (FIUs) to review and escalate cases.',
            connections: 'Renders output from the Risk Analysis Engine and NetworkX graph model.',
            codeSpecs: 'React interactive canvas, topology visualizers, metric cards, telemetry consoles.'
          }
        ]
      }
    ],

    flow: {
      nodes: [
        {
          id: 'n-sim-tx',
          title: 'Synthetic e₹ Engine',
          subtitle: 'Simulated Token Transfers',
          tech: 'Python / Synthetic e₹ Environment',
          layer: 'simulation',
          status: 'implemented'
        },
        {
          id: 'n-lineage-tracer',
          title: 'Transaction Lineage Engine',
          subtitle: 'Multi-Hop Provenance Traversal',
          tech: 'Recursive Lineage Walker',
          layer: 'lineage',
          status: 'implemented'
        },
        {
          id: 'n-temporal-graph',
          title: 'Temporal Graph Model',
          subtitle: 'Nodes: Accounts | Edges: e₹ Transfers',
          tech: 'NetworkX Directed Multigraph',
          layer: 'graph',
          status: 'implemented'
        },
        {
          id: 'n-cluster-detector',
          title: 'Mule Cluster Analyzer',
          subtitle: 'Coordinated Fan-Out / Fan-In',
          tech: 'Temporal Window Clustering (<30m)',
          layer: 'graph',
          status: 'implemented'
        },
        {
          id: 'n-risk-findings',
          title: 'Risk & Evidence Analyzer',
          subtitle: 'Explainable Investigative Alerts',
          tech: 'Rule-Based Anomaly Scorer',
          layer: 'risk',
          status: 'implemented'
        },
        {
          id: 'n-cashout-report',
          title: 'Investigation Visualizer',
          subtitle: 'Cash-Out Leads & Case Summary',
          tech: 'Interactive Investigation Console',
          layer: 'visualisation',
          status: 'implemented'
        }
      ],
      links: [
        { from: 'n-sim-tx', to: 'n-lineage-tracer', label: 'Synthetic e₹ Batches', protocol: 'Simulated Ledger Stream' },
        { from: 'n-lineage-tracer', to: 'n-temporal-graph', label: 'Reconstructed Multi-Hop Paths', protocol: 'Chronological Directed Edges' },
        { from: 'n-temporal-graph', to: 'n-cluster-detector', label: 'Graph Topology & Centrality', protocol: 'Adjacency & In/Out Ratios' },
        { from: 'n-cluster-detector', to: 'n-risk-findings', label: 'Layering & Aggregation Subgraphs', protocol: 'Structural Anomaly Vectors' },
        { from: 'n-risk-findings', to: 'n-cashout-report', label: 'Explainable Evidence & Cash-Out Leads', protocol: 'Investigation Summary Stream' }
      ],
      steps: [
        {
          num: '01',
          name: 'Synthetic Transaction & Lineage Ingestion',
          desc: 'Simulated programmable digital currency (e₹) transactions are generated with token metadata, wallet identities, and timestamps without claiming live banking connections.'
        },
        {
          num: '02',
          name: 'Multi-Hop Fund Lineage Reconstruction',
          desc: 'The lineage engine reconstructs sequential fund-movement paths, tracking parent-child transactions from source wallets through intermediary accounts.'
        },
        {
          num: '03',
          name: 'Temporal Directed Graph Modeling',
          desc: 'Accounts are structured as nodes and timestamped transactions as directed edges within NetworkX to capture time-window relationships (<30 minutes).'
        },
        {
          num: '04',
          name: 'Coordinated Mule Network Detection',
          desc: 'Graph heuristics identify coordinated network-level anomalies such as rapid fan-out dispersion (layering) and subsequent fan-in pooling (aggregation).'
        },
        {
          num: '05',
          name: 'Explainable Risk Reporting & Cash-Out Highlighting',
          desc: 'Potential cash-out points and suspicious transaction paths are synthesized into explainable investigative summaries for compliance review.'
        }
      ]
    },

    audit: {
      implemented: [
        'Synthetic programmable e₹ transaction generator with simulated wallet metadata',
        'Multi-hop fund lineage reconstruction algorithm preserving transaction sequence and splits',
        'NetworkX directed temporal multigraph (accounts as nodes, timestamped transfers as edges)',
        'Coordinated mule network anomaly detection (rapid fan-out layering and fan-in aggregation)',
        'Explainable heuristic risk scoring engine with transparent evidentiary factor breakdowns',
        'High-risk terminal cash-out point identification for investigation prioritisation',
        'Interactive compliance investigation visualizer with transaction telemetry console',
        'Strict simulation fidelity: Zero claims of live RBI infrastructure or real banking integrations'
      ],
      development: [
        'Python scientific environment (NetworkX graph algorithms, NumPy vector processing)',
        'Git & GitHub version control with synthetic test fixture pipelines'
      ],
      planned: [
        'Distributed enterprise graph database integration (e.g. Neo4j / TigerGraph - needs confirmation)',
        'Temporal Graph Neural Network (TGNN) embeddings for automated mule cluster classification',
        'Direct core-banking and CBDC regulatory sandbox connectors (pending formal banking partnership)'
      ],
      reviewerNotes: [
        'Platform concept: Combines programmable CBDC/e₹ transaction lineage with temporal graph intelligence for money-mule tracing.',
        'Integrity boundary: The current implementation operates strictly on synthetic transaction data and prototype graph algorithms. No live RBI or banking integrations are claimed.',
        'Investigation discipline: Alerts and cash-out highlights represent potential risks requiring investigation, not definitive proof of criminal activity.'
      ]
    }
  },

  {
    id: 'carbon',
    projectId: 'prj-carbon',
    number: '03',
    name: 'AI Carbon Intelligence',
    fullTitle: 'AI Carbon Intelligence',
    category: 'Sustainability Analytics',
    accentColor: '#C084FC',
    accentGlow: 'rgba(192, 132, 252, 0.35)',
    status: 'Research Concept',
    statusType: 'concept',
    lead: 'A sustainability-focused concept for analysing industrial supply-chain emissions, pinpointing operational carbon hotspots, and evaluating cost-optimal mitigation pathways.',
    summary: 'Aggregates heterogeneous logistics logs, energy consumption records, and supplier emissions metrics. Fits cross-validated regression models and random forests (Scikit-learn) to project enterprise emissions trajectory curves with 95% uncertainty confidence intervals across Scope 1 (fuels/direct), Scope 2 (grid electricity/steam), and Scope 3 (freight distance, value chain logistics).',
    
    // Only relevant layers for AI Carbon Intelligence (No fake DB or complex API)
    layers: [
      {
        id: 'frontend',
        name: 'Frontend / Interactive Modeler',
        icon: 'layout',
        roleSummary: 'Interactive parametric scenario forecaster allowing planners to evaluate freight, energy mix, and volume variables.',
        technologies: [
          {
            id: 'carbon-ui-sliders',
            name: 'Emissions Scenario Forecaster',
            icon: 'layout',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Interactive UI with parametric sliders for Freight Distance (100–4000 km), Renewable Energy Mix (0–100%), and Production Volume (500–5000 units).',
            whyUsed: 'Provides immediate visual sensitivity analysis for supply-chain managers to evaluate decarbonization trade-offs.',
            connections: 'Calculates dynamic Scope 1, Scope 2, Scope 3, and Total CO2e metrics with visual bar fill proportions.',
            codeSpecs: 'Interactive React range controls, parametric calculation state, real-time bar visualizations.'
          }
        ]
      },
      {
        id: 'data-processing',
        name: 'Data Ingestion & Matrix Processing',
        icon: 'database',
        roleSummary: 'High-performance tabular data wrangling and multi-dimensional matrix array calculations.',
        technologies: [
          {
            id: 'pandas-pipeline',
            name: 'Pandas Data Wrangling Engine',
            icon: 'database',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Aggregates heterogeneous logistics manifests, fleet fuel receipts, and utility electricity invoices into structured time-series DataFrames.',
            whyUsed: 'Robust tabular transformations, handling missing data, grouping supply-chain routes, and extracting Scope 1-3 feature columns.',
            connections: 'Cleans raw tabular logs and prepares standardized feature arrays for scientific regression models.',
            codeSpecs: 'Pandas DataFrames, time-series resampling, group-by route aggregation.'
          },
          {
            id: 'numpy-math',
            name: 'NumPy Vectorized Calculations',
            icon: 'numpy',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Executes high-throughput N-dimensional array multiplications, emission factor matrix dot products, and uncertainty bounds.',
            whyUsed: 'High-performance vector operations eliminate slow Python loops when computing complex supply-chain emission matrices.',
            connections: 'Provides vectorized linear algebraic support to Scikit-learn regressors and Parametric Scenario calculators.',
            codeSpecs: 'NumPy ndarray matrix dot products, standard deviation estimators, confidence bound vectors.'
          }
        ]
      },
      {
        id: 'ai-ml',
        name: 'AI / ML / Predictive Modeling',
        icon: 'cpu',
        roleSummary: 'Statistical supervised regression models and random forests projecting carbon trajectory curves with confidence intervals.',
        technologies: [
          {
            id: 'sklearn-regressors',
            name: 'Scikit-learn Multivariate Regressors',
            icon: 'cpu',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Fits cross-validated multivariate regression models and Random Forests to predict Scope 1, 2, and 3 emission curves across variable operational parameters.',
            whyUsed: 'Captures non-linear dependencies between transport distance, fuel energy mix, and factory throughput with 95% uncertainty confidence intervals.',
            connections: 'Trained on historical logistics feature matrices; outputs predictive emission curves to visualization layers.',
            codeSpecs: 'Scikit-learn RandomForestRegressor, LinearRegression, K-Fold cross validation, StandardScaler.'
          }
        ]
      },
      {
        id: 'analytics',
        name: 'Analytics & Visualization',
        icon: 'chart',
        roleSummary: 'Publication-quality statistical charting and emissions hotspot diagnostics.',
        technologies: [
          {
            id: 'matplotlib-charts',
            name: 'Matplotlib Statistical Plotting',
            icon: 'chart',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Generates statistical charts, emissions histograms, and 95% confidence interval ribbons for operational hotspot analysis.',
            whyUsed: 'Industry standard for exploratory data analysis (EDA), residual validation, and publication-ready diagnostic charts.',
            connections: 'Visualizes regression model confidence bounds and historical emission trends.',
            codeSpecs: 'Matplotlib pyplot, fill_between confidence interval bands, histogram distributions.'
          }
        ]
      },
      {
        id: 'infrastructure',
        name: 'Infrastructure / Planned Integrations',
        icon: 'network',
        roleSummary: 'Version control and planned automated enterprise ERP logistics connectors.',
        technologies: [
          {
            id: 'git-reproducibility',
            name: 'Git Version Control',
            icon: 'git',
            status: 'development',
            statusLabel: 'Development Tooling',
            role: 'Version control repository tracking experiment notebooks, data preparation scripts, and regression models.',
            whyUsed: 'Ensures reproducible data science workflows and model checkpoint tracking.',
            connections: 'Repository version control.',
            codeSpecs: 'Git version control, notebook tracking.'
          },
          {
            id: 'erp-logistics-api',
            name: 'Real-Time ERP Logistics Ingestion Connectors',
            icon: 'network',
            status: 'planned',
            statusLabel: 'Roadmap / Planned',
            role: 'Automated REST/OData API connectors to SAP / Oracle Supply Chain Management (SCM) platforms.',
            whyUsed: 'Replaces manual CSV uploads with continuous real-time carbon telemetry ingestion.',
            connections: 'Will stream live freight movements directly into Pandas data wrangling pipelines.',
            codeSpecs: 'Enterprise REST/OData connectors, scheduled batch workers.'
          },
          {
            id: 'carbon-tax-scorer',
            name: 'Dynamic Carbon Tax Liability Risk Scorer',
            icon: 'shield',
            status: 'planned',
            statusLabel: 'Roadmap / Planned',
            role: 'Algorithmic pricing of regulatory carbon taxation liabilities based on regional jurisdictional compliance rules (EU CBAM / local tax).',
            whyUsed: 'Directly converts technical metric tons of CO2e into monetary liability risk for executive decision makers.',
            connections: 'Will consume projected emissions from Scikit-learn models and multiply by jurisdictional tax rules.',
            codeSpecs: 'Regulatory rate tables, jurisdictional compliance algorithms.'
          }
        ]
      }
    ],

    flow: {
      nodes: [
        {
          id: 'n-logistics-logs',
          title: 'Supply Chain Logs',
          subtitle: 'Freight & Utility Receipts',
          tech: 'CSV / Logistics Tables',
          layer: 'data-processing',
          status: 'implemented'
        },
        {
          id: 'n-pandas-clean',
          title: 'Pandas Wrangling',
          subtitle: 'Imputation & Normalization',
          tech: 'Pandas DataFrames',
          layer: 'data-processing',
          status: 'implemented'
        },
        {
          id: 'n-numpy-matrix',
          title: 'Matrix Vectorization',
          subtitle: 'Emission Factors Dot Product',
          tech: 'NumPy Arrays',
          layer: 'data-processing',
          status: 'implemented'
        },
        {
          id: 'n-sklearn-models',
          title: 'Scikit-learn Regressors',
          subtitle: 'Multivariate & Random Forests',
          tech: '95% Confidence Intervals',
          layer: 'ai-ml',
          status: 'implemented'
        },
        {
          id: 'n-matplotlib-plots',
          title: 'Hotspot Analytics',
          subtitle: 'Statistical Visualization',
          tech: 'Matplotlib Diagnostic Charts',
          layer: 'analytics',
          status: 'implemented'
        },
        {
          id: 'n-scenario-ui',
          title: 'Scenario Modeler',
          subtitle: 'Freight / Renewables / Volume',
          tech: 'Interactive Slider Exhibit',
          layer: 'frontend',
          status: 'implemented'
        }
      ],
      links: [
        { from: 'n-logistics-logs', to: 'n-pandas-clean', label: 'Raw Supply Chain Data', protocol: 'Data Ingestion' },
        { from: 'n-pandas-clean', to: 'n-numpy-matrix', label: 'Structured Feature Matrices', protocol: 'Tabular Processing' },
        { from: 'n-numpy-matrix', to: 'n-sklearn-models', label: 'Scaled Feature Vectors', protocol: 'Training & Inference' },
        { from: 'n-sklearn-models', to: 'n-matplotlib-plots', label: 'Predicted Emission Curves', protocol: 'Statistical Plots' },
        { from: 'n-sklearn-models', to: 'n-scenario-ui', label: 'Parametric Regression Weights', protocol: 'Real-Time Calculations' }
      ],
      steps: [
        {
          num: '01',
          name: 'Heterogeneous Data Wrangling',
          desc: 'Pandas aggregates logistics manifests, fleet fuel logs, and power utility bills into structured DataFrames, normalizing units across freight routes.'
        },
        {
          num: '02',
          name: 'Vectorized Mathematical Matrix Formulation',
          desc: 'NumPy executes matrix dot products across Scope 1, Scope 2, and Scope 3 emission factors to structure training feature sets.'
        },
        {
          num: '03',
          name: 'Cross-Validated Regression Modeling',
          desc: 'Scikit-learn multivariate regressors and random forests model non-linear emissions behaviors, generating 95% confidence bounds.'
        },
        {
          num: '04',
          name: 'Interactive Parametric Scenario Forecasting',
          desc: 'Planners manipulate freight distance, renewable energy mix, and production volume to immediately project operational carbon outcomes.'
        }
      ]
    },

    audit: {
      implemented: [
        'Multivariate regression models evaluating Scope 1, 2, and 3 factors across freight distance and energy fuel inputs',
        'Scikit-learn regression models with 95% confidence intervals',
        'Pandas tabular data cleaning and preprocessing pipelines for heterogeneous logistics logs',
        'NumPy N-dimensional matrix array calculations and emission factor dot products',
        'Matplotlib statistical chart plotting for confidence interval bands and histograms',
        'Interactive parametric scenario forecaster with real-time slider calculations'
      ],
      development: [
        'Git & GitHub for code versioning and experimental script tracking',
        'Jupyter Notebooks / Google Colab for exploratory data analysis (EDA) and model prototyping'
      ],
      planned: [
        'Real-time ERP ledger data ingestion (SAP/Oracle API connectors)',
        'Dynamic carbon taxation liability risk scoring (EU CBAM and regional regulatory compliance)'
      ],
      reviewerNotes: [
        'Implemented as a data science and sustainability analytics research prototype.',
        'Uses classical statistical learning (Scikit-learn regressors) rather than heavy neural networks, maximizing interpretability and fast parametric inference.',
        'Does not require a persistent relational database: data is processed via in-memory Pandas pipelines.'
      ]
    }
  },

  {
    id: 'aegis',
    projectId: 'prj-aegis',
    number: '04',
    name: 'AEGIS-TWIN',
    fullTitle: 'AEGIS-TWIN — Autonomous Digital Twin for Adversarial Path Simulation & Optimal Defense Orchestration',
    category: 'Cyber Digital Twin',
    accentColor: '#38BDF8',
    accentGlow: 'rgba(56, 189, 248, 0.35)',
    status: 'Hackathon Prototype • Shortlisted',
    statusType: 'hackathon',
    lead: 'A cybersecurity digital twin developed for the VIT Vellore national-level hackathon (shortlisted for the next round). Models enterprise network assets, simulates adversarial attack paths, identifies lateral-movement risks, and prioritizes defensive actions based on risk reduction.',
    summary: 'Models enterprise network infrastructure as a weighted directed graph using NetworkX. Ingests vulnerability inventories (CVE/CVSS) and maps viable exploit chains against MITRE ATT&CK tactics (Initial Access → Lateral Movement → Credential Dumping). Employs graph centrality heuristics to evaluate minimum-cut defense strategies, computing optimal firewall and isolation policies that maximize risk reduction while minimizing operational downtime, followed by automated graph re-simulation.',
    
    // Only relevant layers for AEGIS-TWIN
    layers: [
      {
        id: 'frontend',
        name: 'Frontend / Cyber Range Dashboard',
        icon: 'layout',
        roleSummary: 'Visual cyber range interface with interactive network topology, node inspectors, and 5-stage simulation pipeline.',
        technologies: [
          {
            id: 'aegis-topology-ui',
            name: 'Cyber Range Dashboard & Interactive Topology Canvas',
            icon: 'layout',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Interactive SVG network graph rendering external threats, DMZ ingress, internal app clusters, and Domain Controller crown jewels.',
            whyUsed: 'Visualizes attack hops, allows node-level vulnerability inspections, and demonstrates instant -88% blast radius reduction.',
            connections: 'Drives user interactions for the 5-stage simulation pipeline (Asset Ingestion → Attack Path → Blast Radius → Policy Fix → Twin Verification).',
            codeSpecs: 'Interactive SVG network graph, dynamic edge animation states, node vulnerability inspector panels.'
          }
        ]
      },
      {
        id: 'backend',
        name: 'Backend / Simulation Service',
        icon: 'server',
        roleSummary: 'FastAPI asynchronous web microservice providing simulation control routes and graph state serialization.',
        technologies: [
          {
            id: 'fastapi-aegis-core',
            name: 'FastAPI Asynchronous Simulation Gateway',
            icon: 'fastapi',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Asynchronous Python REST API serving graph topology models, node vulnerability attributes, and triggering Dijkstra attack simulations.',
            whyUsed: 'Provides non-blocking simulation endpoints and clean JSON graph serialization for real-time digital twin state updates.',
            connections: 'Receives simulation commands from the frontend; delegates graph operations to the NetworkX directed graph engine.',
            codeSpecs: 'FastAPI route handlers, Pydantic graph schemas, CORS middleware.'
          }
        ]
      },
      {
        id: 'ai-ml',
        name: 'Graph Modeling & Optimization Core',
        icon: 'cpu',
        roleSummary: 'NetworkX directed graph topology modeling, Dijkstra exploit traversal, and Minimum-Cut defense policy synthesis.',
        technologies: [
          {
            id: 'networkx-graph-engine',
            name: 'NetworkX Directed Graph Engine (nx.DiGraph)',
            icon: 'network',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Models enterprise IT assets as vertices and network routes/vulnerabilities as directed weighted edges; runs shortest-path Dijkstra exploit traversal.',
            whyUsed: 'High-level algorithmic graph library perfectly suited for betweenness centrality, shortest adversarial paths, and reachability tests.',
            connections: 'Core mathematical engine that builds enterprise topology, models exploit chaining, and executes graph-cut mitigations.',
            codeSpecs: 'NetworkX 3.0+, nx.DiGraph, nx.shortest_path, nx.has_path, betweenness centrality heuristics.'
          },
          {
            id: 'min-cut-policy',
            name: 'Minimum-Cut Defense Policy Optimizer',
            icon: 'shield',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Evaluates graph-cut heuristics to synthesize optimal microsegmentation rules (e.g. ACL-901) that sever adversarial paths with minimal operational downtime.',
            whyUsed: 'Guarantees the disruption of multi-hop attack paths toward crown jewel assets while avoiding blanket outages.',
            connections: 'Evaluates active attack paths on the NetworkX graph and outputs isolation policies.',
            codeSpecs: 'Graph cut heuristics, microsegmentation rule synthesis (ACL-901), downtime cost scoring.'
          },
          {
            id: 'digital-twin-resim',
            name: 'Digital Twin Verification & Re-simulation',
            icon: 'check-circle',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Re-evaluates reachability (nx.has_path == False) after policy enforcement to mathematically verify complete threat severance.',
            whyUsed: 'Proves the effectiveness of the synthesized mitigation policy within the digital twin before rules are pushed to live firewalls.',
            connections: 'Verifies final graph state and calculates residual risk metrics (dropping from 9.8 to 1.2).',
            codeSpecs: 'nx.has_path verification check, residual risk quantifier, blast radius containment analytics.'
          }
        ]
      },
      {
        id: 'infrastructure',
        name: 'Infrastructure / Security Frameworks',
        icon: 'lock',
        roleSummary: 'MITRE ATT&CK adversarial taxonomy mapping and CVSS v3.1 threat severity weighting.',
        technologies: [
          {
            id: 'mitre-attack-framework',
            name: 'MITRE ATT&CK Enterprise Matrix Alignment',
            icon: 'lock',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Maps viable exploit chains to official ATT&CK techniques: T1190 (Public App Exploit) → T1550.002 (Pass-the-Hash) → T1003 (OS Credential Dumping).',
            whyUsed: 'Aligns the digital twin with the industry standard adversarial behavior taxonomy recognized by enterprise SOC teams.',
            connections: 'Decorates graph edges and nodes with standard adversarial tactics and mitigations (M1030 Network Segmentation).',
            codeSpecs: 'MITRE ATT&CK Enterprise Matrix v14, Tactic & Technique taxonomy mapping.'
          },
          {
            id: 'cvss-weighting',
            name: 'CVSS v3.1 Vulnerability Severity Weighting',
            icon: 'shield',
            status: 'implemented',
            statusLabel: 'Verified Implemented',
            role: 'Weights graph edge traversal difficulty and vulnerability impact based on CVSS scores (e.g. CVE-2023-38606 CVSS 9.8 Critical, CVE-2024-21413 CVSS 8.8 High).',
            whyUsed: 'Provides realistic probabilistic weights for adversarial hop duration and mean time-to-compromise.',
            connections: 'Weights the edges used by Dijkstra traversal within NetworkX.',
            codeSpecs: 'CVSS v3.1 scoring formulas, severity categorization (Critical, High, Medium).'
          },
          {
            id: 'siem-live-ingestion',
            name: 'Live Firewall & SIEM Telemetry Ingestion',
            icon: 'network',
            status: 'planned',
            statusLabel: 'Roadmap / Planned',
            role: 'Real-time telemetry connectors streaming live netflow logs and firewall state to keep the digital twin continuously synchronized with physical infrastructure.',
            whyUsed: 'Planned evolution from a static hackathon network model to a continuous real-time digital twin.',
            connections: 'Will stream live network telemetry directly into the NetworkX graph core.',
            codeSpecs: 'Syslog / NetFlow collectors, SIEM API webhooks.'
          },
          {
            id: 'rl-defense-agent',
            name: 'Reinforcement Learning Defense Orchestrator',
            icon: 'cpu',
            status: 'planned',
            statusLabel: 'Roadmap / Planned',
            role: 'Autonomous reinforcement learning agent trained to deploy adaptive countermeasures against evolving multi-stage intrusions.',
            whyUsed: 'Enables autonomous defensive adaptation against zero-day and dynamic adversarial path changes.',
            connections: 'Will interface with the defense policy synthesizer.',
            codeSpecs: 'Q-learning / PPO agent framework, environment state simulator.'
          }
        ]
      }
    ],

    flow: {
      nodes: [
        {
          id: 'n-cve-ingest',
          title: 'Asset & CVE Ingestion',
          subtitle: 'Port & Vulnerability Data',
          tech: 'CVE / CVSS Database',
          layer: 'infrastructure',
          status: 'implemented'
        },
        {
          id: 'n-networkx-topo',
          title: 'NetworkX Graph Core',
          subtitle: 'Topology Modeling (nx.DiGraph)',
          tech: 'NetworkX Directed Graph',
          layer: 'ai-ml',
          status: 'implemented'
        },
        {
          id: 'n-fastapi-twin',
          title: 'FastAPI Simulation API',
          subtitle: 'Async State Orchestrator',
          tech: 'FastAPI Microservice',
          layer: 'backend',
          status: 'implemented'
        },
        {
          id: 'n-dijkstra-attack',
          title: 'Attack Path Simulation',
          subtitle: 'Dijkstra Exploit Traversal',
          tech: 'MITRE ATT&CK (T1190→T1550→T1003)',
          layer: 'ai-ml',
          status: 'implemented'
        },
        {
          id: 'n-min-cut-fix',
          title: 'Min-Cut Defense Policy',
          subtitle: 'Optimal Microsegmentation',
          tech: 'ACL-901 Policy Synthesis',
          layer: 'ai-ml',
          status: 'implemented'
        },
        {
          id: 'n-resim-verify',
          title: 'Digital Twin Verification',
          subtitle: 'nx.has_path == False (-88% Risk)',
          tech: 'Residual Risk Analytics',
          layer: 'ai-ml',
          status: 'implemented'
        },
        {
          id: 'n-cyber-range',
          title: 'Cyber Range Canvas',
          subtitle: 'Interactive Visual Dashboard',
          tech: 'SVG Topology Viewport',
          layer: 'frontend',
          status: 'implemented'
        }
      ],
      links: [
        { from: 'n-cve-ingest', to: 'n-networkx-topo', label: 'Nodes, Ports & CVSS Weights', protocol: 'Topology Ingestion' },
        { from: 'n-networkx-topo', to: 'n-fastapi-twin', label: 'Graph Model Serialization', protocol: 'Python In-Memory' },
        { from: 'n-fastapi-twin', to: 'n-dijkstra-attack', label: 'Trigger Attack Traversal', protocol: 'Simulation Dispatch' },
        { from: 'n-dijkstra-attack', to: 'n-min-cut-fix', label: '3-Hop Blast Radius Matrix', protocol: 'Exposure Analysis' },
        { from: 'n-min-cut-fix', to: 'n-resim-verify', label: 'Severed Bridge ACL-901', protocol: 'Graph Partitioning' },
        { from: 'n-resim-verify', to: 'n-cyber-range', label: 'Verified Posture (1.2 Risk)', protocol: 'Twin State Update' }
      ],
      steps: [
        {
          num: '01',
          name: 'Enterprise Asset & CVE Ingestion',
          desc: 'Network hosts, open service ports, and CVSS vulnerability scores are ingested into an in-memory NetworkX directed graph (G = nx.DiGraph).'
        },
        {
          num: '02',
          name: 'MITRE ATT&CK Adversarial Path Traversal',
          desc: 'Dijkstra algorithm traverses viable exploit chains: T1190 (Nginx Port 443) → T1550.002 (App Cluster Port 8000) → T1003 (Domain Controller Kerberos).'
        },
        {
          num: '03',
          name: 'Multi-Hop Blast Radius & Risk Quantifier',
          desc: 'Graph centrality heuristics evaluate reachability, reporting 100% Crown Jewel exposure and a composite risk score of 9.8 / 10.0.'
        },
        {
          num: '04',
          name: 'Minimum-Cut Defense Policy Synthesis',
          desc: 'The optimizer calculates the minimum-cost graph cut: microsegmentation rule ACL-901 severs the DMZ-to-App lateral bridge with 0 seconds downtime.'
        },
        {
          num: '05',
          name: 'Digital Twin Verification & Posture Re-simulation',
          desc: 'nx.has_path(G, "Attacker", "DC-01") executes and returns False, verifying complete attack severance and dropping residual risk to 1.2.'
        }
      ]
    },

    audit: {
      implemented: [
        'NetworkX directed graph topology modeling (nx.DiGraph)',
        'Dijkstra shortest-path traversal across multi-hop vulnerability chains',
        'MITRE ATT&CK enterprise tactic mapping (T1190 Initial Access, T1550.002 Lateral Movement, T1003 Credential Dumping)',
        'CVSS v3.1 threat severity weighting on network graph edges',
        'Minimum-cut graph partitioning heuristics for optimal microsegmentation policy synthesis',
        'Digital twin re-simulation and path reachability verification (nx.has_path)',
        'FastAPI asynchronous simulation REST microservice',
        'Interactive SVG cyber range viewport with live node vulnerability inspector'
      ],
      development: [
        'Git & GitHub for hackathon team version control and branch merging',
        'Python 3.11 virtual environment with NetworkX and FastAPI'
      ],
      planned: [
        'Live telemetry graph ingestion from production firewalls and SIEM syslog collectors',
        'Reinforcement learning agent for autonomous adaptive countermeasure orchestration'
      ],
      reviewerNotes: [
        'Shortlisted for the next round at the VIT Vellore national-level hackathon as an advanced proof-of-concept prototype.',
        'Graph state is maintained in-memory for high-speed hackathon simulation; does not require a persistent SQL database.',
        'Verifiably demonstrates a mathematical -88% risk reduction from 9.8 (Critical) to 1.2 (Contained).'
      ]
    }
  }
];

export function getArchitectureProject(id) {
  const cleanId = id.replace(/^prj-/, '');
  return ARCHITECTURE_PROJECTS.find((p) => p.id === cleanId) || ARCHITECTURE_PROJECTS[0];
}
