<script setup lang="ts">
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const background = ref<HTMLElement | null>(null)
const transformSource = ref<HTMLElement | null>(null)
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

const { scale, pos, style: backgroundStyle } = useZoomable(background)
const patternSize = computed(() => {
  const base = 32
  const scaled = base * scale.value
  return `${scaled}px ${scaled}px, ${scaled}px ${scaled}px, ${scaled * 4}px ${scaled * 4}px, ${scaled * 4}px ${scaled * 4}px`
})
</script>

<template>
  <div class="h-screen w-screen overflow-hidden">
    <div ref="background" class="background-pattern h-full inset-0 fixed touch-none" :style="{ backgroundPosition: `${pos.x}px ${pos.y}px`, backgroundSize: patternSize }">
      <div ref="transformSource" class="absolute children:w-max" :style="backgroundStyle">
        <div ref="el" :style="style" class="absolute bg-zinc-900 p-4 rounded-xl touch-none">
          Drag me! I am at {{ x }}, {{ y }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-pattern {
  background-image: linear-gradient(#3333 1px, transparent 0),
    linear-gradient(90deg, #3333 1px, transparent 0),
    linear-gradient(#4444 2px, transparent 0),
    linear-gradient(90deg, #4444  2px, transparent 0);
    background-origin: 0px 0px;
    overflow: hidden;
    background-repeat: repeat;
}
</style>
