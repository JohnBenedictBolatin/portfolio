'use client';

import type { PointerEvent } from 'react';

function InterestBackdrop({ interest }: { interest: string }) {
  return (
    <svg className="interest-card-art" viewBox="0 0 240 150" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {interest === 'Software engineering' && (
        <g>
          <path d="M-8 27h101M12 39h20m8 0h42M12 51h9m8 0h32M24 63h43M12 75h17M24 87h32M12 99h10" />
          <path d="m171 19-12 12 12 12m25-24 12 12-12 12m-10-29-9 34" />
          <path d="M170 100h18m8 0h37M156 112h33m8 0h49M168 124h46M156 136h22m8 0h50" />
          <path d="M40 119v15h69m-4-4 4 4-4 4M224 51v19h-14" />
          <circle cx="40" cy="115" r="3" /><circle cx="210" cy="70" r="3" />
        </g>
      )}
      {interest === 'Full-stack development' && (
        <g>
          <path d="m9 27 36-17 36 17-36 17-36-17Zm0 12 36 17 36-17M9 51l36 17 36-17" />
          <path d="M45 71v23q0 7 7 7h29M81 101h15m-5-4 5 4-5 4" />
          <rect x="168" y="78" width="62" height="21" rx="4" /><rect x="168" y="105" width="62" height="21" rx="4" />
          <path d="M183 88h35m-35 28h35M199 68V40h-41M104 22h40m-26 9h26" />
          <circle cx="176" cy="88" r="1.5" /><circle cx="176" cy="116" r="1.5" /><circle cx="154" cy="40" r="3" />
        </g>
      )}
      {interest === 'Artificial intelligence' && (
        <g>
          <path d="m8 29 37-13 35 24-24 32L16 63 8 29Zm37-13 11 56M8 29l48 43M16 63l-9 43 35 26 39-17-25-43M42 132l14-60M7 106l74 9" />
          <path d="m161 16 35 18 39-17m-74-1 15 48 20-30 30 45 9-62M176 64l-19 41 31 30 43-19-5-37-50-15Zm20-30-8 101m-31-30 74 11" />
          {[[8,29],[45,16],[80,40],[56,72],[16,63],[7,106],[42,132],[81,115],[161,16],[196,34],[235,17],[176,64],[226,79],[157,105],[188,135],[231,116]].map(([cx, cy]) => (
            <circle className="interest-card-node" key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
          ))}
        </g>
      )}
      {interest === 'Software architecture' && (
        <g>
          <rect x="14" y="13" width="45" height="23" rx="4" /><rect x="10" y="69" width="32" height="22" rx="3" /><rect x="57" y="69" width="32" height="22" rx="3" />
          <path d="M36 36v16H26v17m10-17h37v17M26 91v26h34M73 91v13" />
          <rect x="169" y="17" width="55" height="27" rx="4" /><rect x="145" y="107" width="36" height="24" rx="3" /><rect x="198" y="107" width="36" height="24" rx="3" />
          <path d="M196 44v40h-33v23m33-23h20v23M181 119h17M59 25h32m62 5h16M183 27h28m-28 7h17" />
          <circle cx="94" cy="25" r="3" /><circle cx="73" cy="107" r="3" /><circle cx="64" cy="117" r="3" />
        </g>
      )}
    </svg>
  );
}

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
    event.currentTarget.style.setProperty('--interest-art-x', `${(x - 50) * 0.045}px`);
    event.currentTarget.style.setProperty('--interest-art-y', `${(y - 50) * 0.045}px`);
    event.currentTarget.dataset.pointerActive = 'true';
  }

  function handlePointerLeave(event: PointerEvent<HTMLLIElement>) {
    event.currentTarget.style.removeProperty('--interest-light-x');
    event.currentTarget.style.removeProperty('--interest-light-y');
    event.currentTarget.style.removeProperty('--interest-art-x');
    event.currentTarget.style.removeProperty('--interest-art-y');
    delete event.currentTarget.dataset.pointerActive;
  }

  return (
    <li
      className="interest-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="interest-card-surface">
        <span className="interest-card-texture" aria-hidden="true" />
        <InterestBackdrop interest={interest} />
        <span className="card-cursor-glow" aria-hidden="true" />
        <span className="interest-card-title">{interest}</span>
      </div>
    </li>
  );
}
