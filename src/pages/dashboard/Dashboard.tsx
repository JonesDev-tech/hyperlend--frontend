import { useState, useEffect, useRef } from 'react';
import {
  useSwitchChain,
  useAccount,
  useWriteContract,
  useBlockNumber,
} from 'wagmi';
import ReactGA from 'react-ga4';

import Modal from '../../components/common/Modal';
import CardItem from '../../components/common/CardItem';
// import InfoItem from '../../components/common/InfoItem';
// import SectionTitle from '../../components/common/SectionTitle';

import Navbar from '../../layouts/Navbar';
// import Factor from '../../components/dashboard/Factor';
// import MyChart from '../../components/dashboard/Chart';
// import PositionBar from '../../components/dashboard/PositionBar';
import TotalEarned from '../../components/common/TotalEarned';
import { formatNumber } from '../../utils/functions';
import { ModalType } from '../../utils/types';

// import { getUserPoints } from '../../utils/user/points';
import { contracts, abis, networkChainId } from '../../utils/config';
import { useUserPositionsData } from '../../utils/user/core/positions';
// import { useUserWalletValueUsd } from '../../utils/user/wallet';
// import { useUserPortfolioHistory } from '../../utils/user/history';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '../../provider/ConfirmProvider';
import pointItem from "../../assets/icons/pointItem.svg";
import eye from "../../assets/icons/eye.svg";
import alignCenterItem from "../../assets/icons/align_center.svg";
// import vectorImg from "../../assets/icons/vector.svg";
import semiCircle from "../../assets/icons/semiCircle.svg";
import dailyEarningItem from "../../assets/icons/dailyEarningItem.svg";
import arrowUp from "../../assets/icons/arrowUp.svg";
import arrowDown from "../../assets/icons/arrowDown.svg";
import maskGroup from "../../assets/icons/maskGroup.svg";
import angle from "../../assets/icons/angle.svg";
import coinGroup from "../../assets/icons/coinGroup.svg";
import bitcoinGroup from "../../assets/icons/bitcoinGroup.svg";
import stHype from "../../assets/icons/stHype.svg";
import ethereum from "../../assets/icons/ethereum.svg";
import { motion } from 'framer-motion';

