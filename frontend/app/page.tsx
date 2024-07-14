"use client";
import BaseNerdzCarousel from "@/components/BaseNerdzCarousel";
import Countdown from "@/components/Countdown";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { formatEther } from "ethers";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Log } from "viem";
import { Connector, useAccount, useConnect, useReadContract, useSwitchChain, useWaitForTransactionReceipt, useWatchContractEvent, useWriteContract, type BaseError } from "wagmi";
import config from "../wagmi";
import { BASE_BASE_NERDZ_CONTRACT_ADDRESS, BASE_NERDZ_ABI } from "./utils/constants";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] })


function Home() {
  const getActiveSaleResponse = useReadContract({ abi: BASE_NERDZ_ABI, address: BASE_BASE_NERDZ_CONTRACT_ADDRESS, functionName: "getActiveSale" });
  const isSaleActive: boolean = getActiveSaleResponse.data as boolean;
  const { isConnected, address } = useAccount();
  const [showModal, setShowModal] = useState(false);
  const baseNerdIdRef: MutableRefObject<number> = useRef(0);
  const { chains, switchChain } = useSwitchChain();

  const handleSuccessfulMint = (mintedBy: string, tokenId: BigInt) => {
    if (mintedBy === address) {
      console.log(`Minted By: ${address}`);
      console.log(`Address: ${address}`);
      baseNerdIdRef.current = tokenId as unknown as number;
      setShowModal(true);
    }
  }

  useWatchContractEvent({
    address: BASE_BASE_NERDZ_CONTRACT_ADDRESS, abi: BASE_NERDZ_ABI, eventName: "BaseNerdz__MintedNFT", onLogs: (logs: Log[]) => {
      console.log("Logs: ", logs);
      const log: Log = logs[0];
      const mintedBy = (log as any).args?.minter;
      const tokenId: BigInt = (log as any).args?.tokenId;
      handleSuccessfulMint(mintedBy, tokenId);
    }
  })


  useEffect(() => {
    if (isConnected) {
      switchChain({ chainId: 8453 })
    }
  }, [isConnected]);

  return (
    <div className="flex justify-center">
      <main className="flex flex-col min-h-screen items-center p-4 max-w-5xl">
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <p className=" text-base md:text-lg lg:text-xl lg:mt-2">
                In the vast expanse of the digital frontier, the <i><b style={{ color: "blue" }} className={pacifico.className}>Base Nerdz</b></i> stand as beacons of innovation and resilience.</p>
              <div className="flex flex-row justify-center my-4 lg:my-8">
                <Countdown />
              </div>
              <p className=" text-base md:text-lg lg:text-xl lg:mt-2">
                Each of the 777 unique NFTs symbolizes the relentless pursuit of knowledge, the courage to explore the unknown, and the unity of visionary minds. <br />
              </p>
            </div>
          </div>
        </div>
        {showModal && <MintModal closeModal={() => setShowModal(false)} tokenId={baseNerdIdRef.current} />}
        {!isConnected ? <ConnectButton /> : <MintButton isSaleActive={isSaleActive} />}
        <BaseNerdzCarousel />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}



const MintModal = ({ closeModal, tokenId }: { closeModal: Function, tokenId: number }) => {
  const BASE_PATH = "https://ipfs.io/ipfs/QmZD2nh9f7mRrihdefwGGmBY7sFdWQ1vynuaY2AULaQXt4/<X>.png";
  const OPEN_SEA_URL = `https://opensea.io/assets/base/0x2079516dd52851d9fc93e024c5fbb21b2b987804/${tokenId}`;
  const router = useRouter();
  return <div className="modal-box fixed flex flex-col glass">
    <h3 className="font-bold text-2xl mb-4" style={pacifico.style}>🎉 Successfully Minted BaseNerdz #{tokenId}</h3>
    <Image src={BASE_PATH.replace("<X>", tokenId + "")} alt="" width={500} height={300} />
    <div className="flex align-middle my-4">
      <div className="flex-1 inline-flex gap-2">
        <Image src="/opensea-logo.svg" alt="" height={48} width={48} onClick={() => { router.push(OPEN_SEA_URL) }} className="cursor-pointer" />
        <div className="flex flex-col align-middle">
          <Image src="/x_icon.svg" alt="" height={48} width={48} className="cursor-pointer" onClick={() => {
            const tweetText = encodeURIComponent(`Minted BaseNerdz#${tokenId}. \n\nMint yours at www.basenerdz.xyz! \n\nView on OpenSea: ${OPEN_SEA_URL}\n\n`);
            const hashtags = "BaseNerdz,NFT,Crypto,Base,BuildOnBase";
            const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&hashtags=${hashtags}`;
            window.open(twitterUrl, '_blank');
          }} />
        </div>
      </div>
      <button className="btn" onClick={() => closeModal()}>Close</button>
    </div>
  </div >

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
  const getPriceResponse = useReadContract({ abi: BASE_NERDZ_ABI, address: BASE_BASE_NERDZ_CONTRACT_ADDRESS, functionName: "getPrice" });
  const price: bigint = getPriceResponse.data as bigint;

  const { data: hash, error, isPending, writeContract } = useWriteContract({ config });

  const mint = async () => {
    try {
      writeContract({
        address: BASE_BASE_NERDZ_CONTRACT_ADDRESS,
        abi: BASE_NERDZ_ABI,
        functionName: 'mint',
        value: price,
        // gas: BigInt(1000000)
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

    if (errorMessage.includes("insufficient") || errorMessage.includes("Insufficient")) {
      return `${formatEther(price)} ETH required to mint.`
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

