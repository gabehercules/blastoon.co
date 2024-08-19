import Image from "next/image";

const getBlastToonNFTs = async (address: string) => {
  const options = {
    method: "GET",
    headers: {
      "x-api-key": "02fa7a93163a45049e6fbb3c07135825",
    },
  };

  const openSeaEndpoint = `https://api.opensea.io/api/v2/chain/blast/account/${address}/nfts?collection=blastoon-co-pass&limit=60`;

  const response = await fetch(openSeaEndpoint, options);

  const { nfts } = await response.json();

  console.log("NFTs found", nfts);

  return nfts;
};

export default async function TesteNFT() {
  const nfts = await getBlastToonNFTs(
    "0x61d86e45b920bb27c6afbf4d3da64ef5dd9699c9"
  );

  return (
    <div className="h-full">
      <h1>Open Sea NFT API</h1>
      <div className="h-full grid grid-cols-4 gap-6 overflow-y-auto">
        {nfts.map((nft: any) => (
          <div key={nft.identifier} className="p-4 rounded-lg">
            <Image
              src={`https://bafybeifa5dknjd7t7drkvjywu2voihxta67zcr75ugw5erqipktucc3xty.ipfs.4everland.io/${nft.identifier}.png`}
              width={160}
              height={160}
              alt={nft.name}
            />
            <h3>{nft.name}</h3>
            <p>{nft.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
