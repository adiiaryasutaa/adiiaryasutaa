<script setup lang="ts">
import type { PageVisibility } from "~/models/pages";

definePageMeta({ middleware: "admin", layout: false });

const { data, loading, saved, isDirty, load, save, discard } =
  useAdminResource<PageVisibility>("pages");

onMounted(load);

const pageLabels: { key: keyof PageVisibility; label: string; description: string }[] = [
  { key: "about", label: "About", description: "About me, experience, and tech stack" },
  { key: "project", label: "Projects", description: "Portfolio projects" },
  { key: "blog", label: "Blog", description: "Blog posts and articles" },
  { key: "friend", label: "Friends", description: "Friends and colleagues" },
];
</script>

<template>
  <AdminShell>
    <div class="mb-6">
      <h1 class="text-xl font-semibold text-gray-900 dark:text-gray-100">Pages</h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Toggle pages on or off. Hidden pages return 404 and disappear from the navbar. Changes take
        effect after redeploy (~30s).
      </p>
    </div>

    <div v-if="loading && !data" class="text-sm text-gray-500 dark:text-gray-400">Loading…</div>

    <div
      v-else-if="data"
      class="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900"
    >
      <div
        v-for="page in pageLabels"
        :key="page.key"
        class="flex items-center justify-between px-5 py-4"
      >
        <div>
          <p class="font-medium text-gray-900 dark:text-gray-100">{{ page.label }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ page.description }}</p>
        </div>
        <button
          type="button"
          role="switch"
          :aria-checked="data[page.key]"
          :aria-label="`Toggle ${page.label} page`"
          class="focus:ring-primary relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:outline-none"
          :class="data[page.key] ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'"
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
