import React, { useState, useEffect } from 'react';
import ScrollProgress from './components/ScrollProgress.jsx';
import ScrollSpine from './components/ScrollSpine.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { initScrollEngine } from './scroll-engine.js';
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
    return () => {
      if (typeof cleanupScroll === 'function') {
        cleanupScroll();
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
      <Header />
      <main className="page-main" id="main-content">
        <Hero />
        <About onSelectSkill={setSelectedSkillId} onSelectProject={setActiveProjectId} />
        <Skills
          selectedSkillId={selectedSkillId}
          onSelectSkill={setSelectedSkillId}
          highlightedSkillIds={highlightedSkillIds}
          onJumpToProject={handleJumpToProject}
        />
        <Projects
          activeProjectId={activeProjectId}
          onSelectProject={setActiveProjectId}
          selectedSkillId={selectedSkillId}
          onSelectSkill={setSelectedSkillId}
        />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
