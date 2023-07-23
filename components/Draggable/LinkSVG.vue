<script  setup lang="ts">
const { id } = defineProps<{
  id: string
}>()
const connect = useConnection(id)
const from = useDatum(connect.from)
const to = useDatum(connect.to)

const fromCenter = computed(() => ({
  x: from.pos.x + from.shape.w / 2,
  y: from.pos.y + from.shape.h / 2,
}))

const toCenter = computed(() => ({
  x: to.pos.x + to.shape.w / 2,
  y: to.pos.y + to.shape.h / 2,
}))
</script>

<template>
  <g class="stroke-amber fill-amber">
    <!-- 箭头线段 -->
    <line
      class="stroke-amber"
      stroke-width="2"
      :x1="fromCenter.x" :y1="fromCenter.y" :x2="toCenter.x" :y2="toCenter.y"
    />

    <!-- 箭头头部 -->
    <marker
      id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5"
      orient="auto" markerUnits="strokeWidth"
    >
      <path d="M0,0 L0,7 L9,3.5 z" />
    </marker>

    <!-- 箭头连接 -->
    <line
      class="stroke-amber"
      stroke-width="2"
      :x1="fromCenter.x" :y1="fromCenter.y" :x2="toCenter.x" :y2="toCenter.y"
      marker-end="url(#arrowhead)"
    />
  </g>
</template>
