"use server";

import prisma from "@/database/prisma";
import { verifyNFTOwnership } from "./get-nfts-by-address";
import { calculateCheese, updateCheese } from "./cheese";

export async function firstVerify(id: number, address: string) {
  // verify if the user has already verified their NFTs
  const isFirstVerified = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      firstVerified: true,
      address: true,
      id: true,
    },
  });

  console.log("IS FIRST VERIFIED", isFirstVerified?.firstVerified);

  // if the user has not verified (eg: false) then verify the NFTs
  if (!isFirstVerified?.firstVerified) {
    console.log("CAIU NO IF?......................................");
    // call the first verification function
    console.log("USER HAS NOT VERIFIED NFTS OWNERSHIP, VERIFYING...");

    const verifiedNFTs = await verifyNFTOwnership(Number(id), address);

    console.log(
      "VERIFIED OWNERSHIP... " + verifiedNFTs + " NOW CALCULATING CHEESE"
    );

    const cheese = await calculateCheese(Number(id));

    console.log("CALCULATED CHEESE", cheese);

    await updateCheese(Number(id), cheese);

    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        firstVerified: true,
      },
    });
  }
}
