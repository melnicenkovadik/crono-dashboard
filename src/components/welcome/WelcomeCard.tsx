import type { Workspace } from '../../data/types'
import { cx } from '../../lib/cx'
import type { Resource } from '../../hooks/useResource'
import { BlockError } from '../ui/BlockError'
import { Card } from '../ui/Card'
import { Skeleton } from '../ui/Skeleton'

type WelcomeCardProps = { resource: Resource<Workspace>; className?: string }

export const WelcomeCard = ({ resource, className }: WelcomeCardProps) => (
  <Card
    className={cx('flex flex-col justify-center gap-2 px-6 py-8', className)}
  >
    {resource.status === 'loading' && (
      <>
        <Skeleton className="h-[30px] w-52" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/5" />
      </>
    )}

    {resource.status === 'error' && (
      <BlockError message={resource.message} onRetry={resource.retry} />
    )}

    {resource.status === 'ready' && (
      <>
        <h1 className="text-h1 text-dark">
          Welcome {resource.data.greetingName},
        </h1>
        <p className="text-lead text-gray-1">
          Here’s your performance overview where you can track your daily and
          monthly KPIs
        </p>
      </>
    )}
  </Card>
)
