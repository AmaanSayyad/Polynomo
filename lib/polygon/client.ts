/**
 * Polygon SDK Integration Module
 * Native POL balance and provider for Polygon mainnet / Amoy testnet
 */

import { ethers } from 'ethers';
import { getPolygonConfig } from './config';

let provider: ethers.JsonRpcProvider | null = null;

export function getPolygonProvider(): ethers.JsonRpcProvider {
  if (!provider) {
    const config = getPolygonConfig();
    provider = new ethers.JsonRpcProvider(config.rpcEndpoint);
  }
  return provider;
}

/**
 * Get POL balance for a given address
 */
export async function getPOLBalance(address: string): Promise<number> {
  const prov = getPolygonProvider();
  try {
    const balance = await prov.getBalance(address);
    return parseFloat(ethers.formatEther(balance));
  } catch (error) {
    console.error('Failed to get POL balance:', error);
    return 0;
  }
}

/**
 * Get treasury POL balance
 */
export async function getTreasuryBalance(): Promise<number> {
  const config = getPolygonConfig();
  if (!config.treasuryAddress) return 0;
  return getPOLBalance(config.treasuryAddress);
}

/**
 * Handle transaction errors
 */
export function handleTransactionError(error: unknown): Error {
  const message = error instanceof Error ? error.message?.toLowerCase() || '' : String(error).toLowerCase();
  if (
    message.includes('user rejected') ||
    message.includes('action_rejected') ||
    message.includes('user_rejected')
  ) {
    return new Error('Transaction was cancelled by user.');
  }
  if (message.includes('insufficient funds') || message.includes('insufficient balance')) {
    return new Error('Insufficient POL balance for this transaction.');
  }
  if (error instanceof Error) return new Error(`Transaction failed: ${error.message}`);
  return new Error('Transaction failed. Please try again.');
}
