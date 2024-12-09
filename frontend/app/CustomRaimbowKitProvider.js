'use client';
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    hardhat,
    polygonAmoy
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

//e423921fcdb854a1edf8da0f1a65ccff

const config = getDefaultConfig({
    appName: 'blockchain-bank',
    projectId: 'e423921fcdb854a1edf8da0f1a65ccff',
    chains: [polygonAmoy, hardhat],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const RaimbowKitAndWagmiProvider = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default RaimbowKitAndWagmiProvider