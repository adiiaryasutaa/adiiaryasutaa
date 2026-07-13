<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { data, loading, saved, isDirty, load, save, discard } = useAdminResource<{ data: any[] }>(
  "tool"
);

onMounted(load);

function addTool() {
  data.value?.data.push({ logo: "", name: "" });
}

function removeTool(i: number) {
  data.value?.data.splice(i, 1);
}
</script>

<template>
  <AdminShell>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-content text-xl font-bold">Tools</h1>
      <button
        class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white"
        @click="addTool"
      >
        + Add Tool
      </button>
    </div>

    <div v-if="loading && !data" class="text-content-muted py-12 text-center">Loading…</div>

    <div v-else-if="data" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(tool, i) in data.data"
        :key="i"
        class="border-edge-soft flex items-center gap-3 rounded-xl border bg-white p-4"
      >
        <img v-if="tool.logo" :src="tool.logo" class="h-8 w-8 flex-shrink-0 object-contain" />
        <div class="flex min-w-0 flex-1 flex-col gap-2">
          <input
            v-model="tool.name"
            placeholder="Name"
            class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
          />
          <input
            v-model="tool.logo"
            placeholder="Logo URL"
            class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-xs"
          />
        </div>
        <button class="flex-shrink-0 text-red-400 hover:text-red-600" @click="removeTool(i)">
          ×
        </button>
      </div>
    </div>

    <AdminSaveBar
      :is-dirty="isDirty"
      :loading="loading"
      :saved="saved"
      @save="save"
      @discard="discard"
    />
  </AdminShell>
</template>
