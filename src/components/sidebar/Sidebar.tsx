import type { Workspace } from '../../data/types'
import type { Resource } from '../../hooks/useResource'
import { cx } from '../../lib/cx'
import {
  AnalyticsIcon,
  CollapseIcon,
  CronoLogo,
  DashboardIcon,
  DealsIcon,
  FindNewIcon,
  InboxIcon,
  ListsIcon,
  SequencesIcon,
  TasksIcon,
  TemplatesIcon,
} from '../icons'
import { Skeleton } from '../ui/Skeleton'
import { NavItem, type NavEntry } from './NavItem'
import { ProfileCard, ProfileCardError, ProfileCardSkeleton } from './ProfileCard'
import { TrialBanner } from './TrialBanner'

// Permanent navigation labels: interface copy, not something the API answers with.
const NAV_ENTRIES: NavEntry[] = [
  { id: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { id: 'find-new', label: 'Find New', Icon: FindNewIcon },
  { id: 'lists', label: 'Lists', Icon: ListsIcon },
  { id: 'templates', label: 'Templates', Icon: TemplatesIcon },
  { id: 'sequences', label: 'Sequences', Icon: SequencesIcon },
  { id: 'tasks', label: 'Tasks', Icon: TasksIcon },
  { id: 'inbox', label: 'Inbox', Icon: InboxIcon },
  { id: 'deals', label: 'Deals', Icon: DealsIcon },
  {
    id: 'analytics',
    label: 'Analytics',
    Icon: AnalyticsIcon,
    expandable: true,
  },
]

type SidebarProps = {
  workspace: Resource<Workspace>
  collapsed: boolean
  onToggle: () => void
}

export const Sidebar = ({ workspace, collapsed, onToggle }: SidebarProps) => {
  const data = workspace.status === 'ready' ? workspace.data : null
  const failed = workspace.status === 'error'

  return (
    <aside
      className={cx(
        'border-gray-4 flex h-full flex-col justify-between border-r bg-white transition-[width] duration-200',
        collapsed ? 'w-sidebar-rail' : 'w-sidebar',
      )}
    >
      <div className="flex flex-col gap-2">
        <div
          className={cx(
            'flex items-center py-[22px]',
            collapsed ? 'flex-col gap-3 px-4' : 'justify-between pr-2 pl-4',
          )}
        >
          <a href="#" aria-label="Crono" className="flex h-7 items-center overflow-hidden">
            {collapsed ? (
              <CronoLogo viewBox="0 0 22 29" width={22} height={29} className="h-7 w-[22px]" />
            ) : (
              <CronoLogo className="h-[29px] w-[98px]" />
            )}
          </a>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            className="bg-gray-7 text-gray-1 hover:text-gray-hover-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-xl"
          >
            <CollapseIcon className={cx('size-4 transition-transform', collapsed && 'rotate-180')} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          <nav aria-label="Main" className="w-full">
            <ul className="flex flex-col gap-4">
              {NAV_ENTRIES.map((entry) => (
                <li key={entry.id}>
                  <NavItem
                    entry={entry}
                    active={entry.id === 'dashboard'}
                    collapsed={collapsed}
                    count={entry.id === 'inbox' ? data?.inboxCount : undefined}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Nothing to advertise when the workspace call failed, so the banner stays out. */}
          {!collapsed && !failed && (
            <>
              {data ? (
                <TrialBanner daysLeft={data.trial.daysLeft} />
              ) : (
                <Skeleton className="h-16 w-44 shrink-0 rounded-lg" />
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 pb-3">
        <hr className="border-gray-4 border-t" />
        {data && <ProfileCard name={data.profile.name} role={data.profile.role} collapsed={collapsed} />}
        {workspace.status === 'loading' && <ProfileCardSkeleton collapsed={collapsed} />}
        {workspace.status === 'error' && <ProfileCardError collapsed={collapsed} onRetry={workspace.retry} />}
      </div>
    </aside>
  )
}
