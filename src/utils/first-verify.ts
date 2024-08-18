"use server";

import prisma from "@/database/prisma";
import { calculateCheese, updateCheese } from "./cheese";

export async function firstVerify(id: number, address: string) {
  try {
    console.log("VERIFYING USER FOR THE FIRST TIME...");
    // STEP 1: ---------------------------------------------------------- //
    // Verify if the user has already verified their NFTs/account
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

    console.log("IS FIRST VERIFIED: ", isFirstVerified?.firstVerified);

    // STEP 1.1: -------------------------------------------------------- //
    // if the user has already verified their NFTs/account, return true
    if (isFirstVerified?.firstVerified) {
      return true;
    }

    // if the user *has not* verified (eg: false) then verify the NFTs
    console.log("USER HAS NOT VERIFIED NFTS OWNERSHIP, VERIFYING...");

    // STEP 2: ---------------------------------------------------------- //
    // Verify the NFTs ownership by calling the update NFTs endpoint
    const baseUrl = process.env.BASE_URL
      ? process.env.BASE_URL
      : "http://localhost:3000";

    const nftsResult = await fetch(`${baseUrl}/api/update/nfts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        address,
      }),
    });

    if (!nftsResult.ok) {
      throw new Error("Failed to verify NFTs ownership", {
        cause: nftsResult.statusText,
      });
    }

    console.log("VERIFIED OWNERSHIP... NOW CALCULATING CHEESE...");

    // STEP 3: ---------------------------------------------------------- //
    // Calculate the cheese for the user based on the NFTs they own and the
    // time they have owned them
    const cheese = await calculateCheese(Number(id));

    console.log("CALCULATED CHEESE: ", cheese);

    // STEP 3.1: ---------------------------------------------------------- //
    // Update the user's cheese in the database
    await updateCheese(Number(id), cheese);

    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        firstVerified: true,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("ERROR VERIFYING USER FOR THE FIRST TIME", {
        message: error.message,
        stack: error.stack,
        cause: error.cause,
      });
    } else {
      console.error("ERROR VERIFYING FIRST TIME", error);
    }
  }
}
