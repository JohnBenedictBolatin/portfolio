'use client';

import type { PointerEvent, ReactNode } from 'react';

function handlePointerMove(event: PointerEvent<HTMLElement>) {
  if (
    event.pointerType === 'touch' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  const bounds = event.currentTarget.getBoundingClientRect();
  if (!bounds.width || !bounds.height) return;

  const x = Math.max(0, Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100));
  const y = Math.max(0, Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100));
  event.currentTarget.style.setProperty('--interest-light-x', `${x}%`);
  event.currentTarget.style.setProperty('--interest-light-y', `${y}%`);
  event.currentTarget.dataset.pointerActive = 'true';
}

function handlePointerLeave(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty('--interest-light-x');
  event.currentTarget.style.removeProperty('--interest-light-y');
  delete event.currentTarget.dataset.pointerActive;
}

export function PointerGlowCard({
  children,
  className,
  labelledBy,
}: {
  children: ReactNode;
  className: string;
  labelledBy: string;
}) {
  return (
    <section
      className={className}
      aria-labelledby={labelledBy}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </section>
  );
}
