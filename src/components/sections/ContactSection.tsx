import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, Check, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeUp, Stagger } from '@/components/motion';
import Magnetic from '@/components/Magnetic';
import { cn } from '@/lib/utils';
import { easings } from '@/lib/motion';

const COMPANY = {
  name: 'Skylifetheamro',
  email: 'skylifetheamro@gmail.com',
  phone: '+91 98957 33114',
  phoneTel: '+919895733114',
  whatsapp: '919895733114',
  address: 'TC 7/741(10)4, Aswathy Towers, Maruthankuzhi, Kanjirampara P.O, Thiruvananthapuram, Kerala',
  city: 'Thiruvananthapuram, Kerala',
  socials: {
    facebook: 'https://www.facebook.com/SkyLifeTheamro',
    instagram: 'https://www.instagram.com/skylifetheamro/',
  },
};

const intents = ['Interior', 'Construction', 'Renovation', 'Other'] as const;
type Intent = (typeof intents)[number];

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
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[68rem] h-[68rem] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(200,169,106,0.85), transparent 70%)',
          }}
        />
        {/* Hairline column rules */}
        <div className="absolute inset-y-0 left-[max(2rem,4vw)] w-px bg-bone/[0.04]" />
        <div className="absolute inset-y-0 right-[max(2rem,4vw)] w-px bg-bone/[0.04]" />
      </div>

      <div className="sl-container">
        {/* ---------- Editorial header ---------- */}
        <FadeUp className="max-w-4xl">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-gold/90">05</span>
            <span>Contact</span>
          </div>

          <h2 className="mt-8 font-display text-fluid-6xl leading-display tracking-tightest text-bone">
            Let's
            <br />
            <span className="italic font-light text-gold">talk.</span>
          </h2>

          <p className="mt-8 max-w-xl text-fluid-lg leading-loose text-bone/65 font-light">
            Every Skylife home began with a phone call or a message. We reply
            in person, usually the same day. Visits to the studio in
            Maruthankuzhi are by appointment.
          </p>
        </FadeUp>

        {/* ---------- Two-column body ---------- */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: direct contact + WhatsApp */}
          <FadeUp className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted mb-6">
                Direct
              </p>
              <Stagger staggerChildren={0.08} className="flex flex-col gap-7">
                <Stagger.Item>
                  <ContactRow
                    icon={<Mail size={14} strokeWidth={1.5} />}
                    label="Write"
                    value={COMPANY.email}
                    href={`mailto:${COMPANY.email}`}
                  />
                </Stagger.Item>
                <Stagger.Item>
                  <ContactRow
                    icon={<Phone size={14} strokeWidth={1.5} />}
                    label="Call"
                    value={COMPANY.phone}
                    href={`tel:${COMPANY.phoneTel}`}
                  />
                </Stagger.Item>
                <Stagger.Item>
                  <ContactRow
                    icon={<MapPin size={14} strokeWidth={1.5} />}
                    label="Visit"
                    value={(
                      <>
                        Aswathy Towers, Maruthankuzhi<br />
                        <span className="text-bone/55 text-fluid-sm">Kanjirampara P.O · Thiruvananthapuram, Kerala</span>
                      </>
                    )}
                  />
                </Stagger.Item>
              </Stagger>
            </div>

            {/* WhatsApp CTA */}
            <div className="pt-2">
              <p className="text-[10px] uppercase tracking-widest text-muted mb-5">
                Faster
              </p>
              <Magnetic strength={0.25}>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent('Hello Skylife — I would like to begin a conversation about a project.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="contact-whatsapp"
                  className={cn(
                    'group inline-flex items-center gap-4',
                    'px-6 py-4 rounded-full',
                    'border border-bone/15 bg-bone/[0.02] backdrop-blur',
                    'text-bone/90 text-[11px] uppercase tracking-widest font-medium',
                    'transition-all duration-base ease-silk',
                    'hover:border-gold/50 hover:bg-gold/10 hover:text-bone hover:shadow-glow-gold'
                  )}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold transition-colors duration-base ease-silk group-hover:bg-gold group-hover:text-ink">
                    <MessageCircle size={14} strokeWidth={1.5} />
                  </span>
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className="text-bone/60 group-hover:text-gold transition-all duration-base ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Magnetic>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-muted">
                Mon–Sat · 09 → 19 IST
              </p>

              {/* Socials */}
              <div className="mt-8 flex items-center gap-3">
                <a
                  href={COMPANY.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Skylife on Instagram"
                  data-testid="social-instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 text-bone/75 transition-all duration-base ease-silk hover:border-gold hover:text-gold hover:bg-gold/5"
                >
                  <Instagram size={15} strokeWidth={1.5} />
                </a>
                <a
                  href={COMPANY.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Skylife on Facebook"
                  data-testid="social-facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/15 text-bone/75 transition-all duration-base ease-silk hover:border-gold hover:text-gold hover:bg-gold/5"
                >
                  <Facebook size={15} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Right: form */}
          <FadeUp delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </FadeUp>
        </div>

        {/* ---------- Bottom strip ---------- */}
        <div className="mt-24 pt-8 border-t border-bone/[0.06] flex flex-wrap items-end justify-between gap-6 text-[10px] uppercase tracking-widest text-muted">
          <span>© {new Date().getFullYear()} {COMPANY.name} · Trivandrum</span>
          <span>Crafted in Kerala, since 2018</span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ContactRow ---------------- */
function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  href?: string;
}) {
  const Wrapper = (href ? 'a' : 'div') as 'a' | 'div';
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={cn(
        'group flex items-start gap-5',
        href && 'transition-colors duration-base ease-silk'
      )}
    >
      <span className="mt-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bone/12 text-gold/85 transition-all duration-base ease-silk group-hover:border-gold group-hover:bg-gold/10">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-[10px] uppercase tracking-widest text-muted">
          {label}
        </span>
        <span
          className={cn(
            'mt-1 block font-display text-fluid-xl leading-display tracking-tight text-bone',
            href && 'group-hover:text-gold transition-colors duration-base ease-silk'
          )}
        >
          {value}
        </span>
      </span>
    </Wrapper>
  );
}

