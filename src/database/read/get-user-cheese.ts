"use server";

import prisma from "../prisma";
import { revalidatePath } from "next/cache";

export async function getUserCheese(addressId: string) {
  const user = await prisma.player.findUnique({
    where: {
      addressId: addressId,
    },
    select: {
      cheese: true,
    },
  });

  // console.log("User", user);

  if (!user) throw Error("No user found");

  if (!user.cheese) return 0;

  const cheese = user.cheese;

  // console.log("Cheese amount", cheese);

  revalidatePath("/dashboard");
  return cheese;
}
