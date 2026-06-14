import { FadeUp } from '@/components/motion';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import { projects } from '@/lib/projects';

export default function Projects() {
  return (
    <section data-testid="projects-section" className="sl-section">
      <div className="sl-container">
        <FadeUp className="max-w-3xl">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-gold/90">03</span>
            <span>Projects · {String(projects.length).padStart(2, '0')}</span>
          </div>
          <h1
            data-testid="projects-heading"
            className="mt-8 font-display text-fluid-5xl leading-display tracking-tightest text-bone"
          >
            A quiet body of work,
            <br />
            <span className="italic font-light text-gold">made over years.</span>
          </h1>
          <p className="mt-8 max-w-xl text-fluid-base leading-loose text-bone/65 font-light">
            Every project Skylife has shaped, kept to its essential lines. Some
            are recent; some have aged into themselves.
          </p>
        </FadeUp>

        <div className="mt-section">
          <ProjectsGrid />
        </div>
      </div>
    </section>
  );
}
