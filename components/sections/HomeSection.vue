<script setup lang="ts"></script>

<template>
  <section class="container">
    <div class="flex flex-col items-start">
      <div class="flex max-w-2xl flex-col space-y-8">
        <div class="flex flex-col space-y-4">
          <div class="h-40 w-40">
            <img
              src="/assets/imgs/adiaryasuta.jpg"
              alt="Adi Aryasuta"
              class="rounded-full border border-gray-400 dark:border-gray-600"
            />
          </div>

          <div>
            <h1
              class="text-3xl leading-tight font-semibold tracking-tight text-balance text-gray-800 lg:text-4xl dark:text-gray-200"
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
                  class="h-10 w-10 rounded-lg border border-gray-400 dark:border-gray-600"
                />
                <span class="text-sm font-bold text-gray-900 dark:text-gray-50">{{
                  $t("home.gdg-lead")
                }}</span>
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
              class="focus-ring hover:text-primary hover:border-primary dark:hover:text-primary dark:hover:border-primary rounded-lg border border-gray-400 px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-gray-100 active:bg-gray-200 dark:border-gray-600 dark:text-gray-50 dark:hover:bg-gray-900 dark:active:bg-gray-800"
            >
              {{ $t("home.see-more") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
