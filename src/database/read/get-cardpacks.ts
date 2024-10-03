"use server";

import prisma from "../prisma";

export async function getCardPacks() {
  const cardPacks = await prisma.marketItems.findMany({
    where: {
      category: {
        slug: "card-packs",
      },
    },
    include: {
      itemPrice: {
        select: {
          currencyType: true,
          price: true,
        },
        orderBy: {
          currencyType: "asc",
        },
      },
    },
    orderBy: {
      cheesePrice: "asc",
    },
  });

  return cardPacks;
}
