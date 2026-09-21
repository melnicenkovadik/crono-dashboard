import { Fragment, useCallback, useEffect, useReducer, useRef } from 'react'
import { cx } from '../../lib/cx'
import type { Signal } from '../../data/types'
import type { Resource } from '../../hooks/useResource'
import { Badge } from '../ui/Badge'
import { BlockError } from '../ui/BlockError'
import { Card } from '../ui/Card'
import { Skeleton } from '../ui/Skeleton'
import { SignalRow } from './SignalRow'
import { initialSignalsState, signalsReducer, unreadCount, visibleSignals } from './signalsReducer'

const DESCRIPTION =
  'Never miss a single opportunity: check out your top signals from your 1st-degree LinkedIn connections.'

const RowSkeleton = () => (
  <li className="flex h-10 items-center gap-4 pr-2 pl-4">
    <Skeleton className="size-8 shrink-0 rounded-full" />
    <div className="flex flex-1 flex-col gap-1">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-24" />
    </div>
    <Skeleton className="h-4 w-16" />
    <Skeleton className="rounded-pill h-8 w-[90px]" />
  </li>
)

const Divider = () => <li aria-hidden="true" className="bg-gray-4 h-px" />

type SignalsCardProps = { resource: Resource<Signal[]>; className?: string }

export const SignalsCard = ({ resource, className }: SignalsCardProps) => {
  const [state, dispatch] = useReducer(signalsReducer, initialSignalsState)
  const triggers = useRef(new Map<string, HTMLButtonElement>())
  const emptyRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (resource.status === 'ready') dispatch({ type: 'loaded', items: resource.data })
  }, [resource])

  const visible = visibleSignals(state)
  const count = unreadCount(state)

  /** Focus follows the list: the next row's button, or the empty message. */
  const handleDelete = useCallback(
    (id: string) => {
      const order = visibleSignals(state).map((signal) => signal.id)
      const index = order.indexOf(id)
      const nextId = order[index + 1] ?? order[index - 1] ?? null

      dispatch({ type: 'delete', id })

      requestAnimationFrame(() => {
        if (nextId) triggers.current.get(nextId)?.focus()
        else emptyRef.current?.focus()
      })
    },
    [state],
  )

  const registerTrigger = (id: string) => (element: HTMLButtonElement | null) => {
    if (element) triggers.current.set(id, element)
    else triggers.current.delete(id)
  }

  return (
    <Card className={cx('flex flex-col gap-3 pt-4 pr-[4px]', className)}>
      <header className="flex flex-col gap-1 px-4">
        <div className="flex items-center gap-1.5">
          <h2 className="text-h5 text-dark">Signals</h2>
          <Badge size="section" aria-live="polite" aria-label={`${count} unread signals`}>
            {count}
          </Badge>
        </div>
        <p className="text-b2 text-gray-1">{DESCRIPTION}</p>
      </header>

      {resource.status === 'error' ? (
        <BlockError message={resource.message} onRetry={resource.retry} className="flex-1" />
      ) : (
        <div className="scrollbar-signals min-h-0 flex-1 xl:overflow-y-auto">
          <ul className="flex flex-col gap-4 pb-4">
            {resource.status === 'loading' &&
              [0, 1, 2, 3, 4].map((index) => (
                <Fragment key={index}>
                  {index > 0 && <Divider />}
                  <RowSkeleton />
                </Fragment>
              ))}

            {resource.status === 'ready' &&
              visible.map((signal, index) => (
                <Fragment key={signal.id}>
                  {index > 0 && <Divider />}
                  <SignalRow
                    signal={signal}
                    completed={state.completed.has(signal.id)}
                    onComplete={() => dispatch({ type: 'complete', id: signal.id })}
                    onDelete={() => handleDelete(signal.id)}
                    triggerRef={registerTrigger(signal.id)}
                  />
                </Fragment>
              ))}
          </ul>

          {resource.status === 'ready' && visible.length === 0 && (
            <p ref={emptyRef} tabIndex={-1} className="text-b2 text-gray-1 px-4 py-10 text-center">
              You’re all caught up — no signals left.
            </p>
          )}
        </div>
      )}
    </Card>
  )
}
