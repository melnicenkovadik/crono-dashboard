import { kpiMetrics } from './kpi'
import { onboardingSteps } from './onboarding'
import { replies } from './replies'
import { signals } from './signals'
import { taskBuckets } from './tasks'
import type { KpiMetric, OnboardingStep, Replies, Signal, TaskBucket, Workspace } from './types'
import { workspace } from './workspace'

export type ResourceKey = 'workspace' | 'replies' | 'tasks' | 'signals' | 'kpi' | 'onboarding'

const params = new URLSearchParams(window.location.search)

/**
 * `?delay=1500` slows every response down; `?fail=signals,kpi` (or `?fail=all`)
 * keeps those requests failing, retries included, until the flag is dropped.
 */
const delayMs = Number(params.get('delay') ?? 450)
const failing = new Set((params.get('fail') ?? '').split(',').filter(Boolean))

const shouldFail = (key: ResourceKey) => failing.has(key) || failing.has('all')

const respond = <T>(key: ResourceKey, payload: T): Promise<T> =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail(key)) {
        reject(new Error(`Could not load ${key}. Check your connection and try again.`))
        return
      }
      // Hand out copies so a screen can never write back into the fixture.
      resolve(structuredClone(payload))
    }, delayMs)
  })

// TODO[API]: swap these for real endpoints — the rest of the app only knows this module.
export const api = {
  getWorkspace: (): Promise<Workspace> => respond('workspace', workspace),
  getReplies: (): Promise<Replies> => respond('replies', replies),
  getTaskBuckets: (): Promise<TaskBucket[]> => respond('tasks', taskBuckets),
  getSignals: (): Promise<Signal[]> => respond('signals', signals),
  getKpiMetrics: (): Promise<KpiMetric[]> => respond('kpi', kpiMetrics),
  getOnboardingSteps: (): Promise<OnboardingStep[]> => respond('onboarding', onboardingSteps),
}
