"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  wrapperClassName?: string;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export default function MagneticButton({
  href,
  children,
  variant = "outline",
  className = "",
  wrapperClassName = "",
}: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const btn = btnRef.current;
    if (!wrap || !btn) return;

    // Desktop mouse only, and never with reduced motion.
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduceMotion.matches) return;

    const RADIUS = 90; // how close the cursor must be (px)
    const PULL = 0.3; // how strongly the button leans
    const MAX = 14; // hard limit on movement (px)

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;

    // Eased follow loop; it stops itself once settled.
    const tick = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      btn.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

      if (Math.abs(tx - x) < 0.05 && Math.abs(ty - y) < 0.05) {
        if (tx === 0 && ty === 0) btn.style.transform = "";
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: globalThis.PointerEvent) => {
      if (e.pointerType !== "mouse") return;

      // Measure the wrapper (it never moves), so there is no feedback loop.
      const r = wrap.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return; // hidden on this breakpoint

      const nearX = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
      const nearY = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);

      if (Math.hypot(nearX, nearY) < RADIUS) {
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        tx = clamp(dx * PULL, -MAX, MAX);
        ty = clamp(dy * PULL, -MAX, MAX);
      } else {
        tx = 0;
        ty = 0;
      }
      kick();
    };

    const onLeaveWindow = () => {
      tx = 0;
      ty = 0;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeaveWindow);
      if (raf) cancelAnimationFrame(raf);
      btn.style.transform = "";
    };
  }, []);

  // Records where the pointer enters/leaves so the liquid fill grows from there.
  const setOrigin = (e: PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--fx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--fy", `${e.clientY - r.top}px`);
  };

  return (
    <span ref={wrapRef} className={`inline-flex w-fit ${wrapperClassName}`}>
      <a
        ref={btnRef}
        href={href}
        className={`ahsaro-btn ahsaro-btn--${variant} ${className}`}
        onPointerEnter={setOrigin}
        onPointerLeave={setOrigin}
      >
        <span className="ahsaro-btn-fill" aria-hidden="true" />
        <span>{children}</span>
      </a>
    </span>
  );
}