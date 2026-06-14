import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { FadeUp, Stagger } from '@/components/motion';
import Image from '@/components/Image';
import { projects } from '@/lib/projects';
import { cn } from '@/lib/utils';

/**
 * ProjectsGrid — auto-generated cards for every project in /projects/.
 * Reused by both the index page and (potentially) the homepage.
 */
export default function ProjectsGrid() {
  if (projects.length === 0) {
    return (
      <p className="text-bone/50 text-fluid-sm">
        No projects yet — add a folder to <code>/projects/</code>.
      </p>
    );
  }

  return (
    <Stagger
      staggerChildren={0.1}
      delayChildren={0.1}
      amount={0.1}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8"
    >
      {projects.map((p, i) => (
        <Stagger.Item
          key={p.slug}
          as="article"
          data-testid={`project-card-${p.slug}`}
          // Stagger every other card down a touch for editorial asymmetry
          className={cn('md:mt-0', i % 2 === 1 && 'md:mt-16')}
        >
          <Link
            to={`/projects/${p.slug}`}
            data-testid={`project-card-link-${p.slug}`}
            className="group block"
          >
            {/* Cover */}
            <div className="relative aspect-[5/4] overflow-hidden rounded-md bg-graphite/40">
              <Image
                src={p.cover}
                alt={`${p.title} — cover`}
                priority={i < 2}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-cinematic ease-luxury group-hover:scale-[1.04]"
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
              {/* Top-edge hairline highlight */}
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bone/15 to-transparent" />
              {/* Category chip */}
              <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full border border-bone/20 bg-ink/40 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-widest text-bone/85">
                {p.category}
              </span>
              {/* Arrow indicator */}
              <span className="absolute top-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 bg-ink/40 text-bone/80 backdrop-blur transition-all duration-base ease-silk group-hover:border-gold group-hover:text-gold group-hover:rotate-12">
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </span>
            </div>

            {/* Caption */}
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-fluid-2xl leading-display tracking-tight text-bone transition-colors duration-base ease-silk group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="mt-2 text-[11px] uppercase tracking-widest text-muted">
                  {p.location} · {p.year}
                </p>
              </div>
            </div>
          </Link>
        </Stagger.Item>
      ))}
    </Stagger>
  );
}
