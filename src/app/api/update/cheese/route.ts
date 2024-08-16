import prisma from "@/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // Authorization:
  const headers = req.headers;
  const secretKey = headers.get("secret-key");

  if (secretKey !== process.env.CRON_SECRET_KEY) {
    return NextResponse.json(
      { Message: "Unauthorized", Description: "Invalid secret key" },
      { status: 401 }
    );
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      holdingNFTs: true,
      user_cheese: {
        select: {
          cheeseAmount: true,
        },
      },
    },
  });

  for (const user of users) {
    let userCheese = user.user_cheese?.cheeseAmount || 0;

    const updatedCheese = Math.abs(userCheese + user.holdingNFTs * 1000);
    console.log(updatedCheese);

    await prisma.user_Cheese.update({
      where: {
        addressId: user.id,
      },
      data: {
        cheeseAmount: updatedCheese,
      },
    });
  }

  // const ownedSinceArray = nfts.map((nft) => Number(nft.ownerSince));

  // console.log("OWNED SINCE ARRAY", ownedSinceArray);

  // // extract the ownerSince from the nfts array
  // const calculateTotalPoints = (ownedSinceArray: number[]): number => {
  //   const now = Math.floor(Date.now());

  //   const calculatePoints = ownedSinceArray.reduce((acc, ownedSince) => {
  //     const diff = now - ownedSince;
  //     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  //     const points = days * 1000;
  //     return acc + points;
  //   }, 0);

  //   return calculatePoints;
  // };

  // const totalPoints = calculateTotalPoints(ownedSinceArray);

  // console.log("TOTAL POINTS", totalPoints);

  // async function updateCheese(id: number, cheeseAmount: number) {
  //   const updateCheese = await prisma.user_Cheese.update({
  //     where: {
  //       addressId: 38, // id,
  //     },
  //     data: {
  //       cheeseAmount: cheeseAmount,
  //     },
  //   });
  // }

  return NextResponse.json({ Message: "Cheese Updated Successfully" });
}
