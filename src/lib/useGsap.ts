/**
 * useGsap — minimal GSAP hook with proper cleanup via gsap.context.
 *
 * Usage:
 *   const ref = useRef<HTMLDivElement>(null);
 *   useGsap(() => {
 *     gsap.from('.title', { y: 40, opacity: 0, duration: 1 });
 *   }, ref);
 */
import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';

export function useGsap(
  setup: () => void,
  scope?: RefObject<HTMLElement>,
  deps: unknown[] = []
) {
  useEffect(() => {
    const ctx = gsap.context(setup, scope?.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
