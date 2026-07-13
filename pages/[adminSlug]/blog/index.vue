<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const cfg = useRuntimeConfig();
const slug = cfg.public.adminSlug;

const { data: posts, refresh } = await useAsyncData("admin-blog-list", () =>
  $fetch<{ name: string; sha: string; path: string }[]>("/api/admin/blog")
);

const deleting = ref<string | null>(null);

async function deletePost(name: string, sha: string) {
  if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
  const postSlug = name.replace(/\.md$/, "");
  deleting.value = name;
  try {
    await $fetch(`/api/admin/blog/${postSlug}`, { method: "DELETE", body: { sha } });
    await refresh();
  } finally {
    deleting.value = null;
  }
}

function slugFromName(name: string) {
  return name.replace(/\.md$/, "");
}
</script>

<template>
  <AdminShell>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-content text-xl font-bold">Blog Posts</h1>
      <NuxtLink
        :to="`/${slug}/blog/new`"
        class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white"
      >
        + New Post
      </NuxtLink>
    </div>

    <div v-if="!posts?.length" class="text-content-muted py-12 text-center">No posts yet.</div>

    <div
      v-else
      class="divide-edge-soft border-edge-soft flex flex-col divide-y rounded-xl border bg-white"
    >
      <div
        v-for="post in posts"
        :key="post.name"
        class="flex items-center justify-between px-5 py-4"
      >
        <div>
          <p class="text-content font-medium">{{ slugFromName(post.name) }}</p>
          <p class="text-content-muted text-xs">{{ post.path }}</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            :to="`/${slug}/blog/${slugFromName(post.name)}`"
            class="text-sm text-blue-500 hover:underline"
          >
            Edit
          </NuxtLink>
          <button
            :disabled="deleting === post.name"
            class="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
            @click="deletePost(post.name, post.sha)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </AdminShell>
</template>
