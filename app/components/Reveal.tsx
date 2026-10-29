"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/*
  Scroll-triggered reveals with no state and no library.
  - Content is visible by default (works without JS and with reduced motion).
  - Only elements that start below the fold are "armed" (hidden) by JS, then
    revealed when they scroll into view.
*/
function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.dataset.armed = "true";

    const show = () => {
      el.dataset.in = "true";
      io.disconnect();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    io.observe(el);
    el.addEventListener("focusin", show); // keyboard users never hit hidden content

    return () => {
      io.disconnect();
      el.removeEventListener("focusin", show);
    };
  }, []);

  return ref;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`ahsaro-scroll ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

type Line = { text: string; className?: string };

export function RevealLines({
  lines,
  as: Heading = "h2",
  className = "",
}: {
  lines: Line[];
  as?: "h2" | "h3";
  className?: string;
}) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Heading className={className}>
        {lines.map((line, i) => (
          <span key={i} className="ahsaro-line">
            <span
              className={`ahsaro-split ${line.className ?? ""}`}
              style={{ "--d": `${i * 120}ms` } as CSSProperties}
            >
              {line.text}
            </span>
          </span>
        ))}
      </Heading>
    </div>
  );
}