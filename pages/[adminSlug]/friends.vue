<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const { data, loading, saved, isDirty, load, save, discard } = useAdminResource<any[]>("friend");

onMounted(load);

function addFriend() {
  data.value?.push({
    photo: "",
    name: "",
    jobTitle: "",
    socials: [],
  });
}

function removeFriend(i: number) {
  data.value?.splice(i, 1);
}

function addSocial(friend: any) {
  friend.socials.push({ platform: "github", url: "" });
}

function removeSocial(friend: any, i: number) {
  friend.socials.splice(i, 1);
}

const platforms = ["github", "linkedin", "instagram", "twitter"];
</script>

<template>
  <AdminShell>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-content text-xl font-bold">Friends</h1>
      <button
        class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white"
        @click="addFriend"
      >
        + Add Friend
      </button>
    </div>

    <div v-if="loading && !data" class="text-content-muted py-12 text-center">Loading…</div>

    <div v-else-if="data" class="flex flex-col gap-4">
      <div
        v-for="(friend, i) in data"
        :key="i"
        class="border-edge-soft rounded-xl border bg-white p-5"
      >
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img
              v-if="friend.photo"
              :src="friend.photo"
              class="h-10 w-10 rounded-full object-cover"
            />
            <span class="text-content font-medium">{{ friend.name || "New friend" }}</span>
          </div>
          <button class="text-sm text-red-500 hover:text-red-700" @click="removeFriend(i)">
            Remove
          </button>
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          <div>
            <label class="text-content-muted mb-1 block text-xs">Name</label>
            <input
              v-model="friend.name"
              class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
            />
          </div>
          <div>
            <label class="text-content-muted mb-1 block text-xs">Job Title</label>
            <input
              v-model="friend.jobTitle"
              class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
            />
          </div>
          <div>
            <label class="text-content-muted mb-1 block text-xs">Photo URL</label>
            <input
              v-model="friend.photo"
              class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
            />
          </div>
        </div>

        <div class="mt-3">
          <div class="mb-2 flex items-center justify-between">
            <label class="text-content-muted text-xs">Socials</label>
            <button class="text-primary text-xs hover:underline" @click="addSocial(friend)">
              + Add
            </button>
          </div>
          <div class="flex flex-col gap-2">
            <div v-for="(social, si) in friend.socials" :key="si" class="flex gap-2">
              <select
                v-model="social.platform"
                class="border-edge-soft bg-sheet rounded-lg border px-2 py-1.5 text-sm"
              >
                <option v-for="p in platforms" :key="p" :value="p">{{ p }}</option>
              </select>
              <input
                v-model="social.url"
                placeholder="URL"
                class="border-edge-soft bg-sheet flex-1 rounded-lg border px-3 py-1.5 text-sm"
              />
              <button
                class="text-red-400 hover:text-red-600"
                @click="removeSocial(friend, Number(si))"
              >
                ×
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
