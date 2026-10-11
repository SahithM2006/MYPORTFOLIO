/**
 * Sahith M. — Digital Playground Controller
 * Comprehensive creative interactions, live exhibits, and connected architecture.
 */

import {
  SKILLS,
  SKILL_CATEGORIES,
  PROJECTS,
  INTERESTS,
  TIMELINE_MILESTONES,
  PALETTES
} from './data-store.js';

export function initPlaygroundApp() {
  initScrollProgress();
  initFloatingNavigation();
  initHeroInteractions();
  initAboutInteractions();
  initSkillsPlayground();
  initProjectExhibits();
  initPlaygroundConsole();
  initContactActions();
  initFooterDiscovery();
  initMotionDesign();
}

/* ==========================================================================
   1. SCROLL PROGRESS
   ========================================================================== */
function initScrollProgress() {
  // Coordinated centrally within initMotionDesign() to ensure a single,
  // high-performance requestAnimationFrame scroll loop across the entire exhibition.
}

/* ==========================================================================
   2. FLOATING NAVIGATION & SCROLLSPY
   ========================================================================== */
function initFloatingNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('nav-mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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
      rootMargin: '-25% 0px -55% 0px',
      threshold: 0
    });

    sections.forEach((sec) => observer.observe(sec));
  }
}

/* ==========================================================================
   3. HERO INTERACTIONS (KINETIC TYPOGRAPHY, DRAGGABLE TOKENS, COMPASS HUD)
   ========================================================================== */
function initHeroInteractions() {
  // Kinetic Word Cycler
  const kineticWord = document.getElementById('kinetic-word');
  if (kineticWord) {
    const words = ['THINK', 'ADAPT', 'DISCOVER', 'PROTECT', 'ORCHESTRATE'];
    let wordIdx = 0;

    function cycleWord() {
      kineticWord.classList.add('word-transition');
      setTimeout(() => {
        wordIdx = (wordIdx + 1) % words.length;
        kineticWord.textContent = words[wordIdx];
        kineticWord.classList.remove('word-transition');
      }, 200);
    }

    kineticWord.addEventListener('click', cycleWord);
    // Auto-cycle periodically for a playful feel
    setInterval(cycleWord, 4200);
  }

  // Draggable Floating Hero Tokens
  const draggableTokens = document.querySelectorAll('.draggable-token');
  const btnResetTokens = document.getElementById('btn-reset-hero-tokens');

  draggableTokens.forEach((token) => {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      token.classList.add('is-dragging');
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      token.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      token.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      if (btnResetTokens) btnResetTokens.classList.add('visible');
    };

    const onPointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      token.classList.remove('is-dragging');
      token.releasePointerCapture(e.pointerId);
    };

    token.addEventListener('pointerdown', onPointerDown);
    token.addEventListener('pointermove', onPointerMove);
    token.addEventListener('pointerup', onPointerUp);
    token.addEventListener('pointercancel', onPointerUp);
  });

  if (btnResetTokens) {
    btnResetTokens.addEventListener('click', () => {
      draggableTokens.forEach((token) => {
        token.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        token.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          token.style.transition = '';
        }, 400);
      });
      btnResetTokens.classList.remove('visible');
    });
  }

  // Polar Coordinate HUD Compass (Reflects 360° gaze coordinates without touching canvas)
  const hudAngle = document.getElementById('hud-coord-angle');
  const hudRadius = document.getElementById('hud-coord-radius');
  const hudReticle = document.getElementById('hud-reticle');

  if (hudAngle && hudRadius) {
    let hudTicking = false;
    window.addEventListener('pointermove', (e) => {
      if (!hudTicking) {
        window.requestAnimationFrame(() => {
          const cx = window.innerWidth * 0.5;
          const cy = window.innerHeight * 0.5;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          let angleDeg = Math.round((Math.atan2(dy, dx) * 180) / Math.PI);
          if (angleDeg < 0) angleDeg += 360;
          const radius = Math.round(Math.hypot(dx, dy));

          hudAngle.textContent = `${angleDeg}°`;
          hudRadius.textContent = `${radius}px`;
          if (hudReticle) {
            hudReticle.style.transform = `rotate(${angleDeg}deg)`;
          }
          hudTicking = false;
        });
        hudTicking = true;
      }
    }, { passive: true });
  }

  // Easter Egg Modal Trigger
  const eggTrigger = document.getElementById('easter-egg-trigger');
  const eggModal = document.getElementById('easter-egg-modal');
  const eggClose = document.getElementById('easter-egg-close');

  if (eggTrigger && eggModal) {
    eggTrigger.addEventListener('click', () => {
      eggModal.classList.add('active');
    });
    if (eggClose) {
      eggClose.addEventListener('click', () => {
        eggModal.classList.remove('active');
      });
    }
    eggModal.addEventListener('click', (e) => {
      if (e.target === eggModal) eggModal.classList.remove('active');
    });
  }
}

/* ==========================================================================
   4. ABOUT INTERACTIVE EXPERIENCE & TECHNICAL DISCOVERY TRAIL
   ========================================================================== */
