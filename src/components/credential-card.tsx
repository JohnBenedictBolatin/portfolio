'use client';

import Image from 'next/image';
import type { PointerEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Credential } from '@/data/credentials';

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeZone: 'UTC',
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

function LinkedInLearningMark() {
  return (
    <svg className="credential-linkedin-mark" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="5.3" cy="5.4" r="1.8" />
      <path d="M3.7 8.7h3.2v10H3.7zm5.2 0H12v1.4c.7-1.1 1.8-1.8 3.4-1.8 3.3 0 4 2.2 4 5v5.4h-3.3v-4.8c0-1.2 0-2.6-1.7-2.6s-2 1.3-2 2.6v4.8H8.9z" />
    </svg>
  );
}

export function CredentialCard({ credential }: { credential: Credential }) {
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
      className="interest-card credential-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="credential-card-surface">
        <span className="credential-card-glow" aria-hidden="true" />
        <div className="credential-card-content">
          <div className="credential-card-heading">
            <h3>{credential.title}</h3>
            {credential.image && (
              <Image
                className="credential-badge-art"
                src={credential.image.src}
                alt={credential.image.alt}
                width={56}
                height={56}
                unoptimized
              />
            )}
            {credential.issuer === 'LinkedIn Learning' && <LinkedInLearningMark />}
          </div>
          {credential.issuer !== 'Salesforce Trailhead' && (
            <p className="credential-issuer">{credential.issuer}</p>
          )}
          <div className="credential-meta">
            <span>{credential.kind}</span>
            {credential.issuedOn && <time dateTime={credential.issuedOn}>{formatDate(credential.issuedOn)}</time>}
          </div>
          {credential.evidence && credential.kind !== 'Superbadge' && (
            <a
              className="credential-evidence"
              href={credential.evidence.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link-underline-label">{credential.evidence.label}</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
