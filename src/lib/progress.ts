import type { KpiMetric } from '../data/types'

const clamp = (percent: number) => Math.min(100, Math.max(0, percent))

/** Bar width always follows the numbers, guarded against a zero or absent target. */
export const progressPercent = ({ value, target }: KpiMetric): number => {
  if (!Number.isFinite(target) || target <= 0) return 0
  return clamp((value / target) * 100)
}
