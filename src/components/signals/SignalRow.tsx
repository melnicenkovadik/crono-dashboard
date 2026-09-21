import type { Signal, SignalKind } from '../../data/types'
import { cx } from '../../lib/cx'
import { formatSignalDate } from '../../lib/format'
import { Avatar } from '../ui/Avatar'
import { ActionMenu } from './ActionMenu'

const kindStyles: Record<SignalKind, { label: string; className: string }> = {
  'role-change': { label: 'Role change', className: 'text-purple' },
  'company-change': { label: 'Company change', className: 'text-blue-green' },
  'website-view': { label: 'Website view', className: 'text-pink' },
}

type SignalRowProps = {
  signal: Signal
  completed: boolean
  onComplete: () => void
  onDelete: () => void
  triggerRef: (element: HTMLButtonElement | null) => void
}

export const SignalRow = ({ signal, completed, onComplete, onDelete, triggerRef }: SignalRowProps) => {
  const kind = kindStyles[signal.kind]
  const plainHeadline = signal.headline.map((segment) => segment.text).join('')

  return (
    // pr-2 rather than pr-4: the mockup's drawn scrollbar overlays the row, a real one takes 8px.
    <li className="flex flex-col gap-2 pr-2 pl-4 sm:flex-row sm:items-center sm:gap-4 xl:gap-12">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <span className="relative shrink-0">
          <Avatar src={signal.avatarSrc} name={signal.avatarName} className={cx(completed && 'opacity-60')} />
          {signal.unread && !completed && (
            <span
              aria-label="Unread"
              className="bg-secondary-yellow absolute top-0 left-0 size-1.5 rounded-full outline-2 outline-white"
            />
          )}
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <p className={cx('truncate text-sm/[22px]', completed ? 'text-gray-1' : 'text-dark')}>
            {signal.headline.map((segment, index) => (
              <span
                key={index}
                className={cx(
                  segment.style === 'strong' && 'font-medium',
                  segment.style === 'highlight' && !completed && 'text-crono-dark',
                )}
              >
                {segment.text}
              </span>
            ))}
          </p>
          <p className="flex items-center gap-1">
            <span className={cx('text-b3', completed ? 'text-gray-1' : kind.className)}>{kind.label}</span>
            {signal.inSequence && (
              <span className="bg-crono-light text-desc text-crono-dark flex h-4 items-center rounded-xl px-1">
                In sequence
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4 self-end sm:self-auto">
        <span className="text-b5 text-gray-1">{formatSignalDate(signal.date)}</span>
        <ActionMenu
          signalLabel={plainHeadline}
          completed={completed}
          onComplete={onComplete}
          onDelete={onDelete}
          triggerRef={triggerRef}
        />
      </div>
    </li>
  )
}
