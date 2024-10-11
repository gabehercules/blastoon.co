import prisma from "@/database/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();

    // console.log("REQ BODY", reqBody);

    const { userId, itemId, checkoutMode, price, totalPrice, amount } = reqBody;

    // Initiate transaction
    const transaction = prisma.$transaction(async (tx) => {
      console.log("TRANSACTION INITIATED");

      // Check if user and item exists in the request body
      if (!userId || !itemId) {
        throw new Error("no_user_or_item_in_body");
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

      // retrieve item details
      const marketItem = await tx.marketItems.findUniqueOrThrow({
        where: {
          id: itemId,
        },
        select: {
          id: true,
          supply: true,
        },
      });

      console.log("PLAYER", player);
      console.log("MARKET ITEM", marketItem);

      if (marketItem.supply === 0 || marketItem.supply < amount) {
        console.log("ITEM IS OUT OF STOCK OR AMOUNT IS MORE THAN HAS IN STOCK");

        throw new Error("item_out_of_stock");
      }

      if (checkoutMode === "supercheese-checkout") {
        if ((player?.superCheese as number) < totalPrice) {
          throw new Error("not_enough_supercheese");
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
          throw new Error("not_enough_cheese");
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
      throw new Error("transaction_failed");
    }

    console.log("TRANSACTION", await transaction);

    return NextResponse.json({ message: "Success" });
  } catch (error: any) {
    let message = "Internal Server Error";
    let status = 500;

    // custom error messages
    if (error.message === "no_user_or_item_in_body") {
      message = "No user or item in request body";
      status = 400;
    } else if (error.message === "item_out_of_stock") {
      message = "Item is out of stock or amount is more than has in stock";
      status = 400;
    } else if (error.message === "not_enough_supercheese") {
      message = "Not enough supercheese";
      status = 400;
    } else if (error.message === "not_enough_cheese") {
      message = "Not enough cheese";
      status = 400;
    } else if (error.message === "transaction_failed") {
      message = "Transaction failed";
      status = 400;
    }

    return NextResponse.json({ status: "Error", message }, { status });
  }
}
