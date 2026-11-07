'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import type { MascotState } from 'wobnimo';
import type { HeadMotion } from '@/lib/mascot-head-motion';

const messages: Partial<Record<MascotState, readonly string[]>> = {
  idle: ['Want to say hello? Use “send me a message”.'],
  surprised: [
    'Looking for John’s socials? Check “connect with me”.',
    'Visit Experience to learn about John’s work.',
    'Curious about his background? Read “a little context” below.',
  ],
  listening: [
    'Want to work together? Send John a message.',
    'Prefer LinkedIn? Find it under “connect with me”.',
    'Have a question? Use “send me a message”.',
  ],
  thinking: [
    'Reaching out? Share a little about what you have in mind.',
    'Have an opportunity to discuss? Include the role and details.',
    'Visit Certifications to explore John’s learning and credentials.',
  ],
  celebrating: [
    'Let’s keep in touch—John’s socials are under “connect with me”.',
    'Ready to connect? Use “send me a message”.',
  ],
  error: ['Something didn’t load. Try that action again.'],
};

export function MascotSpeechBubble({ state, anchorRef, motionRef }: {
  state: MascotState;
  anchorRef: RefObject<HTMLElement | null>;
  motionRef: RefObject<HeadMotion>;
}) {
  const bubbleRef = useRef<HTMLParagraphElement>(null);
  const shownOnce = useRef(false);
  const messageIndexes = useRef<Partial<Record<MascotState, number>>>({});
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [message, setMessage] = useState(messages.idle?.[0]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Returning to idle should let the current thought finish, not replace it.
    if (state === 'idle' && shownOnce.current) return;
    const options = messages[state];
    if (!options?.length) return;
    const delay = shownOnce.current ? 0 : 1800;
    const showTimer = setTimeout(() => {
      shownOnce.current = true;
      clearTimeout(hideTimer.current);
      const index = messageIndexes.current[state] ?? 0;
      setMessage(options[index % options.length]);
      messageIndexes.current[state] = index + 1;
      setVisible(true);
      hideTimer.current = setTimeout(() => setVisible(false), 3600);
    }, delay);
    return () => clearTimeout(showTimer);
  }, [state]);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  useEffect(() => {
    const anchor = anchorRef.current;
    const bubble = bubbleRef.current;
    if (!anchor || !bubble) return;
    let frame = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const positionBubble = () => {
      const bounds = anchor.getBoundingClientRect();
      const width = bubble.offsetWidth;
      const height = bubble.offsetHeight;
      const canvasHeight = anchor.querySelector('canvas')?.clientHeight ?? bounds.height * 5 / 3;
      const motion = reducedMotion.matches ? { x: 0, y: 0 } : motionRef.current;
      const rightX = bounds.width * 0.86 + motion.x * canvasHeight;
      const fitsRight = bounds.left + rightX + width <= window.innerWidth - 16;
      const left = fitsRight
        ? rightX
        : Math.max(16 - bounds.left, Math.min(rightX, window.innerWidth - bounds.left - width - 16));
      bubble.dataset.placement = fitsRight ? 'right' : 'above';
      bubble.style.left = `${left}px`;
      bubble.style.top = `${bounds.height * 0.62 - height - 16 + motion.y * canvasHeight}px`;
    };
    const followHead = () => {
      if (!document.hidden) positionBubble();
      frame = requestAnimationFrame(followHead);
    };
    positionBubble();
    if (visible) frame = requestAnimationFrame(followHead);
    const observer = new ResizeObserver(positionBubble);
    observer.observe(anchor);
    observer.observe(bubble);
    window.addEventListener('resize', positionBubble);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', positionBubble);
    };
  }, [anchorRef, motionRef, visible]);

  return (
    <p ref={bubbleRef} className="mascot-speech-bubble" data-visible={visible}>
      {message}
    </p>
  );
}
