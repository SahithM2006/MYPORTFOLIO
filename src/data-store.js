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
      title: 'HealthBridge AI — Healthcare Data Interoperability Platform',
      domain: 'Healthcare AI • Data Interoperability • Prototype',
      points: [
        'Developed a prototype interoperability platform for transforming and validating heterogeneous clinical data.',
        'Applied FHIR-aligned structures and structured validation to support standardized healthcare data exchange.',
        'Designed AI-assisted processing workflows to improve interoperability between healthcare systems.'
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


