# Projects — Filesystem-Based Content

Each project is a folder. No CMS, no backend. Vite reads everything at build time via `import.meta.glob`.

## Folder structure

```
projects/
└── <slug>/
    ├── details.json        # metadata (required)
    ├── cover.jpg|png|webp  # single cover image (required)
    └── gallery/            # any number of gallery images (optional)
        ├── 01.jpg
        ├── 02.jpg
        └── ...
```

## `details.json` schema

```json
{
  "title": "Maison du Lac",
  "slug": "maison-du-lac",
  "year": 2024,
  "location": "Geneva, Switzerland",
  "category": "Residence",
  "client": "Private",
  "status": "Completed",
  "description": "Long-form paragraph..."
}
```

`slug` must match the folder name. `title`, `year`, `location`, `category`, `description` are required. `client` and `status` are optional.

## Adding a new project

1. Create `projects/your-slug/`.
2. Add `details.json` with the fields above.
3. Drop a `cover.{jpg,jpeg,png,webp,avif}`.
4. (Optional) Add images to `gallery/` — sorted alphabetically.
5. Run `yarn dev` — the new project appears at `/projects` and `/projects/your-slug` automatically.

That's it. No registration, no manifest, no database. The filesystem is the database.

## Supported image formats

`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` — all hashed, cached, and lazy-loaded by Vite.
