import type { Point } from './Point'
import type { Rectangle } from './Rectangle'

export function getConnectPoints(rect: Rectangle): Point[] {
  const { pos: { x, y }, shape: { w, h } } = rect

  return [
    // top edge
    { x: x + w * 0.25, y },
    { x: x + w * 0.5, y },
    { x: x + w * 0.75, y },
    // right edge
    { x: x + w, y: y + h * 0.25 },
    { x: x + w, y: y + h * 0.5 },
    { x: x + w, y: y + h * 0.75 },
    // bottom edge
    { x: x + w * 0.25, y: y + h },
    { x: x + w * 0.5, y: y + h },
    { x: x + w * 0.75, y: y + h },
    // left edge
    { x, y: y + h * 0.25 },
    { x, y: y + h * 0.5 },
    { x, y: y + h * 0.75 },
  ]
}
