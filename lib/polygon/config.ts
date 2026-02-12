/**
 * Polygon Network Configuration (mainnet only)
 */

export interface PolygonConfig {
  network: string;
  rpcEndpoint: string;
  chainId: number;
  treasuryAddress: string;
}

const POLYGON_MAINNET_CHAIN_ID = 137;

/** Default public RPC (can be rate-limited; prefer Alchemy/Infura for withdrawals). */
const DEFAULT_POLYGON_RPC = 'https://polygon-rpc.com';

/**
 * RPC URL for server-side use (withdrawals). Prefer POLYGON_RPC_URL for reliability.
 */
export function getPolygonRpcUrl(): string {
  return process.env.POLYGON_RPC_URL || process.env.NEXT_PUBLIC_POLYGON_RPC_URL || DEFAULT_POLYGON_RPC;
}

/**
 * Get Polygon configuration from environment variables
 */
export function getPolygonConfig(): PolygonConfig {
  const rpcEndpoint = process.env.NEXT_PUBLIC_POLYGON_RPC_URL || DEFAULT_POLYGON_RPC;
  const treasuryAddress = process.env.NEXT_PUBLIC_POLYGON_TREASURY_ADDRESS || '';

  if (!treasuryAddress && process.env.NODE_ENV === 'development') {
    console.warn('Missing NEXT_PUBLIC_POLYGON_TREASURY_ADDRESS for withdrawals.');
  }

  return {
    network: 'mainnet',
    rpcEndpoint,
    chainId: POLYGON_MAINNET_CHAIN_ID,
    treasuryAddress,
  };
}

export function isPolygonChainId(chainId: number): boolean {
  return chainId === POLYGON_MAINNET_CHAIN_ID;
}
