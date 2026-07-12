# Tablet & Desktop Layout Improvements — Design

**Date:** 2026-07-13
**Status:** Approved
**Scope:** Presentation-only changes to public pages at ≥768px. No color, typography, content, or admin changes.

## Problem

The site was designed mobile-first and holds up well at 375px, but at tablet/desktop widths:

- No max-width cap exists anywhere. The custom `container` utility (assets/css/main.css) only sets padding, so content stretches to viewport width minus padding — ~1110px wide at 1280, ~1760px at 1920.
- Home hero (`max-w-2xl`) pins hard left; the right half of the viewport is empty. The page is short, so content also sits top-stuck above a large gap.
- Project cards render as full-width horizontal rows (948px at 1280) — mostly empty space per card, 9 projects = long scroll. The Friend page already uses a 3-col grid; projects don't match.
- Experience card descriptions run ~120 characters per line (readable target: 45–75).
- Blog post prose is already correct (672px, centered).

## Decisions (user-confirmed)

1. Cap site-wide content at ~1100px, centered.
2. Cap lives on the layout frame (Approach A), not inside it: the existing border-x "sheet" itself narrows and centers.
3. Home hero: two-column at ≥md (text left, photo right), vertically centered in the viewport.
4. Project cards: 2-col grid at ≥md with vertical card layout (cover top).
5. Blog list: keep horizontal rows; benefits from the frame cap only.

## Design

### 1. Frame cap (layouts/default.vue)

Inner sheet div gets `max-w-6xl` (1152px) + `mx-auto`. Navbar, content, and footer all align inside the centered sheet. Remove the now-unreachable 2xl padding step (6rem) from the `container` utility in `assets/css/main.css`.

### 2. Home hero (components/sections/HomeSection.vue)

- ≥md: two columns — text block (title, GDG badge, bio, socials, CTA) left; photo right, larger (`h-64`, `lg:h-80`, rounded-full kept).
- DOM order stays text-first for screen readers; photo moves right visually (flex order / row-reverse).
- Hero vertically centered: wrapper gets a min-height derived from viewport minus navbar/footer (svh-based) with `flex items-center`. Acceptance: at 1280×800 and 768×1024 the hero appears vertically centered with no vertical scrollbar caused by the min-height itself; at short viewports (<600px tall) content must not clip.
- Mobile (<md): unchanged stacked layout, photo on top.

### 3. Project grid (components/sections/ProjectSection.vue, components/cards/ProjectCard.vue)

- Section: `grid grid-cols-1 md:grid-cols-2 gap-4`.
- Card becomes vertical: cover on top (`aspect-video w-full object-cover`), then name, description, tags, links. Drops fixed `h-48` / `md:w-48` image sizing.
- Mobile keeps single column of the same vertical card (visually near-identical to current mobile).
- Card remains a non-link; whole-card link affordance is tracked separately in the mobile-audit backlog.

### 4. Blog list (components/cards/BlogCard.vue)

Keep row layout at ≥md (cover left `md:w-56`, text right). Add `aspect-video md:aspect-auto` to the cover so mobile covers hold shape. No structural change.

### 5. Reading widths (About / Experience)

- Experience cards: `max-w-prose` on the text block inside Work/Volunteer/Education cards. Cards stay full container width.
- AboutSection bio column: `max-w-prose`.

## Out of scope

Mobile-audit bugs tracked separately: theme toggle requiring reload, i18n `about.description[n]` returning empty, `assets/imgs/` vs `public/` asset location, missing aria-labels, placehold.co experience logos, ProjectCard tap-target work.

## Testing

Visual verification in the browser at 375 / 768 / 1280 widths (and 1920 simulated via wide viewport) for every touched page: home, about, project, blog list, blog post, friend. No unit tests — presentation only.