function Dashboard() {
  ReactGA.send({ hitType: 'pageview', page: '/dashboard' });

  const { guided, closeGuide, nextStep } = useConfirm();
  const navigate = useNavigate();
  const { data: hash, writeContractAsync } = useWriteContract();
  const { switchChain } = useSwitchChain();
  const { address, chainId, isConnected } = useAccount();
  const { error: blockNumberError } = useBlockNumber();

  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [modalToken, setModalToken] = useState<string>('');
  const [modalType, setModalType] = useState<ModalType>('supply');
  const closeModal = () => setModalStatus(false);

  if (blockNumberError) {
    console.log(blockNumberError.name);
    alert(
      `RPC node error: ${blockNumberError.message} \n\nPlease try again later!`,
    );
  }

  useEffect(() => {
    if (isConnected && chainId != networkChainId) {
      switchChain({ chainId: networkChainId });
    }
  }, [isConnected, chainId]);

  const {
    supplied,
    borrowed,
    // totalBalanceUsd,
    // totalSupplyUsd,
    // totalBorrowUsd,
    // totalBorrowLimit,
    // totalBalanceChange,
    // totalBalanceChangePercentage,
    // netApy,
    // healthFactor,
  } = useUserPositionsData(isConnected, address);

  // const { totalPoints, pointsIncrease, pointsPercentIncrease } =
  //   getUserPoints();
  // const { walletBalanceValue } = useUserWalletValueUsd();
  // const { historicalNetWorth } = useUserPortfolioHistory(address, isConnected);

  const sendToggleCollateralTx = (asset: string, isEnabled: boolean) => {
    writeContractAsync({
      address: contracts.pool,
      abi: abis.pool,
      functionName: 'setUserUseReserveAsCollateral',
      args: [asset, !isEnabled],
    });
    console.log(hash);
  };

  const divRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  const [divDimensions, setDivDimensions] = useState<
    { width: number; height: number }[]
  >([
    { width: 0, height: 0 },
    { width: 0, height: 0 },
    { width: 0, height: 0 },
    { width: 0, height: 0 },
  ]);

  // Update widths and heights
  const updateDimensions = () => {
    const newDimensions = divRefs.map((ref) => ({
      width: ref.current?.offsetWidth || 0,
      height: ref.current?.offsetHeight || 0,
    }));
    setDivDimensions(newDimensions);
  };

  useEffect(() => {
    // Update the dimensions immediately when the component mounts
    updateDimensions();

    // Add resize event listener to update dimensions during window resizing
    window.addEventListener('resize', updateDimensions);

    // Clean up event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex flex-col'
      >
        <Navbar pageTitle='Dashboard' />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='pt-8 flex flex-col gap-4 relative'
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className='flex-col md:flex-row grid grid-cols-3 gap-4 justify-between font-lufga font-normal'
          >
            <CardItem
              ref={divRefs[0]}
              className={`px-4 lg:px-8 py-8 col-span-3 lg:col-span-2 lg:h-80 bg-card-bg bg-top-right-4 overflow-hidden md:mb-0 ${guided > 0 && guided !== 1 ? 'lg:blur-[8px]' : ''}`}
            >
              <div className='flex ml-1.5'>
                <img src={pointItem} />
                <p className='text-lg text-[#AEEAB9] ml-1 mt-1'>Master Guardian</p>
              </div>
              <div className='text-[#CAEAE5] py-2 ml-1.5'>
                <p className='text-[22px]'>Welcome to HyperLend!</p>
                <p className='text-5xl'>Hello hyperlend.hl</p> 
              </div>
              <div className='grid grid-cols-5 gap-4 py-2'>
                <div className='bg-[#071311] h-28 col-span-5 border rounded-2xl border-[#caeae519] py-4 px-8 lg:col-span-2'>
                  <div className='flex'>
                    <p className='text-[#E1E1E1] text-xs'>Current balance</p>
                    <img src={eye} className='w-3 h-2.5 ml-2' />
                  </div>
                  <p className='items-center text-[28px] text-white mt-1 tracking-[0.015em]'>$1,753,050</p>
                  <p className='items-center text-sm text-[#2DC24E]'>+$22,568(+1.28%)</p>
                </div>  
                <div className='hidden bg-[#071311] h-28 border rounded-2xl border-[#caeae519] py-4 px-6 lg:block'>
                  <div className='flex'>
                    <p className='text-[#E1E1E1] text-xs'>Total APY</p>
                    <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1' />
                  </div>
                  <p className='items-center text-[28px] text-white mt-2'>18,7%</p>
                  <p className='items-center text-sm text-[#2DC24E]'>+1.3%</p>
                </div>
                <div className='hidden bg-[#071311] h-28 border rounded-2xl border-[#caeae519] py-4 px-6 lg:block'>
                  <div className='flex'>
                    <p className='text-[#E1E1E1] text-xs'>Total Points</p>
                    <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                  </div>
                  <p className='items-center text-[28px] text-white mt-2'>421</p>
                  <p className='items-center text-sm text-[#2DC24E]'>+12(3.89%)</p>
                </div>
                <div className='hidden bg-[#071311] h-28 border rounded-2xl border-[#caeae519] py-4 px-3.5 lg:block'>
                  <div className='flex mb-2'>
                    <p className='text-[#E1E1E1] text-xs'>Headth Factor</p>
                    <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                  </div>
                  <div className='flex items-center justify-center'><img src={semiCircle} /></div>
                  <p className='justify-center flex text-[28px] text-white -mt-5'>9,8</p>
                </div>
              </div>
              <div className='grid grid-cols-3 gap-4 lg:hidden'>
                <div className='bg-[#071311] h-28 border rounded-2xl border-[#caeae519] py-4 px-6'>
                  <div className='flex'>
                    <p className='text-[#E1E1E1] text-xs'>Total APY</p>
                    <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1' />
                  </div>
                  <p className='items-center text-[28px] text-white mt-2'>18,7%</p>
                  <p className='items-center text-sm text-[#2DC24E]'>+1.3%</p>
                </div>
                <div className='bg-[#071311] h-28 border rounded-2xl border-[#caeae519] py-4 px-6'>
                  <div className='flex'>
                    <p className='text-[#E1E1E1] text-xs'>Total Points</p>
                    <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                  </div>
                  <p className='items-center text-[28px] text-white mt-2'>421</p>
                  <p className='items-center text-sm text-[#2DC24E]'>+12(3.89%)</p>
                </div>
                <div className='bg-[#071311] h-28 border rounded-2xl border-[#caeae519] py-4 px-3.5'>
                  <div className='flex mb-2'>
                    <p className='text-[#E1E1E1] text-xs'>Headth Factor</p>
                    <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                  </div>
                  <div className='flex items-center justify-center'><img src={semiCircle} /></div>
                  <p className='justify-center flex text-[28px] text-white -mt-5'>9,8</p>
                </div>
              </div>
            </CardItem>

            <CardItem
              ref={divRefs[1]}
              className={`py-4 col-span-3 lg:h-80 lg:col-span-1 px-6 pt-[22px]: ${guided > 0 && guided !== 2 ? 'lg:blur-[8px]' : ''}`}
            >
              <div className='flex justify-between'>
                <p className='text-[#E1E1E1] text-xs'>Your Position</p>
                <div className='flex'>
                  <p className='text-[#CAEAE5] text-base mr-2 border-b'>Daily Earnings</p>
                  <img src={dailyEarningItem} />
                </div>
              </div>
              <div className='grid grid-flow-col gap-4 grid-cols-2 lg:block'>
                <TotalEarned title={"Total Deposited"} amount={"$1,753,050"} earnedAmount={"+$33,132(+1.89%)"} className='' />
                <TotalEarned title={"Total Borrowed"} amount={"$153,370"} earnedAmount={"+$1,855(+1.21%)"} className='bg-[#ff00040c]' />
              </div>
            </CardItem>
          </motion.div>
          <div className='hidden justify-between font-lufga font-normal mt-6 lg:flex'>
            <div className='text-lg flex'>
              <div className='text-center border-b-2 text-[#CAEAE5] w-40'>Core</div>
              <div className='text-center border-b-2  text-[#caeae566] w-40'>Isolated</div>
            </div>
            <div className='flex'>
              <p className='text-[#caeae566] text-base mr-2 border-b-2'>Your Transactions</p>
              <img src={dailyEarningItem} className='w-4 h-4' />
            </div>
          </div>
          <div className='text-lg flex mt-6 lg:hidden'>
            <div className='text-center border-b-2 text-[#CAEAE5] w-1/2'>Core</div>
            <div className='text-center border-b-2  text-[#caeae566] w-1/2'>Isolated</div>
          </div>

          <motion.div
            ref={divRefs[3]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className={`lg:flex gap-5 justify-between ${guided > 0 && guided !== 4 ? 'lg:blur-[8px]' : ''}`}
          >
            <CardItem className='py-4 lg:py-6 flex-1 mb-4 lg:mb-0'>
              <div className='h-80'>
                <div className='flex ml-6'>
                  <div className="border mr-3 rounded-full border-dashed w-7 h-7 border-[#caeae50c] items-center justify-center flex">
                    <img src={arrowUp} />
                  </div>
                  <p className='text-white font-lufga text-2xl pb-4'>You Supplied</p>
                </div>
                <div className='text-center bg-[#071311]'>
                  <div className='py-3 px-6 grid grid-cols-6 border-y-[1px] border-[#050F0D] bg-[#212325]'>
                    <div className='text-white font-lufga text-[11px] flex'>
                      Assets
                      <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                    </div>
                    <div className='text-white font-lufga text-[11px] flex'>
                      Balance
                      <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                    </div>
                    <div className='text-white font-lufga text-[11px] flex ml-4'>
                      Value
                      <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                    </div>
                    <div className='text-white font-lufga text-[11px] flex ml-8'>
                      APR
                      <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                    </div>
                    <div className='text-white font-lufga text-[11px] flex ml-4'>
                      Collateral
                      <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                    </div>
                    <div className='text-white font-lufga text-[11px]'></div>
                  </div>
                  <div className='overflow-auto max-h-[200px]'>
                    {(supplied || []).map((item: any, index: any) => (
                      <button
                        className='w-full grid grid-cols-6 py-[14px] px-2.5 border-b-[1px] border-[#212325] items-center hover:bg-primary-hover'
                        key={index}
                        onClick={() =>
                          navigate(`/markets/${item.underlyingAsset}`)
                        }
                      >
                        <div className='text-white font-lufga flex gap-2 justify-center'>
                          <img
                            className='w-4 sm:w-6 lg:w-4 xl:w-6'
                            src={item.icon}
                            alt=''
                          />
                          <p className='text-xs sm:text-base lg:text-xs xl:text-base'>
                            {item.assetName}
                          </p>
                        </div>
                        <div className='text-white font-lufga text-xs sm:text-base lg:text-xs xl:text-base'>
                          {formatNumber(item.balance, 3)}
                        </div>
                        <div className='text-white font-lufga text-xs sm:text-base lg:text-xs xl:text-base'>
                          ${formatNumber(item.value, 2)}
                        </div>
                        <div className='text-success font-lufga text-xs sm:text-base lg:text-xs xl:text-base'>
                          {formatNumber(item.apr, 2)}%
                        </div>
                        <div
                          className={`text-xs sm:text-base lg:text-xs xl:text-base ${item.isCollateralEnabled ? 'text-success font-lufga' : 'text-secondary font-lufga'}`}
                        >
                          <button
                            onClick={() => {
                              sendToggleCollateralTx(
                                item.underlyingAsset,
                                item.isCollateralEnabled,
                              );
                            }}
                          >
                            {item.isCollateralEnabled ? '✓' : '─'}
                          </button>
                        </div>
                        <button
                          className='w-full py-2 bg-secondary font-lufga rounded-xl font-bold hover:bg-[#CAEAE5]/80'
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalStatus(true);
                            setModalToken(item.underlyingAsset);
                            setModalType('supply');
                          }}
                        >
                          Supply
                        </button>
                      </button>
                      // </Link>
                    ))}
                  </div>
                </div>
                <div className='text-center bg-[#111E1C]'>
                  <div className='py-3 px-6 border-y-[1px] border-[#071311] text-white font-lufga text-[15px] flex justify-between h-10 items-center'>
                    <div className='text-white font-lufga text-[15px] flex justify-center items-center'>
                      <img src={maskGroup} className='w-3 h-3 mr-1' />
                      PURR
                    </div>
                    <p>138.93K</p>
                    <p>$22.21K</p>
                    <p className='text-[#2DC24E]'>14.56%</p>
                    <div>
                      <img src={angle} />
                    </div>
                    <div className='font-lufga w-20 h-7 bg-[#CAEAE5] rounded-md flex items-center justify-center text-[#071311]'>Supply</div>
                  </div>
                  <div className='py-3 px-6 border-y-[1px] border-[#071311] text-white font-lufga text-[15px] flex justify-between h-10 items-center'>
                    <div className='text-white font-lufga text-[15px] flex items-center justify-center'>
                      <img src={coinGroup} className='w-3 h-3 mr-1' />
                      USDC
                    </div>
                    <p>$783.12K</p>
                    <p>$783.12K</p>
                    <p className='text-[#2DC24E]'>3.77%</p>
                    <div className='items-center flex justify-center'>
                      <img src={angle} />
                    </div>
                    <div className='font-lufga w-20 h-7 bg-[#CAEAE5] rounded-md flex items-center justify-center text-[#071311]'>Supply</div>
                  </div>
                  <div className='py-3 px-6 border-y-[1px] border-[#071311] text-white font-lufga text-[15px] flex justify-between h-10 items-center'>
                    <div className='text-white font-lufga text-[15px] items-center justify-center flex'>
                      <img src={bitcoinGroup} className='w-3 h-3 mr-1' />
                      MBTC
                    </div>
                    <p>12.88</p>
                    <p>$772.82K</p>
                    <p className='text-[#2DC24E]'>4.11%</p>
                    <div>
                      <img src={angle} />
                    </div>
                    <div className='font-lufga w-20 h-7 bg-[#CAEAE5] rounded-md flex items-center justify-center text-[#071311]'>Supply</div>
                  </div>
                  <div className='py-3 px-6 border-y-[1px] border-[#071311] text-white font-lufga text-[15px] flex justify-between h-10 items-center'>
                    <div className='text-white font-lufga text-[15px] items-center justify-center flex'>
                      <img src={stHype} className='w-3 h-3 mr-1' />
                      stHYPE
                    </div>
                    <p>12.41K</p>
                    <p>$17.92K</p>
                    <p className='text-[#2DC24E]'>4.11%</p>
                    <div>
                      <img src={angle} />
                    </div>
                    <div className='font-lufga w-20 h-7 bg-[#CAEAE5] rounded-md flex items-center justify-center text-[#071311]'>Supply</div>
                  </div>
                  
                  
                </div>
              </div>
            </CardItem>
            <CardItem className='py-4 lg:py-6 flex-1'>
              <div className='max-h-[250px]'>
                <div className='flex ml-6'>
                  <div className="border mr-3 rounded-full border-dashed w-7 h-7 bg-[#ff00040c] border-[#caeae50c] items-center justify-center flex">
                    <img src={arrowDown} />
                  </div>
                  <p className='text-white font-lufga text-2xl pb-4'>You Borrowed</p>
                </div>
                <div className='text-center'>
                <div className='py-3 px-6 grid grid-cols-6 border-y-[1px] border-[#050F0D] bg-[#212325]'>
                    <div className='text-white font-lufga text-[11px] flex'>
                      Assets
                      <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                    </div>
                    <div className='text-white font-lufga text-[11px] flex'>
                      Balance
                      <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                    </div>
                    <div className='text-white font-lufga text-[11px] flex ml-4'>
                      Value
                      <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                    </div>
                    <div className='text-white font-lufga text-[11px] flex ml-8'>
                      APR
                      <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                    </div>
                    <div className='text-white font-lufga text-[11px] flex ml-4'>
                      Pool
                      <img src={alignCenterItem} className='w-2 h-2 ml-1 mt-1'/>
                    </div>
                    <div className='text-white font-lufga text-[11px]'></div>
                  </div>
                  <div className='overflow-auto max-h-[200px]'>
                    {(borrowed || []).map((item: any, index: any) => (
                      <button
                        className='w-full grid grid-cols-6 py-[14px] px-2.5 border-b-[1px] border-[#212325] items-center hover:bg-primary-hover'
                        key={index}
                        onClick={() =>
                          navigate(`/markets/${item.underlyingAsset}`)
                        }
                      >
                        <div className='text-white font-lufga flex gap-2 justify-center'>
                          <img
                            className='w-4 sm:w-6 lg:w-4 xl:w-6'
                            src={item.icon}
                            alt=''
                          />
                          <p className='text-xs sm:text-base lg:text-xs xl:text-base'>
                            {item.assetName}
                          </p>
                        </div>
                        <div className='text-white font-lufga text-xs sm:text-base lg:text-xs xl:text-base'>
                          {formatNumber(item.balance, 3)}
                        </div>
                        <div className='text-white font-lufga text-xs sm:text-base lg:text-xs xl:text-base'>
                          ${formatNumber(item.value, 2)}
                        </div>
                        <div className='text-success font-lufga text-xs sm:text-base lg:text-xs xl:text-base'>
                          {formatNumber(item.apr, 2)}%
                        </div>
                        <div className='text-success font-lufga text-xs sm:text-base lg:text-xs xl:text-base'>
                          {item.pool || 'Core'}
                        </div>
                        <div>
                          <button
                            className='w-full py-2 bg-secondary font-lufga rounded-xl font-bold hover:bg-[#CAEAE5]/80'
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalStatus(true);
                              setModalToken(item.underlyingAsset);
                              setModalType('repay');
                            }}
                          >
                            Repay
                          </button>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className='text-center bg-[#111E1C]'>
                    <div className='py-3 px-6 border-y-[1px] border-[#071311] text-white font-lufga text-[15px] flex justify-between h-10 items-center'>
                      <div className='text-white font-lufga text-[15px] flex items-center justify-center'>
                        <img src={coinGroup} className='w-3 h-3 mr-1' />
                        USDC
                      </div>
                      <p>50.5K</p>
                      <p>$50.5K</p>
                      <p className='text-[#2DC24E]'>6.12%</p>
                      <p className='text-[#2DC24E]'>Core</p>
                      <div className='font-lufga w-20 h-7 bg-[#CAEAE5] rounded-md flex items-center justify-center text-[#071311]'>Reply</div>
                    </div>
                    <div className='py-3 px-6 border-y-[1px] border-[#071311] text-white font-lufga text-[15px] flex justify-between h-10 items-center'>
                      <div className='text-white font-lufga text-[15px] flex justify-center items-center'>
                        <img src={maskGroup} className='w-3 h-3 mr-1' />
                        PURR
                      </div>
                      <p>36.1K</p>
                      <p>$5.77K</p>
                      <p className='text-[#2DC24E]'>17.74%</p>
                      <p className='text-[#2DC24E]'>Core</p>
                      <div className='font-lufga w-20 h-7 bg-[#CAEAE5] rounded-md flex items-center justify-center text-[#071311]'>Reply</div>
                    </div>
                    <div className='py-3 px-6 border-y-[1px] border-[#071311] text-white font-lufga text-[15px] flex justify-between h-10 items-center'>
                      <div className='text-white font-lufga text-[15px] items-center justify-center flex'>
                        <img src={ethereum} className='w-3 h-3 mr-1' />
                        ETH
                      </div>
                      <p>18.8</p>
                      <p>$47.3K</p>
                      <p className='text-[#2DC24E]'>11.59%</p>
                      <p className='text-[#2DC24E]'>Core</p>
                      <div className='font-lufga w-20 h-7 bg-[#CAEAE5] rounded-md flex items-center justify-center text-[#071311]'>Reply</div>
                    </div>
                    <div className='py-3 px-6 border-y-[1px] border-[#071311] text-white font-lufga text-[15px] flex justify-between h-10 items-center'>
                      <div className='text-white font-lufga text-[15px] items-center justify-center flex'>
                        <img src={bitcoinGroup} className='w-3 h-3 mr-1' />
                        MBTC
                      </div>
                      <p>0.73</p>
                      <p>$44.8K</p>
                      <p className='text-[#2DC24E]'>6.38%</p>
                      <p className='text-[#2DC24E]'>Core</p>
                      <div className='font-lufga w-20 h-7 bg-[#CAEAE5] rounded-md flex items-center justify-center text-[#071311]'>Reply</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardItem>
          </motion.div>
          {guided === 1 && (
            <div
              className='hidden lg:block absolute -translate-x-1/2'
              style={{
                top: divDimensions[0].height + 32,
                left: divDimensions[0].width / 2,
              }}
            >
              <div className='flex flex-col items-center relative z-10 -top-2'>
                <div className='w-4 h-4 rounded-full bg-transparent border-2 border-secondary'></div>
                <div className='w-0.5 h-12 bg-secondary'></div>
                <div className='w-4 h-4 rounded-full bg-transparent border-2 border-secondary'></div>
              </div>
              <div className='bg-primary px-4 py-3 inline-block relative -top-4 rounded-md text-left'>
                <p className='font-lufga text-[13px] text-secondary'>
                  Check Your Health Factor
                </p>
                <p className='font-lufga text-[11px] text-secondary'>
                  Keep this high to reduce liquidation risk.
                </p>
                <div className='flex justify-center gap-12 mt-3'>
                  <button
                    onClick={closeGuide}
                    className='text-secondary text-opacity-30 font-lufga'
                  >
                    Skip All
                  </button>
                  <button
                    onClick={nextStep}
                    className='text-secondary text-opacity-50 font-lufga'
                  >
                    Next ({guided}/4)
                  </button>
                </div>
              </div>
            </div>
          )}
          {guided === 2 && (
            <div
              className='hidden lg:flex justify-end absolute '
              style={{
                right: divDimensions[1].width - 16,
              }}
            >
              <div className='bg-primary max-w-[260px] px-4 py-3 block relative -top-4 rounded-md text-left'>
                <p className='font-lufga text-[13px] text-secondary'>
                  Deposit Collateral
                </p>
                <p className='font-lufga text-[11px] text-secondary'>
                  The assets you've provided as collateral to secure your loans
                  on the platform.
                </p>
                <p className='font-lufga text-[13px] text-secondary mt-3'>
                  Borrow
                </p>
                <p className='font-lufga text-[11px] text-secondary'>
                  The assets you've borrowed using your deposited collateral.
                </p>
                <div className='flex justify-center gap-12 mt-3'>
                  <button
                    onClick={closeGuide}
                    className='text-secondary text-opacity-30 font-lufga'
                  >
                    Skip All
                  </button>
                  <button
                    onClick={nextStep}
                    className='text-secondary text-opacity-50 font-lufga'
                  >
                    Next ({guided}/4)
                  </button>
                </div>
              </div>
              <div className='flex items-center relative z-10 mt-24 -top-2 -left-2'>
                <div className='w-4 h-4 rounded-full bg-transparent border-2 border-secondary'></div>
                <div className='h-0.5 w-12 bg-secondary'></div>
                <div className='w-4 h-4 rounded-full bg-transparent border-2 border-secondary'></div>
              </div>
            </div>
          )}
          {guided === 3 && (
            <div
              className='hidden lg:block absolute max-w-[260px] -translate-x-1/2'
              style={{
                top: divDimensions[0].height - 128,
                left: divDimensions[2].width / 3,
              }}
            >
              <div className='bg-primary max-w-[260px] px-4 py-3 block rounded-md text-left'>
                <p className='font-lufga text-[13px] text-secondary'>
                  Monitor Your Net Worth
                </p>
                <p className='font-lufga text-[11px] text-secondary'>
                  Track your balance and APY changes over time.
                </p>
                <div className='flex justify-center gap-12 mt-3'>
                  <button
                    onClick={closeGuide}
                    className='text-secondary text-opacity-30 font-lufga'
                  >
                    Skip All
                  </button>
                  <button
                    onClick={nextStep}
                    className='text-secondary text-opacity-50 font-lufga'
                  >
                    Next ({guided}/4)
                  </button>
                </div>
              </div>
              <div className='flex flex-col items-center relative z-10 -top-2'>
                <div className='w-4 h-4 rounded-full bg-transparent border-2 border-secondary'></div>
                <div className='w-0.5 h-12 bg-secondary'></div>
                <div className='w-4 h-4 rounded-full bg-transparent border-2 border-secondary'></div>
              </div>
            </div>
          )}
          {guided === 4 && (
            <div
              className='hidden lg:block absolute max-w-[260px] -translate-x-1/2'
              style={{
                top: divDimensions[0].height + divDimensions[1].height - 212,
                left: divDimensions[2].width / 2,
              }}
            >
              <div className='bg-primary max-w-[260px] px-4 py-3 block rounded-md text-left'>
                <p className='font-lufga text-[13px] text-secondary'>
                  Monitor Your Net Worth
                </p>
                <p className='font-lufga text-[11px] text-secondary'>
                  Track your balance and APY changes over time.
                </p>
                <div className='flex justify-center gap-12 mt-3'>
                  <button
                    onClick={closeGuide}
                    className='text-secondary font-lufga'
                  >
                    Complete
                  </button>
                </div>
              </div>
              <div className='flex flex-col items-center relative z-10 -top-2'>
                <div className='w-4 h-4 rounded-full bg-transparent border-2 border-secondary'></div>
                <div className='w-0.5 h-6 bg-secondary' />
                <div className='w-60 h-0.5 bg-secondary' />
                <div className='flex justify-between w-full'>
                  <div className='flex flex-col items-center'>
                    <div className='w-0.5 h-8 bg-secondary' />
                    <div className='w-4 h-4 rounded-full bg-transparent border-2 border-secondary'></div>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='w-0.5 h-8 bg-secondary' />
                    <div className='w-4 h-4 rounded-full bg-transparent border-2 border-secondary' />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
      {modalStatus && (
        <Modal token={modalToken} modalType={modalType} onClose={closeModal} />
      )}
    </>
  );
}

export default Dashboard;
