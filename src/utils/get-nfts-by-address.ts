"use server";

import { BLASTTOON_CONTRACT_ADDRESS } from "@/constants";
import prisma from "@/database/prisma";

// this function fetches the NFTs the user own in the NFTScan API
export async function fetchNFTsByAddress(address: string) {
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

// this function looks into our database to see if the user has any NFTs associated with
export async function getNFTsByAddressId(addressId: string) {
  try {
    const nfts = await prisma.blastToonNfts.findMany({
      where: {
        addressId: addressId,
      },
    });

    // console.log("NFTs found", nfts);

    return nfts;
  } catch (error) {
    console.error(error);
  }
}

export async function reverifyNfts(address: string, id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL
    : "http://localhost:3000";

  console.log("NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);

  const response = await fetch(`${baseUrl}/api/update/nfts`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      address,
    }),
  });

  if (!response.ok) {
    console.error("Failed to verify ownership. Response NOT OK");
    throw new Error("Failed to verify ownership. Response NOT OK");
  }

  const data = await response.json();

  const { message, total } = data;

  console.log("DATA", data);

  return { message, total };
}
