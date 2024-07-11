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


export default FAQ;