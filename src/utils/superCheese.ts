"use server";

import prisma from "@/database/prisma";

export async function createUserSuperCheese(id: number) {
  try {
    await prisma.superCheese.create({
      data: {
        amount: 0,
        addressId: id,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUserSuperCheese(id: number) {
  try {
    const superCheese = await prisma.superCheese.findFirst({
      where: {
        addressId: Number(id),
      },
      select: {
        amount: true,
      },
    });

    if (!superCheese) return 0;

    return superCheese.amount;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
