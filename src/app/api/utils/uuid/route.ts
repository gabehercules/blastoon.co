import prisma from "@/database/prisma";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  // const users = await prisma.user.findMany();
  // for (const user of users) {
  //   await prisma.user.update({
  //     where: { id: user.id },
  //     data: { uuid: randomUUID() },
  //   });
  // }

  return NextResponse.json({
    message: "Disabled",
  });
}
