<script setup lang="ts">
const props = defineProps<{
  x: number
  y: number
}>()
const emit = defineEmits(['update:x', 'update:y'])

const x = computed({
  get() {
    return props.x
  },
  set(value) {
    emit('update:x', value)
  },
})
const y = computed({
  get() {
    return props.y
  },
  set(value) {
    emit('update:y', value)
  },
})
const el = ref<SVGCircleElement | null>(null)
const transformSource = inject<MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>>('transformSource')
const positionSource = inject<MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>>('positionSource')
useDraggable(el, {
  initialValue: props,
  stopPropagation: true,
  preventDefault: true,
  transformSource,
  positionSource,
  onMove({ x: newX, y: newY }) {
    const xNiced = Math.round(newX / 32) * 32
    const yNiced = Math.round(newY / 32) * 32
    x.value = xNiced
    y.value = yNiced
  },
})
</script>

<template>
  <circle ref="el" class="cursor-pointer" :cx="x" :cy="y" r="4" />
</template>
