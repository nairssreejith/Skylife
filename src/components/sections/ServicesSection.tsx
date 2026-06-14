import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FadeUp, Stagger } from '@/components/motion';
import Magnetic from '@/components/Magnetic';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------
   Services — Skylifetheamro's seven disciplines, in editorial form.
   3-col grid on lg, 2-col on md, 1-col on mobile.
------------------------------------------------------------------ */

const services = [
  {
    index: '01',
    title: 'Interior Design',
    blurb:
      'From plan to last patina — interiors composed for the way you actually live.',
    meta: 'Residential · Commercial',
  },
  {
    index: '02',
    title: 'Construction',
    blurb:
      'Ground-up homes built by our own teams. Foundation to final finish, all in-house.',
    meta: 'Residential · Mixed-use',
  },
  {
    index: '03',
    title: 'Renovation',
    blurb:
      'Old bones, new breath. Quietly transformed without overwriting what was already loved.',
    meta: 'Heritage · Modern',
  },
  {
    index: '04',
    title: 'Real Estate',
    blurb:
      'Land and addresses, selected for what they will become — not just what they are.',
    meta: 'Trivandrum & beyond',
  },
  {
    index: '05',
    title: 'Maintenance',
    blurb:
      'We stay close to the work we leave behind — for a year, for a decade, for as long as it stands.',
    meta: 'Annual contracts',
  },
  {
    index: '06',
    title: 'Loans',
    blurb:
      'Trusted introductions to financing partners, so the project never has to pause.',
    meta: 'Home · Construction',
  },
  {
    index: '07',
    title: 'Drawings',
    blurb:
      'Plans, elevations, and details — drawn with the patience of a craftsperson.',
    meta: 'Architectural · Interior',
  },
] as const;

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative sl-section overflow-hidden scroll-mt-24"
    >
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
        <FadeUp className="max-w-3xl">
          <div
            className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted"
            data-testid="services-eyebrow"
          >
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-gold/90">04</span>
            <span>Services</span>
          </div>
          <h2
            data-testid="services-heading"
            className="mt-8 font-display text-fluid-5xl leading-display tracking-tightest text-bone"
          >
            Seven crafts,
            <br />
            <span className="italic font-light text-gold">one studio.</span>
          </h2>
          <p className="mt-8 max-w-xl text-fluid-base leading-loose text-bone/65 font-light">
            From the first sketch to the last coat of paint — and the years
            that follow — Skylife answers for the whole journey of a home.
          </p>
        </FadeUp>

        <Stagger
          staggerChildren={0.1}
          delayChildren={0.1}
          amount={0.15}
          className="mt-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
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

        <FadeUp delay={0.2} className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-bone/[0.06] pt-8">
          <p className="text-[11px] uppercase tracking-widest text-muted">
            Engagements begin with a conversation.
          </p>
          <Magnetic strength={0.25}>
            <Link
              to="/#contact"
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
          </Magnetic>
        </FadeUp>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  index: string;
  title: string;
  blurb: string;
  meta: string;
}

function ServiceCard({ index, title, blurb, meta }: ServiceCardProps) {
  return (
    <Link
      to="/#contact"
      data-testid={`service-card-link-${index}`}
      className={cn(
        'group relative block h-full overflow-hidden rounded-lg',
        'border border-bone/[0.07] bg-bone/[0.015] backdrop-blur-xl',
        'p-7 md:p-8',
        'transition-all duration-slow ease-luxury',
        'hover:-translate-y-1 hover:border-gold/30 hover:bg-bone/[0.025] hover:shadow-lifted'
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-0 blur-3xl transition-opacity duration-slow ease-luxury group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(closest-side, rgba(200,169,106,0.30), transparent 70%)',
        }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <span className="font-display italic text-fluid-2xl text-gold/80">
            {index}
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-bone/15 text-bone/70 transition-all duration-base ease-silk group-hover:border-gold group-hover:text-gold group-hover:rotate-12">
            <ArrowUpRight size={12} strokeWidth={1.5} />
          </span>
        </div>

        <h3 className="mt-8 md:mt-10 font-display text-fluid-2xl leading-display tracking-tight text-bone">
          {title}
        </h3>

        <p className="mt-3 max-w-sm text-fluid-sm leading-loose text-bone/60 font-light">
          {blurb}
        </p>

        <div className="mt-6 flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted">
          <span className="h-px w-6 bg-bone/20 transition-colors duration-base ease-silk group-hover:bg-gold/70" />
          <span>{meta}</span>
        </div>
      </div>
    </Link>
  );
}
