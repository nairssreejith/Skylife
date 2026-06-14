/**
 * Motion wrappers — thin, opinionated Framer Motion helpers
 * built on the shared variants in src/lib/motion.ts.
 *
 * Usage:
 *   <Reveal>...</Reveal>                 // fadeUp on scroll into view
 *   <Reveal variant="rise" delay={0.1}>...</Reveal>
 *   <Stagger>
 *     <Stagger.Item>...</Stagger.Item>
 *     <Stagger.Item>...</Stagger.Item>
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

const variantMap: Record<VariantName, Variants> = {
  fadeIn,
  fadeUp,
  fadeDown,
  rise,
  scaleIn,
  revealX,
};

/* ---------------- <Reveal> ---------------- */
interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView' | 'viewport'> {
  variant?: VariantName;
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'span' | 'li' | 'p' | 'header' | 'footer';
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

/* ---------------- <Stagger> ---------------- */
interface StaggerProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'whileInView' | 'viewport'> {
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

/* ---------------- <Stagger.Item> ---------------- */
interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  variant?: VariantName;
  as?: 'div' | 'li' | 'span' | 'article';
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
