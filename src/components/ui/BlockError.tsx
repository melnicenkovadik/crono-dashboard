import { Button } from './Button'

type BlockErrorProps = {
  message: string
  onRetry: () => void
  className?: string
}

export const BlockError = ({ message, onRetry, className }: BlockErrorProps) => (
  <div role="alert" className={className}>
    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 py-6 text-center">
      <p className="text-b3 text-gray-1 max-w-[280px]">{message}</p>
      <Button variant="secondary" onClick={onRetry}>
        Try again
      </Button>
    </div>
  </div>
)
