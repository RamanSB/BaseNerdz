import { Pacifico } from "next/font/google";

const oxygen = Pacifico({ weight: "400", subsets: ["latin"] })

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="hero my-8">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold" style={oxygen.style}>Base Nerdz</h1>
            <p className="py-6">
              <i>In the vast expanse of the digital frontier, the Base Nerdz stand as beacons of innovation and resilience.
                <br />
                <br />
                Each of the 777 unique NFTs symbolizes the relentless pursuit of knowledge, the courage to explore the unknown, and the unity of visionary minds. <br />
              </i>
            </p>
            <button className="btn btn-primary">Connect Wallet</button>
          </div>
        </div>
      </div>
      <BaseNerdzGrid />
    </main>
  );
}


const BaseNerdzGrid = () => {
  const images: string[] = [];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={index} className="card shadow-lg">
            <figure className="p-2">
              <img src={url} alt={`Base Nerd ${index + 1}`} className="w-full h-full object-cover" />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

