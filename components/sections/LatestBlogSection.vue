<script setup lang="ts">
const { data: posts } = await useAsyncData("latest-blogs", () =>
  queryCollection("blog").order("date", "DESC").limit(3).all()
);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
</script>

<template>
  <Container v-if="posts?.length">
    <template #title>
      <ContainerTitle>{{ $t("home.latest-posts") }}</ContainerTitle>
    </template>
    <div class="mt-4 flex flex-col">
      <NuxtLink
        v-for="post in posts"
        :key="post.path"
        :to="post.path"
        class="focus-ring group flex flex-col gap-1 rounded-lg py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
      >
        <span
          class="group-hover:text-primary group-active:text-primary text-content font-medium transition-colors duration-200"
        >
          {{ post.title }}
        </span>
        <span class="text-content-muted shrink-0 text-sm">
          {{ formatDate(post.date) }}
        </span>
      </NuxtLink>

      <div class="mt-4">
        <NuxtLink
          to="/blog"
          class="focus-ring hover:text-primary active:text-primary dark:hover:text-primary dark:active:text-primary text-content-muted rounded-lg text-sm transition-colors"
        >
          {{ $t("home.all-posts") }} &rarr;
        </NuxtLink>
      </div>
    </div>
  </Container>
</template>
