export async function getNFTsByOwner(address: string) {
  //   const nftScanBlastUrl = "https://blastapi.nftscan.com/api";
  const nftsByUserEndpoint = `/v2/account/own/all`;

  const res = await fetch(
    `https://blastapi.nftscan.com/api${nftsByUserEndpoint}/${address}`,
    {
      method: "GET",
      headers: {
        "x-api-key": process.env.NFTSCAN_API_KEY as string,
      },
    }
  );
  const data = await res.json();

  console.log("NFTs by this address", data);
  return data.assets;
}
