# Latest Posts on Home — Design

**Date:** 2026-07-13
**Status:** Approved
**Scope:** New compact "Latest Posts" section on the home page. No changes to BlogSection, BlogCard, or the blog pages.

## Decision (user-confirmed)

Compact list of the 3 newest posts — title + date rows, no covers — under the hero, with an "All posts →" link. Keeps home minimal; hero remains the focus.

## Design

### Component: components/sections/LatestBlogSection.vue

- Data: `useAsyncData("latest-blogs", () => queryCollection("blog").order("date", "DESC").limit(3).all())`.
- Layout: `Container` + `ContainerTitle` (i18n `home.latest-posts`), then one `NuxtLink` row per post:
  - Title: medium weight, `hover:text-primary`, truncates gracefully when long.
  - Date: right-aligned, `text-sm` gray, `shrink-0`, formatted with `Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" })` (same as BlogCard).
- Footer link: "All posts →" (`home.all-posts`) to `/blog`.
- Empty state: if the query returns no posts, the section renders nothing (`v-if`).

### Home wiring: pages/index.vue

`<LatestBlogSection v-if="pages.blog" />` after `<HomeSection />` inside `MainSection`, using `usePages()` — the section obeys the page-visibility toggle exactly like the navbar link. Hero keeps its full-viewport vertical centering; the section sits below the fold.

### i18n

New keys in `i18n/locales/en.json` and `id.json`:

- `home.latest-posts`: "Latest Posts" / "Postingan Terbaru"
- `home.all-posts`: "All posts" / "Semua postingan"

## Testing

Visual verification at 375 and 1280 in light and dark: rows readable, hover state on titles, link lands on /blog, section hidden when `pages.blog` is false (verified by code inspection of the `v-if`).
