import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FadeUp, Stagger } from '@/components/motion';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------
   Services — editorial 2×2 grid of premium glass cards.
   Concise, modern copy. Hover lifts + gold-shift + arrow drift.
------------------------------------------------------------------ */

const services = [
  {
    index: '01',
    title: 'Residences',
    blurb:
      'Private homes across cities and coastlines, held in discretion and offered by introduction.',
    meta: 'Geneva · Como · Kyoto',
    href: '/services',
  },
  {
    index: '02',
    title: 'Travel',
    blurb:
      'Bespoke itineraries designed around place, pace, and the unsaid preferences of those who know.',
    meta: 'Worldwide · By season',
    href: '/services',
  },
  {
    index: '03',
    title: 'Atelier',
    blurb:
      'Made-to-measure objects, garments, and interiors. Quietly, and only by invitation.',
    meta: 'Milano · Paris',
    href: '/services',
  },
  {
    index: '04',
    title: 'Concierge',
    blurb:
      'A single point of contact for the rare, the difficult, and the otherwise impossible.',
    meta: 'Always · Everywhere',
    href: '/services',
  },
] as const;

export default function Services() {
  return (
    <section
      data-testid="services-section"
      className="relative sl-section overflow-hidden"
    >
      {/* Decorative backdrop — soft gold pool, low opacity */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(200,169,106,0.85), transparent 70%)',
          }}
        />
      </div>

      <div className="sl-container">
        {/* ---------- Editorial header ---------- */}
        <FadeUp className="max-w-3xl">
          <div
            className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted"
            data-testid="services-eyebrow"
          >
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-gold/90">02</span>
            <span>Services</span>
          </div>
          <h2
            data-testid="services-heading"
            className="mt-8 font-display text-fluid-5xl leading-display tracking-tightest text-bone"
          >
            Four quiet disciplines,
            <br />
            <span className="italic font-light text-gold">privately practiced.</span>
          </h2>
          <p className="mt-8 max-w-xl text-fluid-base leading-loose text-bone/65 font-light">
            Skylife is organised around four enduring crafts. Each is led by a small
            team that answers, in person, to the people they serve.
          </p>
        </FadeUp>

        {/* ---------- Cards grid ---------- */}
        <Stagger
          staggerChildren={0.12}
          delayChildren={0.1}
          amount={0.15}
          className="mt-section grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7"
        >
          {services.map((s) => (
            <Stagger.Item
              key={s.index}
              as="article"
              data-testid={`service-card-${s.index}`}
            >
              <ServiceCard {...s} />
            </Stagger.Item>
          ))}
        </Stagger>

        {/* ---------- Footer line ---------- */}
        <FadeUp delay={0.2} className="mt-16 flex items-center justify-between gap-6 border-t border-bone/[0.06] pt-8">
          <p className="text-[11px] uppercase tracking-widest text-muted">
            Engagements begin with a conversation.
          </p>
          <Link
            to="/contact"
            data-testid="services-cta"
            className={cn(
              'group inline-flex items-center gap-3',
              'text-[11px] uppercase tracking-widest text-bone/90',
              'transition-colors duration-base ease-silk hover:text-gold'
            )}
          >
            <span className="relative">
              Begin
              <span className="absolute -bottom-1 left-0 h-px w-full bg-bone/30 transition-colors duration-slow ease-luxury group-hover:bg-gold" />
            </span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-bone/20 transition-all duration-base ease-silk group-hover:border-gold group-hover:bg-gold/10">
              <ArrowUpRight size={12} strokeWidth={1.5} />
            </span>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------------- ServiceCard ---------------- */
interface ServiceCardProps {
  index: string;
  title: string;
  blurb: string;
  meta: string;
  href: string;
}

function ServiceCard({ index, title, blurb, meta, href }: ServiceCardProps) {
  return (
    <Link
      to={href}
      data-testid={`service-card-link-${index}`}
      className={cn(
        'group relative block h-full overflow-hidden rounded-lg',
        'border border-bone/[0.07] bg-bone/[0.015] backdrop-blur-xl',
        'p-8 md:p-10',
        'transition-all duration-slow ease-luxury',
        'hover:-translate-y-1 hover:border-gold/30 hover:bg-bone/[0.025] hover:shadow-lifted'
      )}
    >
      {/* Subtle inner highlight — top edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent"
      />
      {/* Hover gold halo (radial, behind content) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-0 blur-3xl transition-opacity duration-slow ease-luxury group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(closest-side, rgba(200,169,106,0.30), transparent 70%)',
        }}
      />

      <div className="relative flex h-full flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <span className="font-display italic text-fluid-2xl text-gold/80">
            {index}
          </span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/15 text-bone/70 transition-all duration-base ease-silk group-hover:border-gold group-hover:text-gold group-hover:rotate-12">
            <ArrowUpRight size={14} strokeWidth={1.5} />
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-10 md:mt-14 font-display text-fluid-3xl leading-display tracking-tight text-bone transition-colors duration-base ease-silk group-hover:text-bone">
          {title}
        </h3>

        {/* Blurb */}
        <p className="mt-4 max-w-sm text-fluid-sm leading-loose text-bone/60 font-light">
          {blurb}
        </p>

        {/* Footer meta */}
        <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted">
          <span className="h-px w-6 bg-bone/20 transition-colors duration-base ease-silk group-hover:bg-gold/70" />
          <span>{meta}</span>
        </div>
      </div>
    </Link>
  );
}
