import Image from "next/image";

const Footer = () => {

    const navigateTo = (url: string) => { }

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


export default Footer;