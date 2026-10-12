import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SKILLS, SKILL_CATEGORIES } from '../data-store.js';

const PROJECT_MAP = {
  probe360: { name: 'Probe360 Agentless Security', id: 'prj-probe360' },
  'csi-origin': { name: 'CSI Origin — HELM Agent', id: 'prj-csi-origin' },
  carbon: { name: 'AI Carbon Intelligence', id: 'prj-carbon' },
  aegis: { name: 'AEGIS-TWIN Cyber Digital Twin', id: 'prj-aegis' }
};

const CATEGORY_CLASS_MAP = {
  ai: 'card-cat-ai',
  programming: 'card-cat-prog',
  backend: 'card-cat-backend',
  security: 'card-cat-security',
  automation: 'card-cat-automation'
};

const CATEGORY_BADGE_MAP = {
  python: 'AI / CORE',
  numpy: 'ARRAYS',
  pandas: 'DATASETS',
  matplotlib: 'PLOTTING',
  'scikit-learn': 'MODELS',
  opencv: 'VISION',
  c: 'SYSTEMS',
  sql: 'QUERIES',
  fastapi: 'ASYNC API',
  'rest-apis': 'HTTP',
  pydantic: 'SCHEMAS',
  winrm: 'AGENTLESS',
  'windows-admin': 'REGISTRY',
  'vuln-assessment': 'CVE BASE',
  networkx: 'GRAPH TWIN',
  'mitre-attack': 'TACTICS',
  'workflow-automation': 'PIPELINES',
  git: 'BRANCHING'
};

