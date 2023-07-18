import { computed, ref } from 'vue-demi'
import type { MaybeRefOrGetter } from '@vueuse/shared'
import { isClient, toRefs, toValue } from '@vueuse/shared'
import { defaultWindow, useEventListener } from '@vueuse/core'
import type { PointerType, Position } from '@vueuse/core'

export interface UseDraggableOptions {
  /**
   * Only start the dragging when click on the element directly
   *
   * @default false
   */
  exact?: MaybeRefOrGetter<boolean>

  /**
   * Prevent events defaults
   *
   * @default false
   */
  preventDefault?: MaybeRefOrGetter<boolean>

  /**
   * Prevent events propagation
   *
   * @default false
   */
  stopPropagation?: MaybeRefOrGetter<boolean>

  /**
   * Whether dispatch events in capturing phase
   *
   * @default true
   */
  capture?: boolean

  /**
   * Element to attach `pointermove` and `pointerup` events to.
   *
   * @default window
   */
  draggingElement?: MaybeRefOrGetter<HTMLElement | SVGElement | Window | Document | null | undefined>

  /**
   * Handle that triggers the drag event
   *
   * @default target
   */
  handle?: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>

  /**
   * Pointer types that listen to.
   *
   * @default ['mouse', 'touch', 'pen']
   */
  pointerTypes?: PointerType[]

  /**
   * Initial position of the element.
   *
   * @default { x: 0, y: 0 }
   */
  initialValue?: MaybeRefOrGetter<Position>

  /**
   * Callback when the dragging starts. Return `false` to prevent dragging.
   */
  onStart?: (position: Position, event: PointerEvent) => void | false

  /**
   * Callback during dragging.
   */
  onMove?: (position: Position, event: PointerEvent) => void

  /**
   * Callback when dragging end.
   */
  onEnd?: (position: Position, event: PointerEvent) => void

  /**
   * Axis to drag on.
   *
   * @default 'both'
   */
  axis?: 'x' | 'y' | 'both'
}

/**
 * Make elements draggable.
 *
 * @see https://vueuse.org/useDraggable
 * @param target
 * @param options
 */
export function useDraggable2(
  target: MaybeRefOrGetter<HTMLElement | SVGElement | null | undefined>,
  options: UseDraggableOptions = {},
) {
  const {
    pointerTypes,
    preventDefault,
    stopPropagation,
    exact,
    onMove,
    onEnd,
    onStart,
    initialValue,
    axis = 'both',
    draggingElement = defaultWindow,
    handle: draggingHandle = target,
  } = options

  const position = ref<Position>(
    toValue(initialValue) ?? { x: 0, y: 0 },
  )

  const pressedDelta = ref<Position>()

  const filterEvent = (e: PointerEvent) => {
    if (pointerTypes)
      return pointerTypes.includes(e.pointerType as PointerType)
    return true
  }

  const handleEvent = (e: PointerEvent) => {
    if (toValue(preventDefault))
      e.preventDefault()
    if (toValue(stopPropagation))
      e.stopPropagation()
  }

  const start = (e: PointerEvent) => {
    if (!filterEvent(e))
      return
    if (toValue(exact) && e.target !== toValue(target))
      return
    const itemRect = toValue(target)!.getBoundingClientRect()
    const itemRectX = itemRect.x
    const itemRectY = itemRect.y
    const parentTransform = toValue(target)!.parentElement!.style.transform
    const parentTransformScale = Number(parentTransform?.match(/scale\((.*?)\)/)?.[1] ?? 1)
    // 计算出鼠标在元素上的位置（相对于元素的左上角）
    const pos = {
      x: (e.clientX - itemRectX) / parentTransformScale,
      y: (e.clientY - itemRectY) / parentTransformScale,
    }
    if (onStart?.(pos, e) === false)
      return
    pressedDelta.value = pos
    handleEvent(e)
  }
  const move = (e: PointerEvent) => {
    if (!filterEvent(e))
      return
    if (!pressedDelta.value)
      return

    // get parent x and y
    const parentRect = toValue(target)!.parentElement!.getBoundingClientRect()

    // get parent transform scale, x and y
    const parentTransform = toValue(target)!.parentElement!.style.transform
    const parentTransformScale = Number(parentTransform?.match(/scale\((.*?)\)/)?.[1] ?? 1)

    const parentX = parentRect.left
    const parentY = parentRect.top

    let { x, y } = position.value
    if (axis === 'x' || axis === 'both')
      x = (e.clientX - parentX) / parentTransformScale - pressedDelta.value.x
    if (axis === 'y' || axis === 'both')
      y = (e.clientY - parentY) / parentTransformScale - pressedDelta.value.y
    position.value = {
      x,
      y,
    }
    onMove?.(position.value, e)
    handleEvent(e)
  }
  const end = (e: PointerEvent) => {
    if (!filterEvent(e))
      return
    if (!pressedDelta.value)
      return
    pressedDelta.value = undefined
    onEnd?.(position.value, e)
    handleEvent(e)
  }

  if (isClient) {
    const config = { capture: options.capture ?? true }
    useEventListener(draggingHandle, 'pointerdown', start, config)
    useEventListener(draggingElement, 'pointermove', move, config)
    useEventListener(draggingElement, 'pointerup', end, config)
  }

  return {
    ...toRefs(position),
    position,
    isDragging: computed(() => !!pressedDelta.value),
    style: computed(
      () => `left:${position.value.x}px;top:${position.value.y}px;`,
    ),
  }
}

export type UseDraggableReturn = ReturnType<typeof useDraggable2>
