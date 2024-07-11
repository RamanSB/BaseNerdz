"use client";
import BaseNerdzCarousel from "@/components/BaseNerdzCarousel";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { useConnect } from 'wagmi';
import { Connector } from "wagmi";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] })

/**
 * Write logic to connect to wallet on Anvil. 
 * Display UI to show if wallet is connected. (Add base logo In Footer.)
 * Add state keep track of connected display certain data based on whether connected.
 * Read from blockchain 
 */

function Home() {
  return (
    <div className="flex justify-center">
      <main className="flex flex-col min-h-screen  items-center p-4 max-w-5xl">
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-2xl">
              <p className=" text-base md:text-lg lg:text-xl lg:mt-4">

                In the vast expanse of the digital frontier, the <i><b style={{ color: "blue" }} className={pacifico.className}>Base Nerdz</b></i> stand as beacons of innovation and resilience.


                <br />
                <br />
                Each of the 777 unique NFTs symbolizes the relentless pursuit of knowledge, the courage to explore the unknown, and the unity of visionary minds. <br />

              </p>
            </div>
          </div>
        </div>
        <ConnectButton />
        <BaseNerdzCarousel />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}


const ConnectButton = () => {
  const { connectors, connect } = useConnect();
  console.log(connectors);
  const injectedConnector: Connector | undefined = connectors.find((connector: Connector) => connector.type === "injected");
  if (!injectedConnector) {
    return;
  }
  return <button className="btn btn-primary my-4" key={injectedConnector.uid} onClick={() => connect({ connector: injectedConnector })}>Connect Wallet</button>
}


export default Home;

