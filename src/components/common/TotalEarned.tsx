import alignCenterItem from '../../assets/icons/align_center.svg';
import earnedCrypto from '../../assets/icons/earnedCrypto.svg';

// Define the props for the CardItem component
type TotalEarnedProps = {
  className: string;
  title: string;
  amount: string;
  earnedAmount: string;
};

// Forward ref to the div (or any element you want to apply it to)
function TotalEarned({ className, title, amount, earnedAmount }: TotalEarnedProps) {
    return (
      <div className="rounded-2xl border bg-[#071311] h-28 border-[#caeae519] mt-3 flex justify-between py-4 px-6">
        <div className=''>
            <div className='flex'>
                <p className='text-[#E1E1E1] text-xs'>{title}</p>
                <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
            </div>
            <p className='items-center text-[28px] text-white mt-2'>{amount}</p>
            <p className='items-center text-sm text-[#2DC24E]'>{earnedAmount}</p>
        </div>
        <div className={`border rounded-full border-dashed min-w-12 h-12 bg-[#caeae50c] border-[#caeae50c] my-auto items-center justify-center flex ${className}`}>
            <img src={earnedCrypto} />
        </div>
      </div>
    );
  }

export default TotalEarned;