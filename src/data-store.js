/**
 * Sahith M. — Digital Playground Data Store
 * Central source of truth for skills, projects, interest domains, and interactive exhibits.
 */

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Constellations', count: 18, color: '#10B981' },
  { id: 'programming', label: 'Programming', count: 3, color: '#5C87A6' },
  { id: 'ai-ml', label: 'AI & Machine Learning', count: 2, color: '#10B981' },
  { id: 'data-science', label: 'Data Science', count: 3, color: '#14B8A6' },
  { id: 'development', label: 'Development', count: 5, color: '#38BDF8' },
  { id: 'tools', label: 'Tools', count: 5, color: '#E5A93C' }
];

export const SKILLS = [
  {
    id: 'python',
    symbol: 'Py',
    number: '01',
    category: 'programming',
    groupLabel: 'Programming',
    tier: 'anchor',
    coords: { x: 500, y: 300 },
    connections: ['numpy', 'pandas', 'scikit-learn', 'fastapi', 'c', 'sql', 'winrm', 'workflow-automation', 'git', 'networkx'],
    title: 'Python',
    desc: 'Primary language for high-throughput backend services, remote telemetry collection via WinRM, automated OS interaction, and Scikit-learn/OpenCV scientific pipelines.',
    projectIds: ['probe360', 'mule-matrix', 'carbon', 'aegis']
  },
  {
    id: 'c',
    symbol: 'C',
    number: '07',
    category: 'programming',
    groupLabel: 'Programming',
    tier: 'specialist',
    coords: { x: 330, y: 175 },
    connections: ['python', 'windows-admin'],
    title: 'C',
    desc: 'Procedural fundamentals, memory pointers, low-level data structures, and algorithmic logic underlying operating systems architecture.',
    projectIds: []
  },
  {
    id: 'sql',
    symbol: 'Sql',
    number: '08',
    category: 'programming',
    groupLabel: 'Programming',
    tier: 'specialist',
    coords: { x: 340, y: 415 },
    connections: ['python', 'pandas', 'fastapi', 'rest-apis'],
    title: 'SQL',
    desc: 'Declarative queries, relational schema design, indexing strategies, and transactional data integrity across Postgres financial ledgers and system stores.',
    projectIds: ['mule-matrix']
  },
  {
    id: 'scikit-learn',
    symbol: 'Sk',
    number: '05',
    category: 'ai-ml',
    groupLabel: 'AI & Machine Learning',
    tier: 'anchor',
    coords: { x: 710, y: 175 },
    connections: ['python', 'numpy', 'pandas', 'opencv'],
    title: 'Scikit-learn',
    desc: 'Statistical learning toolkit used for supervised regression modeling, cross-validated carbon emission curve projections, and predictive feature scaling.',
    projectIds: ['carbon']
  },
  {
    id: 'opencv',
    symbol: 'Cv',
    number: '06',
    category: 'ai-ml',
    groupLabel: 'AI & Machine Learning',
    tier: 'specialist',
    coords: { x: 865, y: 135 },
    connections: ['numpy', 'scikit-learn'],
    title: 'OpenCV',
    desc: 'Computer vision framework implementing Sobel differential gradients, Laplacian sharpening, Canny edge detection, and Otsu morphological segmentation.',
    projectIds: ['carbon']
  },
  {
    id: 'numpy',
    symbol: 'Np',
    number: '02',
    category: 'data-science',
    groupLabel: 'Data Science',
    tier: 'anchor',
    coords: { x: 715, y: 310 },
    connections: ['python', 'pandas', 'matplotlib', 'scikit-learn', 'opencv'],
    title: 'NumPy',
    desc: 'High-performance N-dimensional array processing powering pixel matrix convolutions, Fourier frequency transforms, and mathematical vector calculations.',
    projectIds: ['carbon', 'mule-matrix']
  },
  {
    id: 'pandas',
    symbol: 'Pd',
    number: '03',
    category: 'data-science',
    groupLabel: 'Data Science',
    tier: 'specialist',
    coords: { x: 860, y: 275 },
    connections: ['python', 'numpy', 'matplotlib', 'sql', 'scikit-learn'],
    title: 'Pandas',
    desc: 'Data wrangling engine for cleaning high-dimensional time-series emissions data, evaluating feature correlations, and structuring statistical datasets.',
    projectIds: ['carbon']
  },
  {
    id: 'matplotlib',
    symbol: 'Plt',
    number: '04',
    category: 'data-science',
    groupLabel: 'Data Science',
    tier: 'specialist',
    coords: { x: 875, y: 415 },
    connections: ['numpy', 'pandas'],
    title: 'Matplotlib',
    desc: 'Statistical chart plotting for enterprise emissions confidence intervals, image histograms, and spatial frequency spectrums.',
    projectIds: ['carbon']
  },
  {
    id: 'fastapi',
    symbol: 'Fa',
    number: '09',
    category: 'development',
    groupLabel: 'Development',
    tier: 'anchor',
    coords: { x: 320, y: 275 },
    connections: ['python', 'rest-apis', 'pydantic', 'sql', 'workflow-automation'],
    title: 'FastAPI',
    desc: 'High-throughput asynchronous Python web framework providing typed REST endpoints and automatic OpenAPI documentation.',
    projectIds: ['mule-matrix', 'aegis']
  },
  {
    id: 'rest-apis',
    symbol: 'Api',
    number: '10',
    category: 'development',
    groupLabel: 'Development',
    tier: 'specialist',
    coords: { x: 175, y: 225 },
    connections: ['fastapi', 'pydantic', 'sql'],
    title: 'REST APIs',
    desc: 'Stateless HTTP service design, structured error payloads, JSON serialization, and status code discipline.',
    projectIds: ['mule-matrix', 'aegis']
  },
  {
    id: 'pydantic',
    symbol: 'Pyd',
    number: '11',
    category: 'development',
    groupLabel: 'Development',
    tier: 'specialist',
    coords: { x: 155, y: 345 },
    connections: ['fastapi', 'rest-apis'],
    title: 'Pydantic',
    desc: 'Strict runtime data validation, frozen Pydantic contracts, and serialization boundaries between autonomous optimization engines and APIs.',
    projectIds: ['mule-matrix']
  },
  {
    id: 'winrm',
    symbol: 'Wrm',
    number: '12',
    category: 'development',
    groupLabel: 'Development',
    tier: 'specialist',
    coords: { x: 180, y: 465 },
    connections: ['python', 'windows-admin', 'vuln-assessment'],
    title: 'WinRM Telemetry',
    desc: 'Windows Remote Management protocol for credentialed remote asset discovery, hardware querying, and patch audits without persistent client daemons.',
    projectIds: ['probe360']
  },
  {
    id: 'windows-admin',
    symbol: 'Win',
    number: '13',
    category: 'development',
    groupLabel: 'Development',
    tier: 'specialist',
    coords: { x: 335, y: 515 },
    connections: ['winrm', 'vuln-assessment', 'mitre-attack', 'c'],
    title: 'Windows Admin',
    desc: 'Registry management, PowerShell execution policies, system service control, and security event log inspection.',
    projectIds: ['probe360']
  },
  {
    id: 'vuln-assessment',
    symbol: 'Vuln',
    number: '14',
    category: 'tools',
    groupLabel: 'Tools',
    tier: 'specialist',
    coords: { x: 235, y: 110 },
    connections: ['winrm', 'windows-admin', 'mitre-attack', 'networkx'],
    title: 'Vuln Assessment',
    desc: 'Auditing remote unquoted service paths, CVE/CVSS threat baseline correlation, and multi-hop attack path risk modeling.',
    projectIds: ['probe360', 'aegis']
  },
  {
    id: 'mitre-attack',
    symbol: 'Atk',
    number: '16',
    category: 'tools',
    groupLabel: 'Tools',
    tier: 'specialist',
    coords: { x: 375, y: 95 },
    connections: ['vuln-assessment', 'windows-admin', 'networkx'],
    title: 'MITRE ATT&CK',
    desc: 'Adversarial tactic and technique taxonomy mapping across Initial Access, Lateral Movement, Privilege Escalation, and Defense Evasion.',
    projectIds: ['aegis']
  },
  {
    id: 'networkx',
    symbol: 'Nx',
    number: '15',
    category: 'tools',
    groupLabel: 'Tools',
    tier: 'specialist',
    coords: { x: 500, y: 155 },
    connections: ['python', 'vuln-assessment', 'mitre-attack'],
    title: 'NetworkX',
    desc: 'Complex network topology graphing, temporal directed multigraph modeling, betweenness centrality, and money-mule cluster detection.',
    projectIds: ['aegis', 'mule-matrix']
  },
  {
    id: 'workflow-automation',
    symbol: 'Wfl',
    number: '17',
    category: 'tools',
    groupLabel: 'Tools',
    tier: 'specialist',
    coords: { x: 500, y: 475 },
    connections: ['python', 'git', 'fastapi'],
    title: 'Workflow Automation',
    desc: 'End-to-end data pipeline automation, schema harmonization queues, and event-driven trigger architectures.',
    projectIds: ['mule-matrix', 'probe360', 'aegis']
  },
  {
    id: 'git',
    symbol: 'Git',
    number: '18',
    category: 'tools',
    groupLabel: 'Tools',
    tier: 'anchor',
    coords: { x: 675, y: 465 },
    connections: ['python', 'workflow-automation'],
    title: 'Git & GitHub',
    desc: 'Version control branch workflows, atomic commits, repository documentation, and CI/CD automation foundations.',
    projectIds: ['probe360', 'aegis', 'mule-matrix', 'carbon']
  }
];