function initAboutInteractions() {
  const interestPills = document.querySelectorAll('.interest-pill');
  const tagEl = document.getElementById('interest-display-tag');
  const titleEl = document.getElementById('interest-display-title');
  const descEl = document.getElementById('interest-display-desc');
  const toolsEl = document.getElementById('interest-display-tools');
  const projectLink = document.getElementById('interest-display-project');

  interestPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      interestPills.forEach((p) => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');

      const key = pill.getAttribute('data-interest') || 'ai';
      const data = INTERESTS[key];
      if (data) {
        const spotlight = document.getElementById('interest-spotlight-display');
        if (spotlight) {
          spotlight.classList.add('spotlight-morphing');
          setTimeout(() => {
            if (tagEl) tagEl.innerHTML = data.tag;
            if (titleEl) titleEl.textContent = data.title;
            if (descEl) descEl.textContent = data.desc;
            if (toolsEl) toolsEl.innerHTML = data.tools;
            if (projectLink) {
              projectLink.textContent = data.projectName;
              projectLink.setAttribute('href', `#prj-${data.projectId}`);
            }
            spotlight.classList.remove('spotlight-morphing');
          }, 160);
        } else {
          if (tagEl) tagEl.innerHTML = data.tag;
          if (titleEl) titleEl.textContent = data.title;
          if (descEl) descEl.textContent = data.desc;
          if (toolsEl) toolsEl.innerHTML = data.tools;
          if (projectLink) {
            projectLink.textContent = data.projectName;
            projectLink.setAttribute('href', `#prj-${data.projectId}`);
          }
        }

        // Highlight connected skills in Skills section
        highlightConnectedSkills(data.relatedSkillIds);
      }
    });
  });

  // Interactive Focus Annotations
  const annotationBadges = document.querySelectorAll('.about-annotation-badge');
  const annotationBox = document.getElementById('annotation-detail-box');
  const ANNOTATION_DATA = {
    telemetry: '<strong>[TELEMETRY PIPELINE]</strong> Remote credentialed audit execution over TLS without persistent binary daemons. Built for zero-footprint endpoint monitoring.',
    interop: '<strong>[INTEROPERABILITY BUFFER]</strong> Ingestion schemas validated with Pydantic and transformed into FHIR R4 JSON-LD compliant bundles for hospital clearinghouses.',
    regression: '<strong>[EMISSIONS FORECASTING]</strong> Multi-variable supply chain regression models mapping energy, freight, and volume parameters to Scope 1, 2, and 3 reduction targets.'
  };

  annotationBadges.forEach((badge) => {
    badge.addEventListener('click', () => {
      annotationBadges.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      badge.classList.add('active');
      badge.setAttribute('aria-selected', 'true');

      const key = badge.getAttribute('data-annotation') || 'telemetry';
      if (annotationBox && ANNOTATION_DATA[key]) {
        annotationBox.innerHTML = ANNOTATION_DATA[key];
        annotationBox.classList.add('annotation-swapped');
        setTimeout(() => annotationBox.classList.remove('annotation-swapped'), 200);
      }
    });
  });

  // Timeline / Discovery Trail Milestones
  const trailNodes = document.querySelectorAll('.trail-node');
  const trailTitle = document.getElementById('trail-detail-title');
  const trailDesc = document.getElementById('trail-detail-desc');
  const trailTag = document.getElementById('trail-detail-tag');

  trailNodes.forEach((node, index) => {
    node.addEventListener('click', () => {
      trailNodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');

      const milestone = TIMELINE_MILESTONES[index];
      if (milestone) {
        if (trailTitle) trailTitle.textContent = milestone.title;
        if (trailDesc) trailDesc.textContent = milestone.desc;
        if (trailTag) trailTag.textContent = milestone.tag;
      }
    });
  });
}

function highlightConnectedSkills(skillIds = []) {
  const skillCards = document.querySelectorAll('.periodic-card');
  if (!skillCards.length) return;

  skillCards.forEach((card) => {
    const sId = card.getAttribute('data-skill');
    const isMatch = skillIds.includes(sId);
    card.classList.toggle('spotlight-pulse', isMatch);
  });

  setTimeout(() => {
    skillCards.forEach((card) => card.classList.remove('spotlight-pulse'));
  }, 2200);
}

/* ==========================================================================
   5. SKILL PLAYGROUND (PERIODIC TABLE CLUSTERS & LIVE FILTER)
   ========================================================================== */
function initSkillsPlayground() {
  const searchInput = document.getElementById('skill-search-input');
  const categoryTabs = document.querySelectorAll('.skill-filter-tab');
  const skillGrid = document.getElementById('periodic-table-grid');
  const btnReset = document.getElementById('btn-reset-skills');
  const drawerTag = document.getElementById('drawer-cat-name');
  const drawerTitle = document.getElementById('drawer-skill-name');
  const drawerDesc = document.getElementById('drawer-skill-desc');
  const drawerProjectLinks = document.getElementById('drawer-project-links');

  let activeCategory = 'all';
  let searchQuery = '';

  function renderSkills() {
    if (!skillGrid) return;
    const cards = skillGrid.querySelectorAll('.periodic-card');
    let visibleCount = 0;

    cards.forEach((card) => {
      const sId = card.getAttribute('data-skill');
      const cat = card.getAttribute('data-category');
      const title = card.getAttribute('data-title').toLowerCase();
      const symbol = card.getAttribute('data-symbol').toLowerCase();

      const matchesCat = activeCategory === 'all' || cat === activeCategory;
      const matchesSearch = !searchQuery || title.includes(searchQuery) || symbol.includes(searchQuery) || sId.includes(searchQuery);

      if (matchesCat && matchesSearch) {
        card.classList.remove('dimmed');
        card.style.display = '';
        card.classList.add('reorganizing');
        card.style.animationDelay = `${visibleCount * 22}ms`;
        visibleCount++;
      } else {
        card.classList.remove('reorganizing');
        card.classList.add('dimmed');
        if (searchQuery) {
          card.style.display = 'none';
        } else {
          card.style.display = '';
        }
      }
    });

    setTimeout(() => {
      cards.forEach((c) => c.classList.remove('reorganizing'));
    }, 450);

    const emptyMsg = document.getElementById('skills-empty-state');
    if (emptyMsg) {
      emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Live Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderSkills();
    });
  }

  // Category Filtering
  categoryTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-category') || 'all';
      renderSkills();
    });
  });

  // Reset Button
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      activeCategory = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      categoryTabs.forEach((t) => t.classList.toggle('active', t.getAttribute('data-category') === 'all'));
      renderSkills();
      selectSkill('python');
    });
  }

  // Select a skill and update context drawer
  function selectSkill(skillId) {
    const skill = SKILLS.find((s) => s.id === skillId);
    if (!skill) return;

    if (drawerTag) drawerTag.textContent = `${skill.category.toUpperCase()} • ${skill.symbol} [${skill.number}]`;
    if (drawerTitle) drawerTitle.textContent = skill.title;
    if (drawerDesc) drawerDesc.textContent = skill.desc;

    if (drawerProjectLinks) {
      drawerProjectLinks.innerHTML = skill.projectIds.map((pid) => {
        const proj = PROJECTS.find((p) => p.id === pid);
        const name = proj ? proj.title.split('—')[0].trim() : pid;
        return `<a href="#prj-${pid}" class="drawer-pill" data-project-ref="${pid}">${name}</a>`;
      }).join('');

      // Wire drawer pill hover to pulse related project card
      drawerProjectLinks.querySelectorAll('.drawer-pill').forEach((pill) => {
        pill.addEventListener('mouseenter', () => {
          const pref = pill.getAttribute('data-project-ref');
          highlightProjectCard(pref);
        });
      });
    }

    const cards = skillGrid ? skillGrid.querySelectorAll('.periodic-card') : [];
    cards.forEach((card) => {
      card.classList.toggle('active', card.getAttribute('data-skill') === skillId);
    });

    // Cross-highlight corresponding project cards in the project section
    highlightProjectsForSkill(skill.projectIds);
  }

  // Skill Card Click Handler
  if (skillGrid) {
    skillGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.periodic-card');
      if (card) {
        const sId = card.getAttribute('data-skill');
        if (sId) selectSkill(sId);
      }
    });
  }

  // Default selection
  selectSkill('python');
}

