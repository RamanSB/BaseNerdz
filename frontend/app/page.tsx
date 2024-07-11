import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ weight: "400", subsets: ["latin"] })

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="hero mt-6 ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold" style={pacifico.style}>Base Nerdz</h1>

            <p className="py-6">
              In the vast expanse of the digital frontier, the <i><b style={{ color: "blue" }}>Base Nerdz</b></i> stand as beacons of innovation and resilience.
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
    </main>
  );
}


const ConnectButton = () => {
  return <button className="btn btn-primary mb-8">Connect Wallet</button>
}

const BaseNerdzGrid = () => {
  const BASE_PATH = "https://ipfs.io/ipfs/QmZD2nh9f7mRrihdefwGGmBY7sFdWQ1vynuaY2AULaQXt4/<X>.png";
  const images: string[] = [BASE_PATH.replace("<X>", "94"), BASE_PATH.replace("<X>", "2"), BASE_PATH.replace("<X>", "8"), BASE_PATH.replace("<X>", "353"), BASE_PATH.replace("<X>", "643"), BASE_PATH.replace("<X>", "299"), BASE_PATH.replace("<X>", "555"), BASE_PATH.replace("<X>", "432")];
  return <div className="carousel carousel-center rounded-box">
    {images.map((url, idx) => {
      return (<div className="carousel-item w-1/3">
        <img src={url} />
      </div>)
    })}
  </div>
};

const FAQ = () => {
  return (
    <div className="my-8">
      <div className="collapse collapse-plus bg-base-200">
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

      <div className="collapse collapse-plus bg-base-200 my-2">
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

export default Home;

