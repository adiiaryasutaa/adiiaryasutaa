<script setup lang="ts">
import type { Work } from "@/models/experience/work";

interface Props {
  work: Work;
}

const { work } = defineProps<Props>();
</script>

<template>
  <Card
    class="hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary transition-colors"
  >
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="shrink-0 self-start">
        <img
          src="https://placehold.co/100x100"
          :alt="work.company"
          :title="work.company"
          class="h-20 w-20 rounded-lg"
        />
      </div>
      <div class="flex max-w-prose flex-col gap-4">
        <div class="flex flex-col">
          <h2 class="text-content text-left text-xl font-medium">
            {{ work.title }}
          </h2>
          <h3 class="text-content text-left">
            {{ work.company }}
          </h3>
          <div class="flex flex-wrap items-baseline gap-x-2">
            <TimeRange :start="work.start" :end="work.end" :current="work.current" />
            <span v-if="work.employment" class="text-content-muted text-sm">·</span>
            <p class="text-content text-left text-sm">
              {{ work.employment }}
            </p>
          </div>
        </div>

        <div>
          <Paragraph>{{ work.description }}</Paragraph>
        </div>
      </div>
    </div>
  </Card>
</template>
