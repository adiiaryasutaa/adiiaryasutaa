# Translucent Blurred Content Sheet — Design

**Date:** 2026-07-13
**Status:** Approved
**Scope:** The layout content sheet only (`layouts/default.vue` inner div + a small utility/media query in `assets/css/main.css`). Cards, navbar, code blocks (`surface`) stay opaque.

## Goal (user-confirmed)

The gutter grid should show through the content sheet — visible but soft ("appear but not clear"). Effect applies at all viewports, including mobile where the sheet is full-width.

## Design

- `layouts/default.vue` sheet div: `bg-sheet` → `bg-sheet/85 backdrop-blur-xs`. The backdrop filter blurs the canvas + grid behind the sheet; 85% opacity lets the blurred grid ghost through. Token opacity modifiers resolve via color-mix, so both themes work unchanged.
- Starting values `85%` opacity / `xs` (4px) blur — tuned live in the browser until the grid reads subtle and text contrast holds in light and dark.
- `prefers-reduced-transparency: reduce` restores the opaque `bg-sheet` (plain media query in `main.css` targeting the sheet, or an inline arbitrary variant if cleaner).
- `surface` utility, prose backgrounds, and Shiki code blocks untouched — content blocks keep full contrast.

## Testing

Visual at 375 and 1280, light and dark: grid faintly visible through the sheet, blurred (not sharp); body text contrast unaffected; cards/code blocks opaque. No horizontal scroll or paint artifacts while scrolling.
