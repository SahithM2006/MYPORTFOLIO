/**
 * Cursor-Tracking 3D Portfolio Hero — High Performance Edition
 * 60 FPS zero-lag canvas renderer with shortest-path circular lerp
 * Preserves the exact signature 360-degree rotation algorithm, angular interpolation,
 * eye-contact deadzone, frame sequence, and assets.
 * 
 * Performance & UX:
 * 1. Restored full 1920x1080 character canvas rendering (complete head, face, shoulders, torso).
 * 2. True render pausing when hero is scrolled out of view.
 * 3. Passive scroll position tracking avoiding layout thrashing inside RAF.
 * 4. High-DPI support capped at 2.0.
 * 5. Subtle accent cursor for fine pointers only, disabled for coarse touch & reduced motion.
 */

// Configuration & State (EXACT ORIGINAL ALGORITHM & VALUES PRESERVED)
const CONFIG = {
  numFrames: 64,
  lerpFactor: 0.26,             // Smooth ~35ms responsive tracking
  deadzoneRadiusRatio: 0.12,    // 12% screen radius for direct eye contact
  backgroundColor: '#21132D',   // Deep Aubergine foundation
  faceCenterInImage: { x: 0.50, y: 0.38 }
};

const state = {
  frames: [],
  centerImage: null,
  isFramesLoaded: false,
  isCenterLoaded: false,
  cursor: { x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500, y: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400 },
  smoothCursor: { x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500, y: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400 },
  ringCursor: { x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500, y: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400 },
  prevCursor: { x: -1, y: -1 },
  currentAngle: -Math.PI / 2,   // Starts looking UP / Center
  targetAngle: -Math.PI / 2,
  isEyeContact: true,
  currentFrameIndex: 0,
  lastDrawnImage: null,
  isRendering: true
};

const geo = {
  width: 0,
  height: 0,
  dpr: 1,
  drawWidth: 1920,
  drawHeight: 1080,
  drawX: 0,
  drawY: 0,
  faceCenterX: 960,
  faceCenterY: 410,
  deadzoneRadius: 100,
  needsRedraw: true
};

let cachedScrollY = 0;
let isPreloadingStarted = false;

// 1. High Performance Asset Preloader (Original loader)
async function preloadAssets() {
  if (isPreloadingStarted) return;
  isPreloadingStarted = true;

  const centerImg = new Image();
  centerImg.src = './center.webp';
  centerImg.onload = () => {
    state.centerImage = centerImg;
    state.isCenterLoaded = true;
    geo.needsRedraw = true;
  };

  const framePromises = [];
  const loadedFrames = new Array(CONFIG.numFrames);

  for (let i = 0; i < CONFIG.numFrames; i++) {
    const promise = new Promise((resolve) => {
      const img = new Image();
      const padded = String(i).padStart(3, '0');
      img.src = `./frames/frame_${padded}.webp`;
      img.onload = () => {
        loadedFrames[i] = img;
        resolve(true);
      };
      img.onerror = () => {
        resolve(false);
      };
    });
    framePromises.push(promise);
  }

  const results = await Promise.all(framePromises);
  const successCount = results.filter(Boolean).length;

  if (successCount === CONFIG.numFrames) {
    state.frames = loadedFrames;
    state.isFramesLoaded = true;
    geo.needsRedraw = true;
  } else {
    console.warn(`[!] Loaded ${successCount}/${CONFIG.numFrames} frames.`);
  }
}

// 2. Shortest-Path Angular Lerp (Original)
function lerpAngle(current, target, factor) {
  let diff = target - current;
  while (diff < -Math.PI) diff += Math.PI * 2;
  while (diff > Math.PI) diff -= Math.PI * 2;
  return current + diff * factor;
}

