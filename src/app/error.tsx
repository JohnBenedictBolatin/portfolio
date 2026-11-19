'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/error-state';
import { mascotActivity } from '@/lib/mascot-activity';

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    mascotActivity.routeError(true);
    return () => mascotActivity.routeError(false);
  }, [error]);

  return (
    <ErrorState
      code="runtime"
      title="couldn't load this page."
      description="Something went wrong while opening this page. Try again or head back home."
      retry={retry}
    />
  );
}
