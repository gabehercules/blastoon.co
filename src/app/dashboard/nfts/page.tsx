import { env } from "@/env";

async function getAccountInfo() {
  const alchemyApiKey = env.ALCHEMY_API_KEY;
  const address = "0xef64444ba0ec0e38ca4d78e0c7996c8ab0f7c031";
  const contractAddress = "0x36af682901Dcb86D9Cff0D0e602857E3e07aA80D";

  const url = `https://blast-mainnet.g.alchemy.com/nft/v3/Ev8Sjz4bTQwZnoObCSPybY59NtCQNthf/getNFTsForOwner?owner=${address}`;
  const options: RequestInit = {
    method: "GET",
    headers: { accept: "application/json" },
  };

  const response = await fetch(url, options);

  console.log("RESPONSE DA BLAST", response);

  const data = await response.json();

  console.log("DATA DA BLAST", data);

  return data;
}

export default async function NFTs() {
  const accountInfo = await getAccountInfo();

  console.log("ACCOUNT INFO DA BLAST", accountInfo);

  return (
    <div>
      <h1>NFTs</h1>
    </div>
  );
}
