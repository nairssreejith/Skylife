/**
 * Skylife — Shared Framer Motion variants & transitions
 * Import from any component:
 *   import { fadeUp, stagger, easings } from '@/lib/motion';
 */
import type { Variants, Transition } from 'framer-motion';

/* ---------------- Easings (mirror tokens.css) ---------------- */
export const easings = {
  silk:    [0.32, 0.72, 0, 1] as const,
  luxury:  [0.16, 1, 0.3, 1] as const,
  glide:   [0.65, 0, 0.35, 1] as const,
  spring:  [0.34, 1.56, 0.64, 1] as const,
  inSoft:  [0.4, 0, 0.6, 1] as const,
  outSoft: [0, 0, 0.2, 1] as const,
};

/* ---------------- Durations (seconds, for Framer) ---------------- */
export const durations = {
  fast: 0.18,
  base: 0.28,
  slow: 0.48,
  slower: 0.72,
  cinematic: 1.1,
};

/* ---------------- Base transitions ---------------- */
export const transitions: Record<string, Transition> = {
  silk:    { duration: durations.base,   ease: easings.silk },
  luxury:  { duration: durations.slow,   ease: easings.luxury },
  reveal:  { duration: durations.slower, ease: easings.luxury },
  cinema:  { duration: durations.cinematic, ease: easings.luxury },
};

/* ---------------- Single-element variants ---------------- */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.luxury },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.luxury },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: transitions.luxury },
};

export const rise: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: transitions.reveal },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transitions.silk },
};

export const revealX: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: transitions.luxury },
};

/* ---------------- Container / stagger ---------------- */
export const stagger = (
  staggerChildren = 0.08,
  delayChildren = 0.1
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/* ---------------- Page transition (for AnimatePresence) ---------------- */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  enter:   { opacity: 1, y: 0, transition: transitions.luxury },
  exit:    { opacity: 0, y: -12, transition: transitions.silk },
};

/* ---------------- Hover lift (for cards / interactive surfaces) ---------------- */
export const hoverLift = {
  rest:  { y: 0, scale: 1, transition: transitions.silk },
  hover: { y: -4, scale: 1.01, transition: transitions.silk },
};

/* ---------------- Viewport defaults for whileInView ---------------- */
export const viewportDefaults = {
  once: true,
  amount: 0.25,
} as const;
