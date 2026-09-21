import type { ComponentProps } from 'react'
import { cx } from '../../lib/cx'

/**
 * The 1px edge is an inset ring, not a border: Figma draws card strokes inside
 * the frame, so a real border would push every inner offset 1px off the mockup.
 */
export const Card = ({ className, ...props }: ComponentProps<'section'>) => (
  <section
    className={cx(
      'inset-ring-gray-4 rounded-card bg-white inset-ring',
      className,
    )}
    {...props}
  />
)
