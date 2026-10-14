import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { SKILLS, SKILL_CATEGORIES } from '../data-store.js';

const PROJECT_MAP = {
  probe360: { name: 'Probe360 Agentless Security', id: 'prj-probe360' },
  'mule-matrix': { name: 'Mule Matrix — Fraud & Mule Tracing', id: 'prj-mule-matrix' },
  'csi-origin': { name: 'Mule Matrix — Fraud & Mule Tracing', id: 'prj-mule-matrix' },
  carbon: { name: 'AI Carbon Intelligence', id: 'prj-carbon' },
  aegis: { name: 'AEGIS-TWIN Cyber Digital Twin', id: 'prj-aegis' }
};

const GROUP_THEME_MAP = {
  programming: {
    color: '#5C87A6',
    border: 'rgba(92, 135, 166, 0.45)',
    glow: 'rgba(92, 135, 166, 0.4)',
    tagBg: 'rgba(92, 135, 166, 0.16)',
    text: '#8FAEC2',
    name: 'Programming'
  },
  'ai-ml': {
    color: '#10B981',
    border: 'rgba(16, 185, 129, 0.45)',
    glow: 'rgba(16, 185, 129, 0.4)',
    tagBg: 'rgba(16, 185, 129, 0.16)',
    text: '#34D399',
    name: 'AI & Machine Learning'
  },
  'data-science': {
    color: '#14B8A6',
    border: 'rgba(20, 184, 166, 0.45)',
    glow: 'rgba(20, 184, 166, 0.4)',
    tagBg: 'rgba(20, 184, 166, 0.16)',
    text: '#2DD4BF',
    name: 'Data Science'
  },
  development: {
    color: '#38BDF8',
    border: 'rgba(56, 189, 248, 0.45)',
    glow: 'rgba(56, 189, 248, 0.4)',
    tagBg: 'rgba(56, 189, 248, 0.16)',
    text: '#7DD3FC',
    name: 'Development'
  },
  tools: {
    color: '#E5A93C',
    border: 'rgba(229, 169, 60, 0.45)',
    glow: 'rgba(229, 169, 60, 0.4)',
    tagBg: 'rgba(229, 169, 60, 0.16)',
    text: '#FBBF24',
    name: 'Tools'
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
  const searchInputRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const handleNodeMouseEnter = useCallback((skillId) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSkillId(skillId);
    }, 60);
  }, []);

  const handleNodeMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSkillId(null);
    }, 60);
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

    // Pulse highlight connected project cards in the project gallery
    const skill = SKILLS.find((s) => s.id === id);
    if (skill?.projectIds?.length) {
      skill.projectIds.forEach((pId) => {
        const card = document.getElementById(`prj-${pId}`);
        if (card) {
          card.classList.add('skill-connected-highlight');
          setTimeout(() => card.classList.remove('skill-connected-highlight'), 2000);
        }
      });
    }
  }, [propOnSelectSkill]);

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

  // Keyboard navigation within constellation: arrow keys hop to connected neighbors
  const handleNodeKeyDown = (e, skill) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelectSkill(skill.id);
    } else if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      const neighbors = skill.connections || [];
      if (neighbors.length > 0) {
        // Find neighbor based on directional distance
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
        <div className="skills-header">
          <div className="skills-header-top">
            <span className="skills-kicker">INTERCONNECTED ARCHITECTURE</span>
            <button
              className="btn-reset-skills"
              id="btn-reset-skills"
              title="Reset constellation to overview"
              type="button"
              onClick={resetView}
            >
              ↺ Reset Constellation
            </button>
          </div>
          <h2 className="skills-title" id="skills-title">Interactive Skill Constellation</h2>
          <p className="skills-intro">
            A flowing, interconnected ecosystem of technical capabilities across Programming, AI &amp; Machine Learning, Data Science, Development, and Tools. Hover or focus any node to illuminate technical relationships, explore architecture dependencies, and trace connected projects.
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

            <div className="category-filters-row" role="tablist" aria-label="Filter skills by constellation group">
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className={`skill-filter-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                  data-category={cat.id}
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Constellation Visual Stage */}
        <div
          className="constellation-wrapper"
          id="constellation-wrapper"
          role="region"
          aria-label="Interactive skill constellation network"
        >
          {/* Ambient Cosmic Backdrop */}
          <div className="constellation-ambient-glow" aria-hidden="true" />

          <svg
            className="constellation-stage"
            id="constellation-stage"
            viewBox="0 0 1000 600"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="false"
          >
            <defs>
              {/* Radial Gradients for Node Cores */}
              <radialGradient id="nodeGrad-programming" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#254256" />
                <stop offset="100%" stopColor="#0B1720" />
              </radialGradient>
              <radialGradient id="nodeGrad-ai-ml" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#134E3C" />
                <stop offset="100%" stopColor="#071913" />
              </radialGradient>
              <radialGradient id="nodeGrad-data-science" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#115049" />
                <stop offset="100%" stopColor="#061A17" />
              </radialGradient>
              <radialGradient id="nodeGrad-development" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#194860" />
                <stop offset="100%" stopColor="#081822" />
              </radialGradient>
              <radialGradient id="nodeGrad-tools" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#573D17" />
                <stop offset="100%" stopColor="#1E1408" />
              </radialGradient>

              {/* Luminous Glow Filter */}
              <filter id="constellationGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="activeNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Constellation Cluster Monikers */}
            <g className="constellation-cluster-labels" aria-hidden="true">
              <text x="370" y="160" className="cluster-moniker">PROGRAMMING</text>
              <text x="755" y="105" className="cluster-moniker">AI &amp; MACHINE LEARNING</text>
              <text x="770" y="350" className="cluster-moniker">DATA SCIENCE</text>
              <text x="210" y="210" className="cluster-moniker">DEVELOPMENT &amp; SYSTEMS</text>
              <text x="470" y="60" className="cluster-moniker">TOOLS &amp; SECURITY</text>
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

                let strokeColor = 'rgba(94, 153, 179, 0.22)';
                let strokeWidth = 1.1;

                if (isEdgeActive) {
                  strokeColor = theme.color;
                  strokeWidth = 2.4;
                } else if (isEdgeGroupActive) {
                  strokeColor = theme.color;
                  strokeWidth = 1.8;
                }

                return (
                  <line
                    key={edge.id}
                    id={`edge-${edge.id}`}
                    x1={edge.source.coords.x}
                    y1={edge.source.coords.y}
                    x2={edge.target.coords.x}
                    y2={edge.target.coords.y}
                    className={`constellation-line ${isEdgeActive ? 'line-active' : ''} ${isEdgeDimmed ? 'line-dimmed' : ''}`}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
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
                    className={`constellation-node ${isActive ? 'node-active' : ''} ${isNeighbor ? 'node-neighbor' : ''} ${isDimmed ? 'node-dimmed' : ''} ${isHighlightedByProject ? 'node-project-linked' : ''}`}
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
                    {/* Outer Ambient Glow / Active Bloom */}
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

                    {/* Skill Monospace Symbol */}
                    <text
                      y={0}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className={`node-symbol-text ${isAnchor ? 'symbol-anchor' : ''}`}
                      style={{
                        fontSize: skill.symbol.length >= 4 ? '10px' : (skill.symbol.length === 3 ? '12px' : (isAnchor ? '16px' : '13.5px'))
                      }}
                      fill={isActive ? '#FFFFFF' : (isNeighbor ? theme.text : '#E2E8F0')}
                    >
                      {skill.symbol}
                    </text>

                    {/* Skill Label (Placed below node) */}
                    <text
                      y={baseRadius + 15}
                      textAnchor="middle"
                      className={`node-title-label ${isActive ? 'label-active' : ''}`}
                      fill={isActive ? '#FFFFFF' : '#CBD5E1'}
                    >
                      {skill.title}
                    </text>

                    {/* Group Badge Indicator */}
                    <text
                      y={baseRadius + 26}
                      textAnchor="middle"
                      className="node-group-label"
                      fill={theme.text}
                    >
                      {skill.groupLabel}
                    </text>

                    {/* Project Link Beacon Vector Badge */}
                    {isHighlightedByProject && (
                      <g className="node-project-beacon" transform={`translate(${Math.round(baseRadius * 0.72)}, ${-Math.round(baseRadius * 0.72)})`}>
                        <circle r="6.5" fill="#E5A93C" stroke="#091322" strokeWidth="1.5" />
                        <path
                          d="M -0.5 -3.2 L 1.8 -0.5 L 0.2 -0.5 L 1.2 3.2 L -1.8 -0.2 L -0.2 -0.2 Z"
                          fill="#091322"
                        />
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Responsive Mobile / Touch Cluster Strip */}
        <div className="constellation-mobile-cluster-strip" aria-label="Quick skill selector">
          <span className="strip-label">Quick Select ({filteredSkills.length} skills):</span>
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
                    color: isSelected ? '#FFFFFF' : undefined
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

        {filteredSkills.length === 0 && (
          <div id="skills-empty-state" className="skills-empty-state" style={{ display: 'block' }}>
            <p>No matching skills found in this constellation query. Try searching for "Python", "API", or "Security".</p>
          </div>
        )}

        {/* Deep Skill Context Inspector */}
        {selectedSkill && (
          <div className="skill-context-drawer open" id="skill-context-drawer" aria-live="polite">
            <div className="context-drawer-inner">
              <div className="drawer-header-row">
                <div className="drawer-title-group">
                  <div className="drawer-tags-bar">
                    <span
                      className="constellation-cat-pill"
                      style={{
                        backgroundColor: (GROUP_THEME_MAP[selectedSkill.category] || GROUP_THEME_MAP.programming).tagBg,
                        color: (GROUP_THEME_MAP[selectedSkill.category] || GROUP_THEME_MAP.programming).text,
                        borderColor: (GROUP_THEME_MAP[selectedSkill.category] || GROUP_THEME_MAP.programming).color
                      }}
                    >
                      {selectedSkill.groupLabel.toUpperCase()} &bull; {selectedSkill.symbol}
                    </span>
                    <span className="drawer-tier-badge">
                      {selectedSkill.tier === 'anchor' ? 'PRIMARY ECOSYSTEM ANCHOR' : 'DOMAIN SPECIALIST'}
                    </span>
                  </div>
                  <h4 className="drawer-skill-title" id="drawer-skill-name">
                    {selectedSkill.title}
                  </h4>
                </div>

                {/* Ecosystem Connections Ribbon in Inspector */}
                <div className="drawer-connections-preview">
                  <span className="drawer-conn-title">Constellation Links ({selectedSkill.connections?.length || 0}):</span>
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
                          title={`Hop to ${connSkill.title} in the constellation`}
                          onClick={() => handleSelectSkill(connId)}
                        >
                          <span className="pill-dot" style={{ backgroundColor: connTheme.color }} />
                          <span className="pill-name">{connSkill.title}</span>
                          <span className="pill-arrow">&rarr;</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <p className="drawer-description" id="drawer-skill-desc">
                {selectedSkill.desc}
              </p>

              <div className="drawer-related-projects">
                <span className="drawer-rel-label">Featured in Projects:</span>
                <div className="drawer-project-links" id="drawer-project-links">
                  {selectedSkill.projectIds?.length > 0 ? (
                    selectedSkill.projectIds.map((pId) => {
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
                    })
                  ) : (
                    <span className="drawer-no-proj">Foundational Core Architecture</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
