import type { OnboardingStep } from './types'

export const onboardingSteps: OnboardingStep[] = [
  { id: 'integrations', title: 'Integrations Setup', minutes: 5 },
  { id: 'contact', title: 'Add new Contact', minutes: 5 },
  { id: 'sequence', title: 'Create your first sequence', minutes: 10 },
  { id: 'contacts-to-sequence', title: 'Add contacts to sequence', minutes: 5 },
  { id: 'first-task', title: 'Run your first task', minutes: 10 },
]
