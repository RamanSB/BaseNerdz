function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="hero my-8">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Base Nerdz</h1>
            <p className="py-6">
              <i>In the vast expanse of the digital frontier, the Base Nerdz stand as beacons of innovation and resilience.
                <br />
                <br />
                Each of the 777 unique NFTs symbolizes the relentless pursuit of knowledge, the courage to explore the unknown, and the unity of visionary minds. <br /><br /> As architects of the BaseChain, we transcend the ordinary, forging paths where none existed, and illuminating the future with our collective brilliance.
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
  const images = ["https://oaidalleapiprodscus.blob.core.windows.net/private/org-AS6X3qtOxVzBFMp5egGVyqHF/user-KxcAiylDhyQPqkR9OCAxks1j/img-y6sZSilH89EhHQbBI0fbegfq.png?st=2024-06-25T16%3A57%3A28Z&se=2024-06-25T18%3A57%3A28Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-25T16%3A51%3A25Z&ske=2024-06-26T16%3A51%3A25Z&sks=b&skv=2023-11-03&sig=xb%2BfdgHTQlkjUcB4V8STc53FaQedyHCcO5wttKMub9I%3D", "https://oaidalleapiprodscus.blob.core.windows.net/private/org-AS6X3qtOxVzBFMp5egGVyqHF/user-KxcAiylDhyQPqkR9OCAxks1j/img-Hw1ZtTrzt9aZm9z51dvPs8Pw.png?st=2024-06-25T16%3A56%3A33Z&se=2024-06-25T18%3A56%3A33Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-25T16%3A53%3A08Z&ske=2024-06-26T16%3A53%3A08Z&sks=b&skv=2023-11-03&sig=u/WvyRBSQ4kxeu9mg8ZZasUDldRIE%2B6M46Lq25kmpDI%3D", "https://oaidalleapiprodscus.blob.core.windows.net/private/org-AS6X3qtOxVzBFMp5egGVyqHF/user-KxcAiylDhyQPqkR9OCAxks1j/img-PWKh6Y1XmrKGdeBYBoof8Ifk.png?st=2024-06-25T16%3A56%3A23Z&se=2024-06-25T18%3A56%3A23Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-25T17%3A11%3A33Z&ske=2024-06-26T17%3A11%3A33Z&sks=b&skv=2023-11-03&sig=HAlBduYGKT/5u8oBtiGtI%2BlRsRaGRv8H99y3DE7Ae%2B8%3D", "https://oaidalleapiprodscus.blob.core.windows.net/private/org-AS6X3qtOxVzBFMp5egGVyqHF/user-KxcAiylDhyQPqkR9OCAxks1j/img-TiwvVPFsMlYi3hXTYHXt8stT.png?st=2024-06-25T16%3A55%3A55Z&se=2024-06-25T18%3A55%3A55Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-25T16%3A59%3A48Z&ske=2024-06-26T16%3A59%3A48Z&sks=b&skv=2023-11-03&sig=AbWoFmdaKpJnRijp9E5PrZ%2BH0GZqEXLj82BEhoYjXfY%3D", "https://oaidalleapiprodscus.blob.core.windows.net/private/org-AS6X3qtOxVzBFMp5egGVyqHF/user-KxcAiylDhyQPqkR9OCAxks1j/img-y6sZSilH89EhHQbBI0fbegfq.png?st=2024-06-25T16%3A57%3A28Z&se=2024-06-25T18%3A57%3A28Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-25T16%3A51%3A25Z&ske=2024-06-26T16%3A51%3A25Z&sks=b&skv=2023-11-03&sig=xb%2BfdgHTQlkjUcB4V8STc53FaQedyHCcO5wttKMub9I%3D", "https://oaidalleapiprodscus.blob.core.windows.net/private/org-AS6X3qtOxVzBFMp5egGVyqHF/user-KxcAiylDhyQPqkR9OCAxks1j/img-Hw1ZtTrzt9aZm9z51dvPs8Pw.png?st=2024-06-25T16%3A56%3A33Z&se=2024-06-25T18%3A56%3A33Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-25T16%3A53%3A08Z&ske=2024-06-26T16%3A53%3A08Z&sks=b&skv=2023-11-03&sig=u/WvyRBSQ4kxeu9mg8ZZasUDldRIE%2B6M46Lq25kmpDI%3D", "https://oaidalleapiprodscus.blob.core.windows.net/private/org-AS6X3qtOxVzBFMp5egGVyqHF/user-KxcAiylDhyQPqkR9OCAxks1j/img-PWKh6Y1XmrKGdeBYBoof8Ifk.png?st=2024-06-25T16%3A56%3A23Z&se=2024-06-25T18%3A56%3A23Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-25T17%3A11%3A33Z&ske=2024-06-26T17%3A11%3A33Z&sks=b&skv=2023-11-03&sig=HAlBduYGKT/5u8oBtiGtI%2BlRsRaGRv8H99y3DE7Ae%2B8%3D", "https://oaidalleapiprodscus.blob.core.windows.net/private/org-AS6X3qtOxVzBFMp5egGVyqHF/user-KxcAiylDhyQPqkR9OCAxks1j/img-TiwvVPFsMlYi3hXTYHXt8stT.png?st=2024-06-25T16%3A55%3A55Z&se=2024-06-25T18%3A55%3A55Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-25T16%3A59%3A48Z&ske=2024-06-26T16%3A59%3A48Z&sks=b&skv=2023-11-03&sig=AbWoFmdaKpJnRijp9E5PrZ%2BH0GZqEXLj82BEhoYjXfY%3D"];
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

