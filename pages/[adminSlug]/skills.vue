<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { data, loading, saved, isDirty, load, save, discard } = useAdminResource<{
  highlight: { data: any[] };
  other: { data: any[] };
}>("skill");

onMounted(load);

function addItem(section: "highlight" | "other") {
  const item: any = { logo: "", name: "" };
  if (section === "highlight") item.description = "";
  data.value?.[section].data.push(item);
}

function removeItem(section: "highlight" | "other", i: number) {
  data.value?.[section].data.splice(i, 1);
}
</script>

<template>
  <AdminShell>
    <h1 class="text-content mb-6 text-xl font-bold">Skills</h1>

    <div v-if="loading && !data" class="text-content-muted py-12 text-center">Loading…</div>

    <div v-else-if="data" class="flex flex-col gap-8">
      <section v-for="section in ['highlight', 'other'] as const" :key="section">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-content font-semibold capitalize">{{ section }} skills</h2>
          <button class="text-primary text-sm hover:underline" @click="addItem(section)">
            + Add
          </button>
        </div>

        <div class="flex flex-col gap-3">
          <div
            v-for="(item, i) in data[section].data"
            :key="i"
            class="border-edge-soft flex items-start gap-3 rounded-xl border bg-white p-4"
          >
            <img v-if="item.logo" :src="item.logo" class="mt-1 h-8 w-8 object-contain" />
            <div class="flex flex-1 flex-col gap-2">
              <div class="grid gap-2 sm:grid-cols-2">
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
                <div v-if="section === 'highlight'" class="sm:col-span-2">
                  <label class="text-content-muted mb-1 block text-xs">Description</label>
                  <textarea
                    v-model="item.description"
                    rows="2"
                    class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                  />
                </div>
              </div>
            </div>
            <button class="text-sm text-red-400 hover:text-red-600" @click="removeItem(section, i)">
              ×
            </button>
          </div>
        </div>
      </section>
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
