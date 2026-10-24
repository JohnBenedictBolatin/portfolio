'use client';
import { ThemeProvider as Provider, useTheme } from 'next-themes';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';
const subscribe = () => () => {};
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider attribute="data-theme" defaultTheme="dark" enableSystem>
      {children}
    </Provider>
  );
}
export function ThemeControl() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const selected = mounted ? theme : 'dark';
  return (
    <div className="theme-control" role="group" aria-label="Color theme">
      {(
        [
          { value: 'light', Icon: Sun },
          { value: 'dark', Icon: Moon },
          { value: 'system', Icon: Monitor },
        ] as const
      ).map(({ value, Icon }) => (
        <button
          key={value}
          type="button"
          data-theme-choice={value}
          aria-pressed={selected === value}
          onClick={() => setTheme(value)}
          aria-label={`Use ${value} theme`}
          title={`${value} theme`}
        >
          <Icon size={15} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
