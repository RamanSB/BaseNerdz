"use client";
import BaseNerdzCarousel from "@/components/BaseNerdzCarousel";
import Countdown from "@/components/Countdown";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { formatEther } from "ethers";
import { Pacifico } from "next/font/google";
import React from "react";
import { Connector, useAccount, useConnect, useReadContract, useWriteContract } from "wagmi";
import { ANVIL_BASE_NERDZ_ABI, ANVIL_BASE_NERDZ_CONTRACT_ADDRESS } from "./utils/constants";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] })

/**
 * Write logic to connect to wallet on Anvil. 
 * Display UI to show if wallet is connected. (Add base logo In Footer.)
 * Add state keep track of connected display certain data based on whether connected.
 * Read from blockchain 
 */

function Home() {

  const getActiveSaleResponse = useReadContract({ abi: ANVIL_BASE_NERDZ_ABI, address: ANVIL_BASE_NERDZ_CONTRACT_ADDRESS, functionName: "getActiveSale" });
  const isSaleActive: boolean = getActiveSaleResponse.data as boolean;
  const { isConnected, address } = useAccount();
  console.log(`isConnected: ${isConnected}`);
  return (
    <div className="flex justify-center">
      <main className="flex flex-col min-h-screen  items-center p-4 max-w-5xl">

        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <p className=" text-base md:text-lg lg:text-xl lg:mt-2">
                In the vast expanse of the digital frontier, the <i><b style={{ color: "blue" }} className={pacifico.className}>Base Nerdz</b></i> stand as beacons of innovation and resilience.</p>
              <div className="flex flex-row justify-center my-4 lg:my-8">
                <Countdown isSaleActive={isSaleActive} />
              </div>
              <p className=" text-base md:text-lg lg:text-xl lg:mt-2">
                Each of the 777 unique NFTs symbolizes the relentless pursuit of knowledge, the courage to explore the unknown, and the unity of visionary minds. <br />
              </p>
            </div>
          </div>
        </div>
        {!isConnected ? <ConnectButton /> : <MintButton isSaleActive={isSaleActive} />}
        <BaseNerdzCarousel />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}


const ConnectButton: React.FC = () => {
  const { connectors, connect } = useConnect();
  const injectedConnector: Connector | undefined = connectors.find((connector: Connector) => connector.type === "injected");
  if (!injectedConnector) {
    return;
  }
  return <button className="btn btn-primary my-4" key={injectedConnector.uid} onClick={() => connect({ connector: injectedConnector })}>Connect Wallet</button>;
}


const MintButton: React.FC<{ isSaleActive: boolean }> = ({ isSaleActive }) => {

  const getPriceResponse = useReadContract({ abi: ANVIL_BASE_NERDZ_ABI, address: ANVIL_BASE_NERDZ_CONTRACT_ADDRESS, functionName: "getPrice" });
  const price: bigint = getPriceResponse.data as bigint;
  console.log(`Price: ${price?.toString()}`);
  const { error, isPending, writeContract } = useWriteContract();

  const mint = async () => {
    try {
      const getPriceResponse = useReadContract({ abi: ANVIL_BASE_NERDZ_ABI, address: ANVIL_BASE_NERDZ_CONTRACT_ADDRESS, functionName: "getPrice" });
      const latestPrice: bigint = getPriceResponse.data as bigint;
      writeContract({
        address: ANVIL_BASE_NERDZ_CONTRACT_ADDRESS,
        abi: ANVIL_BASE_NERDZ_ABI,
        functionName: 'mint',
        value: latestPrice
      });
      console.log(`#2) isPending: ${isPending}`);
      console.log(`Error: ${error}`);
    } catch (error) {
      console.log("Error when minting: ", error);
    }
  }
  return <button onClick={mint} disabled={!isSaleActive} className="btn btn-primary my-4">Mint {price && formatEther(price)} {'\u039E'}</button>
}


export default Home;

