<script setup lang="ts">
import {
  HomeIcon,
  FolderIcon,
  PhotoIcon,
  BoltIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  UsersIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  GlobeAltIcon,
  ViewColumnsIcon,
  Bars3Icon,
} from "@heroicons/vue/24/outline";

const route = useRoute();
const { user, clear } = useUserSession();
const cfg = useRuntimeConfig();
const slug = cfg.public.adminSlug;

const nav = [
  { label: "Dashboard", to: `/${slug}`, icon: HomeIcon },
  { label: "Projects", to: `/${slug}/projects`, icon: FolderIcon },
  { label: "Gallery", to: `/${slug}/gallery`, icon: PhotoIcon },
  { label: "Skills", to: `/${slug}/skills`, icon: BoltIcon },
  { label: "Tech", to: `/${slug}/tech`, icon: CpuChipIcon },
  { label: "Tools", to: `/${slug}/tools`, icon: WrenchScrewdriverIcon },
  { label: "Experiences", to: `/${slug}/experiences`, icon: BriefcaseIcon },
  { label: "Friends", to: `/${slug}/friends`, icon: UsersIcon },
  { label: "Blog", to: `/${slug}/blog`, icon: DocumentTextIcon },
  { label: "SEO", to: `/${slug}/seo`, icon: MagnifyingGlassIcon },
  { label: "i18n", to: `/${slug}/i18n`, icon: GlobeAltIcon },
  { label: "Pages", to: `/${slug}/pages`, icon: ViewColumnsIcon },
];

async function logout() {
  await $fetch("/auth/logout", { method: "POST" });
  await clear();
  navigateTo("/");
}

const sidebarOpen = ref(false);
</script>

<template>
  <div class="bg-sheet min-h-screen">
    <!-- Top bar -->
    <header
      class="border-edge-soft fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b bg-white px-4"
    >
      <div class="flex items-center gap-3">
        <button
          class="text-content-muted hover:bg-surface rounded p-1 lg:hidden"
          @click="sidebarOpen = !sidebarOpen"
        >
          <Bars3Icon class="h-5 w-5" />
        </button>
        <span class="text-content font-semibold">Admin Panel</span>
      </div>
      <div class="flex items-center gap-3">
        <img
          v-if="user?.avatar"
          :src="user.avatar"
          :alt="user.login"
          class="h-8 w-8 rounded-full"
        />
        <span class="text-content-secondary text-sm">{{ user?.login }}</span>
        <button
          class="text-content-muted hover:bg-surface rounded px-3 py-1 text-sm"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </header>

    <!-- Sidebar -->
    <aside
      :class="[
        'border-edge-soft fixed inset-y-0 left-0 z-20 w-56 transform border-r bg-white pt-14 transition-transform',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <nav class="flex flex-col gap-0.5 p-3">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="text-content-secondary hover:bg-surface flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors"
          :class="{
            'bg-primary/10 text-primary dark:text-primary font-medium':
              route.path === item.to || (item.to !== `/${slug}` && route.path.startsWith(item.to)),
          }"
        >
          <component :is="item.icon" class="h-4 w-4 shrink-0" />
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-10 bg-black/30 lg:hidden"
      @click="sidebarOpen = false"
    />

    <!-- Main content -->
    <main class="pt-14 lg:pl-56">
      <div class="p-6">
        <slot />
      </div>
    </main>
  </div>
</template>
