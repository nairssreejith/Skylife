/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /* ---------- Typography ---------- */
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Times New Roman', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // map fluid tokens -> Tailwind classes (text-fluid-xl, etc.)
        'fluid-xs': 'var(--text-xs)',
        'fluid-sm': 'var(--text-sm)',
        'fluid-base': 'var(--text-base)',
        'fluid-lg': 'var(--text-lg)',
        'fluid-xl': 'var(--text-xl)',
        'fluid-2xl': 'var(--text-2xl)',
        'fluid-3xl': 'var(--text-3xl)',
        'fluid-4xl': 'var(--text-4xl)',
        'fluid-5xl': 'var(--text-5xl)',
        'fluid-6xl': 'var(--text-6xl)',
      },
      letterSpacing: {
        tightest: 'var(--tracking-tightest)',
        tight: 'var(--tracking-tight)',
        wide: 'var(--tracking-wide)',
        wider: 'var(--tracking-wider)',
        widest: 'var(--tracking-widest)',
      },
      lineHeight: {
        display: 'var(--leading-display)',
        heading: 'var(--leading-heading)',
        body: 'var(--leading-body)',
        loose: 'var(--leading-loose)',
      },

      /* ---------- Colors (mapped to CSS vars for theming) ---------- */
      colors: {
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        obsidian: 'rgb(var(--color-obsidian) / <alpha-value>)',
        graphite: 'rgb(var(--color-graphite) / <alpha-value>)',
        bone: 'rgb(var(--color-bone) / <alpha-value>)',
        porcelain: 'rgb(var(--color-porcelain) / <alpha-value>)',
        gold: {
          DEFAULT: 'rgb(var(--color-gold) / <alpha-value>)',
          deep: 'rgb(var(--color-gold-deep) / <alpha-value>)',
        },
        champagne: 'rgb(var(--color-champagne) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
      },

      /* ---------- Spacing rhythm ---------- */
      spacing: {
        section: 'var(--section-y)',
        gutter: 'var(--container-px)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },

      /* ---------- Radius ---------- */
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },

      /* ---------- Shadows ---------- */
      boxShadow: {
        veil: 'var(--shadow-veil)',
        soft: 'var(--shadow-soft)',
        lifted: 'var(--shadow-lifted)',
        'glow-gold': 'var(--shadow-glow-gold)',
      },

      /* ---------- Motion ---------- */
      transitionTimingFunction: {
        silk: 'var(--ease-silk)',
        luxury: 'var(--ease-luxury)',
        glide: 'var(--ease-glide)',
        spring: 'var(--ease-spring)',
      },
      transitionDuration: {
        instant: 'var(--dur-instant)',
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
        slower: 'var(--dur-slower)',
        cinematic: 'var(--dur-cinematic)',
      },

      /* ---------- Z-index ---------- */
      zIndex: {
        base: 'var(--z-base)',
        raised: 'var(--z-raised)',
        sticky: 'var(--z-sticky)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        toast: 'var(--z-toast)',
      },
    },
  },
  plugins: [],
};
