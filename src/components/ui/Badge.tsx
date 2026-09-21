import { cx } from '../../lib/cx'

type BadgeProps = {
  children: number | string
  /** `nav` is the sidebar counter, `section` the taller one next to a card title. */
  size?: 'nav' | 'section'
  className?: string
}

export const Badge = ({ children, size = 'nav', className }: BadgeProps) => (
  <span
    className={cx(
      'bg-secondary-yellow inline-flex items-center justify-center rounded-xl text-center text-white',
      size === 'nav' ? 'text-b3 h-5 px-2 py-1' : 'text-h6 h-6 min-w-2 px-2 py-[3px]',
      className,
    )}
  >
    {children}
  </span>
)
