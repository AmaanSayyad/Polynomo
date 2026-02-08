/**
 * Main Zustand store for Polynomo dApp
 * Combines wallet, game, and history slices
 * 
 * Polygon is primary (Polynomo); BNB and Solana supported.
 * Blockchain deposit/withdrawal is handled by network-specific backend clients.
 * Game logic remains off-chain.
 */

import { create } from "zustand";
import { WalletState, createWalletSlice } from "./walletSlice";
import { GameState, createGameSlice, startPriceFeed, startGlobalPriceFeed } from "./gameSlice";
import { HistoryState, createHistorySlice, restoreBetHistory } from "./historySlice";
import { BalanceState, createBalanceSlice } from "./balanceSlice";

/**
 * Combined store type
 */
export type PolynomoStore = WalletState & GameState & HistoryState & BalanceState;

/**
 * Create the main Zustand store
 * Combines all slices into a single store
 */
export const usePolynomoStore = create<PolynomoStore>()((...args) => ({
  ...createWalletSlice(...args),
  ...createGameSlice(...args),
  ...createHistorySlice(...args),
  ...createBalanceSlice(...args)
}));

/**
 * Initialize the store
 * Restores sessions, loads data
 * Should be called once on app initialization
 */
export const initializeStore = async (): Promise<void> => {
  const store = usePolynomoStore.getState();

  try {
    // Restore bet history from localStorage
    restoreBetHistory((bets) => {
      usePolynomoStore.setState({ bets });
    });

    // Load target cells
    await store.loadTargetCells();

    // Fetch house balance if wallet is connected
    if (store.address) {
      await store.fetchBalance(store.address);
    }

    // Start price feed polling
    const stopPriceFeed = store.startGlobalPriceFeed(store.updateAllPrices);

    // Store cleanup function for later use
    (window as any).__polynomoCleanup = () => {
      stopPriceFeed();
    };


    console.log("Polynomo store initialized successfully");
  } catch (error) {
    console.error("Error initializing store:", error);
  }
};

/**
 * Cleanup function
 * Stops price feed
 * Should be called when app is unmounted
 */
export const cleanupStore = (): void => {
  if ((window as any).__polynomoCleanup) {
    (window as any).__polynomoCleanup();
    delete (window as any).__polynomoCleanup;
  }
};

/**
 * Export individual selectors for optimized re-renders
 */
export const useWalletAddress = () => usePolynomoStore(state => state.address);
export const useWalletBalance = () => usePolynomoStore(state => state.walletBalance);
export const useIsConnected = () => usePolynomoStore(state => state.isConnected);
export const useCurrentPrice = () => usePolynomoStore(state => state.currentPrice);
export const usePriceHistory = () => usePolynomoStore(state => state.priceHistory);
export const useActiveRound = () => usePolynomoStore(state => state.activeRound);
export const useTargetCells = () => usePolynomoStore(state => state.targetCells);
export const useBetHistory = () => usePolynomoStore(state => state.bets);
export const useIsPlacingBet = () => usePolynomoStore(state => state.isPlacingBet);
export const useIsSettling = () => usePolynomoStore(state => state.isSettling);
export const useHouseBalance = () => usePolynomoStore(state => state.houseBalance);
export const useIsLoadingBalance = () => usePolynomoStore(state => state.isLoading);
export const useUserTier = () => usePolynomoStore(state => state.userTier);

/**
 * Export main store hook (alias for convenience)
 */
export const useStore = usePolynomoStore;

/**
 * Export actions
 * Note: These selectors return new objects on each call, which can cause infinite loops.
 * Use direct store access (usePolynomoStore(state => state.actionName)) instead.
 */
export const useWalletActions = () => {
  const connect = usePolynomoStore(state => state.connect);
  const disconnect = usePolynomoStore(state => state.disconnect);
  const refreshWalletBalance = usePolynomoStore(state => state.refreshWalletBalance);
  return { connect, disconnect, refreshWalletBalance };
};

export const useGameActions = () => {
  const placeBet = usePolynomoStore(state => state.placeBet);
  const placeBetFromHouseBalance = usePolynomoStore(state => state.placeBetFromHouseBalance);
  const settleRound = usePolynomoStore(state => state.settleRound);
  const updatePrice = usePolynomoStore(state => state.updatePrice);
  return { placeBet, placeBetFromHouseBalance, settleRound, updatePrice };
};

export const useHistoryActions = () => {
  const fetchHistory = usePolynomoStore(state => state.fetchHistory);
  const addBet = usePolynomoStore(state => state.addBet);
  const clearHistory = usePolynomoStore(state => state.clearHistory);
  return { fetchHistory, addBet, clearHistory };
};

export const useBalanceActions = () => {
  const fetchBalance = usePolynomoStore(state => state.fetchBalance);
  const setBalance = usePolynomoStore(state => state.setBalance);
  const updateBalance = usePolynomoStore(state => state.updateBalance);
  const depositFunds = usePolynomoStore(state => state.depositFunds);
  const withdrawFunds = usePolynomoStore(state => state.withdrawFunds);
  const clearError = usePolynomoStore(state => state.clearError);
  return { fetchBalance, setBalance, updateBalance, depositFunds, withdrawFunds, clearError };
};
