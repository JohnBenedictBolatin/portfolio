'use client';

import type { CSSProperties, PointerEvent } from 'react';
import { useEffect, useState } from 'react';

const pixelColumns = 24;
const pixelRows = 24;
const imageHeightInCells = pixelRows * (773 / 694);
const verticalCropInCells = (imageHeightInCells - pixelRows) / 2;
const pixelTiles = Array.from({ length: pixelColumns * pixelRows }, (_, index) => ({
  index,
  column: index % pixelColumns,
  row: Math.floor(index / pixelColumns),
}));
const pixelRevealOrder = new Map(
  [...pixelTiles]
    .sort((a, b) => {
      const aColumnLayer = Math.min(a.column, pixelColumns - 1 - a.column);
      const bColumnLayer = Math.min(b.column, pixelColumns - 1 - b.column);
      const aRowLayer = Math.min(a.row, pixelRows - 1 - a.row);
      const bRowLayer = Math.min(b.row, pixelRows - 1 - b.row);

      return aColumnLayer - bColumnLayer || aRowLayer - bRowLayer || a.index - b.index;
    })
    .map(({ index }, order) => [index, order] as const),
);
const placeholderPortrait =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 240 216%22%3E%3Crect width=%22240%22 height=%22216%22 fill=%22%23131313%22/%3E%3Ccircle cx=%22120%22 cy=%2277%22 r=%2234%22 fill=%22%23777777%22/%3E%3Cpath d=%22M48 216c8-51 32-76 72-76s64 25 72 76%22 fill=%22%23555555%22/%3E%3C/svg%3E';

export function ChromeBrandMark({
  className = 'hero-mark',
  portraitSrc,
}: {
  className?: string;
  portraitSrc?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoRevealed, setIsAutoRevealed] = useState(true);
  const supportsPixelReveal = className === 'hero-mark';
  const pixelImage = portraitSrc ?? placeholderPortrait;
  const isRevealed = supportsPixelReveal && (isHovered || isAutoRevealed);

  useEffect(() => {
    if (!supportsPixelReveal) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let imageTimer: ReturnType<typeof setTimeout> | undefined;
    let logoTimer: ReturnType<typeof setTimeout> | undefined;
    let isActive = !reducedMotion.matches;

    function clearTimers() {
      if (imageTimer) clearTimeout(imageTimer);
      if (logoTimer) clearTimeout(logoTimer);
      imageTimer = undefined;
      logoTimer = undefined;
    }

    function scheduleLogo() {
      if (!isActive) return;
      logoTimer = setTimeout(() => {
        setIsAutoRevealed(false);
        imageTimer = setTimeout(() => {
          setIsAutoRevealed(true);
          scheduleLogo();
        }, 8000);
      }, 5000);
    }

    function handleMotionPreferenceChange() {
      clearTimers();
      isActive = !reducedMotion.matches;
      setIsAutoRevealed(isActive);
      scheduleLogo();
    }

    if (isActive) scheduleLogo();
    else setIsAutoRevealed(false);
    reducedMotion.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      clearTimers();
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [supportsPixelReveal]);

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;
    setIsHovered(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;

    setIsHovered(true);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    event.currentTarget.style.setProperty('--mark-tilt-x', `${(0.5 - y) * 12}deg`);
    event.currentTarget.style.setProperty('--mark-tilt-y', `${(x - 0.5) * 12}deg`);
    event.currentTarget.style.setProperty('--mark-light-x', `${x * 100}%`);
    event.currentTarget.style.setProperty('--mark-light-y', `${y * 100}%`);
  }

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    setIsHovered(false);
    event.currentTarget.style.removeProperty('--mark-tilt-x');
    event.currentTarget.style.removeProperty('--mark-tilt-y');
    event.currentTarget.style.removeProperty('--mark-light-x');
    event.currentTarget.style.removeProperty('--mark-light-y');
  }

  return (
    <div
      className={`chrome-brand-mark ${className}${isRevealed && supportsPixelReveal ? ' is-revealed' : ''}`}
      data-hovered={isHovered}
      aria-hidden="true"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-mark-stage">
        <div className="hero-mark-face hero-mark-front">
          <div className="hero-mark-chrome">
            <span className="hero-mark-ray" aria-hidden="true" />
          </div>
        </div>
        {supportsPixelReveal && (
          <div className="hero-mark-pixels" aria-hidden="true">
            {pixelTiles.map(({ index, column, row }) => {
              const order = pixelRevealOrder.get(index) ?? index;
              const backgroundPositionY =
                ((verticalCropInCells + row) / (imageHeightInCells - 1)) * 100;

              return (
                <span
                  key={index}
                  style={{
                    '--pixel-delay': `${order * 0.8}ms`,
                    '--pixel-reverse-delay': `${(pixelTiles.length - order - 1) * 0.8}ms`,
                    backgroundImage: `url("${pixelImage}")`,
                    backgroundSize: `${pixelColumns * 100}% ${imageHeightInCells * 100}%`,
                    backgroundPosition: `${(column / (pixelColumns - 1)) * 100}% ${backgroundPositionY}%`,
                  } as CSSProperties}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
