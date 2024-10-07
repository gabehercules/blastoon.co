import prisma from "@/database/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const reqBody = await req.json();

  // console.log("REQ BODY", reqBody);

  const { userId, itemId, checkoutMode, price, totalPrice, amount } = reqBody;

  // Initiate transaction
  const transaction = prisma.$transaction(async (tx) => {
    console.log("TRANSACTION INITIATED");

    // Check if user and item exists in the request body
    if (!userId || !itemId) {
      return NextResponse.json({ message: "Wrong body. No user or items" });
    }

    // retrieve player details
    const player = await tx.player.findUniqueOrThrow({
      where: {
        addressId: userId,
      },
      select: {
        id: true,
        superCheese: true,
        cheese: true,
      },
    });

    console.log("PLAYER", player);

    if (checkoutMode === "supercheese-checkout") {
      if ((player?.superCheese as number) < totalPrice) {
        return NextResponse.json({ message: "Not enough super cheese" });
      }

      await tx.player.update({
        where: {
          addressId: userId,
        },
        data: {
          superCheese: {
            decrement: totalPrice,
          },
        },
      });
    } else {
      if ((player?.cheese as number) < totalPrice) {
        return NextResponse.json({ message: "Not enough cheese" });
      }

      await tx.player.update({
        where: {
          addressId: userId,
        },
        data: {
          cheese: {
            decrement: totalPrice,
          },
        },
      });
    }

    await tx.marketItems.update({
      where: {
        id: itemId,
      },
      data: {
        supply: {
          decrement: amount,
        },
      },
    });

    const playerInventory = await tx.playerInventory.upsert({
      where: {
        addressId_itemId: {
          addressId: userId,
          itemId: itemId,
        },
      },
      create: {
        addressId: userId,
        itemId: itemId,
        quantity: amount,
      },
      update: {
        quantity: {
          increment: amount,
        },
      },
    });

    console.log("PLAYER INVENTORY", playerInventory);

    const playerTxs = await tx.playerTransactions.create({
      data: {
        playerId: player.id,
        quantity: amount,
        itemId: itemId,
        value: totalPrice,
      },
    });

    console.log("PLAYER TRANSACTIONS", playerTxs);
  });

  if (!transaction) {
    return NextResponse.json({ message: "Failed" });
  }

  console.log("TRANSACTION", await transaction);

  return NextResponse.json({ message: "Success" });
}
