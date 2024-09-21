"use server";

import prisma from "../prisma";

export async function getCardPackDetails(slug: string) {
  const cardPack = await prisma.marketItems.findUnique({
    where: {
      slug,
      NOT: {
        publishedAt: null,
      },
    },
    include: {
      itemPrice: {
        orderBy: {
          currencyType: "asc",
        },
      },
    },
  });

  // console.log(cardPack);

  return cardPack;
}
