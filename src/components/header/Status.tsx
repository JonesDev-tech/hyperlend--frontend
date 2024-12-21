// import { getUserPoints } from '../../utils/user/points';
// import { formatNumber } from '../../utils/functions';
import globalGroup from '../../assets/icons/globalGroup.svg';
import globalCenter from '../../assets/icons/globalCenter.svg';
// import ProgressBar from '../common/PercentBar';

function Status() {
  // const userPoints = getUserPoints();

  return (
    <div className='flex justify-between gap-4 pr-3'>
      <div className=''>
        <img src={globalGroup} className='absolute' />
        <img src={globalCenter} className='ml-[18px] mt-5' />
      </div>
      {/* <img src={Group} className='items-center flex' alt={'referrals'}>
      </img>
      <img src={globalCenter} className='' /> */}
      <div className='ml-5'>
        {/* <p className='text-grey-light font-lufga'>Level {userPoints.level}</p> */}
        <p className='text-[#AEEAB9] font-lufga'>Global Elite</p>
        <p className='font-lufga text-gray text-[14px]'>
          {/* XP: {formatNumber(userPoints.totalPoints, 0)} */}
          Rank: 12,988
        </p>
        {/* <div className='pt-2'>
          <ProgressBar progress={userPoints.progress} className='h-1.5' />
        </div> */}
      </div>
    </div>
  );
}

export default Status;
