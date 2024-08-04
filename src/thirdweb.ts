// import { env } from "./env";
import { createThirdwebClient } from "thirdweb";

// Client ID is made public to use among the clientside
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string;

// Secret key is kept private and used only in the serverside
const secretKey = process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY as string;

export const client = createThirdwebClient({ secretKey });
