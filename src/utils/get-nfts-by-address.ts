export async function getNFTsByAddress(address: string) {
  const blasttoonContract = "0x36af682901Dcb86D9Cff0D0e602857E3e07aA80D"; // move later to a CONSTANTS file?

  const limit = 20;

  try {
    const response = await fetch(
      `https://blastapi.nftscan.com/api/v2/account/own/${address}?contract_address=${blasttoonContract}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_NFTSCAN_API_KEY as string,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
