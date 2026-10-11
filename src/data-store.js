/**
 * Sahith M. — Digital Playground Data Store
 * Central source of truth for skills, projects, interest domains, and interactive exhibits.
 */

export const SKILL_CATEGORIES = [
  { id: 'all', label: 'All Disciplines', count: 18 },
  { id: 'ai', label: 'AI & Data Science', count: 6, color: '#C8FF4D' },
  { id: 'programming', label: 'Programming', count: 2, color: '#FF8A45' },
  { id: 'backend', label: 'Backend Development', count: 3, color: '#38BDF8' },
  { id: 'security', label: 'Security & Systems', count: 4, color: '#10B981' },
  { id: 'automation', label: 'Automation & Graphs', count: 3, color: '#8157FF' }
];

export const SKILLS = [
  {
    id: 'python',
    symbol: 'Py',
    number: '01',
    category: 'ai',
    title: 'Python',
    desc: 'Primary language for high-throughput backend services, remote telemetry collection via WinRM, automated OS interaction, and Scikit-learn/OpenCV scientific pipelines.',
    projectIds: ['probe360', 'healthbridge', 'carbon', 'aegis']
  },
  {
    id: 'numpy',
    symbol: 'Np',
    number: '02',
    category: 'ai',
    title: 'NumPy',
    desc: 'High-performance N-dimensional array processing powering pixel matrix convolutions, Fourier frequency transforms, and mathematical vector calculations.',
    projectIds: ['carbon']
  },
  {
    id: 'pandas',
    symbol: 'Pd',
    number: '03',
    category: 'ai',
    title: 'Pandas',
    desc: 'Data wrangling engine for cleaning high-dimensional time-series emissions data, evaluating feature correlations, and transforming clinical record matrices.',
    projectIds: ['carbon', 'healthbridge']
  },
  {
    id: 'matplotlib',
    symbol: 'Plt',
    number: '04',
    category: 'ai',
    title: 'Matplotlib',
    desc: 'Statistical chart plotting for enterprise emissions confidence intervals, image histograms, and spatial frequency spectrums.',
    projectIds: ['carbon']
  },
  {
    id: 'scikit-learn',
    symbol: 'Sk',
    number: '05',
    category: 'ai',
    title: 'Scikit-learn',
    desc: 'Statistical learning toolkit used for supervised regression modeling, cross-validated carbon emission curve projections, and predictive feature scaling.',
    projectIds: ['carbon']
  },
  {
    id: 'opencv',
    symbol: 'Cv',
    number: '06',
    category: 'ai',
    title: 'OpenCV',
    desc: 'Computer vision framework implementing Sobel differential gradients, Laplacian sharpening, Canny edge detection, and Otsu morphological segmentation.',
    projectIds: ['carbon']
  },
  {
    id: 'c',
    symbol: 'C',
    number: '07',
    category: 'programming',
    title: 'C',
    desc: 'Procedural fundamentals, memory pointers, low-level data structures, and algorithmic logic underlying operating systems architecture.',
    projectIds: []
  },
  {
    id: 'sql',
    symbol: 'Sql',
    number: '08',
    category: 'programming',
    title: 'SQL',
    desc: 'Declarative queries, relational schema design, indexing strategies, and transactional data integrity for clinical and enterprise record storage.',
    projectIds: ['healthbridge']
  },
  {
    id: 'fastapi',
    symbol: 'Fa',
    number: '09',
    category: 'backend',
    title: 'FastAPI',
    desc: 'High-throughput asynchronous Python web framework providing typed REST endpoints and automatic OpenAPI documentation.',
    projectIds: ['healthbridge', 'aegis']
  },
  {
    id: 'rest-apis',
    symbol: 'Api',
    number: '10',
    category: 'backend',
    title: 'REST APIs',
    desc: 'Stateless HTTP service design, structured error payloads, JSON serialization, and status code discipline.',
    projectIds: ['healthbridge', 'aegis']
  },
  {
    id: 'pydantic',
    symbol: 'Pyd',
    number: '11',
    category: 'backend',
    title: 'Pydantic',
    desc: 'Strict runtime data validation and serialization ensuring clinical records conform to HL7 FHIR specifications.',
    projectIds: ['healthbridge']
  },
  {
    id: 'winrm',
    symbol: 'Wrm',
    number: '12',
    category: 'security',
    title: 'WinRM Telemetry',
    desc: 'Windows Remote Management protocol for credentialed remote asset discovery, hardware querying, and patch audits without persistent client daemons.',
    projectIds: ['probe360']
  },
  {
    id: 'windows-admin',
    symbol: 'Win',
    number: '13',
    category: 'security',
    title: 'Windows Administration',
    desc: 'Registry management, PowerShell execution policies, system service control, and security event log inspection.',
    projectIds: ['probe360']
  },
  {
    id: 'vuln-assessment',
    symbol: 'Vuln',
    number: '14',
    category: 'security',
    title: 'Vulnerability Assessment',
    desc: 'Auditing remote unquoted service paths, CVE/CVSS threat baseline correlation, and multi-hop attack path risk modeling.',
    projectIds: ['probe360', 'aegis']
  },
  {
    id: 'networkx',
    symbol: 'Nx',
    number: '15',
    category: 'automation',
    title: 'NetworkX Graph Modeling',
    desc: 'Complex network topology graphing, directed adversarial path exploration, betweenness centrality, and lateral-movement graph simulation.',
    projectIds: ['aegis']
  },
  {
    id: 'mitre-attack',
    symbol: 'Atk',
    number: '16',
    category: 'security',
    title: 'MITRE ATT&CK',
    desc: 'Adversarial tactic and technique taxonomy mapping across Initial Access, Lateral Movement, Privilege Escalation, and Defense Evasion.',
    projectIds: ['aegis']
  },
  {
    id: 'workflow-automation',
    symbol: 'Wfl',
    number: '17',
    category: 'automation',
    title: 'Workflow Automation',
    desc: 'End-to-end data pipeline automation, schema harmonization queues, and event-driven trigger architectures.',
    projectIds: ['healthbridge', 'probe360', 'aegis']
  },
  {
    id: 'git',
    symbol: 'Git',
    number: '18',
    category: 'automation',
    title: 'Git & GitHub',
    desc: 'Version control branch workflows, atomic commits, repository documentation, and CI/CD automation foundations.',
    projectIds: ['probe360', 'aegis', 'healthbridge', 'carbon']
  }
];

