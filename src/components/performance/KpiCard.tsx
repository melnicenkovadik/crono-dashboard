import type { ComponentType, SVGProps } from 'react'
import type { KpiId, KpiMetric } from '../../data/types'
import { cx } from '../../lib/cx'
import { formatKpiTarget, formatKpiValue } from '../../lib/format'
import { progressPercent } from '../../lib/progress'
import { ActivitiesIcon, CompaniesIcon, ContactsIcon, DealsKpiIcon, InfoIcon, MeetingsIcon } from '../icons'
import { ProgressBar } from '../ui/ProgressBar'
import { Tooltip } from '../ui/Tooltip'

type KpiStyle = {
  Icon?: ComponentType<SVGProps<SVGSVGElement>>
  /** Two icons are drawn a shade lighter than their number — kept as in the export. */
  icon: string
  value: string
  /**
   * Figma sized each number box by hand, so four of the six numbers sit
   * right-aligned in a box wider than the digits. Kept as a minimum width so a
   * longer number grows instead of overlapping its target.
   */
  valueBox?: string
  track: string
  fill: string
}

const styles: Record<KpiId, KpiStyle> = {
  contacts: {
    Icon: ContactsIcon,
    icon: 'text-blue-green',
    value: 'text-blue-green',
    track: 'bg-blue-green-light',
    fill: 'bg-blue-green',
  },
  companies: {
    Icon: CompaniesIcon,
    icon: 'text-blue',
    value: 'text-blue',
    valueBox: 'min-w-[14px] text-right',
    track: 'bg-blue-green-light',
    fill: 'bg-blue',
  },
  activities: {
    Icon: ActivitiesIcon,
    icon: 'text-icon-purple',
    value: 'text-purple',
    valueBox: 'min-w-10 text-right',
    track: 'bg-purple-light',
    fill: 'bg-purple',
  },
  meetings: {
    Icon: MeetingsIcon,
    icon: 'text-yellow',
    value: 'text-yellow',
    valueBox: 'min-w-6 text-right',
    track: 'bg-yellow-light',
    fill: 'bg-yellow',
  },
  deals: {
    Icon: DealsKpiIcon,
    icon: 'text-icon-pink',
    value: 'text-pink',
    valueBox: 'min-w-[30px] text-right',
    track: 'bg-pink-light',
    fill: 'bg-pink',
  },
  pipeline: {
    icon: '',
    value: 'text-green',
    track: 'bg-crono-light',
    fill: 'bg-green',
  },
}

export const KpiCard = ({ metric }: { metric: KpiMetric }) => {
  const style = styles[metric.id]
  const { Icon } = style

  return (
    // Label sits at the top, bar at the bottom; the row that is 1px taller in the
    // mockup puts that pixel between the label and the number, so mt-auto does it.
    <div className="inset-ring-gray-4 flex h-full flex-col rounded-lg p-2 inset-ring">
      <div className="flex h-4 items-center justify-between">
        <span className="text-b3 text-gray-hover-1 truncate">{metric.label}</span>
        {metric.tooltip && (
          <Tooltip text={metric.tooltip}>
            <InfoIcon className="text-gray-1 size-4" />
          </Tooltip>
        )}
      </div>

      <p className="mt-auto flex items-center gap-px">
        {Icon && <Icon className={cx('size-4 shrink-0', style.icon)} />}
        <span className={cx('text-kpi', style.value, style.valueBox)}>{formatKpiValue(metric)}</span>
        <span className="text-kpi text-gray-2">{formatKpiTarget(metric)}</span>
      </p>

      <ProgressBar
        percent={progressPercent(metric)}
        label={metric.label}
        trackClassName={cx('mx-px mt-1', style.track)}
        fillClassName={style.fill}
      />
    </div>
  )
}
