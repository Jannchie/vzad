<script setup lang="ts">
const { transformSource } = defineProps<{
  transformSource: HTMLElement | null | undefined
}>()
const el = ref<HTMLElement | null>(null)
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 0, y: 0 },
  stopPropagation: true,
  preventDefault: true,
  transformSource,
  onMove({ x: xx, y: yy }) {
    const xNiced = Math.round(xx / 32) * 32
    const yNiced = Math.round(yy / 32) * 32
    x.value = xNiced
    y.value = yNiced
  },
})
</script>

<template>
  <div ref="el" :style="style" class="absolute bg-zinc-900 p-4 rounded-xl touch-none">
    Drag me! I am at {{ x }}, {{ y }}
  </div>
</template>
