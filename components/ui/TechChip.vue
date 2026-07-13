<script setup lang="ts">
interface Props {
  tech: { logo?: string; name: string };
}

const props = defineProps<Props>();
</script>

<template>
  <div class="border-edge flex flex-row items-center gap-1.5 rounded-md border px-2 py-0.5">
    <img
      v-if="props.tech.logo"
      :src="props.tech.logo"
      :alt="props.tech.name"
      :title="props.tech.name"
      class="h-4 w-4"
    />
    <span class="text-content text-xs font-medium">{{ props.tech.name }}</span>
  </div>
</template>
