"use server";

import prisma from "@/database/prisma";

export async function calculateCheese(addressId: string) {
  // console.log(id, address);

  const nfts = await prisma.blastToonNfts.findMany({
    where: {
      addressId: addressId,
    },
    select: {
      addressId: true,
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

export async function updateCheese(addressId: string, amount: number) {
  const updateCheese = await prisma.cheese.update({
    where: {
      addressId: addressId,
    },
    data: {
      amount: amount,
    },
  });

  return updateCheese;
}
