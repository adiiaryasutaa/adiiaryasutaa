# Disable Overscroll Bounce — Design

**Date:** 2026-07-13
**Status:** Approved
**Scope:** Two declarations in `assets/css/main.css` (`@layer base`). Nothing else.

## Goal (user-confirmed)

No page stretch (rubber-band) when scrolling past the top or bottom of the page.

## Design

In `@layer base`:

```css
html {
  overscroll-behavior-y: none;
  background-color: var(--color-canvas);
}
```

- `overscroll-behavior-y: none` removes the bounce and scroll chaining in Chrome, Edge, and Firefox.
- Safari (macOS/iOS) only partially honors `overscroll-behavior` on the root document, so bounce may persist there; the canvas background ensures any surviving stretch area shows the themed color (grid-toned gray/stone) instead of a white flash. Token var covers both themes.
- Rejected: JS `touchmove` prevention — breaks momentum scrolling and accessibility.

## Testing

- Computed style check in the browser: `overscroll-behavior-y: none` and themed background on `html`, both themes.
- Manual wheel overscroll at top/bottom in the preview (behavior verification limited by automation; primary check is computed styles + no layout regression).
