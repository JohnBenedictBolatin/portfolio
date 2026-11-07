'use client';

import { useEffect, useRef, useState } from 'react';

type Metric = { label: string; value: number };

const countDuration = 1100;
const formatCount = (value: number) => String(value).padStart(2, '0');

export function HomeMetrics({ metrics }: { metrics: Metric[] }) {
  const container = useRef<HTMLDivElement>(null);
  // Keep the real totals in the server-rendered page and without JavaScript.
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const element = container.current;
    if (!element) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches) return;

    let frame = 0;
    let observer: IntersectionObserver | null = null;
    let inView = false;
    let started = false;
    let startedAt: number | null = null;
    let entranceStarted = Number.parseFloat(window.getComputedStyle(element).opacity) > 0;

    function tick(now: number) {
      startedAt ??= now;
      const nextProgress = Math.min((now - startedAt) / countDuration, 1);
      setProgress(nextProgress);
      if (nextProgress < 1) frame = window.requestAnimationFrame(tick);
    }

    function startCount() {
      if (started || !inView || !entranceStarted || motionPreference.matches) return;
      started = true;
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(tick);
    }

    function handleEntrance(event: AnimationEvent) {
      if (event.target !== element) return;
      entranceStarted = true;
      startCount();
    }

    function handleMotionPreference() {
      if (!motionPreference.matches) return;
      started = true;
      observer?.disconnect();
      window.cancelAnimationFrame(frame);
      setProgress(1);
    }

    frame = window.requestAnimationFrame(() => setProgress(0));
    // The hero has a delayed entrance; wait for it so counting stays visible.
    element.addEventListener('animationstart', handleEntrance);
    element.addEventListener('animationend', handleEntrance);
    motionPreference.addEventListener('change', handleMotionPreference);

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting && entry.intersectionRatio >= 0.5;
          startCount();
        },
        { threshold: 0.5 },
      );
      observer.observe(element);
    } else {
      inView = true;
      startCount();
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      element.removeEventListener('animationstart', handleEntrance);
      element.removeEventListener('animationend', handleEntrance);
      motionPreference.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  const easedProgress = progress === null ? 1 : 1 - (1 - progress) ** 3;

  return (
    <div ref={container} className="hero-intro hero-stats" aria-label="Portfolio overview">
      {metrics.map(({ label, value }) => (
        <div className="hero-stat" key={label}>
          <span className="hero-stat-value">
            <span className="sr-only">{formatCount(value)}</span>
            <span className="hero-stat-value-window" aria-hidden="true">
              <span className="hero-stat-value-hover-track">
                <span className="hero-stat-value-count-slot">
                  <span
                    className="hero-stat-value-count-track"
                    style={{ transform: `translate3d(0, -${value * easedProgress * 1.2}em, 0)` }}
                  >
                    {Array.from({ length: value + 1 }, (_, count) => (
                      <span key={count}>{formatCount(count)}</span>
                    ))}
                  </span>
                </span>
                <span className="hero-stat-value-hover-copy">{formatCount(value)}</span>
              </span>
            </span>
          </span>
          <span className="hero-stat-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
