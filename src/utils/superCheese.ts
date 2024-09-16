"use server";

import prisma from "@/database/prisma";

export async function createUserSuperCheese(address: string) {
  try {
    await prisma.superCheese.create({
      data: {
        amount: 0,
        addressId: address,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUserSuperCheese(addressId: string) {
  const superCheese = await prisma.superCheese.findFirst({
    where: {
      addressId: addressId,
    },
    select: {
      amount: true,
    },
  });

  if (!superCheese) return 0;

  return superCheese.amount;
}
