/**
 * Enhancements Module — Sahith M Portfolio Redesign 2.0
 * Lightweight, high-performance interactions:
 * 1. Minimal floating navigation with active-section IntersectionObserver spy & mobile menu.
 * 2. About section interactive domain spotlight tabs.
 * 3. Magazine-style skills inventory with contextual inspection drawer.
 * 4. Project inline architecture drawer expand/collapse.
 * 5. 1-click email copy with visual feedback & validated contact form.
 * 6. Subtle context-aware accent cursor.
 * 7. Back-to-top smooth scrolling.
 */

// Skill data for interactive context drawer
const SKILL_DETAILS = {
  'python': {
    category: 'AI & DATA &bull; CORE LANGUAGE',
    title: 'Python',
    desc: 'Primary language for high-throughput backend services, remote systems telemetry collection via WinRM, automated OS interaction, and Scikit-learn/OpenCV scientific pipelines.',
    projects: [
      { name: 'Probe360', id: 'prj-probe360' },
      { name: 'CSI Origin', id: 'prj-csi-origin' },
      { name: 'AI Carbon Intelligence', id: 'prj-carbon' },
      { name: 'AEGIS-TWIN Digital Twin', id: 'prj-aegis' },
      { name: 'DIP Experiments', id: 'prj-dip' }
    ]
  },
  'numpy': {
    category: 'AI & DATA &bull; SCIENTIFIC COMPUTING',
    title: 'NumPy',
    desc: 'High-performance N-dimensional array processing powering pixel matrix convolutions, Fourier frequency transforms, and mathematical vector calculations.',
    projects: [
      { name: 'AI Carbon Intelligence', id: 'prj-carbon' },
      { name: 'DIP Experiments', id: 'prj-dip' }
    ]
  },
  'pandas': {
    category: 'AI & DATA &bull; DATA MANIPULATION',
    title: 'Pandas',
    desc: 'Data wrangling engine for cleaning high-dimensional time-series emissions data, evaluating feature correlations, and transforming clinical record matrices.',
    projects: [
      { name: 'AI Carbon Intelligence', id: 'prj-carbon' }
    ]
  },
  'matplotlib': {
    category: 'AI & DATA &bull; VISUALIZATION',
    title: 'Matplotlib',
    desc: 'Statistical chart plotting for enterprise emissions confidence intervals, image histograms, and spatial frequency spectrums.',
    projects: [
      { name: 'AI Carbon Intelligence', id: 'prj-carbon' },
      { name: 'DIP Experiments', id: 'prj-dip' }
    ]
  },
  'scikit-learn': {
    category: 'AI & DATA &bull; MACHINE LEARNING',
    title: 'Scikit-learn',
    desc: 'Statistical learning toolkit used for supervised regression modeling, cross-validated carbon emission curve projections, and predictive feature scaling.',
    projects: [
      { name: 'AI Carbon Intelligence', id: 'prj-carbon' }
    ]
  },
  'opencv': {
    category: 'AI & DATA &bull; COMPUTER VISION',
    title: 'OpenCV',
    desc: 'Computer vision framework implementing Sobel differential gradients, Laplacian sharpening, Canny edge detection, and Otsu morphological segmentation.',
    projects: [
      { name: 'DIP Experiments', id: 'prj-dip' }
    ]
  },
  'c': {
    category: 'PROGRAMMING &bull; SYSTEMS PRIMITIVES',
    title: 'C',
    desc: 'Procedural fundamentals, memory pointers, low-level data structures, and algorithmic logic underlying operating systems architecture.',
    projects: []
  },
  'sql': {
    category: 'PROGRAMMING &bull; RELATIONAL DATABASES',
    title: 'SQL',
    desc: 'Declarative queries, relational schema design, indexing strategies, and transactional data integrity across Postgres financial ledgers and system stores.',
    projects: [
      { name: 'CSI Origin', id: 'prj-csi-origin' }
    ]
  },
  'fastapi': {
    category: 'BACKEND &bull; ASYNC SERVICES',
    title: 'FastAPI',
    desc: 'High-throughput asynchronous Python web framework providing typed REST endpoints and automatic OpenAPI documentation.',
    projects: [
      { name: 'CSI Origin', id: 'prj-csi-origin' }
    ]
  },
  'rest-apis': {
    category: 'BACKEND &bull; ARCHITECTURE',
    title: 'REST APIs',
    desc: 'Stateless HTTP service design, structured error payloads, JSON serialization, and status code discipline.',
    projects: [
      { name: 'CSI Origin', id: 'prj-csi-origin' }
    ]
  },
  'pydantic': {
    category: 'BACKEND &bull; SCHEMA VALIDATION',
    title: 'Pydantic',
    desc: 'Strict runtime data validation, frozen Pydantic contracts, and serialization boundaries between autonomous optimization engines and APIs.',
    projects: [
      { name: 'CSI Origin', id: 'prj-csi-origin' }
    ]
  },
  'winrm': {
    category: 'SECURITY & SYSTEMS &bull; TELEMETRY',
    title: 'WinRM Telemetry',
    desc: 'Windows Remote Management protocol for credentialed remote asset discovery, hardware querying, and patch audits without persistent client daemons.',
    projects: [
      { name: 'Probe360', id: 'prj-probe360' }
    ]
  },
  'windows-admin': {
    category: 'SECURITY & SYSTEMS &bull; ADMINISTRATION',
    title: 'Windows Administration',
    desc: 'Registry management, PowerShell execution policies, system service control, and security event log inspection.',
    projects: [
      { name: 'Probe360', id: 'prj-probe360' }
    ]
  },
  'vuln-assessment': {
    category: 'SECURITY & SYSTEMS &bull; AUDITING',
    title: 'Vulnerability Assessment',
    desc: 'Auditing remote unquoted service paths, missing security patches, and comparing installed package versions to CVE catalogs.',
    projects: [
      { name: 'Probe360', id: 'prj-probe360' }
    ]
  },
  'os-automation': {
    category: 'AUTOMATION &bull; SYSTEM WORKFLOWS',
    title: 'OS Automation',
    desc: 'System event dispatching, desktop window manipulation, background process cleanup, and automated administrative routines.',
    projects: [
      { name: 'AEGIS-TWIN Digital Twin', id: 'prj-aegis' },
      { name: 'Probe360', id: 'prj-probe360' }
    ]
  },
  'scripting': {
    category: 'AUTOMATION &bull; SHELL & PYTHON',
    title: 'Scripting',
    desc: 'Cross-platform task orchestration, automated telemetry parsing, and unattended command dispatch scripts.',
    projects: []
  },
  'workflow-automation': {
    category: 'AUTOMATION &bull; INTEROPERABILITY',
    title: 'Workflow Automation',
    desc: 'End-to-end data pipeline automation, schema harmonization queues, and event-driven trigger architectures.',
    projects: [
      { name: 'CSI Origin', id: 'prj-csi-origin' },
      { name: 'Probe360', id: 'prj-probe360' }
    ]
  }
};

