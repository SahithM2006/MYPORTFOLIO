import React, { useState, useEffect, useRef } from 'react';
import { PALETTES } from '../data-store.js';

export default function Playground() {
  const [activeLab, setActiveLab] = useState('lab-colour');

  // LAB 1: Colour Lab state
  const [activePaletteId, setActivePaletteId] = useState('aubergine-sage');

  // LAB 2: Data Playground state
  const [sampleN, setSampleN] = useState(40);
  const [noise, setNoise] = useState(0.3);
  const [freq, setFreq] = useState(2.5);

  // LAB 3: Pixel Lab state
  const [pixelSize, setPixelSize] = useState(6);
  const [chromaticShift, setChromaticShift] = useState(4);
  const pixelCanvasRef = useRef(null);

  // LAB 4: Pattern Lab state
  const [patternDensity, setPatternDensity] = useState(16);
  const [patternRotation, setPatternRotation] = useState(45);
  const [patternFolds, setPatternFolds] = useState(6);
  const patternCanvasRef = useRef(null);

  // Palette switch handler
  const handlePaletteChange = (paletteId) => {
    setActivePaletteId(paletteId);
    const pal = PALETTES.find((p) => p.id === paletteId);
    if (!pal) return;

    const rootStyle = document.documentElement.style;
    Object.entries(pal.colors).forEach(([cssVar, colorVal]) => {
      rootStyle.setProperty(cssVar, colorVal);
    });
  };

  const resetPalette = () => {
    handlePaletteChange('aubergine-sage');
  };

  // Lab 2 Data calculation
  const dataPoints = [];
  let sum = 0;
  let maxVal = -Infinity;
  const width = 560;
  const height = 240;

  for (let i = 0; i < sampleN; i++) {
    const t = i / (sampleN - 1);
    const signal = 0.5 + 0.35 * Math.sin(t * Math.PI * freq);
    const randomNoise = (Math.sin(i * 12.9898 + t * 78.233) * 0.5) * noise;
    const yVal = Math.max(0.05, Math.min(0.95, signal + randomNoise));
    sum += yVal;
    if (yVal > maxVal) maxVal = yVal;
    dataPoints.push({
      x: 30 + t * (width - 60),
      y: height - 30 - yVal * (height - 60),
      val: yVal
    });
  }

  const sampleMean = (sum / sampleN).toFixed(3);
  let varianceSum = 0;
  dataPoints.forEach((p) => {
    varianceSum += Math.pow(p.val - Number(sampleMean), 2);
  });
  const sampleVariance = (varianceSum / sampleN).toFixed(4);
  const peakSignal = maxVal.toFixed(3);

  const pathD = dataPoints.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // Lab 3 Pixel canvas effect
  useEffect(() => {
    const canvas = pixelCanvasRef.current;
    if (!canvas || activeLab !== 'lab-pixel') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 320;
    const h = 220;
    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = '#080A0F';
    ctx.fillRect(0, 0, w, h);

    // Draw base graphic
    ctx.fillStyle = '#C6A45A';
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#7596C8';
    ctx.fillRect(w * 0.25, h * 0.25, 70, 70);

    ctx.fillStyle = '#263B60';
    ctx.fillRect(w * 0.55, h * 0.45, 65, 65);

    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Mosaic
      const step = Math.max(1, pixelSize);
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const idx = (y * w + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          for (let dy = 0; dy < step && y + dy < h; dy++) {
            for (let dx = 0; dx < step && x + dx < w; dx++) {
              const targetIdx = ((y + dy) * w + (x + dx)) * 4;
              // Chromatic aberration shift
              const shiftIdx = ((y + dy) * w + Math.min(w - 1, x + dx + chromaticShift)) * 4;
              data[targetIdx] = data[shiftIdx] || r;
              data[targetIdx + 1] = g;
              data[targetIdx + 2] = b;
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
    } catch {
      // safe fallback
    }
  }, [pixelSize, chromaticShift, activeLab]);

  // Lab 4 Pattern canvas effect
  useEffect(() => {
    const canvas = patternCanvasRef.current;
    if (!canvas || activeLab !== 'lab-pattern') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 320;
    const h = 220;
    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = '#080A0F';
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;

    ctx.save();
    ctx.translate(cx, cy);

    for (let ring = 1; ring <= patternDensity; ring++) {
      const radius = (ring / patternDensity) * (Math.min(w, h) * 0.45);
      const angleStep = (Math.PI * 2) / patternFolds;
      const rot = (patternRotation * Math.PI) / 180 + ring * 0.1;

      ctx.beginPath();
      for (let f = 0; f < patternFolds; f++) {
        const theta = f * angleStep + rot;
        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta) * radius;
        if (f === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      ctx.strokeStyle = ring % 2 === 0 ? '#C6A45A' : '#7596C8';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    ctx.restore();
  }, [patternDensity, patternRotation, patternFolds, activeLab]);

  return (
    <section className="playground-section is-in-view" id="playground" aria-labelledby="playground-title">
      <div className="playground-container">
        <div className="playground-header">
          <div className="playground-header-top">
            <span className="lab-live-badge">● 4 LABS ACTIVE</span>
          </div>
          <h2 className="playground-title" id="playground-title">The Creative Playground Console</h2>
          <p className="playground-intro">
            An interactive laboratory exhibiting real-time palette swapping, synthetic regression distributions, pixel matrix manipulation, and algorithmic generative art.
          </p>

          {/* Lab Tab Selectors */}
          <div className="lab-tabs-nav" role="tablist" aria-label="Playground experiments">
            {[
              { id: 'lab-colour', icon: '🎨', label: '01 // Colour Lab' },
              { id: 'lab-data', icon: '📊', label: '02 // Data Playground' },
              { id: 'lab-pixel', icon: '🔬', label: '03 // Pixel Lab' },
              { id: 'lab-pattern', icon: '🌀', label: '04 // Pattern Lab' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`lab-tab-btn ${activeLab === tab.id ? 'active' : ''}`}
                data-lab={tab.id}
                role="tab"
                aria-selected={activeLab === tab.id}
                type="button"
                onClick={() => setActiveLab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="playground-body-card">
          {/* LAB 1: COLOUR LAB */}
          {activeLab === 'lab-colour' && (
            <div className="lab-panel active" id="lab-colour" role="tabpanel" aria-label="Colour Lab">
              <div className="lab-panel-content">
                <div className="lab-text-col">
                  <span className="lab-kicker">EXPERIMENT 01 &bull; DYNAMIC ACCENT SYSTEM</span>
                  <h3 className="lab-heading">Switch Designed CSS Accent Palettes</h3>
                  <p className="lab-desc">
                    Select a tailored palette to watch the entire portfolio's CSS variables, gradients, and hover states transform in real time.
                  </p>
                  <div className="palette-swatches-grid">
                    {PALETTES.map((pal) => (
                      <button
                        key={pal.id}
                        className={`palette-preset-btn ${activePaletteId === pal.id ? 'active' : ''}`}
                        data-palette={pal.id}
                        type="button"
                        onClick={() => handlePaletteChange(pal.id)}
                      >
                        <span className="swatch-dots">
                          <span className="swatch-dot" style={{ background: pal.colors['--color-aubergine-border-hover'] || '#080A0F' }}></span>
                          <span className="swatch-dot" style={{ background: pal.colors['--color-lime'] }}></span>
                          <span className="swatch-dot" style={{ background: pal.colors['--color-violet'] }}></span>
                        </span>
                        <span className="swatch-name">{pal.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="lab-action-row">
                    <button className="btn-lab-reset" id="btn-reset-palette" type="button" onClick={resetPalette}>
                      ↺ Restore Default Palette
                    </button>
                    <a href="#prj-probe360" className="lab-project-link">Connects with Probe360 platform &rarr;</a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB 2: DATA PLAYGROUND */}
          {activeLab === 'lab-data' && (
            <div className="lab-panel active" id="lab-data" role="tabpanel" aria-label="Data Playground">
              <div className="lab-panel-content">
                <div className="lab-text-col">
                  <span className="lab-kicker">EXPERIMENT 02 &bull; SYNTHETIC REGRESSION SIMULATOR</span>
                  <h3 className="lab-heading">Interactive Parametric Signal Curve</h3>
                  <p className="lab-desc">
                    Tweak sample density, variance noise, and frequency parameters to observe live statistical calculations and reactive SVG curve synthesis.
                  </p>
                  <div className="lab-sliders-grid">
                    <div className="slider-group">
                      <div className="slider-label-row">
                        <span>Sample Density (N): {sampleN}</span>
                      </div>
                      <input
                        type="range"
                        id="data-slider-n"
                        min="15"
                        max="80"
                        value={sampleN}
                        aria-label="Sample density slider"
                        onChange={(e) => setSampleN(Number(e.target.value))}
                      />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label-row">
                        <span>Variance / Noise (σ): {noise}</span>
                      </div>
                      <input
                        type="range"
                        id="data-slider-noise"
                        min="0"
                        max="0.8"
                        step="0.05"
                        value={noise}
                        aria-label="Noise slider"
                        onChange={(e) => setNoise(Number(e.target.value))}
                      />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label-row">
                        <span>Modulation Freq (ω): {freq}</span>
                      </div>
                      <input
                        type="range"
                        id="data-slider-freq"
                        min="1"
                        max="6"
                        step="0.5"
                        value={freq}
                        aria-label="Frequency slider"
                        onChange={(e) => setFreq(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="lab-action-row">
                    <button
                      className="btn-lab-reset"
                      id="btn-reset-data-lab"
                      type="button"
                      onClick={() => {
                        setSampleN(40);
                        setNoise(0.3);
                        setFreq(2.5);
                      }}
                    >
                      ↺ Reset Data Parameters
                    </button>
                    <a href="#prj-carbon" className="lab-project-link">Connects with AI Carbon Intelligence &rarr;</a>
                  </div>
                </div>
                <div className="lab-visual-col">
                  <div className="chart-display-card">
                    <svg id="data-playground-svg" className="data-playground-svg" viewBox="0 0 560 240">
                      <path d={pathD} fill="none" stroke="var(--color-lime)" strokeWidth="2.5" />
                      {dataPoints.map((p, idx) => (
                        <circle key={idx} cx={p.x} cy={p.y} r="3.5" fill="var(--color-violet)" stroke="rgba(184, 169, 201, 0.4)" strokeWidth="1" />
                      ))}
                    </svg>
                    <div className="data-metrics-row">
                      <div className="metric-box">
                        <span className="m-label">Sample Mean</span>
                        <strong className="m-val" id="data-metric-mean">{sampleMean}</strong>
                      </div>
                      <div className="metric-box">
                        <span className="m-label">Variance (σ²)</span>
                        <strong className="m-val" id="data-metric-variance">{sampleVariance}</strong>
                      </div>
                      <div className="metric-box">
                        <span className="m-label">Peak Signal</span>
                        <strong className="m-val" id="data-metric-peak">{peakSignal}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB 3: PIXEL LAB */}
          {activeLab === 'lab-pixel' && (
            <div className="lab-panel active" id="lab-pixel" role="tabpanel" aria-label="Pixel Lab">
              <div className="lab-panel-content">
                <div className="lab-text-col">
                  <span className="lab-kicker">EXPERIMENT 03 &bull; MATRIX RESOLUTION SAMPLING</span>
                  <h3 className="lab-heading">Interactive Mosaic &amp; Chromatic Split</h3>
                  <p className="lab-desc">
                    Manipulate sample matrix resolution and chromatic red-blue channel shift on a real canvas in the browser.
                  </p>
                  <div className="lab-sliders-grid">
                    <div className="slider-group">
                      <div className="slider-label-row">
                        <span>Mosaic Pixel Size: {pixelSize}px</span>
                      </div>
                      <input
                        type="range"
                        id="pixel-slider-size"
                        min="1"
                        max="24"
                        value={pixelSize}
                        aria-label="Mosaic pixel size slider"
                        onChange={(e) => setPixelSize(Number(e.target.value))}
                      />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label-row">
                        <span>Chromatic Aberration: {chromaticShift}px</span>
                      </div>
                      <input
                        type="range"
                        id="pixel-slider-shift"
                        min="0"
                        max="14"
                        value={chromaticShift}
                        aria-label="Chromatic channel shift slider"
                        onChange={(e) => setChromaticShift(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="lab-action-row">
                    <button
                      className="btn-lab-reset"
                      id="btn-reset-pixel-lab"
                      type="button"
                      onClick={() => {
                        setPixelSize(6);
                        setChromaticShift(4);
                      }}
                    >
                      ↺ Reset Pixel Parameters
                    </button>
                    <a href="#prj-dip" className="lab-project-link">Connects with DIP Experiments &rarr;</a>
                  </div>
                </div>
                <div className="lab-visual-col">
                  <div className="pixel-canvas-card">
                    <canvas id="pixel-lab-canvas" className="pixel-lab-canvas" ref={pixelCanvasRef}></canvas>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB 4: PATTERN LAB */}
          {activeLab === 'lab-pattern' && (
            <div className="lab-panel active" id="lab-pattern" role="tabpanel" aria-label="Pattern Lab">
              <div className="lab-panel-content">
                <div className="lab-text-col">
                  <span className="lab-kicker">EXPERIMENT 04 &bull; GENERATIVE GEOMETRY</span>
                  <h3 className="lab-heading">Algorithmic Spiral Lattice Generator</h3>
                  <p className="lab-desc">
                    Generate generative abstract geometric patterns by altering density folds, rotational stepping, and radial scale.
                  </p>
                  <div className="lab-sliders-grid">
                    <div className="slider-group">
                      <div className="slider-label-row">
                        <span>Lattice Rings: {patternDensity}</span>
                      </div>
                      <input
                        type="range"
                        id="pattern-slider-density"
                        min="6"
                        max="32"
                        value={patternDensity}
                        aria-label="Lattice density slider"
                        onChange={(e) => setPatternDensity(Number(e.target.value))}
                      />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label-row">
                        <span>Rotation Step: {patternRotation}°</span>
                      </div>
                      <input
                        type="range"
                        id="pattern-slider-rotation"
                        min="0"
                        max="180"
                        step="5"
                        value={patternRotation}
                        aria-label="Rotation step slider"
                        onChange={(e) => setPatternRotation(Number(e.target.value))}
                      />
                    </div>
                    <div className="slider-group">
                      <div className="slider-label-row">
                        <span>Symmetry Folds: {patternFolds}</span>
                      </div>
                      <input
                        type="range"
                        id="pattern-slider-folds"
                        min="3"
                        max="12"
                        value={patternFolds}
                        aria-label="Symmetry folds slider"
                        onChange={(e) => setPatternFolds(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="lab-action-row">
                    <button
                      className="btn-lab-reset"
                      id="btn-reset-pattern-lab"
                      type="button"
                      onClick={() => {
                        setPatternDensity(16);
                        setPatternRotation(45);
                        setPatternFolds(6);
                      }}
                    >
                      ↺ Reset Generative Pattern
                    </button>
                    <a href="#prj-aegis" className="lab-project-link">Connects with AEGIS-TWIN &rarr;</a>
                  </div>
                </div>
                <div className="lab-visual-col">
                  <div className="pattern-canvas-card">
                    <canvas id="pattern-lab-canvas" className="pattern-lab-canvas" ref={patternCanvasRef}></canvas>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
