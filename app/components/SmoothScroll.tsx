"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/*
  Lenis smooth wheel scrolling, desktop mouse only.
  Skipped on touch devices and for reduced motion, which keep native scrolling.
  Anchor links are handled here so the fixed header never covers a section.
*/
export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (reduceMotion || !finePointer) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!link) return;

      const hash = link.getAttribute("href") ?? "";
      let target: HTMLElement | null = null;

      if (hash !== "#") {
        try {
          target = document.querySelector<HTMLElement>(hash);
        } catch {
          return;
        }
        if (!target) return;
      }

      e.preventDefault();
      if (hash === "#") {
        lenis.scrollTo(0);
        history.pushState(null, "", window.location.pathname + window.location.search);
      } else if (target) {
        lenis.scrollTo(target, { offset: -80 });
        history.pushState(null, "", hash);
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return null;
}