'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [atPageEnd, setAtPageEnd] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const pageBottom = document.documentElement.scrollHeight;
      const viewportBottom = window.scrollY + window.innerHeight;
      setAtPageEnd(viewportBottom >= pageBottom - 24);
    }

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    const pageResizeObserver = new ResizeObserver(updateVisibility);
    pageResizeObserver.observe(document.documentElement);

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
      pageResizeObserver.disconnect();
    };
  }, []);

  if (!atPageEnd) return null;

  return (
    <a className="back-to-top" href="#top" aria-label="Back to top" title="Back to top">
      <ArrowUp size={18} aria-hidden="true" />
    </a>
  );
}
