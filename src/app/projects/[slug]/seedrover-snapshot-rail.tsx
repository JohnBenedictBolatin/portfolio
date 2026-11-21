'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';
import styles from './seedrover-detail.module.css';
import { SeedRoverSnapshotMascot } from './seedrover-snapshot-mascot';

const snapshots = ['01', '02', '03', '04', '05'];
const ikonekScreenshots = [
  {
    number: '01',
    src: '/images/ikon1.png',
    alt: 'iKonek sign-in page alongside artwork introducing the platform.',
    aspectRatio: 2.1,
  },
  {
    number: '02',
    src: '/images/ikon2.png',
    alt: 'iKonek discussion feed showing posts, topic filters, and trending tags.',
    aspectRatio: 2.1,
  },
  {
    number: '03',
    src: '/images/ikon3.png',
    alt: 'iKonek announcements feed with a barangay waste collection update.',
    aspectRatio: 2.1,
  },
  {
    number: '04',
    src: '/images/ikon4.png',
    alt: 'iKonek document request dashboard showing request and payment statuses.',
    aspectRatio: 2.1,
  },
  {
    number: '05',
    src: '/images/ikon5.png',
    alt: 'iKonek Barangay Certificate page showing its requirements and request action.',
    aspectRatio: 2.1,
  },
] as const;
const seedroverScreenshots = [
  {
    number: '01',
    src: '/images/seed5.png',
    alt: 'SeedRover rover prototype with the SeedRover logo and seed containers.',
    aspectRatio: 4096 / 3072,
  },
  {
    number: '02',
    src: '/images/seed1.png',
    alt: 'SeedRover operations dashboard with sales, inventory, and crop summaries.',
    aspectRatio: 1916 / 1077,
  },
  {
    number: '03',
    src: '/images/seed2.png',
    alt: 'SeedRover inventory screen with item quantities, pricing, and stock cards.',
    aspectRatio: 1917 / 1077,
  },
  {
    number: '04',
    src: '/images/seed3.png',
    alt: 'SeedRover costing screen with farm cost records and investment performance.',
    aspectRatio: 1916 / 1075,
  },
  {
    number: '05',
    src: '/images/seed4.png',
    alt: 'SeedRover crops screen with crop batches, care status, and harvest history.',
    aspectRatio: 1917 / 1077,
  },
] as const;

