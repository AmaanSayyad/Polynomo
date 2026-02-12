/**
 * Polygon Backend Client
 * Used for administrative operations like withdrawals (POL from treasury)
 */

import { ethers } from 'ethers';
import { getPolygonConfig, getPolygonRpcUrl } from './config';

export function getTreasuryWallet(): ethers.Wallet {
  getPolygonConfig(); // ensure config is valid
  const secretKey = process.env.POLYGON_TREASURY_SECRET_KEY;
  if (!secretKey) {
    throw new Error('POLYGON_TREASURY_SECRET_KEY is not configured');
  }
  const rpcUrl = getPolygonRpcUrl();
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  return new ethers.Wallet(secretKey, provider);
}

/** Gas limit for native POL transfer (same as ETH). */
const POL_TRANSFER_GAS_LIMIT = BigInt(21000);

/** Fallback gas when gas station / getFeeData fails (e.g. "Batch size too large"). */
const FALLBACK_MAX_PRIORITY_FEE = ethers.parseUnits('40', 'gwei');
const FALLBACK_MAX_FEE = ethers.parseUnits('100', 'gwei');

function isRetryablePolygonError(e: unknown): boolean {
  const msg = String((e as Error)?.message ?? e).toLowerCase();
  return msg.includes('batch size too large') || msg.includes('could not coalesce') || msg.includes('unknown_error') || msg.includes('-32062');
}

/**
 * Transfer POL from treasury to a user.
 * Uses fallback gas to avoid gas-station failures; retries on RPC "Batch size too large".
 */
export async function transferPOLFromTreasury(
  toAddress: string,
  amountPOL: number
): Promise<string> {
  const wallet = getTreasuryWallet();
  const amountWei = ethers.parseEther(amountPOL.toString());

  let maxFeePerGas: bigint;
  let maxPriorityFeePerGas: bigint;
  try {
    const feeData = await wallet.provider!.getFeeData();
    if (feeData.maxFeePerGas != null && feeData.maxPriorityFeePerGas != null) {
      maxFeePerGas = feeData.maxFeePerGas;
      maxPriorityFeePerGas = feeData.maxPriorityFeePerGas;
    } else {
      maxFeePerGas = FALLBACK_MAX_FEE;
      maxPriorityFeePerGas = FALLBACK_MAX_PRIORITY_FEE;
    }
  } catch (e) {
    console.warn('Polygon getFeeData failed, using fallback gas:', (e as Error).message);
    maxFeePerGas = FALLBACK_MAX_FEE;
    maxPriorityFeePerGas = FALLBACK_MAX_PRIORITY_FEE;
  }

  const send = () =>
    wallet.sendTransaction({
      to: toAddress,
      value: amountWei,
      gasLimit: POL_TRANSFER_GAS_LIMIT,
      maxFeePerGas,
      maxPriorityFeePerGas,
    });

  const maxAttempts = 3;
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const tx = await send();
      console.log(`Withdrawal transaction sent: ${tx.hash}`);
      await tx.wait();
      console.log(`Withdrawal transaction confirmed: ${tx.hash}`);
      return tx.hash;
    } catch (e) {
      lastError = e;
      if (attempt < maxAttempts && isRetryablePolygonError(e)) {
        const delay = attempt * 1500;
        console.warn(`Polygon sendRawTransaction failed (attempt ${attempt}/${maxAttempts}), retrying in ${delay}ms:`, (e as Error).message);
        await new Promise((r) => setTimeout(r, delay));
      } else {
        throw e;
      }
    }
  }
  throw lastError;
}
