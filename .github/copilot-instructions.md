# Copilot Instructions

## Overview

- Next.js 15 App Router project generated from `create-next-app`; everything user-facing lives under the `app/` directory.
- Current experience is a single landing page (`app/page.tsx`) rendered through the root layout (`app/layout.tsx`).

## Architecture & Routing

- Root layout wraps every page, wires up fonts via `next/font/google`, and exposes metadata; keep global providers here.
- Route segments live under `app/`; create nested folders with `page.tsx` files to add new routes.
- Global styles load in `app/layout.tsx` through `import "./globals.css"`; include additional globals there rather than per-page imports.

## Styling & Design System

- Tailwind CSS v4 is enabled globally by `@import "tailwindcss"` inside `app/globals.css`; no separate config files are needed.
- Theme tokens are defined inline with `@theme inline` in `globals.css`; extend that block when introducing new semantic colors or fonts.
- Geist Sans/Mono variables (`--font-geist-sans`, `--font-geist-mono`) are applied on `<body>`; reuse those CSS variables in new components for consistent typography.
- Utility classes already assume a light/dark scheme toggle via CSS custom properties `--background` and `--foreground`; preserve them when adjusting theming.

## Assets & Components

- Static assets (SVG logos, icons) live in `public/`; reference them with leading `/` paths and the `next/image` component for automatic optimization.
- Prefer the `Image` component over `<img>` so width/height/priority semantics stay consistent with existing usage.

## TypeScript & Module Conventions

- TypeScript is strict with bundler-style module resolution; you can import via `@/` to reference from repository root (`tsconfig.json`).
- Keep shared UI primitives in `app/(components)/` or similar collocated folders; align with Next.js App Router conventions (server components by default).
- Update `next.config.ts` if you introduce custom build features (image domains, redirects, etc.); it's currently a stub awaiting project-specific options.

## Quality Gates & Tooling

- Run `npm run dev` for the local dev server, `npm run build` before deployment, and `npm run lint` to enforce the Next.js + TypeScript ESLint preset.
- There are no automated tests yet; if you add any, document the command here so future agents can execute them.
