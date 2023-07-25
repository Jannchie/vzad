<script setup lang="ts">
const { index, id } = defineProps<{
  index: number
  id: string
}>()
const el = ref<SVGCircleElement | null>(null)
const connect = useConnection(id)
const data = computed(() => connect.via[index])
const transformSource = inject<MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>>('transformSource')
const positionSource = inject<MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>>('positionSource')
useDraggable(el, {
  initialValue: data,
  stopPropagation: true,
  preventDefault: true,
  transformSource,
  positionSource,
  onMove({ x: newX, y: newY }) {
    const xNiced = Math.round(newX / 32) * 32
    const yNiced = Math.round(newY / 32) * 32
    connect.via[index].x = xNiced
    connect.via[index].y = yNiced
  },
})
</script>

<template>
  <circle ref="el" class="cursor-pointer" :cx="data.x" :cy="data.y" r="4" />
</template>
