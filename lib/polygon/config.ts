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

/**
 * Get Polygon configuration from environment variables
 */
export function getPolygonConfig(): PolygonConfig {
  const rpcEndpoint =
    process.env.NEXT_PUBLIC_POLYGON_RPC_URL || 'https://polygon-rpc.com';
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
