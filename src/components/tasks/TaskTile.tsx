import type { TaskBucket, TaskBucketId } from '../../data/types'
import { cx } from '../../lib/cx'
import { ChevronRightIcon, ErrorIcon } from '../icons'

const tones: Record<TaskBucketId, { surface: string; value: string }> = {
  overdue: { surface: 'bg-red-light', value: 'text-red' },
  'pending-manual': {
    surface: 'bg-yellow-light',
    value: 'text-secondary-dark-yellow',
  },
  'pending-auto': { surface: 'bg-gray-6', value: 'text-blue-green' },
  completed: { surface: 'bg-green-light', value: 'text-green' },
}

const ErrorChip = ({ count }: { count: number }) => (
  <span className="text-b3 text-red absolute top-2 right-[10px] flex h-6 items-center gap-0.5 rounded-2xl bg-white pl-2">
    {count} error
    <span className="flex size-6 items-center justify-center">
      <ErrorIcon className="size-4" />
    </span>
  </span>
)

export const TaskTile = ({ bucket }: { bucket: TaskBucket }) => {
  const tone = tones[bucket.id]

  return (
    <div
      className={cx(
        'rounded-tile relative flex flex-1 flex-col justify-between p-4',
        tone.surface,
      )}
    >
      <span className={cx('text-metric', tone.value)}>{bucket.count}</span>
      <div className="flex items-center">
        <span className="text-tile text-gray-hover-1 flex-1">
          {bucket.label}
        </span>
        {bucket.href && (
          <a
            href={bucket.href}
            aria-label={`Open ${bucket.label} tasks`}
            className="text-gray-1 hover:text-gray-hover-1 flex size-4 items-center justify-center"
          >
            <ChevronRightIcon />
          </a>
        )}
      </div>
      {bucket.errorCount !== undefined && (
        <ErrorChip count={bucket.errorCount} />
      )}
    </div>
  )
}
