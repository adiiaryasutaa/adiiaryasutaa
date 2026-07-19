<script setup lang="ts">
const pages = usePages();
if (!pages.value.gallery) throw createError({ statusCode: 404 });

const { t } = useI18n();

useSeoMeta({
  title: () => t("navbar.gallery"),
  description: () => t("meta.gallery-description"),
  ogTitle: () => t("navbar.gallery"),
  ogDescription: () => t("meta.gallery-description"),
  ogType: "website",
  ogUrl: "https://adiaryasuta.dev/gallery",
  twitterTitle: () => t("navbar.gallery"),
  twitterDescription: () => t("meta.gallery-description"),
});
</script>

<template>
  <MainSection>
    <GallerySection />
  </MainSection>
</template>
