"use server";

import prisma from "@/database/prisma";

export async function getUserCardPacks(id: number) {
  try {
    const cardPacks = await prisma.userCardPacks.findMany({
      where: {
        user: {
          id: Number(id),
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
