import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Tailwind-merge extended with our custom fluid font-size tokens so
 * `text-fluid-*` classes aren't stripped when combined with `text-{color}`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'fluid-xs', 'fluid-sm', 'fluid-base', 'fluid-lg', 'fluid-xl',
            'fluid-2xl', 'fluid-3xl', 'fluid-4xl', 'fluid-5xl', 'fluid-6xl',
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