function highlightProjectsForSkill(projectIds = []) {
  const allCards = document.querySelectorAll('.project-card');
  allCards.forEach((card) => {
    const cId = card.id.replace('prj-', '');
    const isRelated = projectIds.includes(cId);
    card.classList.toggle('skill-connected-highlight', isRelated);
  });
}

function highlightProjectCard(projectId) {
  const card = document.getElementById(`prj-${projectId}`);
  if (!card) return;
  card.classList.add('pulse-border');
  setTimeout(() => card.classList.remove('pulse-border'), 1800);
}

/* ==========================================================================
   6. PROJECT EXHIBITS (DISTINCT VISUAL TREATMENT & BESPOKE INTERACTIVE LABS)
   ========================================================================= */
function initProjectExhibits() {
  // Category Filtering
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';
      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
      });

      if (typeof window.__recomputeScrollGeometry === 'function') {
        window.__recomputeScrollGeometry();
      }
    });
  });

  // Exhibition Gallery Stepper Node Click Navigation
  const stepperNodes = document.querySelectorAll('.stepper-node');
  stepperNodes.forEach((node) => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = node.getAttribute('data-project');
      const targetCard = targetId ? document.getElementById(targetId) : null;
      if (targetCard) {
        stepperNodes.forEach((n) => n.classList.remove('active'));
        node.classList.add('active');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // Inline Architecture Drawers
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
      if (textEl) textEl.textContent = willExpand ? 'Collapse System Breakdown' : 'Architecture & Technical Details';
      if (iconEl) iconEl.textContent = willExpand ? '−' : '+';

      if (typeof window.__recomputeScrollGeometry === 'function') {
        setTimeout(window.__recomputeScrollGeometry, 300);
      }
    });
  });

  // EXHIBIT 1: Probe360 WinRM Telemetry Inspector
  initProbe360Exhibit();

  // EXHIBIT 2: Healthbridge FHIR Transformation Sequence
  initHealthbridgeExhibit();

  // EXHIBIT 3: AI Carbon Intelligence Scenario Forecaster
  initCarbonExhibit();

  // EXHIBIT 4: Jarvis Desktop Assistant Safe Terminal Playground
  initJarvisTerminalExhibit();

  // EXHIBIT 5: DIP Real Client-Side Image Processing Canvas
  initDipCanvasExhibit();
}

/**
 * Exhibit 1: Probe360 WinRM Telemetry Inspector
 */
function initProbe360Exhibit() {
  const tabs = document.querySelectorAll('.probe-tab-btn');
  const displayBox = document.getElementById('probe-telemetry-output');
  if (!displayBox) return;

  const TELEMETRY_VIEWS = {
    discovery: `// [ILLUSTRATIVE WINRM PROBE: SECURE TLS 5986]
[+] TARGET: WIN-SRV-2022-EAST (10.0.4.12)
[+] AUTH: CredSSP / Kerberos Mutual Authenticated
[+] WMI QUERY: Get-CimInstance Win32_OperatingSystem
    Caption           : Microsoft Windows Server 2022 Datacenter
    BuildNumber       : 20348.2461
    Endpoint Daemons  : 0 (Pure Agentless Architecture)
[✓] Status: Connection verified. Zero endpoint footprint.`,

    packages: `// [SOFTWARE AUDIT VIA WMI / REGISTRY]
[+] QUERY: Win32_Product & Uninstall Registry Keys
    Package 1: OpenSSL 3.0.7-win64 -> Up to date
    Package 2: Python 3.11.8 (System) -> Managed
    Package 3: Win32-OpenSSH (Service) -> Hardened
[+] Unquoted Service Paths: Checked 48 services -> 0 vulnerabilities detected.
[✓] Status: Installed inventory fully cross-referenced.`,

    cve: `// [NATIONAL VULNERABILITY DATABASE BASELINE MATCH]
[+] CORRELATING: 142 detected software component hashes
[+] CVE CATALOG: CVE-2023-38545 (libcurl) -> Not Present
[+] CVE CATALOG: CVE-2024-21413 (Outlook Moniker) -> Patched (KB5034763)
[✓] RISK SCORE: 0.12 (Low / Hardened)
[✓] Status: Compliance baseline confirmed.`,

    honeypot: `// [PLANNED FEATURE: SUBNET DECOY ENGAGEMENT]
[!] ARCHITECTURAL ROADMAP SPECIFICATION:
    Node: Subnet Canary / Decoy Listener (Planned)
    Role: Passive port listener simulating SMB/RDP endpoints
    Objective: Detect lateral reconnaissance before production penetration
    Current Status: In active architecture design phase.`
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const view = tab.getAttribute('data-probe-view') || 'discovery';
      displayBox.textContent = TELEMETRY_VIEWS[view] || TELEMETRY_VIEWS.discovery;
    });
  });
}

/**
 * Exhibit 2: Healthbridge FHIR Transformation Sequence
 */
function initHealthbridgeExhibit() {
  const steps = document.querySelectorAll('.fhir-step-btn');
  const codeView = document.getElementById('fhir-pipeline-code');
  if (!codeView) return;

  const PIPELINE_STEPS = {
    raw: `// STAGE 1: RAW LEGACY HOSPITAL JSON (Ingestion Buffer)
{
  "hospital_code": "SEC_HOSP_08",
  "patient_ref": "PT-94821",
  "pt_full_name": "Arun Kumar",
  "dob": "1994-06-12",
  "diagnosis_code": "E11.9",
  "coverage_policy": "NHCX-POL-7718"
}`,

    pydantic: `// STAGE 2: STRICT PYDANTIC MODEL NORMALIZATION
class ClinicalClaimPayload(BaseModel):
    hospital_id: constr(regex=r"^SEC_HOSP_\\d{2}$")
    patient_uuid: UUID4
    diagnosis_icd10: str = Field(..., regex=r"^[A-Z]\\d{2}(\\.\\d+)?$")
    nhcx_policy: str
    timestamp_utc: datetime = Field(default_factory=datetime.utcnow)

# [✓] Validation Result: SUCCESS (0 Schema Violations)`,

    fhir: `// STAGE 3: HL7 FHIR R4 & NHCX COMPLIANT BUNDLE
{
  "resourceType": "Bundle",
  "type": "collection",
  "entry": [
    {
      "resource": {
        "resourceType": "Patient",
        "id": "e4a2d8e1-9f22",
        "name": [{ "family": "Kumar", "given": ["Arun"] }],
        "birthDate": "1994-06-12"
      }
    },
    {
      "resource": {
        "resourceType": "Condition",
        "code": { "coding": [{ "system": "http://hl7.org/fhir/sid/icd-10", "code": "E11.9" }] }
      }
    }
  ]
}`
  };

  steps.forEach((step) => {
    step.addEventListener('click', () => {
      steps.forEach((s) => s.classList.remove('active'));
      step.classList.add('active');

      const stage = step.getAttribute('data-stage') || 'raw';
      codeView.textContent = PIPELINE_STEPS[stage] || PIPELINE_STEPS.raw;
    });
  });
}

