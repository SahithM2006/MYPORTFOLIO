/**
 * Cursor-Tracking 3D Portfolio Hero — High Performance & Ultra-Smooth Edition
 * Physics-based time-delta angular interpolation with subpixel anti-jitter deadband,
 * hysteresis frame thresholding, normalized wraparound phase, and pre-decoded bitmaps.
 * 
 * Preserves the exact signature 360-degree rotation algorithm, angular mapping,
 * eye-contact deadzone ratio, canvas dimensions, frame sequence, and assets.
 * 
 * Performance & UX:
 * 1. Restored full 1920x1080 character canvas rendering (complete head, face, shoulders, torso).
 * 2. True render pausing when hero is scrolled out of view or tab is hidden.
 * 3. Passive scroll position tracking avoiding layout thrashing inside RAF.
 * 4. High-DPI support capped at 2.0.
 * 5. Time-delta independent interpolation (identical feel on 60Hz, 120Hz, 144Hz+).
 * 6. Bitmaps pre-decoded via Image.decode() eliminating initial main-thread drawImage jank.
 */

// Configuration & State
const CONFIG = {
  numFrames: 64,
  angularResponsiveness: 16.0,  // Time-constant lambda for smooth, immediate follow (~62ms decay)
  deadzoneRadiusRatio: 0.12,    // 12% screen radius for direct eye contact
  deadzoneEnterRatio: 0.90,     // Hysteresis enter threshold to prevent border flicker
  deadzoneExitRatio: 1.10,      // Hysteresis exit threshold
  stationaryDeadbandPx: 1.0,    // Deadband in pixels to reject sensor micro-tremors
  frameHysteresis: 0.08,        // Hysteresis fraction of a frame slice (~0.45 deg) to prevent frame flipping
  backgroundColor: '#21132D',   // Deep Aubergine foundation
  faceCenterInImage: { x: 0.50, y: 0.38 }
};

const state = {
  frames: [],
  centerImage: null,
  isFramesLoaded: false,
  isCenterLoaded: false,
  cursor: {
    x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400
  },
  smoothCursor: {
    x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400
  },
  ringCursor: {
    x: typeof window !== 'undefined' ? window.innerWidth * 0.5 : 500,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.5 : 400
  },
  prevCursor: { x: -1, y: -1 },
  currentAngle: -Math.PI / 2,   // Starts looking UP / Center
  targetAngle: -Math.PI / 2,
  isEyeContact: true,
  currentFrameIndex: 0,
  lastDrawnImage: null,
  isRendering: true,
  lastTime: 0
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

// 1. High Performance Asset Preloader with Bitmap Pre-Decoding
async function preloadAssets() {
  if (isPreloadingStarted) return;
  isPreloadingStarted = true;

  const centerImg = new Image();
  centerImg.src = './center.webp';
  centerImg.onload = async () => {
    if (typeof centerImg.decode === 'function') {
      try {
        await centerImg.decode();
      } catch (_) {}
    }
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
      img.onload = async () => {
        if (typeof img.decode === 'function') {
          try {
            await img.decode();
          } catch (_) {}
        }
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
    state.frames = loadedFrames;
    state.isFramesLoaded = true;
    geo.needsRedraw = true;
  }
}

// 2. Pure Shortest-Path Angular Utilities on Unit Circle
function shortestAngleDiff(current, target) {
  const diff = target - current;
  return Math.atan2(Math.sin(diff), Math.cos(diff));
}

function normalizeAngle(angle) {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
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
  state.lastTime = performance.now();

  // Passive scroll position cache avoids synchronous layout reflows during RAF
  cachedScrollY = window.scrollY || 0;
  const onScroll = () => {
    cachedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // 3. Geometry Caching & Capped High-DPI
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

  // 4. Pointer Tracking with Subpixel Noise Deadband
  const onPointerMove = (e) => {
    const dist = Math.hypot(e.clientX - state.cursor.x, e.clientY - state.cursor.y);
    if (dist >= CONFIG.stationaryDeadbandPx) {
      state.cursor.x = e.clientX;
      state.cursor.y = e.clientY;
    }
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
          state.lastTime = performance.now();
          if (!renderFrameId) {
            renderFrameId = requestAnimationFrame(render);
          }
        }
      });
    }, { threshold: 0.01 });
    heroObserver.observe(heroEl);
  }

  // 6. High-Performance Render Loop with Time-Delta Angular Interpolation
  function render(timestamp) {
    if (!state.isRendering) {
      renderFrameId = null;
      return;
    }

    if (!timestamp) timestamp = performance.now();
    const dt = state.lastTime > 0 ? Math.min((timestamp - state.lastTime) / 1000, 0.1) : 0.01667;
    state.lastTime = timestamp;

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

    // Eye contact with smooth dual-boundary hysteresis
    const enterRadius = geo.deadzoneRadius * CONFIG.deadzoneEnterRatio;
    const exitRadius = geo.deadzoneRadius * CONFIG.deadzoneExitRatio;

    let isEyeContact = state.isEyeContact;
    if (!state.isEyeContact && distance < enterRadius) {
      isEyeContact = true;
    } else if (state.isEyeContact && distance > exitRadius) {
      isEyeContact = false;
      // Seamlessly align current angle on deadzone exit to avoid abrupt camera swing
      state.currentAngle = Math.atan2(dy, dx);
    }
    state.isEyeContact = isEyeContact;

    state.targetAngle = Math.atan2(dy, dx);

    // Time-based smooth exponential decay
    const angleDiff = shortestAngleDiff(state.currentAngle, state.targetAngle);
    if (Math.abs(angleDiff) < 0.003) {
      // Micro-angular threshold lock to eliminate stationary floating
      state.currentAngle = state.targetAngle;
    } else {
      const lerpFactor = 1.0 - Math.exp(-CONFIG.angularResponsiveness * dt);
      state.currentAngle += angleDiff * lerpFactor;
    }
    state.currentAngle = normalizeAngle(state.currentAngle);

    let imageToDraw = null;

    if (isEyeContact || !state.isFramesLoaded) {
      imageToDraw = state.centerImage;
    } else if (state.isFramesLoaded) {
      // Map angle to continuous float frame position [0, numFrames)
      // Angle: -PI/2 (UP) corresponds to 0, rotating clockwise:
      // UP (0) -> RIGHT (numFrames/4) -> DOWN (numFrames/2) -> LEFT (3*numFrames/4) -> UP (numFrames)
      let normalized = state.currentAngle + Math.PI / 2;
      normalized = normalizeAngle(normalized);
      if (normalized < 0) normalized += Math.PI * 2;

      const continuousFrame = (normalized / (Math.PI * 2)) * CONFIG.numFrames;

      // Hysteresis deadband on frame transitions to eliminate boundary flickering
      let frameDiff = continuousFrame - state.currentFrameIndex;
      while (frameDiff < -CONFIG.numFrames / 2) frameDiff += CONFIG.numFrames;
      while (frameDiff > CONFIG.numFrames / 2) frameDiff -= CONFIG.numFrames;

      if (Math.abs(frameDiff) >= 0.5 + CONFIG.frameHysteresis) {
        const targetIdx = Math.round(continuousFrame) % CONFIG.numFrames;
        state.currentFrameIndex = (targetIdx + CONFIG.numFrames) % CONFIG.numFrames;
      }

      imageToDraw = state.frames[state.currentFrameIndex];
    }

    // Only redraw canvas if image changed or geometry requires it
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
        state.lastTime = performance.now();
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