// Domain data for About section interactive tabs
const INTEREST_DATA = {
  'ai': {
    tag: 'DOMAIN // MACHINE LEARNING &amp; MODELS',
    title: 'Predictive Intelligence & Vision Pipelines',
    desc: 'Developing multivariate regression algorithms for supply-chain forecasting, multidimensional array operations with NumPy/Pandas, and mathematical spatial convolutions with OpenCV.',
    tools: 'Python &bull; Scikit-learn &bull; OpenCV &bull; Pandas',
    projectText: 'AI Carbon Intelligence &rarr;',
    projectId: '#prj-carbon'
  },
  'security': {
    tag: 'DOMAIN // AGENTLESS TELEMETRY &amp; AUDITING',
    title: 'Remote Vulnerability & Asset Discovery',
    desc: 'Executing credentialed discovery over WinRM, auditing Windows registries, and mapping installed packages to national vulnerability baselines without installing client daemons.',
    tools: 'WinRM &bull; Python &bull; Windows Administration &bull; CVE DBs',
    projectText: 'Probe360 Platform &rarr;',
    projectId: '#prj-probe360'
  },
  'automation': {
    tag: 'DOMAIN // ADVERSARIAL SIMULATION &amp; DIGITAL TWINS',
    title: 'Autonomous Digital Twin & Risk Orchestration',
    desc: 'Simulating multi-hop adversarial attack paths with NetworkX, identifying lateral-movement risks across enterprise assets, and orchestrating optimal defensive remediations.',
    tools: 'Python &bull; NetworkX &bull; FastAPI &bull; MITRE ATT&CK &bull; CVSS',
    projectText: 'AEGIS-TWIN Digital Twin &rarr;',
    projectId: '#prj-aegis'
  },
  'software': {
    tag: 'DOMAIN // AUTONOMOUS AGENTS &amp; TREASURY OPTIMIZATION',
    title: 'Constrained Optimization & Decision Systems',
    desc: 'Engineering autonomous decision systems pairing 90-day Monte Carlo cash simulations with scenario MILP optimization and numerically grounded plain-English explanations.',
    tools: 'Python &bull; FastAPI &bull; PuLP (MILP) &bull; NumPy',
    projectText: 'CSI Origin Treasury Agent &rarr;',
    projectId: '#prj-csi-origin'
  }
};

