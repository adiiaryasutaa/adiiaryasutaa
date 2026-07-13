<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const activeTab = ref<"work" | "education" | "volunteer">("work");

const work = useAdminResource<{ data: any[] }>("experience/work");
const education = useAdminResource<{ data: any[] }>("experience/education");
const volunteer = useAdminResource<{ data: any[] }>("experience/volunteer");

const current = computed(() => ({ work, education, volunteer })[activeTab.value]);

onMounted(async () => {
  await Promise.all([work.load(), education.load(), volunteer.load()]);
});

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function addWork() {
  work.data.value?.data.push({
    title: "",
    employment: "Full-time",
    company: "",
    description: "",
    current: false,
    start: { month: "January", year: "" },
    end: {},
    media: [],
  });
}

function addEducation() {
  education.data.value?.data.push({
    school: "",
    major: "",
    description: "",
    start: "",
    end: "",
  });
}

function addVolunteer() {
  volunteer.data.value?.data.push({
    title: "",
    organization: "",
    description: "",
    current: false,
    start: { month: "January", year: "" },
    end: {},
    media: [],
  });
}

function addItem() {
  if (activeTab.value === "work") addWork();
  else if (activeTab.value === "education") addEducation();
  else addVolunteer();
}

function removeItem(i: number) {
  current.value.data.value?.data.splice(i, 1);
}
</script>

<template>
  <AdminShell>
    <h1 class="text-content mb-6 text-xl font-bold">Experiences</h1>

    <!-- Tabs -->
    <div class="mb-6 flex gap-2">
      <button
        v-for="tab in ['work', 'education', 'volunteer'] as const"
        :key="tab"
        class="rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors"
        :class="
          activeTab === tab
            ? 'bg-primary text-white'
            : 'bg-surface text-content-secondary hover:bg-surface-raised'
        "
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div
      v-if="current.loading.value && !current.data.value"
      class="text-content-muted py-12 text-center"
    >
      Loading…
    </div>

    <div v-else-if="current.data.value">
      <div class="mb-3 flex justify-end">
        <button
          class="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-medium text-white"
          @click="addItem"
        >
          + Add
        </button>
      </div>

      <div class="flex flex-col gap-4">
        <!-- Work & Volunteer -->
        <template v-if="activeTab !== 'education'">
          <div
            v-for="(item, i) in current.data.value.data"
            :key="i"
            class="border-edge-soft rounded-xl border bg-white p-5"
          >
            <div class="mb-3 flex justify-between">
              <span class="text-content-muted text-sm">#{{ i + 1 }}</span>
              <button class="text-sm text-red-500" @click="removeItem(i)">Remove</button>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div>
                <label class="text-content-muted mb-1 block text-xs">Title</label>
                <input
                  v-model="item.title"
                  class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                />
              </div>
              <div>
                <label class="text-content-muted mb-1 block text-xs">{{
                  activeTab === "work" ? "Company" : "Organization"
                }}</label>
                <input
                  v-model="item[activeTab === 'work' ? 'company' : 'organization']"
                  class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                />
              </div>
              <div v-if="activeTab === 'work'">
                <label class="text-content-muted mb-1 block text-xs">Employment type</label>
                <select
                  v-model="item.employment"
                  class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Freelance</option>
                  <option>Internship</option>
                </select>
              </div>
              <div class="sm:col-span-2">
                <label class="text-content-muted mb-1 block text-xs">Description</label>
                <textarea
                  v-model="item.description"
                  rows="2"
                  class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                />
              </div>
              <div>
                <label class="text-content-muted mb-1 block text-xs">Start month</label>
                <select
                  v-model="item.start.month"
                  class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                >
                  <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
                </select>
              </div>
              <div>
                <label class="text-content-muted mb-1 block text-xs">Start year</label>
                <input
                  v-model="item.start.year"
                  type="number"
                  class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                />
              </div>
              <div>
                <label class="text-content-muted mb-2 flex items-center gap-2 text-xs">
                  <input v-model="item.current" type="checkbox" class="accent-primary" />
                  Current (no end date)
                </label>
              </div>
              <template v-if="!item.current">
                <div>
                  <label class="text-content-muted mb-1 block text-xs">End month</label>
                  <select
                    v-model="item.end.month"
                    class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                  >
                    <option v-for="m in months" :key="m" :value="m">{{ m }}</option>
                  </select>
                </div>
                <div>
                  <label class="text-content-muted mb-1 block text-xs">End year</label>
                  <input
                    v-model="item.end.year"
                    type="number"
                    class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                  />
                </div>
              </template>
            </div>
          </div>
        </template>

        <!-- Education -->
        <template v-else>
          <div
            v-for="(item, i) in current.data.value.data"
            :key="i"
            class="border-edge-soft rounded-xl border bg-white p-5"
          >
            <div class="mb-3 flex justify-between">
              <span class="text-content-muted text-sm">#{{ i + 1 }}</span>
              <button class="text-sm text-red-500" @click="removeItem(i)">Remove</button>
            </div>
            <div class="grid gap-3 sm:grid-cols-2">
              <div>
                <label class="text-content-muted mb-1 block text-xs">School</label>
                <input
                  v-model="item.school"
                  class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                />
              </div>
              <div>
                <label class="text-content-muted mb-1 block text-xs">Major</label>
                <input
                  v-model="item.major"
                  class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                />
              </div>
              <div>
                <label class="text-content-muted mb-1 block text-xs">Start year</label>
                <input
                  v-model="item.start"
                  type="number"
                  class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                />
              </div>
              <div>
                <label class="text-content-muted mb-1 block text-xs">End year</label>
                <input
                  v-model="item.end"
                  type="number"
                  class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                />
              </div>
              <div class="sm:col-span-2">
                <label class="text-content-muted mb-1 block text-xs">Description</label>
                <textarea
                  v-model="item.description"
                  rows="2"
                  class="border-edge-soft bg-sheet w-full rounded-lg border px-3 py-1.5 text-sm"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <AdminSaveBar
      :is-dirty="current.isDirty.value"
      :loading="current.loading.value"
      :saved="current.saved.value"
      @save="current.save()"
      @discard="current.discard()"
    />
  </AdminShell>
</template>
