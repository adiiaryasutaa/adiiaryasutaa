<script setup lang="ts">
import { LanguageIcon } from "@heroicons/vue/20/solid";

const { locale, switchLocale } = useLocale();
</script>

<template>
  <button
    @click="switchLocale"
    class="surface focus-ring hover:text-primary hover:border-primary dark:hover:text-primary dark:hover:border-primary text-content-muted hover:bg-surface-raised p-2 hover:cursor-pointer"
  >
    <div class="flex items-center justify-start">
      <LanguageIcon class="h-5 w-5" />
      <span class="border-edge bg-surface ml-1 grow rounded-lg border px-1 py-0.5 text-xs">
        {{ locale }}
      </span>
    </div>
  </button>
</template>
