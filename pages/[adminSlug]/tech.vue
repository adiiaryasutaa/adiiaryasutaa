<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { data, loading, saved, isDirty, load, save, discard } =
  useAdminResource<Record<string, { data: any[] }>>("tech");

onMounted(load);

const activeTab = ref("");

watch(
  data,
  (v) => {
    if (v && !activeTab.value) activeTab.value = Object.keys(v)[0] ?? "";
  },
  { immediate: true }
);

function addItem() {
  data.value?.[activeTab.value]?.data.push({ logo: "", name: "", highlight: false });
}

function removeItem(i: number) {
  data.value?.[activeTab.value]?.data.splice(i, 1);
}

function addCategory() {
  const name = prompt("Category name (e.g. 'devops'):");
  if (name && data.value && !data.value[name]) {
    data.value[name] = { data: [] };
    activeTab.value = name;
  }
}
</script>

<template>
  <AdminShell>
    <h1 class="text-content mb-6 text-xl font-bold">Tech Stack</h1>

    <div v-if="loading && !data" class="text-content-muted py-12 text-center">Loading…</div>

    <div v-else-if="data">
      <!-- Tabs -->
      <div class="mb-4 flex flex-wrap gap-2">
        <button
          v-for="cat in Object.keys(data)"
          :key="cat"
          class="rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors"
          :class="
            activeTab === cat
              ? 'bg-primary text-white'
              : 'bg-surface text-content-secondary hover:bg-surface-raised'
          "
          @click="activeTab = cat"
        >
          {{ cat }}
        </button>
        <button
          class="border-edge-soft text-content-muted hover:border-edge rounded-full border border-dashed px-4 py-1.5 text-sm"
          @click="addCategory"
        >
          + Category
        </button>
      </div>

      <!-- Items -->
      <div class="mb-3 flex justify-end">
        <button class="text-primary text-sm hover:underline" @click="addItem">+ Add item</button>
      </div>

      <div class="flex flex-col gap-3">
        <div
          v-for="(item, i) in data[activeTab]?.data ?? []"
          :key="i"
          class="border-edge-soft flex items-center gap-3 rounded-xl border bg-white p-4"
        >
          <img v-if="item.logo" :src="item.logo" class="h-8 w-8 object-contain" />
          <div class="grid flex-1 gap-2 sm:grid-cols-3">
            <div>
              <label class="text-content-muted mb-1 block text-xs">Logo URL</label>
              <input
                v-model="item.logo"
                class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label class="text-content-muted mb-1 block text-xs">Name</label>
              <input
                v-model="item.name"
                class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
              />
            </div>
            <div>
              <label class="text-content-muted mb-1 block text-xs">Description</label>
              <input
                v-model="item.description"
                class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
              />
            </div>
          </div>
          <label class="text-content-secondary flex items-center gap-1.5 text-sm">
            <input v-model="item.highlight" type="checkbox" class="accent-primary" />
            Highlight
          </label>
          <button class="text-sm text-red-400 hover:text-red-600" @click="removeItem(i)">×</button>
        </div>
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
