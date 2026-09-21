import type { KpiMetric } from './types'

/**
 * Targets and labels are the mockup's. The two "engaged" counters carry real
 * numbers instead of its 0/500: the mockup draws every filled bar at the same
 * width whatever the numbers say, and a half-filled bar next to a 0 reads as a
 * bug. Bar width is always value / target — see README.
 */
export const kpiMetrics: KpiMetric[] = [
  {
    id: 'contacts',
    label: 'Contacts engaged',
    value: 342,
    target: 500,
    format: 'count',
    tooltip: 'Contacts who have at least one logged activity within the current month',
  },
  {
    id: 'companies',
    label: 'Companies engaged',
    value: 264,
    target: 500,
    format: 'count',
  },
  {
    id: 'activities',
    label: 'Activities',
    value: 1000,
    target: 2000,
    format: 'count',
  },
  { id: 'meetings', label: 'Meetings', value: 20, target: 30, format: 'count' },
  { id: 'deals', label: 'Deals', value: 100, target: 200, format: 'count' },
  {
    id: 'pipeline',
    label: 'Pipeline',
    value: 50_000,
    target: 100_000,
    format: 'euro-k',
  },
]
