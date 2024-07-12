import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = () => {
    const router = useRouter();
    const navigateTo = (url: string) => {
        router.push("https://" + url);
    }

    const BASE_PATH = "https://ipfs.io/ipfs/QmZD2nh9f7mRrihdefwGGmBY7sFdWQ1vynuaY2AULaQXt4/<X>.png";
    return <footer className="footer bg-neutral text-neutral-content p-10">
        <aside>
            <Image src={BASE_PATH.replace("<X>", "666")} width={96} height={96} className="rounded-lg" alt="" />
            <div className="flex flex-row mt-2">
                <Image className="mr-2" src={"base-logo-in-blue.svg"} alt="" width={36} height={36} />
                <p>
                    BaseNerdz, Inc.
                    <br />
                    Created by 0xNascosta
                </p>
            </div>
        </aside>
        <nav>
            <h6 className="footer-title">Social</h6>
            <div className="grid grid-flow-col gap-4">

                <Image src="/twitter.png" alt="Twitter" height={48} width={48} onClick={() => navigateTo("www.x.com/0xNascosta")} />

                <Image src="/github.png" alt="Github" height={48} width={48} onClick={() => navigateTo("www.github.com/RamanSB/BaseNerdz")} />
                <Image src="/discord.png" alt="Discord" height={48} width={48} onClick={() => navigateTo("www.x.com/0xNascosta")} />

            </div>
        </nav>
    </footer>
}


export default Footer;