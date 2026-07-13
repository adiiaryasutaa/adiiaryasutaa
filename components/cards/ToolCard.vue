<script setup lang="ts">
import type { Tool } from "@/models/tool";

interface Props {
  tool: Tool;
}

const { tool } = defineProps<Props>();
</script>

<template>
  <Card
    class="hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary transition-colors"
  >
    <img :src="tool.logo" :alt="tool.name" class="rounded-lg" />
    <h4 class="text-content mt-2 text-center font-medium capitalize">
      {{ tool.name }}
    </h4>
  </Card>
</template>
