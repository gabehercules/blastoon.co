"use server";

import prisma from "../prisma";

export async function getUserCheese(address: string): Promise<Number | Error> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        address: address,
      },
      include: {
        cheeseCoin: true,
      },
    });

    // console.log("User", user);

    if (!user) throw Error("No user found");

    if (!user.cheeseCoin) return 0;

    const cheese = user.cheeseCoin.amount;

    // console.log("Cheese amount", cheese);

    return cheese;
  } catch (error) {
    console.log(error);
    return Error("Error fetching user cheese");
  }
}
