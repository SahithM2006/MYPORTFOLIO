import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAREER_STATUS } from '../data-store.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Compact 10-second self-introduction video component.
 * Positioned beside/near the photograph.
 * Ready for a real video asset (/intro.mp4 or /videos/intro.mp4).
 * Shows clear play controls, duration badge, and ready-state placeholder.
 */
function VideoIntroCard({ videoSrc = './videos/intro.mp4', fallbackSrc = './intro.mp4', poster = './user_photo.jpg' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeSrc, setActiveSrc] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef(null);

  // Probe both primary and fallback video locations
  useEffect(() => {
    let isMounted = true;
    fetch(videoSrc, { method: 'HEAD' })
      .then((res) => {
        if (isMounted) {
          if (res.ok) {
            setActiveSrc(videoSrc);
            setIsReady(true);
          } else {
            fetch(fallbackSrc, { method: 'HEAD' })
              .then((res2) => {
                if (isMounted && res2.ok) {
                  setActiveSrc(fallbackSrc);
                  setIsReady(true);
                } else if (isMounted) {
                  setIsReady(false);
                }
              })
              .catch(() => { if (isMounted) setIsReady(false); });
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          fetch(fallbackSrc, { method: 'HEAD' })
            .then((res2) => {
              if (isMounted && res2.ok) {
                setActiveSrc(fallbackSrc);
                setIsReady(true);
              } else if (isMounted) {
                setIsReady(false);
              }
            })
            .catch(() => { if (isMounted) setIsReady(false); });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [videoSrc, fallbackSrc]);

  if (!isReady || !activeSrc) {
    return null;
  }

  const handlePlay = () => {
    setHasError(false);
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          setHasError(true);
        });
      }
    }, 50);
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return (
    <div className="about-video-card" id="about-video-card">
      <div className="video-card-topbar">
        <div className="video-card-title-wrap">
          <span className="video-pulse-beacon" aria-hidden="true" />
          <span className="video-card-heading">10-Sec Video Intro</span>
        </div>
        <span className="video-card-tag">0:10 • HD</span>
      </div>

      <div className="video-card-viewport">
        {isPlaying ? (
          <div className="video-player-container">
            <video
              ref={videoRef}
              src={activeSrc}
              poster={poster}
              playsInline
              controls
              onEnded={handleStop}
              onError={() => setHasError(true)}
              className="about-live-video"
              aria-label="Sahith M. 10-second self-introduction video"
            />
            <button
              type="button"
              className="video-player-close"
              onClick={handleStop}
              aria-label="Close video player"
              title="Close video"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="video-preview-facade" onClick={handlePlay} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handlePlay(); }}>
            <img
              src={poster}
              alt="Video intro thumbnail preview"
              className="video-facade-thumb"
              loading="lazy"
            />
            <div className="video-facade-overlay" />
            <button
              type="button"
              className="video-facade-play-btn"
              aria-label="Play 10-second introduction video"
              onClick={(e) => {
                e.stopPropagation();
                handlePlay();
              }}
            >
              <span className="play-triangle" aria-hidden="true">▶</span>
              <span className="play-label">Play 10s Intro</span>
            </button>
          </div>
        )}
      </div>

      {/* Video Status / Placeholder Prompt */}
      {hasError ? (
        <div className="video-status-notice video-notice-pending">
          <span className="notice-icon" aria-hidden="true">ℹ</span>
          <span>Video ready: place <code>intro.mp4</code> in <code>/public/videos/</code> or <code>/public/</code> to play.</span>
        </div>
      ) : (
        <div className="video-status-notice video-notice-ready">
          <span className="notice-dot" aria-hidden="true" />
          <span>{isReady ? 'Intro video ready to play' : 'Ready for video asset (e.g. /public/videos/intro.mp4)'}</span>
        </div>
      )}
    </div>
  );
}

