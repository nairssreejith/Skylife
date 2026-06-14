import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { FadeUp } from '@/components/motion';
import Magnetic from '@/components/Magnetic';
import { cn } from '@/lib/utils';

export default function ContactSection() {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative sl-section overflow-hidden scroll-mt-24"
    >
      {/* Decorative backdrop — gold pool */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(200,169,106,0.85), transparent 70%)',
          }}
        />
      </div>

      <div className="sl-container">
        <FadeUp className="max-w-4xl">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-gold/90">05</span>
            <span>Contact</span>
          </div>

          <h2 className="mt-8 font-display text-fluid-6xl leading-display tracking-tightest text-bone">
            Begin a
            <br />
            <span className="italic font-light text-gold">conversation.</span>
          </h2>

          <p className="mt-8 max-w-xl text-fluid-lg leading-loose text-bone/65 font-light">
            We answer in person, usually within two days. Introductions are
            welcome from friends of the house.
          </p>
        </FadeUp>

        {/* Contact details + CTA */}
        <FadeUp delay={0.15} className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 border-t border-bone/[0.08] pt-12">
          <ContactItem
            icon={<Mail size={14} strokeWidth={1.5} />}
            label="Write"
            value="atelier@skylife.example"
            href="mailto:atelier@skylife.example"
          />
          <ContactItem
            icon={<MapPin size={14} strokeWidth={1.5} />}
            label="Visit"
            value={(<>Geneva · Milano · Kyoto<br />By appointment only</>)}
          />
          <div className="flex items-end">
            <Magnetic strength={0.3}>
              <a
                href="mailto:atelier@skylife.example"
                data-testid="contact-cta"
                className={cn(
                  'group relative inline-flex items-center gap-3',
                  'px-7 py-4 rounded-full',
                  'bg-gold text-ink text-[11px] uppercase tracking-widest font-medium',
                  'transition-all duration-base ease-silk',
                  'hover:bg-gold-deep hover:shadow-glow-gold hover:-translate-y-0.5'
                )}
              >
                Introduce yourself
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-base ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
          </div>
        </FadeUp>

        {/* Bottom strip */}
        <div className="mt-24 pt-8 border-t border-bone/[0.06] flex flex-wrap items-end justify-between gap-6 text-[10px] uppercase tracking-widest text-muted">
          <span>© {new Date().getFullYear()} Skylife · Volume I</span>
          <span>Crafted in quiet</span>
        </div>
      </div>
    </section>
  );
}

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  href?: string;
}

function ContactItem({ icon, label, value, href }: ContactItemProps) {
  const Wrapper = href ? 'a' : 'div';
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className="group block"
    >
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted">
        <span className="text-gold/80">{icon}</span>
        {label}
      </div>
      <div className={cn(
        'mt-3 font-display text-fluid-xl leading-display text-bone',
        href && 'transition-colors duration-base ease-silk group-hover:text-gold'
      )}>
        {value}
      </div>
    </Wrapper>
  );
}
