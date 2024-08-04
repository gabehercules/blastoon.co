import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string(),
  THIRDWEB_SECRET_KEY: z.string(),
  UNBELIEVABOAT_API_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
