'use client';

import { useEffect, useState } from 'react';

const roleTransitionMs = 400;

export function RotatingHeadline({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [nextRoleIndex, setNextRoleIndex] = useState(roles.length > 1 ? 1 : 0);
  const [isSliding, setIsSliding] = useState(false);
  const maxRoleLength = Math.max(0, ...roles.map((role) => role.length));

  useEffect(() => {
    if (roles.length < 2) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let interval: number | undefined;
    let settleTimer: number | undefined;
    let activeRoleIndex = 0;

    const stopRotation = () => {
      if (interval !== undefined) window.clearInterval(interval);
      interval = undefined;
      if (settleTimer !== undefined) window.clearTimeout(settleTimer);
      settleTimer = undefined;
    };

    const showFirstRole = () => {
      activeRoleIndex = 0;
      setRoleIndex(0);
      setNextRoleIndex(roles.length > 1 ? 1 : 0);
      setIsSliding(false);
    };

    const slideToNextRole = () => {
      const targetRoleIndex = (activeRoleIndex + 1) % roles.length;
      setNextRoleIndex(targetRoleIndex);
      setIsSliding(true);
      settleTimer = window.setTimeout(() => {
        activeRoleIndex = targetRoleIndex;
        setRoleIndex(targetRoleIndex);
        setNextRoleIndex((targetRoleIndex + 1) % roles.length);
        setIsSliding(false);
      }, roleTransitionMs);
    };

    const updateRotation = () => {
      stopRotation();
      if (motionPreference.matches) {
        showFirstRole();
      } else {
        interval = window.setInterval(slideToNextRole, 3200);
      }
    };

    updateRotation();
    motionPreference.addEventListener('change', updateRotation);

    return () => {
      stopRotation();
      motionPreference.removeEventListener('change', updateRotation);
    };
  }, [roles]);

  return (
    <p className="hero-role" aria-live="off">
      <span>student / </span>
      <span className="hero-role-window" style={{ width: `${maxRoleLength}ch` }}>
        <span className={`hero-role-track${isSliding ? ' is-sliding' : ''}`}>
          <span>{roles[roleIndex] ?? roles[0] ?? ''}</span>
          <span aria-hidden="true">{roles[nextRoleIndex] ?? roles[0] ?? ''}</span>
        </span>
      </span>
    </p>
  );
}
