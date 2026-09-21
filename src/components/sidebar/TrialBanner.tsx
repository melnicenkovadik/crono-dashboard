import swirl from '../../assets/trial-swirl.png'
import { Button } from '../ui/Button'
import { UpgradeIcon } from '../icons'

export const TrialBanner = ({ daysLeft }: { daysLeft: number }) => (
  <div className="bg-yellow-light relative h-16 w-44 shrink-0 overflow-hidden rounded-lg">
    <img src={swirl} alt="" aria-hidden="true" className="absolute top-0 right-0 h-16 w-10" />
    <p className="text-s3 text-dark absolute top-2 left-2">Trial ends in {daysLeft} days</p>
    <Button variant="upgrade" className="absolute top-8 left-2">
      Upgrade plan
      <UpgradeIcon className="size-3" />
    </Button>
  </div>
)
