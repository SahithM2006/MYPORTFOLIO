import React from 'react';

const CHAPTERS = [
  { id: 'hero', num: '01', name: 'ORIGIN' },
  { id: 'about', num: '02', name: 'MINDSET' },
  { id: 'skills', num: '03', name: 'SPECTRUM' },
  { id: 'projects', num: '04', name: 'EXHIBITS' },
  { id: 'architecture', num: '05', name: 'SYSTEMS' },
  { id: 'experience', num: '06', name: 'TIMELINE' },
  { id: 'certifications', num: '07', name: 'CREDENTIALS' },
  { id: 'resume', num: '08', name: 'DOSSIER' },
  { id: 'contact', num: '09', name: 'TRANSMIT' }
];

export default function ScrollSpine() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="scroll-spine-track" id="scroll-spine-track" aria-label="Chapter Navigator">
      <div className="scroll-spine-rail" aria-hidden="true">
        <div className="scroll-spine-thumb" id="scroll-spine-thumb" />
      </div>
      <div className="scroll-spine-chapters" id="scroll-spine-chapters">
        {CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            type="button"
            className="spine-chapter-item"
            id={`spine-chapter-${ch.id}`}
            onClick={() => scrollTo(ch.id)}
            aria-label={`Jump to ${ch.num} ${ch.name}`}
          >
            <span className="spine-dot" />
            <span className="spine-tag">
              <span className="spine-num">{ch.num}</span>
              <span className="spine-name">{ch.name}</span>
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
