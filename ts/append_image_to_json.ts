import fs from "fs";

/**
 * 1) Load up the base_nerdz_nft_v5.json file (Preserve a non-writable copy incase I fuck anything up.)
 * 2) Define the base path for the image files stored on IPFS: https://ipfs.io/ipfs/QmTBsejzdt6qmvzRbBRNjyxhodqqpSqKqqKg1zQi9TyYbf/
 * 3) Iterate through each of the JSON elements in order and append the new key-values.
 * 4) Write the JSON object to a new file.
 */

const file = fs.readFileSync("../base_nerdz_nfts_v5.json");
const tokenUriNoImage: any/* { [key: string]: any }  */ = JSON.parse(file.toString());
const BASE_PATH = "https://ipfs.io/ipfs/QmTBsejzdt6qmvzRbBRNjyxhodqqpSqKqqKg1zQi9TyYbf/";
for (let tokenUri of tokenUriNoImage) {
    const tokenIdx = tokenUri['name'].replace("BaseNerdz-", "");
    tokenUri['imageUrl'] = BASE_PATH + "token-" + tokenIdx + ".png";
    fs.writeFileSync(`../base-nerdz/token-uris/${tokenIdx}`, JSON.stringify(tokenUri));
    "".replace
}

// Writes entire file to local dir
fs.writeFileSync("../token-uris.json", JSON.stringify(tokenUriNoImage));

