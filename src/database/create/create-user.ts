"use server";

import prisma from "../prisma";

export async function createUser(address: string, signature?: any) {
  try {
    const result = await prisma.user.create({
      data: {
        address: address,
        signature: signature,

        // create a new user_cheese record starting with 0 cheese
        user_cheese: {
          create: {
            cheeseAmount: 0,
          },
        },
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}
