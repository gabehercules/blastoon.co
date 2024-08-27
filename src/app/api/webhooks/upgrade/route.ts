import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { block } = body.event.data;

  if (!block.logs.length) {
    return NextResponse.json({ message: "No logs found in this run" });
  }

  const log = block.logs[0];

  const tx = log.transaction;

  console.log("BLOCK", block);
  console.log("LOG", log);
  console.log("TRANSACTION", tx);

  return NextResponse.json({ message: "Hello, World!" });
}
