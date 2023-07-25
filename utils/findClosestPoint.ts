import type { Point } from './Point'

export function findClosestPoint(target: Point | null, points: Point[]): Point | null {
  if (!target)
    return null
  return points.reduce((closestPoint, currentPoint) => {
    const distanceToCurrentPoint = Math.hypot(currentPoint.x - target.x, currentPoint.y - target.y)
    const distanceToClosestPoint = Math.hypot(closestPoint.x - target.x, closestPoint.y - target.y)

    return distanceToCurrentPoint < distanceToClosestPoint ? currentPoint : closestPoint
  }, points[0])
}
