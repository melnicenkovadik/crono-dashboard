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
      <Icon className="size-6 shrink-0" />
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
      {collapsed && count !== undefined && (
        <Badge className="absolute top-0 right-2 h-4 px-1 text-[10px]">{count}</Badge>
      )}
    </a>
  )
}
