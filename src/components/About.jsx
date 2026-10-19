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
          { opacity: 0, y: 24, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: photoRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section is-in-view" id="about" ref={sectionRef} aria-labelledby="about-title">
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
            {/* 1. Original Photograph */}
            <div className="about-portrait-frame" id="about-portrait-frame">
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
