import type { KpiMetric } from '../../data/types'
import type { Resource } from '../../hooks/useResource'
import { EditIcon } from '../icons'
import { BlockError } from '../ui/BlockError'
import { Card } from '../ui/Card'
import { Skeleton } from '../ui/Skeleton'
import { KpiCard } from './KpiCard'

/** Row heights and the 7px/8px gaps between them are taken straight from the mockup. */
const ROW_CLASSES = ['h-[71px]', 'mt-[7px] h-[72px]', 'mt-2 h-[72px]']

const inRows = <T,>(items: T[]): T[][] => [items.slice(0, 2), items.slice(2, 4), items.slice(4, 6)]

type PerformanceCardProps = {
  resource: Resource<KpiMetric[]>
  periodLabel: string | null
  className?: string
}

export const PerformanceCard = ({ resource, periodLabel, className }: PerformanceCardProps) => (
  <Card className={className}>
    <div className="flex items-start justify-between px-4 pt-[17px]">
      <h2 className="text-h5 text-dark">{periodLabel ? `${periodLabel}’s performance` : 'Performance'}</h2>
      <button
        type="button"
        className="text-s3 text-crono-dark hover:text-crono -mt-px flex cursor-pointer items-center gap-[5px]"
      >
        Edit KPIs
        <EditIcon className="size-4" />
      </button>
    </div>

    {resource.status === 'error' ? (
      <BlockError message={resource.message} onRetry={resource.retry} className="mt-[10px] px-4 pb-[14px]" />
    ) : (
      <div className="mt-[10px] flex flex-col px-4 pb-[14px]">
        {inRows(resource.status === 'ready' ? resource.data : [null, null, null, null, null, null]).map(
          (row, rowIndex) => (
            <div key={ROW_CLASSES[rowIndex]} className={`grid grid-cols-2 gap-x-2 ${ROW_CLASSES[rowIndex]}`}>
              {row.map((metric, index) =>
                metric ? (
                  <KpiCard key={metric.id} metric={metric} />
                ) : (
                  <Skeleton key={index} className="h-full rounded-lg" />
                ),
              )}
            </div>
          ),
        )}
      </div>
    )}
  </Card>
)
