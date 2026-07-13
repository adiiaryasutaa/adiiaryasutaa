# Semantic Color Tokens (Dark Mode via Stone) — Design

**Date:** 2026-07-13
**Status:** Approved
**Scope:** All neutral (gray) color classes across `components/`, `pages/`, `layouts/`, plus `assets/css/main.css`. Deletes `tailwind.config.ts`. No visual redesign — same roles, centralized control, dark side moves from gray to stone.

## Goal (user-confirmed)

One place to restyle dark mode. Semantic token classes (`text-content`, `bg-surface`, `border-edge`, …) replace paired `<light> dark:<dark>` neutral classes. Naming: **semantic** (content/surface/edge). Dark values use the **stone** palette (user's prior request, folded in).

## Token definitions (assets/css/main.css)

`:root` and `.dark` var blocks + `@theme inline` exposure — the exact pattern `--primary` / `--primary-tint` already use:

| Token                       | Light    | Dark      |
| --------------------------- | -------- | --------- |
| `--color-canvas`            | gray-200 | stone-950 |
| `--color-sheet`             | gray-50  | stone-900 |
| `--color-surface`           | gray-100 | stone-950 |
| `--color-surface-raised`    | gray-200 | stone-800 |
| `--color-content`           | gray-900 | stone-100 |
| `--color-content-secondary` | gray-700 | stone-300 |
| `--color-content-muted`     | gray-500 | stone-400 |
| `--color-edge`              | gray-400 | stone-600 |
| `--color-edge-soft`         | gray-300 | stone-700 |

`--primary`, `--primary-tint`, `--grid-line`, and Shiki backgrounds are unchanged.

## Mapping rules

Collapse light+dark neutral pairs to one token class; normalize near-shades to the nearest token:

- `text-gray-900|800` + `dark:text-gray-100|50|200` → `text-content`
- `text-gray-700|600` + `dark:text-gray-300|400` → `text-content-secondary`
- `text-gray-500|400` + `dark:text-gray-400|500|600` → `text-content-muted`
- `border-gray-400` + `dark:border-gray-600` → `border-edge`
- `border-gray-300|200` + `dark:border-gray-700|800` → `border-edge-soft`
- `divide-gray-*` pairs → `divide-edge-soft`
- `bg-gray-200` + `dark:bg-gray-950` (layout outer) → `bg-canvas`
- `bg-gray-50` + `dark:bg-gray-900` (layout sheet) → `bg-sheet`
- `bg-gray-100` + `dark:bg-gray-950|900` (cards/controls) → `bg-surface`
- `bg-gray-200|300` hovers + `dark:bg-gray-800` → `bg-surface-raised` / `hover:bg-surface-raised`
- Blog cover placeholder `bg-gray-200 dark:bg-gray-800` → `bg-surface-raised`

Genuine one-offs that fit no token (if any survive the sweep) stay as explicit palette classes and are listed in the implementation commit message.

main.css consumers switch to tokens: `surface` utility, `focus-ring` (unchanged — primary), scrollbar rules, selection colors (layout classes), `.dark .prose` variable block (`--color-gray-*` → stone equivalents via tokens where roles match, stone palette directly where prose-specific).

## Cleanup

- Delete `tailwind.config.ts` — v3 leftover; the v4 CSS-first setup (`@tailwindcss/vite` + `@theme` + `@custom-variant dark`) never loads it. Its container padding and dark-mode config already live in `main.css`.
- CLAUDE.md Styling section: document the token system (names, where defined, how to retheme dark mode).

## Testing

- `grep -rE "dark:[a-z-]*-gray-[0-9]+"` over `components pages layouts` returns nothing.
- Visual pass at 375 and 1280, light and dark: home, about, project, blog list, blog post, friend, admin login. Dark mode reads warm (stone); light mode unchanged.
- Dev server compiles with no unknown-utility errors.
