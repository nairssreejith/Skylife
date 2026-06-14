import { FadeUp, Stagger } from '@/components/motion';

const principles = [
  {
    no: '01',
    label: 'Craft',
    body: 'We design, build, and finish with our own teams. Drawings, masonry, joinery, and the final coat of paint — none of it delegated, all of it answered for.',
  },
  {
    no: '02',
    label: 'Patience',
    body: 'Since 2018 the same small studio has stayed close to every project — from the first site walk to the final piece of furniture taking its place.',
  },
  {
    no: '03',
    label: 'Trust',
    body: 'Fifty homes, fifty clients, all delivered on time and on budget. That is the promise we keep, project after project.',
  },
];

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '7', label: 'Years of Practice' },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative sl-section overflow-hidden scroll-mt-24"
    >
      <div className="sl-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <FadeUp className="lg:col-span-5">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-gold/90">02</span>
            <span>About</span>
          </div>
          <h2 className="mt-8 font-display text-fluid-5xl leading-display tracking-tightest text-bone">
            A Trivandrum studio,
            <br />
            <span className="italic font-light text-gold">shaping homes since 2018.</span>
          </h2>
          <p className="mt-8 max-w-md text-fluid-base leading-loose text-bone/65 font-light">
            Skylife — known to those we serve as Skylifetheamro — is a small
            atelier of designers, builders, and stewards based in
            Thiruvananthapuram, Kerala. Every house we shape begins as a
            conversation; every conversation ends as a home.
          </p>

          {/* Stats row */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-bone/[0.08] pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-fluid-3xl text-gold tracking-tight">
                  {s.value}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-widest text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        <div className="lg:col-span-7 lg:pt-16">
          <Stagger staggerChildren={0.12} amount={0.2} className="flex flex-col gap-12">
            {principles.map((p) => (
              <Stagger.Item
                key={p.no}
                className="flex flex-col md:flex-row gap-6 md:gap-10 border-t border-bone/[0.06] pt-8"
              >
                <div className="md:w-32 shrink-0 flex items-start gap-3">
                  <span className="font-display italic text-fluid-xl text-gold/80">{p.no}</span>
                  <span className="text-[11px] uppercase tracking-widest text-bone/85 mt-2">
                    {p.label}
                  </span>
                </div>
                <p className="text-fluid-base leading-loose text-bone/70 font-light max-w-xl">
                  {p.body}
                </p>
              </Stagger.Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
