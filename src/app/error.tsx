'use client';

import { useEffect } from 'react';
import { mascotActivity } from '@/lib/mascot-activity';

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    mascotActivity.routeError(true);
    return () => mascotActivity.routeError(false);
  }, [error]);

  return (
    <section className="page-heading">
      <h1>couldn’t load this page.</h1>
      <p className="page-description">Please try again.</p>
      <button className="primary-link" type="button" onClick={retry}>
        try again
      </button>
    </section>
  );
}
