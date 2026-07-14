<script setup lang="ts"></script>

<template>
  <section class="container">
    <div
      class="flex flex-col gap-8 md:min-h-[min(calc(100svh-20rem),40rem)] md:flex-row md:items-center md:justify-between md:gap-12"
    >
      <div class="flex max-w-2xl flex-col space-y-8">
        <div class="flex flex-col space-y-4">
          <div>
            <h1
              class="text-content text-3xl leading-tight font-semibold tracking-tight text-balance lg:text-4xl"
            >
              {{ $t("home.brand") }}
            </h1>
          </div>

          <a
            href="https://gdg.community.dev/gdg-on-campus-primakara-university-denpasar-indonesia/"
            target="_blank"
            rel="noopener noreferrer"
            class="focus-ring inline-flex rounded-lg"
          >
            <div class="surface inline-flex p-2">
              <div class="flex items-center space-x-2">
                <img
                  src="/assets/imgs/gdg.webp"
                  alt="GDG Logo"
                  class="border-edge h-10 w-10 rounded-lg border"
                />
                <span class="text-content text-sm font-bold">{{ $t("home.gdg-lead") }}</span>
              </div>
            </div>
          </a>

          <div>
            <Paragraph>
              {{ $t("home.description") }}
            </Paragraph>
          </div>
        </div>

        <div class="flex flex-col space-y-4">
          <SocialMediaSection />

          <div>
            <NuxtLink
              to="/about"
              class="focus-ring hover:text-primary hover:border-primary dark:hover:text-primary dark:hover:border-primary border-edge text-content hover:bg-surface active:bg-surface-raised rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              {{ $t("home.see-more") }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="shrink-0 max-md:order-first">
        <img
          src="/assets/imgs/adiaryasuta.jpg"
          alt="Adi Aryasuta"
          class="border-edge h-40 w-40 rounded-full border md:h-64 md:w-64 lg:h-80 lg:w-80"
        />
      </div>
    </div>
  </section>
</template>
