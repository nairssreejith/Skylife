import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { easings } from '@/lib/motion';
import { Stagger, FadeUp } from '@/components/motion';
import Magnetic from '@/components/Magnetic';
import { cn } from '@/lib/utils';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const markY = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-[calc(100svh-88px)] overflow-hidden -mt-[80px] md:-mt-[88px] pt-[80px] md:pt-[88px] bg-ink"
    >
      <motion.div aria-hidden style={{ y: bgY }} className="absolute inset-0 -z-20">
        <div
          className="absolute -top-40 -right-40 w-[60rem] h-[60rem] rounded-full opacity-[0.18] blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(200,169,106,0.55), transparent 70%)' }}
        />
        <div
          className="absolute -bottom-60 -left-40 w-[50rem] h-[50rem] rounded-full opacity-[0.20] blur-3xl"
          style={{ background: 'radial-gradient(closest-side, rgba(20,20,24,1), transparent 70%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/0 via-ink/30 to-ink" />
      </motion.div>

      <motion.span
        aria-hidden
        style={{ y: markY }}
        className={cn(
          'pointer-events-none select-none absolute -right-6 md:right-[-2vw] top-1/2 -translate-y-1/2 -z-10',
          'font-display italic leading-none text-bone/[0.04]',
          'text-[28vw] md:text-[22vw] tracking-tightest'
        )}
      >
        S
      </motion.span>

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-y-0 left-[max(2rem,4vw)] w-px bg-bone/[0.05]" />
        <div className="absolute inset-y-0 right-[max(2rem,4vw)] w-px bg-bone/[0.05]" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 min-h-[calc(100svh-88px)] flex items-center"
      >
        <div className="w-full max-w-container mx-auto px-gutter">
          <Stagger staggerChildren={0.09} delayChildren={0.15} amount={0.2} className="max-w-4xl">
            <Stagger.Item
              data-testid="hero-eyebrow"
              className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted"
            >
              <span className="h-px w-10 bg-gold/60" />
              <span className="text-gold/90">Est. 2018</span>
              <span>Skylife · Trivandrum</span>
            </Stagger.Item>

            <Stagger.Item
              as="h1"
              data-testid="hero-heading"
              className={cn(
                'mt-8 font-display text-fluid-6xl leading-display tracking-tightest',
                'text-bone'
              )}
            >
              Your dreams,
              <br />
              <span className="italic font-light text-gold">given a home.</span>
            </Stagger.Item>

            <Stagger.Item
              as="p"
              data-testid="hero-subhead"
              className="mt-8 max-w-xl text-fluid-lg leading-loose text-bone/65 font-light"
            >
              Skylife is a Trivandrum-based atelier shaping interiors,
              architecture, and craft. Fifty homes, one promise — kept since
              2018.
            </Stagger.Item>

            <Stagger.Item className="mt-12 flex flex-wrap items-center gap-5">
              <Magnetic strength={0.3}>
                <Link
                  to="/#projects"
                  data-testid="hero-cta-primary"
                  className={cn(
                    'group relative inline-flex items-center gap-3',
                    'px-7 py-4 rounded-full',
                    'bg-gold text-ink text-[11px] uppercase tracking-widest font-medium',
                    'transition-all duration-base ease-silk',
                    'hover:bg-gold-deep hover:shadow-glow-gold hover:-translate-y-0.5'
                  )}
                >
                  See our work
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-base ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </Magnetic>

              <Magnetic strength={0.22}>
                <Link
                  to="/#contact"
                  data-testid="hero-cta-secondary"
                  className={cn(
                    'group relative inline-flex items-center gap-3',
                    'px-1 py-4 text-[11px] uppercase tracking-widest font-medium',
                    'text-bone/85 hover:text-bone',
                    'transition-colors duration-base ease-silk'
                  )}
                >
                  <span className="relative">
                    Let&apos;s talk
                    <span className="absolute -bottom-1 left-0 h-px w-full bg-bone/30 transition-all duration-slow ease-luxury group-hover:bg-gold" />
                  </span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-bone/20 transition-all duration-base ease-silk group-hover:border-gold group-hover:bg-gold/10">
                    <ArrowUpRight size={12} strokeWidth={1.5} />
                  </span>
                </Link>
              </Magnetic>
            </Stagger.Item>
          </Stagger>
        </div>

        <FadeUp
          delay={0.85}
          data-testid="hero-meta"
          className="absolute bottom-8 left-0 right-0 px-gutter"
        >
          <div className="max-w-container mx-auto flex items-end justify-between gap-4 text-[10px] uppercase tracking-widest text-muted">
            <span className="truncate">50+ Projects · 50+ Clients</span>
            <span className="hidden sm:block"><ScrollHint /></span>
            <span className="hidden md:inline">Thiruvananthapuram, Kerala</span>
          </div>
        </FadeUp>
      </motion.div>
    </section>
  );
}

function ScrollHint() {
  return (
    <div className="flex flex-col items-center gap-2 text-bone/55" aria-hidden>
      <span className="text-[10px] tracking-widest">Scroll</span>
      <span className="relative h-8 w-px bg-bone/15 overflow-hidden">
        <motion.span
          className="absolute top-0 left-0 h-3 w-px bg-gold"
          animate={{ y: [-12, 32] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: easings.glide,
            repeatDelay: 0.2,
          }}
        />
      </span>
    </div>
  );
}