export const PROJECTS = [
  {
    id: 'probe360',
    number: '01',
    category: 'security',
    categoryLabel: 'Cybersecurity Platform',
    title: 'Probe360 — Agentless Windows Security Platform',
    themeColor: '#10B981',
    status: 'Prototype • Implemented',
    statusType: 'implemented',
    problem: 'Traditional endpoint auditing requires installing persistent third-party background daemons across servers, introducing software supply-chain vulnerabilities, memory overhead, and administrative deployment friction.',
    approach: 'Harness native Windows Remote Management (WinRM over HTTPS/Port 5986) with Kerberos/CredSSP mutual authentication to conduct credentialed remote audits without deploying any client agent.',
    keyMechanism: 'Dispatches remote CIM and WMI queries to inspect installed software (Win32_Product / registry uninstall keys), check service permission DACLs, and cross-reference discovered packages against national CVE baselines.',
    outcomeOrStatus: 'Working Python-based CLI prototype verified on Windows Server environments; automated baseline matching complete. Subnet honeypot decoys remain on the planned roadmap.',
    lead: 'Agentless Windows endpoint discovery, credentialed software inventorying, and vulnerability baseline correlation designed to eliminate persistent daemon footprint vulnerabilities on monitored hosts.',
    implementedSpec: 'WinRM remote authenticated query pipeline (HTTPS/5986), installed software WMI inventory, and automated CVE baseline cross-referencing.',
    plannedSpec: 'Subnet honeypot decoy engagement nodes and automated behavioral anomaly scoring.',
    skills: ['python', 'winrm', 'windows-admin', 'vuln-assessment', 'workflow-automation', 'git'],
    architecture: 'Probe360 coordinates credentialed, TLS-encrypted WinRM sessions into target Windows endpoints without deploying intrusive binary daemons. It queries CIM/WMI classes for installed MSI packages, checks registry run-keys for insecure binary paths, audits service permission DACLs, and maps findings to national vulnerability databases.'
  },
  {
    id: 'mule-matrix',
    number: '02',
    category: 'fintech',
    categoryLabel: 'Financial Fraud Intelligence',
    title: 'Mule Matrix — Financial Fraud Detection & Money-Mule Network Tracing',
    themeColor: '#2DD4A7',
    status: 'Analytical Prototype • Graph Simulation',
    statusType: 'concept',
    problem: 'Financial fraud networks rapidly structure illicit funds across multi-hop intermediary accounts (fan-out) within minutes before re-aggregating into cash-out accounts (fan-in), rendering flat, static rule-based transaction checks ineffective.',
    approach: 'Construct an offline analytical testbed combining synthetic programmable CBDC/e₹ token lineage with temporal directed multigraph modeling to evaluate flow velocity and network topology.',
    keyMechanism: 'Models accounts as nodes and time-stamped token transfers as directed multigraph edges in NetworkX; a recursive lineage engine traces paths across intermediary tiers, calculating temporal burst velocity, fan-in/fan-out ratios, and cyclic flow heuristics.',
    outcomeOrStatus: 'Analytical simulation prototype with synthetic programmable e₹ transaction generator and explainable risk scoring dossiers. Distributed graph databases (Neo4j) and Temporal Graph Neural Networks remain planned research.',
    lead: 'An analytical platform combining programmable CBDC/e₹ transaction lineage with temporal graph intelligence to trace suspicious fund movements, identify connected money-mule networks, and highlight potential cash-out points for investigation.',
    implementedSpec: 'Synthetic programmable e₹ transaction generator with simulated lineage metadata, multi-hop recursive lineage tracer, and temporal directed multigraph modeling via NetworkX with explainable risk scoring.',
    plannedSpec: 'Distributed enterprise graph database deployment (Neo4j/TigerGraph) and Temporal Graph Neural Networks (TGNN) for dynamic embedding-based fraud scoring.',
    skills: ['python', 'networkx', 'numpy', 'pydantic', 'sql', 'git'],
    architecture: 'Mule Matrix structures transaction histories as directed temporal multigraphs where accounts form nodes and token transfers form time-stamped edges. Synthetic programmable e₹ tokens carry simulated metadata and lineage attributes across multi-hop hops. A recursive lineage engine traverses transaction paths from suspicious origin accounts across intermediary layers to detect layering schemes, rapid fan-out bursts, and pooling behavior. Temporal graph heuristics evaluate in/out degree ratios, velocity anomalies, and cyclic flow patterns. Potential money-mule clusters and cash-out endpoints are aggregated into explainable investigation dossiers with supporting transaction evidence, treating all alerts as investigative risk indicators rather than conclusive verdicts.'
  },
  {
    id: 'carbon',
    number: '03',
    category: 'ai',
    categoryLabel: 'Sustainability Analytics',
    title: 'AI Carbon Intelligence — Supply-Chain Emissions Analytics',
    themeColor: '#7E9CB9',
    status: 'Research Concept & Modeling Pipeline',
    statusType: 'concept',
    problem: 'Industrial logistics chains struggle to accurately quantify Scope 1, 2, and 3 carbon emissions due to non-linear fuel consumption curves, payload weight variations, and fragmented transport records, making mitigation planning speculative.',
    approach: 'Formulate a data-driven decision-support pipeline combining multi-variable statistical regression and machine learning estimators to evaluate operational carbon hotspots and test alternative routing configurations.',
    keyMechanism: 'Preprocesses heterogeneous freight logistics logs and fuel records using Pandas/NumPy, then trains cross-validated Scikit-learn regression models to project emissions trajectories with empirical 95% uncertainty confidence intervals across distance and cargo payload weights.',
    outcomeOrStatus: 'Research concept & analytical regression model; verified on synthetic logistics benchmarks with parameter sensitivity analysis. Live enterprise ERP integration is on the future roadmap.',
    lead: 'A sustainability-focused concept for analysing industrial supply-chain emissions, pinpointing operational carbon hotspots, and evaluating cost-optimal mitigation pathways.',
    implementedSpec: 'Multivariate regression models evaluating Scope 1, 2, and 3 factors across variable freight distance and energy fuel inputs with confidence intervals.',
    plannedSpec: 'Real-time ERP ledger data ingestion and dynamic carbon taxation liability risk scoring.',
    skills: ['python', 'scikit-learn', 'pandas', 'numpy', 'matplotlib'],
    architecture: 'Aggregates heterogeneous logistics logs, energy consumption records, and supplier emissions metrics. Fits cross-validated regression models and random forests to project enterprise emissions trajectory curves with 95% uncertainty confidence intervals.'
  },
  {
    id: 'aegis',
    number: '04',
    category: 'automation',
    categoryLabel: 'Cyber Digital Twin',
    title: 'AEGIS-TWIN — Autonomous Cyber Digital Twin & Attack Simulation',
    themeColor: '#D9822B',
    status: 'Hackathon Prototype • Shortlisted (VIT)',
    statusType: 'concept',
    problem: 'Enterprise security teams assess software vulnerabilities in isolation, failing to anticipate how attackers chain low- and medium-severity flaws across adjacent network assets to reach critical crown jewels.',
    approach: 'Build a graph-based cybersecurity digital twin that ingests network asset topologies, maps attacker techniques via MITRE ATT&CK, and simulates adversarial path traversal to compute optimal defensive interventions.',
    keyMechanism: 'Constructs weighted directed graph topologies in NetworkX, maps discovered CVEs to ATT&CK tactics (Initial Access → Lateral Movement → Credential Dumping), executes shortest-path exploit traversal, and applies graph cut heuristics to identify the minimal network segmentation rules that sever exploit paths.',
    outcomeOrStatus: 'Hackathon prototype developed for the VIT Vellore national hackathon (shortlisted for the next round); interactive attack path simulation and defensive remediation scoring via FastAPI backend service.',
    lead: 'A cybersecurity digital twin developed for the VIT Vellore national-level hackathon (shortlisted for the next round). Models enterprise network assets, simulates adversarial attack paths, identifies lateral-movement risks, and prioritizes defensive actions based on risk reduction.',
    implementedSpec: 'NetworkX directed graph topology modeling, MITRE ATT&CK technique mapping, CVSS-weighted risk scoring, and dynamic attack path simulation via FastAPI.',
    plannedSpec: 'Real-time telemetry graph ingestion from live firewalls and reinforcement learning for automated adaptive countermeasure deployment.',
    skills: ['python', 'networkx', 'fastapi', 'mitre-attack', 'vuln-assessment', 'git'],
    architecture: 'Models enterprise network infrastructure as a weighted directed graph using NetworkX. Ingests vulnerability inventories (CVE/CVSS) and maps viable exploit chains against MITRE ATT&CK tactics (Initial Access → Lateral Movement → Credential Dumping). Employs graph centrality heuristics to evaluate minimum-cut defense strategies, computing optimal firewall and isolation policies that maximize risk reduction while minimizing operational downtime, followed by automated graph re-simulation. Shortlisted for the next round at the VIT Vellore national-level hackathon as an advanced proof-of-concept prototype.'
  }
];

