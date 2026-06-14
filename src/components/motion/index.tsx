/**
 * Reveal-on-scroll wrappers — thin, opinionated Framer Motion helpers
 * built on shared variants in src/lib/motion.ts.
 *
 * Performance: each instance uses `whileInView` with `viewport.once: true`,
 * so the IntersectionObserver detaches after the first reveal. No re-renders
 * on subsequent scroll. Animations are GPU-friendly (opacity + transform).
 *
 * Usage:
 *   <FadeUp>...</FadeUp>                       // shorthand for fade-up
 *   <Reveal variant="rise" delay={0.1}>...</Reveal>
 *   <Stagger>
 *     <Stagger.Item>...</Stagger.Item>
 *     <Stagger.Item as="h1">Heading</Stagger.Item>
 *   </Stagger>
 */
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { type ReactNode } from 'react';
import {
  fadeIn,
  fadeUp,
  fadeDown,
  rise,
  scaleIn,
  revealX,
  stagger,
  viewportDefaults,
} from '@/lib/motion';

type VariantName = 'fadeIn' | 'fadeUp' | 'fadeDown' | 'rise' | 'scaleIn' | 'revealX';

type MotionTagName =
  | 'div' | 'section' | 'article' | 'header' | 'footer'
  | 'span' | 'li' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';

const variantMap: Record<VariantName, Variants> = {
  fadeIn,
  fadeUp,
  fadeDown,
  rise,
  scaleIn,
  revealX,
};

/* ---------------- <Reveal> — single element reveal on scroll ---------------- */
interface RevealProps
  extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView' | 'viewport'> {
  variant?: VariantName;
  delay?: number;
  as?: MotionTagName;
  amount?: number;
  once?: boolean;
  children: ReactNode;
}

export function Reveal({
  variant = 'fadeUp',
  delay = 0,
  as = 'div',
  amount = viewportDefaults.amount,
  once = viewportDefaults.once,
  transition,
  children,
  ...rest
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={delay ? { ...transition, delay } : transition}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* ---------------- <FadeUp> — clearer alias for the most common case ---------------- */
export function FadeUp(props: Omit<RevealProps, 'variant'>) {
  return <Reveal variant="fadeUp" {...props} />;
}

/* ---------------- <Stagger> — container that orchestrates children ---------------- */
interface StaggerProps
  extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView' | 'viewport'> {
  staggerChildren?: number;
  delayChildren?: number;
  amount?: number;
  once?: boolean;
  as?: 'div' | 'section' | 'ul' | 'ol';
  children: ReactNode;
}

export function Stagger({
  staggerChildren = 0.08,
  delayChildren = 0.1,
  amount = viewportDefaults.amount,
  once = viewportDefaults.once,
  as = 'div',
  children,
  ...rest
}: StaggerProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      variants={stagger(staggerChildren, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* ---------------- <Stagger.Item> — child of <Stagger>, picks up parent's orchestration ---------------- */
interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  variant?: VariantName;
  as?: MotionTagName;
  children: ReactNode;
}

function StaggerItem({
  variant = 'fadeUp',
  as = 'div',
  children,
  ...rest
}: StaggerItemProps) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag variants={variantMap[variant]} {...rest}>
      {children}
    </MotionTag>
  );
}

Stagger.Item = StaggerItem;
