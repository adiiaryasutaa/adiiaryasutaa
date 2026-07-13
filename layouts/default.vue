<script setup lang="ts"></script>

<template>
  <div class="bg-grid bg-canvas selection:bg-surface-raised">
    <div class="sm:container sm:mx-auto">
      <div class="border-edge bg-sheet mx-auto flex min-h-screen max-w-6xl flex-col sm:border-x">
        <Navbar />
        <div class="grow overflow-hidden">
          <slot />
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
