'use client';

import { useEffect, useRef } from 'react';

const SPACING = 7;
const FONT_SIZE = 5;
const MAX_DPR = 1.5;
const GLYPHS = ['.', ':', "'", '-', '.', '.', ':'];

function stableNoise(index: number) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

export function AsciiArtBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let color = '#f5f5f5';
    let fontFamily = 'monospace';

    const readTheme = () => {
      color = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || color;
      fontFamily = getComputedStyle(document.body).fontFamily || fontFamily;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      context.font = `${FONT_SIZE}px ${fontFamily}`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      const columns = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let row = 0; row < rows; row += 1) {
        const y = row / rows;
        const yFade = 1 - y * 0.52;

        for (let column = 0; column < columns; column += 1) {
          const index = row * columns + column;
          const x = column / columns;
          const horizontalWave = Math.sin(x * 19 + Math.sin(y * 13) * 1.65);
          const diagonalWave = Math.cos(y * 15 - x * 8.5);
          const contourWave = Math.sin(x * 31 + y * 11) * 0.22;
          const contour = horizontalWave * 0.58 + diagonalWave * 0.34 + contourWave;
          const density = Math.max(0, Math.min(1, (contour + 0.48) / 1.48));

          // Open dark pockets between broad, gently folded bands like the reference texture.
          if (density < 0.12 || stableNoise(index + 17) > 0.84 + density * 0.14) continue;

          const glyph = GLYPHS[Math.floor(stableNoise(index + 91) * GLYPHS.length)];
          context.globalAlpha = (0.07 + density * 0.2) * yFade;
          context.fillText(glyph, column * SPACING, row * SPACING);
        }
      }

      context.globalAlpha = 1;
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    readTheme();
    resize();

    const themeObserver = new MutationObserver(() => {
      readTheme();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      themeObserver.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="ascii-art-background" aria-hidden="true" />;
}
