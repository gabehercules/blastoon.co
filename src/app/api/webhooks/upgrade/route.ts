import prisma from "@/database/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { block } = body.event.data;

  // console.log("BLOCK", block);

  if (!block.logs.length) {
    return NextResponse.json({ message: "No logs found in this run" });
  }

  const multiplier = 1.5;

  const log = block.logs[0];

  // console.log("LOG", log);

  const upgrade =
    "0x0c3fdcacbee530581c67c89a851ff8052aa367c589919df3056398ce311a237d";

  if (log.topics[0] != upgrade) {
    return NextResponse.json({ message: "Not an upgrade event log" });
  }

  const upgradeAmount = 40000;

  const user = await prisma.user.findUnique({
    where: {
      address: log.transaction.from.address,
    },
    select: {
      addressId: true,
    },
  });

  await prisma.superCheese.update({
    where: {
      addressId: user?.addressId,
    },
    data: {
      amount: {
        increment: upgradeAmount * multiplier,
      },
    },
  });

  const tx = log.transaction;

  console.log("BLOCK", block);
  console.log("LOG", log);
  console.log("TRANSACTION", tx);

  return NextResponse.json({ message: "Hello, World!" });
}
