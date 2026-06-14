import { FadeUp, Stagger } from '@/components/motion';

const principles = [
  {
    no: '01',
    label: 'Discretion',
    body: 'We work in private. Names, places, and projects remain unspoken unless invited to be shared.',
  },
  {
    no: '02',
    label: 'Restraint',
    body: 'Less, made better. We remove before we add — in architecture, objects, and language alike.',
  },
  {
    no: '03',
    label: 'Permanence',
    body: 'We build for decades, not seasons. Materials, relationships, and ideas all selected with patience.',
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative sl-section overflow-hidden scroll-mt-24"
    >
      <div className="sl-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Editorial header — sticks left */}
        <FadeUp className="lg:col-span-5">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-gold/90">02</span>
            <span>About</span>
          </div>
          <h2 className="mt-8 font-display text-fluid-5xl leading-display tracking-tightest text-bone">
            A practice built on
            <br />
            <span className="italic font-light text-gold">quiet conviction.</span>
          </h2>
          <p className="mt-8 max-w-md text-fluid-base leading-loose text-bone/65 font-light">
            Skylife is an atelier of designers, hoteliers, and craftspeople. We
            work for a small number of clients in residence, travel, and
            object-making — beginning each engagement as a conversation, not a
            brief.
          </p>
        </FadeUp>

        {/* Three principles — right column */}
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
