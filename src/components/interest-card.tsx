'use client';

import type { PointerEvent } from 'react';

export function InterestCard({ interest }: { interest: string }) {
  function handlePointerMove(event: PointerEvent<HTMLLIElement>) {
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

  function handlePointerLeave(event: PointerEvent<HTMLLIElement>) {
    event.currentTarget.style.removeProperty('--interest-light-x');
    event.currentTarget.style.removeProperty('--interest-light-y');
    delete event.currentTarget.dataset.pointerActive;
  }

  return (
    <li
      className="interest-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="interest-card-surface">
        <span className="interest-card-ray" aria-hidden="true" />
        <span className="interest-card-title">{interest}</span>
      </div>
    </li>
  );
}
