# gokaybaz.com — Personal Portfolio

Gökay Baz's personal portfolio site — terminal/infra aesthetic, bilingual (TR/EN), built with Vite + React.

## Development

```bash
pnpm install
pnpm dev      # dev server
pnpm test     # vitest
pnpm build    # typecheck + production build
```

## Content

All site content (projects, experience, about text, translations) lives in a single file: `src/data/content.ts`. Edit there to update projects or add a new one — give it a unique `slug` and a detail page is generated automatically at `/project/<slug>`.

## Structure

- `src/i18n/` — TR/EN language context (persisted to localStorage)
- `src/data/` — typed bilingual content
- `src/components/` — page sections (Header, Hero, About, Projects, Experience, BlogTeaser, Footer)
- `src/pages/` — HomePage + ProjectDetailPage
