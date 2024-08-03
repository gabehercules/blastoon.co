import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string(),
  NEXT_PUBLIC_SECRET_KEY: z.string(),
  ALCHEMY_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
