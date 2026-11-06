'use client';

import type { PointerEvent } from 'react';
import Image from 'next/image';
import { useState } from 'react';

export function ChromeBrandMark({
  className = 'hero-mark',
  variant = 'metallic',
  portraitMonoSrc,
  portraitColorSrc,
  portraitAlt = 'Portrait of John Benedict',
}: {
  className?: string;
  variant?: 'flat' | 'metallic';
  portraitMonoSrc?: string;
  portraitColorSrc?: string;
  portraitAlt?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hasPortrait =
    variant === 'metallic' && Boolean(portraitMonoSrc && portraitColorSrc);

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (variant === 'flat' || event.pointerType === 'touch') return;
    setIsHovered(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (variant === 'flat' || event.pointerType === 'touch') return;

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
      className={`chrome-brand-mark ${className}`}
      data-variant={variant}
      data-hovered={isHovered}
      role={hasPortrait ? 'img' : undefined}
      aria-label={hasPortrait ? portraitAlt : undefined}
      aria-hidden={hasPortrait ? undefined : true}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-mark-stage">
        {variant === 'metallic' ? (
          hasPortrait ? (
            <div className="hero-mark-portrait-frame">
              <div className="hero-mark-portrait-inner">
                <Image
                  className="hero-mark-portrait hero-mark-portrait-mono"
                  src={portraitMonoSrc!}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 144px, 300px"
                  loading="eager"
                  draggable={false}
                />
                <Image
                  className="hero-mark-portrait hero-mark-portrait-color"
                  src={portraitColorSrc!}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 144px, 300px"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </div>
          ) : (
            <div className="hero-mark-face hero-mark-front">
              <div className="hero-mark-chrome">
                <span className="hero-mark-ray" aria-hidden="true" />
              </div>
            </div>
          )
        ) : (
          <span className="hero-mark-flat" />
        )}
      </div>
    </div>
  );
}