export default function About({ onSelectSkill, onSelectProject }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const photoRef = useRef(null);

  // Scroll-driven headline wipe via GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0.2 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            end: 'bottom 65%',
            scrub: 0.5
          }
        }
      );

      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { y: 35, opacity: 0.7 },
          {
            y: -30,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          }
        );
      }

      const circuitSvg = sectionRef.current.querySelector('.circuit-svg');
      if (circuitSvg) {
        gsap.fromTo(
          circuitSvg,
          { x: -50, opacity: 0.25 },
          {
            x: 25,
            opacity: 0.75,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section is-in-view" id="about" ref={sectionRef} aria-labelledby="about-title">
      {/* Moving Ambient Technical Circuit Motif with Streaming Electric Pulses */}
      <div className="about-ambient-circuit" aria-hidden="true">
        <svg viewBox="0 0 1000 400" className="circuit-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="electricGradTeal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C6A45A" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#7596C8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C6A45A" stopOpacity="0.85" />
            </linearGradient>
            <filter id="circuitGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path d="M0,80 L250,80 L320,160 L680,160 L750,240 L1000,240" stroke="rgba(117, 150, 200, 0.18)" strokeWidth="1.5" strokeDasharray="6 6" fill="none" className="circuit-path-1" />
          <path d="M0,80 L250,80 L320,160 L680,160 L750,240 L1000,240" stroke="url(#electricGradTeal)" strokeWidth="2" strokeDasharray="16 120" fill="none" className="circuit-path-stream-1" filter="url(#circuitGlow)" />
          <path d="M0,280 L180,280 L240,200 L560,200 L620,120 L1000,120" stroke="rgba(38, 59, 96, 0.25)" strokeWidth="1.5" strokeDasharray="8 8" fill="none" className="circuit-path-2" />
          <path d="M0,280 L180,280 L240,200 L560,200 L620,120 L1000,120" stroke="#C6A45A" strokeWidth="1.8" strokeDasharray="14 100" fill="none" className="circuit-path-stream-2" filter="url(#circuitGlow)" />
          <path d="M120,400 L200,320 L400,320 L480,240 L900,240" stroke="rgba(198, 164, 90, 0.15)" strokeWidth="1.2" strokeDasharray="4 6" fill="none" className="circuit-path-3" />
          <circle cx="320" cy="160" r="4.5" fill="#C6A45A" className="circuit-node-pulse" />
          <circle cx="680" cy="160" r="4.5" fill="#C6A45A" className="circuit-node-pulse" />
          <circle cx="240" cy="200" r="4" fill="#7596C8" className="circuit-node-pulse" />
          <circle cx="620" cy="120" r="4" fill="#7596C8" className="circuit-node-pulse" />
          <circle cx="480" cy="240" r="3.5" fill="#C6A45A" className="circuit-node-pulse" />
        </svg>
      </div>

      <div className="about-container">
        {/* Section Headline */}
        <div className="about-header-block">
          <h2 className="about-headline" id="about-title" ref={headlineRef}>
            <span className="statement-prefix">Engineering mindset grounded in </span>
            <span className="statement-highlight scroll-chromatic-phrase">first principles, telemetry &amp; models.</span>
          </h2>
        </div>

        {/* Profile Grid: Left column (Photograph + 10s Video Component), Right column (Bio & Education) */}
        <div className="about-portrait-row">

          {/* Left Column: Original Photograph + Compact 10s Video Component */}
          <div className="about-portrait-col" ref={photoRef}>
            {/* 1. Original Photograph with Cyber Sensor Viewfinder Overlay */}
            <div className="about-portrait-frame" id="about-portrait-frame">
              <div className="about-portrait-viewfinder" aria-hidden="true">
                <span className="viewfinder-bracket bracket-tl">⌜</span>
                <span className="viewfinder-bracket bracket-tr">⌝</span>
                <span className="viewfinder-bracket bracket-bl">⌞</span>
                <span className="viewfinder-bracket bracket-br">⌟</span>
                <div className="viewfinder-scan-beam"></div>
                <div className="viewfinder-hud-tag">
                  <span className="hud-pulse"></span>
                  <span>13.08°N 80.27°E // SEC CHENNAI</span>
                </div>
              </div>
              <div className="about-portrait-inner">
                <img
                  src="./user_photo.jpg"
                  alt="Sahith M. — AI & Data Science undergraduate at Saveetha Engineering College, Chennai"
                  className="about-portrait-img"
                  loading="eager"
                  decoding="async"
                  width="480"
                  height="640"
                />
              </div>
              <div className="about-portrait-badge" aria-hidden="true">
                <span className="portrait-badge-dot" />
                <span>Sahith M. &bull; Engineering Profile</span>
              </div>
            </div>

            {/* 2. Compact 10-Second Self-Introduction Video Component */}
            <VideoIntroCard videoSrc="./videos/intro.mp4" fallbackSrc="./intro.mp4" poster="./user_photo.jpg" />
          </div>

          {/* Right Column: Bio Narrative & Academic Foundation (Redundant Concepts Column Removed) */}
          <div className="about-bio-main-col">
            <div className="about-bio-column">
              <p className="about-intro-paragraph">
                I am <strong>Sahith M.</strong>, an AI &amp; Data Science undergraduate at{' '}
                <strong>Saveetha Engineering College (Autonomous), Chennai</strong>. I build practical software where applied machine learning, agentless systems telemetry, and graph intelligence converge on real operational problems — from memory primitives up, not from frameworks down.
              </p>

              <div className="about-compact-education" aria-label="Academic details">
                <span className="edu-tag-icon" aria-hidden="true">🎓</span>
                <div className="edu-details-text">
                  <span className="edu-degree-text">B.Tech in AI &amp; Data Science (3rd Year)</span>
                  <span className="edu-divider">&bull;</span>
                  <span className="edu-college-text">Saveetha Engineering College (Autonomous)</span>
                  <span className="edu-divider">&bull;</span>
                  <span className="edu-timeline-text">{CAREER_STATUS.academicPeriod}</span>
                </div>
              </div>

              {/* Core Engineering Domains */}
              <div className="about-domain-pills-row" aria-label="Primary technical domains">
                <span className="domain-pill">
                  <span className="domain-pill-dot dot-security" />
                  <span>Agentless Systems Telemetry</span>
                </span>
                <span className="domain-pill">
                  <span className="domain-pill-dot dot-graphs" />
                  <span>Temporal Graph Analytics</span>
                </span>
                <span className="domain-pill">
                  <span className="domain-pill-dot dot-aiml" />
                  <span>Applied Machine Learning</span>
                </span>
                <span className="domain-pill">
                  <span className="domain-pill-dot dot-systems" />
                  <span>Low-Level Primitives (C &amp; Python)</span>
                </span>
              </div>

              {/* Direct Action Links */}
              <div className="about-actions-row">
                <a href="#projects" className="about-action-btn btn-primary-action">
                  <span>Explore Projects</span>
                  <span className="btn-arrow" aria-hidden="true">↓</span>
                </a>
                <a href="#skills" className="about-action-btn btn-secondary-action">
                  <span>Skill Constellation</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </a>
                <a href="#resume" className="about-action-btn btn-tertiary-action">
                  <span>View Resume</span>
                  <span className="btn-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
