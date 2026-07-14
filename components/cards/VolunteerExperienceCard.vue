<script setup lang="ts">
import type { Volunteer } from "@/models/experience/volunteer";

interface Props {
  volunteer: Volunteer;
}

const { volunteer } = defineProps<Props>();
</script>

<template>
  <Card
    class="hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary transition-colors"
  >
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="flex max-w-prose flex-col gap-4">
        <div class="flex flex-col">
          <h2 class="text-content text-left text-xl font-medium">
            {{ volunteer.title }}
          </h2>
          <h3 class="text-content text-left">{{ volunteer.organization }}</h3>
          <TimeRange :start="volunteer.start" :end="volunteer.end" :current="volunteer.current" />
        </div>

        <div class="">
          <p class="text-content text-left">{{ volunteer.description }}</p>
        </div>
      </div>
    </div>
  </Card>
</template>
