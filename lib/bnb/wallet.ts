/**
 * BNB Wallet Integration Module
 * Syncs Wagmi state with Zustand store
 */

import { useAccount, useChainId } from 'wagmi';
import { usePolynomoStore } from '@/lib/store';
import { useEffect } from 'react';
import { isPolygonChainId } from '@/lib/polygon/config';

/**
 * Hook for managing EVM wallet connection (Polygon mainnet or BNB)
 */
export function useWalletConnection() {
    const { address, isConnected, connector } = useAccount();
    const chainId = useChainId();

    // Get store actions
    const setAddress = usePolynomoStore(state => state.setAddress);
    const setIsConnected = usePolynomoStore(state => state.setIsConnected);
    const setNetwork = usePolynomoStore(state => state.setNetwork);
    const fetchBalance = usePolynomoStore(state => state.fetchBalance);
    const refreshWalletBalance = usePolynomoStore(state => state.refreshWalletBalance);

    const preferredNetwork = usePolynomoStore(state => state.preferredNetwork);
    const isPolygon = chainId !== undefined && isPolygonChainId(chainId);
    const isBNB = chainId === 56 || chainId === 97; // BSC mainnet / testnet
    const isEVMPreferred = preferredNetwork === 'POLYGON' || preferredNetwork === 'BNB' || preferredNetwork === null;

    useEffect(() => {
        if (address && isConnected && isEVMPreferred) {
            setAddress(address);
            setIsConnected(true);
            setNetwork(isPolygon ? 'POLYGON' : isBNB ? 'BNB' : 'POLYGON');

            fetchBalance(address).catch(console.error);
            refreshWalletBalance();

            if (typeof window !== 'undefined') {
                localStorage.setItem('polynomo_wallet_session', JSON.stringify({
                    address,
                    walletName: connector?.name || 'Injected',
                    chainId,
                    timestamp: Date.now()
                }));
            }
        } else if (!isConnected && (preferredNetwork === 'POLYGON' || preferredNetwork === 'BNB')) {
            setAddress(null);
            setIsConnected(false);
            if (typeof window !== 'undefined') {
                localStorage.removeItem('polynomo_wallet_session');
            }
        }
    }, [address, isConnected, connector, chainId, isPolygon, isBNB, isEVMPreferred, preferredNetwork, setAddress, setIsConnected, setNetwork, fetchBalance, refreshWalletBalance]);

    return {
        address,
        isConnected,
        walletName: connector?.name || null
    };
}
