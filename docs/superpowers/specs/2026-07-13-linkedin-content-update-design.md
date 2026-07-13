# Content Update from LinkedIn Profile — Design

**Date:** 2026-07-13
**Status:** Approved
**Source of truth:** LinkedIn export `~/Downloads/adiaryasuta.md` (exported 2026-07-13)
**Scope:** `data/experience/*.json`, `i18n/locales/{en,id}.json`, AboutSection rendering fix. No changes to skills/tech/tool/project data, certifications, or `data/seo.json`.

## User-confirmed decisions

1. The 2022 "Copywriter & Full-Stack Web Developer" role belongs to **PT. Guna Teknologi Nusantara (RED System)**. Employment type kept as "Internship" from old site data — LinkedIn omits it.
2. Volunteer entries: **keep all 5**, clean up wording and wrong `current` flags only.
3. Home headline: **"Full-Stack Developer"**.
4. Indonesian copy: **translated by Claude**, reviewed here.

## Enabling fix: AboutSection bio rendering

`$t("about.description[0]")` returns an empty string (vue-i18n does not resolve bracket-indexed keys), so the About bio is invisible. Fix: iterate the array with `tm()`:

```vue
<Paragraph
  v-for="(_, i) in tm('about.description')"
  :key="i"
  v-html="rt(tm('about.description')[i])"
/>
```

(Implementation note: shipped as a `bioParagraphs` computed over `tm()`/`rt()` rendered through the default slot instead of `v-html` — `v-html` as a fallthrough attr on the `Paragraph` component loses to its slot rendering, and the new copy contains no HTML.)

## data/experience/work.json — full replacement (7 entries, newest first)

1. **Web Developer & Game Programmer** · Palm Game Studio · Part-time · Sep 2024 – present (`current: true`)

   > Developing core gameplay mechanics and systems in Unity at a university-incubated game studio — enemy AI and wave systems for Knafa (action survival), the core loop and customer-queue logic for Warteg Frenzy (time-management sim), and the arithmetic speed-challenge logic for Game Teacher (edtech).

2. **Freelance Full-Stack Web Developer & Game Programmer** · Self-employed · Freelance · Jun 2023 – present (`current: true`)

   > End-to-end solutions for diverse client needs: a Laravel POS system for a department store with real-time transactions, inventory, and automated sales reporting; a TailwindCSS performance refactor of a flower-shop landing page; an educational trash-detection game in Unity integrating a YOLO computer-vision model; and end-to-end Figma UI/UX for a cake-shop e-commerce app.

3. **Full-Stack Web Developer** · Red System · Internship · Aug 2025 – Feb 2026

   > Semester 5 MBKM internship on a Laravel business-management system: built the Deals and Workflow modules for tracking client data and project progress, and the connected financial modules — billing, invoice generation, and payment receipts.

4. **Assistant Lecturer – Programming Algorithms & Logic** · Primakara University · Part-time · Oct 2025 – Oct 2025

   > Instructor for the Programming Basic course for the Informatics class of 2025 — comprehensive lecture sessions on algorithm design, translating logic into pseudocode and flowcharts.

5. **Full-Stack Web Developer, Flutter Front-End Developer & UI/UX Designer** · Atrem Project · Part-time · Oct 2023 – May 2024

   > Engineered the REST API for a learning management system with secure student authentication and course/grading data; built a Laravel swimming-class scheduling app with automated schedule generation; developed the Flutter frontend for an e-learning app; led multiple designs from wireframes to high-fidelity mockups, including a ticketing app and a personal finance tracker.

6. **Copywriter & Full-Stack Web Developer** · PT. Guna Teknologi Nusantara (RED System) · Internship · Jun 2022 – Sep 2022

   > Built a custom blog system from scratch with Laravel and TailwindCSS to support content marketing; redesigned the Patient Hub landing page and built a WhatsApp-based reminder solution to automate patient communication; wrote SEO-focused articles.

7. **Android Developer** · Blue Lake Indonesia · Internship · Dec 2021 – Feb 2022
   > Built an online attendance application in native Java with a focus on efficient data handling, and acted as project lead for the intern team, overseeing code integration and workflow.

## data/experience/education.json

