import { status } from '../utils/mock';
import { formatNumber } from '../utils/functions';
import ProgressBar from './PercentBar';

function Status() {
  const progress = 50;
  return (
    <div className="flex gap-4 pr-3">
      <p className="text-grey-light font-lufga p-3 border-2 rounded-full text-lg aspect-square border-secondary">
        {status.level}
      </p>
      <div className="w-full">
        <p className="text-grey-light font-lufga">
          Level
          {' '}
          {status.level}
        </p>
        <p className="font-lufga text-gray text-[14px]">
          XP:
          {' '}
          {formatNumber(status.xp, 0)}
        </p>
        <div className="pt-2">
          <ProgressBar progress={progress} />
        </div>
      </div>
    </div>
  );
}

export default Status;
