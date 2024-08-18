"use server";

import { BLASTTOON_CONTRACT_ADDRESS } from "@/constants";
import prisma from "@/database/prisma";

export async function getNFTsByAddress(address: string) {
  const limit = 100; // make this a parameter later

  try {
    const response = await fetch(
      `https://blastapi.nftscan.com/api/v2/account/own/${address}?contract_address=${BLASTTOON_CONTRACT_ADDRESS}&limit=${limit}`,
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
  try {
    const nfts = await prisma.blastToonNfts.findMany({
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