/**
 * Exhibit 3: AI Carbon Intelligence Scenario Forecaster
 */
function initCarbonExhibit() {
  const sliderDistance = document.getElementById('carbon-distance');
  const sliderRenewable = document.getElementById('carbon-renewable');
  const sliderVolume = document.getElementById('carbon-volume');

  const valDistance = document.getElementById('val-carbon-distance');
  const valRenewable = document.getElementById('val-carbon-renewable');
  const valVolume = document.getElementById('val-carbon-volume');

  const outScope1 = document.getElementById('metric-scope-1');
  const outScope2 = document.getElementById('metric-scope-2');
  const outScope3 = document.getElementById('metric-scope-3');
  const outTotal = document.getElementById('metric-total-co2');

  const barScope1 = document.getElementById('bar-scope-1');
  const barScope2 = document.getElementById('bar-scope-2');
  const barScope3 = document.getElementById('bar-scope-3');

  function calculateEmissions() {
    if (!sliderDistance || !sliderRenewable || !sliderVolume) return;

    const dist = parseFloat(sliderDistance.value) || 1200;
    const ren = parseFloat(sliderRenewable.value) || 30;
    const vol = parseFloat(sliderVolume.value) || 2500;

    if (valDistance) valDistance.textContent = `${dist} km`;
    if (valRenewable) valRenewable.textContent = `${ren}%`;
    if (valVolume) valVolume.textContent = `${vol} units`;

    // Illustrative regression model formula
    const s1 = Math.round((vol * 0.08) * 10) / 10;
    const s2 = Math.round(((vol * 0.06) * (1 - ren / 100)) * 10) / 10;
    const s3 = Math.round(((dist * 0.0018) * (vol * 0.015)) * 10) / 10;
    const total = Math.round((s1 + s2 + s3) * 10) / 10;

    if (outScope1) outScope1.textContent = `${s1} MT`;
    if (outScope2) outScope2.textContent = `${s2} MT`;
    if (outScope3) outScope3.textContent = `${s3} MT`;
    if (outTotal) outTotal.textContent = `${total} MT CO2e`;

    const maxExpected = 450;
    if (barScope1) barScope1.style.width = `${Math.min((s1 / maxExpected) * 100, 100)}%`;
    if (barScope2) barScope2.style.width = `${Math.min((s2 / maxExpected) * 100, 100)}%`;
    if (barScope3) barScope3.style.width = `${Math.min((s3 / maxExpected) * 100, 100)}%`;
  }

  [sliderDistance, sliderRenewable, sliderVolume].forEach((sl) => {
    if (sl) sl.addEventListener('input', calculateEmissions);
  });

  calculateEmissions();
}

/**
 * Exhibit 4: Jarvis Desktop Assistant Safe Terminal Playground
 */
function initJarvisTerminalExhibit() {
  const termBody = document.getElementById('jarvis-terminal-body');
  const termInput = document.getElementById('jarvis-terminal-input');
  const chips = document.querySelectorAll('.jarvis-cmd-chip');

  if (!termBody || !termInput) return;

  const SAFE_COMMANDS = {
    help: `Available commands:
  • status     : View active daemon state & telemetry
  • telemetry  : Sample CPU, RAM, and Disk metrics via psutil
  • specs      : Inspect background service architecture
  • skills     : View primary runtime dependencies
  • clear      : Clear console output`,

    status: `[JARVIS SERVICE STATE]
  • Service PID    : 8192 [Python 3.11 Subprocess]
  • State          : ACTIVE / LISTENING
  • IPC Socket     : NamedPipe //./pipe/jarvis_cmd
  • Hotkey Daemon  : Hooked [Alt + Space]
  • Gaze Link      : Synchronized with 360° Hero Canvas`,

    telemetry: `[LOCAL HARDWARE PROBE TELEMETRY]
  • CPU Load       : 14.2% across 8 cores [psutil.cpu_percent]
  • Memory Usage   : 4.8 GB / 16.0 GB (30%) [psutil.virtual_memory]
  • Disk Latency   : 1.2 ms [I/O Queue: Nominal]
  • Thermal State  : 41.5°C [Kernel Sensor Query]`,

    specs: `[SYSTEM ARCHITECTURE]
  • Core Runtime   : Python 3.11 + psutil + win32gui
  • Execution Model: Asyncio event loop with non-blocking worker threads
  • Security Model : Sandboxed command dispatcher with strict regex whitelist`,

    skills: `[ASSOCIATED SKILLSET]
  • Python • C Primitives • Windows APIs • OS Automation • psutil`
  };

  function executeCommand(cmdText) {
    const cleanCmd = cmdText.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      termBody.innerHTML = '';
      return;
    }

    const promptLine = document.createElement('div');
    promptLine.className = 'term-line term-prompt';
    promptLine.innerHTML = `<span class="term-user">jarvis@sec-lab:~$</span> <span class="term-cmd">${escapeHtml(cmdText)}</span>`;
    termBody.appendChild(promptLine);

    const responseLine = document.createElement('div');
    responseLine.className = 'term-line term-response';

    if (SAFE_COMMANDS[cleanCmd]) {
      responseLine.textContent = SAFE_COMMANDS[cleanCmd];
    } else {
      responseLine.innerHTML = `<span class="term-err">Command not recognized: "${escapeHtml(cmdText)}". Type "help" for safe commands.</span>`;
    }

    termBody.appendChild(responseLine);
    termBody.scrollTop = termBody.scrollHeight;
  }

  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value;
      termInput.value = '';
      executeCommand(val);
    }
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });
}

