import { cx } from '../../lib/cx'
import { Skeleton } from '../ui/Skeleton'
import { ProfileGlyphIcon } from '../icons'

type ProfileCardProps = {
  name: string
  role: string
  collapsed: boolean
}

const Portrait = () => (
  <span className="bg-gray-hover-5 flex size-8 shrink-0 items-center justify-center rounded-full text-white">
    <ProfileGlyphIcon className="size-[21px]" />
  </span>
)

export const ProfileCard = ({ name, role, collapsed }: ProfileCardProps) => (
  <div
    className={cx(
      'flex items-center gap-2 rounded-[29px] py-1',
      collapsed ? 'justify-center px-3' : 'px-3',
    )}
  >
    <Portrait />
    {!collapsed && (
      <div className="min-w-0 flex-1">
        <p className="text-b2 text-dark truncate">{name}</p>
        <p className="text-b2 text-gray-1 -mt-1">{role}</p>
      </div>
    )}
  </div>
)

export const ProfileCardSkeleton = ({ collapsed }: { collapsed: boolean }) => (
  <div className="flex items-center gap-2 px-3 py-1">
    <Skeleton className="size-8 shrink-0 rounded-full" />
    {!collapsed && (
      <div className="flex-1 space-y-1">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-12" />
      </div>
    )}
  </div>
)
