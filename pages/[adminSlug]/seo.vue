<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { data, loading, saved, isDirty, load, save, discard } = useAdminResource<{
  siteName: string;
  siteUrl: string;
  defaultOgImage: string;
  themeColor: string;
  twitterHandle: string;
}>("seo", "/api/admin/seo");

onMounted(load);
</script>

<template>
  <AdminShell>
    <h1 class="text-content mb-2 text-xl font-bold">SEO Settings</h1>
    <p class="text-content-muted mb-6 text-sm">
      Site-wide defaults for Open Graph, Twitter Card, and meta tags.
    </p>

    <div v-if="loading && !data" class="text-content-muted py-12 text-center">Loading…</div>

    <div
      v-else-if="data"
      class="border-edge-soft grid max-w-2xl gap-5 rounded-xl border bg-white p-6"
    >
      <div>
        <label class="text-content-secondary mb-1 block text-xs font-medium">Site name</label>
        <input
          v-model="data.siteName"
          class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label class="text-content-secondary mb-1 block text-xs font-medium">Site URL</label>
        <input
          v-model="data.siteUrl"
          class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label class="text-content-secondary mb-1 block text-xs font-medium"
          >Default OG image URL</label
        >
        <input
          v-model="data.defaultOgImage"
          class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-2 text-sm"
        />
        <img
          v-if="data.defaultOgImage"
          :src="data.defaultOgImage"
          class="mt-2 h-20 w-20 rounded-lg object-cover"
        />
      </div>
      <div>
        <label class="text-content-secondary mb-1 block text-xs font-medium">Theme color</label>
        <div class="flex items-center gap-3">
          <input
            v-model="data.themeColor"
            type="color"
            class="border-edge-soft bg-sheet h-10 w-16 cursor-pointer rounded border p-1"
          />
          <input
            v-model="data.themeColor"
            class="border-edge-soft bg-sheet flex-1 rounded-lg border px-3 py-2 text-sm"
          />
        </div>
      </div>
      <div>
        <label class="text-content-secondary mb-1 block text-xs font-medium"
          >Twitter handle (without @)</label
        >
        <input
          v-model="data.twitterHandle"
          placeholder="adiiaryasutaa"
          class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-2 text-sm"
        />
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
