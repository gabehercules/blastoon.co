"use server";

import prisma from "../prisma";

export async function getCardPacks() {
  const cardPacks = await prisma.cardPacks.findMany({
    orderBy: {
      packType: "asc",
    },
  });

  return cardPacks;
}
