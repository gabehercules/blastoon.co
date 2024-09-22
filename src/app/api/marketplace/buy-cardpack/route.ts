import prisma from "@/database/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const reqBody = await req.json();

  console.log("REQ BODY", reqBody);

  // const transaction = prisma.$transaction(async (tx) => {
  //   if (reqBody.currency === "SUPER_CHEESE") {
  //     const userCheese = await tx.superCheese.findUnique({
  //       where: {
  //         addressId: reqBody.userId,
  //       },
  //     });

  //     const finalPrice = reqBody.price * reqBody.amount;

  //     const updateCheese = await tx.superCheese.update({
  //       data: {
  //         amount: {
  //           decrement: finalPrice,
  //         },
  //       },
  //       where: {
  //         addressId: reqBody.userId,
  //       },
  //     });

  //     const updateInventory = await tx.userInventory.create({
  //       data: {
  //         addressId: reqBody.userId,
  //         itemId: reqBody.cardPackId,
  //         quantity: reqBody.amount,
  //       },
  //     });

  //     console.log("USER", userCheese);
  //   }
  // });

  // if (!transaction) {
  //   return NextResponse.json({ message: "Failed" });
  // }

  return NextResponse.json({ message: "Success" });
}