/**
 * About Me — Engineering Mindset, Learning Approach & Problem-Solving Pillars
 * Replaces repetitive project summaries with authentic engineering philosophy.
 */
export const MINDSET_PILLARS = {
  systems: {
    key: 'systems',
    tag: 'Systems & Architecture Mindset',
    title: 'First-Principles Engineering & Underlying Primitives',
    icon: '⚙️',
    desc: 'Before layering high-level abstractions, I seek to understand what happens at the foundational boundary—memory pointers, operating system syscalls, and network protocols. Starting with procedural C taught me to respect memory layout and execution costs. In modern backend architectures, that grounding translates into designing lean, high-throughput Python services that eliminate redundant daemons and minimize runtime overhead.',
    principles: [
      'Understand low-level execution before adding frameworks',
      'Minimize background daemon footprint on endpoints',
      'Prefer deterministic protocols over black-box middleware'
    ],
    tools: 'C (Pointers & Memory) • Python Runtime • WinRM Protocol • OS Syscalls'
  },
  empirical: {
    key: 'empirical',
    tag: 'Learning & Verification Approach',
    title: 'Empirical Validation Over Black-Box Assumptions',
    icon: '🧠',
    desc: 'Machine learning models are only as dependable as their validation discipline. Rather than treating neural networks or regression estimators as opaque predictors, I focus on data distribution shifts, feature correlation structures, and empirical error intervals. Whether fitting multivariate curves or inspecting convolutional layers, I verify hypotheses against concrete metrics rather than theoretical assumptions.',
    principles: [
      'Validate models with rigorous cross-validation and error bounds',
      'Inspect feature collinearity and outliers before training',
      'Treat predictive outputs as calibrated confidence intervals'
    ],
    tools: 'Scikit-learn • Pandas • NumPy • PyTorch • Error Quantification'
  },
  graphs: {
    key: 'graphs',
    tag: 'Problem-Solving Methodology',
    title: 'Decomposing Complexity into Directed Topologies',
    icon: '⚡',
    desc: 'Many of the hardest technical challenges—from multi-hop money-mule laundering to enterprise cyber attack paths—cannot be expressed cleanly in flat relational tables. I approach complex systems by modeling relationships as directed graphs. Tracing multi-step lineages and computing topological cuts allows me to reveal hidden traversal patterns and identify the exact choke points that yield optimal intervention.',
    principles: [
      'Model interconnected entities as vertices and time-stamped edges',
      'Evaluate flow velocity and degree anomalies across hops',
      'Identify critical choke points using graph-cut heuristics'
    ],
    tools: 'NetworkX • Graph Algorithms • Path Traversal • Centrality Metrics'
  },
  security: {
    key: 'security',
    tag: 'Security & Operational Philosophy',
    title: 'Defense-in-Depth with Zero-Agent Footprint',
    icon: '🛡️',
    desc: 'Security is not an afterthought added to finished code; it is an architectural property. My work in systems telemetry focuses on agentless administration—leveraging native operating system protocols with mutual authentication rather than deploying vulnerable third-party daemons. In adversarial simulation, I analyze how misconfigurations chain together, prioritizing mitigations that maximize enterprise risk reduction with minimal operational disruption.',
    principles: [
      'Eliminate third-party agent daemons via native OS protocols',
      'Analyze exploit chains rather than isolated vulnerability scores',
      'Prioritize remediations that yield maximum graph disruption'
    ],
    tools: 'Agentless WinRM • Kerberos/CredSSP • MITRE ATT&CK • Minimum-Cut Defense'
  }
};

