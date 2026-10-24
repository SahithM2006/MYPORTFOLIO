import React from 'react';

const CHAPTERS = [
  { id: 'hero', num: '01', name: 'CURIOSITY' },
  { id: 'exploration', num: '02', name: 'EXPLORATION' },
  { id: 'understanding', num: '03', name: 'UNDERSTANDING' },
  { id: 'skills', num: '04', name: 'EXPERIMENTATION' },
  { id: 'projects', num: '05', name: 'CREATION' },
  { id: 'experience', num: '06', name: 'EVOLUTION' }
];

export default function ScrollSpine() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="scroll-spine-track" id="scroll-spine-track" aria-label="Journey Navigator">
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
            aria-label={`Jump to Stage ${ch.num}: ${ch.name}`}
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
