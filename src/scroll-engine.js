/**
 * Sahith M. — Unified Scroll Exhibition Engine & Chapter Navigator
 * Single RAF loop with cached geometries, plus GSAP ScrollTrigger enhancements.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectColorMap = {
  'prj-probe360': '#7596C8',
  'prj-mule-matrix': '#C6A45A',
  'prj-csi-origin': '#C6A45A',
  'prj-carbon': '#7596C8',
  'prj-aegis': '#C6A45A'
};

export function initScrollEngine() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const auraOrbit1 = document.querySelector('.aura-orbit-1');
  const auraOrbit2 = document.querySelector('.aura-orbit-2');

  const heroSec = document.getElementById('hero');
  const aboutSec = document.getElementById('about');
  const skillsSec = document.getElementById('skills');
  const projectsSec = document.getElementById('projects');
  const archSec = document.getElementById('architecture');
  const expSec = document.getElementById('experience');
  const certSec = document.getElementById('certifications');
  const resumeSec = document.getElementById('resume');
  const contactSec = document.getElementById('contact');

  let cachedGeometry = {
    winH: window.innerHeight || 800,
    docH: 5000,
    hero: { top: 0, height: 800 },
    about: { top: 900, height: 1000 },
    skills: { top: 2000, height: 1000 },
    projects: { top: 3100, height: 1800 },
    architecture: { top: 4400, height: 1600 },
    experience: { top: 6000, height: 1000 },
    certifications: { top: 7500, height: 1200 },
    resume: { top: 8700, height: 1200 },
    contact: { top: 9900, height: 800 },
    cards: []
  };

  function updateGeometry() {
    const winH = window.innerHeight || 800;
    const docScrollH = (document.documentElement.scrollHeight || 5000) - winH;
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
    cachedGeometry.architecture = getMetrics(archSec);
    cachedGeometry.experience = getMetrics(expSec);
    cachedGeometry.certifications = getMetrics(certSec);
    cachedGeometry.resume = getMetrics(resumeSec);
    cachedGeometry.contact = getMetrics(contactSec);

    const projectCards = document.querySelectorAll('.project-narrative-entry, .project-card');
    cachedGeometry.cards = Array.from(projectCards).map((card) => {
      const rect = card.getBoundingClientRect();
      const top = rect.top + (window.scrollY || window.pageYOffset || 0);
      return {
        id: card.id,
        el: card,
        top,
        height: rect.height || card.offsetHeight || 1,
        color: projectColorMap[card.id] || '#C6A45A'
      };
    });
  }

  window.__recomputeScrollGeometry = updateGeometry;

  let scrollTicking = false;
  let lastActiveCardId = null;
  const spineTrack = document.getElementById('scroll-spine-track');
  const spineThumb = document.getElementById('scroll-spine-thumb');
  const spineLabel = document.getElementById('scroll-spine-label');
  const bgLayerDeep = document.getElementById('bg-layer-deep');
  const bgLayerMid = document.getElementById('bg-layer-mid');
  const bgLayerNear = document.getElementById('bg-layer-near');
  const atmosphereLayer = document.getElementById('ambient-atmosphere-layer');

  let lastChapter = null;

  function onScrollTick() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const scrollH = cachedGeometry.docH;
    const progress = Math.min(Math.max(scrollTop / scrollH, 0), 1);

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    // Export real-time scroll metrics to CSS variables
    document.documentElement.style.setProperty('--scroll-y', `${scrollTop}px`);
    document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));

    if (auraOrbit1) {
      auraOrbit1.style.transform = `rotate(${progress * 360}deg)`;
    }
    if (auraOrbit2) {
      auraOrbit2.style.transform = `rotate(-${progress * 260}deg)`;
    }

    // Continuous Multi-Layer Ambient Background Parallax
    if (bgLayerDeep) {
      bgLayerDeep.style.transform = `translate3d(0, ${-(scrollTop * 0.05).toFixed(2)}px, 0)`;
    }
    if (bgLayerMid) {
      bgLayerMid.style.transform = `translate3d(0, ${-(scrollTop * 0.12).toFixed(2)}px, 0)`;
    }
    if (bgLayerNear) {
      bgLayerNear.style.transform = `translate3d(0, ${-(scrollTop * 0.20).toFixed(2)}px, 0)`;
    }
    if (atmosphereLayer) {
      atmosphereLayer.style.transform = `translate3d(0, ${-(scrollTop * 0.03).toFixed(2)}px, 0)`;
    }

    // Continuous Scroll Spine Thumb Movement
    if (spineThumb && spineTrack) {
      const trackH = spineTrack.offsetHeight || 200;
      const thumbH = spineThumb.offsetHeight || 28;
      const maxTranslate = Math.max(trackH - thumbH, 10);
      spineThumb.style.transform = `translate3d(0, ${(progress * maxTranslate).toFixed(1)}px, 0)`;
    }

    const winH = cachedGeometry.winH;
    const focusY = scrollTop + winH * 0.45;

    // Determine current section in viewport focus for Scroll Spine Indicator
    const sections = [
      { id: 'hero', num: '01', name: 'ORIGIN', color: '#C6A45A', top: cachedGeometry.hero.top, height: cachedGeometry.hero.height },
      { id: 'about', num: '02', name: 'MINDSET', color: '#7596C8', top: cachedGeometry.about.top, height: cachedGeometry.about.height },
      { id: 'skills', num: '03', name: 'SPECTRUM', color: '#7596C8', top: cachedGeometry.skills.top, height: cachedGeometry.skills.height },
      { id: 'projects', num: '04', name: 'EXHIBITS', color: '#C6A45A', top: cachedGeometry.projects.top, height: cachedGeometry.projects.height },
      { id: 'architecture', num: '05', name: 'SYSTEMS', color: '#7596C8', top: cachedGeometry.architecture.top, height: cachedGeometry.architecture.height },
      { id: 'experience', num: '06', name: 'TIMELINE', color: '#C6A45A', top: cachedGeometry.experience.top, height: cachedGeometry.experience.height },
      { id: 'certifications', num: '07', name: 'CREDENTIALS', color: '#C6A45A', top: cachedGeometry.certifications.top, height: cachedGeometry.certifications.height },
      { id: 'resume', num: '08', name: 'DOSSIER', color: '#A9B1BF', top: cachedGeometry.resume.top, height: cachedGeometry.resume.height },
      { id: 'contact', num: '09', name: 'TRANSMIT', color: '#C6A45A', top: cachedGeometry.contact.top, height: cachedGeometry.contact.height },
    ];

    let currentSection = sections[0];
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      if (focusY >= sec.top && focusY < sec.top + sec.height) {
        currentSection = sec;
        break;
      } else if (i === sections.length - 1 && focusY >= sec.top) {
        currentSection = sec;
      }
    }

    if (currentSection && lastChapter !== currentSection.id) {
      lastChapter = currentSection.id;
      document.querySelectorAll('.spine-chapter-item').forEach((item) => {
        item.classList.remove('active');
      });
      const activeItem = document.getElementById(`spine-chapter-${currentSection.id}`);
      if (activeItem) {
        activeItem.classList.add('active');
      }
      if (spineLabel) {
        spineLabel.textContent = `${currentSection.num} ${currentSection.name}`;
        spineLabel.style.color = currentSection.color;
      }
    }

    // Active Project Spotlight Tracking is handled authoritatively by Projects.jsx IntersectionObserver
    // to avoid dual-observer fighting, stale geometry caching, and rapid state flapping.

    scrollTicking = false;
  }

  const onResize = () => {
    updateGeometry();
    ScrollTrigger.refresh();
  };

  const onScroll = () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(onScrollTick);
      scrollTicking = true;
    }
  };

  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  const initTimeout = setTimeout(() => {
    updateGeometry();
    onScrollTick();
    ScrollTrigger.refresh();
  }, 100);

  // Section Observer for .is-in-view transitions (unobserved once revealed)
  let motionObserver = null;
  const observedElements = document.querySelectorAll(
    '.about-section, .skills-section, .projects-section, .architecture-section, .experience-section, .certifications-section, .resume-section, .contact-section, .project-card, .project-narrative-entry'
  );

  if ('IntersectionObserver' in window && observedElements.length) {
    motionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          observer.unobserve(entry.target);
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

  // Section-specific GSAP ScrollTrigger choreography (respecting prefers-reduced-motion)
  let gsapCtx = null;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    gsapCtx = gsap.context(() => {
      // 0A. Oversized Background Typography Watermarks: Scroll-Linked Horizontal Parallax
      const watermarks = document.querySelectorAll('.section-bg-watermark');
      const isMobileScreen = window.innerWidth <= 900;
      watermarks.forEach((wm, idx) => {
        const parent = wm.closest('section') || wm.parentElement;
        if (!parent) return;
        const isEven = idx % 2 === 0;
        const driftDistance = isMobileScreen ? 4 : 10;
        gsap.fromTo(
          wm,
          { xPercent: isEven ? -driftDistance : driftDistance },
          {
            xPercent: isEven ? driftDistance : -driftDistance,
            ease: 'none',
            scrollTrigger: {
              trigger: parent,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          }
        );
      });

      // 0B. Section Bridges: Progressive Conduit Wire Expansion & Waypoint Illumination
      const bridges = document.querySelectorAll('.section-bridge');
      bridges.forEach((bridge) => {
        const pill = bridge.querySelector('.bridge-waypoint-pill');
        const lines = bridge.querySelectorAll('.bridge-track-line');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: bridge,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true
          }
        });

        if (lines.length) {
          tl.fromTo(
            lines,
            { scaleX: 0.2, opacity: 0.2 },
            { scaleX: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
            0
          );
        }

        if (pill) {
          tl.fromTo(
            pill,
            { y: 14, opacity: 0.35, scale: 0.96 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
            0.1
          );
        }
      });

      // 1. About section: directional bio entrance & lifted focus column
      const bioCol = document.querySelector('.about-bio-column');
      if (bioCol) {
        gsap.fromTo(
          bioCol,
          { x: -24, opacity: 0.35 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bioCol,
              start: 'top 85%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      }

      // 2. Skills section: header & Interactive Skill Constellation progressive reveal
      const skillsHeader = document.querySelector('.skills-header');
      if (skillsHeader) {
        gsap.fromTo(
          skillsHeader,
          { y: 20, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: skillsHeader,
              start: 'top 88%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      }

      const constellationWrapper = document.querySelector('.constellation-wrapper');
      const constellationLines = document.querySelectorAll('.constellation-line');
      const constellationNodes = document.querySelectorAll('.constellation-node');
      const clusterLabels = document.querySelectorAll('.cluster-moniker');
      const skillDrawer = document.querySelector('.skill-context-drawer');

      if (constellationWrapper) {
        const skillsTl = gsap.timeline({
          scrollTrigger: {
            trigger: constellationWrapper,
            start: 'top 84%',
            toggleActions: 'play none none none', once: true
          }
        });

        // Delicate entrance for constellation wrapper
        skillsTl.fromTo(
          constellationWrapper,
          { opacity: 0.3, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          0
        );

        if (clusterLabels.length) {
          skillsTl.fromTo(
            clusterLabels,
            { opacity: 0 },
            { opacity: 0.35, duration: 0.8, stagger: 0.08, ease: 'power1.out' },
            0.1
          );
        }

        // Delicate connecting lines fade in
        if (constellationLines.length) {
          skillsTl.fromTo(
            constellationLines,
            { opacity: 0 },
            { opacity: 1, duration: 0.7, stagger: { amount: 0.35, from: 'random' }, ease: 'power2.out' },
            0.15
          );
        }

        // Nodes reveal smoothly with opacity stagger, preserving SVG geometric coordinates
        if (constellationNodes.length) {
          skillsTl.fromTo(
            constellationNodes,
            { opacity: 0 },
            { opacity: 1, duration: 0.55, stagger: { amount: 0.4, from: 'center' }, ease: 'power2.out' },
            0.2
          );
        }

        if (skillDrawer) {
          skillsTl.fromTo(
            skillDrawer,
            { opacity: 0.4, y: 20 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
            0.4
          );
        }
      }

      // 3. Projects section: header & narrative card reveals
      const projectsHeader = document.querySelector('.projects-header-block');
      if (projectsHeader) {
        gsap.fromTo(
          projectsHeader,
          { y: 20, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: projectsHeader,
              start: 'top 88%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      }

      const projectEntries = document.querySelectorAll('.project-narrative-entry');
      projectEntries.forEach((entry) => {
        gsap.fromTo(
          entry,
          { y: 28, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: entry,
              start: 'top 84%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      });

      // Featured Projects High-Contrast Gate (Reference Image 5)
      const projectsGate = document.getElementById('featured-projects-gate');
      if (projectsGate) {
        gsap.fromTo(
          projectsGate,
          { y: 50, opacity: 0.25, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: projectsGate,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Continuous scrubbed parallax for project background index numerals
      const projectNumerals = document.querySelectorAll('.project-bg-numeral');
      projectNumerals.forEach((numeral) => {
        const parent = numeral.closest('.project-narrative-entry') || numeral.parentElement;
        gsap.fromTo(
          numeral,
          { y: -50, opacity: 0.15 },
          {
            y: 50,
            opacity: 0.45,
            ease: 'none',
            scrollTrigger: {
              trigger: parent,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6
            }
          }
        );
      });

      // 4. Technical Architecture section: header, selector tabs & system canvas
      const archHeader = document.querySelector('.architecture-header-center');
      if (archHeader) {
        gsap.fromTo(
          archHeader,
          { y: 20, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: archHeader,
              start: 'top 88%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      }

      const archTabs = document.querySelectorAll('.ca-proj-tab');
      if (archTabs.length) {
        gsap.fromTo(
          archTabs,
          { y: 16, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.ca-project-selector',
              start: 'top 86%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      }

      const archCards = document.querySelectorAll('.ca-overview-card');
      if (archCards.length) {
        gsap.fromTo(
          archCards,
          { y: 24, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.ca-overview-grid',
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 5. Experience section: header & animated timeline progress spine
      const expHeader = document.querySelector('.exp-header-block') || document.querySelector('.experience-title');
      if (expHeader) {
        gsap.fromTo(
          expHeader,
          { y: 20, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: expHeader,
              start: 'top 88%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      }

      // Continuous scrubbed timeline progress fill along the experience rail
      const spineFill = document.getElementById('exp-timeline-spine-fill');
      const expSecEl = document.getElementById('experience');
      if (spineFill && expSecEl) {
        gsap.fromTo(
          spineFill,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: expSecEl,
              start: 'top 65%',
              end: 'bottom 80%',
              scrub: 0.5,
              onUpdate: (self) => {
                const p = self.progress;
                const expNodes = document.querySelectorAll('.exp-timeline-node');
                expNodes.forEach((node, idx) => {
                  const threshold = (idx + 0.25) / Math.max(expNodes.length, 1);
                  if (p >= threshold) node.classList.add('node-illuminated');
                  else node.classList.remove('node-illuminated');
                });
              }
            }
          }
        );
      }

      const expItems = document.querySelectorAll('.exp-timeline-item');
      expItems.forEach((item) => {
        gsap.fromTo(
          item,
          { x: 30, opacity: 0.35 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
              onEnter: () => item.classList.add('in-view'),
              onEnterBack: () => item.classList.add('in-view'),
              onLeaveBack: () => item.classList.remove('in-view')
            }
          }
        );
      });

      // 6. Certifications section: continuous scrubbed timeline spine, ambient circuit parallax & reversible row entrances
      const certHeader = document.querySelector('.certifications-header') || document.querySelector('#certifications-title');
      if (certHeader) {
        gsap.fromTo(
          certHeader,
          { y: 20, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: certHeader,
              start: 'top 88%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      }

      // Continuous scrubbed timeline progress fill along the certifications rail
      const certSpineFill = document.getElementById('cert-timeline-spine-fill');
      const certSecEl = document.getElementById('certifications');
      if (certSpineFill && certSecEl) {
        gsap.fromTo(
          certSpineFill,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: certSecEl,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: 0.5,
              onUpdate: (self) => {
                const p = self.progress;
                const certNodes = document.querySelectorAll('.cert-timeline-node');
                certNodes.forEach((node, idx) => {
                  const threshold = (idx + 0.3) / Math.max(certNodes.length, 1);
                  if (p >= threshold) node.classList.add('node-illuminated');
                  else node.classList.remove('node-illuminated');
                });
              }
            }
          }
        );
      }

      // Parallax drifting circuit background in Certifications
      const certCircuit = document.querySelector('.cert-ambient-circuit');
      if (certCircuit && certSecEl) {
        gsap.to(certCircuit, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: certSecEl,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      }

      // Staggered, bidirectional entrance for each certification card
      const certRows = document.querySelectorAll('.cert-timeline-row');
      certRows.forEach((row, idx) => {
        const isEven = idx % 2 === 0;
        gsap.fromTo(
          row,
          { x: isEven ? -22 : 22, opacity: 0.3 },
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // 7. Resume section: dual-column entrance with scroll scrub and reversible reveals
      const resumeColPrimary = document.querySelector('.resume-col-primary');
      const resumeColSecondary = document.querySelector('.resume-col-secondary');
      if (resumeColPrimary) {
        gsap.fromTo(
          resumeColPrimary,
          { x: -24, opacity: 0.3 },
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: resumeColPrimary,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
      if (resumeColSecondary) {
        gsap.fromTo(
          resumeColSecondary,
          { x: 24, opacity: 0.3 },
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
            delay: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: resumeColSecondary,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 8. Contact section: invitation & form entrance with reversible reveals
      const contactIntro = document.querySelector('.contact-intro-col');
      const contactForm = document.querySelector('.contact-form-col') || document.querySelector('.contact-form-wrapper');
      if (contactIntro) {
        gsap.fromTo(
          contactIntro,
          { x: -24, opacity: 0.3 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contactIntro,
              start: 'top 86%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
      if (contactForm) {
        gsap.fromTo(
          contactForm,
          { y: 24, opacity: 0.3 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contactForm,
              start: 'top 86%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Continuous scrubbed rotation and scale for Contact kinetic aura
      const contactAura = document.getElementById('contact-kinetic-aura');
      const contactSecEl = document.getElementById('contact');
      if (contactAura && contactSecEl) {
        gsap.fromTo(
          contactAura,
          { rotate: -25, scale: 0.88 },
          {
            rotate: 45,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: contactSecEl,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1
            }
          }
        );
      }
    });
  }

  return () => {
    clearTimeout(initTimeout);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', onScroll);
    if (motionObserver) motionObserver.disconnect();
    if (gsapCtx) gsapCtx.revert();
  };
}
