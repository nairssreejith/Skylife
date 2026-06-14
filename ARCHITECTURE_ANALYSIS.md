# Skylife — Architecture Analysis & Luxury UI Revamp Plan

> **Status:** Baseline scaffold audit complete. Ready for `feature/luxury-ui-revamp`.
> **Date:** 2026-01
> **Branch under review:** `main`

---

## 1. Repository Snapshot

| Aspect              | Finding                                                                 |
| ------------------- | ----------------------------------------------------------------------- |
| Repo state at clone | **Empty repository** (no commits, no branches, no files)                |
| Action taken        | Scaffolded a clean React + Vite + TypeScript baseline as `main`         |
| Build status        | ✅ `yarn build` passes (no type errors, no runtime warnings post-fix)   |
| Dev server          | Vite, runs on `0.0.0.0:3000`                                            |

---

## 2. Current Architecture

### 2.1 Framework & Tooling

| Layer            | Choice                          | Version  |
| ---------------- | ------------------------------- | -------- |
| UI framework     | **React**                       | 18.3.1   |
| Language         | **TypeScript**                  | 5.6.3    |
| Build tool       | **Vite**                        | 5.4.11   |
| Package manager  | **Yarn** (lockfile: `yarn.lock`) | 1.22.x  |
| CSS framework    | **Tailwind CSS**                | 3.4.15   |
| PostCSS          | autoprefixer + tailwindcss      | latest   |

### 2.2 Animation Libraries Installed

| Library            | Version  | Use                                     |
| ------------------ | -------- | --------------------------------------- |
| **framer-motion**  | 11.11.17 | Page/section entrance, micro-interactions |
| _(none others)_    | —        | No GSAP, no Lottie, no Three.js yet     |

### 2.3 Routing

- **react-router-dom v6.28.0** with `BrowserRouter` in `src/main.tsx`.
- Routes declared in `src/App.tsx`:
  - `/` → `Home`
  - `/about` → `About`
  - `/services` → `Services`
  - `/contact` → `Contact`
- Navigation handled by `src/components/Navbar.tsx` using `NavLink` (active-state aware).
- No nested routes, no lazy loading yet.

### 2.4 Reusable UI Components

Located under `src/components/`:

| Component   | Responsibility                                   | Reuse Level |
| ----------- | ------------------------------------------------ | ----------- |
| `Navbar`    | Top nav with desktop + mobile menu state         | App-shell   |
| `Footer`    | Static footer with copyright                     | App-shell   |
| `Button`    | Primary / ghost variants (uses `cn` from `lib/utils`) | Atomic  |

**Utility:** `src/lib/utils.ts` exposes `cn()` (`clsx` + `tailwind-merge`) — the standard shadcn-style classname helper. This is the seed for a future design system.

### 2.5 Styling Approach

