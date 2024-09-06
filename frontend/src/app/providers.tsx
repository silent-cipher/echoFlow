"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
  polygonMumbai,
  zora,
  filecoinCalibration,
  hardhat,
  goerli,
  arbitrumGoerli,
  fantomTestnet,
  optimismGoerli,
  avalancheFuji,
  moonbaseAlpha,
  celoAlfajores,
  mantleTestnet,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "EthOnline_H",
  projectId: "EthOnline_1234",
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
    polygonMumbai,
    zora,
    filecoinCalibration,
    hardhat,
    goerli,
    arbitrumGoerli,
    fantomTestnet,
    optimismGoerli,
    avalancheFuji,
    moonbaseAlpha,
    celoAlfajores,
    mantleTestnet,
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