1. **Primakara University** · Informatics · 2023 – 2027
   > Leading the campus developer community — Primakara Developers and Google Developer Group on Campus — and active in the Informatics study program student association.
2. **SMK Negeri 1 Denpasar** · Computer Software Engineering · 2020 – 2023
   > Vocational high school, software engineering track.

## data/experience/volunteer.json — same 5 entries, fixed copy

1. **Lead** · Primakara Developers · Jan 2023 – present (`current: true`)
   > Leading a local developer community in Bali — organizing classes and events, and mentoring fellow student developers.
2. **Head of Event Organizer** · Google Developer Group on Campus Primakara University · Nov 2024 – present (`current: true`)
   > Organizing developer events and study groups for the campus GDG chapter.
3. **Instructor & Curriculum Advisor at Mini Class Basic C++** · Primakara Developers · Dec 2023 – Feb 2024 (`current: false`, was wrongly `true`)
   > Designed the curriculum and taught a C++ basics mini class.
4. **Facilitator at Intermediate Back-End Class** · Primakara Developers · Jan 2023 – Feb 2024 (`current: false`, was wrongly `true`)
   > Facilitated an intermediate back-end class.
5. **Facilitator at Beginner Javascript Class** · Primakara Developers · Nov 2023 – Jan 2024 (`current: false`, was wrongly `true`)
   > Facilitated a beginner JavaScript class.

## i18n/locales/en.json

- `home.brand`: `Full-Stack Developer`
- `home.description`:
  > Hi, I'm Adi Aryasuta — a full-stack developer from Denpasar, Bali, with over three years of hands-on experience across web, mobile, and game development. I love building useful products and quickly mastering new technologies to solve real-world problems.
- `about.description` (3 paragraphs):
  1. > Hello! I'm Adi Aryasuta, a versatile full-stack developer based on the beautiful island of Bali 🇮🇩, with over three years of hands-on experience in web, mobile, and game development.
  2. > I work as a freelance full-stack developer and game programmer, helping clients bring their digital ideas to life — from Laravel web systems to Unity games. Alongside freelancing, I'm a part-time web developer and game programmer at Palm Game Studio, a university-incubated game studio.
  3. > As a scholarship recipient passionate about community, I lead Primakara Developers and the Google Developer Group on Campus at Primakara University — sharing my learning journey and empowering fellow developers to grow.
- `meta.description`:
  > Full-Stack Developer based in Bali, Indonesia, working across web, mobile, and game development with Laravel, Vue, Nuxt, Flutter, and Unity.
- `home.gdg-lead`: unchanged.

## i18n/locales/id.json

- `home.brand`: `Full-Stack Developer`
- `home.description`:
  > Halo, saya Adi Aryasuta — full-stack developer dari Denpasar, Bali, dengan pengalaman lebih dari tiga tahun di pengembangan web, mobile, dan game. Saya senang membangun produk yang bermanfaat dan cepat menguasai teknologi baru untuk menyelesaikan masalah nyata.
- `about.description` (3 paragraphs):
  1. > Halo! Saya Adi Aryasuta, seorang full-stack developer serba bisa yang berbasis di pulau Bali 🇮🇩, dengan pengalaman lebih dari tiga tahun di pengembangan web, mobile, dan game.
  2. > Saya bekerja sebagai freelance full-stack developer dan game programmer, membantu klien mewujudkan ide digital mereka — dari sistem web berbasis Laravel hingga game Unity. Selain itu, saya bekerja paruh waktu sebagai web developer dan game programmer di Palm Game Studio, studio game inkubasi universitas.
  3. > Sebagai penerima beasiswa yang peduli pada komunitas, saya memimpin Primakara Developers dan Google Developer Group on Campus di Primakara University — berbagi perjalanan belajar dan mendorong sesama developer untuk bertumbuh.
- `meta.description`:
  > Full-Stack Developer yang berbasis di Bali, Indonesia, berkarya di pengembangan web, mobile, dan game dengan Laravel, Vue, Nuxt, Flutter, dan Unity.

## Testing

- About page renders all 3 bio paragraphs in EN and ID (fix verified live).
- Home shows new headline + description in both locales.
- Experience section shows 7 work, 2 education, 5 volunteer entries with correct dates and `current` flags.
- No JSON parse errors (`pnpm build` or dev-server reload clean).
