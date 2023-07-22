<script setup lang="ts">
const links = [
  { to: '/svg', text: 'SVG Example' },
  { to: '/html', text: 'HTML Example' },
]
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center gap-2">
    <NuxtLink v-for="link in links" :key="link.to" class="p-2 hover:bg-amber hover:text-black rounded-xl transition-all" :href="link.to">
      {{ link.text }}
    </NuxtLink>
  </div>
</template>