export default function Skills({
  selectedSkillId: propSelectedSkillId,
  onSelectSkill: propOnSelectSkill,
  highlightedSkillIds = [],
  onJumpToProject
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [internalSelectedSkillId, setInternalSelectedSkillId] = useState('python');
  const [isRearranging, setIsRearranging] = useState(false);
  const searchInputRef = useRef(null);

  const selectedSkillId = propSelectedSkillId || internalSelectedSkillId;

  const handleSelectSkill = (id) => {
    if (propOnSelectSkill) {
      propOnSelectSkill(id);
    } else {
      setInternalSelectedSkillId(id);
    }
  };

  // Keyboard shortcut: '/' focuses search, 'Esc' clears
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        if (document.activeElement === searchInputRef.current) {
          setSearchQuery('');
          searchInputRef.current?.blur();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleCategoryChange = (catId) => {
    setIsRearranging(true);
    setSelectedCategory(catId);
    setTimeout(() => {
      setIsRearranging(false);
    }, 280);
  };

  const filteredSkills = useMemo(() => {
    return SKILLS.filter((skill) => {
      const matchCat = selectedCategory === 'all' || skill.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        skill.title.toLowerCase().includes(query) ||
        skill.symbol.toLowerCase().includes(query) ||
        skill.desc.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const selectedSkill = useMemo(() => {
    return SKILLS.find((s) => s.id === selectedSkillId) || SKILLS[0];
  }, [selectedSkillId]);

  const resetView = () => {
    handleCategoryChange('all');
    setSearchQuery('');
    handleSelectSkill('python');
  };

  const handleCardClick = (skill) => {
    handleSelectSkill(skill.id);

    // Pulse highlight connected project cards in the project gallery
    if (skill.projectIds && skill.projectIds.length) {
      skill.projectIds.forEach((pId) => {
        const card = document.getElementById(`prj-${pId}`);
        if (card) {
          card.classList.add('skill-connected-highlight');
          setTimeout(() => card.classList.remove('skill-connected-highlight'), 2000);
        }
      });
    }
  };

  const handleKeyDownOnCard = (e, idx) => {
    if (e.key === 'ArrowRight' && idx < filteredSkills.length - 1) {
      document.querySelectorAll('.periodic-card')[idx + 1]?.focus();
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      document.querySelectorAll('.periodic-card')[idx - 1]?.focus();
    }
  };

  return (
    <section className="skills-section is-in-view" id="skills" aria-labelledby="skills-title">
      <div className="skills-container">
        <div className="skills-header">
          <div className="skills-header-top">
            <button className="btn-reset-skills" id="btn-reset-skills" title="Reset all skill filters" type="button" onClick={resetView}>
              ↺ Reset View
            </button>
          </div>
          <h2 className="skills-title" id="skills-title">The Periodic Skill Playground</h2>
          <p className="skills-intro">
            An interactive periodic-table inspired index across five technical domains. Search skills in real time, filter by category, or select any element to inspect architecture applications and automatically highlight connected projects.
          </p>

          {/* Search & Filter Bar */}
          <div className="skills-control-bar">
            <div className="search-input-wrap">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                ref={searchInputRef}
                type="text"
                id="skill-search-input"
                className="skill-search-input"
                placeholder="Search skills (press '/' to focus)..."
                aria-label="Search skills"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="category-filters-row" role="tablist" aria-label="Filter skills by discipline">
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`skill-filter-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                  data-category={cat.id}
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Periodic Table Layout Grid with smooth rearrangement */}
        <div className={`periodic-table-grid ${isRearranging ? 'grid-reorganizing' : ''}`} id="periodic-table-grid" role="region" aria-label="Periodic table of skills">
          {filteredSkills.map((skill, index) => {
            const catClass = CATEGORY_CLASS_MAP[skill.category] || '';
            const isSelected = selectedSkillId === skill.id;
            const isHighlightedByProject = highlightedSkillIds.includes(skill.id);
            const badge = CATEGORY_BADGE_MAP[skill.id] || skill.category.toUpperCase();

            return (
              <button
                key={skill.id}
                className={`periodic-card ${catClass} ${isSelected ? 'active' : ''} ${isHighlightedByProject ? 'project-skill-linked' : ''}`}
                data-skill={skill.id}
                data-category={skill.category}
                data-symbol={skill.symbol}
                data-title={skill.title}
                type="button"
                onClick={() => handleCardClick(skill)}
                onKeyDown={(e) => handleKeyDownOnCard(e, index)}
              >
                <div className="card-atomic-num">{skill.number}</div>
                <div className="card-symbol">{skill.symbol}</div>
                <div className="card-name">{skill.title}</div>
                <div className="card-cat-badge">{badge}</div>
                {isHighlightedByProject && <span className="project-link-indicator" title="Used in active project">⚡</span>}
              </button>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div id="skills-empty-state" className="skills-empty-state" style={{ display: 'block' }}>
            <p>No matching skills found. Try searching for "Python", "API", or "Security".</p>
          </div>
        )}

        {/* Interactive Skill Context Inspector */}
        {selectedSkill && (
          <div className="skill-context-drawer open" id="skill-context-drawer" aria-live="polite">
            <div className="context-drawer-inner">
              <div className="drawer-header">
                <span className="drawer-tag" id="drawer-cat-name">
                  {selectedSkill.category.toUpperCase()} &bull; {selectedSkill.symbol}
                </span>
                <h4 className="drawer-skill-title" id="drawer-skill-name">{selectedSkill.title}</h4>
              </div>
              <p className="drawer-description" id="drawer-skill-desc">
                {selectedSkill.desc}
              </p>
              <div className="drawer-related-projects">
                <span className="drawer-rel-label">Featured in Projects:</span>
                <div className="drawer-project-links" id="drawer-project-links">
                  {selectedSkill.projectIds.map((pId) => {
                    const prj = PROJECT_MAP[pId];
                    if (!prj) return null;
                    return (
                      <a
                        key={pId}
                        href={`#${prj.id}`}
                        className="drawer-proj-pill"
                        onClick={(e) => {
                          if (onJumpToProject) {
                            e.preventDefault();
                            onJumpToProject(prj.id);
                          }
                        }}
                      >
                        {prj.name} &rarr;
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
