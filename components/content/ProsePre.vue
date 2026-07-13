<script setup lang="ts">
import { ClipboardIcon, CheckIcon } from "@heroicons/vue/20/solid";

defineOptions({ inheritAttrs: false });

defineProps<{
  code?: string;
  language?: string;
  filename?: string;
  highlights?: number[];
  meta?: string;
}>();

const copied = ref(false);

const copy = async (code: string) => {
  await navigator.clipboard.writeText(code);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};
</script>

<template>
  <div class="border-edge-soft my-5 overflow-hidden rounded-lg border dark:border-[#444c56]">
    <!-- Header bar -->
    <div
      class="border-edge-soft bg-surface flex items-center justify-between border-b px-4 py-2 dark:border-[#444c56] dark:bg-[#1c2128]"
    >
      <span class="text-content-muted font-mono text-xs">
        {{ filename ?? language ?? "code" }}
      </span>
      <button
        v-if="code"
        @click="copy(code)"
        :aria-label="copied ? 'Copied!' : 'Copy code'"
        class="text-content-muted hover:text-content flex cursor-pointer items-center gap-1.5 text-xs transition-colors"
      >
        <CheckIcon v-if="copied" class="h-3.5 w-3.5" />
        <ClipboardIcon v-else class="h-3.5 w-3.5" />
        <span>{{ copied ? "Copied!" : "Copy" }}</span>
      </button>
    </div>
    <pre v-bind="$attrs" class="!my-0 !rounded-none !border-0"><slot /></pre>
  </div>
</template>
