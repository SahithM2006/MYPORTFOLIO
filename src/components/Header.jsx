import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (!('IntersectionObserver' in window) || !sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: 0
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header" id="site-header">
      <nav className="nav-dock" aria-label="Main Navigation">
        <a href="#hero" className="nav-wordmark" id="nav-wordmark" onClick={closeMenu}>
          <span className="nav-brand-dot">✦</span>
          <span>SAHITH M.</span>
        </a>
        <div className={`nav-links ${isOpen ? 'open' : ''}`} id="nav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              data-section={item.id}
              aria-current={activeSection === item.id ? 'true' : 'false'}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
        <button
          className={`nav-mobile-toggle ${isOpen ? 'active' : ''}`}
          id="nav-mobile-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen ? 'true' : 'false'}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
      </nav>
    </header>
  );
}