export const PROJECTS = [
  {
    id: 'probe360',
    number: '01',
    category: 'security',
    categoryLabel: 'Cybersecurity Platform',
    title: 'Probe360 — Agentless Security Platform',
    themeColor: '#10B981',
    status: 'Prototype • Implemented',
    statusType: 'implemented',
    lead: 'Agentless Windows asset discovery, remote credential verification, software inventorying, and vulnerability-baseline checks designed to eliminate persistent daemon footprint vulnerabilities on endpoints.',
    implementedSpec: 'WinRM remote authenticated query pipeline (HTTPS/5986), installed software WMI inventory, and automated CVE baseline cross-referencing.',
    plannedSpec: 'Subnet honeypot decoy engagement nodes and automated behavioral anomaly scoring.',
    skills: ['python', 'winrm', 'windows-admin', 'vuln-assessment', 'workflow-automation', 'git'],
    architecture: 'Probe360 coordinates credentialed, TLS-encrypted WinRM sessions into target Windows endpoints without deploying intrusive binary daemons. It queries CIM/WMI classes for installed MSI packages, checks registry run-keys for insecure binary paths, audits service permission DACLs, and maps findings to national vulnerability databases.'
  },
  {
    id: 'healthbridge',
    number: '02',
    category: 'backend',
    categoryLabel: 'Healthcare Interoperability',
    title: 'Healthbridge EHR',
    themeColor: '#38BDF8',
    status: 'Architecture Concept',
    statusType: 'concept',
    lead: 'Healthcare interoperability and schema transformation architecture aligning fragmented hospital electronic records with HL7 FHIR standards and India\'s NHCX-aligned workflows.',
    implementedSpec: 'Standards Harmonization converting unstructured clinical payloads into FHIR R4 Patient and Claim bundles with strict Pydantic runtime validation.',
    plannedSpec: 'Direct ABDM health repository connector and zero-knowledge claim verification audit trail.',
    skills: ['fastapi', 'rest-apis', 'pydantic', 'sql', 'workflow-automation', 'git'],
    architecture: 'Acts as a high-integrity transformation buffer between hospital management systems and regulatory clearinghouses. Ingestion endpoints parse legacy schemas into strictly validated Pydantic models, convert them to standard FHIR R4 JSON-LD representations, and prepare signed packages for the National Health Claims Exchange (NHCX).'
  },
  {
    id: 'carbon',
    number: '03',
    category: 'ai',
    categoryLabel: 'Sustainability Analytics',
    title: 'AI Carbon Intelligence',
    themeColor: '#C8FF4D',
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
    themeColor: '#00F5D4',
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
    tag: 'DOMAIN // MACHINE LEARNING & MODELS',
    title: 'Predictive Intelligence & Vision Pipelines',
    desc: 'Developing multivariate regression algorithms for supply-chain forecasting, multidimensional array operations with NumPy/Pandas, and mathematical spatial convolutions with OpenCV.',
    tools: 'Python • Scikit-learn • OpenCV • Pandas • NumPy',
    projectId: 'carbon',
    projectName: 'AI Carbon Intelligence →',
    relatedSkillIds: ['python', 'numpy', 'pandas', 'scikit-learn', 'opencv']
  },
  security: {
    tag: 'DOMAIN // AGENTLESS TELEMETRY & AUDITING',
    title: 'Remote Vulnerability & Asset Discovery',
    desc: 'Executing credentialed discovery over WinRM, auditing Windows registries, and mapping installed packages to national vulnerability baselines without installing client daemons.',
    tools: 'WinRM • Python • Windows Administration • CVE DBs',
    projectId: 'probe360',
    projectName: 'Probe360 Platform →',
    relatedSkillIds: ['winrm', 'windows-admin', 'vuln-assessment', 'python']
  },
  automation: {
    tag: 'DOMAIN // ADVERSARIAL SIMULATION & DIGITAL TWINS',
    title: 'Autonomous Digital Twin & Risk Orchestration',
    desc: 'Simulating multi-hop adversarial attack paths with NetworkX, identifying lateral-movement risks across enterprise assets, and orchestrating optimal defensive remediations.',
    tools: 'Python • NetworkX • FastAPI • MITRE ATT&CK • CVSS',
    projectId: 'aegis',
    projectName: 'AEGIS-TWIN Digital Twin →',
    relatedSkillIds: ['networkx', 'python', 'mitre-attack', 'fastapi']
  },
  software: {
    tag: 'DOMAIN // HIGH-THROUGHPUT BACKENDS & APIS',
    title: 'Interoperability Gateways & Microservices',
    desc: 'Designing asynchronous FastAPI microservices with strict Pydantic runtime schema validation conforming to HL7 FHIR standards and NHCX protocols.',
    tools: 'FastAPI • Pydantic • SQL • HL7 FHIR • REST APIs',
    projectId: 'healthbridge',
    projectName: 'Healthbridge EHR →',
    relatedSkillIds: ['fastapi', 'rest-apis', 'pydantic', 'sql']
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
    period: 'INTEROPERABILITY',
    title: 'Typed Microservices & Clinical Standards',
    desc: 'Architected async FastAPI pipelines with strict Pydantic models converting heterogeneous payloads to HL7 FHIR and NHCX specs.',
    tag: 'Software Engineering'
  }
];

