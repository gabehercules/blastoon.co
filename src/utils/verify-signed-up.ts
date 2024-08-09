"use server";

import prisma from "@/database/prisma";

export async function verifySignedUp(address: string): Promise<Boolean> {
  // try to find the user in the database
  const user = await prisma.user.findUnique({
    where: {
      address: address,
    },
  });

  // if the user is not found, throw an error
  if (!user) {
    return false;
  } else {
    // just return true if the user is found, not needed to return the user
    return true;
  }
}

// todo: refactor - mode the prisma usage (const user = ... ) to another function
// in the same place other prisma functions are eg.: /database/create/get-user.ts
//
// then call this function in verifySignedUp
