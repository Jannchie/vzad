<script setup lang="ts">
const { transformSource, id } = defineProps<{
  transformSource?: HTMLElement | null | undefined
  id: string
}>()
const el = ref<HTMLElement | null>(null)
const datum = useDatum(id)
const { x, y, style } = useDraggable(el, {
  initialValue: datum.pos,
  stopPropagation: true,
  preventDefault: true,
  transformSource,
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
  <div
    ref="el" :style="style"
    class="select-none absolute touch-none w-[calc(32px*6)] h-[calc(32px*2)] active:z-100 active:scale-105 transition-transform duration-200"
  >
    <div
      :style="style"
      class="cursor-move rounded border border-transparent active:border-sky-500 bg-zinc-900 w-full h-full flex justify-center items-center"
    >
      <div>
        I am at {{ x }}, {{ y }}
      </div>
    </div>
  </div>
</template>
