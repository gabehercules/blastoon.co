"use server";

import prisma from "../prisma";

export async function buyCardPack(cardPackId: string, userId: string) {
  // const tx = await prisma.$transaction();

  console.log("Transaction executed", cardPackId, userId);
}