// Backward-compatible alias for About component focus cards
export const INTERESTS = MINDSET_PILLARS;

/**
 * Technical Background — Core Engineering Concepts & Distinctions
 * Concise, high-signal architectural trade-offs without repetitive padding.
 */
export const TECHNICAL_CONCEPTS = [
  {
    id: 'agentless-telemetry',
    category: 'security',
    categoryLabel: 'Security & Systems',
    title: 'Agentless vs. Agent-Based Telemetry',
    shortDef: 'Queries remote Windows endpoints on demand over native WinRM/WMI (TLS 5986) using Kerberos/CredSSP credentials.',
    keyDistinction: 'Eliminates third-party client daemons and supply-chain vulnerabilities, trading continuous offline telemetry for zero host footprint.',
    interviewTakeaway: 'Avoids enterprise change-management approvals and daemon exploits while enabling instant, credentialed fleet auditing.',
    relevantDomain: 'Endpoint Security • Probe360',
    badge: 'Systems Architecture'
  },
  {
    id: 'temporal-graphs',
    category: 'graphs',
    categoryLabel: 'Graph Intelligence',
    title: 'Temporal Graph Analysis vs. Static Rule Detection',
    shortDef: 'Models accounts as vertices and timestamped transactions as directed edges to uncover coordinated money-mule rings.',
    keyDistinction: 'Evaluates fan-out burst velocity, rapid pooling ratios, and multi-hop paths that evade static transfer amount thresholds.',
    interviewTakeaway: 'Mule networks structure transfers into micro-splits across 3–4 hops; temporal closeness metrics isolate the ring topology.',
    relevantDomain: 'Financial Intelligence • Mule Matrix',
    badge: 'Graph Intelligence'
  },
  {
    id: 'adversarial-twins',
    category: 'security',
    categoryLabel: 'Security & Systems',
    title: 'Adversarial Digital Twins vs. Static Vulnerability Scans',
    shortDef: 'Constructs directed network topology graphs to simulate chained MITRE ATT&CK techniques across subnets.',
    keyDistinction: 'Calculates minimum-cut defense chokepoints rather than generating uncontextualized, isolated vulnerability lists.',
    interviewTakeaway: 'Proves which specific firewall or credential choke point neutralizes multi-stage exploit paths with minimal downtime.',
    relevantDomain: 'Cyber Defense • AEGIS-TWIN',
    badge: 'Adversarial Simulation'
  },
  {
    id: 'multivariate-emissions',
    category: 'aiml',
    categoryLabel: 'Applied Machine Learning',
    title: 'Multivariate Regression vs. Flat Emissions Multipliers',
    shortDef: 'Models freight emissions by capturing non-linear interactions among payload tonnage, engine displacement, and topography.',
    keyDistinction: 'Computes empirical 95% confidence intervals instead of applying static, naive activity multipliers.',
    interviewTakeaway: 'Payload burn curves are non-linear; empirical regression delivers calibrated uncertainty bounds required for ESG audits.',
    relevantDomain: 'Sustainability Analytics • AI Carbon',
    badge: 'Statistical Modeling'
  },
  {
    id: 'asgi-vs-wsgi',
    category: 'systems',
    categoryLabel: 'Systems & Architecture',
    title: 'Asynchronous Event Loops (ASGI) vs. Thread-Blocking (WSGI)',
    shortDef: 'Single-threaded cooperative asyncio event loop yielding during network/socket I/O vs. thread-per-request blocking.',
    keyDistinction: 'Sustains thousands of concurrent remote endpoint telemetry polls without thread exhaustion or high memory overhead.',
    interviewTakeaway: 'Because remote network round-trips dominate latency, async dispatch keeps the FastAPI collector lightweight and scalable.',
    relevantDomain: 'Backend Engineering • FastAPI & WinRM',
    badge: 'Async Architecture'
  },
  {
    id: 'c-vs-python',
    category: 'systems',
    categoryLabel: 'Systems & Architecture',
    title: 'Low-Level Memory (C) vs. Dynamic Managed Runtimes (Python)',
    shortDef: 'Explicit pointer arithmetic and manual memory management in C vs. managed garbage collection and dynamic references in Python.',
    keyDistinction: 'Grounded awareness of memory layout, cache lines, and syscall costs prevents naive bottlenecks in high-level services.',
    interviewTakeaway: 'Understanding C primitives informs optimal data structure selection and memory reuse in Python data pipelines.',
    relevantDomain: 'Systems Foundations • Procedural C & Python',
    badge: 'Core Systems'
  }
];

