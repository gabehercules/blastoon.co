"use server";

import prisma from "@/database/prisma";

export async function calculateCheese(id: number) {
  // console.log(id, address);

  const nfts = await prisma.nfts.findMany({
    where: {
      userId: id,
    },
    select: {
      userId: true,
      ownerSince: true,
    },
  });

  // extract the ownerSince from the nfts array
  const ownedSinceArray = nfts.map((nft) => Number(nft.ownerSince));
  const calculateTotalPoints = (ownedSinceArray: number[]): number => {
    const now = Math.floor(Date.now());

    const calculatePoints = ownedSinceArray.reduce((acc, ownedSince) => {
      const diff = now - ownedSince;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const points = days * 1000;
      return acc + points;
    }, 0);

    return calculatePoints;
  };

  const totalPoints = calculateTotalPoints(ownedSinceArray);

  return totalPoints;
}

export async function updateCheese(id: number, cheeseAmount: number) {
  const updateCheese = await prisma.user_Cheese.update({
    where: {
      addressId: id,
    },
    data: {
      cheeseAmount: cheeseAmount,
    },
  });

  return updateCheese;
}
