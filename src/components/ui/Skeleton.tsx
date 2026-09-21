import { cx } from '../../lib/cx'

export const Skeleton = ({ className }: { className?: string }) => (
  <span className={cx('bg-gray-4 block animate-pulse rounded', className)} />
)
