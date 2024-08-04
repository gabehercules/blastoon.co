import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string(),
<<<<<<< HEAD
  THIRDWEB_SECRET_KEY: z.string(),
  UNBELIEVABOAT_API_URL: z.string().url(),
=======
  NEXT_PUBLIC_SECRET_KEY: z.string(),
  ALCHEMY_API_KEY: z.string(),
>>>>>>> 545a19c7ec7dc80ec28579dcdaaeca3e3d5a7247
});

export const env = envSchema.parse(process.env);
