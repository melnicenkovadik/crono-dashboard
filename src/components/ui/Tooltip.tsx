import { useId, type ReactNode } from 'react'

type TooltipProps = {
  text: string
  children: ReactNode
}

const Arrow = () => (
  <svg width="10" height="4" viewBox="0 0 10 4" fill="none" aria-hidden="true" focusable="false">
    <path
      d="M4.24742 0.860086C4.64584 0.404759 5.35417 0.40476 5.75258 0.860087L8.5 4L1.5 4L4.24742 0.860086Z"
      fill="currentColor"
    />
  </svg>
)

/** Hover/focus hint, styled after tooltip.html in the export. */
export const Tooltip = ({ text, children }: TooltipProps) => {
  const id = useId()

  return (
    <span className="relative inline-flex">
      <span className="peer inline-flex rounded-full" tabIndex={0} aria-describedby={id}>
        {children}
      </span>
      <span
        role="tooltip"
        id={id}
        className="text-tooltip pointer-events-none absolute top-full left-1/2 z-20 hidden w-[246px] -translate-x-1/2 flex-col items-center peer-hover:flex peer-focus-visible:flex"
      >
        <Arrow />
        <span className="text-b3 bg-tooltip w-full rounded-[4px] px-4 py-2 text-center text-white">
          {text}
        </span>
      </span>
    </span>
  )
}
