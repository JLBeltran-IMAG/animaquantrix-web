# Animaquantrix website

React and TypeScript website built with Vite. Section content and English/Spanish translations live in `src/content/*.md`; local media paths in that content resolve from `public/`.

## Development

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npx tsc -b
npm run build
```

`npm run build` runs TypeScript checks and writes the production site to `dist/`. Use `npm run preview` to inspect that build locally.

## Code organization

- `src/app/`: routing, section definitions, language context, and scroll management.
- `src/content/` and `src/lib/content.ts`: localized Markdown sources, parsing, and cached content.
- `src/components/sections/`: hero, discovery sections, section composition, and shared cards and buttons.
- `src/styles/`: global defaults and the responsive design system.

The homepage and `/research`, `/software`, `/talks`, and `/about` use the existing React Router configuration. Research collections also use `#topics` and `#publications`; contact is on the homepage at `/#contact`.

## Deployment

Production is deployed by the connected Vercel project when `main` is updated. The `vercel.json` rewrite serves `index.html` for client routes, supporting direct visits and refreshes. Vite's base setting, asset URLs, and browser routing configuration remain unchanged; the static build is written to `dist/`.
