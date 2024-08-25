import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { block } = body.event.data;
  const log = block.logs[0];

  const tx = log.transaction;

  console.log("BLOCK", block);
  console.log("LOG", log);
  console.log("TRANSACTION", tx);

  return NextResponse.json({ message: "Hello, World!" });
}
