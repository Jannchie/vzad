<script setup lang="ts">
const props = defineProps<{
  data: {
    pos: {
      x: number
      y: number
    }
    shape: {
      w: number
      h: number
    }
  }
}>()
const emit = defineEmits(['update:data'])

const data = computed({
  get() {
    return props.data
  },
  set(value) {
    emit('update:data', value)
  },
})

const transformSource = inject<MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>>('transformSource')
const positionSource = inject<MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>>('positionSource')
const el = ref<HTMLElement | null>(null)
const { x, y, style } = useDraggable(el, {
  initialValue: data.value.pos,
  stopPropagation: true,
  preventDefault: true,
  transformSource,
  positionSource,
  onMove({ x: newX, y: newY }) {
    const xNiced = Math.round(newX / 32) * 32
    const yNiced = Math.round(newY / 32) * 32
    x.value = xNiced
    y.value = yNiced
    data.value.pos = { x: xNiced, y: yNiced }
  },
})
const isHover = useElementHover(el)
const { w, h } = data.value.shape
</script>

<template>
  <g
    ref="el" :style="style" :transform="`translate(${x}, ${y})`"
    class="select-none absolute touch-none active:z-100 cursor-move"
  >
    <g class="active:stroke-amber">
      <rect :style="style" :width="w" :height="h" :rx="4" class="fill-zinc-900" />
      <text class="fill-white" stroke-width="0" :x="w / 2" :y="h / 2" text-anchor="middle" dominant-baseline="middle">
        I am at {{ x }}, {{ y }}
      </text>
    </g>
    <g v-if="isHover" class="children:fill-amber">
      <circle :cx="0" :cy="0" r="4" />
      <circle :cx="w" :cy="h" r="4" />
      <circle :cx="0" :cy="h" r="4" />
      <circle :cx="w" :cy="0" r="4" />
      <circle :cx="w / 2" :cy="h" r="4" />
      <circle :cx="w / 2" :cy="0" r="4" />
      <circle :cx="w" :cy="h / 2" r="4" />
      <circle :cx="0" :cy="h / 2" r="4" />
    </g>
  </g>
</template>