/* ---------------- ContactForm ---------------- */
function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [intent, setIntent] = useState<Intent>('Interior');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const valid = name.trim().length > 1 && /.+@.+\..+/.test(email) && message.trim().length > 4;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    const subject = `Enquiry — ${intent} (${name})`;
    const body = [
      `From: ${name} <${email}>`,
      `Interest: ${intent}`,
      '',
      message,
      '',
      '—',
      'Sent via skylife.example',
    ].join('\n');
    const url = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Open user's mail client + reflect confirmation
    window.location.href = url;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      formRef.current?.reset();
      setName(''); setEmail(''); setMessage(''); setIntent('Interior');
    }, 4200);
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      data-testid="contact-form"
      className="relative"
      noValidate
    >
      {/* Intent chips */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted mb-4">
          Interest
        </p>
        <div className="flex flex-wrap gap-2">
          {intents.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIntent(i)}
              data-testid={`contact-intent-${i.toLowerCase()}`}
              className={cn(
                'px-4 py-3 md:py-2 rounded-full text-[11px] uppercase tracking-widest',
                'transition-all duration-base ease-silk',
                intent === i
                  ? 'bg-gold text-ink border border-gold'
                  : 'border border-bone/15 text-bone/75 hover:border-bone/40 hover:text-bone'
              )}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        <Field label="Your name" id="cf-name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Field label="Email" id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="mt-2">
        <TextareaField
          label="How can we help?"
          id="cf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <p className="text-[10px] uppercase tracking-widest text-muted max-w-sm">
          We will reply from {COMPANY.email}. Your details are never shared.
        </p>
        <Magnetic strength={0.3}>
          <button
            type="submit"
            disabled={!valid || sent}
            data-testid="contact-submit"
            className={cn(
              'group relative inline-flex items-center gap-3',
              'px-7 py-4 rounded-full',
              'text-[11px] uppercase tracking-widest font-medium',
              'transition-all duration-base ease-silk',
              valid && !sent
                ? 'bg-gold text-ink hover:bg-gold-deep hover:shadow-glow-gold hover:-translate-y-0.5'
                : 'bg-bone/[0.05] text-bone/40 cursor-not-allowed'
            )}
          >
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: easings.luxury }}
                  className="inline-flex items-center gap-3"
                >
                  Thank you
                  <Check size={16} strokeWidth={1.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="send"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: easings.luxury }}
                  className="inline-flex items-center gap-3"
                >
                  Send enquiry
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-base ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </Magnetic>
      </div>
    </form>
  );
}

/* ---------------- Field (floating label) ---------------- */
interface FieldBaseProps {
  label: string;
  id: string;
  value: string;
}
interface FieldProps extends FieldBaseProps {
  type?: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function Field({ label, id, value, onChange, type = 'text', required }: FieldProps) {
  const filled = value.length > 0;
  return (
    <label htmlFor={id} className="group relative block pt-6 pb-4 border-b border-bone/15 transition-colors duration-base ease-silk focus-within:border-gold">
      <span
        className={cn(
          'pointer-events-none absolute left-0 origin-left text-bone/55',
          'transition-all duration-base ease-luxury',
          filled
            ? 'top-0 text-[10px] uppercase tracking-widest text-muted'
            : 'top-6 text-fluid-base'
        )}
      >
        {label}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete="off"
        className="block w-full bg-transparent text-bone text-fluid-base font-light outline-none placeholder:text-transparent"
      />
    </label>
  );
}

interface TextareaProps extends FieldBaseProps {
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
function TextareaField({ label, id, value, onChange, required }: TextareaProps) {
  const filled = value.length > 0;
  return (
    <label htmlFor={id} className="group relative block pt-6 pb-4 border-b border-bone/15 transition-colors duration-base ease-silk focus-within:border-gold">
      <span
        className={cn(
          'pointer-events-none absolute left-0 origin-left text-bone/55',
          'transition-all duration-base ease-luxury',
          filled
            ? 'top-0 text-[10px] uppercase tracking-widest text-muted'
            : 'top-6 text-fluid-base'
        )}
      >
        {label}
      </span>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        className="block w-full resize-none bg-transparent text-bone text-fluid-base font-light outline-none placeholder:text-transparent"
      />
    </label>
  );
}
