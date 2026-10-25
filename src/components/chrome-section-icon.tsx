'use client';

import type { PointerEvent } from 'react';
import { Compass } from 'lucide-react';
import { ModuleIcon, type ModuleIndex } from './module-icon';

const customIcons = {
  compass: Compass,
};

function supportsPointerMotion() {
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function ChromeSectionIcon({
  index,
  iconName,
  size = 27,
  className = '',
}: {
  index: ModuleIndex;
  iconName?: keyof typeof customIcons;
  size?: number;
  className?: string;
}) {
  const icon = iconName ? customIcons[iconName] : undefined;
  function handlePointerMove(event: PointerEvent<HTMLSpanElement>) {
    if (event.pointerType === 'touch' || !supportsPointerMotion()) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    const tiltX = (0.5 - y) * 12;
    const tiltY = (x - 0.5) * 12;
    const stage = event.currentTarget;

    stage.dataset.hovered = 'true';
    stage.style.setProperty('--pointer-x', `${x * 100}%`);
    stage.style.setProperty('--pointer-y', `${y * 100}%`);
    stage.style.setProperty('--tilt-x', `${tiltX}deg`);
    stage.style.setProperty('--tilt-y', `${tiltY}deg`);
  }

  function handlePointerLeave(event: PointerEvent<HTMLSpanElement>) {
    const stage = event.currentTarget;
    stage.dataset.hovered = 'false';
    stage.style.removeProperty('--pointer-x');
    stage.style.removeProperty('--pointer-y');
    stage.style.removeProperty('--tilt-x');
    stage.style.removeProperty('--tilt-y');
  }

  return (
    <span
      className={`chrome-section-icon-stage ${className}`.trim()}
      aria-hidden="true"
      data-hovered="false"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <ModuleIcon
        index={index}
        icon={icon}
        className="section-icon chrome-section-icon"
        chrome
        size={size}
      />
      <ModuleIcon
        index={index}
        icon={icon}
        className="section-icon chrome-section-icon chrome-section-icon-light"
        chrome
        chromeLight
        size={size}
      />
    </span>
  );
}
