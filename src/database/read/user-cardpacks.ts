"use server";

import prisma from "../prisma";

export async function getUserCardPacks(userId: string) {
  const userCardPacks = await prisma.playerInventory.findMany({
    where: {
      addressId: userId,
    },
    select: {
      aquiredAt: true,
      isListed: true,
      quantity: true,
      item: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return userCardPacks;
}
