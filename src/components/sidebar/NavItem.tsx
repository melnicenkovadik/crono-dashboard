import type { ComponentType, SVGProps } from 'react'
import { cx } from '../../lib/cx'
import { Badge } from '../ui/Badge'
import { ChevronDownIcon } from '../icons'

export type NavEntry = {
  id: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  expandable?: boolean
}

type NavItemProps = {
  entry: NavEntry
  active: boolean
  collapsed: boolean
  count?: number
}

export const NavItem = ({ entry, active, collapsed, count }: NavItemProps) => {
  const { label, Icon, expandable } = entry

  return (
    <a
      href="#"
      aria-current={active ? 'page' : undefined}
      title={collapsed ? label : undefined}
      className={cx(
        'relative flex items-center gap-2 py-1',
        collapsed ? 'justify-center px-4' : 'pr-[13px] pl-4',
        active ? 'text-crono-dark' : 'text-gray-1 hover:text-gray-hover-1',
      )}
    >
      <span
        aria-hidden="true"
        className={cx(
          'bg-crono-dark absolute top-0 bottom-0 left-0 w-[3px] rounded-r-[3px]',
          active ? 'opacity-100' : 'opacity-0',
        )}
      />
      <span className="relative flex shrink-0">
        <Icon className="size-6" />
        {/* Collapsed there is no room for the number, so it becomes a dot. */}
        {collapsed && count !== undefined && (
          <span
            aria-label={`${count} unread`}
            className="bg-secondary-yellow absolute -top-0.5 -right-0.5 size-2 rounded-full outline-2 outline-white"
          />
        )}
      </span>
      {!collapsed && (
        <>
          <span className="text-s3 flex-1 truncate">{label}</span>
          {count !== undefined && <Badge>{count}</Badge>}
          {expandable && (
            <span className="flex size-6 items-center justify-center">
              <ChevronDownIcon />
            </span>
          )}
        </>
      )}
    </a>
  )
}
