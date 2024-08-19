"use server";

import prisma from "@/database/prisma";
import { upgrades } from "./address-upgrades";

export async function verifyUpgrades(address: string, id: number) {
  const hasUpgraded = upgrades.find(
    (upgrade) => upgrade.upgradedBy === address
  );

  console.log("HAS UPGRADED", hasUpgraded);

  if (!hasUpgraded) {
    return 0;
  }

  try {
    await prisma.userSuperCheese.upsert({
      where: {
        addressId: Number(id),
      },
      update: {
        amount: hasUpgraded.tokensUpgraded * 40000,
      },
      create: {
        addressId: Number(id),
        amount: hasUpgraded.tokensUpgraded * 40000,
      },
    });
  } catch (error) {
    console.log("ERROR CREATING SUPER CHEESE RECORD", error);
  }
}
