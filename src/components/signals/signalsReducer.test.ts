import { describe, expect, it } from 'vitest'
import type { Signal } from '../../data/types'
import { initialSignalsState, signalsReducer, unreadCount, visibleSignals } from './signalsReducer'

const signal = (id: string, unread = true): Signal => ({
  id,
  avatarSrc: null,
  avatarName: 'Test Contact',
  headline: [{ text: 'Test Contact', style: 'strong' }],
  kind: 'role-change',
  inSequence: false,
  date: '2025-04-02',
  unread,
})

const load = (...ids: string[]) =>
  signalsReducer(initialSignalsState, { type: 'loaded', items: ids.map((id) => signal(id)) })

const apply = (state = load('a', 'b', 'c'), ...actions: { type: 'complete' | 'delete'; id: string }[]) =>
  actions.reduce(signalsReducer, state)

describe('signalsReducer', () => {
  it('counts every loaded unread signal', () => {
    expect(unreadCount(load('a', 'b', 'c'))).toBe(3)
  })

  it('leaves a completed row in the list but out of the count', () => {
    const state = apply(undefined, { type: 'complete', id: 'a' })

    expect(unreadCount(state)).toBe(2)
    expect(visibleSignals(state).map((item) => item.id)).toEqual(['a', 'b', 'c'])
  })

  it('removes a deleted row from both', () => {
    const state = apply(undefined, { type: 'delete', id: 'a' })

    expect(unreadCount(state)).toBe(2)
    expect(visibleSignals(state).map((item) => item.id)).toEqual(['b', 'c'])
  })

  it('does not count the same signal twice', () => {
    const twiceCompleted = apply(undefined, { type: 'complete', id: 'a' }, { type: 'complete', id: 'a' })
    const completedThenDeleted = apply(undefined, { type: 'complete', id: 'a' }, { type: 'delete', id: 'a' })

    expect(unreadCount(twiceCompleted)).toBe(2)
    expect(unreadCount(completedThenDeleted)).toBe(2)
  })

  it('never drops below zero', () => {
    const state = apply(
      load('a'),
      { type: 'complete', id: 'a' },
      { type: 'delete', id: 'a' },
      { type: 'complete', id: 'a' },
    )

    expect(unreadCount(state)).toBe(0)
    expect(visibleSignals(state)).toEqual([])
  })

  it('keeps this session’s work when the list is loaded again', () => {
    const handled = apply(undefined, { type: 'complete', id: 'a' }, { type: 'delete', id: 'b' })
    const reloaded = signalsReducer(handled, {
      type: 'loaded',
      items: ['a', 'b', 'c'].map((id) => signal(id)),
    })

    expect(visibleSignals(reloaded).map((item) => item.id)).toEqual(['a', 'c'])
    expect(unreadCount(reloaded)).toBe(1)
  })

  it('ignores signals that were never unread', () => {
    const state = signalsReducer(initialSignalsState, {
      type: 'loaded',
      items: [signal('a'), signal('b', false)],
    })

    expect(unreadCount(state)).toBe(1)
  })
})
