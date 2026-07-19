<script setup lang="ts">
import type { Photo } from "~/models/gallery";

// Every `sizes` entry needs an explicit breakpoint prefix. @nuxt/image keys an
// unprefixed entry as "1px", then resolves that key against `screens` and falls
// back to parseInt("1px") — so a bare "50vw" computes to a 1-pixel-wide image.

interface Props {
  photo: Photo;
}

const { photo } = defineProps<Props>();

defineEmits<{ open: [] }>();
</script>

<template>
  <button
    type="button"
    class="focus-ring group block rounded-lg hover:cursor-pointer"
    @click="$emit('open')"
  >
    <NuxtImg
      :src="photo.src"
      :alt="$t(`gallery.alt.${photo.category}`)"
      sizes="xs:50vw sm:33vw lg:25vw"
      loading="lazy"
      class="border-edge group-hover:border-primary group-active:border-primary aspect-[4/3] w-full rounded-lg border object-cover transition-colors duration-200"
    />
  </button>
</template>
