"use server";

import prisma from "../prisma";
import { DraftAndPublished } from "@prisma/client";

export async function getMarketItem(slug: string) {
  const cardPack = await prisma.marketItems.findUnique({
    where: {
      slug,
      status: DraftAndPublished.PUBLISHED,
    },
  });

  // console.log(cardPack);

  return cardPack;
}
