"use client";
import BaseNerdzCarousel from "@/components/BaseNerdzCarousel";
import Countdown from "@/components/Countdown";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { formatEther } from "ethers";
import { Pacifico } from "next/font/google";
import React from "react";
import { type BaseError, Connector, useAccount, useConnect, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { ANVIL_BASE_NERDZ_ABI, ANVIL_BASE_NERDZ_CONTRACT_ADDRESS } from "./utils/constants";
import config from "../wagmi";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] })


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

  const { data: hash, error, isPending, writeContract } = useWriteContract({ config });

  const mint = async () => {
    try {
      writeContract({
        address: ANVIL_BASE_NERDZ_CONTRACT_ADDRESS,
        abi: ANVIL_BASE_NERDZ_ABI,
        functionName: 'mint',
        value: price,
        gas: BigInt(1000000)
      });
    } catch (error) {
      console.log("Error when minting: ", (error as BaseError).shortMessage, (error as BaseError).message);
    }
  }
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  console.log(isConfirming);
  console.log(isConfirmed);
  console.log(hash);

  function generateErrorMessage(error: BaseError): string {
    if (error) {
      console.log(error);
    }
    const errorMessage = (error as BaseError).message;
    if (errorMessage.includes("InsufficientMintAmount")) {
      return "Please provide a sufficient amount of ETH to mint."
    }
    if (errorMessage.includes("OnlyAllowedOneMint")) {
      return "Users are only permitted to mint one BaseNerd."
    }
    if (errorMessage.includes("SaleIsNotActive")) {
      return "Sale is inactiev."
    }
    if (errorMessage.includes("WithdrawlFailed")) {
      return "Withdrawl attempt failed."
    }
    if (errorMessage.includes("TotalSupplyMinted")) {
      return "All BaseNerdz have been minted. 😢"
    }
    return "";
  }

  return <>
    <button onClick={mint} disabled={!isSaleActive} className="btn btn-primary my-4">Mint {price && formatEther(price)} {'\u039E'} {(isPending || isConfirming) && <span className="loading loading-ring loading-lg"></span>}</button>
    {error && <div className="toast">
      <div role="alert" className="alert alert-error">
        <span>{generateErrorMessage(error as BaseError)}</span>
      </div>
    </div>}
  </>
}


export default Home;

