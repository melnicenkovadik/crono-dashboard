import { useCallback, useEffect, useState } from 'react'

export type Resource<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string; retry: () => void }
  | { status: 'ready'; data: T }

type LoadedState<T> =
  { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready'; data: T }

const messageOf = (error: unknown) =>
  error instanceof Error ? error.message : 'Something went wrong while loading this block.'

/**
 * Runs `load` on mount and on every retry. `load` has to be a stable reference —
 * the api module exports plain functions, so passing `api.getSignals` is enough.
 */
export const useResource = <T>(load: () => Promise<T>): Resource<T> => {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<LoadedState<T>>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    load().then(
      (data) => {
        if (!cancelled) setState({ status: 'ready', data })
      },
      (error: unknown) => {
        if (!cancelled) setState({ status: 'error', message: messageOf(error) })
      },
    )
    return () => {
      cancelled = true
    }
  }, [load, attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((value) => value + 1)
  }, [])

  return state.status === 'error' ? { ...state, retry } : state
}
