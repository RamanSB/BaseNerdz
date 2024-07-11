import { http, createConfig } from 'wagmi'
import { base } from 'wagmi/chains'
import { injected } from "wagmi/connectors";


const config = createConfig({
    chains: [base],
    connectors: [
        injected(),
    ],
    transports: {
        [base.id]: http()
    },
})

export default config;

