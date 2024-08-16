import prisma from "@/database/prisma";
import { getNFTsByAddress } from "@/utils/get-nfts-by-address";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // this endpoint should be called to check the NFTs owned by a user and update it in the database
  const blasttoonContract = "0x36af682901Dcb86D9Cff0D0e602857E3e07aA80D"; // move later to a CONSTANTS file?

  // get the id and address from the request body
  const { id, address } = await req.json();

  console.log("ADDRESS", address);

  const { data } = await getNFTsByAddress(address);

  const { total, content } = data;

  try {
    return NextResponse.json({ message: "verified" });
  } catch (error) {
    console.error(error);
  }
}
