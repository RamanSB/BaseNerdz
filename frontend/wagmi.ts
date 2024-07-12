import { http, createConfig } from 'wagmi'
import { base, localhost, anvil } from 'wagmi/chains'
import { injected } from "wagmi/connectors";


const config = createConfig({
    chains: [anvil],
    connectors: [
        injected(),
    ],
    transports: {
        [anvil.id]: http(),
        [base.id]: http()
    },
})

export default config;

