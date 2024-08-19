import prisma from "@/database/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const resetSequence = await prisma.$executeRaw`
    ALTER SEQUENCE "User_Cheese_id_seq" RESTART WITH 1;
  `;

  return NextResponse.json({
    message: "Cheese Table Ids Reseted successfully",
    resetSequence,
  });
}
