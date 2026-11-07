'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react';
import type { Mascot as MascotInstance, MascotState } from 'wobnimo';
import jbBot from '../../mascots/jb-bot';
import { mascotActivity } from '@/lib/mascot-activity';
import { MascotSpeechBubble } from './mascot-speech-bubble';
import { followMascotHead, type HeadMotion } from '@/lib/mascot-head-motion';

export function RobotHead({ state, active = true, waitForReady = false, motionRef }: {
  state: MascotState;
  active?: boolean;
  waitForReady?: boolean;
  motionRef?: RefObject<HeadMotion>;
}) {
  const host = useRef<HTMLDivElement>(null);
  const instance = useRef<MascotInstance | null>(null);
  const current = useRef({ state, active });
  const [ready, setReady] = useState(false);
  const [rendererFailed, setRendererFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let removeReady: (() => void) | undefined;
    let stopFollowing: (() => void) | undefined;

    // Load the renderer only in the browser. The still image also covers WebGL failures.
    void import('wobnimo')
      .then(({ mount }) => {
        if (disposed || !host.current) return;
        const mascot = mount(host.current, jbBot, {
          state: current.current.state,
          interactive: true,
          respectReducedMotion: true,
          maxPixelRatio: 2,
          floor: 0,
          framing: 1.6,
        });
        instance.current = mascot;
        if (motionRef) {
          stopFollowing = followMascotHead(mascot, 1.6, (motion) => {
            motionRef.current = motion;
          });
        }
        if (!current.current.active) mascot.pause();
        mascot.canvas.setAttribute('aria-hidden', 'true');
        mascot.canvas.tabIndex = -1;
        removeReady = mascot.on('ready', () => setReady(true));
      })
      .catch((error: unknown) => {
        if (disposed) return;
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            'JB Bot is using its still image because its renderer is unavailable.',
            error,
          );
        }
        // Keep the matching still visible when WebGL or the renderer is unavailable.
        host.current?.replaceChildren();
        setRendererFailed(true);
      });

    return () => {
      disposed = true;
      removeReady?.();
      stopFollowing?.();
      instance.current?.dispose();
      instance.current = null;
    };
  }, [motionRef]);

  useEffect(() => {
    current.current = { state, active };
    instance.current?.setState(state);
    if (active) {
      instance.current?.play();
    } else {
      instance.current?.pause();
    }
  }, [state, active]);

  return (
    <div
      className="mascot-stage"
      data-ready={ready}
      data-loading={waitForReady && !ready && !rendererFailed}
      role="img"
      aria-label="JB Bot, a metallic robot head wearing black headphones"
    >
      <Image className="mascot-still" src="/images/jb-bot.png" alt="" width={128} height={128} />
      <div className="mascot-render" ref={host} aria-hidden="true" />
    </div>
  );
}

export function PortfolioMascot() {
  const companionRef = useRef<HTMLElement>(null);
  const headMotionRef = useRef<HeadMotion>({ x: 0, y: 0 });
  const state = useSyncExternalStore(
    mascotActivity.subscribe,
    mascotActivity.getSnapshot,
    mascotActivity.getServerSnapshot,
  );
  const [celebrating, setCelebrating] = useState(false);
  const celebrationTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  function celebrateMascot() {
    clearTimeout(celebrationTimer.current);
    setCelebrating(true);
    celebrationTimer.current = window.setTimeout(() => {
      celebrationTimer.current = undefined;
      setCelebrating(false);
    }, 2200);
  }

  useEffect(() => () => clearTimeout(celebrationTimer.current), []);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      mascotActivity.navigated();
    }
  }, [pathname]);

  useEffect(() => {
    let sleepTimer: ReturnType<typeof setTimeout>;
    let lastActivity = 0;
    const wake = () => {
      const now = Date.now();
      if (now - lastActivity < 1000) return;
      lastActivity = now;
      clearTimeout(sleepTimer);
      mascotActivity.wake();
      sleepTimer = setTimeout(() => mascotActivity.rest('sleeping'), 45000);
    };
    const visibility = () => {
      if (document.hidden) {
        clearTimeout(sleepTimer);
        mascotActivity.rest('sleeping');
      } else {
        lastActivity = 0;
        wake();
      }
    };
    const events = ['pointermove', 'pointerdown', 'keydown', 'scroll'] as const;
    events.forEach((event) => window.addEventListener(event, wake, { passive: true }));
    document.addEventListener('visibilitychange', visibility);
    wake();
    return () => {
      clearTimeout(sleepTimer);
      events.forEach((event) => window.removeEventListener(event, wake));
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    const emotes = ['surprised', 'listening', 'thinking'] as const;
    let nextEmote = 0;
    const emoteTimer = window.setInterval(() => {
      if (
        document.hidden ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        mascotActivity.getSnapshot() !== 'idle'
      ) {
        return;
      }

      mascotActivity.idleEmote(emotes[nextEmote]);
      nextEmote = (nextEmote + 1) % emotes.length;
    }, 5000);

    return () => window.clearInterval(emoteTimer);
  }, []);

  return (
    <aside
      ref={companionRef}
      className="portfolio-companion"
      aria-label="JB Bot portfolio companion"
      data-state={celebrating ? 'celebrating' : state}
    >
      <RobotHead state={celebrating ? 'celebrating' : state} motionRef={headMotionRef} />
      <MascotSpeechBubble state={celebrating ? 'celebrating' : state} anchorRef={companionRef} motionRef={headMotionRef} />
      <button
        className="portfolio-companion-trigger"
        type="button"
        aria-label="Make JB Bot celebrate"
        onClick={celebrateMascot}
      />
    </aside>
  );
}
