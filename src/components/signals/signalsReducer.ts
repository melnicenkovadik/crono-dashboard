import type { Signal } from '../../data/types'

export type SignalsState = {
  items: Signal[]
  completed: ReadonlySet<string>
  deleted: ReadonlySet<string>
}

export type SignalsAction =
  { type: 'loaded'; items: Signal[] } | { type: 'complete'; id: string } | { type: 'delete'; id: string }

export const initialSignalsState: SignalsState = {
  items: [],
  completed: new Set(),
  deleted: new Set(),
}

const withAdded = (set: ReadonlySet<string>, id: string) => new Set(set).add(id)

/**
 * Server rows and what the session did to them are kept apart, so reloading the
 * list never resurrects a row the user has already handled.
 */
export const signalsReducer = (state: SignalsState, action: SignalsAction): SignalsState => {
  switch (action.type) {
    case 'loaded':
      return { ...state, items: action.items }
    case 'complete':
      if (state.completed.has(action.id) || state.deleted.has(action.id)) return state
      return { ...state, completed: withAdded(state.completed, action.id) }
    case 'delete':
      if (state.deleted.has(action.id)) return state
      return { ...state, deleted: withAdded(state.deleted, action.id) }
  }
}

export const visibleSignals = (state: SignalsState) =>
  state.items.filter((signal) => !state.deleted.has(signal.id))

/** Derived, never stored: it cannot drift below zero or drop twice for one signal. */
export const unreadCount = (state: SignalsState) =>
  visibleSignals(state).filter((signal) => signal.unread && !state.completed.has(signal.id)).length