- **Utility-first Tailwind** via `@tailwind base/components/utilities` in `src/index.css`.
- **Design tokens** in `tailwind.config.js`:
  - Colors: `ink` (#0b0b0d), `bone` (#f5f1ea), `gold` (#c8a96a)
  - Fonts: `display: Cormorant Garamond`, `sans: Inter`
  - Google Fonts loaded via `@import` at top of `index.css`
- **Global CSS** is minimal — only resets and body defaults.
- **No CSS modules, no styled-components, no Emotion.** Pure Tailwind + variants.

### 2.6 Path Aliases

- `@/*` → `./src/*` (configured in both `vite.config.ts` and `tsconfig.json`).
- Already used in `src/components/Button.tsx` (`import { cn } from '@/lib/utils'`).

### 2.7 Build Issues Identified & Fixed

| # | Issue                                                                 | Resolution                                       |
| - | --------------------------------------------------------------------- | ------------------------------------------------ |
| 1 | `vite.config.ts` used `path` + `__dirname` without `@types/node`      | Added `@types/node` as devDependency             |
| 2 | `tsconfig.node.json` missing `"types": ["node"]`                      | Added                                            |
| 3 | Google Fonts `@import` placed AFTER `@tailwind` directives (CSS warning) | Moved `@import` to top of `src/index.css`     |

**Final build:** clean — 0 errors, 0 warnings, ~98 KB gzipped JS bundle.

---

## 3. Folder / File Map

```
Skylife/
├── index.html
├── package.json
├── yarn.lock
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── README.md
├── ARCHITECTURE_ANALYSIS.md   ← this file
└── src/
    ├── main.tsx               # Entry, mounts <BrowserRouter><App/></BrowserRouter>
    ├── App.tsx                # Layout shell + <Routes>
    ├── index.css              # Tailwind + global resets + font import
    ├── lib/
    │   └── utils.ts           # cn() helper
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   └── Button.tsx
    └── pages/
        ├── Home.tsx
        ├── About.tsx
        ├── Services.tsx
        └── Contact.tsx
```

---

## 4. Recommended Implementation Order — Luxury UI Revamp

Ordered for **maximum visible polish per unit of effort**. Each phase ships an independently demoable improvement.

### Phase 1 — Design System Foundations *(no visual revamp yet)*
1. Extend `tailwind.config.js` with full luxury token set:
   - Typography scale (display / heading / body / overline)
   - Spacing rhythm (8-point grid, generous breathing room)
   - Shadow tokens (soft, layered — no harsh drops)
   - Easing curves (`ease-luxury`, `ease-silk`) via custom CSS variables
2. Add `src/styles/tokens.css` for CSS-variable theming (enables future dark/light toggle).
3. Introduce `framer-motion` shared variants in `src/lib/motion.ts`.

### Phase 2 — Layout & Navigation
4. Redesign `Navbar`: transparent-over-hero → solid-on-scroll, gold underline indicator, refined mobile drawer with backdrop blur.
5. Add `ScrollProgress` + `CursorTrail` (subtle, optional).
6. Redesign `Footer`: multi-column, newsletter capture, social row.

### Phase 3 — Home Page Hero & Sections
7. Hero: full-bleed editorial image/video, staggered text reveal, parallax on scroll.
8. Feature grid / "Pillars" section with image hover lifts.
9. Testimonial marquee (Framer Motion `useTransform`).
10. CTA band with gold-foil accent.

### Phase 4 — Interior Pages
11. `About` — long-form editorial layout, pull quotes, image asymmetry.
12. `Services` — card stack with hover reveal of details.
13. `Contact` — form with floating labels, success animation, map embed.

### Phase 5 — Polish & Performance
14. Image optimization (`<picture>`, AVIF/WebP, blur-up placeholders).
15. Route-level code splitting (`React.lazy` + `Suspense`).
16. Accessibility audit: focus rings, reduced-motion variants, ARIA on nav.
17. SEO meta (`react-helmet-async` or Vite plugin).
18. Lighthouse target: ≥ 95 across Performance / Accessibility / Best Practices / SEO.

### Phase 6 — Optional / Backlog
- CMS integration (Sanity / Contentful) for editorial content.
- i18n via `react-i18next`.
- 3D accent (React Three Fiber) on hero — sparingly.

---

## 5. Files / Folders Likely Needing Modification

| Path                              | Phase | Reason                                                                  |
| --------------------------------- | :---: | ----------------------------------------------------------------------- |
| `tailwind.config.js`              |   1   | Add tokens (typography, shadows, easings, spacing)                      |
| `src/index.css`                   |   1   | Custom CSS variables, base typography refinements, selection styles    |
| `src/styles/tokens.css` *(new)*   |   1   | Centralized design tokens                                               |
| `src/lib/motion.ts` *(new)*       |   1   | Shared Framer Motion variants                                           |
| `src/components/Navbar.tsx`       |   2   | Scroll-aware styling, mobile drawer redesign                            |
| `src/components/Footer.tsx`       |   2   | Editorial multi-column layout                                           |
| `src/components/ScrollProgress.tsx` *(new)* | 2 | Top-of-page scroll indicator                                       |
| `src/components/Button.tsx`       |   1   | Add `outline`, `link`, `icon` variants; refined hover states            |
| `src/components/ui/` *(new dir)*  |  1–3  | shadcn-style atomic components (Card, Badge, Input, Dialog, etc.)       |
| `src/pages/Home.tsx`              |   3   | Hero + 3–4 narrative sections                                           |
| `src/pages/About.tsx`             |   4   | Editorial layout                                                        |
| `src/pages/Services.tsx`          |   4   | Card / accordion redesign                                               |
| `src/pages/Contact.tsx`           |   4   | Form + success state                                                    |
| `src/components/sections/` *(new dir)* | 3–4 | Hero, Pillars, Testimonials, CTA — reusable section blocks            |
| `src/App.tsx`                     |   5   | Lazy-loaded routes, `<AnimatePresence>` for page transitions            |
| `index.html`                      |   5   | Preconnect to fonts, viewport polish, meta tags                         |
| `vite.config.ts`                  |   5   | Add `vite-imagetools` / compression plugin if needed                    |
| `package.json`                    | 1, 5  | New deps: `@radix-ui/*`, `react-helmet-async`, image tooling             |

---

## 6. Risks & Watch-Outs

- **Bundle creep:** Each Radix primitive + heavy animation adds weight. Audit per phase.
- **Font loading FOUC:** Currently using Google Fonts `@import`. Switch to `<link rel="preconnect">` + `font-display: swap` in Phase 5.
- **Reduced motion:** Framer Motion needs `useReducedMotion()` checks on every entrance animation.
- **Mobile parity:** Luxury sites often degrade on mobile. Design mobile-first for hero + nav.

---

## 7. Next Steps

1. Merge baseline `main` ✅
2. Branch off `feature/luxury-ui-revamp` ✅
3. Begin **Phase 1** on the new branch.
