"use server";

import prisma from "../prisma";

export async function createBoostTemp(
  user: string,
  collection: string,
  quantity: bigint,
  value: bigint
) {
  const createBoost = await prisma.boosts.create({
    data: {
      user,
      collection,
      quantity,
      value,
    },
  });

  console.log("Boost CREATED", createBoost);
}