export function initCharacterRenderer() {
  const canvas = document.getElementById('character-canvas');
  if (!canvas) return () => {};

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return () => {};

  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  state.isRendering = true;
  geo.needsRedraw = true;

  // Passive scroll position cache avoids synchronous layout reflows during RAF
  cachedScrollY = window.scrollY || 0;
  const onScroll = () => {
    cachedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // 3. Geometry Caching & Capped High-DPI (Original full canvas sizing & drawing logic)
  function updateGeometry() {
    if (!canvas) return;
    geo.dpr = Math.min(window.devicePixelRatio || 1, 2);
    geo.width = window.innerWidth;
    geo.height = window.innerHeight;

    canvas.width = Math.round(geo.width * geo.dpr);
    canvas.height = Math.round(geo.height * geo.dpr);
    canvas.style.width = `${geo.width}px`;
    canvas.style.height = `${geo.height}px`;

    if (ctx) {
      ctx.setTransform(geo.dpr, 0, 0, geo.dpr, 0, 0);
    }

    const imgWidth = 1920;
    const imgHeight = 1080;
    const scale = Math.max(geo.width / imgWidth, geo.height / imgHeight);

    geo.drawWidth = imgWidth * scale;
    geo.drawHeight = imgHeight * scale;

    const xOffset = geo.width > 992 ? Math.min(geo.width * 0.14, 200) : 0;
    geo.drawX = (geo.width - geo.drawWidth) * 0.5 + xOffset;
    geo.drawY = (geo.height - geo.drawHeight) * 0.5;

    geo.faceCenterX = geo.drawX + geo.drawWidth * CONFIG.faceCenterInImage.x;
    geo.faceCenterY = geo.drawY + geo.drawHeight * CONFIG.faceCenterInImage.y;
    geo.deadzoneRadius = Math.min(geo.width, geo.height) * CONFIG.deadzoneRadiusRatio;
    geo.needsRedraw = true;
  }

  let resizeFrameId = null;
  const onResize = () => {
    if (!resizeFrameId) {
      resizeFrameId = requestAnimationFrame(() => {
        resizeFrameId = null;
        updateGeometry();
      });
    }
  };
  window.addEventListener('resize', onResize, { passive: true });
  updateGeometry();

  // 4. Pointer Tracking
  const onPointerMove = (e) => {
    state.cursor.x = e.clientX;
    state.cursor.y = e.clientY;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });

  // 5. Visibility Observer: Pauses canvas rendering when hero is scrolled out of view
  let isHeroVisible = true;
  let renderFrameId = null;
  const heroEl = document.getElementById('hero');
  let heroObserver = null;

  if ('IntersectionObserver' in window && heroEl) {
    heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const wasVisible = isHeroVisible;
        isHeroVisible = entry.isIntersecting;
        if (isHeroVisible && !wasVisible && state.isRendering) {
          geo.needsRedraw = true;
          if (!renderFrameId) {
            renderFrameId = requestAnimationFrame(render);
          }
        }
      });
    }, { threshold: 0.01 });
    heroObserver.observe(heroEl);
  }

  // 6. High-Performance Render Loop (Original 60 FPS logic)
  function render() {
    if (!state.isRendering) {
      renderFrameId = null;
      return;
    }

    // Subtle Custom Cursor Updates
    if (isFinePointer && !prefersReducedMotion) {
      if (cursorDot && (state.cursor.x !== state.prevCursor.x || state.cursor.y !== state.prevCursor.y)) {
        cursorDot.style.transform = `translate3d(${state.cursor.x}px, ${state.cursor.y}px, 0) translate(-50%, -50%)`;
        state.prevCursor.x = state.cursor.x;
        state.prevCursor.y = state.cursor.y;
      }

      const ringDx = state.cursor.x - state.ringCursor.x;
      const ringDy = state.cursor.y - state.ringCursor.y;
      if (Math.abs(ringDx) > 0.05 || Math.abs(ringDy) > 0.05) {
        state.ringCursor.x += ringDx * 0.22;
        state.ringCursor.y += ringDy * 0.22;
        if (cursorRing) {
          cursorRing.style.transform = `translate3d(${state.ringCursor.x}px, ${state.ringCursor.y}px, 0) translate(-50%, -50%)`;
        }
      }
    }

    if (!isHeroVisible) {
      renderFrameId = null;
      return;
    }

    const faceScreenX = geo.faceCenterX;
    const faceScreenY = geo.faceCenterY - cachedScrollY;
    const dx = state.cursor.x - faceScreenX;
    const dy = state.cursor.y - faceScreenY;
    const distance = Math.hypot(dx, dy);

    const isEyeContact = distance < geo.deadzoneRadius;
    if (isEyeContact !== state.isEyeContact) {
      state.isEyeContact = isEyeContact;
    }

    state.targetAngle = Math.atan2(dy, dx);
    state.currentAngle = lerpAngle(state.currentAngle, state.targetAngle, CONFIG.lerpFactor);

    let imageToDraw = null;

    if (isEyeContact || !state.isFramesLoaded) {
      imageToDraw = state.centerImage;
    } else if (state.isFramesLoaded) {
      let normalized = state.currentAngle + Math.PI / 2;
      while (normalized < 0) normalized += Math.PI * 2;
      while (normalized >= Math.PI * 2) normalized -= Math.PI * 2;

      const frameIdx = Math.round((normalized / (Math.PI * 2)) * CONFIG.numFrames) % CONFIG.numFrames;
      state.currentFrameIndex = frameIdx;
      imageToDraw = state.frames[frameIdx];
    }

    if (ctx && (imageToDraw !== state.lastDrawnImage || geo.needsRedraw)) {
      if (imageToDraw && imageToDraw.complete && imageToDraw.naturalWidth > 0) {
        ctx.drawImage(imageToDraw, geo.drawX, geo.drawY, geo.drawWidth, geo.drawHeight);
        state.lastDrawnImage = imageToDraw;
        geo.needsRedraw = false;
      } else if (!state.lastDrawnImage) {
        ctx.fillStyle = CONFIG.backgroundColor;
        ctx.fillRect(0, 0, geo.width, geo.height);
      }
    }

    renderFrameId = requestAnimationFrame(render);
  }

  const onVisibilityChange = () => {
    if (document.hidden) {
      state.isRendering = false;
      if (renderFrameId) {
        cancelAnimationFrame(renderFrameId);
        renderFrameId = null;
      }
    } else {
      if (!state.isRendering) {
        state.isRendering = true;
        if (!renderFrameId) {
          renderFrameId = requestAnimationFrame(render);
        }
      }
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  preloadAssets();
  renderFrameId = requestAnimationFrame(render);

  // Return cleanup function for React Strict Mode / component unmount
  return () => {
    state.isRendering = false;
    if (renderFrameId) {
      cancelAnimationFrame(renderFrameId);
      renderFrameId = null;
    }
    if (resizeFrameId) {
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = null;
    }
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    if (heroObserver) {
      heroObserver.disconnect();
    }
  };
}
