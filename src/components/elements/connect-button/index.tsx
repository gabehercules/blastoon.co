"use client";

import { useRouter } from "next/navigation";

import { signLoginPayload, verifySignature } from "thirdweb/auth";

import { useConnectModal } from "thirdweb/react";
import { client } from "@/thirdweb";
import { BiLoaderAlt } from "react-icons/bi";
import { verifySignedUp } from "@/utils/verify-signed-up";
import { createUser } from "@/database/create/create-user";

interface ConnectButtonProps {
  children: React.ReactNode;
}

export default function ConnectButton({ children }: ConnectButtonProps) {
  const { connect, isConnecting } = useConnectModal();
  const router = useRouter();

  // Delegação de funções
  //
  // O handleConnect é responsável por conectar o usuário/address ao app
  const handleConnect = async () => {
    // conecta o usuário ao app com o methodo connect()
    const wallet = await connect({ client }); // opens the connect modal
    const account = wallet.getAccount(); // gets the connected account - an account belongs to a wallet, the account contains an address to the blockchain

    console.log("LOG 1 -- ACCOUNT", account);

    if (!account) return; // if the account is not found, return (manage the errors to be more concise)

    // verify if the user is signed up with the helper function verifySignedUp
    const isSignedUp = await verifySignedUp(account.address);

    console.log("LOG 2 -- IS SIGNED UP", isSignedUp);

    // log in teh console the connected wallet address
    // console.log("connected to", wallet.getAccount()?.address);

    const signature = await account?.signMessage({ message: "Signing" });

    const isValidSignature = await verifySignature({
      message: "Signing",
      signature: signature,
      address: account.address,
      client: client,
    });

    // log in the console the signature
    console.log("LOG 3 -- SIGNATURE", signature);
    console.log("LOG 4 -- SIGNATURE IS VALID?", isValidSignature);

    if (!isValidSignature) return console.log("Invalid signature");

    if (!isSignedUp) {
      const user = await createUser(account.address, signature);
      console.log("LOG 5 -- USER RETURNED", user);
    }

    // router.push("/dashboard");
  };

  return (
    <button
      onClick={handleConnect}
      className="w-[150px] flex items-center justify-center px-4 py-1 rounded-lg border border-b-[3px] border-yellow-200/60 text-sm font-semibold bg-gradient-to-tr from-yellow-blast from-10% to-yellow-600 to-90% text-yellow-950"
    >
      {isConnecting ? (
        <BiLoaderAlt className="animate-spin" size={18} />
      ) : (
        children
      )}
    </button>
  );
}
