/**
 * Magnetic — subtle cursor-attracted hover effect.
 *
 * Wraps any element. On mousemove within the element, the child translates
 * toward the cursor by `strength × distance-from-center`, spring-eased back
 * to rest on mouseleave. Touch devices and reduced-motion users get a pure
 * no-op (no listeners attached) so it costs nothing.
 *
 * Performance:
 *   - GPU-only (translate via Framer's transform)
 *   - No layout reads in the hot path (one getBoundingClientRect on enter)
 *   - Springs are physics-driven, not rAF loops — Framer dedupes them
 *
 * Usage:
 *   <Magnetic><a href="…" className="…">Discover</a></Magnetic>
 */
import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
  children: ReactNode;
  /** 0 = no follow, 0.25 = subtle, 0.5 = stronger. Default 0.22 — restrained. */
  strength?: number;
  /** Outer wrapper className (display, layout). */
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.22,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const rect = useRef<DOMRect | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Soft, premium spring — quick to react, gentle to settle
  const springConfig = { stiffness: 220, damping: 18, mass: 0.4 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  // Honor user preference + skip on coarse pointers (touch)
  const enabled =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onEnter = () => {
    if (!enabled || !ref.current) return;
    rect.current = ref.current.getBoundingClientRect();
  };

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !rect.current) return;
    const r = rect.current;
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    if (!enabled) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseEnter={enabled ? onEnter : undefined}
      onMouseMove={enabled ? onMove : undefined}
      onMouseLeave={enabled ? onLeave : undefined}
      className={className}
    >
      {children}
    </motion.span>
  );
}
