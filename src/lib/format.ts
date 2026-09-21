import type { KpiMetric } from '../data/types'

// UTC keeps "Apr 2, 2025" the same wherever the page is opened.
const signalDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

export const formatSignalDate = (isoDate: string) => signalDate.format(new Date(`${isoDate}T00:00:00Z`))

export const formatKpiValue = ({ value, format }: KpiMetric) =>
  format === 'euro-k' ? `€${value / 1000}K` : String(value)

export const formatKpiTarget = ({ target, format }: KpiMetric) =>
  format === 'euro-k' ? `/${target / 1000}K` : `/${target}`

export const initialsOf = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
