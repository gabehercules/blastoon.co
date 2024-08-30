"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";

export async function createUser(address: string): Promise<User> {
  try {
    const user = await prisma.user.create({
      data: {
        address: address,
      },
    });

    if (!user) {
      throw new Error("Error creating user");
    }

    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error);
  }
}