/**
 * Exhibit 5: DIP Real Client-Side Image Processing Canvas
 */
function initDipCanvasExhibit() {
  const canvas = document.getElementById('dip-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const filterBtns = document.querySelectorAll('.dip-filter-btn');
  const sliderBrightness = document.getElementById('dip-brightness');
  const sliderContrast = document.getElementById('dip-contrast');

  const baseImg = new Image();
  baseImg.src = './user_photo.jpg';

  let currentFilter = 'original';

  function applyDIPFilter() {
    if (!baseImg.complete) return;

    const w = 340;
    const h = 420;
    canvas.width = w;
    canvas.height = h;

    // Draw base image centered & cropped
    const aspectImg = baseImg.naturalWidth / baseImg.naturalHeight;
    const aspectCanvas = w / h;
    let sW, sH, sX, sY;

    if (aspectImg > aspectCanvas) {
      sH = baseImg.naturalHeight;
      sW = sH * aspectCanvas;
      sX = (baseImg.naturalWidth - sW) * 0.5;
      sY = 0;
    } else {
      sW = baseImg.naturalWidth;
      sH = sW / aspectCanvas;
      sX = 0;
      sY = (baseImg.naturalHeight - sH) * 0.3;
    }

    ctx.drawImage(baseImg, sX, sY, sW, sH, 0, 0, w, h);

    const bVal = parseFloat(sliderBrightness ? sliderBrightness.value : 0);
    const cVal = parseFloat(sliderContrast ? sliderContrast.value : 1);

    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;
    const len = d.length;

    // 1. Brightness & Contrast adjustment
    if (bVal !== 0 || cVal !== 1) {
      for (let i = 0; i < len; i += 4) {
        d[i] = Math.min(255, Math.max(0, (d[i] - 128) * cVal + 128 + bVal));
        d[i + 1] = Math.min(255, Math.max(0, (d[i + 1] - 128) * cVal + 128 + bVal));
        d[i + 2] = Math.min(255, Math.max(0, (d[i + 2] - 128) * cVal + 128 + bVal));
      }
    }

    // 2. Classical Image Processing Convolutions
    if (currentFilter === 'grayscale') {
      for (let i = 0; i < len; i += 4) {
        const y = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        d[i] = d[i + 1] = d[i + 2] = y;
      }
    } else if (currentFilter === 'threshold') {
      for (let i = 0; i < len; i += 4) {
        const y = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        const v = y > 128 ? 255 : 0;
        d[i] = d[i + 1] = d[i + 2] = v;
      }
    } else if (currentFilter === 'invert') {
      for (let i = 0; i < len; i += 4) {
        d[i] = 255 - d[i];
        d[i + 1] = 255 - d[i + 1];
        d[i + 2] = 255 - d[i + 2];
      }
    } else if (currentFilter === 'sobel') {
      // 3x3 Sobel Gradient Convolution
      const copy = new Uint8ClampedArray(d);
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = (y * w + x) * 4;
          // Grayscale neighboring pixels
          const getLuma = (px, py) => {
            const pIdx = (py * w + px) * 4;
            return 0.299 * copy[pIdx] + 0.587 * copy[pIdx + 1] + 0.114 * copy[pIdx + 2];
          };
          const gx =
            -1 * getLuma(x - 1, y - 1) + 1 * getLuma(x + 1, y - 1) +
            -2 * getLuma(x - 1, y)     + 2 * getLuma(x + 1, y) +
            -1 * getLuma(x - 1, y + 1) + 1 * getLuma(x + 1, y + 1);

          const gy =
            -1 * getLuma(x - 1, y - 1) - 2 * getLuma(x, y - 1) - 1 * getLuma(x + 1, y - 1) +
             1 * getLuma(x - 1, y + 1) + 2 * getLuma(x, y + 1) + 1 * getLuma(x + 1, y + 1);

          const mag = Math.min(255, Math.hypot(gx, gy));
          d[idx] = d[idx + 1] = d[idx + 2] = mag;
        }
      }
    } else if (currentFilter === 'sharpen') {
      // 3x3 Laplacian Sharpening Kernel
      const copy = new Uint8ClampedArray(d);
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = (y * w + x) * 4;
          for (let c = 0; c < 3; c++) {
            const val =
              -1 * copy[((y - 1) * w + x) * 4 + c] +
              -1 * copy[(y * w + (x - 1)) * 4 + c] +
               5 * copy[idx + c] +
              -1 * copy[(y * w + (x + 1)) * 4 + c] +
              -1 * copy[((y + 1) * w + x) * 4 + c];
            d[idx + c] = Math.min(255, Math.max(0, val));
          }
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }

  baseImg.onload = applyDIPFilter;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'original';
      applyDIPFilter();
    });
  });

  if (sliderBrightness) sliderBrightness.addEventListener('input', applyDIPFilter);
  if (sliderContrast) sliderContrast.addEventListener('input', applyDIPFilter);
}

/* ==========================================================================
   7. SIGNATURE INTERACTION: THE PLAYGROUND CONSOLE
   ========================================================================== */
function initPlaygroundConsole() {
  const labTabs = document.querySelectorAll('.lab-tab-btn');
  const labPanels = document.querySelectorAll('.lab-panel');

  labTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      labTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const targetId = tab.getAttribute('data-lab');
      labPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.id === targetId);
      });
    });
  });

  // LAB 1: COLOUR LAB
  initColourLab();

  // LAB 2: DATA PLAYGROUND
  initDataPlayground();

  // LAB 3: PIXEL LAB
  initPixelLab();

  // LAB 4: PATTERN LAB
  initPatternLab();
}

/**
 * Lab 1: Colour Lab
 */
function initColourLab() {
  const paletteBtns = document.querySelectorAll('.palette-preset-btn');
  const btnReset = document.getElementById('btn-reset-palette');

  paletteBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      paletteBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const palId = btn.getAttribute('data-palette');
      const pal = PALETTES.find((p) => p.id === palId);
      if (pal) {
        Object.entries(pal.colors).forEach(([cssVar, colorVal]) => {
          document.documentElement.style.setProperty(cssVar, colorVal);
        });
      }
    });
  });

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      const defaultPal = PALETTES[0];
      Object.entries(defaultPal.colors).forEach(([cssVar, colorVal]) => {
        document.documentElement.style.setProperty(cssVar, colorVal);
      });
      paletteBtns.forEach((b) => b.classList.toggle('active', b.getAttribute('data-palette') === defaultPal.id));
    });
  }
}

