/**
 * Polygon Backend Client
 * Used for administrative operations like withdrawals (POL from treasury)
 */

import { ethers } from 'ethers';
import { getPolygonConfig } from './config';

export function getTreasuryWallet(): ethers.Wallet {
  const config = getPolygonConfig();
  const secretKey = process.env.POLYGON_TREASURY_SECRET_KEY;

  if (!secretKey) {
    throw new Error('POLYGON_TREASURY_SECRET_KEY is not configured');
  }

  const provider = new ethers.JsonRpcProvider(config.rpcEndpoint);
  return new ethers.Wallet(secretKey, provider);
}

/**
 * Transfer POL from treasury to a user
 */
export async function transferPOLFromTreasury(
  toAddress: string,
  amountPOL: number
): Promise<string> {
  const wallet = getTreasuryWallet();
  const amountWei = ethers.parseEther(amountPOL.toString());

  const tx = await wallet.sendTransaction({
    to: toAddress,
    value: amountWei,
  });

  console.log(`Withdrawal transaction sent: ${tx.hash}`);
  await tx.wait();
  console.log(`Withdrawal transaction confirmed: ${tx.hash}`);
  return tx.hash;
}
