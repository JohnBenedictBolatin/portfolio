'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import styles from './seedrover-detail.module.css';

const SnapshotRobot = dynamic(
  () => import('@/components/portfolio-mascot').then((module) => module.RobotHead),
  { ssr: false },
);

export function SeedRoverSnapshotMascot({ enabled, paused }: { enabled: boolean; paused: boolean }) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [inView, setInView] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const celebrationTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!enabled || !anchor) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && entry.intersectionRatio >= 0.65) setRevealed(true);
    }, { threshold: [0, 0.65], rootMargin: '0px 0px -24px 0px' });
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => () => clearTimeout(celebrationTimer.current), []);

  return (
    <div ref={anchorRef} className={`${styles.snapshotCompanion} seedrover-snapshot-companion`} data-revealed={revealed}>
      <button
        type="button"
        className={styles.snapshotCompanionButton}
        aria-label="Make JB Bot celebrate"
        onClick={() => {
          clearTimeout(celebrationTimer.current);
          setCelebrating(true);
          celebrationTimer.current = setTimeout(() => setCelebrating(false), 2200);
        }}
      >
        {enabled && (
          <SnapshotRobot waitForReady state={celebrating ? 'celebrating' : 'idle'} active={revealed && inView && !paused} />
        )}
      </button>
    </div>
  );
}
