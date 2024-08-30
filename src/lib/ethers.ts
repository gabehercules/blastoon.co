import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

const blastRPCEndpoint = "https://rpc.blast.io";
const chainId = 81457;
const name = "Blast Mainnet";

// Open the wallet and connect to the ethereum network

export async function getProvider() {
  if (!window.ethereum) {
    alert("No ethereum provider found");
    return false;
  }

  const provider = new ethers.BrowserProvider(window.ethereum, "any");

  // console.log("CURRENT NETWORK", await provider.getNetwork());
  // console.log("PROVIDER", provider);

  return provider;
}

export async function getAccount(): Promise<string | null> {
  try {
    const provider = await getProvider();

    if (!provider) {
      console.log("NO PROVIDER FOUND");
      throw new Error("No provider found. Please install a wallet");
    }

    const accounts = await provider.send("eth_requestAccounts", []);

    if (!accounts || !accounts.length) {
      console.log("No accounts found or user denied account access");
      return null;
      // throw new Error("No accounts found or user denied account access");
    }

    console.log("ACCOUNTS: ", accounts);

    const newtwork = await provider.getNetwork();

    // Check if the user is connected to the Blast Network
    if (Number(newtwork.chainId) !== 81457) {
      console.log("Please connect to the Blast Network"); // handle a dynamic change of the newtwork

      const hexChainId = `0x${chainId.toString(16)}`; // convert the chainId to hex
      await provider.send("wallet_switchEthereumChain", [
        { chainId: hexChainId }, // 81457 blast chain id
      ]);
    }

    console.log("ADDRESS: ", accounts[0]);

    const address = accounts[0];
    return address;
  } catch (error) {
    console.log("ERROR - User denied account access", { error });
    return null;
  }
}
