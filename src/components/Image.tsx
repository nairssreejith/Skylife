import { useEffect, useState, type ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Image — single optimized image element with:
 *   • lazy loading + async decoding (priority="eager" disables)
 *   • soft fade-in on load (no layout shift; aspect ratio reserved by caller)
 *   • graceful fallback if src is empty
 *
 * Use inside containers that fix aspect-ratio (e.g. `aspect-[16/10]`) to
 * avoid CLS while images stream in.
 */
interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function Image({
  src,
  alt,
  priority = false,
  className,
  ...rest
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  // If src changes (e.g. modal nav), reset loaded state
  useEffect(() => {
    setLoaded(false);
  }, [src]);

  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'bg-graphite/40 flex items-center justify-center text-bone/30 text-xs uppercase tracking-widest',
          className
        )}
      >
        No image
      </div>
    );
  }

  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setLoaded(true)}
      className={cn(
        'transition-opacity duration-slower ease-luxury',
        loaded ? 'opacity-100' : 'opacity-0',
        className
      )}
    />
  );
}
