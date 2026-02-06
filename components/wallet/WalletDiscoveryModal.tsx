'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useModal } from 'connectkit';
import { useAccount } from 'wagmi';
import { useWallet } from '@solana/wallet-adapter-react';
import { usePolynomoStore } from '@/lib/store';

interface WalletDiscoveryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WalletDiscoveryModal: React.FC<WalletDiscoveryModalProps> = ({ isOpen, onClose }) => {
    const { setVisible: setSolanaVisible } = useWalletModal();
    const { setOpen: setEVMVisible } = useModal();

    const setPreferredNetwork = usePolynomoStore(state => state.setPreferredNetwork);

    const handlePolygonConnect = () => {
        setPreferredNetwork('POLYGON');
        onClose();
        setTimeout(() => setEVMVisible(true), 100);
    };

    const handleBNBConnect = () => {
        setPreferredNetwork('BNB');
        onClose();
        setTimeout(() => setEVMVisible(true), 100);
    };

    const handleSolanaConnect = () => {
        setPreferredNetwork('SOL');
        onClose();
        setTimeout(() => setSolanaVisible(true), 100);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Connect Wallet"
        >
            <div className="relative">

                <div className="relative space-y-4">
                    <p className="text-[9px] text-white/30 font-bold uppercase tracking-[0.25em] mb-2 px-1 animate-in fade-in slide-in-from-left-2 duration-500">
                        Available Networks
                    </p>

                    <div className="grid grid-cols-1 gap-3">
                        {/* Polygon Mainnet */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                            <button
                                onClick={handlePolygonConnect}
                                className="group relative w-full flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-transparent border border-white/5 rounded-2xl hover:border-purple-500/30 transition-all duration-300 text-left overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-600/5 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-purple-500/10">
                                    <svg className="w-7 h-7 text-purple-400" viewBox="0 0 38.4 33.5" fill="currentColor"><path d="M29 10.2c-.7-.4-1.6-.4-2.4 0L21 13.5l-3.8 2.1-5.5 3.3c-.7.4-1.6.4-2.4 0l-4.3-2.6c-.7-.4-1.2-1.2-1.2-2.1v-5c0-.8.4-1.6 1.2-2.1l4.3-2.5c.7-.4 1.6-.4 2.4 0l4.3 2.6c.7.4 1.2 1.2 1.2 2.1v3.3l3.8-2.2v-3.3c0-.8-.4-1.6-1.2-2.1l-8-4.7c-.7-.4-1.6-.4-2.4 0l-8.1 4.7c-.7.4-1.2 1.2-1.2 2.1v9.4c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l5.5-3.2 3.8-2.2 5.5-3.2c.7-.4 1.6-.4 2.4 0l4.3 2.5c.7.4 1.2 1.2 1.2 2.1v5c0 .8-.4 1.6-1.2 2.1l-4.2 2.5c-.7.4-1.6.4-2.4 0l-4.3-2.5c-.7-.4-1.2-1.2-1.2-2.1v-3.2l-3.8 2.2v3.3c0 .8.4 1.6 1.2 2.1l8.1 4.7c.7.4 1.6.4 2.4 0l8.1-4.7c.7-.4 1.2-1.2 1.2-2.1V17c0-.8-.4-1.6-1.2-2.1l-8-4.6z"/></svg>
                                </div>

                                <div className="relative flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-white font-bold text-base tracking-tight">Polygon</h3>
                                        <span className="text-[8px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20 font-bold uppercase">Primary</span>
                                        <span className="text-[8px] bg-white/5 text-gray-400 px-1.5 py-0.5 rounded border border-white/10 font-bold uppercase">Mainnet</span>
                                    </div>
                                    <p className="text-gray-500 text-[11px] mt-0.5 font-medium">MetaMask, WalletConnect, POL</p>
                                </div>

                                <div className="relative opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                    <svg className="w-5 h-5 text-purple-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {/* BNB Chain (optional) */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 delay-75 duration-500 fill-mode-both">
                            <button
                                onClick={handleBNBConnect}
                                className="group relative w-full flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-transparent border border-white/5 rounded-2xl hover:border-yellow-500/30 transition-all duration-300 text-left overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 flex items-center justify-center border border-yellow-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-yellow-500/10">
                                    <img src="/logos/bnb-bnb-logo.png" alt="BNB" className="w-7 h-7 object-contain" onError={(e) => (e.currentTarget.src = "https://cryptologos.cc/logos/binance-coin-bnb-logo.png")} />
                                </div>
                                <div className="relative flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-white font-bold text-base tracking-tight">BNB Chain</h3>
                                        <span className="text-[8px] bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded border border-yellow-500/20 font-bold uppercase">Mainnet</span>
                                    </div>
                                    <p className="text-gray-500 text-[11px] mt-0.5 font-medium">MetaMask, Trust, Binance Wallet</p>
                                </div>
                                <div className="relative opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                    <svg className="w-5 h-5 text-yellow-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        {/* Solana Selection */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 delay-100 duration-500 fill-mode-both">
                            <button
                                onClick={handleSolanaConnect}
                                className="group relative w-full flex items-center gap-4 p-4 bg-gradient-to-r from-white/5 to-transparent border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all duration-300 text-left overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/5 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg shadow-blue-500/10">
                                    <img src="/logos/solana-sol-logo.png" alt="Solana" className="w-7 h-7 object-contain" onError={(e) => (e.currentTarget.src = "https://cryptologos.cc/logos/solana-sol-logo.png")} />
                                </div>

                                <div className="relative flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-white font-bold text-base tracking-tight">Solana</h3>
                                        <span className="text-[8px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20 font-bold uppercase">Mainnet</span>
                                    </div>
                                    <p className="text-gray-500 text-[11px] mt-0.5 font-medium">Phantom, Solflare, Backpack</p>
                                </div>

                                <div className="relative opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                    <svg className="w-5 h-5 text-blue-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
