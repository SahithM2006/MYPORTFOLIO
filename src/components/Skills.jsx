import React, { useState, useMemo } from 'react';
import { SKILLS, SKILL_CATEGORIES } from '../data-store.js';

const PROJECT_MAP = {
  probe360: { name: 'Probe360 — Agentless Windows Security', id: 'prj-probe360' },
  'mule-matrix': { name: 'Mule Matrix — Financial Fraud Detection', id: 'prj-mule-matrix' },
  carbon: { name: 'AI Carbon Intelligence — Logistics Analytics', id: 'prj-carbon' },
  aegis: { name: 'AEGIS-TWIN — Cyber Digital Twin', id: 'prj-aegis' }
};

export default function Skills({
  selectedSkillId: propSelectedSkillId,
  onSelectSkill: propOnSelectSkill,
  highlightedSkillIds = [],
  onJumpToProject
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillId, setActiveSkillId] = useState(propSelectedSkillId || 'python');

  const handleSelectSkill = (id) => {
    setActiveSkillId(id);
    if (typeof propOnSelectSkill === 'function') {
      propOnSelectSkill(id);
    }
  };

  const filteredSkills = useMemo(() => {
    return SKILLS.filter((skill) => {
      const matchesCategory =
        selectedCategory === 'all' || skill.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        skill.title.toLowerCase().includes(query) ||
        skill.desc.toLowerCase().includes(query) ||
        skill.groupLabel.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const activeSkill = SKILLS.find((s) => s.id === activeSkillId) || SKILLS[0];

  // Connected skills for the active skill
  const connectedSkills = useMemo(() => {
    if (!activeSkill || !activeSkill.connections) return [];
    return SKILLS.filter((s) => activeSkill.connections.includes(s.id));
  }, [activeSkill]);

  return (
    <section className="skills-section" id="skills" aria-labelledby="skills-title">
      <div className="skills-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot" />
            <span className="section-kicker">STAGE 02 // SPECTRUM &bull; TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="section-title" id="skills-title">
            Skills &amp; <span className="accent-text">Engineering Competencies</span>
          </h2>
          <p className="section-subtitle">
            A structured taxonomy of verified languages, applied machine learning toolkits,
            systems telemetry protocols, and backend frameworks.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="skills-toolbar">
          <div className="skills-category-tabs" role="tablist" aria-label="Skill categories">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`skill-cat-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                role="tab"
                aria-selected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="cat-count">
                  {cat.id === 'all'
                    ? SKILLS.length
                    : SKILLS.filter((s) => s.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>

          <div className="skills-search-wrap">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              className="skills-search-input"
              placeholder="Search skills, protocols, libraries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter skills"
            />
            {searchQuery && (
              <button
                type="button"
                className="skills-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
        </div>

        {/* Two-Column Structured Showcase: Grid + Inspector */}
        <div className="skills-showcase-layout">
          {/* Left: Responsive Grid of Skill Cards */}
          <div className="skills-grid-col">
            <div className="skills-cards-grid" role="list">
              {filteredSkills.map((skill) => {
                const isSelected = activeSkillId === skill.id;
                const isProjectHighlighted = highlightedSkillIds.includes(skill.id);

                return (
                  <article
                    key={skill.id}
                    className={`skill-card ${isSelected ? 'selected' : ''} ${isProjectHighlighted ? 'highlighted' : ''}`}
                    onClick={() => handleSelectSkill(skill.id)}
                    tabIndex={0}
                    role="listitem"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSelectSkill(skill.id);
                      }
                    }}
                  >
                    <div className="skill-card-top">
                      <div className="skill-badge-symbol">{skill.symbol}</div>
                      <span className={`skill-tier-badge ${skill.tier}`}>
                        {skill.tier === 'anchor' ? 'Anchor' : 'Specialist'}
                      </span>
                    </div>

                    <h3 className="skill-card-title">{skill.title}</h3>
                    <span className="skill-card-category">{skill.groupLabel}</span>
                    <p className="skill-card-desc">{skill.desc}</p>

                    {skill.projectIds && skill.projectIds.length > 0 && (
                      <div className="skill-card-projects">
                        <span className="proj-tag-label">USED IN:</span>
                        <div className="proj-tag-list">
                          {skill.projectIds.map((pid) => (
                            <span key={pid} className="proj-micro-pill">
                              {pid}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {filteredSkills.length === 0 && (
              <div className="skills-empty-state">
                <span className="empty-icon" aria-hidden="true">&empty;</span>
                <h4>No competencies match &ldquo;{searchQuery}&rdquo;</h4>
                <p>Try resetting the category filter or clearing your search query.</p>
                <button
                  type="button"
                  className="btn-skills-reset"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Right: Deep-Dive Skill Inspector */}
          <div className="skills-inspector-col">
            <aside className="skill-inspector-card" aria-label="Selected Skill Details">
              <div className="inspector-topbar">
                <div className="inspector-symbol-wrap">
                  <span className="inspector-symbol">{activeSkill.symbol}</span>
                  <div className="inspector-title-wrap">
                    <h3 className="inspector-title">{activeSkill.title}</h3>
                    <span className="inspector-category">{activeSkill.groupLabel}</span>
                  </div>
                </div>
                <span className={`inspector-tier-tag ${activeSkill.tier}`}>
                  {activeSkill.tier === 'anchor' ? 'Anchor Primitive' : 'Applied Specialist'}
                </span>
              </div>

              <div className="inspector-body">
                <div className="inspector-row">
                  <span className="inspector-label">ENGINEERING CONTEXT</span>
                  <p className="inspector-text">{activeSkill.desc}</p>
                </div>

                {connectedSkills.length > 0 && (
                  <div className="inspector-row">
                    <span className="inspector-label">CONNECTED COMPETENCIES</span>
                    <div className="inspector-connected-pills">
                      {connectedSkills.map((cs) => (
                        <button
                          key={cs.id}
                          type="button"
                          className="connected-skill-btn"
                          onClick={() => handleSelectSkill(cs.id)}
                          title={`Switch to ${cs.title}`}
                        >
                          <span className="connected-sym">{cs.symbol}</span>
                          <span className="connected-name">{cs.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="inspector-row">
                  <span className="inspector-label">DEPLOYED IN REAL PROJECTS</span>
                  {activeSkill.projectIds && activeSkill.projectIds.length > 0 ? (
                    <div className="inspector-projects-list">
                      {activeSkill.projectIds.map((pid) => {
                        const proj = PROJECT_MAP[pid];
                        if (!proj) return null;
                        return (
                          <div key={pid} className="inspector-project-item">
                            <div className="proj-item-info">
                              <strong className="proj-item-name">{proj.name}</strong>
                              <span className="proj-item-id">ID: {pid}</span>
                            </div>
                            <button
                              type="button"
                              className="btn-jump-project"
                              onClick={() => {
                                if (typeof onJumpToProject === 'function') {
                                  onJumpToProject(proj.id);
                                } else {
                                  const el = document.getElementById(proj.id);
                                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                            >
                              <span>View Project</span>
                              <span className="jump-arrow">→</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="inspector-empty-text">
                      Foundational computer science primitive studied through academic coursework.
                    </p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
