'use client';

import { useEffect, useState } from 'react';

const message = "glad you're here, please take a look around.";
const typingSpeed = 32;

export function WelcomeMessage() {
  const [visibleMessage, setVisibleMessage] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let characterIndex = 0;
    let typingTimer: number | undefined;
    let dismissTimer: number | undefined;

    const dismissAfterPause = (delay: number) => {
      dismissTimer = window.setTimeout(() => setIsVisible(false), delay);
    };

    const showImmediately = () => {
      if (typingTimer !== undefined) window.clearInterval(typingTimer);
      setVisibleMessage(message);
      setIsTyping(false);
      dismissAfterPause(900);
    };

    const startTyping = () => {
      typingTimer = window.setInterval(() => {
        characterIndex += 1;
        setVisibleMessage(message.slice(0, characterIndex));
        if (characterIndex >= message.length && typingTimer !== undefined) {
          window.clearInterval(typingTimer);
          setIsTyping(false);
          dismissAfterPause(500);
        }
      }, typingSpeed);
    };

    if (motionPreference.matches) showImmediately();
    else startTyping();

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      if (event.matches) showImmediately();
    };
    motionPreference.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      if (typingTimer !== undefined) window.clearInterval(typingTimer);
      if (dismissTimer !== undefined) window.clearTimeout(dismissTimer);
      motionPreference.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  return (
    <p
      className={`hero-greeting${isVisible ? '' : ' is-dismissed'}`}
      aria-label={message}
      aria-live="off"
      aria-hidden={!isVisible}
    >
      <span aria-hidden="true">{visibleMessage}</span>
      {isTyping && <span className="hero-greeting-caret" aria-hidden="true" />}
    </p>
  );
}