/**
 * Lab 2: Data Playground
 */
function initDataPlayground() {
  const sliderN = document.getElementById('data-slider-n');
  const sliderNoise = document.getElementById('data-slider-noise');
  const sliderFreq = document.getElementById('data-slider-freq');

  const svgChart = document.getElementById('data-playground-svg');
  const metricMean = document.getElementById('data-metric-mean');
  const metricVariance = document.getElementById('data-metric-variance');
  const metricPeak = document.getElementById('data-metric-peak');
  const btnReset = document.getElementById('btn-reset-data-lab');

  function updateDataChart() {
    if (!svgChart) return;
    const n = parseInt(sliderN ? sliderN.value : 40, 10);
    const noise = parseFloat(sliderNoise ? sliderNoise.value : 0.3);
    const freq = parseFloat(sliderFreq ? sliderFreq.value : 2.5);

    const width = 560;
    const height = 240;
    const padding = 30;

    let points = [];
    let sum = 0;
    let maxVal = -Infinity;

    for (let i = 0; i < n; i++) {
      const xNorm = i / (n - 1);
      const cleanY = Math.sin(xNorm * Math.PI * freq) * 0.4 + 0.5;
      const jitter = (Math.sin(i * 12.9898) * 0.5) * noise;
      const yNorm = Math.min(0.95, Math.max(0.05, cleanY + jitter));

      const cx = padding + xNorm * (width - padding * 2);
      const cy = height - padding - yNorm * (height - padding * 2);

      points.push({ cx, cy, yNorm });
      sum += yNorm;
      if (yNorm > maxVal) maxVal = yNorm;
    }

    const mean = sum / n;
    let varSum = 0;
    points.forEach((p) => {
      varSum += Math.pow(p.yNorm - mean, 2);
    });
    const variance = varSum / n;

    if (metricMean) metricMean.textContent = mean.toFixed(3);
    if (metricVariance) metricVariance.textContent = variance.toFixed(4);
    if (metricPeak) metricPeak.textContent = maxVal.toFixed(3);

    // Build SVG elements
    const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.cx.toFixed(1)} ${p.cy.toFixed(1)}`).join(' ');
    const circlesSvg = points.map((p) => `<circle cx="${p.cx.toFixed(1)}" cy="${p.cy.toFixed(1)}" r="3" fill="#C8FF4D" opacity="0.85" />`).join('');

    svgChart.innerHTML = `
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#C8FF4D" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#C8FF4D" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="rgba(185,168,216,0.2)" stroke-width="1" />
      <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="rgba(185,168,216,0.2)" stroke-width="1" />
      <path d="${pathD} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z" fill="url(#chartGrad)" />
      <path d="${pathD}" fill="none" stroke="#C8FF4D" stroke-width="2.5" />
      ${circlesSvg}
    `;
  }

  [sliderN, sliderNoise, sliderFreq].forEach((s) => {
    if (s) s.addEventListener('input', updateDataChart);
  });

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (sliderN) sliderN.value = 40;
      if (sliderNoise) sliderNoise.value = 0.3;
      if (sliderFreq) sliderFreq.value = 2.5;
      updateDataChart();
    });
  }

  updateDataChart();
}

/**
 * Lab 3: Pixel Lab
 */
function initPixelLab() {
  const canvas = document.getElementById('pixel-lab-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const sliderPixel = document.getElementById('pixel-slider-size');
  const sliderShift = document.getElementById('pixel-slider-shift');
  const btnReset = document.getElementById('btn-reset-pixel-lab');

  const labImg = new Image();
  labImg.src = './user_photo.jpg';

  function renderPixelLab() {
    if (!labImg.complete) return;
    const w = 460;
    const h = 260;
    canvas.width = w;
    canvas.height = h;

    const pixelSize = parseInt(sliderPixel ? sliderPixel.value : 8, 10);
    const shift = parseInt(sliderShift ? sliderShift.value : 0, 10);

    // Draw downscaled to offscreen canvas then scale up for pixelation effect
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    const scaleW = Math.max(1, Math.round(w / pixelSize));
    const scaleH = Math.max(1, Math.round(h / pixelSize));

    tempCanvas.width = scaleW;
    tempCanvas.height = scaleH;

    tempCtx.drawImage(labImg, 0, 0, labImg.naturalWidth, labImg.naturalHeight * 0.7, 0, 0, scaleW, scaleH);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, scaleW, scaleH, 0, 0, w, h);

    // Chromatic Aberration channel shift if shift > 0
    if (shift > 0) {
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      const copy = new Uint8ClampedArray(d);

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;
          const redX = Math.min(w - 1, x + shift);
          const blueX = Math.max(0, x - shift);

          const rIdx = (y * w + redX) * 4;
          const bIdx = (y * w + blueX) * 4;

          d[idx] = copy[rIdx];         // Red shifted right
          d[idx + 2] = copy[bIdx + 2]; // Blue shifted left
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }
  }

  labImg.onload = renderPixelLab;

  if (sliderPixel) sliderPixel.addEventListener('input', renderPixelLab);
  if (sliderShift) sliderShift.addEventListener('input', renderPixelLab);

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (sliderPixel) sliderPixel.value = 6;
      if (sliderShift) sliderShift.value = 4;
      renderPixelLab();
    });
  }
}

/**
 * Lab 4: Pattern Lab (Generative Abstract Algorithmic Canvas)
 */
function initPatternLab() {
  const canvas = document.getElementById('pattern-lab-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const sliderDensity = document.getElementById('pattern-slider-density');
  const sliderRotation = document.getElementById('pattern-slider-rotation');
  const sliderFolds = document.getElementById('pattern-slider-folds');
  const btnReset = document.getElementById('btn-reset-pattern-lab');

  function renderPattern() {
    const w = 460;
    const h = 260;
    canvas.width = w;
    canvas.height = h;

    const density = parseInt(sliderDensity ? sliderDensity.value : 16, 10);
    const rotation = (parseFloat(sliderRotation ? sliderRotation.value : 45) * Math.PI) / 180;
    const folds = parseInt(sliderFolds ? sliderFolds.value : 6, 10);

    ctx.fillStyle = '#160B1F';
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.translate(w * 0.5, h * 0.5);

    for (let f = 0; f < folds; f++) {
      ctx.save();
      ctx.rotate((f * 2 * Math.PI) / folds);

      for (let r = 1; r <= density; r++) {
        const radius = (r / density) * (Math.min(w, h) * 0.44);
        ctx.beginPath();
        ctx.arc(radius * 0.5, 0, radius * 0.4, 0, Math.PI * 2);
        ctx.strokeStyle = r % 2 === 0 ? 'rgba(200, 255, 77, 0.4)' : 'rgba(129, 87, 255, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.rotate(rotation * 0.05);
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.restore();
  }

  if (sliderDensity) sliderDensity.addEventListener('input', renderPattern);
  if (sliderRotation) sliderRotation.addEventListener('input', renderPattern);
  if (sliderFolds) sliderFolds.addEventListener('input', renderPattern);

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (sliderDensity) sliderDensity.value = 16;
      if (sliderRotation) sliderRotation.value = 45;
      if (sliderFolds) sliderFolds.value = 6;
      renderPattern();
    });
  }

  renderPattern();
}



/* ==========================================================================
   9. CONTACT ACTIONS & FORM DISPATCH
   ========================================================================== */
function initContactActions() {
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const emailAddress = document.getElementById('email-address');
  const copyFeedback = document.getElementById('copy-feedback');
  const contactForm = document.getElementById('contact-form');

  if (btnCopyEmail && emailAddress) {
    btnCopyEmail.addEventListener('click', () => {
      const email = emailAddress.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        btnCopyEmail.classList.add('copied');
        if (copyFeedback) copyFeedback.textContent = '✓ Copied to clipboard!';
        setTimeout(() => {
          btnCopyEmail.classList.remove('copied');
          if (copyFeedback) copyFeedback.textContent = '';
        }, 3000);
      }).catch(() => {
        if (copyFeedback) copyFeedback.textContent = 'Email: sahith.developer.sec@gmail.com';
      });
    });
  }

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
        if (nameErr) nameErr.textContent = 'Please enter your name.';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        if (emailErr) emailErr.textContent = 'Please enter a valid email.';
        isValid = false;
      }

      if (!msgInput.value.trim() || msgInput.value.trim().length < 8) {
        if (msgErr) msgErr.textContent = 'Message should have at least 8 characters.';
        isValid = false;
      }

      if (isValid) {
        const name = encodeURIComponent(nameInput.value.trim());
        const email = encodeURIComponent(emailInput.value.trim());
        const message = encodeURIComponent(msgInput.value.trim());

        const mailtoUrl = `mailto:sahith.developer.sec@gmail.com?subject=Portfolio%20Inquiry%20from%20${name}&body=Sender:%20${name}%0D%0AEmail:%20${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Opening your email client...';
        }

        setTimeout(() => {
          window.location.href = mailtoUrl;
          contactForm.reset();
        }, 400);
      }
    });
  }

  const btnScrollTop = document.getElementById('btn-scroll-top');
  if (btnScrollTop) {
    btnScrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   10. FOOTER DISCOVERY BEACON
   ========================================================================== */
function initFooterDiscovery() {
  const beacon = document.getElementById('footer-status-beacon');
  if (beacon) {
    beacon.addEventListener('click', () => {
      beacon.classList.add('beacon-pulsing');
      const beaconMsg = document.getElementById('beacon-msg');
      if (beaconMsg) {
        beaconMsg.textContent = '✦ Telemetry OK • 60 FPS • 0 Tracking Cookies • Clean Build';
      }
      setTimeout(() => {
        beacon.classList.remove('beacon-pulsing');
      }, 4000);
    });
  }
}

/* ==========================================================================
   11. EXPERIMENTAL MOTION DESIGN SYSTEM & UNIFIED SCROLL EXHIBITION ENGINE
   ========================================================================== */
function initMotionDesign() {
  // 1. Hero Entrance Sequence
  const heroContainer = document.querySelector('.hero-typography');
  if (heroContainer) {
    requestAnimationFrame(() => {
      heroContainer.classList.add('hero-revealed');
    });
  }

  // 2. DOM Elements for Continuous Scroll Dynamics
  const progressBar = document.getElementById('scroll-progress-bar');
  const spineThumb = document.getElementById('scroll-spine-thumb');
  const spineLabel = document.getElementById('scroll-spine-label');
  const auraOrbit1 = document.querySelector('.aura-orbit-1');
  const auraOrbit2 = document.querySelector('.aura-orbit-2');

  const heroSec = document.getElementById('hero');
  const aboutSec = document.getElementById('about');
  const skillsSec = document.getElementById('skills');
  const projectsSec = document.getElementById('projects');
  const playgroundSec = document.getElementById('playground');
  const contactSec = document.getElementById('contact');

  const projectColorMap = {
    'prj-probe360': '#00e5ff',
    'prj-healthbridge': '#10b981',
    'prj-carbon': '#f59e0b',
    'prj-jarvis': '#a855f7',
    'prj-dip': '#ec4899'
  };

  // Cached Geometry Store to prevent DOM thrashing inside the scroll tick
  let cachedGeometry = {
    winH: window.innerHeight || 800,
    docH: 5000,
    hero: { top: 0, height: 800 },
    about: { top: 900, height: 1000 },
    skills: { top: 2000, height: 1000 },
    projects: { top: 3100, height: 1800 },
    playground: { top: 5000, height: 1200 },
    contact: { top: 6300, height: 700 },
    cards: []
  };

  function updateGeometry() {
    const winH = window.innerHeight || 800;
    const docScrollH = (document.documentElement.scrollHeight || 6000) - winH;
    cachedGeometry.winH = winH;
    cachedGeometry.docH = docScrollH > 0 ? docScrollH : 1;

    const getMetrics = (el) => {
      if (!el) return { top: 0, height: 1 };
      const rect = el.getBoundingClientRect();
      const top = rect.top + (window.scrollY || window.pageYOffset || 0);
      return { top, height: rect.height || el.offsetHeight || 1 };
    };

    cachedGeometry.hero = getMetrics(heroSec);
    cachedGeometry.about = getMetrics(aboutSec);
    cachedGeometry.skills = getMetrics(skillsSec);
    cachedGeometry.projects = getMetrics(projectsSec);
    cachedGeometry.playground = getMetrics(playgroundSec);
    cachedGeometry.contact = getMetrics(contactSec);

    const projectCards = document.querySelectorAll('.project-card');
    cachedGeometry.cards = Array.from(projectCards).map((card) => {
      const rect = card.getBoundingClientRect();
      const top = rect.top + (window.scrollY || window.pageYOffset || 0);
      return {
        id: card.id,
        el: card,
        top,
        height: rect.height || card.offsetHeight || 1,
        color: projectColorMap[card.id] || '#c8ff4d'
      };
    });
  }

  window.__recomputeScrollGeometry = updateGeometry;

  let scrollTicking = false;
  let lastActiveCardId = null;
  let lastChapter = null;

  function onScrollTick() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const scrollH = cachedGeometry.docH;
    const progress = Math.min(Math.max(scrollTop / scrollH, 0), 1);

    // 1. Top Global Scroll Progress Bar
    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    // 2. Fixed Left Exhibition Spine Thumb
    if (spineThumb) {
      spineThumb.style.transform = `translate(-50%, ${progress * 156}px)`;
    }

    // 3. Hero Ambient Orbit Rotations
    if (auraOrbit1) {
      auraOrbit1.style.transform = `rotate(${progress * 360}deg)`;
    }
    if (auraOrbit2) {
      auraOrbit2.style.transform = `rotate(-${progress * 260}deg)`;
    }

    // 4. Section Scroll-Relative Progress for CSS Transformation
    const winH = cachedGeometry.winH;
    const clamp01 = (v) => Math.min(Math.max(v, 0), 1);

    const heroProgress = clamp01(scrollTop / (cachedGeometry.hero.height || 1));
    const aboutProgress = clamp01((scrollTop - cachedGeometry.about.top + winH * 0.45) / (cachedGeometry.about.height || 1));
    const skillsProgress = clamp01((scrollTop - cachedGeometry.skills.top + winH * 0.45) / (cachedGeometry.skills.height || 1));
    const projectsProgress = clamp01((scrollTop - cachedGeometry.projects.top + winH * 0.45) / (cachedGeometry.projects.height || 1));
    const contactProgress = clamp01((scrollTop - cachedGeometry.contact.top + winH * 0.6) / (cachedGeometry.contact.height || 1));

    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--scroll-progress', progress.toFixed(4));
    rootStyle.setProperty('--hero-scroll', heroProgress.toFixed(4));
    rootStyle.setProperty('--about-scroll', aboutProgress.toFixed(4));
    rootStyle.setProperty('--skills-scroll', skillsProgress.toFixed(4));
    rootStyle.setProperty('--projects-scroll', projectsProgress.toFixed(4));
    rootStyle.setProperty('--contact-scroll', contactProgress.toFixed(4));

    // 5. Active Exhibition Chapter Badge on Left Spine
    const focusY = scrollTop + winH * 0.45;
    let currentChapter = '01 HERO';
    let chapterColor = '#c8ff4d';

    if (focusY >= cachedGeometry.contact.top - 140) {
      currentChapter = '06 FINALE';
      chapterColor = '#c8ff4d';
    } else if (focusY >= cachedGeometry.playground.top - 120) {
      currentChapter = '05 LABS';
      chapterColor = '#fb7185';
    } else if (focusY >= cachedGeometry.projects.top - 120) {
      currentChapter = '04 EXHIBITS';
      chapterColor = lastActiveCardId ? (projectColorMap[lastActiveCardId] || '#00e5ff') : '#00e5ff';
    } else if (focusY >= cachedGeometry.skills.top - 120) {
      currentChapter = '03 SKILLS';
      chapterColor = '#8157ff';
    } else if (focusY >= cachedGeometry.about.top - 120) {
      currentChapter = '02 ESSAY';
      chapterColor = '#ff8a45';
    }

    if (spineLabel && currentChapter !== lastChapter) {
      spineLabel.textContent = currentChapter;
      spineLabel.style.color = chapterColor;
      if (spineThumb) spineThumb.style.background = chapterColor;
      lastChapter = currentChapter;
    }

    // 6. Active Project Spotlight Tracking in Exhibition
    if (cachedGeometry.cards.length > 0 && focusY >= cachedGeometry.projects.top - 200 && focusY <= cachedGeometry.playground.top) {
      let closestCard = null;
      let minDistance = Infinity;

      for (let i = 0; i < cachedGeometry.cards.length; i++) {
        const c = cachedGeometry.cards[i];
        if (c.el.style.display === 'none') continue;
        const cardCenter = c.top + c.height * 0.35;
        const dist = Math.abs(focusY - cardCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestCard = c;
        }
      }

      if (closestCard && closestCard.id !== lastActiveCardId) {
        lastActiveCardId = closestCard.id;
        rootStyle.setProperty('--active-project-color', closestCard.color);

        cachedGeometry.cards.forEach((c) => {
          c.el.classList.toggle('active-spotlight', c.id === closestCard.id);
        });

        const stepperNodes = document.querySelectorAll('.stepper-node');
        stepperNodes.forEach((node) => {
          const match = node.getAttribute('data-project') === closestCard.id;
          node.classList.toggle('active', match);
          node.setAttribute('aria-current', match ? 'true' : 'false');
        });

        if (spineLabel && currentChapter === '04 EXHIBITS') {
          spineLabel.style.color = closestCard.color;
          if (spineThumb) spineThumb.style.background = closestCard.color;
        }
      }
    }

    scrollTicking = false;
  }

  // Single Window Listeners for Resize and Scroll
  window.addEventListener('resize', () => {
    updateGeometry();
  }, { passive: true });

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(onScrollTick);
      scrollTicking = true;
    }
  }, { passive: true });

  // Initial Layout Measurement and First Frame Calculation
  requestAnimationFrame(() => {
    updateGeometry();
    onScrollTick();
  });

  // 3. Section and Exhibition Intersection Observer
  const observedElements = document.querySelectorAll(
    '.about-section, .skills-section, .projects-section, .playground-section, .contact-section, .section-bridge, .project-card'
  );

  if ('IntersectionObserver' in window && observedElements.length) {
    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    observedElements.forEach((el) => motionObserver.observe(el));
  } else {
    observedElements.forEach((el) => el.classList.add('is-in-view'));
  }

  // 4. Project Card Restrained 3D Tilt
  initProjectCardTilts();
}

/**
 * Restrained 3D Perspective Tilt on Pointer Move for Project Cards
 */
function initProjectCardTilts() {
  if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    let ticking = false;

    const onPointerMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) / (rect.width / 2);
          const dy = (e.clientY - cy) / (rect.height / 2);

          const rotX = -dy * 3.2; // max 3.2 deg tilt
          const rotY = dx * 3.2;

          card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.006, 1.006, 1.006)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    const onPointerLeave = () => {
      card.style.transform = '';
    };

    card.addEventListener('pointermove', onPointerMove, { passive: true });
    card.addEventListener('pointerleave', onPointerLeave, { passive: true });
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}
