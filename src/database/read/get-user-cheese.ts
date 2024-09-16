"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function getUserCheese(address: string) {
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

  revalidatePath("/dashboard");
  return cheese;
}
