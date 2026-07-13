<script setup lang="ts">
useHeadSafe({
  title: "404 — Page Not Found",
});
</script>

<template>
  <MainSection>
    <div class="flex flex-col space-y-8">
      <div class="container flex flex-col items-center justify-center gap-6 text-center">
        <p class="text-8xl font-bold text-gray-200 select-none dark:text-stone-100">404</p>
        <div class="flex flex-col gap-2">
          <h1 class="text-content text-2xl font-semibold">Page not found</h1>
          <p class="text-content-muted">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <NuxtLink
          to="/"
          class="hover:text-primary hover:border-primary focus:ring-primary/30 dark:hover:text-primary dark:hover:border-primary border-edge hover:bg-surface active:bg-surface-raised rounded-lg border px-4 py-2 text-sm font-medium focus:ring-2"
        >
          Back to home
        </NuxtLink>
      </div>
    </div>
  </MainSection>
</template>
