import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { cx } from '../../lib/cx'
import { Button } from '../ui/Button'

type ActionMenuProps = {
  signalLabel: string
  completed: boolean
  onComplete: () => void
  /** Returns focus itself, because the row it belonged to is gone. */
  onDelete: () => void
  triggerRef: (element: HTMLButtonElement | null) => void
}

const Arrow = ({ flipped }: { flipped: boolean }) => (
  <svg
    width="10"
    height="4"
    viewBox="0 0 10 4"
    fill="none"
    aria-hidden="true"
    focusable="false"
    className={cx('text-tooltip', flipped && 'rotate-180')}
  >
    <path
      d="M4.24742 0.860086C4.64584 0.404759 5.35417 0.40476 5.75258 0.860087L8.5 4L1.5 4L4.24742 0.860086Z"
      fill="currentColor"
    />
  </svg>
)

const GAP_FROM_TRIGGER = 4
const EDGE_MARGIN = 8

export const ActionMenu = ({ signalLabel, completed, onComplete, onDelete, triggerRef }: ActionMenuProps) => {
  const menuId = useId()
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const itemsRef = useRef<HTMLButtonElement[]>([])
  const skipRefocus = useRef(false)
  const [openUp, setOpenUp] = useState(false)
  const [open, setOpen] = useState(false)

  const close = useCallback(() => menuRef.current?.hidePopover(), [])

  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return

    const place = () => {
      const trigger = buttonRef.current
      if (!trigger) return
      const anchor = trigger.getBoundingClientRect()
      const { height, width } = menu.getBoundingClientRect()
      const flip = anchor.bottom + height + GAP_FROM_TRIGGER > window.innerHeight
      setOpenUp(flip)
      const centred = anchor.left + anchor.width / 2 - width / 2
      // Keep both edges inside the viewport, left edge winning if it is too narrow for both.
      menu.style.left = `${Math.max(EDGE_MARGIN, Math.min(centred, window.innerWidth - width - EDGE_MARGIN))}px`
      menu.style.top = flip
        ? `${anchor.top - height - GAP_FROM_TRIGGER}px`
        : `${anchor.bottom + GAP_FROM_TRIGGER}px`
    }

    const handleToggle = (event: Event) => {
      const isOpen = (event as ToggleEvent).newState === 'open'
      // Chrome does not expose the invoker's expanded state for popovertarget yet.
      setOpen(isOpen)
      if (isOpen) {
        place()
        itemsRef.current.find((item) => !item.disabled)?.focus()
        // The menu is anchored once, so anything that moves the row closes it.
        window.addEventListener('scroll', close, true)
        window.addEventListener('resize', close)
        return
      }
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
      if (skipRefocus.current) skipRefocus.current = false
      else buttonRef.current?.focus()
    }

    menu.addEventListener('toggle', handleToggle)
    return () => {
      menu.removeEventListener('toggle', handleToggle)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [close])

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = itemsRef.current.filter((item) => item && !item.disabled)
    if (items.length === 0) return
    const current = items.indexOf(document.activeElement as HTMLButtonElement)

    const focusAt = (index: number) => {
      event.preventDefault()
      items[(index + items.length) % items.length]?.focus()
    }

    if (event.key === 'ArrowDown') focusAt(current + 1)
    else if (event.key === 'ArrowUp') focusAt(current - 1)
    else if (event.key === 'Home') focusAt(0)
    else if (event.key === 'End') focusAt(items.length - 1)
  }

  const runAndClose = (action: () => void, keepFocus: boolean) => {
    skipRefocus.current = !keepFocus
    close()
    action()
  }

  const registerItem = (index: number) => (element: HTMLButtonElement | null) => {
    if (element) itemsRef.current[index] = element
  }

  return (
    <>
      <Button
        variant="action"
        ref={(element) => {
          buttonRef.current = element
          triggerRef(element)
        }}
        popoverTarget={menuId}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Action for ${signalLabel}`}
      >
        Action
      </Button>

      <div
        ref={menuRef}
        id={menuId}
        popover="auto"
        role="menu"
        aria-label={`Action for ${signalLabel}`}
        onKeyDown={onMenuKeyDown}
        onBlur={(event) => {
          // Tabbing out should dismiss it; light dismiss only covers pointer clicks.
          if (!event.currentTarget.contains(event.relatedTarget)) close()
        }}
        // `hidden` first: the UA's display:none for a closed popover loses to any author display rule.
        className="inset-auto m-0 hidden flex-col items-center bg-transparent p-0 backdrop:bg-transparent [&:popover-open]:flex"
      >
        {!openUp && <Arrow flipped={false} />}
        <div className="bg-tooltip min-w-[132px] rounded-[4px] py-1">
          <button
            type="button"
            role="menuitem"
            ref={registerItem(0)}
            disabled={completed}
            onClick={() => runAndClose(onComplete, true)}
            className="text-b3 block w-full cursor-pointer px-4 py-2 text-left text-white hover:bg-white/10 disabled:cursor-default disabled:text-white/40 disabled:hover:bg-transparent"
          >
            Complete
          </button>
          <button
            type="button"
            role="menuitem"
            ref={registerItem(1)}
            onClick={() => runAndClose(onDelete, false)}
            className="text-b3 block w-full cursor-pointer px-4 py-2 text-left text-white hover:bg-white/10"
          >
            Delete
          </button>
        </div>
        {openUp && <Arrow flipped />}
      </div>
    </>
  )
}
