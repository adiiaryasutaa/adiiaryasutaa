<script setup lang="ts">
import type { PageVisibility } from "~/models/pages";

definePageMeta({ middleware: "admin", layout: false });

const { data, loading, saved, isDirty, load, save, discard } =
  useAdminResource<PageVisibility>("pages");

onMounted(load);

const pageLabels: { key: keyof PageVisibility; label: string; description: string }[] = [
  { key: "about", label: "About", description: "About me, experience, and tech stack" },
  { key: "project", label: "Projects", description: "Portfolio projects" },
  { key: "gallery", label: "Gallery", description: "Photos of activities" },
  { key: "blog", label: "Blog", description: "Blog posts and articles" },
  { key: "friend", label: "Friends", description: "Friends and colleagues" },
];
</script>

<template>
  <AdminShell>
    <div class="mb-6">
      <h1 class="text-content text-xl font-semibold">Pages</h1>
      <p class="text-content-muted mt-1 text-sm">
        Toggle pages on or off. Hidden pages return 404 and disappear from the navbar. Changes take
        effect after redeploy (~30s).
      </p>
    </div>

    <div v-if="loading && !data" class="text-content-muted text-sm">Loading…</div>

    <div
      v-else-if="data"
      class="divide-edge-soft border-edge-soft divide-y rounded-lg border bg-white"
    >
      <div
        v-for="page in pageLabels"
        :key="page.key"
        class="flex items-center justify-between px-5 py-4"
      >
        <div>
          <p class="text-content font-medium">{{ page.label }}</p>
          <p class="text-content-muted text-sm">{{ page.description }}</p>
        </div>
        <button
          type="button"
          role="switch"
          :aria-checked="data[page.key]"
          :aria-label="`Toggle ${page.label} page`"
          class="focus:ring-primary relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:outline-none"
          :class="data[page.key] ? 'bg-primary' : 'bg-gray-300 dark:bg-stone-600'"
          @click="data[page.key] = !data[page.key]"
        >
          <span
            class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
            :class="data[page.key] ? 'translate-x-5' : 'translate-x-0'"
          />
        </button>
      </div>
    </div>

    <AdminSaveBar
      :is-dirty="isDirty"
      :loading="loading"
      :saved="saved"
      @save="save"
      @discard="discard"
    />
  </AdminShell>
</template>
