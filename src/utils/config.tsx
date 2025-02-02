import ethIcon from '../assets/icons/coins/eth-icon.svg';
import usdcIcon from '../assets/icons/coins/usdc-icon.svg';
import usdtIcon from '../assets/icons/coins/usdt-icon.svg';
import wbtcIcon from '../assets/icons/coins/wbtc-icon.svg';
import stHypeIcon from '../assets/icons/coins/sthype-icon.svg';
import hypeIcon from '../assets/icons/coins/hype-icon.svg';

import arb from './chains/arb';
import hlTestnet from './chains/hlTestnet';

import UiPoolDataProviderV3Abi from '../abis/UiPoolDataProviderV3Abi.json';
import PoolAbi from '../abis/PoolAbi.json';
import OracleAbi from '../abis/OracleAbi.json';
import DataProviderAbi from '../abis/DataProviderAbi.json';
import rateStrategyAbi from '../abis/RateStrategyAbi.json';
import faucetAbi from '../abis/FaucetAbi.json';
import wrappedTokenGatewayV3Abi from '../abis/WrappedTokenGatewayV3Abi.json';
import variableDebtTokenAbi from '../abis/VariableDebtTokenAbi.json';
import isolatedPoolAbi from '../abis/IsolatedPoolAbi.json';
import isolatedPairRegistryAbi from '../abis/IsolatedPairRegistryAbi.json';
import uiDataProviderIsolatedAbi from '../abis/UiDataProviderIsolatedAbi.json';
import chainlinkAbi from '../abis/ChainlinkAbi.json';
import wethAbi from '../abis/WethAbi.json';

export const abis: Record<string, any> = {
  dataProvider: DataProviderAbi,
  uiPoolDataProvider: UiPoolDataProviderV3Abi,
  pool: PoolAbi,
  oracle: OracleAbi,
  protocolDataProvider: DataProviderAbi,
  rateStrategy: rateStrategyAbi,
  faucet: faucetAbi,
  wrappedTokenGatewayV3: wrappedTokenGatewayV3Abi,
  variableDebtToken: variableDebtTokenAbi,
  isolatedPool: isolatedPoolAbi,
  isolatedPairRegistry: isolatedPairRegistryAbi,
  uiDataProviderIsolated: uiDataProviderIsolatedAbi,
  chainlink: chainlinkAbi,
  weth: wethAbi,
};

export const iconsMap: any = {
  ETH: ethIcon,
  WETH: ethIcon,
  USDT: usdtIcon,
  USDC: usdcIcon,
  WBTC: wbtcIcon,
  MBTC: wbtcIcon,
  stHYPE: stHypeIcon,
  HYPE: hypeIcon,
};

//make sure to also add them to tailwind.config.js,
//otherwise it won't work (for markets overview page gradient on mobile)
export const tokenColorMap: any = {
  MBTC: 'f7931a',
  ETH: '497493',
  stHYPE: '97fce0',
  HYPE: '97fce0',
};

export const stablecoinsList = ['USDC', 'USDT'];

const currentChainId: number = 998;
export const currentChaiApiName: string = 'hyperEvmTestnet';

const networkConfigs: any = {
  42161: arb,
  998: hlTestnet,
};

export const chainName: string =
  networkConfigs[currentChainId].chainName || arb.chainName;
export const networkChainId: number =
  networkConfigs[currentChainId].networkChainId || arb.networkChainId;
export const contracts: any =
  networkConfigs[currentChainId].contracts || arb.contracts;
export const assetAddresses: string[] =
  networkConfigs[currentChainId].assetAddresses || arb.assetAddresses;
export const tokenNameMap: any =
  networkConfigs[currentChainId].tokenNameMap || arb.tokenNameMap;
export const tokenDecimalsMap: any =
  networkConfigs[currentChainId].tokenDecimalsMap || arb.tokenDecimalsMap;
export const ltvMap: any = networkConfigs[currentChainId].ltvMap || arb.ltvMap;
export const tokenFullNameMap: any =
  networkConfigs[currentChainId].tokenFullNameMap || arb.tokenFullNameMap;
export const liqMap: any = networkConfigs[currentChainId].liqMap || arb.liqMap;
export const tokenToRateStrategyMap: any =
  networkConfigs[currentChainId].tokenToRateStrategyMap ||
  arb.tokenToRateStrategyMap;
export const liqPenaltyMap: any =
  networkConfigs[currentChainId].liqPenaltyMap || arb.liqPenaltyMap;
export const wrappedTokens: any =
  networkConfigs[currentChainId].wrappedTokens || arb.wrappedTokens;
export const wrappedTokenProtocolTokens: any =
  networkConfigs[currentChainId].wrappedTokenProtocolTokens ||
  arb.wrappedTokenProtocolTokens;
export const tokenToGradient: any =
  networkConfigs[currentChainId].tokenToGradient || arb.tokenToGradient;
export const oraclesMap: any =
  networkConfigs[currentChainId].oraclesMap || arb.oraclesMap;
export const excludeIsolatedPairs: any =
  networkConfigs[currentChainId].excludeIsolatedPairs ||
  arb.excludeIsolatedPairs;
export const excludeCoreReserves: any =
  networkConfigs[currentChainId].excludeCoreReserves || arb.excludeCoreReserves;
