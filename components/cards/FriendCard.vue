<script setup lang="ts">
import type { Friend } from "@/models/friend";

interface Props {
  friend: Friend;
}

const { friend } = defineProps<Props>();
</script>

<template>
  <Card
    class="hover:border-primary hover:bg-primary-tint active:border-primary active:bg-primary transition-colors"
  >
    <div class="flex flex-row items-start gap-3">
      <img
        :src="friend.photo"
        :alt="friend.name"
        class="border-edge h-14 w-14 shrink-0 rounded-full border object-cover"
      />

      <div class="flex min-w-0 flex-col gap-1">
        <div class="flex flex-col gap-0.5">
          <h3 class="text-content truncate font-semibold">
            {{ friend.name }}
          </h3>
          <p class="text-content-muted truncate text-sm">
            {{ friend.jobTitle }}
          </p>
        </div>

        <SocialLinks v-if="friend.socials.length" :links="friend.socials" size="sm" />
      </div>
    </div>
  </Card>
</template>
