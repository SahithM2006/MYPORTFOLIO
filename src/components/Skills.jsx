import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS, SKILL_CATEGORIES } from '../data-store.js';

gsap.registerPlugin(ScrollTrigger);

const PROJECT_MAP = {
  probe360: { name: 'Probe360 — Agentless Windows Security', id: 'prj-probe360' },
  'mule-matrix': { name: 'Mule Matrix — Financial Fraud Detection', id: 'prj-mule-matrix' },
  carbon: { name: 'AI Carbon Intelligence — Logistics Analytics', id: 'prj-carbon' },
  aegis: { name: 'AEGIS-TWIN — Cyber Digital Twin', id: 'prj-aegis' }
};

const GROUP_THEME_MAP = {
  programming: {
    color: '#C6A45A',
    border: '#343B49',
    glow: 'rgba(198, 164, 90, 0.45)',
    tagBg: 'rgba(198, 164, 90, 0.16)',
    text: '#E9E2D4',
    name: 'Programming'
  },
  'ai-ml': {
    color: '#7596C8',
    border: '#343B49',
    glow: 'rgba(117, 150, 200, 0.45)',
    tagBg: 'rgba(117, 150, 200, 0.16)',
    text: '#E9E2D4',
    name: 'AI & Machine Learning'
  },
  'data-science': {
    color: '#C6A45A',
    border: '#343B49',
    glow: 'rgba(198, 164, 90, 0.45)',
    tagBg: 'rgba(198, 164, 90, 0.16)',
    text: '#E9E2D4',
    name: 'Data Science'
  },
  development: {
    color: '#7596C8',
    border: '#343B49',
    glow: 'rgba(117, 150, 200, 0.45)',
    tagBg: 'rgba(117, 150, 200, 0.16)',
    text: '#E9E2D4',
    name: 'Development'
  },
  tools: {
    color: '#C6A45A',
    border: '#343B49',
    glow: 'rgba(198, 164, 90, 0.45)',
    tagBg: 'rgba(198, 164, 90, 0.16)',
    text: '#E9E2D4',
    name: 'Tools & Systems'
  }
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
  const [hoveredSkillId, setHoveredSkillId] = useState(null);
  const [focusedSkillId, setFocusedSkillId] = useState(null);
  const [isCategoryPulsing, setIsCategoryPulsing] = useState(false);
  const searchInputRef = useRef(null);
  const constellationRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Subtle scroll scrub float on constellation stage
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !constellationRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        constellationRef.current,
        { y: 15 },
        {
          y: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: '#skills',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setIsCategoryPulsing(true);
    setTimeout(() => setIsCategoryPulsing(false), 800);
    if (catId !== 'all') {
      const firstInCat = SKILLS.find((s) => s.category === catId);
      if (firstInCat) handleSelectSkill(firstInCat.id);
    }
  };

  const handleNodeMouseEnter = useCallback((skillId) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSkillId(skillId);
    }, 40);
  }, []);

  const handleNodeMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSkillId(null);
    }, 40);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const selectedSkillId = propSelectedSkillId || internalSelectedSkillId;
  const activeSkillId = hoveredSkillId || focusedSkillId || selectedSkillId;

  const handleSelectSkill = useCallback((id) => {
    if (propOnSelectSkill) {
      propOnSelectSkill(id);
    } else {
      setInternalSelectedSkillId(id);
    }

    const skill = SKILLS.find((s) => s.id === id);
    if (skill?.projectIds?.length) {
      skill.projectIds.forEach((pId) => {
        const card = document.getElementById(`prj-${pId}`);
        if (card) {
          card.classList.add('skill-connected-highlight');
          setTimeout(() => card.classList.remove('skill-connected-highlight'), 1800);
        }
      });
    }
  }, [propOnSelectSkill]);

  // Keyboard shortcut: '/' focuses search, 'Escape' clears
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

  // Compute unique undirected edges between connected skills
  const edges = useMemo(() => {
    const edgeList = [];
    const edgeKeys = new Set();
    SKILLS.forEach((source) => {
      (source.connections || []).forEach((targetId) => {
        const target = SKILLS.find((s) => s.id === targetId);
        if (!target) return;
        const key = [source.id, target.id].sort().join('--');
        if (!edgeKeys.has(key)) {
          edgeKeys.add(key);
          edgeList.push({
            id: key,
            source,
            target
          });
        }
      });
    });
    return edgeList;
  }, []);

  // Set of neighbor IDs connected to the currently active/hovered skill
  const activeNeighbors = useMemo(() => {
    if (!activeSkillId) return new Set();
    const current = SKILLS.find((s) => s.id === activeSkillId);
    return new Set(current?.connections || []);
  }, [activeSkillId]);

  // Filtered skills list based on category & search
  const filteredSkills = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SKILLS.filter((skill) => {
      const matchCat = selectedCategory === 'all' || skill.category === selectedCategory;
      const matchQuery =
        !q ||
        skill.title.toLowerCase().includes(q) ||
        skill.symbol.toLowerCase().includes(q) ||
        skill.desc.toLowerCase().includes(q) ||
        skill.groupLabel.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const selectedSkill = useMemo(() => {
    return SKILLS.find((s) => s.id === selectedSkillId) || SKILLS[0];
  }, [selectedSkillId]);

  const resetView = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setHoveredSkillId(null);
    setFocusedSkillId(null);
    handleSelectSkill('python');
  };

  // Keyboard navigation within constellation
  const handleNodeKeyDown = (e, skill) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectSkill(skill.id);
    } else if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      const neighbors = skill.connections || [];
      if (neighbors.length > 0) {
        const currCoords = skill.coords;
        let bestTarget = neighbors[0];
        let bestScore = -Infinity;

        neighbors.forEach((nId) => {
          const neighbor = SKILLS.find((s) => s.id === nId);
          if (!neighbor) return;
          const dx = neighbor.coords.x - currCoords.x;
          const dy = neighbor.coords.y - currCoords.y;

          let score = 0;
          if (e.key === 'ArrowRight') score = dx;
          if (e.key === 'ArrowLeft') score = -dx;
          if (e.key === 'ArrowDown') score = dy;
          if (e.key === 'ArrowUp') score = -dy;

          if (score > bestScore) {
            bestScore = score;
            bestTarget = nId;
          }
        });

        const targetEl = document.getElementById(`constellation-node-${bestTarget}`);
        if (targetEl) {
          targetEl.focus();
          handleSelectSkill(bestTarget);
        }
      }
    }
  };

  return (
    <section className="skills-section is-in-view" id="skills" aria-labelledby="skills-title">
      <div className="skills-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-kicker-strip">
            <span className="section-kicker-dot" />
            <span className="section-kicker">STAGE 04 // EXPERIMENTATION • IDEAS BECOME SYSTEMS</span>
          </div>
          <div className="skills-header-row">
            <div>
              <h2 className="section-title" id="skills-title">
                Interactive <span className="accent-text">Skill Constellation</span>
              </h2>
              <p className="section-subtitle">
                An interconnected ecosystem of engineering capabilities. Hover or focus any node to trace technical relationships, dependencies, and real project implementations.
              </p>
            </div>
            <button
              className="btn-reset-skills"
              id="btn-reset-skills"
              title="Reset constellation to default overview"
              type="button"
              onClick={resetView}
            >
              ↺ Reset Graph
            </button>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="skills-control-bar">
            <div className="skills-search-wrap">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                ref={searchInputRef}
                type="text"
                id="skill-search-input"
                className="skills-search-input"
                placeholder="Search capabilities (press '/' to focus)..."
                aria-label="Search skills"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="skills-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>

            <div className="category-filters-row" role="tablist" aria-label="Filter skills by ecosystem group">
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`skill-filter-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
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
          </div>
        </div>

        {/* Constellation Visual Stage + Inspector Layout */}
        <div
          ref={constellationRef}
          className={`constellation-wrapper ${isCategoryPulsing ? 'category-pulsing' : ''}`}
          id="constellation-wrapper"
          role="region"
          aria-label="Interactive skill constellation network"
        >
          {/* Main SVG Graph */}
          <div className="constellation-stage" id="constellation-stage">
            <div className="constellation-ambient-glow" aria-hidden="true" />
            <svg
              className="constellation-svg"
              id="constellation-svg"
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="false"
            >
              <defs>
                {/* Radial Gradients for Node Cores */}
                <radialGradient id="nodeGrad-programming" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#25354F" />
                  <stop offset="100%" stopColor="#0B1017" />
                </radialGradient>
                <radialGradient id="nodeGrad-ai-ml" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#1E2F4A" />
                  <stop offset="100%" stopColor="#090E17" />
                </radialGradient>
                <radialGradient id="nodeGrad-data-science" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#25354F" />
                  <stop offset="100%" stopColor="#0B1017" />
                </radialGradient>
                <radialGradient id="nodeGrad-development" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#1E2F4A" />
                  <stop offset="100%" stopColor="#090E17" />
                </radialGradient>
                <radialGradient id="nodeGrad-tools" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#25354F" />
                  <stop offset="100%" stopColor="#0B1017" />
                </radialGradient>

                {/* Glow Filter */}
                <filter id="constellationGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="activeNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Cluster Monikers */}
              <g className="constellation-cluster-labels" aria-hidden="true">
                <text x="440" y="44" className="cluster-moniker">TOOLS &amp; SECURITY ANALYSIS</text>
                <text x="160" y="165" className="cluster-moniker">SYSTEMS &amp; DEVELOPMENT</text>
                <text x="800" y="75" className="cluster-moniker">AI &amp; DEEP LEARNING</text>
                <text x="850" y="525" className="cluster-moniker">DATA SCIENCE &amp; ANALYTICS</text>
                <text x="390" y="570" className="cluster-moniker">INFRASTRUCTURE PROTOCOLS</text>
              </g>

              {/* Connecting Edges */}
              <g className="constellation-edges-group">
                {edges.map((edge) => {
                  const isEdgeActive =
                    activeSkillId &&
                    (edge.source.id === activeSkillId || edge.target.id === activeSkillId);

                  const isEdgeGroupActive =
                    selectedCategory !== 'all' &&
                    edge.source.category === selectedCategory &&
                    edge.target.category === selectedCategory;

                  const isAnyActive = Boolean(activeSkillId) || selectedCategory !== 'all';
                  const isEdgeDimmed = isAnyActive && !isEdgeActive && !isEdgeGroupActive;

                  const theme = GROUP_THEME_MAP[edge.source.category] || GROUP_THEME_MAP.programming;

                  let strokeColor = 'rgba(52, 59, 73, 0.65)';
                  let strokeWidth = 1.6;

                  if (isEdgeActive) {
                    strokeColor = theme.color;
                    strokeWidth = 2.8;
                  } else if (isEdgeGroupActive) {
                    strokeColor = theme.color;
                    strokeWidth = 2.2;
                  }

                  return (
                    <line
                      key={edge.id}
                      id={`edge-${edge.id}`}
                      x1={edge.source.coords.x}
                      y1={edge.source.coords.y}
                      x2={edge.target.coords.x}
                      y2={edge.target.coords.y}
                      className={`constellation-line ${isEdgeActive ? 'active' : ''} ${isEdgeDimmed ? 'dimmed' : ''}`}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      filter={isEdgeActive ? 'url(#constellationGlow)' : undefined}
                    />
                  );
                })}
              </g>

              {/* Constellation Skill Nodes */}
              <g className="constellation-nodes-group">
                {SKILLS.map((skill) => {
                  const isSelected = selectedSkillId === skill.id;
                  const isHovered = hoveredSkillId === skill.id;
                  const isFocused = focusedSkillId === skill.id;
                  const isActive = isSelected || isHovered || isFocused;
                  const isNeighbor = activeNeighbors.has(skill.id);
                  const isHighlightedByProject = highlightedSkillIds.includes(skill.id);

                  const q = searchQuery.trim().toLowerCase();
                  const isSearchMatch =
                    !q ||
                    skill.title.toLowerCase().includes(q) ||
                    skill.symbol.toLowerCase().includes(q) ||
                    skill.desc.toLowerCase().includes(q);

                  const isGroupMatch = selectedCategory === 'all' || skill.category === selectedCategory;
                  const isDimmed = !isSearchMatch || !isGroupMatch || (activeSkillId && !isActive && !isNeighbor && isGroupMatch && isSearchMatch);

                  const theme = GROUP_THEME_MAP[skill.category] || GROUP_THEME_MAP.programming;
                  const isAnchor = skill.tier === 'anchor';
                  const baseRadius = isAnchor ? 28 : 20;
                  const orbitRadius = isAnchor ? 38 : 28;

                  return (
                    <g
                      key={skill.id}
                      id={`constellation-node-${skill.id}`}
                      className={`constellation-node ${isActive ? 'active' : ''} ${isNeighbor ? 'neighbor' : ''} ${isDimmed ? 'dimmed' : ''}`}
                      transform={`translate(${skill.coords.x}, ${skill.coords.y})`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Skill: ${skill.title} (${skill.groupLabel}). ${isAnchor ? 'Core Anchor.' : ''} Press Enter to inspect.`}
                      aria-pressed={isSelected}
                      onClick={() => handleSelectSkill(skill.id)}
                      onMouseEnter={() => handleNodeMouseEnter(skill.id)}
                      onMouseLeave={handleNodeMouseLeave}
                      onFocus={() => setFocusedSkillId(skill.id)}
                      onBlur={() => setFocusedSkillId(null)}
                      onKeyDown={(e) => handleNodeKeyDown(e, skill)}
                    >
                      {/* Outer Glow Halo */}
                      {isActive && (
                        <circle
                          r={baseRadius + 14}
                          fill={theme.glow}
                          filter="url(#activeNodeGlow)"
                          className="node-glow-halo"
                        />
                      )}

                      {/* Orbital Dash Ring */}
                      <circle
                        r={orbitRadius}
                        fill="none"
                        stroke={isActive ? theme.color : theme.border}
                        strokeWidth={isActive ? '1.5' : '1'}
                        strokeDasharray={isAnchor ? '4 4' : '2 4'}
                        className={`node-orbit-ring ${isAnchor ? 'orbit-anchor' : ''} ${isActive ? 'orbit-active' : ''}`}
                      />

                      {/* Node Core Circle */}
                      <circle
                        r={baseRadius}
                        fill={`url(#nodeGrad-${skill.category})`}
                        stroke={isActive ? theme.color : (isNeighbor ? theme.text : theme.border)}
                        strokeWidth={isActive ? '2.5' : '1.5'}
                        className="node-core-circle"
                      />

                      {/* Skill Symbol */}
                      <text
                        y={0}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className={`node-symbol-text ${isAnchor ? 'symbol-anchor' : ''}`}
                        style={{
                          fontSize: skill.symbol.length >= 4 ? '10px' : (skill.symbol.length === 3 ? '12px' : (isAnchor ? '16px' : '13.5px')),
                          pointerEvents: 'none'
                        }}
                        fill={isActive ? '#C6A45A' : (isNeighbor ? theme.text : '#E9E2D4')}
                      >
                        {skill.symbol}
                      </text>

                      {/* High-Contrast Skill Title Label */}
                      <text
                        y={baseRadius + 16}
                        textAnchor="middle"
                        className={`node-title-label ${isActive ? 'label-active' : ''}`}
                        style={{ pointerEvents: 'none' }}
                        fill={isActive ? '#C6A45A' : '#A9B1BF'}
                      >
                        {skill.title}
                      </text>

                      {/* Project Link Beacon */}
                      {isHighlightedByProject && (
                        <g className="node-project-beacon" transform={`translate(${Math.round(baseRadius * 0.72)}, ${-Math.round(baseRadius * 0.72)})`}>
                          <circle r="6" fill="#C6A45A" stroke="#080A0F" strokeWidth="1.5" />
                        </g>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Deep Context Inspector Drawer */}
          {selectedSkill && (
            <aside className="skill-context-drawer open" id="skill-context-drawer" aria-label="Selected Skill Details">
              <div className="drawer-header">
                <div className="drawer-symbol-badge">
                  {selectedSkill.symbol}
                </div>
                <div className="drawer-title-group">
                  <span className="drawer-category-tag">
                    {selectedSkill.groupLabel}
                  </span>
                  <h3 className="drawer-title">{selectedSkill.title}</h3>
                  <span className="drawer-tier-badge">
                    {selectedSkill.tier === 'anchor' ? 'Primary Anchor Primitive' : 'Applied Specialist'}
                  </span>
                </div>
              </div>

              <div className="drawer-body">
                <div className="drawer-section">
                  <span className="drawer-section-label">ENGINEERING CONTEXT</span>
                  <p className="drawer-desc">{selectedSkill.desc}</p>
                </div>

                {/* Connected Skills Hop Navigation */}
                <div className="drawer-section">
                  <span className="drawer-section-label">
                    CONSTELLATION LINKS ({selectedSkill.connections?.length || 0})
                  </span>
                  <div className="drawer-connected-pills">
                    {(selectedSkill.connections || []).map((connId) => {
                      const connSkill = SKILLS.find((s) => s.id === connId);
                      if (!connSkill) return null;
                      const connTheme = GROUP_THEME_MAP[connSkill.category] || GROUP_THEME_MAP.programming;
                      return (
                        <button
                          key={connId}
                          type="button"
                          className="drawer-neighbor-pill"
                          title={`Hop to ${connSkill.title}`}
                          onClick={() => handleSelectSkill(connId)}
                        >
                          <span className="pill-dot" style={{ backgroundColor: connTheme.color }} />
                          <span className="pill-name">{connSkill.title}</span>
                          <span className="pill-arrow">→</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Deployed in Projects */}
                <div className="drawer-section">
                  <span className="drawer-section-label">DEPLOYED IN REAL SYSTEMS</span>
                  <div className="drawer-projects-list">
                    {selectedSkill.projectIds && selectedSkill.projectIds.length > 0 ? (
                      selectedSkill.projectIds.map((pId) => {
                        const prj = PROJECT_MAP[pId];
                        if (!prj) return null;
                        return (
                          <button
                            key={pId}
                            type="button"
                            className="drawer-project-jump-btn"
                            onClick={() => {
                              if (typeof onJumpToProject === 'function') {
                                onJumpToProject(prj.id);
                              } else {
                                const el = document.getElementById(prj.id);
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                          >
                            <span className="jump-proj-name">{prj.name}</span>
                            <span className="jump-arrow">→</span>
                          </button>
                        );
                      })
                    ) : (
                      <span className="drawer-no-proj">
                        Foundational computer science primitive studied through academic coursework.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Responsive Mobile / Touch Quick-Select Strip */}
        <div className="constellation-mobile-cluster-strip" aria-label="Quick skill selector">
          <span className="strip-label">Quick Select ({filteredSkills.length} competencies):</span>
          <div className="mobile-pills-row">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkillId === skill.id;
              const theme = GROUP_THEME_MAP[skill.category] || GROUP_THEME_MAP.programming;
              return (
                <button
                  key={skill.id}
                  type="button"
                  className={`mobile-skill-chip ${isSelected ? 'active' : ''}`}
                  style={{
                    borderColor: isSelected ? theme.color : undefined,
                    color: isSelected ? '#E9E2D4' : undefined
                  }}
                  onClick={() => handleSelectSkill(skill.id)}
                >
                  <span className="chip-symbol" style={{ color: theme.color }}>{skill.symbol}</span>
                  <span className="chip-name">{skill.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
