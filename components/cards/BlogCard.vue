<script setup lang="ts">
interface Props {
  post: {
    title: string;
    description: string;
    cover?: string;
    tags: string[];
    date: string;
    path: string;
  };
}

const { post } = defineProps<Props>();

const formattedDate = computed(() =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date))
);
</script>

<template>
  <NuxtLink :to="post.path" class="focus-ring group block rounded-lg">
    <Card
      class="group-hover:border-primary group-hover:bg-primary-tint group-active:border-primary group-active:bg-primary transition-colors duration-200"
    >
      <div class="flex flex-col gap-4 md:flex-row">
        <div class="shrink-0 md:w-56">
          <img
            v-if="post.cover"
            :src="post.cover"
            :alt="post.title"
            class="border-edge aspect-video w-full rounded-lg border object-cover md:aspect-auto md:h-full"
          />
          <div
            v-else
            class="border-edge bg-surface-raised aspect-video w-full rounded-lg border md:aspect-auto md:h-full"
          />
        </div>

        <div class="flex grow flex-col gap-3">
          <div class="flex flex-col gap-1">
            <h2
              class="group-hover:text-primary text-content text-xl font-semibold tracking-tight transition-colors duration-200"
            >
              {{ post.title }}
            </h2>
            <p class="text-content-secondary leading-relaxed">
              {{ post.description }}
            </p>
          </div>

          <TagList :tags="post.tags" />

          <p class="text-content-muted mt-auto text-sm">
            {{ formattedDate }}
          </p>
        </div>
      </div>
    </Card>
  </NuxtLink>
</template>
