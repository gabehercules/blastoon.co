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

  return NextResponse.json({ Message: "Cheese Updated Successfully" });
}
