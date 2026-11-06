'use client';

import Link, { useLinkStatus } from 'next/link';
import { useEffect, useId, type ComponentProps } from 'react';
import { mascotActivity } from '@/lib/mascot-activity';

function NavigationActivity() {
  const { pending } = useLinkStatus();
  const id = useId();

  useEffect(() => {
    mascotActivity.navigation(id, pending);
    return () => mascotActivity.navigation(id, false);
  }, [id, pending]);

  return null;
}

export default function ActivityLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link {...props}>
      {children}
      <NavigationActivity />
    </Link>
  );
}
