import { Fragment } from 'react'
import { cx } from '../../lib/cx'
import type { TaskBucket } from '../../data/types'
import type { Resource } from '../../hooks/useResource'
import { BlockError } from '../ui/BlockError'
import { Card } from '../ui/Card'
import { Skeleton } from '../ui/Skeleton'
import { TaskTile } from './TaskTile'

/** The mockup separates buckets 1|2 and 3|4 but leaves 2|3 open — reproduced as drawn. */
const DIVIDER_AFTER = new Set(['overdue', 'pending-auto'])

const Divider = () => <span aria-hidden="true" className="bg-gray-4 w-px self-stretch" />

const TaskRow = ({ buckets }: { buckets: TaskBucket[] }) => (
  <div className="flex h-[86px] items-stretch gap-2">
    {buckets.map((bucket) => (
      <Fragment key={bucket.id}>
        <TaskTile bucket={bucket} />
        {DIVIDER_AFTER.has(bucket.id) && <Divider />}
      </Fragment>
    ))}
  </div>
)

type TodaysTasksCardProps = {
  resource: Resource<TaskBucket[]>
  className?: string
}

export const TodaysTasksCard = ({ resource, className }: TodaysTasksCardProps) => (
  <Card className={cx('flex flex-col gap-2 p-4', className)}>
    <h2 className="text-h5 text-dark">Today’s tasks</h2>

    {resource.status === 'loading' && (
      <div className="flex h-[86px] gap-2">
        {[0, 1, 2, 3].map((index) => (
          <Skeleton key={index} className="rounded-tile h-full flex-1" />
        ))}
      </div>
    )}
    {resource.status === 'error' && (
      <BlockError message={resource.message} onRetry={resource.retry} className="h-[86px]" />
    )}
    {resource.status === 'ready' && <TaskRow buckets={resource.data} />}
  </Card>
)
