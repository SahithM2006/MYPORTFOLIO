import React from 'react';

/**
 * High-precision inline SVG tech and architecture icons
 * Clean, lightweight, and matching the dark technical aesthetic.
 */
export default function TechIcon({ name, className = '', size = 18 }) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: `tech-svg-icon ${className}`
  };

  switch (name) {
    case 'python':
      return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M11.914 0C5.82 0 6.19 2.656 6.19 2.656l.006 2.753h5.83v.825H3.84S0 5.768 0 11.91c0 6.14 3.375 5.923 3.375 5.923h2.012v-2.825s-.109-3.375 3.308-3.375h5.688s3.2 0 3.2-3.125V2.656S18.01 0 11.914 0zm-3.23 1.83a1.082 1.082 0 1 1 0 2.164 1.082 1.082 0 0 1 0-2.164z" opacity="0.9" fill="#38BDF8" />
          <path d="M12.086 24c6.094 0 5.724-2.656 5.724-2.656l-.006-2.753h-5.83v-.825h8.186S24 18.232 24 12.09c0-6.14-3.375-5.923-3.375-5.923h-2.012v2.825s.109 3.375-3.308 3.375H9.617s-3.2 0-3.2 3.125v5.782s-.425 2.726 5.67 2.726zm3.23-1.83a1.082 1.082 0 1 1 0-2.164 1.082 1.082 0 0 1 0 2.164z" opacity="0.9" fill="#E5A93C" />
        </svg>
      );

    case 'fastapi':
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke="#14B8A6" strokeWidth="2" />
          <path d="M13 3L6 14h6l-1 7 8-11h-6l1-7z" fill="#14B8A6" stroke="none" />
        </svg>
      );

    case 'numpy':
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="#38BDF8">
          <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth="1.75" />
          <path d="M7 8v8l5-8v8" strokeWidth="2" />
          <circle cx="17" cy="8" r="1.5" fill="#38BDF8" stroke="none" />
          <circle cx="17" cy="12" r="1.5" fill="#38BDF8" stroke="none" />
          <circle cx="17" cy="16" r="1.5" fill="#38BDF8" stroke="none" />
        </svg>
      );

    case 'windows':
      return (
        <svg {...props} viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M0 3.449L9.75 2.1v9.451H0V3.449zm0 17.102l9.75 1.349v-9.4H0v8.051zm10.701 1.492L24 24V11.551H10.701v10.492zM24 0l-13.299 1.843v9.708H24V0z" fill="#38BDF8" />
        </svg>
      );

    case 'git':
      return (
        <svg {...props} viewBox="0 0 24 24" fill="none" stroke="#FB7185">
          <circle cx="6" cy="6" r="3" strokeWidth="2" />
          <circle cx="6" cy="18" r="3" strokeWidth="2" />
          <circle cx="18" cy="9" r="3" strokeWidth="2" />
          <path d="M6 9v6" strokeWidth="2" />
          <path d="M9 6h3a3 3 0 0 1 3 3v0" strokeWidth="2" />
        </svg>
      );

    case 'terminal':
      return (
        <svg {...props} stroke="#10B981">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );

    case 'shield':
      return (
        <svg {...props} stroke="#10B981">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" stroke="#10B981" />
        </svg>
      );

    case 'lock':
      return (
        <svg {...props} stroke="#E5A93C">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );

    case 'server':
      return (
        <svg {...props} stroke="#38BDF8">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
          <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
        </svg>
      );

    case 'database':
      return (
        <svg {...props} stroke="#2DD4A7">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );

    case 'cpu':
      return (
        <svg {...props} stroke="#C084FC">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="15" x2="23" y2="15" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="15" x2="4" y2="15" />
        </svg>
      );

    case 'layout':
      return (
        <svg {...props} stroke="#38BDF8">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );

    case 'chart':
      return (
        <svg {...props} stroke="#C084FC">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );

    case 'network':
      return (
        <svg {...props} stroke="#5C87A6">
          <circle cx="12" cy="5" r="3" />
          <circle cx="5" cy="19" r="3" />
          <circle cx="19" cy="19" r="3" />
          <line x1="7.5" y1="17" x2="10.5" y2="7.5" />
          <line x1="16.5" y1="17" x2="13.5" y2="7.5" />
        </svg>
      );

    case 'radar':
      return (
        <svg {...props} stroke="#E5A93C">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="12" x2="19" y2="7" />
          <circle cx="12" cy="12" r="1.5" fill="#E5A93C" />
        </svg>
      );

    case 'message':
      return (
        <svg {...props} stroke="#2DD4A7">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="13" x2="13" y2="13" />
        </svg>
      );

    case 'check-circle':
      return (
        <svg {...props} stroke="#10B981">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      );

    default:
      return (
        <svg {...props} stroke="#6C8EA4">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
  }
}
