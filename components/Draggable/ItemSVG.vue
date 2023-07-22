<script setup lang="ts">
const { transformSource, positionSource, id } = defineProps<{
  transformSource?: HTMLElement | null
  positionSource?: HTMLElement | null
  id: string
}>()
const el = ref<HTMLElement | null>(null)
const datum = useDatum(id)
const { x, y, style } = useDraggable(el, {
  initialValue: datum.pos,
  stopPropagation: true,
  preventDefault: true,
  transformSource,
  positionSource,
  onMove({ x: newX, y: newY }) {
    const xNiced = Math.round(newX / 32) * 32
    const yNiced = Math.round(newY / 32) * 32
    x.value = xNiced
    y.value = yNiced
    datum.pos = { x: xNiced, y: yNiced }
  },
})
</script>

<template>
  <g
    ref="el" :style="style"
    :transform="`translate(${x}, ${y})`"
    class="select-none absolute touch-none active:z-100 cursor-move active:stroke-sky-500"
  >
    <rect
      :style="style"
      :width="32 * 6"
      :height="32 * 2"
      :rx="4"
      class="fill-zinc-900"
    />
    <text class="fill-white" stroke-width="0" :x="32 * 3" :y="32 * 1" text-anchor="middle" dominant-baseline="middle">
      I am at {{ x }}, {{ y }}
    </text>
  </g>
</template>