export const PALETTES = [
  {
    id: 'aubergine-lime',
    name: 'Aubergine & Lime (Original)',
    colors: {
      '--color-lime': '#C8FF4D',
      '--color-violet': '#8157FF',
      '--color-tangerine': '#FF8A45',
      '--color-aubergine-border-hover': 'rgba(200, 255, 77, 0.4)'
    }
  },
  {
    id: 'cyberpunk-cyan',
    name: 'Cyberpunk Midnight & Cyan',
    colors: {
      '--color-lime': '#00F5D4',
      '--color-violet': '#7B2CBF',
      '--color-tangerine': '#F72585',
      '--color-aubergine-border-hover': 'rgba(0, 245, 212, 0.45)'
    }
  },
  {
    id: 'editorial-coral',
    name: 'Warm Plum & Sunset Coral',
    colors: {
      '--color-lime': '#FF6B6B',
      '--color-violet': '#9D4EDD',
      '--color-tangerine': '#FFD166',
      '--color-aubergine-border-hover': 'rgba(255, 107, 107, 0.45)'
    }
  },
  {
    id: 'bio-emerald',
    name: 'Deep Forest & Bio-Emerald',
    colors: {
      '--color-lime': '#10B981',
      '--color-violet': '#6366F1',
      '--color-tangerine': '#F59E0B',
      '--color-aubergine-border-hover': 'rgba(16, 185, 129, 0.45)'
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

