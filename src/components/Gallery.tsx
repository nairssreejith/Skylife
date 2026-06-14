import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from '@/components/Image';
import { easings } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Gallery — reusable, dependency-free image gallery.
 *   • Responsive masonry-ish grid (CSS columns)
 *   • Click thumbnail to open lightbox
 *   • Keyboard nav (← → Esc)
 *   • Lazy-loaded thumbnails; eager-loaded active lightbox image
 *   • Honors prefers-reduced-motion via shared variants
 */
interface GalleryProps {
  images: string[];
  alt: string;
}

export default function Gallery({ images, alt }: GalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const open = activeIdx !== null;

  const close = useCallback(() => setActiveIdx(null), []);
  const prev = useCallback(
    () => setActiveIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setActiveIdx((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  // Keyboard nav + body-scroll lock when open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, prev, next]);

  if (images.length === 0) return null;

  return (
    <>
      {/* CSS-columns masonry — minimal & responsive */}
      <div
        data-testid="gallery"
        className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5"
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActiveIdx(i)}
            data-testid={`gallery-thumb-${i}`}
            className={cn(
              'group block w-full overflow-hidden rounded-md',
              'border border-bone/[0.06] bg-graphite/30',
              'transition-all duration-slow ease-luxury',
              'hover:border-gold/30 hover:shadow-lifted'
            )}
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            <span className="block overflow-hidden">
              <Image
                src={src}
                alt={`${alt} — image ${i + 1}`}
                className="w-full h-auto transition-transform duration-cinematic ease-luxury group-hover:scale-[1.03]"
              />
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && activeIdx !== null && (
          <motion.div
            key="lightbox"
            data-testid="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easings.luxury }}
            className="fixed inset-0 z-modal bg-ink/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-12"
            onClick={close}
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              data-testid="gallery-close"
              aria-label="Close gallery"
              className="absolute top-6 right-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 text-bone/85 transition-all duration-base ease-silk hover:border-gold hover:text-gold"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            {/* Prev */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                data-testid="gallery-prev"
                aria-label="Previous image"
                className="absolute left-4 md:left-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 text-bone/80 transition-all duration-base ease-silk hover:border-gold hover:text-gold"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
            )}

            {/* Active image */}
            <motion.div
              key={images[activeIdx]}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.4, ease: easings.luxury }}
              className="relative max-w-[min(90vw,1400px)] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIdx]}
                alt={`${alt} — image ${activeIdx + 1}`}
                priority
                className="max-h-[85vh] w-auto h-auto object-contain rounded-sm"
              />
              <div className="mt-4 flex items-center justify-center text-[10px] uppercase tracking-widest text-bone/50">
                <span>{String(activeIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
              </div>
            </motion.div>

            {/* Next */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                data-testid="gallery-next"
                aria-label="Next image"
                className="absolute right-4 md:right-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 text-bone/80 transition-all duration-base ease-silk hover:border-gold hover:text-gold"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