export function ProjectSnapshotRail({
  projectTitle,
  projectSlug,
}: {
  projectTitle: string;
  projectSlug: string;
}) {
  const railRef = useRef<HTMLElement>(null);
  const connectorId = useId().replace(/:/g, '');
  const [visibleCount, setVisibleCount] = useState(1);
  const viewerRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const [selectedSnapshot, setSelectedSnapshot] = useState('01');
  const [viewerOpen, setViewerOpen] = useState(false);
  const projectScreenshots =
    projectSlug === 'ikonek-176b'
      ? ikonekScreenshots
      : projectSlug === 'seedrover'
        ? seedroverScreenshots
        : [];
  const selectedScreenshot = projectScreenshots.find(({ number }) => number === selectedSnapshot);

  const handleSnapshotPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
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
  };

  const handleSnapshotPointerLeave = (event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.removeProperty('--interest-light-x');
    event.currentTarget.style.removeProperty('--interest-light-y');
    delete event.currentTarget.dataset.pointerActive;
  };

  const openSnapshot = (number: string, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setSelectedSnapshot(number);
    setViewerOpen(true);
    viewerRef.current?.showModal();
  };

  useEffect(() => {
    if (!viewerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [viewerOpen]);

  useEffect(() => {
    const svg = railRef.current?.querySelector<SVGSVGElement>('[data-connectors]');
    const light = svg?.querySelector<SVGRadialGradientElement>('[data-reflection-light]');
    if (!svg || !light || !window.matchMedia('(any-hover: hover)').matches) return;

    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const updateReflection = () => {
      frame = 0;
      if (!pointer) return;
      const bounds = svg.getBoundingClientRect();
      const x = pointer.x - bounds.left;
      const y = pointer.y - bounds.top;
      const nearby = x >= -110 && x <= bounds.width + 110 && y >= -110 && y <= bounds.height + 110;
      light.setAttribute('cx', String(x));
      light.setAttribute('cy', String(y));
      svg.style.setProperty('--reflection-opacity', nearby ? '1' : '0');
    };

    const scheduleReflection = () => {
      if (!frame && pointer) frame = requestAnimationFrame(updateReflection);
    };
    const moveReflection = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      pointer = { x: event.clientX, y: event.clientY };
      scheduleReflection();
    };
    const hideReflection = () => {
      pointer = null;
      svg.style.setProperty('--reflection-opacity', '0');
    };
    const leaveWindow = (event: PointerEvent) => {
      if (!event.relatedTarget) hideReflection();
    };

    // The decorative rail passes pointer events through to the page.
    window.addEventListener('pointermove', moveReflection, { passive: true });
    window.addEventListener('pointerout', leaveWindow);
    window.addEventListener('blur', hideReflection);
    window.addEventListener('scroll', scheduleReflection, { passive: true });
    window.addEventListener('resize', scheduleReflection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', moveReflection);
      window.removeEventListener('pointerout', leaveWindow);
      window.removeEventListener('blur', hideReflection);
      window.removeEventListener('scroll', scheduleReflection);
      window.removeEventListener('resize', scheduleReflection);
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    const track = rail?.querySelector<HTMLElement>('[data-snapshot-track]');
    const svg = rail?.querySelector<SVGSVGElement>('[data-connectors]');
    if (!track || !svg) return;

    const updateGeometry = () => {
      const bounds = track.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
      const cards = track.querySelectorAll<HTMLElement>('figure');

      // Transform points on the real card edges, including their reveal movement.
      const edgePoint = (card: HTMLElement, x: number, y: number) => {
        const rect = card.getBoundingClientRect();
        const matrix = new DOMMatrix(getComputedStyle(card).transform);
        const dx = (x - 0.5) * card.offsetWidth;
        const dy = (y - 0.5) * card.offsetHeight;
        return {
          x: rect.left + rect.width / 2 - bounds.left + matrix.a * dx + matrix.c * dy,
          y: rect.top + rect.height / 2 - bounds.top + matrix.b * dx + matrix.d * dy,
        };
      };

      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;
        const right = index % 2 === 0;
        const start = edgePoint(card, right ? 0.995 : 0.005, 0.55);
        const end = edgePoint(next, right ? 0.86 : 0.14, 0.008);
        const bend = Math.min(64, bounds.width * 0.12);
        const outerX = right
          ? Math.min(bounds.width - 4, Math.max(start.x, end.x) + bend)
          : Math.max(4, Math.min(start.x, end.x) - bend);
        const d = `M ${start.x} ${start.y} C ${outerX} ${start.y - 12}, ${outerX} ${end.y - bend}, ${end.x} ${end.y}`;
        svg.querySelectorAll(`[data-connector="${index}"] path`).forEach((path) => {
          path.setAttribute('d', d);
        });
      });
    };

    let frame = 0;
    const until = performance.now() + 650;
    const followReveal = () => {
      updateGeometry();
      if (performance.now() < until) frame = requestAnimationFrame(followReveal);
    };
    followReveal();
    const resizeObserver = new ResizeObserver(updateGeometry);
    resizeObserver.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [visibleCount]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let downwardTravel = 0;
    let scrollFrame = 0;
    const connectorProgress = snapshots.slice(1).map(() => 0);
    const availableScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const revealStep = Math.max(
      1,
      Math.min(120, availableScroll / Math.max(1, snapshots.length - 1)),
    );

    if (availableScroll === 0) {
      const revealAllFrame = window.requestAnimationFrame(() => {
        setVisibleCount(snapshots.length);
      });
      return () => window.cancelAnimationFrame(revealAllFrame);
    }

    const revealOnScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (delta <= 0) return;
      downwardTravel += delta;
      if (scrollFrame) return;

      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        const cards = railRef.current?.querySelectorAll<HTMLElement>('[data-snapshot]');
        let nextCount = 1;

        cards?.forEach((card, index) => {
          if (index > 0) {
            const progress = Math.max(
              0,
              Math.min(
                1,
                (downwardTravel - (index - 1) * revealStep) / revealStep,
                (window.innerHeight * 0.95 - card.getBoundingClientRect().top) / 100,
              ),
            );
            connectorProgress[index - 1] = Math.max(connectorProgress[index - 1], progress);
            railRef.current
              ?.querySelector<SVGGElement>(`[data-connector="${index - 1}"]`)
              ?.style.setProperty('--connector-offset', String(1 - connectorProgress[index - 1]));
          }

          // Require both scroll progress and room in the viewport for each reveal.
          if (
            downwardTravel >= index * revealStep &&
            card.getBoundingClientRect().top < window.innerHeight * 0.9
          ) {
            nextCount = index + 1;
          }
        });

        setVisibleCount((current) => Math.max(current, nextCount));
      });
    };

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', revealOnScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  return (
    <aside
      ref={railRef}
      className={styles.snapshotRail}
      aria-label={`${projectTitle} project screenshots`}
    >
      <div className={styles.snapshotTrack} data-snapshot-track>
        {snapshots.map((number, index) => {
          const screenshot = projectScreenshots[index];

          return (
            <div
              className={styles.snapshotSlot}
              data-snapshot
              data-visible={index < visibleCount}
              key={number}
            >
              <figure
                className={`project-preview-marquee-card ${screenshot ? 'interest-card credential-card' : ''} ${styles.snapshotCard}`}
                data-has-screenshot={screenshot ? 'true' : undefined}
                style={screenshot ? { aspectRatio: screenshot.aspectRatio } : undefined}
                onPointerMove={handleSnapshotPointerMove}
                onPointerLeave={handleSnapshotPointerLeave}
                aria-label={
                  screenshot
                    ? `${projectTitle} screenshot ${number}: ${screenshot.alt}`
                    : `Preview ${number}, screenshot pending`
                }
              >
                <button
                  className={styles.snapshotOpen}
                  type="button"
                  aria-label={
                    screenshot
                      ? `Open ${projectTitle} screenshot ${number}: ${screenshot.alt}`
                      : `Expand ${projectTitle} preview ${number}`
                  }
                  aria-haspopup="dialog"
                  onClick={(event) => openSnapshot(number, event.currentTarget)}
                >
                  {screenshot ? (
                    <Image
                      className={styles.snapshotImage}
                      src={screenshot.src}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 76vw, (max-width: 1023px) 48vw, 34vw"
                    />
                  ) : (
                    <span className="project-preview-placeholder" aria-hidden="true">
                      <span className="project-preview-placeholder-mark" />
                      <span className="project-preview-placeholder-label">
                        preview {number} &middot; pending
                      </span>
                    </span>
                  )}
                  <svg
                    className={styles.snapshotExpandIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" />
                  </svg>
                </button>
              </figure>
            </div>
          );
        })}
        <svg
          className={styles.snapshotConnectors}
          data-connectors
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <filter
              id={`${connectorId}-soft-reflection`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="12" />
            </filter>
            <radialGradient
              id={`${connectorId}-reflection`}
              data-reflection-light
              gradientUnits="userSpaceOnUse"
              cx="-200"
              cy="-200"
              r="110"
            >
              <stop offset="0" stopColor="#fff" />
              <stop offset="0.16" stopColor="#fff" stopOpacity="0.95" />
              <stop offset="0.45" stopColor="#e5e9f0" stopOpacity="0.55" />
              <stop offset="1" stopColor="#e5e9f0" stopOpacity="0" />
            </radialGradient>
            <filter
              id={`${connectorId}-metal-surface`}
              x="-10%"
              y="-10%"
              width="120%"
              height="120%"
              colorInterpolationFilters="sRGB"
            >
              {/* Shade the full rounded surface of each dash, including its ends. */}
              <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="bevel" />
              <feDiffuseLighting
                in="bevel"
                surfaceScale="2"
                diffuseConstant="0.85"
                lightingColor="#bfc1c4"
                result="bodyLight"
              >
                <feDistantLight azimuth="225" elevation="48" />
              </feDiffuseLighting>
              <feSpecularLighting
                in="bevel"
                surfaceScale="2"
                specularConstant="0.55"
                specularExponent="22"
                lightingColor="#fff"
                result="surfaceReflection"
              >
                <feDistantLight azimuth="225" elevation="48" />
              </feSpecularLighting>
              <feComposite
                in="bodyLight"
                in2="surfaceReflection"
                operator="arithmetic"
                k2="1"
                k3="1"
                result="metal"
              />
              <feComposite in="metal" in2="SourceAlpha" operator="in" />
            </filter>
          </defs>
          {snapshots.slice(1).map((number, index) => (
            <g key={number} data-connector={index}>
              <defs>
                <mask
                  id={`${connectorId}-reveal-${index}`}
                  maskUnits="userSpaceOnUse"
                  x="-10%"
                  y="-10%"
                  width="120%"
                  height="120%"
                >
                  <path className={styles.connectorDrawMask} pathLength="1" />
                </mask>
                <mask
                  id={`${connectorId}-flow-${index}`}
                  maskUnits="userSpaceOnUse"
                  x="-10%"
                  y="-10%"
                  width="120%"
                  height="120%"
                >
                  <path
                    className={styles.connectorFlowMask}
                    pathLength="1"
                    filter={`url(#${connectorId}-soft-reflection)`}
                  />
                </mask>
              </defs>
              <g mask={`url(#${connectorId}-reveal-${index})`}>
                <path className={styles.connectorShadow} />
                <path className={styles.connectorRim} />
                <path
                  className={styles.connectorMetal}
                  filter={`url(#${connectorId}-metal-surface)`}
                />
                <g mask={`url(#${connectorId}-flow-${index})`}>
                  <path className={styles.connectorFlowLight} />
                </g>
                <path
                  className={styles.connectorReflection}
                  stroke={`url(#${connectorId}-reflection)`}
                />
              </g>
            </g>
          ))}
        </svg>
        <SeedRoverSnapshotMascot enabled={visibleCount === snapshots.length} paused={viewerOpen} />
      </div>
      <dialog
        ref={viewerRef}
        className={styles.snapshotViewer}
        data-project={projectSlug}
        style={
          selectedScreenshot
            ? {
                width: `min(1120px, calc(100vw - 32px), calc((100dvh - 120px) * ${selectedScreenshot.aspectRatio}))`,
              }
            : undefined
        }
        aria-labelledby={`${connectorId}-viewer-title`}
        onClose={() => {
          setViewerOpen(false);
          openerRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) {
            event.currentTarget.close();
          }
        }}
      >
        <div className={styles.viewerHeading}>
          <h2 id={`${connectorId}-viewer-title`}>{projectTitle}</h2>
          <button
            type="button"
            className="icon-button"
            aria-label="Close image viewer"
            onClick={() => viewerRef.current?.close()}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div
          className={styles.viewerImage}
          style={selectedScreenshot ? { aspectRatio: selectedScreenshot.aspectRatio } : undefined}
        >
          {selectedScreenshot ? (
            <Image
              className={styles.viewerScreenshot}
              src={selectedScreenshot.src}
              alt={selectedScreenshot.alt}
              fill
              sizes="(max-width: 1120px) 94vw, 1120px"
            />
          ) : (
            <div className="project-preview-placeholder">
              <span className="project-preview-placeholder-mark" aria-hidden="true" />
              <span className="project-preview-placeholder-label">
                preview {selectedSnapshot} &middot; pending
              </span>
            </div>
          )}
        </div>
      </dialog>
    </aside>
  );
}
