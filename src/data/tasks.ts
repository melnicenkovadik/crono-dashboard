import type { TaskBucket } from './types'

export const taskBuckets: TaskBucket[] = [
  { id: 'overdue', label: 'Overdue', count: 3, href: '/tasks?filter=overdue' },
  { id: 'pending-manual', label: 'Pending Manual', count: 10, href: '/tasks?filter=manual' },
  { id: 'pending-auto', label: 'Pending Auto', count: 20, href: '/tasks?filter=auto', errorCount: 1 },
  { id: 'completed', label: 'Completed', count: 8, href: null },
]
