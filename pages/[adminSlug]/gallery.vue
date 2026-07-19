<script setup lang="ts">
import { GALLERY_CATEGORIES, type Photo } from "~/models/gallery";

definePageMeta({ middleware: "admin", layout: false });

const { data, loading, saved, isDirty, load, save, discard } = useAdminResource<{
  photos: Photo[];
}>("gallery");

onMounted(load);

const { resize, chunk } = useImageResize();

const fileInput = useTemplateRef<HTMLInputElement>("fileInput");
const uploading = ref(false);
const progress = ref("");
const error = ref("");

async function onFilesPicked(event: Event) {
  const input = event.target as HTMLInputElement;
  const picked = Array.from(input.files ?? []);
  // Reset so the same file can be re-picked after a failure.
  input.value = "";

  if (!picked.length || !data.value) return;

  uploading.value = true;
  error.value = "";

  try {
    progress.value = `Resizing ${picked.length} photo${picked.length === 1 ? "" : "s"}…`;
    const resized = await Promise.all(picked.map(resize));

    // Each batch is one commit — the endpoint caps a request at 3.5 MB.
    const batches = chunk(resized);

    for (const [i, batch] of batches.entries()) {
      progress.value = `Uploading batch ${i + 1} of ${batches.length}…`;

      const form = new FormData();
      for (const file of batch) form.append("files", file);

      const { urls } = await $fetch<{ urls: string[] }>("/api/admin/upload", {
        method: "POST",
        body: form,
      });

      for (const src of urls) {
        data.value?.photos.push({ src, category: "other" });
      }
    }

    progress.value = "";
  } catch (e: unknown) {
    const err = e as { statusMessage?: string; message?: string };
    error.value = err.statusMessage ?? err.message ?? "Upload failed";
    progress.value = "";
  } finally {
    uploading.value = false;
  }
}

function removePhoto(i: number) {
  data.value?.photos.splice(i, 1);
}
</script>

<template>
  <AdminShell>
    <div class="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 class="text-content text-xl font-bold">Gallery</h1>
        <p class="text-content-muted mt-1 text-sm">
          Photos are resized in your browser, then committed on upload. Set a category for each and
          save to publish. Removing a photo here drops it from the page but leaves the file in the
          repo.
        </p>
      </div>

      <button
        class="bg-primary hover:bg-primary/90 shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        :disabled="uploading || !data"
        @click="fileInput?.click()"
      >
        {{ uploading ? "Uploading…" : "+ Add Photos" }}
      </button>
      <input
        ref="fileInput"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        class="hidden"
        @change="onFilesPicked"
      />
    </div>

    <p v-if="progress" class="text-content-muted mb-4 text-sm">{{ progress }}</p>
    <p v-if="error" class="mb-4 text-sm text-red-500">{{ error }}</p>

    <div v-if="loading && !data" class="text-content-muted py-12 text-center">Loading…</div>

    <div v-else-if="data?.photos.length" class="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="(photo, i) in data.photos"
        :key="photo.src"
        class="border-edge-soft rounded-xl border bg-white p-3"
      >
        <img
          :src="photo.src"
          alt=""
          class="border-edge-soft mb-3 aspect-[4/3] w-full rounded-lg border object-cover"
        />
        <div class="flex items-center gap-2">
          <select
            v-model="photo.category"
            class="border-edge-soft bg-sheet flex-1 rounded-lg border px-2 py-1.5 text-sm capitalize"
          >
            <option v-for="category in GALLERY_CATEGORIES" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
          <button class="text-sm text-red-500 hover:text-red-700" @click="removePhoto(i)">
            Remove
          </button>
        </div>
      </div>
    </div>

    <p v-else-if="data" class="text-content-muted py-12 text-center">
      No photos yet. Add some to get started.
    </p>

    <AdminSaveBar
      :is-dirty="isDirty"
      :loading="loading"
      :saved="saved"
      @save="save"
      @discard="discard"
    />
  </AdminShell>
</template>
