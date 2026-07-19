<script setup lang="ts">
import { GALLERY_CATEGORIES, type GalleryCategory } from "~/models/gallery";

type Filter = GalleryCategory | "all";

const photos = useGallery();
const route = useRoute();
const router = useRouter();

const filters: Filter[] = ["all", ...GALLERY_CATEGORIES];

// The active filter lives in the URL so a filtered view can be linked and the
// back button steps through them.
const active = computed<Filter>(() => {
  const category = route.query.category;
  return GALLERY_CATEGORIES.includes(category as GalleryCategory)
    ? (category as GalleryCategory)
    : "all";
});

const filtered = computed(() =>
  active.value === "all"
    ? photos.value
    : photos.value.filter((photo) => photo.category === active.value)
);

function select(filter: Filter) {
  router.push({ query: filter === "all" ? {} : { category: filter } });
}

// Indexes into `filtered`, so the lightbox arrows walk the current filter.
const lightboxIndex = ref<number | null>(null);

watch(active, () => (lightboxIndex.value = null));
</script>

<template>
  <Container>
    <template #title>
      <ContainerTitle>{{ $t("gallery.section-title") }}</ContainerTitle>
    </template>

    <div class="mt-4 flex flex-wrap gap-2">
      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        class="surface focus-ring px-3 py-1.5 text-sm font-medium transition-colors duration-200 hover:cursor-pointer"
        :class="
          active === filter
            ? 'border-primary bg-primary-tint text-content'
            : 'text-content-secondary hover:border-primary hover:text-primary'
        "
        @click="select(filter)"
      >
        {{ $t(`gallery.filter.${filter}`) }}
      </button>
    </div>

    <div v-if="filtered.length" class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <GalleryCard
        v-for="(photo, i) in filtered"
        :key="photo.src"
        :photo="photo"
        @open="lightboxIndex = i"
      />
    </div>
    <p v-else class="text-content-muted mt-6 text-sm">{{ $t("gallery.empty") }}</p>

    <Lightbox
      :photos="filtered"
      :index="lightboxIndex"
      @close="lightboxIndex = null"
      @update:index="lightboxIndex = $event"
    />
  </Container>
</template>
