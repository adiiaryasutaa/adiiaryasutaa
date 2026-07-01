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
    class="surface focus-ring hover:text-primary hover:border-primary dark:hover:text-primary dark:hover:border-primary p-2 text-gray-500 hover:cursor-pointer hover:bg-gray-300 dark:text-gray-500 dark:hover:bg-gray-900"
  >
    <SunIcon v-if="theme === 'dark'" class="h-5 w-5" />
    <MoonIcon v-else class="h-5 w-5" />
  </button>
</template>
