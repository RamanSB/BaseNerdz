"use client";

import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import config from "../wagmi";
import GlobalContextProvider from "./contexts/GlobalContext";


const queryClient = new QueryClient();

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <GlobalContextProvider>
                {children}
            </GlobalContextProvider>
        </QueryClientProvider>
    </WagmiProvider>
}

export default Providers;