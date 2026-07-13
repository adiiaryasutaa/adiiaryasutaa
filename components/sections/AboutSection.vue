<script setup lang="ts">
const { tm, rt } = useI18n();

const bioParagraphs = computed(() => (tm("about.description") as unknown[]).map((p) => rt(p)));
</script>

<template>
  <section class="container">
    <div class="flex flex-col md:flex-row md:items-start">
      <div class="flex flex-col md:shrink-0">
        <img
          src="/assets/images/adiaryasuta.jpg"
          :alt="$t('brand')"
          class="h-60 w-60 rounded-lg border border-gray-400 object-cover xl:h-72 xl:w-72 dark:border-gray-600"
        />
      </div>
      <div class="mt-10 max-w-prose space-y-4 text-gray-700 md:mt-0 md:ml-10 dark:text-gray-300">
        <Paragraph v-for="(paragraph, i) in bioParagraphs" :key="i">{{ paragraph }}</Paragraph>
      </div>
    </div>
  </section>
</template>
