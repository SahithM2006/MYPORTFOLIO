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
    coords: { x: 370, y: 190 },
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
    coords: { x: 370, y: 410 },
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
    coords: { x: 680, y: 180 },
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
    coords: { x: 830, y: 140 },
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
    coords: { x: 660, y: 310 },
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
    coords: { x: 790, y: 270 },
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
    coords: { x: 850, y: 390 },
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
    coords: { x: 340, y: 290 },
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
    coords: { x: 200, y: 240 },
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
    coords: { x: 190, y: 360 },
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
    coords: { x: 220, y: 480 },
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
    coords: { x: 350, y: 520 },
    connections: ['winrm', 'vuln-assessment', 'mitre-attack', 'c'],
    title: 'Windows Administration',
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
    coords: { x: 240, y: 120 },
    connections: ['winrm', 'windows-admin', 'mitre-attack', 'networkx'],
    title: 'Vulnerability Assessment',
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
    coords: { x: 380, y: 80 },
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
    coords: { x: 520, y: 120 },
    connections: ['python', 'vuln-assessment', 'mitre-attack'],
    title: 'NetworkX Graph Modeling',
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
    coords: { x: 500, y: 490 },
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
    coords: { x: 640, y: 450 },
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
    title: 'Probe360 — Agentless Security Platform',
    themeColor: '#8fa89b',
    status: 'Prototype • Implemented',
    statusType: 'implemented',
    lead: 'Agentless Windows asset discovery, remote credential verification, software inventorying, and vulnerability-baseline checks designed to eliminate persistent daemon footprint vulnerabilities on endpoints.',
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
    title: 'Mule Matrix — Intelligent Financial Fraud Detection & Money-Mule Network Tracing',
    themeColor: '#2dd4a7',
    status: 'Analytical Prototype • Graph Intelligence',
    statusType: 'concept',
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
    title: 'AI Carbon Intelligence',
    themeColor: '#b8a9c9',
    status: 'Research Concept',
    statusType: 'concept',
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
    title: 'AEGIS-TWIN — Autonomous Digital Twin for Adversarial Path Simulation & Optimal Defense Orchestration',
    themeColor: '#8fa89b',
    status: 'Hackathon Prototype • Shortlisted',
    statusType: 'concept',
    lead: 'A cybersecurity digital twin developed for the VIT Vellore national-level hackathon (shortlisted for the next round). Models enterprise network assets, simulates adversarial attack paths, identifies lateral-movement risks, and prioritizes defensive actions based on risk reduction.',
    implementedSpec: 'NetworkX directed graph topology modeling, MITRE ATT&CK technique mapping, CVSS-weighted risk scoring, and dynamic attack path simulation via FastAPI.',
    plannedSpec: 'Real-time telemetry graph ingestion from live firewalls and reinforcement learning for automated adaptive countermeasure deployment.',
    skills: ['python', 'networkx', 'fastapi', 'mitre-attack', 'vuln-assessment', 'git'],
    architecture: 'Models enterprise network infrastructure as a weighted directed graph using NetworkX. Ingests vulnerability inventories (CVE/CVSS) and maps viable exploit chains against MITRE ATT&CK tactics (Initial Access → Lateral Movement → Credential Dumping). Employs graph centrality heuristics to evaluate minimum-cut defense strategies, computing optimal firewall and isolation policies that maximize risk reduction while minimizing operational downtime, followed by automated graph re-simulation. Shortlisted for the next round at the VIT Vellore national-level hackathon as an advanced proof-of-concept prototype.'
  }
];

export const INTERESTS = {
  ai: {
    tag: 'Machine Learning & Models',
    title: 'Predictive Intelligence & Vision Pipelines',
    desc: 'Developing multivariate regression algorithms for supply-chain forecasting, multidimensional array operations with NumPy/Pandas, and mathematical spatial convolutions with OpenCV.',
    tools: 'Python • Scikit-learn • OpenCV • Pandas • NumPy',
    projectId: 'carbon',
    projectName: 'AI Carbon Intelligence →',
    relatedSkillIds: ['python', 'numpy', 'pandas', 'scikit-learn', 'opencv']
  },
  security: {
    tag: 'Agentless Security & Auditing',
    title: 'Remote Vulnerability & Asset Discovery',
    desc: 'Executing credentialed discovery over WinRM, auditing Windows registries, and mapping installed packages to national vulnerability baselines without installing client daemons.',
    tools: 'WinRM • Python • Windows Administration • CVE DBs',
    projectId: 'probe360',
    projectName: 'Probe360 Platform →',
    relatedSkillIds: ['winrm', 'windows-admin', 'vuln-assessment', 'python']
  },
  automation: {
    tag: 'Adversarial Simulation & Digital Twins',
    title: 'Autonomous Digital Twin & Risk Orchestration',
    desc: 'Simulating multi-hop adversarial attack paths with NetworkX, identifying lateral-movement risks across enterprise assets, and orchestrating optimal defensive remediations.',
    tools: 'Python • NetworkX • FastAPI • MITRE ATT&CK • CVSS',
    projectId: 'aegis',
    projectName: 'AEGIS-TWIN Digital Twin →',
    relatedSkillIds: ['networkx', 'python', 'mitre-attack', 'fastapi']
  },
  software: {
    tag: 'Financial Graph Intelligence & Fraud Analytics',
    title: 'Financial Graph Intelligence & Mule Network Tracing',
    desc: 'Combining simulated programmable CBDC/e₹ transaction lineage with temporal graph intelligence to trace suspicious multi-hop fund movements, identify money-mule networks, and highlight potential cash-out points.',
    tools: 'Python • NetworkX • NumPy • Pydantic • SQL',
    projectId: 'mule-matrix',
    projectName: 'Mule Matrix — Fraud & Mule Tracing →',
    relatedSkillIds: ['python', 'networkx', 'numpy', 'pydantic', 'sql']
  }
};

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
    fileUrl: '/certs/pytorch-specialization-coursera.pdf',
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
    fileUrl: '/certs/pytorch-neural-networks-coursera.pdf',
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
    fileUrl: '/certs/pytorch-advanced-coursera.pdf',
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
    fileUrl: '/certs/pytorch-foundations-coursera.pdf',
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
    fileUrl: '/certs/cloud-security-simplilearn-skillup.pdf',
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
    fileUrl: '/certs/rnns-infosys-springboard.pdf',
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
    fileUrl: '/certs/dbms-scaler-topics.pdf',
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
    fileUrl: '/certs/ibm-skillsnetwork-programming.png',
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
  pdfUrl: '/Sahith_M_Placement_Resume.pdf',
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


