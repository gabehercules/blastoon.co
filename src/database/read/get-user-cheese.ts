"use server";

import prisma from "../prisma";

export async function getUserCheese(address: string): Promise<Number | Error> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        address: address,
      },
      include: {
        user_cheese: true,
      },
    });

    console.log("User", user);

    if (!user) throw Error("No user found");

    if (!user.user_cheese) return 0;

    const cheese = user.user_cheese.cheese_amount;

    console.log("Cheese amount", cheese);

    return cheese;
  } catch (error) {
    console.log(error);
    return Error("Error fetching user cheese");
  }
}
