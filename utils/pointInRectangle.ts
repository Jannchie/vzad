import type { Point } from './Point'
import type { Rectangle } from './Rectangle'

export function pointInRectangle(point: Point, rect: Rectangle): boolean {
  const { pos: { x, y }, shape: { w, h } } = rect

  return point.x >= x && point.x <= x + w && point.y >= y && point.y <= y + h
}
