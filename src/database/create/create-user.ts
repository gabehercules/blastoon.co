"use server";

import prisma from "../prisma";

export async function createUser(address: string, signature: any) {
  try {
    const result = await prisma.user.create({
      data: {
        address: address,
        signature: signature,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}
