'use client';
import { ThemeProvider as Provider, useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useSyncExternalStore } from 'react';

const subscribeToMount = () => () => undefined;
const getClientMountedSnapshot = () => true;
const getServerMountedSnapshot = () => false;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider attribute="data-theme" defaultTheme="system" enableSystem>
      <ThemeTransitionObserver />
      {children}
    </Provider>
  );
}

function ThemeTransitionObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cleanupTimer: number | undefined;

    const observer = new MutationObserver((mutations) => {
      if (
        reduceMotion.matches ||
        !mutations.some((mutation) => mutation.attributeName === 'data-theme')
      ) {
        return;
      }

      root.setAttribute('data-theme-transitioning', '');
      if (cleanupTimer !== undefined) window.clearTimeout(cleanupTimer);
      cleanupTimer = window.setTimeout(() => {
        root.removeAttribute('data-theme-transitioning');
        cleanupTimer = undefined;
      }, 460);
    });

    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      observer.disconnect();
      if (cleanupTimer !== undefined) window.clearTimeout(cleanupTimer);
      root.removeAttribute('data-theme-transitioning');
    };
  }, []);

  return null;
}

export function ThemeControl() {
  const { resolvedTheme, setTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const mounted = useSyncExternalStore(
    subscribeToMount,
    getClientMountedSnapshot,
    getServerMountedSnapshot,
  );

  return (
    <div className="theme-control">
      <span className="contact-location-label" aria-hidden="true">
        theme
      </span>
      <label className="theme-switch">
        <input
          className="theme-switch-input"
          type="checkbox"
          role="switch"
          checked={mounted && isLight}
          onChange={(event) => setTheme(event.currentTarget.checked ? 'light' : 'dark')}
          aria-label="Light mode"
        />
        <span className="theme-switch-toggle" aria-hidden="true">
          <span className="left"><Moon size={14} strokeWidth={2.1} /></span>
          <span className="right"><Sun size={14} strokeWidth={2.1} /></span>
        </span>
      </label>
    </div>
  );
}
