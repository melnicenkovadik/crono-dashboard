import type { ComponentProps } from 'react'
import { cx } from '../../lib/cx'

type ButtonVariant = 'action' | 'upgrade' | 'secondary'

const variants: Record<ButtonVariant, string> = {
  action: 'bg-crono rounded-pill text-s3 hover:bg-crono-dark w-[90px] px-4 py-[7px] text-white',
  upgrade: 'bg-secondary-yellow text-b3 hover:bg-yellow gap-1 rounded-[4px] px-2 py-1 text-white',
  secondary: 'border-gray-4 text-b3 text-gray-hover-1 hover:bg-gray-7 rounded-lg border px-3 py-1.5',
}

type ButtonProps = ComponentProps<'button'> & { variant: ButtonVariant }

export const Button = ({ variant, className, type = 'button', ...props }: ButtonProps) => (
  <button
    type={type}
    className={cx(
      'inline-flex cursor-pointer items-center justify-center transition-colors',
      variants[variant],
      className,
    )}
    {...props}
  />
)
