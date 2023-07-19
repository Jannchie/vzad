import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export function useZoomable(
  el: globalThis.Ref<HTMLElement | null>,
  options = {
    initialValue: 1,
    min: 0.5,
    max: 3,
    step: 0.1,
  },
) {
  const { initialValue = 1, min = 0.5, max = 3, step = 0.1 } = options
  const scale = ref(initialValue)
  const pos = ref({ x: 0, y: 0 })
  let isDragging = false
  let isCtrlDown = false

  const style = computed(() => ({
    transform: `translate(${pos.value.x}px, ${pos.value.y}px) scale(${scale.value})`,
  }))

  const onWheel = (event: WheelEvent) => {
    event.preventDefault()
    if (isCtrlDown) {
      // Zoom
      const rect = el.value?.getBoundingClientRect()
      if (rect) {
        const mouseX = event.clientX - rect.left
        const mouseY = event.clientY - rect.top
        const oldScale = scale.value
        if (event.deltaY < 0 && scale.value + step <= max)
          scale.value += step

        else if (event.deltaY > 0 && scale.value - step >= min)
          scale.value -= step

        const newScale = scale.value
        pos.value.x = mouseX - (mouseX - pos.value.x) * newScale / oldScale
        pos.value.y = mouseY - (mouseY - pos.value.y) * newScale / oldScale
      }
    }
    else {
      // Scroll
      if (!isDragging) {
        pos.value.y -= event.deltaY
        pos.value.x -= event.deltaX
      }
    }
  }

  const initPos = ref({ x: 0, y: 0 })
  const onMouseDown = (event: MouseEvent) => {
    initPos.value = { x: event.clientX, y: event.clientY }
    event.preventDefault()
    isDragging = true
  }

  const onMouseMove = (event: MouseEvent) => {
    event.preventDefault()
    if (isDragging) {
      pos.value.x += event.clientX - initPos.value.x
      pos.value.y += event.clientY - initPos.value.y
      initPos.value = { x: event.clientX, y: event.clientY }
    }
  }

  const onMouseUp = (event: MouseEvent) => {
    event.preventDefault()
    isDragging = false
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Control')
      isCtrlDown = true
  }

  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Control')
      isCtrlDown = false
  }

  const onMouseLeave = (event: MouseEvent) => {
    event.preventDefault()
    isDragging = false
  }

  onMounted(() => {
    const elem = el.value
    if (elem) {
      elem.addEventListener('wheel', onWheel, { passive: false })
      elem.addEventListener('pointerdown', onMouseDown)
      elem.addEventListener('pointermove', onMouseMove)
      elem.addEventListener('pointerup', onMouseUp)
      elem.addEventListener('pointerleave', onMouseLeave)
      window.addEventListener('keydown', onKeyDown)
      window.addEventListener('keyup', onKeyUp)
    }
  })

  onBeforeUnmount(() => {
    const elem = el.value
    if (elem) {
      elem.removeEventListener('wheel', onWheel)
      elem.removeEventListener('pointerdown', onMouseDown)
      elem.removeEventListener('pointermove', onMouseMove)
      elem.removeEventListener('pointerup', onMouseUp)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  })

  return {
    scale,
    style,
    pos,
  }
}
