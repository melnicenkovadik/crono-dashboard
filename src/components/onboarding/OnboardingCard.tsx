import { Fragment } from 'react'
import { cx } from '../../lib/cx'
import contactsToSequence from '../../assets/onboarding-3.png'
import firstTask from '../../assets/onboarding-4.png'
import integrations from '../../assets/onboarding-0.png'
import newContact from '../../assets/onboarding-1.png'
import sequence from '../../assets/onboarding-2.png'
import type { OnboardingStep, OnboardingStepId } from '../../data/types'
import type { Resource } from '../../hooks/useResource'
import { BlockError } from '../ui/BlockError'
import { Card } from '../ui/Card'
import { Skeleton } from '../ui/Skeleton'

const illustrations: Record<OnboardingStepId, string> = {
  integrations,
  contact: newContact,
  sequence,
  'contacts-to-sequence': contactsToSequence,
  'first-task': firstTask,
}

const StepRow = ({ step }: { step: OnboardingStep }) => (
  <li className="flex h-10 items-center justify-between pr-[11px]">
    <span className="flex items-center gap-4">
      <img
        src={illustrations[step.id]}
        alt=""
        aria-hidden="true"
        width={40}
        height={40}
        className="size-10"
      />
      <span className="text-h5 text-dark">{step.title}</span>
    </span>
    <span className="text-b2 text-gray-1">{step.minutes} min</span>
  </li>
)

const Divider = () => <li aria-hidden="true" className="bg-gray-4 h-px" />

type OnboardingCardProps = {
  resource: Resource<OnboardingStep[]>
  className?: string
}

export const OnboardingCard = ({ resource, className }: OnboardingCardProps) => (
  <Card className={cx('flex flex-col px-2 pt-2', className)}>
    <h2 className="text-h5 text-dark px-2 pt-2">Onboarding</h2>

    {resource.status === 'error' ? (
      <BlockError message={resource.message} onRetry={resource.retry} className="mt-3" />
    ) : (
      <ul className="short:gap-3 mt-3 flex flex-col gap-4 px-2">
        {resource.status === 'loading'
          ? [0, 1, 2, 3, 4].map((index) => (
              <Fragment key={index}>
                {index > 0 && <Divider />}
                <li className="flex h-10 items-center gap-4">
                  <Skeleton className="size-10 rounded-lg" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 w-12" />
                </li>
              </Fragment>
            ))
          : resource.data.map((step, index) => (
              <Fragment key={step.id}>
                {index > 0 && <Divider />}
                <StepRow step={step} />
              </Fragment>
            ))}
      </ul>
    )}
  </Card>
)
