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
      cheeseCoin: {
        select: {
          amount: true,
        },
      },
    },
  });

  for (const user of users) {
    let cheeseCoin = user.cheeseCoin?.amount || 0;

    const updatedCheese = cheeseCoin + user.holdingNFTs * 1000;
    console.log(updatedCheese);

    await prisma.cheese.upsert({
      create: {
        amount: updatedCheese,
        id: Number(user.id),
        addressId: Number(user.id),
      },
      update: {
        amount: updatedCheese,
      },
      where: {
        id: Number(user.id),
      },
    });
  }

  return NextResponse.json({ Message: "Cheese Updated Successfully" });
}
