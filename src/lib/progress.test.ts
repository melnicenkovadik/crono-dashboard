import { describe, expect, it } from 'vitest'
import type { KpiMetric } from '../data/types'
import { progressPercent } from './progress'

const metric = (value: number, target: number): KpiMetric => ({
  id: 'meetings',
  label: 'Meetings',
  value,
  target,
  format: 'count',
})

describe('progressPercent', () => {
  it('is the ratio of value to target', () => {
    expect(progressPercent(metric(20, 30))).toBeCloseTo(66.67, 1)
    expect(progressPercent(metric(1000, 2000))).toBe(50)
    expect(progressPercent(metric(0, 500))).toBe(0)
  })

  it('never leaves the 0-100 range', () => {
    expect(progressPercent(metric(900, 500))).toBe(100)
    expect(progressPercent(metric(-20, 500))).toBe(0)
  })

  it('returns 0 instead of dividing by a missing target', () => {
    expect(progressPercent(metric(10, 0))).toBe(0)
    expect(progressPercent(metric(10, Number.NaN))).toBe(0)
  })
})
