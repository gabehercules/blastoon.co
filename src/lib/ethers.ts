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

  console.log("CURRENT NETWORK", await provider.getNetwork());
  console.log("PROVIDER", provider);

  return provider;
}

export async function getAccount() {
  try {
    const provider = await getProvider();

    console.log("PROVIDER", provider);
    if (!provider) {
      console.log("NO PROVIDER FOUND");
      throw new Error("No provider found. Please install a wallet");
    }
    console.log("REQ ACCOUNTS", await provider.send("eth_requestAccounts", []));

    const accounts = await provider.send("eth_requestAccounts", []);

    if (!accounts || !accounts.length) {
      console.log("1 ----- No accounts found or user denied account access");
      return null;
      // throw new Error("No accounts found or user denied account access");
    }
    const newtwork = await provider.getNetwork();

    // Check if the user is connected to the Blast Network
    if (Number(newtwork.chainId) !== 81457) {
      console.log("Please connect to the Blast Network"); // handle a dynamic change of the newtwork

      const hexChainId = `0x${chainId.toString(16)}`; // convert the chainId to hex
      await provider.send("wallet_switchEthereumChain", [
        { chainId: hexChainId }, // 81457 blast chain id
      ]);
    }

    const address = accounts[0];
    // console.log("ADDRESS", address);

    // const contractAddress = "0x36af682901Dcb86D9Cff0D0e602857E3e07aA80D";

    // const contract = new ethers.Contract(contractAddress, [
    //   "function ownerOf(uint256) view returns (address)",
    // ]);
    // const isERC721 = contract.interface;

    // console.log("IS ERC721", isERC721);
    // console.log("CONTRACT", contract);
    return address;
  } catch (error) {
    console.log("ERROR - User denied account access", { error });
    return null;
  }
}
