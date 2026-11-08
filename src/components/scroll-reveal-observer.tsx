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
  '.interest-list > .curiosity-card',
].join(',');
const curiosityCardSelector = '.interest-list > .curiosity-card';

export function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector<HTMLElement>('#main-content');
    if (!main) return;
    const mainRoot: HTMLElement = main;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let hasScrolled = window.scrollY > 0;
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
        const isCuriosityCard = element.matches(curiosityCardSelector);
        if (isCuriosityCard && !hasScrolled) continue;

        const revealThreshold = window.innerHeight * (isCuriosityCard ? 0.82 : 0.92);
        if (bounds.top < revealThreshold && bounds.bottom > 0) {
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
        if (element.dataset.scrollRevealState && element.dataset.scrollRevealState !== 'pending') continue;
        const isCuriosityCard = element.matches(curiosityCardSelector);
        if (reduceMotion.matches || (!observer && !isCuriosityCard)) {
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
        const revealThreshold = window.innerHeight * (isCuriosityCard ? 0.82 : 0.9);
        const isInRevealZone = bounds.top < revealThreshold && bounds.bottom > 0;
        element.dataset.scrollRevealState = isCuriosityCard && !hasScrolled
          ? 'pending'
          : isInRevealZone
            ? 'visible'
            : 'pending';
        if (element.dataset.scrollRevealState === 'pending' && !isCuriosityCard) {
          observer?.observe(element);
        }
      }

      for (const siblings of byParent.values()) {
        siblings.forEach((element, index) => {
          const step = element.matches(curiosityCardSelector) ? 70 : 65;
          element.style.setProperty('--scroll-reveal-delay', `${Math.min(index, 4) * step}ms`);
        });
      }
    }

    function handleScroll() {
      hasScrolled = true;
      scheduleRevealCheck();
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { capture: true, passive: true });
    window.addEventListener('resize', scheduleRevealCheck);

    return () => {
      mutations.disconnect();
      observer?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', scheduleRevealCheck);
      if (revealFrame) window.cancelAnimationFrame(revealFrame);
    };
  }, [pathname]);

  return null;
}
