import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { easings } from '@/lib/motion';
import { scrollToId } from '@/lib/scroll';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('home');
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  const onHome = pathname === '/';

  // Scroll-aware: transparent at top -> glass after ~16px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section via IntersectionObserver (home page only)
  useEffect(() => {
    if (!onHome) return;
    const ids = links.map((l) => l.id);
    const observers: IntersectionObserver[] = [];
    const seen = new Map<string, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          seen.set(e.target.id, e.intersectionRatio);
        }
        // Pick the section with highest visible ratio
        let best = 'home';
        let bestVal = 0;
        seen.forEach((v, k) => {
          if (v > bestVal) {
            bestVal = v;
            best = k;
          }
        });
        if (bestVal > 0) setActiveId(best);
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    observers.push(io);
    return () => observers.forEach((o) => o.disconnect());
  }, [onHome, pathname]);

  // Close drawer on route or hash change + lock body scroll while open
  useEffect(() => setOpen(false), [pathname, hash]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    if (onHome) {
      // Already on home — just scroll
      scrollToId(id);
      // Reflect in URL (no history spam)
      window.history.replaceState(null, '', id === 'home' ? '/' : `/#${id}`);
      setActiveId(id);
    } else {
      // From a sub-route (e.g. project detail): navigate home, Home will scroll
      navigate(id === 'home' ? '/' : `/#${id}`);
    }
  };

  return (
    <>
      <motion.header
        data-testid="navbar"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: easings.luxury }}
        className={cn(
          'fixed inset-x-0 top-0 z-sticky transition-all duration-slow ease-silk',
          scrolled
            ? 'backdrop-blur-xl bg-ink/55 border-b border-white/[0.06] shadow-veil'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div
          className={cn(
            'max-w-container mx-auto flex items-center justify-between',
            'px-gutter transition-[padding] duration-slow ease-silk',
            scrolled ? 'py-3.5' : 'py-6'
          )}
        >
          {/* Wordmark */}
          <Link
            to="/"
            onClick={(e) => onHome && handleNavClick(e, 'home')}
            data-testid="navbar-logo"
            className="group relative font-display text-fluid-2xl leading-none text-bone"
          >
            <span className="tracking-tight">Skylife</span>
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-[width] duration-slow ease-luxury group-hover:w-full" />
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary">
            {links.map((l) => {
              const isActive = onHome && activeId === l.id;
              return (
                <a
                  key={l.id}
                  href={l.id === 'home' ? '/' : `/#${l.id}`}
                  onClick={(e) => handleNavClick(e, l.id)}
                  data-testid={`nav-link-${l.label.toLowerCase()}`}
                  className={cn(
                    'group relative font-sans text-[11px] uppercase tracking-widest',
                    'transition-colors duration-fast ease-silk',
                    isActive ? 'text-gold' : 'text-bone/70 hover:text-bone'
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      'absolute -bottom-2 left-1/2 -translate-x-1/2 h-px bg-gold',
                      'transition-all duration-slow ease-luxury',
                      isActive
                        ? 'w-6 opacity-100'
                        : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-100'
                    )}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            data-testid="navbar-cta"
            className={cn(
              'hidden md:inline-flex items-center justify-center',
              'px-5 py-2.5 text-[11px] uppercase tracking-widest',
              'border border-bone/25 text-bone/90 rounded-full',
              'transition-all duration-base ease-silk',
              'hover:bg-gold hover:text-ink hover:border-gold hover:shadow-glow-gold'
            )}
          >
            Enquire
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            data-testid="navbar-menu-toggle"
            className="md:hidden relative inline-flex items-center justify-center w-10 h-10 text-bone"
          >
            <AnimatePresence initial={false} mode="wait">
              {open ? (
                <motion.span key="x" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }} transition={{ duration: 0.2, ease: easings.silk }}>
                  <X size={22} strokeWidth={1.25} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ opacity: 0, rotate: 45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -45 }} transition={{ duration: 0.2, ease: easings.silk }}>
                  <Menu size={22} strokeWidth={1.25} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-drawer"
              data-testid="navbar-mobile-drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: easings.luxury }}
              className="md:hidden fixed inset-0 bg-ink/95 backdrop-blur-2xl"
              style={{ top: scrolled ? 64 : 80 }}
            >
              <motion.nav
                className="h-full px-gutter pt-10 pb-16 flex flex-col"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                }}
                aria-label="Mobile primary"
              >
                {links.map((l) => (
                  <motion.div
                    key={l.id}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easings.luxury } },
                    }}
                    className="border-b border-white/[0.06]"
                  >
                    <a
                      href={l.id === 'home' ? '/' : `/#${l.id}`}
                      onClick={(e) => handleNavClick(e, l.id)}
                      data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                      className={cn(
                        'block py-6 font-display text-fluid-4xl leading-none',
                        'transition-colors duration-base ease-silk',
                        onHome && activeId === l.id ? 'text-gold' : 'text-bone hover:text-gold'
                      )}
                    >
                      {l.label}
                    </a>
                  </motion.div>
                ))}

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easings.luxury } },
                  }}
                  className="mt-auto pt-10"
                >
                  <a
                    href="/#contact"
                    onClick={(e) => handleNavClick(e, 'contact')}
                    data-testid="mobile-navbar-cta"
                    className={cn(
                      'inline-flex w-full items-center justify-center',
                      'px-6 py-4 text-xs uppercase tracking-widest',
                      'bg-gold text-ink rounded-full',
                      'transition-all duration-base ease-silk',
                      'hover:bg-gold-deep hover:shadow-glow-gold'
                    )}
                  >
                    Enquire
                  </a>
                  <p className="mt-6 text-[10px] uppercase tracking-widest text-muted">
                    Skylife — Est. 2026
                  </p>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
