<script setup lang="ts">
definePageMeta({ middleware: "admin", layout: false });

const en = useAdminResource<Record<string, any>>("en", "/api/admin/locale/en");
const id = useAdminResource<Record<string, any>>("id", "/api/admin/locale/id");

onMounted(() => Promise.all([en.load(), id.load()]));

const isDirty = computed(() => en.isDirty.value || id.isDirty.value);
const loading = computed(() => en.loading.value || id.loading.value);
const saved = computed(() => en.saved.value || id.saved.value);

async function save() {
  await Promise.all([
    en.isDirty.value ? en.save() : Promise.resolve(),
    id.isDirty.value ? id.save() : Promise.resolve(),
  ]);
}

function discard() {
  en.discard();
  id.discard();
}

// Flatten nested object to dot-notation paths for display
function flattenKeys(obj: any, prefix = ""): { key: string; path: string[] }[] {
  const result: { key: string; path: string[] }[] = [];
  for (const [k, v] of Object.entries(obj ?? {})) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string" || typeof v === "number") {
      result.push({ key: path, path: path.split(".") });
    } else if (Array.isArray(v)) {
      result.push({ key: path, path: path.split(".") });
    } else if (typeof v === "object") {
      result.push(...flattenKeys(v, path));
    }
  }
  return result;
}

const enKeys = computed(() => (en.data.value ? flattenKeys(en.data.value) : []));

function getVal(obj: any, path: string[]): any {
  return path.reduce((acc, k) => acc?.[k], obj);
}

function setVal(obj: any, path: string[], val: any) {
  const last = path[path.length - 1]!;
  const parent = path.slice(0, -1).reduce((acc, k) => acc?.[k], obj);
  if (parent) parent[last] = val;
}

// Highlight meta.* section at top
const metaKeys = computed(() => enKeys.value.filter((k) => k.key.startsWith("meta.")));
const otherKeys = computed(() => enKeys.value.filter((k) => !k.key.startsWith("meta.")));
const orderedKeys = computed(() => [...metaKeys.value, ...otherKeys.value]);
</script>

<template>
  <AdminShell>
    <h1 class="text-content mb-2 text-xl font-bold">i18n Translations</h1>
    <p class="text-content-muted mb-6 text-sm">
      Edit EN and ID locale strings side by side. <strong>meta.*</strong> keys control page SEO
      descriptions.
    </p>

    <div v-if="loading && !en.data.value" class="text-content-muted py-12 text-center">
      Loading…
    </div>

    <div v-else-if="en.data.value && id.data.value" class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-edge-soft border-b">
            <th class="text-content-muted py-2 pr-4 text-left text-xs font-medium">Key</th>
            <th class="text-content-muted py-2 pr-4 text-left text-xs font-medium">EN</th>
            <th class="text-content-muted py-2 text-left text-xs font-medium">ID</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-stone-900">
          <tr
            v-for="item in orderedKeys"
            :key="item.key"
            :class="item.key.startsWith('meta.') ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''"
          >
            <td class="py-2 pr-4">
              <code class="text-content-muted text-xs">{{ item.key }}</code>
            </td>
            <td class="py-2 pr-4">
              <textarea
                v-if="typeof getVal(en.data.value, item.path) === 'string'"
                :value="getVal(en.data.value, item.path)"
                rows="1"
                class="border-edge-soft w-full min-w-[200px] rounded border bg-white px-2 py-1 text-sm"
                @input="
                  setVal(en.data.value, item.path, ($event.target as HTMLTextAreaElement).value)
                "
              />
              <span v-else class="text-content-muted text-xs italic">{{
                typeof getVal(en.data.value, item.path)
              }}</span>
            </td>
            <td class="py-2">
              <textarea
                v-if="typeof getVal(id.data.value, item.path) === 'string'"
                :value="getVal(id.data.value, item.path)"
                rows="1"
                class="border-edge-soft w-full min-w-[200px] rounded border bg-white px-2 py-1 text-sm"
                @input="
                  setVal(id.data.value, item.path, ($event.target as HTMLTextAreaElement).value)
                "
              />
              <span v-else class="text-content-muted text-xs italic">{{
                typeof getVal(id.data.value, item.path)
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
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
