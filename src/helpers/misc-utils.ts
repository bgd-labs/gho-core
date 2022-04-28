import { BigNumber } from 'ethers';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Signer } from 'ethers';

export let DRE: HardhatRuntimeEnvironment;

export const setDRE = (_DRE) => {
  DRE = _DRE;
};

declare var hre: HardhatRuntimeEnvironment;

export const evmSnapshot = async () => await hre.ethers.provider.send('evm_snapshot', []);

export const evmRevert = async (id: string) => hre.ethers.provider.send('evm_revert', [id]);

export const timeLatest = async () => {
  const block = await hre.ethers.provider.getBlock('latest');
  return BigNumber.from(block.timestamp);
};

export const setBlocktime = async (time: number) => {
  await hre.ethers.provider.send('evm_setNextBlockTimestamp', [time]);
};

export const mine = async () => {
  await hre.ethers.provider.send('evm_mine', []);
};

export const impersonateAccountHardhat = async (account: string): Promise<Signer> => {
  await DRE.network.provider.send('hardhat_setBalance', [account, '0xFFFFFFFFFFFFFFFFFFFFFFFFF']);

  await DRE.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [account],
  });
  return await DRE.ethers.getSigner(account);
};