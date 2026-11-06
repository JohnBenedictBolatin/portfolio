'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { Mascot as MascotInstance, MascotState } from 'wobnimo';
import jbBot from '../../mascots/jb-bot';
import { mascotActivity } from '@/lib/mascot-activity';

function RobotHead({ state }: { state: MascotState }) {
  const host = useRef<HTMLDivElement>(null);
  const instance = useRef<MascotInstance | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    let removeReady: (() => void) | undefined;

    // Load the renderer only in the browser. The still image also covers WebGL failures.
    void import('wobnimo')
      .then(({ mount }) => {
        if (disposed || !host.current) return;
        const mascot = mount(host.current, jbBot, {
          state: mascotActivity.getSnapshot(),
          interactive: true,
          respectReducedMotion: true,
          maxPixelRatio: 2,
          floor: 0,
          framing: 1.6,
        });
        instance.current = mascot;
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
      });

    return () => {
      disposed = true;
      removeReady?.();
      instance.current?.dispose();
      instance.current = null;
    };
  }, []);

  useEffect(() => {
    instance.current?.setState(state);
  }, [state]);

  return (
    <div
      className="mascot-stage"
      data-ready={ready}
      role="img"
      aria-label="JB Bot, a metallic robot head wearing black headphones"
    >
      <Image className="mascot-still" src="/images/jb-bot.png" alt="" width={128} height={128} />
      <div className="mascot-render" ref={host} aria-hidden="true" />
    </div>
  );
}

export function PortfolioMascot() {
  const state = useSyncExternalStore(
    mascotActivity.subscribe,
    mascotActivity.getSnapshot,
    mascotActivity.getServerSnapshot,
  );
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

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
      className="portfolio-companion"
      aria-label="JB Bot portfolio companion"
      data-state={state}
    >
      <RobotHead state={state} />
    </aside>
  );
}
