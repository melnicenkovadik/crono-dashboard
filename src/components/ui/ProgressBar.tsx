import { cx } from '../../lib/cx'

type ProgressBarProps = {
  percent: number
  label: string
  trackClassName: string
  fillClassName: string
}

export const ProgressBar = ({
  percent,
  label,
  trackClassName,
  fillClassName,
}: ProgressBarProps) => (
  <div
    role="progressbar"
    aria-label={label}
    aria-valuenow={Math.round(percent)}
    aria-valuemin={0}
    aria-valuemax={100}
    className={cx('h-[3px] overflow-hidden rounded-[3px]', trackClassName)}
  >
    <div
      className={cx('h-full rounded-[3px]', fillClassName)}
      style={{ width: `${percent}%` }}
    />
  </div>
)
