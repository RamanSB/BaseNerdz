"use client";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { useAccount, useReadContract } from "wagmi";
import config from "../wagmi";

import { BASE_NERDZ_ABI, BASE_BASE_NERDZ_CONTRACT_ADDRESS } from "@/app/utils/constants";
import { useEffect, useState } from "react";

const pacifico = Pacifico({
    subsets: ["latin"],
    weight: "400"
});

const Navbar = () => {
    const { isConnected } = useAccount({ config });
    return (<div className="navbar bg-base-100 sticky top-0 z-50 ">
        <div className="navbar-start" >
            <Image className="mx-1" src={"base-logo-in-blue.svg"} alt="" width={36} height={36} />
            <StatusIndicator isConnected={isConnected} />
        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost text-3xl lg:text-4xl" style={pacifico.style}>BaseNerdz</a>
        </div>
        <div className="navbar-end">
            <MintStats />
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
    const SCREEN_SIZE_BREAKPOINT = 500;
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= SCREEN_SIZE_BREAKPOINT);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= SCREEN_SIZE_BREAKPOINT);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isConnected ? (
        <p className="indicator-item indicator-middle indicator-start badge bg-lime-400 lg:py-4 text-black" >
            {isWideScreen && 'Connected'}
        </p>
    ) : (
        <p className="indicator-item indicator-middle indicator-start badge bg-red-600 lg:py-4 text-white" >
            {isWideScreen && 'Disconnected'}
        </p>
    )
}

export default Navbar;