export const TIMELINE_MILESTONES = [
  {
    step: '01',
    period: 'FOUNDATIONS',
    title: 'Low-Level Primitives & Procedural C',
    desc: 'Studied memory pointers, process structures, and operating systems fundamentals in C before diving into high-level abstractions.',
    tag: 'Core Systems'
  },
  {
    step: '02',
    period: 'DATA & MODELS',
    title: 'Scientific Computing & ML Algorithms',
    desc: 'Formulated statistical regressions and computer vision array transforms using NumPy, Pandas, Scikit-learn, and OpenCV.',
    tag: 'AI & Data Science'
  },
  {
    step: '03',
    period: 'TELEMETRY & SECURITY',
    title: 'Agentless WinRM & Vulnerability Auditing',
    desc: 'Engineered credentialed remote auditing pipelines for enterprise Windows endpoints to eliminate client daemon attack vectors.',
    tag: 'Cybersecurity'
  },
  {
    step: '04',
    period: 'OPTIMIZATION & AGENTS',
    title: 'Autonomous Decision Systems & MILP',
    desc: 'Engineered autonomous agents combining 90-day Monte Carlo cash forecasts with scenario-constrained MILP optimization and plain-English narratives.',
    tag: 'Autonomous Systems'
  }
];

export const PALETTES = [
  {
    id: 'aubergine-sage',
    name: 'Aubergine & Soft Sage (Default)',
    colors: {
      '--color-lime': '#8FA89B',
      '--color-violet': '#B8A9C9',
      '--color-tangerine': '#6C8EA4',
      '--color-aubergine-border-hover': 'rgba(143, 168, 155, 0.4)'
    }
  },
  {
    id: 'aubergine-lavender',
    name: 'Aubergine & Muted Lavender',
    colors: {
      '--color-lime': '#B8A9C9',
      '--color-violet': '#6C8EA4',
      '--color-tangerine': '#8FA89B',
      '--color-aubergine-border-hover': 'rgba(184, 169, 201, 0.4)'
    }
  },
  {
    id: 'aubergine-dusty-blue',
    name: 'Aubergine & Dusty Blue',
    colors: {
      '--color-lime': '#6C8EA4',
      '--color-violet': '#B8A9C9',
      '--color-tangerine': '#8FA89B',
      '--color-aubergine-border-hover': 'rgba(108, 142, 164, 0.4)'
    }
  },
  {
    id: 'aubergine-plum',
    name: 'Aubergine & Restrained Plum',
    colors: {
      '--color-lime': '#8FA89B',
      '--color-violet': '#B37583',
      '--color-tangerine': '#6C8EA4',
      '--color-aubergine-border-hover': 'rgba(179, 117, 131, 0.4)'
    }
  }
];

