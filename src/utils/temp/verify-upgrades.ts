"use server";

import prisma from "@/database/prisma";
import { upgrades } from "./address-upgrades";

export async function verifyUpgrades(address: string, id: number) {
  console.log("VERIFY UPGRADES", address, id);

  const hasUpgraded = upgrades.find(
    (upgrade) => upgrade.upgradedBy.toLocaleLowerCase() == address
  );

  // console.log("HAS UPGRADED", hasUpgraded);

  if (!hasUpgraded) {
    console.log("USER HAS NOT UPGRADED ANY TOKENS");
    return "No Upgrades Found";
  }

  const actualSuperCheese = await prisma.userSuperCheese.findFirst({
    where: {
      addressId: Number(id),
    },
    select: {
      amount: true,
    },
  });

  // console.log("ACTUAL SUPER CHEESE", actualSuperCheese);

  if (actualSuperCheese?.amount == null) {
    return 0;
  }

  const updatedSuperCheese =
    hasUpgraded.tokensUpgraded * 40000 + actualSuperCheese.amount;

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        upgradedNFTs: hasUpgraded.tokensUpgraded,
        superCheese: {
          update: {
            amount: updatedSuperCheese,
          },
        },
      },
      select: {
        superCheese: {
          select: {
            amount: true,
          },
        },
      },
    });

    return user.superCheese?.amount;
  } catch (error) {
    console.log("ERROR CREATING SUPER CHEESE RECORD", error);
  }
}
