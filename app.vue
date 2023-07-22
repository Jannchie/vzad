<script setup lang="ts">
import '@unocss/reset/tailwind.css'
</script>

<template>
  <NuxtPage />
</template>

<style>
:root {
  color-scheme: light dark;
  @apply dark:bg-neutral-900 dark:text-neutral-100;
}

body {
  margin: 0;
}
</style>