export function initEnhancements() {
  initScrollProgress();
  initFloatingNavigation();
  initAboutInterests();
  initSkillsInventory();
  initProjectsExpand();
  initContactActions();
  initSubtleCursor();
  initBackToTop();
}

/**
 * 1. Scroll Progress Bar
 */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;
        bar.style.transform = `scaleX(${progress})`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * 2. Minimal Floating Navigation & Scrollspy
 */
function initFloatingNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('nav-mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  // Mobile menu toggle
  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when link clicked
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section spy using IntersectionObserver
  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          navLinks.forEach((link) => {
            const targetSection = link.getAttribute('data-section');
            const isMatch = targetSection === currentId;
            link.classList.toggle('active', isMatch);
            link.setAttribute('aria-current', isMatch ? 'true' : 'false');
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach((sec) => observer.observe(sec));
  }
}

/**
 * 3. About Section Interactive Focus Tabs
 */
function initAboutInterests() {
  const pills = document.querySelectorAll('.interest-pill');
  const tagEl = document.getElementById('interest-display-tag');
  const titleEl = document.getElementById('interest-display-title');
  const descEl = document.getElementById('interest-display-desc');
  const toolsEl = document.getElementById('interest-display-tools');
  const projectLink = document.getElementById('interest-display-project');

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const key = pill.getAttribute('data-interest') || 'ai';
      const data = INTEREST_DATA[key];
      if (data) {
        if (tagEl) tagEl.innerHTML = data.tag;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (toolsEl) toolsEl.innerHTML = data.tools;
        if (projectLink) {
          projectLink.textContent = data.projectText.replace('&rarr;', '→');
          projectLink.setAttribute('href', data.projectId);
        }
      }
    });
  });
}

/**
 * 4. Magazine Skills Index & Context Inspector
 */
function initSkillsInventory() {
  const skillTags = document.querySelectorAll('.skill-tag');
  const drawerTag = document.getElementById('drawer-cat-name');
  const drawerSkillTitle = document.getElementById('drawer-skill-name');
  const drawerSkillDesc = document.getElementById('drawer-skill-desc');
  const drawerProjectLinks = document.getElementById('drawer-project-links');

  function updateSkillDrawer(skillKey) {
    const data = SKILL_DETAILS[skillKey] || {
      category: 'TECHNICAL CAPABILITY',
      title: skillKey.toUpperCase(),
      desc: 'Applied technical toolset in modern systems development.',
      projects: [{ name: 'Selected Works', id: '#projects' }]
    };

    if (drawerTag) drawerTag.innerHTML = data.category;
    if (drawerSkillTitle) drawerSkillTitle.textContent = data.title;
    if (drawerSkillDesc) drawerSkillDesc.textContent = data.desc;

    if (drawerProjectLinks) {
      drawerProjectLinks.innerHTML = data.projects.map((p) => {
        return `<a href="#${p.id}" class="drawer-pill">${p.name}</a>`;
      }).join('');
    }

    skillTags.forEach((tag) => {
      const match = tag.getAttribute('data-skill') === skillKey;
      tag.classList.toggle('active', match);
    });
  }

  skillTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      const skillKey = tag.getAttribute('data-skill');
      if (skillKey) {
        updateSkillDrawer(skillKey);
      }
    });
  });
}

