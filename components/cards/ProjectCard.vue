<script setup lang="ts">
import { GlobeAltIcon } from "@heroicons/vue/24/outline";
import type { Project } from "@/models/project";

interface Props {
  project: Project;
}

const { project } = defineProps<Props>();
</script>

<template>
  <Card
    class="hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary-tint h-full transition-colors duration-200"
  >
    <div class="flex h-full flex-col gap-4">
      <div class="w-full shrink-0">
        <img
          :src="project.cover ?? '/assets/imgs/projects/no-image.png'"
          :alt="project.name"
          class="border-edge aspect-video w-full rounded-lg border object-cover"
        />
      </div>
      <div class="flex grow flex-col gap-3">
        <div class="flex flex-col gap-1">
          <h1 class="text-content text-xl font-semibold tracking-tight">
            {{ project.name }}
          </h1>
          <p class="text-content-secondary leading-relaxed">
            {{ project.description }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in project.tags"
            class="border-edge bg-surface rounded-lg border px-2 py-1 text-sm font-medium"
          >
            {{ tag.name }}
          </span>
        </div>
        <div v-if="project.preview || project.repository" class="mt-auto flex items-center gap-1">
          <a
            v-if="project.preview"
            :href="project.preview.url"
            target="_blank"
            class="text-content-secondary hover:text-content p-1.5"
          >
            <GlobeAltIcon class="h-5 w-5" />
          </a>
          <a
            v-if="project.repository"
            :href="project.repository.url"
            target="_blank"
            class="text-content-secondary hover:text-content p-1.5"
          >
            <GithubIcon class="h-4 w-4 stroke-2" />
          </a>
        </div>
      </div>
    </div>
  </Card>
</template>
