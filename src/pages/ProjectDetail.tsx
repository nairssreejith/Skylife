import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { FadeUp } from '@/components/motion';
import Image from '@/components/Image';
import Gallery from '@/components/Gallery';
import { getProjectBySlug, projects } from '@/lib/projects';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  // For prev/next navigation
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];
  const hasOthers = projects.length > 1;

  return (
    <article data-testid="project-detail" className="pb-section">
      {/* ---------- Cover ---------- */}
      <div className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-graphite/40">
        <Image
          src={project.cover}
          alt={`${project.title} — cover`}
          priority
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/0" />
      </div>

      {/* ---------- Metadata strip ---------- */}
      <div className="sl-container -mt-16 md:-mt-24 relative z-10">
        <FadeUp className="max-w-container">
          <Link
            to="/projects"
            data-testid="project-back"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-widest text-bone/70 hover:text-gold transition-colors duration-base ease-silk"
          >
            <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform duration-base ease-silk group-hover:-translate-x-1" />
            All projects
          </Link>

          <h1
            data-testid="project-title"
            className="mt-8 font-display text-fluid-5xl leading-display tracking-tightest text-bone"
          >
            {project.title}
          </h1>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 border-t border-bone/[0.08] pt-8">
            <MetaItem label="Year" value={String(project.year)} />
            <MetaItem label="Location" value={project.location} />
            <MetaItem label="Category" value={project.category} />
            {project.client && <MetaItem label="Client" value={project.client} />}
            {project.status && <MetaItem label="Status" value={project.status} />}
          </div>
        </FadeUp>
      </div>

      {/* ---------- Description ---------- */}
      <div className="sl-container mt-16 md:mt-24">
        <FadeUp className="max-w-2xl">
          <p
            data-testid="project-description"
            className="text-fluid-lg leading-loose text-bone/75 font-light"
          >
            {project.description}
          </p>
        </FadeUp>
      </div>

      {/* ---------- Gallery ---------- */}
      {project.gallery.length > 0 && (
        <div className="sl-container mt-16 md:mt-24">
          <FadeUp>
            <div className="flex items-end justify-between gap-6 border-b border-bone/[0.08] pb-5">
              <h2 className="font-display text-fluid-2xl text-bone tracking-tight">
                Gallery
              </h2>
              <span className="text-[10px] uppercase tracking-widest text-muted">
                {String(project.gallery.length).padStart(2, '0')} images
              </span>
            </div>
          </FadeUp>
          <div className="mt-8">
            <Gallery images={project.gallery} alt={project.title} />
          </div>
        </div>
      )}

      {/* ---------- Prev / Next ---------- */}
      {hasOthers && (
        <div className="sl-container mt-24 md:mt-32 border-t border-bone/[0.08] pt-10">
          <FadeUp className="flex items-center justify-between gap-6">
            <ProjectNavLink dir="prev" project={prev} />
            <ProjectNavLink dir="next" project={next} />
          </FadeUp>
        </div>
      )}
    </article>
  );
}

/* ----- subcomponents (kept local — used only here) ----- */
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted">{label}</div>
      <div className="mt-2 text-fluid-base text-bone/90 font-light">{value}</div>
    </div>
  );
}

function ProjectNavLink({
  dir,
  project,
}: {
  dir: 'prev' | 'next';
  project: { slug: string; title: string };
}) {
  const isNext = dir === 'next';
  return (
    <Link
      to={`/projects/${project.slug}`}
      data-testid={`project-${dir}`}
      className="group flex flex-col gap-2 text-bone/80 hover:text-bone transition-colors duration-base ease-silk"
      style={{ textAlign: isNext ? 'right' : 'left' }}
    >
      <span className="text-[10px] uppercase tracking-widest text-muted inline-flex items-center gap-2">
        {!isNext && <ArrowLeft size={12} strokeWidth={1.5} />}
        {isNext ? 'Next' : 'Previous'}
        {isNext && <ArrowUpRight size={12} strokeWidth={1.5} />}
      </span>
      <span className="font-display text-fluid-xl tracking-tight group-hover:text-gold transition-colors duration-base ease-silk">
        {project.title}
      </span>
    </Link>
  );
}