/**
 * 5. Projects Inline Architecture Drawers
 */
function initProjectsExpand() {
  const expandBtns = document.querySelectorAll('.btn-project-expand');

  expandBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const drawer = targetId ? document.getElementById(targetId) : null;
      if (!drawer) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const willExpand = !isExpanded;

      btn.setAttribute('aria-expanded', willExpand ? 'true' : 'false');
      drawer.classList.toggle('open', willExpand);

      const textEl = btn.querySelector('.btn-text');
      const iconEl = btn.querySelector('.btn-icon');

      if (textEl) {
        textEl.textContent = willExpand ? 'Hide Architecture Breakdown' : 'Architecture & Technical Details';
      }
      if (iconEl) {
        iconEl.textContent = willExpand ? '−' : '+';
      }
    });
  });
}

/**
 * 6. Contact Actions & Form Validation
 */
function initContactActions() {
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const emailAddress = document.getElementById('email-address');
  const copyFeedback = document.getElementById('copy-feedback');
  const contactForm = document.getElementById('contact-form');

  // 1-Click Copy Email
  if (btnCopyEmail && emailAddress) {
    btnCopyEmail.addEventListener('click', () => {
      const email = emailAddress.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        btnCopyEmail.classList.add('copied');
        if (copyFeedback) copyFeedback.textContent = '✓ Copied sahith.developer.sec@gmail.com to clipboard!';
        setTimeout(() => {
          btnCopyEmail.classList.remove('copied');
          if (copyFeedback) copyFeedback.textContent = '';
        }, 3000);
      }).catch(() => {
        if (copyFeedback) copyFeedback.textContent = 'Email: sahith.developer.sec@gmail.com';
      });
    });
  }

  // Message Form Validation & Mailto Fallback
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const msgInput = document.getElementById('form-message');
      const formStatus = document.getElementById('form-status');

      const nameErr = document.getElementById('form-name-error');
      const emailErr = document.getElementById('form-email-error');
      const msgErr = document.getElementById('form-message-error');

      if (nameErr) nameErr.textContent = '';
      if (emailErr) emailErr.textContent = '';
      if (msgErr) msgErr.textContent = '';
      if (formStatus) formStatus.textContent = '';

      let isValid = true;

      if (!nameInput.value.trim()) {
        if (nameErr) nameErr.textContent = 'Please provide your name.';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        if (emailErr) emailErr.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (!msgInput.value.trim() || msgInput.value.trim().length < 8) {
        if (msgErr) msgErr.textContent = 'Please write a message with at least 8 characters.';
        isValid = false;
      }

      if (isValid) {
        const name = encodeURIComponent(nameInput.value.trim());
        const email = encodeURIComponent(emailInput.value.trim());
        const message = encodeURIComponent(msgInput.value.trim());

        const mailtoUrl = `mailto:sahith.developer.sec@gmail.com?subject=Portfolio%20Inquiry%20from%20${name}&body=Sender:%20${name}%0D%0AEmail:%20${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Opening your email client to dispatch message...';
        }

        setTimeout(() => {
          window.location.href = mailtoUrl;
          contactForm.reset();
        }, 400);
      }
    });
  }
}

/**
 * 7. Subtle Context Cursor
 */
function initSubtleCursor() {
  const cursorRing = document.getElementById('cursor-ring');
  if (!cursorRing || !window.matchMedia('(pointer: fine)').matches) return;

  const hoverTargets = document.querySelectorAll('a, button, .skill-tag, .interest-pill');

  hoverTargets.forEach((el) => {
    el.addEventListener('pointerenter', () => {
      cursorRing.classList.add('cursor-ring-active');
    }, { passive: true });

    el.addEventListener('pointerleave', () => {
      cursorRing.classList.remove('cursor-ring-active');
    }, { passive: true });
  });
}

/**
 * 8. Back to Top Button
 */
function initBackToTop() {
  const btnScrollTop = document.getElementById('btn-scroll-top');
  if (btnScrollTop) {
    btnScrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
