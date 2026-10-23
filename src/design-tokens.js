/**
 * ============================================================================
 * SAHITH M. — CENTRALIZED DESIGN TOKENS
 * Concept: "An Independent Mind, Always Evolving."
 * 
 * Visual Architecture:
 * - Obsidian foundation representing calm depth and focus
 * - Neutral deep charcoal surfaces for technical readability
 * - Midnight blue depth lighting evoking space and contemplation
 * - Muted steel blue for networks, data streams, and systems
 * - Champagne gold for focal actions, active states, and distinctions
 * - High-contrast ivory & slate typography for clarity
 * ============================================================================
 */

export const PALETTE = {
  // Foundations
  obsidian: '#07090E',
  obsidianSubtle: '#0B0E15',
  charcoal: '#10141D',
  charcoalAlt: '#131822',
  charcoalCard: '#141A28',
  charcoalCardHover: '#192032',
  charcoalElevated: '#161D2B',

  // Atmospheric Midnight Blue
  midnight: '#182338',
  midnightDeep: '#111A2C',
  midnightSubtle: 'rgba(24, 35, 56, 0.45)',

  // Interactive Steel Blue
  steel: '#7596C8',
  steelHover: '#8EAEE0',
  steelDeep: '#4A6E9E',
  steelSubtle: 'rgba(117, 150, 200, 0.14)',
  steelBorder: 'rgba(117, 150, 200, 0.35)',

  // Champagne Gold Focal Accent
  gold: '#C6A45A',
  goldHover: '#D8BA72',
  goldDeep: '#9A7D3C',
  goldSubtle: 'rgba(198, 164, 90, 0.14)',
  goldBorder: 'rgba(198, 164, 90, 0.35)',

  // Typography
  textHeading: '#ECE6D8', // Warm Ivory
  textBody: '#A6B2C4',    // Neutral Slate
  textMuted: '#7B889B',   // Cool Blue-Grey
  textSubtle: '#4D586B',  // Dim Technical

  // Borders
  borderSubtle: 'rgba(255, 255, 255, 0.07)',
  borderMedium: 'rgba(255, 255, 255, 0.14)',
  borderStrong: 'rgba(255, 255, 255, 0.22)'
};

export const TYPOGRAPHY = {
  fontDisplay: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontMono: "'JetBrains Mono', monospace"
};

export const SECTION_ATMOSPHERES = {
  hero: {
    bg: '#07090E',
    accent: '#C6A45A',
    label: '01 ORIGIN',
    theme: 'obsidian-gold'
  },
  about: {
    bg: '#0D111A',
    accent: '#7596C8',
    label: '02 MINDSET',
    theme: 'charcoal-steel'
  },
  skills: {
    bg: '#080B11',
    accent: '#7596C8',
    label: '03 SPECTRUM',
    theme: 'obsidian-spectrum'
  },
  projects: {
    bg: '#0E131E',
    accent: '#C6A45A',
    label: '04 EXHIBITS',
    theme: 'midnight-exhibits'
  },
  architecture: {
    bg: '#0A0E17',
    accent: '#7596C8',
    label: '05 SYSTEMS',
    theme: 'charcoal-blueprint'
  },
  experience: {
    bg: '#070A10',
    accent: '#C6A45A',
    label: '06 TIMELINE',
    theme: 'obsidian-timeline'
  },
  certifications: {
    bg: '#0D121B',
    accent: '#7596C8',
    label: '07 CREDENTIALS',
    theme: 'charcoal-credentials'
  },
  resume: {
    bg: '#06080D',
    accent: '#C6A45A',
    label: '08 DOSSIER',
    theme: 'obsidian-dossier'
  },
  contact: {
    bg: '#0C1019',
    accent: '#C6A45A',
    label: '09 TRANSMIT',
    theme: 'midnight-transmit'
  },
  footer: {
    bg: '#040508',
    accent: '#7596C8',
    label: 'TELEMETRY',
    theme: 'ground-obsidian'
  }
};

export const MOTION = {
  easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  easeInOutExpo: 'cubic-bezier(0.65, 0, 0.35, 1)',
  durationFast: '200ms',
  durationNormal: '350ms',
  durationSlow: '600ms'
};
