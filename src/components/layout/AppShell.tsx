import { useState } from 'react'
import { api } from '../../data/api'
import { useResource } from '../../hooks/useResource'
import { CollapseIcon, CronoLogo } from '../icons'
import { OnboardingCard } from '../onboarding/OnboardingCard'
import { PerformanceCard } from '../performance/PerformanceCard'
import { RepliesCard } from '../replies/RepliesCard'
import { Sidebar } from '../sidebar/Sidebar'
import { SignalsCard } from '../signals/SignalsCard'
import { TodaysTasksCard } from '../tasks/TodaysTasksCard'
import { WelcomeCard } from '../welcome/WelcomeCard'

export const AppShell = () => {
  const workspace = useResource(api.getWorkspace)
  const replies = useResource(api.getReplies)
  const taskBuckets = useResource(api.getTaskBuckets)
  const signals = useResource(api.getSignals)
  const kpiMetrics = useResource(api.getKpiMetrics)
  const onboarding = useResource(api.getOnboardingSteps)

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  const periodLabel = workspace.status === 'ready' ? workspace.data.periodLabel : null

  return (
    // Below 700px tall the desktop layout stops fitting, so the page scrolls instead.
    <div className="flex min-h-dvh xl:h-dvh xl:min-h-[700px]">
      <div className="sticky top-0 hidden h-dvh shrink-0 md:block">
        <Sidebar
          workspace={workspace}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((value) => !value)}
        />
      </div>

      {navOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
            className="absolute inset-0 bg-black/30"
          />
          <div className="relative h-full">
            <Sidebar workspace={workspace} collapsed={false} onToggle={() => setNavOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-gray-4 flex items-center gap-3 border-b bg-white px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation"
            className="bg-gray-7 text-gray-1 flex size-8 cursor-pointer items-center justify-center rounded-xl"
          >
            <CollapseIcon className="size-4 rotate-180" />
          </button>
          <CronoLogo className="h-6 w-[82px]" />
        </div>

        <main className="flex min-w-0 flex-1 flex-col p-4 xl:min-h-0">
          {/* Row heights come from the mockup; row 3 takes whatever is left. */}
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-2 xl:grid xl:min-h-0 xl:flex-1 xl:grid-cols-[1fr_1fr_var(--spacing-aside)] xl:grid-rows-[142px_148px_minmax(0,1fr)]">
            <WelcomeCard resource={workspace} className="xl:col-start-1 xl:row-start-1" />
            <RepliesCard resource={replies} className="xl:col-start-2 xl:row-start-1" />
            <TodaysTasksCard resource={taskBuckets} className="xl:col-span-2 xl:col-start-1 xl:row-start-2" />

            <PerformanceCard
              resource={kpiMetrics}
              periodLabel={periodLabel}
              className="xl:col-start-3 xl:row-span-2 xl:row-start-1 xl:mt-[5px]"
            />

            <SignalsCard
              resource={signals}
              className="xl:col-span-2 xl:col-start-1 xl:row-start-3 xl:min-h-0"
            />

            <OnboardingCard resource={onboarding} className="xl:col-start-3 xl:row-start-3" />
          </div>
        </main>
      </div>
    </div>
  )
}
