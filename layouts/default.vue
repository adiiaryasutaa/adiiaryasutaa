<script setup lang="ts"></script>

<template>
  <div class="bg-grid bg-canvas selection:bg-surface-raised">
    <div class="sm:container sm:mx-auto">
      <div
        class="sheet border-edge bg-sheet/75 mx-auto flex min-h-screen max-w-6xl flex-col backdrop-blur-[2px] sm:border-x"
      >
        <Navbar />
        <div class="grow overflow-hidden">
          <slot />
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
