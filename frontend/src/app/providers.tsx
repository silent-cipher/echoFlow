"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
  Chain,
} from "@rainbow-me/rainbowkit";
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
  localhost,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// configure galadriel chain

const galadriel = {
  id: 696969,
  name: "Galadriel Devnet",
  rpcUrls: {
    default: {
      http: ["https://devnet.galadriel.com"],
    },
  },
  nativeCurrency: {
    name: "Galadriel",
    symbol: "GAL",
    decimals: 18,
  },
  iconUrl: "/galadriel-logo.png",
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: "EthOnline_H",
  projectId: "EthOnline_1234",
  chains: [
    galadriel,
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
    localhost,
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#ffffff",
            accentColorForeground: "black",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
