"use client";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";

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
        <BaseNerdzGrid />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}


const ConnectButton = () => {
  return <button className="btn btn-primary my-4">Connect Wallet</button>
}

const BaseNerdzGrid = () => {
  const BASE_PATH = "https://ipfs.io/ipfs/QmZD2nh9f7mRrihdefwGGmBY7sFdWQ1vynuaY2AULaQXt4/<X>.png";
  const images: string[] = [BASE_PATH.replace("<X>", "94"), BASE_PATH.replace("<X>", "2"), BASE_PATH.replace("<X>", "8"), BASE_PATH.replace("<X>", "353"), BASE_PATH.replace("<X>", "643"), BASE_PATH.replace("<X>", "299"), BASE_PATH.replace("<X>", "555"), BASE_PATH.replace("<X>", "432")];
  return <div className="carousel carousel-center rounded-box my-4 ">
    {images.map((url, idx) => {
      return (<div key={idx} className="carousel-item w-1/3 lg:w-1/5">
        <img src={url} />
      </div>)
    })}
  </div>
};

const FAQ = () => {
  return (
    <div className="my-8 ">
      <div className="collapse collapse-plus bg-base-300">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">How to mint a BaseNerd?</div>
        <div className="collapse-content">
          <ul>
            <li className="my-1">1. <b>Connect Your Wallet</b>: Click the “Connect Wallet” button above to link your wallet.</li>
            <li className="my-1">2. <b>Ensure Correct Network</b>: Make sure you are connected to the Base Layer 2 network.</li>
            <li className="my-1">3. <b>Mint Your NFT</b>: Once connected, click the “Mint” button to mint a Base Nerd NFT.</li>
          </ul>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-300 my-2">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Benefits of a BaseNerd?</div>
        <div className="collapse-content">
          <p>This project is a milestone in my journey to master Solidity, developed after completing the <a className="link link-info" href="https://updraft.cyfrin.io/courses/advanced-foundry/how-to-create-an-NFT-collection/introduction-to-nfts">NFT lesson in Cyfrin’s Updraft course</a>. While there isn’t a concrete roadmap yet, your support means a lot to me. <br /><br />

            By purchasing a Base Nerd NFT, you are joining a community that believes in growth and learning. <br /><br />As I progress and build more advanced projects, I will reward early supporters like you with exclusive benefits and future rewards. Your trust and support now will be greatly valued and recognized in the future.</p>
        </div>
      </div>
    </div>
  )
}

const Footer = () => {

  const navigateTo = (url: string) => {

  }

  const BASE_PATH = "https://ipfs.io/ipfs/QmZD2nh9f7mRrihdefwGGmBY7sFdWQ1vynuaY2AULaQXt4/<X>.png";
  return <footer className="footer bg-neutral text-neutral-content p-10">
    <aside>
      <img src={BASE_PATH.replace("<X>", "666")} width={96} height={96} className="rounded-lg" />
      <p>
        BaseNerdz, Inc.
        <br />
        Created by 0xNascosta
      </p>
    </aside>
    <nav>
      <h6 className="footer-title">Social</h6>
      <div className="grid grid-flow-col gap-4">
        <div>

          <Image src="/twitter.png" alt="Twitter" height={48} width={48} onClick={() => navigateTo("wwww.x.com/0xNascosta")} />
        </div>
        <Image src="/github.png" alt="Github" height={48} width={48} onClick={() => navigateTo("wwww.github.com/RamanSB/BaseNerdz")} />
        <Image src="/discord.png" alt="Discord" height={48} width={48} onClick={() => navigateTo("wwww.x.com/0xNascosta")} />

      </div>
    </nav>
  </footer>
}

export default Home;

