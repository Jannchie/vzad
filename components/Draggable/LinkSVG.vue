<script  setup lang="ts">
const { id } = defineProps<{
  id: string
}>()
const connect = useConnection(id)
const from = useDatum(connect.from)
const to = useDatum(connect.to)
const via = connect.via

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
    <path
      stroke-width="2"
      :d="`
      M ${fromCenter.x} ${fromCenter.y}
      L 0 0
      L ${toCenter.x} ${toCenter.y}
    `"
      fill="none"
      marker-end="url(#arrowhead)"
    />
    <circle v-for="v, i in via" :key="i" :x="v[0]" :y="v[1]" r="4" />
    <marker
      id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5"
      orient="auto" markerUnits="strokeWidth"
    >
      <path d="M0,0 L0,7 L9,3.5 z" />
    </marker>
  </g>
</template>
