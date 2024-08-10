"use client";

import { useRouter } from "next/navigation";

import { useConnect, useConnectModal } from "thirdweb/react";
import { client } from "@/lib/thirdweb";
import { BiLoaderAlt } from "react-icons/bi";
import { verifySignedUp } from "@/utils/verify-signed-up";
import { createUser } from "@/database/create/create-user";
import { getUser } from "@/database/read/get-user";

import { useActiveAccount, useActiveWalletChain } from "thirdweb/react";

import { generatePayload, login } from "@/actions/login"; // we'll add this file in the next section
import { signLoginPayload, verifySignature } from "thirdweb/auth";
import { createWallet } from "thirdweb/wallets";

interface ConnectButtonProps {
  children: React.ReactNode;
}

export default function ConnectButton({ children }: ConnectButtonProps) {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();

  const { connect, isConnecting } = useConnectModal();
  const router = useRouter();

  // Delegação de funções
  //
  // O handleConnect é responsável por conectar o usuário/address ao app

  // const handleConnect = async () => {
  //   const message = {
  //     message: "Sign in to BlastToon Co.",
  //     tos: "https://blasttoon.co/tos",
  //   };
  //   // conecta o usuário ao app com o methodo connect()
  //   const wallet = await connect({ client }); // opens the connect modal
  //   const account = wallet.getAccount(); // gets the connected account - an account belongs to a wallet, the account contains an address to the blockchain

  //   console.log("LOG 1 -- ACCOUNT", account);

  //   if (!account) return "no account selected"; // if the account is not found, return (manage the errors to be more concise)

  //   // verifica se a conta existe no banco de dados
  //   const user = await getUser(account.address);

  //   let signature: any;
  //   if (!user) {
  //     signature = await account.signMessage({
  //       message: JSON.stringify(message),
  //     });

  //     await createUser(account.address, signature);
  //   }

  //   // log in teh console the connected wallet address
  //   // console.log("connected to", wallet.getAccount()?.address);

  //   const isValidSignature = await verifySignature({
  //     message: JSON.stringify(message),
  //     signature: signature,
  //     address: account.address,
  //     client: client,
  //   });

  //   // log in the console the signature
  //   console.log("LOG 3 -- SIGNATURE", signature);
  //   console.log("LOG 4 -- SIGNATURE IS VALID?", isValidSignature);

  //   if (!isValidSignature) {
  //     console.log("Invalid signature");
  //     return Error("Invalid signature");
  //   }

  //   // router.push("/dashboard");
  // };

  const handleConnect = async () => {
    let activeAccount;

    if (!account) {
      const wallet = await connect({ client });
      activeAccount = wallet.getAccount();
    }

    // Step 1: fetch the payload from the server
    const payload = await generatePayload({
      address: account?.address as string,
      chainId: chain?.id,
    });

    if (!account) return;

    // Step 2: Sign the payload
    const signatureResult = await signLoginPayload({
      account,
      payload,
    });

    // Step 3: Send the signature to the server for verification
    const finalResult = await login(signatureResult);

    console.log("finalResult", finalResult);
  };

  return (
    <button
      onClick={handleConnect}
      className="w-[150px] flex items-center justify-center px-4 py-1 rounded-lg border border-b-[3px] border-yellow-200/60 text-sm font-semibold bg-gradient-to-tr from-brand-yellow from-10% to-yellow-600 to-90% text-yellow-950"
    >
      {isConnecting ? (
        <BiLoaderAlt className="animate-spin" size={18} />
      ) : (
        children
      )}
    </button>
  );
}
