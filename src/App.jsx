import React, { useState, useEffect } from 'react';
import ScrollProgress from './components/ScrollProgress.jsx';
import ScrollSpine from './components/ScrollSpine.jsx';
import AmbientBackground from './components/AmbientBackground.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import TechnicalArchitecture from './components/TechnicalArchitecture.jsx';
import Experience from './components/Experience.jsx';
import Certifications from './components/Certifications.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import SectionBridge from './components/SectionBridge.jsx';
import { initScrollEngine } from './scroll-engine.js';
import { initMobileReadiness } from './mobile-readiness.js';
import { getSkillsForProject, getProjectsForSkill } from './data-store.js';

export default function App() {
  const [activeProjectId, setActiveProjectId] = useState('prj-probe360');
  const [selectedSkillId, setSelectedSkillId] = useState('python');

  // Derive highlighted skills for the currently active project
  const highlightedSkillIds = getSkillsForProject(activeProjectId).map((s) => s.id);

  // Derive highlighted projects for the selected skill
  const highlightedProjectIds = getProjectsForSkill(selectedSkillId).map((p) => `prj-${p.id}`);

  useEffect(() => {
    const cleanupScroll = initScrollEngine();
    const cleanupMobile = initMobileReadiness();

    // Auto-scroll to resume section if accessed via /resume or #resume
    const isResumePath =
      window.location.pathname === '/resume' ||
      window.location.pathname === '/resume/' ||
      window.location.hash === '#resume';

    if (isResumePath) {
      setTimeout(() => {
        const resumeEl = document.getElementById('resume');
        if (resumeEl) {
          resumeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);
    }

    return () => {
      if (typeof cleanupScroll === 'function') {
        cleanupScroll();
      }
      if (typeof cleanupMobile === 'function') {
        cleanupMobile();
      }
    };
  }, []);

  const handleJumpToProject = (prjId) => {
    setActiveProjectId(prjId);
    const target = document.getElementById(prjId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <ScrollProgress />
      <ScrollSpine />
      <AmbientBackground />
      <Header />
      <main className="page-main" id="main-content">
        <Hero />
        <SectionBridge tag="01 ORIGIN &bull; 02 MINDSET" />
        <About onSelectSkill={setSelectedSkillId} onSelectProject={setActiveProjectId} />
        <SectionBridge tag="02 MINDSET &bull; 03 SPECTRUM" />
        <Skills
          selectedSkillId={selectedSkillId}
          onSelectSkill={setSelectedSkillId}
          highlightedSkillIds={highlightedSkillIds}
          onJumpToProject={handleJumpToProject}
        />
        <SectionBridge tag="03 SPECTRUM &bull; 04 EXHIBITS" />
        <Projects
          activeProjectId={activeProjectId}
          onSelectProject={setActiveProjectId}
          selectedSkillId={selectedSkillId}
          onSelectSkill={setSelectedSkillId}
        />
        <SectionBridge tag="04 EXHIBITS &bull; 05 SYSTEMS" />
        <TechnicalArchitecture />
        <SectionBridge tag="05 SYSTEMS &bull; 06 TIMELINE" />
        <Experience />
        <SectionBridge tag="06 TIMELINE &bull; 07 CREDENTIALS" />
        <Certifications />
        <SectionBridge tag="07 CREDENTIALS &bull; 08 DOSSIER" />
        <Resume />
        <SectionBridge tag="08 DOSSIER &bull; 09 TRANSMIT" />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
