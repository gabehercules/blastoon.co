"use server";

import prisma from "@/database/prisma";

export async function createUserSuperCheese(addressId: string) {
  try {
    await prisma.superCheese.create({
      data: {
        amount: 0,
        addressId: addressId,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUserSuperCheese(addressId: string) {
  const superCheese = await prisma.player.findFirst({
    where: {
      addressId: addressId,
    },
    select: {
      superCheese: true,
    },
  });

  if (!superCheese) return 0;

  return superCheese.superCheese;
}
