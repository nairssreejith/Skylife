/**
 * Smooth-scroll to an element by id. Uses Lenis if mounted, otherwise
 * falls back to native scrollIntoView. Safe to call from anywhere.
 */
export function scrollToId(id: string, offset = -64) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
