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
  <div class="my-5 overflow-hidden rounded-lg border border-gray-300 dark:border-[#444c56]">
    <!-- Header bar -->
    <div
      class="flex items-center justify-between border-b border-gray-300 bg-gray-100 px-4 py-2 dark:border-[#444c56] dark:bg-[#1c2128]"
    >
      <span class="font-mono text-xs text-gray-500 dark:text-gray-400">
        {{ filename ?? language ?? "code" }}
      </span>
      <button
        v-if="code"
        @click="copy(code)"
        :aria-label="copied ? 'Copied!' : 'Copy code'"
        class="flex cursor-pointer items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <CheckIcon v-if="copied" class="h-3.5 w-3.5" />
        <ClipboardIcon v-else class="h-3.5 w-3.5" />
        <span>{{ copied ? "Copied!" : "Copy" }}</span>
      </button>
    </div>
    <pre v-bind="$attrs" class="!my-0 !rounded-none !border-0"><slot /></pre>
  </div>
</template>
