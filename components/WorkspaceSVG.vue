<script setup lang="ts">
import { computed, ref } from 'vue'

const background = ref<HTMLElement | null>(null)
const { scale, pos, style: zoomStyle } = useZoomable(background)
const patternSize = computed(() => {
  const base = 32
  const scaled = base * scale.value
  return `${scaled}px ${scaled}px, ${scaled}px ${scaled}px, ${scaled * 4}px ${scaled * 4}px, ${scaled * 4}px ${scaled * 4}px`
})

const transformSource = ref<HTMLElement | null | undefined>(null)
const positionSource = ref<HTMLElement | null | undefined>(null)
provide('transformSource', transformSource)
provide('positionSource', positionSource)
</script>

<template>
  <div class="h-screen w-screen overflow-hidden">
    <div
      ref="background" class="background-pattern h-full inset-0 fixed touch-none"
      :style="{ backgroundPosition: `${pos.x}px ${pos.y}px`, backgroundSize: patternSize }"
    >
      <div ref="positionSource" class="absolute" :style="zoomStyle" />
      <svg class="w-screen h-screen fixed">
        <g ref="transformSource" :style="zoomStyle" class="fixed">
          <slot />
        </g>
      </svg>
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
