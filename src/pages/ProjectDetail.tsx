import { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeUp } from '@/components/motion';
import Image from '@/components/Image';
import Gallery from '@/components/Gallery';
import { getProjectBySlug, projects } from '@/lib/projects';
import { easings } from '@/lib/motion';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // Always call hooks unconditionally
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  // Parallax: image rises a bit, overlay deepens, title drifts up
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  if (!project) {
    return <Navigate to="/#projects" replace />;
  }

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const hasOthers = projects.length > 1;

  return (
    <article data-testid="project-detail" className="pb-section">
      {/* ============================================================
         CINEMATIC HERO — fullscreen, parallax, title overlay
         ============================================================ */}
      <section
        ref={heroRef}
        className="relative h-[100svh] min-h-[640px] overflow-hidden bg-graphite/40 -mt-[80px] md:-mt-[88px]"
      >
        {/* Parallax cover image */}
        <motion.div
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={project.cover}
            alt={`${project.title} — cover`}
            priority
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient overlay — deepens on scroll */}
        <motion.div
          aria-hidden
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink"
        />
        {/* Vignette on sides */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,11,13,0.55)_100%)]"
        />

        {/* Hero content (overlay) */}
        <div className="relative z-10 h-full flex items-end pb-16 md:pb-24 pt-[88px] md:pt-[112px]">
          <div className="sl-container w-full">
            <motion.div
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: easings.luxury, delay: 0.2 }}
              className="max-w-4xl"
            >
              {/* Eyebrow — category · year · location */}
              <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-widest text-bone/70">
                <span className="inline-flex items-center gap-2">
                  <span className="h-px w-8 bg-gold/70" />
                  <span className="text-gold/90">{project.category}</span>
                </span>
                <span className="opacity-50">·</span>
                <span>{project.year}</span>
                <span className="opacity-50">·</span>
                <span>{project.location}</span>
              </div>

              {/* Massive title */}
              <h1
                data-testid="project-title"
                className="mt-6 font-display text-fluid-6xl leading-display tracking-tightest text-bone"
              >
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Scroll cue at the bottom */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-bone/60"
        >
          <span>Scroll</span>
          <span className="relative h-8 w-px bg-bone/15 overflow-hidden">
            <motion.span
              className="absolute top-0 left-0 h-3 w-px bg-gold"
              animate={{ y: [-12, 32] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: easings.glide, repeatDelay: 0.2 }}
            />
          </span>
        </motion.div>
      </section>

      {/* ============================================================
         METADATA STRIP
         ============================================================ */}
      <section className="sl-container mt-16 md:mt-24">
        <FadeUp>
          <Link
            to="/#projects"
            data-testid="project-back"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-widest text-bone/70 hover:text-gold transition-colors duration-base ease-silk"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-base ease-silk group-hover:-translate-x-1"
            />
            All projects
          </Link>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 border-t border-bone/[0.08] pt-8">
            <MetaItem label="Year" value={String(project.year)} />
            <MetaItem label="Location" value={project.location} />
            <MetaItem label="Category" value={project.category} />
            {project.client && <MetaItem label="Client" value={project.client} />}
            {project.status && <MetaItem label="Status" value={project.status} />}
          </div>
        </FadeUp>
      </section>

      {/* ============================================================
         DESCRIPTION
         ============================================================ */}
      <section className="sl-container mt-20 md:mt-28">
        <FadeUp className="max-w-2xl">
          <p
            data-testid="project-description"
            className="text-fluid-lg leading-loose text-bone/75 font-light"
          >
            {project.description}
          </p>
        </FadeUp>
      </section>

      {/* ============================================================
         GALLERY
         ============================================================ */}
      {project.gallery.length > 0 && (
        <section className="sl-container mt-24 md:mt-32">
          <FadeUp>
            <div className="flex items-end justify-between gap-6 border-b border-bone/[0.08] pb-5">
              <h2 className="font-display text-fluid-3xl text-bone tracking-tight">
                Gallery
              </h2>
              <span className="text-[10px] uppercase tracking-widest text-muted">
                {String(project.gallery.length).padStart(2, '0')} images
              </span>
            </div>
          </FadeUp>
          <div className="mt-10">
            <Gallery images={project.gallery} alt={project.title} />
          </div>
        </section>
      )}

      {/* ============================================================
         PREV / NEXT
         ============================================================ */}
      {hasOthers && (
        <section className="sl-container mt-28 md:mt-32 border-t border-bone/[0.08] pt-12">
          <FadeUp className="flex items-center justify-between gap-6">
            <ProjectNavLink dir="prev" project={prev} />
            <ProjectNavLink dir="next" project={next} />
          </FadeUp>
        </section>
      )}
    </article>
  );
}

/* ----- subcomponents ----- */
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
