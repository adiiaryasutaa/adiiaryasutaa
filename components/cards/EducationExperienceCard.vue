<script setup lang="ts">
import type { Education } from "~/models/experience/education";

interface Props {
  education: Education;
}

const { education } = defineProps<Props>();
</script>

<template>
  <Card
    class="hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary transition-colors"
  >
    <div class="flex flex-col gap-4 sm:flex-row">
      <div class="flex max-w-prose flex-col gap-4">
        <div class="flex flex-col">
          <h2 class="text-content text-left text-xl font-medium">
            {{ education.school }}
          </h2>
          <h3 class="text-content text-left">{{ education.major }}</h3>
          <div class="flex flex-row">
            <p class="text-content text-left text-sm">
              {{ education.start }} - {{ education.end }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
