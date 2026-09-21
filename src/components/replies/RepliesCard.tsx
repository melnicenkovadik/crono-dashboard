import type { Replies } from '../../data/types'
import { cx } from '../../lib/cx'
import type { Resource } from '../../hooks/useResource'
import { ChevronRightIcon, MailboxIcon } from '../icons'
import { BlockError } from '../ui/BlockError'
import { Card } from '../ui/Card'
import { Skeleton } from '../ui/Skeleton'

const RepliesTile = ({ data }: { data: Replies }) => (
  <div className="bg-crono-light flex h-20 items-center gap-4 rounded-xl py-4 pr-6 pl-4">
    <span className="bg-crono-hover text-crono-dark flex size-12 shrink-0 items-center justify-center rounded-3xl">
      <MailboxIcon className="size-6" />
    </span>
    <span className="text-display text-gray-hover-1 w-[140px]">{data.count}</span>
    <ul className="flex">
      {data.avatars.map((avatar, index) => (
        <li key={avatar.id} className={index === 0 ? '' : '-ml-2'}>
          <img src={avatar.src} alt={avatar.alt} width={32} height={32} className="size-8 rounded-full" />
        </li>
      ))}
    </ul>
  </div>
)

type RepliesCardProps = { resource: Resource<Replies>; className?: string }

export const RepliesCard = ({ resource, className }: RepliesCardProps) => (
  <Card className={cx('flex flex-col gap-2 p-4', className)}>
    <div className="flex items-center justify-between">
      <h2 className="text-h5 text-dark">Replies</h2>
      <a href="#" className="text-s3 text-crono-dark hover:text-crono flex items-center gap-[5px]">
        Open inbox
        <span className="flex size-4 items-center justify-center">
          <ChevronRightIcon />
        </span>
      </a>
    </div>

    {resource.status === 'loading' && <Skeleton className="h-20 rounded-xl" />}
    {resource.status === 'error' && (
      <BlockError message={resource.message} onRetry={resource.retry} className="h-20" />
    )}
    {resource.status === 'ready' && <RepliesTile data={resource.data} />}
  </Card>
)
