<script  setup lang="ts">
import type { Point } from 'utils'

const { data } = defineProps<{
  data: {
    from: string
    via: Point[]
    to: string
  }
}>()
defineEmits(['update:data'])
const from = useDatum(data.from)
const to = useDatum(data.to)
const via = computed(() => data.via.filter(v => !pointInRectangle(v, to) && !pointInRectangle(v, from)))

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

const fromConnectPoint = computed(() => {
  if (via.value.length === 0)
    return findClosestPoint(toCenter.value, getConnectPoints(from))
  const p = computed(() => lineRectangleIntersection(via.value[via.value.length - 1], fromCenter.value, to.shape))
  const fromPoint = findClosestPoint(p.value, getConnectPoints(from))
  if (!fromPoint) {
    const p = computed(() => lineRectangleIntersection(toCenter.value, fromCenter.value, to.shape))
    return findClosestPoint(p.value, getConnectPoints(from))
  }
  return fromPoint
})

const toConnectPoint = computed(() => {
  if (via.value.length === 0)
    return findClosestPoint(fromCenter.value, getConnectPoints(to))
  const p = computed(() => lineRectangleIntersection(via.value[0], toCenter.value, to.shape))
  const toPoint = findClosestPoint(p.value, getConnectPoints(to))
  if (!toPoint) {
    const p = computed(() => lineRectangleIntersection(fromCenter.value, toCenter.value, to.shape))
    return findClosestPoint(p.value, getConnectPoints(to))
  }
  return toPoint
})
</script>

<template>
  <g v-if="fromConnectPoint && toConnectPoint" class="stroke-amber fill-amber">
    <path
      stroke-width="2" :d="buildSVGPath(fromConnectPoint, toConnectPoint, via)" fill="none"
      marker-end="url(#arrowhead)"
    />
    <g v-if="fromConnectPoint">
      <DraggablePointSVG v-model:x="fromConnectPoint.x" v-model:y="fromConnectPoint.y" />
    </g>
    <DraggablePointSVG v-for="v, i in via" :key="i" v-model:x="v.x" v-model:y="v.y" />
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,7 L9,3.5 z" />
    </marker>
  </g>
</template>
