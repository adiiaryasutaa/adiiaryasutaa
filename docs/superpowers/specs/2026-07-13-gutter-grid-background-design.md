# Gutter Grid Background — Design

**Date:** 2026-07-13
**Status:** Approved
**Scope:** Decorative grid pattern on the page area outside the centered content sheet. No content, component, or sheet changes.

## Decision (user-confirmed)

Grid shows in the outer gutters only — the `bg-gray-200 dark:bg-gray-950` area around the `max-w-6xl` sheet. The sheet itself stays clean.

## Design

### main.css

- `:root` gains `--grid-line` (gray line color at low alpha for light mode, roughly gray-400 at 35%); `.dark` overrides it (white at ~5%).
- New utility:

```css
@utility bg-grid {
  background-image:
    linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

- Delete the abandoned commented-out grid CSS (the `--background-image-image-*` theme block and `.background-image-image-light` rule) — this feature replaces it.

### layouts/default.vue

- Outer div: add `bg-grid`, remove the dead `dark:background-image-image-dark` class (its utility never existed uncommented).
- No other markup changes. The opaque sheet covers the center, so the grid reads as gutter texture on ≥sm viewports wide enough to show gutters; below `sm` the sheet is full-width and the grid is invisible.

## Testing

Visual at 1280 (and wider if possible) in light and dark: grid visible in gutters, subtle, invisible behind the sheet. 375: unchanged. Exact alpha values tuned live in the browser during implementation; requirement is "visible but clearly decorative" — lines must not compete with content.
