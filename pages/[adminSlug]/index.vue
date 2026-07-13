<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { user } = useUserSession();
const cfg = useRuntimeConfig();
const slug = cfg.public.adminSlug;

const sections = [
  { label: "Projects", to: `/${slug}/projects`, desc: "Edit portfolio projects" },
  { label: "Skills", to: `/${slug}/skills`, desc: "Manage skill categories" },
  { label: "Tech Stack", to: `/${slug}/tech`, desc: "Edit tech with categories" },
  { label: "Tools", to: `/${slug}/tools`, desc: "Tools you use daily" },
  { label: "Experiences", to: `/${slug}/experiences`, desc: "Work, education, volunteer" },
  { label: "Friends", to: `/${slug}/friends`, desc: "Friend list & socials" },
  { label: "Blog", to: `/${slug}/blog`, desc: "Write and manage posts" },
  { label: "SEO", to: `/${slug}/seo`, desc: "Site-wide SEO settings" },
  { label: "i18n", to: `/${slug}/i18n`, desc: "EN & ID translations" },
];
</script>

<template>
  <AdminShell>
    <h1 class="text-content mb-1 text-2xl font-bold">Welcome, {{ user?.name ?? user?.login }}</h1>
    <p class="text-content-muted mb-8 text-sm">
      Changes commit to GitHub and trigger a Vercel redeploy (~30s).
    </p>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="s in sections"
        :key="s.to"
        :to="s.to"
        class="border-edge-soft rounded-xl border bg-white p-5 transition-shadow hover:shadow-md"
      >
        <p class="text-content font-semibold">{{ s.label }}</p>
        <p class="text-content-muted mt-1 text-sm">{{ s.desc }}</p>
      </NuxtLink>
    </div>
  </AdminShell>
</template>
