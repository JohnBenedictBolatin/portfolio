'use client';

import dynamic from 'next/dynamic';
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import type { MascotState } from 'wobnimo';

const PreviewRobot = dynamic(
  () => import('./portfolio-mascot').then((module) => module.RobotHead),
  {
    ssr: false,
  },
);

export function ProjectPreviewInteraction({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasHovered, setHasHovered] = useState(false);
  const [mascotState, setMascotState] = useState<MascotState>('listening');
  const celebrationTimer = useRef<number | null>(null);
  const active = isHovered || isFocused;

  useEffect(
    () => () => {
      if (celebrationTimer.current !== null) {
        window.clearTimeout(celebrationTimer.current);
      }
    },
    [],
  );

  function handlePointerEnter(event: PointerEvent<HTMLDivElement>) {
    if (
      event.pointerType === 'touch' ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return;
    }

    setHasHovered(true);
    setIsHovered(true);
  }

  function handleFocus() {
    setHasHovered(true);
    setIsFocused(true);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    setIsFocused(false);
  }

  function celebrateMascot(event: MouseEvent<HTMLButtonElement>) {
    if (celebrationTimer.current !== null) {
      window.clearTimeout(celebrationTimer.current);
    }
    setMascotState('celebrating');
    // Pointer activation should not leave :focus-within holding the mascot open.
    if (event.detail > 0) event.currentTarget.blur();
    celebrationTimer.current = window.setTimeout(() => {
      celebrationTimer.current = null;
      setMascotState('listening');
    }, 2200);
  }

  return (
    <div
      className="project-preview-stack"
      role="group"
      aria-label={label}
      tabIndex={0}
      data-preview-active={active}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
      onPointerCancel={() => setIsHovered(false)}
      onFocusCapture={handleFocus}
      onBlurCapture={handleBlur}
    >
      {children}
      <button
        className="project-preview-companion"
        type="button"
        aria-label="Make JB Bot celebrate"
        onClick={celebrateMascot}
      >
        {hasHovered && <PreviewRobot state={mascotState} active={active} />}
      </button>
    </div>
  );
}
