import type { Point } from './Point'
import type { Shape } from './Shape'

function lineLineIntersection(p1: Point, p2: Point, p3: Point, p4: Point): Point | null {
  // Check if none of the lines are of length 0
  if ((p1.x === p2.x && p1.y === p2.y) || (p3.x === p4.x && p3.y === p4.y))
    return null

  const denominator = ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y))

  // Lines are parallel
  if (denominator === 0)
    return null

  const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator
  const ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator

  // Check if there is an intersection
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1)
    return null

  return {
    x: p1.x + ua * (p2.x - p1.x),
    y: p1.y + ua * (p2.y - p1.y),
  }
}

export function lineRectangleIntersection(outside: Point, center: Point, rect: Shape): Point | null {
  const { x: xCenter, y: yCenter } = center
  const { w, h } = rect

  const rectangleEdges: [Point, Point][] = [
    [{ x: xCenter - w / 2, y: yCenter - h / 2 }, { x: xCenter + w / 2, y: yCenter - h / 2 }],
    [{ x: xCenter + w / 2, y: yCenter - h / 2 }, { x: xCenter + w / 2, y: yCenter + h / 2 }],
    [{ x: xCenter + w / 2, y: yCenter + h / 2 }, { x: xCenter - w / 2, y: yCenter + h / 2 }],
    [{ x: xCenter - w / 2, y: yCenter + h / 2 }, { x: xCenter - w / 2, y: yCenter - h / 2 }],
  ]

  for (const edge of rectangleEdges) {
    const intersection = lineLineIntersection(outside, center, edge[0], edge[1])
    if (intersection)
      return intersection
  }

  return null
}
