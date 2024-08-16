"use server";

import prisma from "@/database/prisma";

export async function getNFTsByAddress(address: string) {
  const blasttoonContract = "0x36af682901Dcb86D9Cff0D0e602857E3e07aA80D"; // move later to a CONSTANTS file?

  const limit = 100; // make this a parameter later

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

    console.log("NFTs found", data);

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getNFTsByUserId(userId: number) {
  const blasttoonContract = "0x36af682901Dcb86D9Cff0D0e602857E3e07aA80D"; // move later to a CONSTANTS file?
  try {
    const nfts = await prisma.nfts.findMany({
      where: {
        userId: userId,
      },
    });

    // console.log("NFTs found", nfts);

    return nfts;
  } catch (error) {
    console.error(error);
  }
}

// this function is called once after the user has logged in for the first time
export async function verifyNFTOwnership(id: number, address: string) {
  // ------------------- TESTING ---------------------------- //
  // this will check for a DEV_PREVIEW_URL at the vercel env  //
  // defined variables... Will need to change this to dinamic //
  // check for the environment... --------------------------- //
  // ------------------- TESTING ---------------------------- //
  const baseUrl = process.env.DEV_PREVIEW_URL
    ? `https://${process.env.DEV_PREVIEW_URL}`
    : "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/update/nfts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        address,
      }),
    });

    // --------------- JUST REMEBER: ------------------------ //
    // After the response has been serialized into JSON ----- //
    // INSIDE[!!!] the route handler the response should ---- //
    // not be serialized again when calling the route handler //
    // --------------- JUST REMEBER: ------------------------ //

    console.log("RESPONSE FROM UPDATE NFTS", response.body);

    return response;
  } catch (error) {
    console.error("ERROR VERIFYING OWNSHIP", error);
  }
}
