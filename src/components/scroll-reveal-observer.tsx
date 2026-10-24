'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const revealSelector = [
  '.section-heading',
  '.project-row',
  '.experience-row',
  '.skill-row',
  '.page-heading',
  '.page-body > .portrait',
  '.page-body > .prose',
  '.page-body > .fact-grid',
  '.page-body > .tags',
  '.page-body > .project-links',
  '.page-body > .article-bottom',
  '.about-grid > *',
].join(',');

export function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector<HTMLElement>('#main-content');
    if (!main) return;
    const mainRoot: HTMLElement = main;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const target = entry.target as HTMLElement;
            target.dataset.scrollRevealState = 'visible';
            observer?.unobserve(target);
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -7% 0px' },
      );
    }
    let revealFrame = 0;

    function revealInView() {
      revealFrame = 0;
      for (const element of mainRoot.querySelectorAll<HTMLElement>(
        "[data-scroll-reveal-state='pending']",
      )) {
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) {
          element.dataset.scrollRevealState = 'visible';
          observer?.unobserve(element);
        }
      }
    }

    function scheduleRevealCheck() {
      if (revealFrame) return;
      revealFrame = window.requestAnimationFrame(revealInView);
    }

    function scan(root: ParentNode) {
      const candidates: HTMLElement[] = [
        ...(root instanceof HTMLElement && root.matches(revealSelector) ? [root] : []),
        ...root.querySelectorAll<HTMLElement>(revealSelector),
      ];
      const byParent = new Map<HTMLElement, HTMLElement[]>();

      for (const element of candidates) {
        if (element.dataset.scrollRevealState) continue;
        if (reduceMotion.matches || !observer) {
          element.dataset.scrollRevealState = 'visible';
          continue;
        }

        const parent = element.parentElement as HTMLElement | null;
        if (parent) {
          const siblings = byParent.get(parent) ?? [];
          siblings.push(element);
          byParent.set(parent, siblings);
        }

        const bounds = element.getBoundingClientRect();
        element.dataset.scrollRevealState =
          bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0 ? 'visible' : 'pending';
        if (element.dataset.scrollRevealState === 'pending') observer.observe(element);
      }

      for (const siblings of byParent.values()) {
        siblings.forEach((element, index) => {
          element.style.setProperty('--scroll-reveal-delay', `${Math.min(index, 4) * 65}ms`);
        });
      }
    }

    scan(mainRoot);
    scheduleRevealCheck();
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node instanceof Element) scan(node);
        }
      }
      scheduleRevealCheck();
    });
    mutations.observe(mainRoot, { childList: true, subtree: true });
    window.addEventListener('scroll', scheduleRevealCheck, { passive: true });
    document.addEventListener('scroll', scheduleRevealCheck, { capture: true, passive: true });
    window.addEventListener('resize', scheduleRevealCheck);

    return () => {
      mutations.disconnect();
      observer?.disconnect();
      window.removeEventListener('scroll', scheduleRevealCheck);
      document.removeEventListener('scroll', scheduleRevealCheck, true);
      window.removeEventListener('resize', scheduleRevealCheck);
      if (revealFrame) window.cancelAnimationFrame(revealFrame);
    };
  }, [pathname]);

  return null;
}
