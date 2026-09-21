import { cx } from '../../lib/cx'
import { initialsOf } from '../../lib/format'

type AvatarProps = {
  src: string | null
  name: string
  className?: string
}

/**
 * Cropped avatars already carry the mockup's 1px ring, so only the initials
 * fallback draws a border of its own.
 */
export const Avatar = ({ src, name, className }: AvatarProps) =>
  src ? (
    <img
      src={src}
      alt={name}
      width={32}
      height={32}
      className={cx('size-8 rounded-full object-cover', className)}
    />
  ) : (
    <span
      aria-hidden="true"
      className={cx(
        'border-gray-hover-5 text-gray-hover-1 text-b5 bg-gray-7 flex size-8 items-center justify-center rounded-full border',
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  )
