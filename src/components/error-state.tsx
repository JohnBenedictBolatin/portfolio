'use client';

import Link from 'next/link';
import { RobotHead } from '@/components/portfolio-mascot';

type ErrorStateProps = {
  code: string;
  title: string;
  description: string;
  retry?: () => void;
  global?: boolean;
};

export function ErrorState({ code, title, description, retry, global = false }: ErrorStateProps) {
  return (
    <section
      className={`error-screen${global ? ' error-screen-global' : ''}`}
      aria-labelledby="error-title"
      role={retry ? 'alert' : 'status'}
    >
      <div className="error-screen-copy">
        <p className="eyebrow">[ error: {code} ]</p>
        <h1 id="error-title">{title}</h1>
        <p className="error-screen-description">{description}</p>
        <div className="error-screen-actions">
          {retry ? (
            <button className="primary-link" type="button" onClick={retry}>
              try again
            </button>
          ) : null}
          <Link className={retry ? 'text-link' : 'primary-link'} href="/">
            back to home
          </Link>
        </div>
      </div>
      <div className="error-screen-mascot">
        <RobotHead state="error" />
      </div>
    </section>
  );
}