export function getSkillsForProject(projectId) {
  const cleanId = projectId.replace(/^prj-/, '');
  return SKILLS.filter((s) => s.projectIds && s.projectIds.includes(cleanId));
}

export function getProjectsForSkill(skillId) {
  const skill = SKILLS.find((s) => s.id === skillId);
  if (!skill || !skill.projectIds) return [];
  return PROJECTS.filter((p) => skill.projectIds.includes(p.id));
}

export const CERTIFICATIONS = [
  {
    id: 'pytorch-spec',
    title: 'PyTorch Ultimate 2024 - From Basics to Cutting-Edge',
    platform: 'Coursera',
    issuer: 'Packt',
    category: 'coursera',
    discipline: 'ai',
    date: 'May 16, 2026',
    credentialId: 'VTCGQEZ4DMMV',
    verifyUrl: 'https://coursera.org/verify/specialization/VTCGQEZ4DMMV',
    fileUrl: './certs/pytorch-specialization-coursera.pdf',
    badge: 'Specialization (3 Courses)',
    highlight: true,
    desc: 'Comprehensive specialization covering PyTorch fundamentals, deep learning neural network architectures, CNNs, RNNs, and GANs with hands-on coding implementations.'
  },
  {
    id: 'pytorch-nn',
    title: 'Building and Training Neural Networks with PyTorch',
    platform: 'Coursera',
    issuer: 'Packt',
    category: 'coursera',
    discipline: 'ai',
    date: 'May 14, 2026',
    credentialId: 'CZUBDK9IM63E',
    verifyUrl: 'https://coursera.org/verify/CZUBDK9IM63E',
    fileUrl: './certs/pytorch-neural-networks-coursera.pdf',
    badge: 'Course Certificate',
    desc: 'Applied neural network architecture design, loss optimization, backpropagation dynamics, and evaluation workflows in PyTorch.'
  },
  {
    id: 'pytorch-adv',
    title: 'Advanced PyTorch Techniques and Applications',
    platform: 'Coursera',
    issuer: 'Packt',
    category: 'coursera',
    discipline: 'ai',
    date: 'May 16, 2026',
    credentialId: 'HR0NIDR3EHJM',
    verifyUrl: 'https://coursera.org/verify/HR0NIDR3EHJM',
    fileUrl: './certs/pytorch-advanced-coursera.pdf',
    badge: 'Course Certificate',
    desc: 'Advanced model architectures, custom loss functions, transfer learning pipelines, and production inference optimization.'
  },
  {
    id: 'pytorch-foundations',
    title: 'Foundations and Core Concepts of PyTorch',
    platform: 'Coursera',
    issuer: 'Packt',
    category: 'coursera',
    discipline: 'ai',
    date: 'May 14, 2026',
    credentialId: 'NAKO1OC3M76Q',
    verifyUrl: 'https://coursera.org/verify/NAKO1OC3M76Q',
    fileUrl: './certs/pytorch-foundations-coursera.pdf',
    badge: 'Course Certificate',
    desc: 'Tensor operations, autograd computational graphs, data loaders, and foundational GPU acceleration routines.'
  },
  {
    id: 'cloud-sec-skillup',
    title: 'Introduction to Cloud Security',
    platform: 'Simplilearn SkillUp',
    issuer: 'Simplilearn',
    category: 'skillup',
    discipline: 'security',
    date: '16th May 2025',
    credentialId: '1303770',
    verifyUrl: null,
    fileUrl: './certs/cloud-security-simplilearn-skillup.pdf',
    badge: 'SkillUp Certificate',
    highlight: true,
    desc: 'Principles of enterprise cloud security architecture, identity and access management (IAM), encryption at rest/transit, and cloud compliance frameworks.'
  },
  {
    id: 'rnn-infosys',
    title: 'Build & Train RNNs: Neural Network Components',
    platform: 'Infosys Springboard',
    issuer: 'Infosys Limited',
    category: 'industry',
    discipline: 'ai',
    date: 'September 26, 2025',
    credentialId: 'Issued: Oct 15, 2025',
    verifyUrl: 'https://verify.onwingspan.com',
    fileUrl: './certs/rnns-infosys-springboard.pdf',
    badge: 'Industry Credential',
    desc: 'Sequential data modeling, recurrent neural network hidden states, vanishing gradients, LSTM/GRU memory cell architectures, and time-series forecasting.'
  },
  {
    id: 'dbms-scaler',
    title: 'DBMS Course - Master the Fundamentals and Advanced Concepts',
    platform: 'Scaler Topics',
    issuer: 'Scaler',
    category: 'industry',
    discipline: 'data',
    date: '31 August 2025',
    credentialId: '74 Modules • 16 Challenges',
    verifyUrl: null,
    fileUrl: './certs/dbms-scaler-topics.pdf',
    badge: 'Excellence Certificate',
    desc: 'Relational database schema modeling, ER diagrams, complex SQL subqueries, B-tree indexing mechanics, ACID transaction guarantees, and normal forms (1NF–BCNF).'
  },
  {
    id: 'ibm-prog',
    title: 'Programming for Beginners: Hello World in 11 Languages',
    platform: 'CognitiveClass.ai / IBM SkillsNetwork',
    issuer: 'IBM SkillsNetwork',
    category: 'industry',
    discipline: 'programming',
    date: 'Course Progress: 100%',
    credentialId: 'GPXX0D58EN',
    verifyUrl: null,
    fileUrl: './certs/ibm-skillsnetwork-programming.png',
    badge: 'SkillsNetwork Course',
    desc: 'Multi-paradigm programming syntax foundations, compilation vs interpretation, execution environments, and procedural control flows across 11 programming languages.'
  }
];

