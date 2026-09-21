export type Workspace = {
  greetingName: string
  periodLabel: string
  inboxCount: number
  trial: { daysLeft: number }
  profile: { name: string; role: string }
}

export type ReplyAvatar = { id: string; src: string; alt: string }

export type Replies = {
  count: number
  avatars: ReplyAvatar[]
}

export type TaskBucketId = 'overdue' | 'pending-manual' | 'pending-auto' | 'completed'

export type TaskBucket = {
  id: TaskBucketId
  label: string
  count: number
  /** No chevron on "Completed" — it is the one bucket the mockup draws without a link. */
  href: string | null
  errorCount?: number
}

export type SignalKind = 'role-change' | 'company-change' | 'website-view'

/** The headline mixes three text styles, so it travels as segments rather than a string. */
export type SignalSegment = { text: string; style: 'strong' | 'plain' | 'highlight' }

export type Signal = {
  id: string
  avatarSrc: string | null
  avatarName: string
  headline: SignalSegment[]
  kind: SignalKind
  inSequence: boolean
  /** Fixed ISO dates keep every render (and every screenshot) identical. */
  date: string
  unread: boolean
}

export type KpiId = 'contacts' | 'companies' | 'activities' | 'meetings' | 'deals' | 'pipeline'

export type KpiMetric = {
  id: KpiId
  label: string
  value: number
  target: number
  format: 'count' | 'euro-k'
  tooltip?: string
}

export type OnboardingStepId =
  | 'integrations'
  | 'contact'
  | 'sequence'
  | 'contacts-to-sequence'
  | 'first-task'

export type OnboardingStep = {
  id: OnboardingStepId
  title: string
  minutes: number
}
