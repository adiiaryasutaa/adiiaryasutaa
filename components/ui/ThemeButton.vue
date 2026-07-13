<script setup lang="ts">
import { MoonIcon, SunIcon } from "@heroicons/vue/20/solid";

const { theme, switchTheme } = useTheme();

onMounted(() => {
  if (theme.value === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});
</script>

<template>
  <button
    @click="switchTheme"
    class="surface focus-ring hover:text-primary hover:border-primary dark:hover:text-primary dark:hover:border-primary text-content-muted hover:bg-surface-raised p-2 hover:cursor-pointer"
  >
    <SunIcon v-if="theme === 'dark'" class="h-5 w-5" />
    <MoonIcon v-else class="h-5 w-5" />
  </button>
</template>
