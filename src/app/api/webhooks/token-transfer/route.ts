import prisma from "@/database/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { event } = body;

  if (!event || !event.activity) {
    return NextResponse.json({ message: "No event recieved" });
  }

  const transferTopic =
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

  console.log("EVENT RECIEVED", event);

  // const txFrom = event.activity[0].fromAddress;
  // const txTo = event.activity[0].toAddress;
  // const contractAddress = event.activity[0].contractAddress;
  // const txHash = event.activity[0].txHash;

  // let tokenId = event.activity[0].erc721TokenId;
  // if (event.activity.log.topics[0] != transferTopic) {
  //   return NextResponse.json({ message: "Not a transfer event" });
  // }

  return NextResponse.json({
    message: "Transfer event recieved, check the logs",
  });
}
