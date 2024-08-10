"use server";

import { VerifyLoginPayloadParams, createAuth } from "thirdweb/auth";
import { privateKeyToAccount } from "thirdweb/wallets";
import { client } from "@/lib/thirdweb";
import { cookies } from "next/headers";

const privateKey = process.env.AUTH_PRIVATE_KEY || ""; // change this private key to an private key from a dedicated account for the app

if (!privateKey) {
  throw new Error("Missing AUTH_PRIVATE_KEY in .env file.");
}

const thirdwebAuth = createAuth({
  domain:
    process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "http://localhost:3000",
  adminAccount: privateKeyToAccount({ client, privateKey }),
  client: client,
});

export const generatePayload = thirdwebAuth.generatePayload;

export async function login(payload: VerifyLoginPayloadParams) {
  const verifiedPayload = await thirdwebAuth.verifyPayload(payload);

  if (verifiedPayload.valid) {
    const jwt = await thirdwebAuth.generateJWT({
      payload: verifiedPayload.payload,
    });
    cookies().set("jwt", jwt);
  }
}

export async function isLoggedIn() {
  const jwt = cookies().get("jwt");

  if (!jwt?.value) {
    return false;
  }

  const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });
  if (!authResult.valid) {
    return false;
  }
  return true;
}

export async function logout() {
  cookies().delete("jwt");
}
