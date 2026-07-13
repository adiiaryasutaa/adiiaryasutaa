<script setup lang="ts"></script>

<template>
  <footer>
    <div class="text-content-muted container flex flex-col py-8">
      <div class="text-sm">{{ $t("footer.copyright", { year: new Date().getFullYear() }) }}</div>
    </div>
  </footer>
</template>
