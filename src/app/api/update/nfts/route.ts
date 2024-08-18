import { BLASTTOON_LAUNCH_DATE } from "@/constants";
import prisma from "@/database/prisma";
import { authOptions } from "@/lib/auth";
import { getNFTsByAddress } from "@/utils/get-nfts-by-address";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // this endpoint

  const { id, address } = await req.json();

  // console.log("ID and address in request body", id, address);
  // console.log("ID and address in request body", typeof id, typeof address);

  if (!id || !address) {
    return NextResponse.json({
      status: "Error",
      type: "Authentication Error",
      message: "Unauthorized access",
    });
  }

  try {
    // get all NFTs from the given address in NFT Scan API
    const { data } = await getNFTsByAddress(address);

    const nfts = data.content;
    const total = data.total;

    // return from the response only the tokenId and the timestamp when the user owned the NFT
    const nftsWithIdAndOwnershipTime = nfts.map((nft: any) => {
      // if the user owned the NFT before the launch date, set the ownership timestamp to the launch date
      // this is because the Blast Toon collection had a first launch then it has been paused and relaunched
      // the maximum timestamp we can have is the "2nd" launch date
      let ownTimestamp = nft.own_timestamp;
      if (ownTimestamp < BLASTTOON_LAUNCH_DATE) {
        ownTimestamp = BLASTTOON_LAUNCH_DATE;
      }
      return {
        tokenId: nft.token_id,
        ownerSince: ownTimestamp,
      };
    });

    console.log(
      "NFTS WITH ID AND OWNERSHIP TIMESTAMP",
      nftsWithIdAndOwnershipTime
    );

    for (const nft of nftsWithIdAndOwnershipTime) {
      await prisma.blastToonNfts.upsert({
        create: {
          tokenId: Number(nft.tokenId),
          userId: Number(id),
          ownerSince: nft.ownerSince,
        },
        update: {
          userId: Number(id),
          ownerSince: nft.ownerSince,
        },
        where: {
          tokenId: Number(nft.tokenId),
        },
      });
    }

    return NextResponse.json({ message: "Success", total }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update NFTs", error });
  }
}
