/**
 * Sahith M. — Unified Scroll Exhibition Engine & Chapter Navigator
 * Single RAF loop with cached geometries, plus GSAP ScrollTrigger enhancements.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectColorMap = {
  'prj-probe360': '#8fa89b',
  'prj-mule-matrix': '#2dd4a7',
  'prj-csi-origin': '#2dd4a7',
  'prj-carbon': '#b8a9c9',
  'prj-aegis': '#8fa89b'
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
        color: projectColorMap[card.id] || '#8fa89b'
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

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }

    if (auraOrbit1) {
      auraOrbit1.style.transform = `rotate(${progress * 360}deg)`;
    }
    if (auraOrbit2) {
      auraOrbit2.style.transform = `rotate(-${progress * 260}deg)`;
    }

    const winH = cachedGeometry.winH;
    const focusY = scrollTop + winH * 0.45;

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

      const videoCard = document.querySelector('.about-video-card');
      if (videoCard) {
        gsap.fromTo(
          videoCard,
          { y: 20, opacity: 0.4 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            delay: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: videoCard,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true
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

        // Delicate connecting lines fade & draw in
        if (constellationLines.length) {
          skillsTl.fromTo(
            constellationLines,
            { opacity: 0, scale: 0.96, transformOrigin: 'center center' },
            { opacity: 1, scale: 1, duration: 0.7, stagger: { amount: 0.35, from: 'random' }, ease: 'power2.out' },
            0.15
          );
        }

        // Nodes expand smoothly from center ecosystem
        if (constellationNodes.length) {
          skillsTl.fromTo(
            constellationNodes,
            { opacity: 0, scale: 0.5, transformOrigin: 'center center' },
            { opacity: 1, scale: 1, duration: 0.55, stagger: { amount: 0.45, from: 'center' }, ease: 'back.out(1.4)' },
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

      // 4. Experience section: header & sequential timeline items with node illumination
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

      const expItems = document.querySelectorAll('.exp-timeline-item');
      expItems.forEach((item) => {
        gsap.fromTo(
          item,
          { x: 20, opacity: 0.35 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play none none none', once: true,
              onEnter: () => item.classList.add('in-view'),
              onEnterBack: () => item.classList.add('in-view'),
              onLeaveBack: () => item.classList.remove('in-view')
            }
          }
        );
      });

      // 5. Certifications section: header & horizontal timeline row cascades
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

      const certList = document.querySelector('.cert-timeline-list');
      const certRows = document.querySelectorAll('.cert-timeline-row');
      if (certList && certRows.length) {
        gsap.fromTo(
          certRows,
          { x: -18, opacity: 0.35 },
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
            stagger: 0.04,
            scrollTrigger: {
              trigger: certList,
              start: 'top 84%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      }

      // 6. Resume section: dual-column entrance
      const resumeColPrimary = document.querySelector('.resume-col-primary');
      const resumeColSecondary = document.querySelector('.resume-col-secondary');
      if (resumeColPrimary) {
        gsap.fromTo(
          resumeColPrimary,
          { x: -20, opacity: 0.35 },
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: resumeColPrimary,
              start: 'top 84%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      }
      if (resumeColSecondary) {
        gsap.fromTo(
          resumeColSecondary,
          { x: 20, opacity: 0.35 },
          {
            x: 0,
            opacity: 1,
            duration: 0.65,
            delay: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: resumeColSecondary,
              start: 'top 84%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      }

      // 7. Contact section: invitation & form entrance
      const contactIntro = document.querySelector('.contact-intro-col');
      const contactForm = document.querySelector('.contact-form-col') || document.querySelector('.contact-form-wrapper');
      if (contactIntro) {
        gsap.fromTo(
          contactIntro,
          { x: -24, opacity: 0.35 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contactIntro,
              start: 'top 85%',
              toggleActions: 'play none none none', once: true
            }
          }
        );
      }
      if (contactForm) {
        gsap.fromTo(
          contactForm,
          { y: 24, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contactForm,
              start: 'top 85%',
              toggleActions: 'play none none none', once: true
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
