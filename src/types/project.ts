/**
 * Project content types. See projects/README.md for filesystem layout.
 */
export interface ProjectMeta {
  title: string;
  slug: string;
  year: number | string;
  location: string;
  category: string;
  description: string;
  client?: string;
  status?: string;
}

export interface Project extends ProjectMeta {
  /** Resolved URL of the cover image (post-Vite hashing). */
  cover: string;
  /** Resolved URLs of gallery images, sorted by filename. */
  gallery: string[];
}