export const RESUME_DATA = {
  name: 'Sahith M',
  headline: 'Artificial Intelligence & Data Science | B.Tech Undergraduate',
  location: 'Chennai, Tamil Nadu, India',
  email: 'sahithm2006@gmail.com',
  linkedin: 'https://linkedin.com/in/sahith-m-sahith518',
  github: 'https://github.com/SahithM2006',
  pdfUrl: './Sahith_M_Placement_Resume.pdf',
  pdfFilename: 'Sahith_M_Placement_Resume.pdf',
  education: {
    institution: 'Saveetha Engineering College (Autonomous)',
    degree: 'B.Tech in Artificial Intelligence and Data Science',
    period: '2024 – 2028',
    status: '3rd Year',
    cgpa: '7.5 / 10',
    schooling: [
      { standard: 'Class XII (Higher Secondary)', score: '80%' },
      { standard: 'Class X (Secondary School)', score: '85%' }
    ]
  },
  skills: {
    languages: ['Python', 'C', 'SQL'],
    aiData: ['Machine Learning', 'Deep Learning', 'Data Analysis', 'EDA', 'Feature Engineering'],
    libraries: ['PyTorch', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'OpenCV'],
    backendDev: ['FastAPI', 'REST APIs', 'PostgreSQL', 'Docker'],
    tools: ['Jupyter Notebook', 'Google Colab', 'Git', 'GitHub'],
    domains: ['Computer Vision', 'Generative AI', 'IoT', 'Cybersecurity']
  },
  projects: [
    {
      title: 'AEGIS-TWIN — Autonomous Digital Twin for Adversarial Path Simulation',
      domain: 'Cybersecurity • Digital Twin • Hackathon Prototype',
      points: [
        'Designed a cybersecurity-focused digital twin for modelling enterprise assets and simulating adversarial attack paths.',
        'Developed workflows to identify potential lateral-movement routes and support defensive decision-making.',
        'Architected and prototyped the solution as part of a national-level hackathon.'
      ]
    },
    {
      title: 'Mule Matrix — Intelligent Financial Fraud Detection & Money-Mule Network Tracing',
      domain: 'Financial Fraud Detection • Temporal Graph Intelligence • Analytical Prototype',
      points: [
        'Designed an analytical platform combining simulated programmable CBDC/e₹ transaction lineage with temporal graph intelligence to trace suspicious fund movements.',
        'Modelled multi-hop fund flows across intermediary accounts to identify layering schemes, rapid fan-out/fan-in dispersal, and potential cash-out points.',
        'Formulated explainable risk scoring with supporting transaction evidence, treating alerts as investigative risk indicators rather than conclusive verdicts.'
      ]
    },
    {
      title: 'Probe360 — Agentless Vulnerability Assessment Platform',
      domain: 'Cybersecurity • Vulnerability Assessment • Hackathon',
      points: [
        'Designed an agentless security platform for asset discovery, network-based vulnerability assessment, and centralized risk intelligence.',
        'Proposed continuous monitoring and AI-assisted deception capabilities to improve enterprise security visibility.',
        'Developed the solution architecture and prototype workflow as a hackathon project.'
      ]
    },
    {
      title: 'VisionTraffic AI — Intelligent Traffic Monitoring & Analytics',
      domain: 'Computer Vision • Machine Learning • Traffic Analytics',
      points: [
        'Developed a computer-vision based traffic monitoring prototype for vehicle detection and traffic analysis.',
        'Integrated concepts for vehicle counting, emergency-vehicle identification, accident detection, and traffic-density analysis.',
        'Designed the solution to support data-driven traffic monitoring and management.'
      ]
    },
    {
      title: 'AI Carbon Intelligence Platform — Sustainable Supply Chain',
      domain: 'Artificial Intelligence • Data Analysis • Sustainability',
      points: [
        'Designed an AI-driven decision-support platform for analysing carbon emissions across supply-chain operations.',
        'Proposed data-driven identification of emission hotspots and sustainability insights.',
        'Developed the solution concept as a hackathon-focused project for sustainable decision-making.'
      ]
    }
  ],
  achievements: [
    'Won 3rd Prize in the Software Category at a National-Level Hackathon.',
    'Shortlisted among the Top 15 teams in a competitive hackathon.',
    'Participated in National-Level Hackathons and developed AI/software prototypes under time constraints.'
  ],
  coursework: [
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Data Science',
    'Machine Learning',
    'Deep Learning',
    'Cloud Computing',
    'IoT',
    'Cybersecurity'
  ]
};

