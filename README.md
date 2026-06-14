# Skylife

A luxury lifestyle web experience.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion 11
- **Routing:** React Router DOM 6
- **Icons:** Lucide React
- **Package manager:** npm / yarn / pnpm (lockfile not committed yet)

## Getting Started

```bash
npm install
npm run dev
```

App runs on `http://localhost:3000`.

## Scripts

| Script         | Description                       |
| -------------- | --------------------------------- |
| `npm run dev`  | Start Vite dev server (port 3000) |
| `npm run build`| Type-check + production build     |
| `npm run preview` | Preview production build       |

## Project Structure

```
src/
├── components/   # Reusable UI (Navbar, Footer, Button)
├── pages/        # Route-level pages (Home, About, Services, Contact)
├── lib/          # Utilities (cn helper, etc.)
├── App.tsx       # Router + layout shell
├── main.tsx      # Entry point
└── index.css     # Tailwind directives + global styles
```

## Branches

- `main` — baseline scaffold
- `feature/luxury-ui-revamp` — premium UI redesign (in progress)

See [`ARCHITECTURE_ANALYSIS.md`](./ARCHITECTURE_ANALYSIS.md) for the full audit and implementation plan.
