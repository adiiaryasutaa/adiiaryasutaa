<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { data, sha, loading, saved, isDirty, load, save, discard } = useAdminResource<{
  projects: any[];
}>("project");

onMounted(load);

function addProject() {
  data.value?.projects.push({
    name: "",
    description: "",
    tags: [],
    repository: { provider: "github", url: "" },
    preview: { url: "" },
  });
}

function removeProject(i: number) {
  data.value?.projects.splice(i, 1);
}

function addTag(project: any) {
  project.tags.push("");
}

function removeTag(project: any, i: number) {
  project.tags.splice(i, 1);
}
</script>

<template>
  <AdminShell>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-content text-xl font-bold">Projects</h1>
      <button
        class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white"
        @click="addProject"
      >
        + Add Project
      </button>
    </div>

    <div v-if="loading && !data" class="text-content-muted py-12 text-center">Loading…</div>

    <div v-else-if="data" class="flex flex-col gap-4">
      <div
        v-for="(project, i) in data.projects"
        :key="i"
        class="border-edge-soft rounded-xl border bg-white p-5"
      >
        <div class="mb-4 flex items-center justify-between">
          <span class="text-content-muted text-sm font-medium">Project #{{ i + 1 }}</span>
          <button class="text-sm text-red-500 hover:text-red-700" @click="removeProject(i)">
            Remove
          </button>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="text-content-secondary mb-1 block text-xs font-medium">Name</label>
            <input
              v-model="project.name"
              class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="text-content-secondary mb-1 block text-xs font-medium"
              >Repository URL</label
            >
            <input
              v-model="project.repository.url"
              class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="text-content-secondary mb-1 block text-xs font-medium">Description</label>
            <textarea
              v-model="project.description"
              rows="2"
              class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="text-content-secondary mb-1 block text-xs font-medium">Preview URL</label>
            <input
              v-model="project.preview.url"
              class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label class="text-content-secondary mb-1 block text-xs font-medium"
              >Cover image URL</label
            >
            <input
              v-model="project.cover"
              class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="text-content-secondary mb-1 block text-xs font-medium">Tags</label>
            <div class="flex flex-wrap gap-2">
              <input
                v-for="(tag, ti) in project.tags"
                :key="ti"
                v-model="project.tags[ti]"
                class="border-edge-soft bg-sheet w-28 rounded-lg border px-3 py-1.5 text-sm"
              />
              <button
                class="border-edge-soft text-content-muted hover:border-edge rounded-lg border border-dashed px-3 py-1.5 text-sm"
                @click="addTag(project)"
              >
                + Tag
              </button>
              <button
                v-if="project.tags.length"
                class="text-sm text-red-400"
                @click="removeTag(project, project.tags.length - 1)"
              >
                × Last
              </button>
            </div>
          </div>
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