/**
 * Professional Experience Data Store
 * Structured vertical timeline schema for industry positions, internships, and research tenures.
 * Use only verified details; populate as real positions are confirmed.
 *
 * Example item schema:
 * {
 *   id: 'exp-1',
 *   role: 'AI / ML Engineering Intern',
 *   organization: 'Company or Lab Name',
 *   employmentType: 'Internship', // 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Research'
 *   location: 'Chennai, India / Remote',
 *   period: 'Jun 2025 – Aug 2025',
 *   duration: '3 mos',
 *   responsibilities: [
 *     'Engineered high-throughput machine learning inference pipelines...',
 *     'Implemented FastAPI microservices with strict schema validation...'
 *   ],
 *   skills: ['Python', 'FastAPI', 'PyTorch']
 * }
 */
export const EXPERIENCES = [];

export const CAREER_STATUS = {
  standing: 'B.Tech in Artificial Intelligence & Data Science (3rd Year)',
  institution: 'Saveetha Engineering College (Autonomous), Chennai',
  academicPeriod: '2024 – 2028',
  statusBadge: 'Pre-Professional • In Progress',
  cgpa: '7.5 / 10',
  currentFocus: 'Applied Deep Learning, Remote Systems Telemetry & Distributed Backends',
  targetRoles: [
    'AI & Machine Learning Engineer Intern',
    'Backend Developer (Python / FastAPI)',
    'Cybersecurity & Systems Analyst'
  ],
  availability: 'Summer & Fall 2025 / Placement Drive',
  location: 'Chennai, Tamil Nadu, India (Open to Remote / Relocation)',
  statement:
    'Currently completing undergraduate coursework and developing national-level hackathon prototypes (AEGIS-TWIN, Probe360, Mule Matrix). Actively seeking summer/fall technical internships and entry-level engineering roles. Verified corporate roles and technical positions will be indexed in this timeline as they commence.'
};


