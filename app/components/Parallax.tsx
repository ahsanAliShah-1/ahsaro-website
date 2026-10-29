"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
  Moves its content at a different speed from the page scroll.
  speed > 0 = slower than the page (feels deeper), speed < 0 = faster.
  Desktop only; disabled for reduced motion. Measures the outer element,
  which never moves, so there is no feedback loop.
*/
export default function Parallax({
  children,
  speed = 0.1,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const r = o.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return; // off-screen, skip
      const offset = (r.top + r.height / 2 - vh / 2) * speed;
      i.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      i.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}