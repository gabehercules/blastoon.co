"use server";

import prisma from "@/database/prisma";

export async function getUserCardPacks(addressId: string) {
  try {
    const cardPacks = await prisma.userCardPacks.findMany({
      where: {
        user: {
          addressId: addressId,
        },
      },
    });

    console.log("CARD PACKS", cardPacks);

    if (!cardPacks || !cardPacks.length) {
      console.error("No card packs found. Returning 0 as fallback");
      return 0;
    }

    // for now just return the length of the array
    return cardPacks.length;
  } catch (error) {
    console.error(error);
  }
}
