import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FadeUp } from '@/components/motion';
import ProjectsGrid from '@/components/sections/ProjectsGrid';
import { projects } from '@/lib/projects';
import { cn } from '@/lib/utils';

/**
 * ProjectsSection — single-page-mode projects section.
 * Reuses the auto-generated ProjectsGrid that reads from filesystem.
 */
export default function ProjectsSection() {
  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="relative sl-section overflow-hidden scroll-mt-24"
    >
      <div className="sl-container">
        <FadeUp className="flex flex-wrap items-end justify-between gap-8 max-w-container">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted">
              <span className="h-px w-10 bg-gold/60" />
              <span className="text-gold/90">03</span>
              <span>Projects · {String(projects.length).padStart(2, '0')}</span>
            </div>
            <h2 className="mt-8 font-display text-fluid-5xl leading-display tracking-tightest text-bone">
              A quiet body of work,
              <br />
              <span className="italic font-light text-gold">made over years.</span>
            </h2>
          </div>
          <p className="max-w-md text-fluid-base leading-loose text-bone/65 font-light">
            Every project Skylife has shaped, kept to its essential lines. Some
            are recent; some have aged into themselves.
          </p>
        </FadeUp>

        <div className="mt-section">
          <ProjectsGrid />
        </div>

        {/* Project archive teaser — only meaningful if you have more than fit in view */}
        {projects.length > 4 && (
          <FadeUp delay={0.1} className="mt-16 flex items-center justify-end">
            <Link
              to="/#projects"
              className={cn(
                'group inline-flex items-center gap-3',
                'text-[11px] uppercase tracking-widest text-bone/85',
                'transition-colors duration-base ease-silk hover:text-gold'
              )}
            >
              <span className="relative">
                The full archive
                <span className="absolute -bottom-1 left-0 h-px w-full bg-bone/30 transition-colors duration-slow ease-luxury group-hover:bg-gold" />
              </span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-bone/20 transition-all duration-base ease-silk group-hover:border-gold group-hover:bg-gold/10">
                <ArrowUpRight size={12} strokeWidth={1.5} />
              </span>
            </Link>
          </FadeUp>
        )}
      </div>
    </section>
  );
}
