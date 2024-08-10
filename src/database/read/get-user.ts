"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";

export async function getUser(address: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });

  console.log("User", user);

  return user;
}
