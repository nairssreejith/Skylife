/**
 * Filesystem-based project loader — zero backend, zero CMS.
 * Uses Vite's `import.meta.glob` to discover, parse, and bundle all project
 * content at BUILD time. New projects are picked up automatically: drop a
 * folder under `/projects/<slug>/` and it appears in the app on the next
 * dev-server reload / build.
 */
import type { Project, ProjectMeta } from '@/types/project';

/* ---------- details.json files ---------- */
const detailsModules = import.meta.glob<ProjectMeta>(
  '/projects/*/details.json',
  { eager: true, import: 'default' }
);

/* ---------- cover.{jpg,jpeg,png,webp,avif} ---------- */
const coverModules = import.meta.glob<string>(
  '/projects/*/cover.{jpg,jpeg,png,webp,avif}',
  { eager: true, query: '?url', import: 'default' }
);

/* ---------- gallery/*.{jpg,jpeg,png,webp,avif} ---------- */
const galleryModules = import.meta.glob<string>(
  '/projects/*/gallery/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, query: '?url', import: 'default' }
);

/* ---------- Build the typed Project[] ---------- */
export const projects: Project[] = Object.entries(detailsModules)
  .map(([detailsPath, meta]) => {
    const folder = detailsPath.replace('/details.json', '');

    const cover =
      Object.entries(coverModules).find(([p]) =>
        p.startsWith(folder + '/cover.')
      )?.[1] ?? '';

    const gallery = Object.entries(galleryModules)
      .filter(([p]) => p.startsWith(folder + '/gallery/'))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, url]) => url);

    return { ...meta, cover, gallery };
  })
  // newest first — by year desc, fallback to title
  .sort((a, b) => {
    const ya = Number(a.year) || 0;
    const yb = Number(b.year) || 0;
    if (ya !== yb) return yb - ya;
    return a.title.localeCompare(b.title);
  });

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
