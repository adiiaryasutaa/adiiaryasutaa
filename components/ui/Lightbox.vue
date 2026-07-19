<script setup lang="ts">
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";
import type { Photo } from "~/models/gallery";

interface Props {
  photos: Photo[];
  index: number | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  "update:index": [value: number];
}>();

const open = computed(() => props.index !== null);
const current = computed(() => (props.index === null ? null : (props.photos[props.index] ?? null)));

const dialog = useTemplateRef<HTMLElement>("dialog");
let lastFocused: HTMLElement | null = null;

function step(delta: number) {
  if (props.index === null || props.photos.length === 0) return;
  const total = props.photos.length;
  emit("update:index", (props.index + delta + total) % total);
}

function focusables(): HTMLElement[] {
  return Array.from(dialog.value?.querySelectorAll<HTMLElement>("button") ?? []);
}

function trapFocus(event: KeyboardEvent) {
  const items = focusables();
  if (!items.length) return;

  const first = items[0]!;
  const last = items[items.length - 1]!;
  const active = document.activeElement;

  if (!dialog.value?.contains(active)) {
    event.preventDefault();
    first.focus();
  } else if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function onKeydown(event: KeyboardEvent) {
  if (!open.value) return;

  switch (event.key) {
    case "Escape":
      event.preventDefault();
      emit("close");
      break;
    case "ArrowLeft":
      event.preventDefault();
      step(-1);
      break;
    case "ArrowRight":
      event.preventDefault();
      step(1);
      break;
    case "Tab":
      trapFocus(event);
      break;
  }
}

watch(open, async (isOpen) => {
  if (isOpen) {
    lastFocused = document.activeElement as HTMLElement | null;
    document.documentElement.style.overflow = "hidden";
    await nextTick();
    focusables()[0]?.focus();
  } else {
    document.documentElement.style.overflow = "";
    // Send focus back to the tile that opened the dialog.
    lastFocused?.focus();
    lastFocused = null;
  }
});

onMounted(() => window.addEventListener("keydown", onKeydown));

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  document.documentElement.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="open && current"
        ref="dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('gallery.lightbox-label')"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 sm:p-8"
        @click.self="emit('close')"
      >
        <!-- Plain img on purpose: uploads are already capped at 2000px webp, which
             is what a full-screen view wants, so there is nothing for @nuxt/image
             to improve here and it costs no Vercel transformations. -->
        <img
          :src="current.src"
          :alt="$t(`gallery.alt.${current.category}`)"
          class="max-h-full max-w-full rounded-lg object-contain"
        />

        <button
          type="button"
          :aria-label="$t('gallery.close')"
          class="focus-ring absolute top-4 right-4 rounded-lg bg-black/50 p-2 text-white transition-colors duration-200 hover:cursor-pointer hover:bg-black/70"
          @click="emit('close')"
        >
          <XMarkIcon class="h-6 w-6" />
        </button>

        <template v-if="photos.length > 1">
          <button
            type="button"
            :aria-label="$t('gallery.previous')"
            class="focus-ring absolute left-2 rounded-lg bg-black/50 p-2 text-white transition-colors duration-200 hover:cursor-pointer hover:bg-black/70 sm:left-4"
            @click="step(-1)"
          >
            <ChevronLeftIcon class="h-6 w-6" />
          </button>

          <button
            type="button"
            :aria-label="$t('gallery.next')"
            class="focus-ring absolute right-2 rounded-lg bg-black/50 p-2 text-white transition-colors duration-200 hover:cursor-pointer hover:bg-black/70 sm:right-4"
            @click="step(1)"
          >
            <ChevronRightIcon class="h-6 w-6" />
          </button>

          <p
            class="pointer-events-none absolute bottom-4 rounded-lg bg-black/50 px-3 py-1 text-sm text-white tabular-nums"
          >
            {{ (index ?? 0) + 1 }} / {{ photos.length }}
          </p>
        </template>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Opacity only: Tailwind v4 drives translate utilities through the CSS
   `translate` property, which `transition-transform` does not animate. */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
