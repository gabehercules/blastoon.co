"use server";

import prisma from "../prisma";

export async function createUser(address: string, signature?: any) {
  try {
    const result = await prisma.user.create({
      data: {
        address: address,
        signature: signature,

        // create a new cheeseCoin record starting with 0 cheese
        cheeseCoin: {
          create: {
            amount: 0,
          },
        },
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}
