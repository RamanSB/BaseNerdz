"use client";
import { Pacifico } from "next/font/google";
import { useAccount, useReadContract } from "wagmi";
import config from "../wagmi";

import { BASE_BASE_NERDZ_CONTRACT_ADDRESS, BASE_NERDZ_ABI } from "@/app/utils/constants";

const pacifico = Pacifico({
    subsets: ["latin"],
    weight: "400"
});

const Navbar = () => {
    const { isConnected } = useAccount({ config });
    return (<div className="navbar bg-base-100 sticky top-0 z-50 ">
        <div className="navbar-start" >
            <MintStats />
        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost text-3xl lg:text-4xl" style={pacifico.style}>BaseNerdz</a>
        </div>
        <div className="navbar-end">
            <StatusIndicator isConnected={isConnected} />
        </div>
    </div>)
}

const MintStats = () => {
    const { data: nftsMinted } = useReadContract({ abi: BASE_NERDZ_ABI, address: BASE_BASE_NERDZ_CONTRACT_ADDRESS, functionName: "getTokenId" });

    return <div className="stats shadow">
        <div className="stat">
            <div className="stat-title">{(nftsMinted as bigint)?.toString()}/777</div>
        </div>
    </div>
}


function StatusIndicator({ isConnected }: { isConnected: boolean }) {

    return isConnected ? (
        <p className="indicator-item indicator-middle indicator-start badge bg-lime-400 lg:py-4 text-black" >
            Connected
        </p>
    ) : (
        <p className="indicator-item indicator-middle indicator-start badge bg-red-600 lg:py-4 text-white" >
            Disconnected
        </p>
    )
}

export default Navbar;