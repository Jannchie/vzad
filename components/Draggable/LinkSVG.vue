<script  setup lang="ts">
const { data } = defineProps<{
  data: {
    from: string
    via: [{
      x: number
      y: number
    }]
    to: string
  }
}>()
defineEmits(['update:data'])
const from = useDatum(data.from)
const to = useDatum(data.to)
const via = data.via

const fromCenter = computed(() => ({
  x: from.pos.x + from.shape.w / 2,
  y: from.pos.y + from.shape.h / 2,
}))

const toCenter = computed(() => ({
  x: to.pos.x + to.shape.w / 2,
  y: to.pos.y + to.shape.h / 2,
}))

function buildSVGPath(from: { x: number; y: number }, to: { x: number; y: number }, via: { x: number; y: number }[]) {
  let path = `M ${from.x} ${from.y}`
  for (const v of via)
    path += ` L ${v.x} ${v.y}`
  path += ` L ${to.x} ${to.y}`
  return path
}
</script>

<template>
  <g class="stroke-amber fill-amber">
    <path stroke-width="2" :d="buildSVGPath(fromCenter, toCenter, via)" fill="none" marker-end="url(#arrowhead)" />
    <DraggablePointSVG v-for="v, i in via" :key="i" v-model:x="v.x" v-model:y="v.y" />
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,7 L9,3.5 z" />
    </marker>
  </g>
</template>
