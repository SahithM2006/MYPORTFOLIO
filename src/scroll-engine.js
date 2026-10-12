/**
 * Sahith M. — Unified Scroll Exhibition Engine & Chapter Navigator
 * Single RAF loop with cached geometries, plus GSAP ScrollTrigger enhancements.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectColorMap = {
  'prj-probe360': '#8fa89b',
  'prj-csi-origin': '#6c8ea4',
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
    experience: { top: 4400, height: 1000 },
    certifications: { top: 5500, height: 1200 },
    resume: { top: 6700, height: 1200 },
    contact: { top: 7900, height: 800 },
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
    const clamp01 = (v) => Math.min(Math.max(v, 0), 1);

    const heroProgress = clamp01(scrollTop / (cachedGeometry.hero.height || 1));
    const aboutProgress = clamp01((scrollTop - cachedGeometry.about.top + winH * 0.45) / (cachedGeometry.about.height || 1));
    const skillsProgress = clamp01((scrollTop - cachedGeometry.skills.top + winH * 0.45) / (cachedGeometry.skills.height || 1));
    const projectsProgress = clamp01((scrollTop - cachedGeometry.projects.top + winH * 0.45) / (cachedGeometry.projects.height || 1));
    const expProgress = clamp01((scrollTop - cachedGeometry.experience.top + winH * 0.45) / (cachedGeometry.experience.height || 1));
    const certProgress = clamp01((scrollTop - cachedGeometry.certifications.top + winH * 0.45) / (cachedGeometry.certifications.height || 1));
    const resumeProgress = clamp01((scrollTop - cachedGeometry.resume.top + winH * 0.45) / (cachedGeometry.resume.height || 1));
    const contactProgress = clamp01((scrollTop - cachedGeometry.contact.top + winH * 0.6) / (cachedGeometry.contact.height || 1));

    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--scroll-progress', progress.toFixed(4));
    rootStyle.setProperty('--hero-scroll', heroProgress.toFixed(4));
    rootStyle.setProperty('--about-scroll', aboutProgress.toFixed(4));
    rootStyle.setProperty('--skills-scroll', skillsProgress.toFixed(4));
    rootStyle.setProperty('--projects-scroll', projectsProgress.toFixed(4));
    rootStyle.setProperty('--experience-scroll', expProgress.toFixed(4));
    rootStyle.setProperty('--cert-scroll', certProgress.toFixed(4));
    rootStyle.setProperty('--resume-scroll', resumeProgress.toFixed(4));
    rootStyle.setProperty('--contact-scroll', contactProgress.toFixed(4));

    const focusY = scrollTop + winH * 0.45;

    // Active Project Spotlight Tracking in Exhibition
    if (cachedGeometry.cards.length > 0 && focusY >= cachedGeometry.projects.top - 200 && focusY <= cachedGeometry.contact.top) {
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
  }, 100);

  // Section Observer for .is-in-view transitions
  let motionObserver = null;
  const observedElements = document.querySelectorAll(
    '.about-section, .skills-section, .projects-section, .experience-section, .certifications-section, .resume-section, .contact-section, .project-card, .project-narrative-entry'
  );

  if ('IntersectionObserver' in window && observedElements.length) {
    motionObserver = new IntersectionObserver((entries) => {
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

  // GSAP ScrollTrigger reveals (respecting prefers-reduced-motion)
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    const headlines = document.querySelectorAll(
      '.skills-title, .projects-title, .experience-title, .contact-headline'
    );
    headlines.forEach((title) => {
      gsap.fromTo(
        title,
        { y: 16, opacity: 0.88 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }

  return () => {
    clearTimeout(initTimeout);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', onScroll);
    if (motionObserver) motionObserver.disconnect();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
