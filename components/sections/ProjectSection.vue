<script setup lang="ts">
const projects = useProject();
</script>

<template>
  <Container>
    <template #title>
      <ContainerTitle>{{ $t("project.section-title") }}</ContainerTitle>
    </template>
    <div class="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
      <ProjectCard v-for="project in projects" :project="project" />
    </div>
  </Container>
</template>
