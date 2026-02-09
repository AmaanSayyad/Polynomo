import { getDefaultConfig } from 'connectkit';
import { createConfig, http } from 'wagmi';
import { polygon, bsc } from 'wagmi/chains';

export const config = createConfig(
    getDefaultConfig({
        // Polygon first (primary); then BNB Chain
        chains: [polygon, bsc],
        transports: {
            [polygon.id]: http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL || undefined),
            [bsc.id]: http(),
        },

        // Required API Keys
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'dummy-id',

        // Required App Info
        appName: 'Polynomo',

        // Optional App Info
        appDescription: 'Polynomo on Polygon Chain',
        appUrl: 'https://family.co',
        appIcon: 'https://family.co/logo.png',
    }),
);
