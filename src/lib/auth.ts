import CredentialsProvider, {
  CredentialInput,
} from "next-auth/providers/credentials";
import type { NextAuthOptions, User } from "next-auth";
import { getUser } from "@/database/read/get-user";
import prisma from "@/database/prisma";
import { fetchNFTsByAddress } from "@/utils/get-nfts-by-address";
import { firstVerify } from "@/utils/first-verify";
import { createUser } from "@/database/create/create-user";
import { createUserCheese } from "@/database/create/user-cheese";
import { createUserSuperCheese } from "@/database/read/get-user-supercheese";
// import Discord from "next-auth/providers/discord";

const actualDateInSeconds = Math.floor(Date.now() / 1000);
const tokenExpirationInSeconds = Math.floor(7 * 24 * 60 * 60);

interface ExtendedUser extends User {
  address: string;
}

export const authOptions = {
  // Configure one or more authentication providers

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days - Padrão do Strapi (validar se seria bom mudar para 30 dias)
  },

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any): Promise<User | null> {
        if (
          !credentials ||
          !credentials.address ||
          credentials.address === "" ||
          credentials.address === "undefined"
        ) {
          throw new Error("Missing credentials");
        }

        console.log("[(✓)] ===> CREDENTIAL PASSADA NO AUTH", credentials);

        // the credentials argument is an object with the user input in the signIn method
        // plus other attributes that next-auth pass to this function (redirect, csrfToken, etc)
        // now we are passing just the address (in the signIn() in the connect button component)
        // but we can pass anything since the credentials do not have a type definition in the library

        const { address: accountAddress } = credentials;

        try {
          // look in the database if the user exists
          let user = await getUser(accountAddress);

          if (!user) {
            console.log("[(✓)] ===> USER NOT FOUND IN DATABASE, CREATING...");

            // ================================================================== //
            // =========================            ============================= //
            // ========================= IMPORTANTE ============================= //
            // =========================            ============================= //
            // ================================================================== //
            // ==== QUALQUER MERDA QUE RETORNE *NULL* OU LANCE UM ERRO AQUI ===== //
            // ==== NO AUTHORIZE, VAI CAIR NO CATCH E O SISTEMA DE LOGIN VAI ==== //
            // ==== FALHAR MISERAVELMENTE TORNANDO MINHA VIDA UMA COMPLETA ====== //
            // ==== MERDA ======================================================= //
            // ================================================================== //
            // ================================================================== //

            // if the user does not exist, create it in the database passing the address
            // from the credentials supplied
            user = await createUser(accountAddress);

            console.log("[(✓)] ===> USER CREATED SUCCESSFULLY");

            console.log("[(✓)] ===> CREATING CHEESE RECORD FOR THE USER...");
            // create a cheese record for the user and set to 0
            await createUserCheese(user.addressId);

            console.log(
              "[(✓)] ===> CREATING SUPER CHEESE RECORD FOR THE USER..."
            );
            // create a superCheese record for the user and set to 0
            await createUserSuperCheese(user.addressId);

            console.log(
              "[(✓)] ===> CHEESE AND SUPER CHEESE CREATED FOR THE USER"
            );

            const { data } = await fetchNFTsByAddress(user.address);

            // ---------------------------------------------------
            // Move this piece of code that validate the amount of NFTs
            // user has to a helper function inside fetchNFTsByAddress() or similiar
            // retorns an array of NFTs [{...}, {...}, ...]
            const { content: nfts } = data;

            console.log("NFTS FOUND FOR CREATED USER", nfts);

            // look to the amount/count of NFTs returned

            const nftsCount = nfts.length;

            // save the amount of NFTs in the users table `holdingNFTs`
            await prisma.user.update({
              where: {
                addressId: user.addressId,
              },
              data: {
                holdingNFTs: nftsCount,
              },
            });
          }

          console.log("USER FOUND IN DATABASE", user);

          const { addressId, address, username } = user;

          if (!addressId || !address) {
            console.log("Missing data from user");
            return null;
          }

          return {
            id: addressId,
            address, // Pensar em padronizar depois para 'username' como no strapi
            username: username,
          } as ExtendedUser;
        } catch (error) {
          console.log("SOMETHING RETURNED NULL OR THROWN AN ERROR", error);
          return null;
        }
      },
    }),
    // Discord({
    //   clientId: process.env.DISCORD_CLIENT_ID as string,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    // }),
  ],
  callbacks: {
    // TESTING SIGN IN CALLBACK
    //
    //
    //
    signIn: async ({ user }) => {
      console.log("1 - #### CREDENTIALS NO SIGNIN CALLBACK", user);

      const customUser = user as ExtendedUser;

      if (!customUser || !customUser.id || !customUser.address) {
        return Promise.resolve(false);
      }

      const isFirstVerified = await prisma.user.findUnique({
        where: {
          addressId: user.id,
        },
        select: {
          firstVerified: true,
        },
      });

      console.log(
        "2 - #### IS FIRST VERIFIED: ",
        isFirstVerified?.firstVerified
      );

      if (isFirstVerified?.firstVerified) {
        return Promise.resolve(true);
      }

      console.log("3 - #### USER IS NOT VERIFIED. VERIFYING...", customUser);
      await firstVerify(customUser.id, customUser.address);

      return Promise.resolve(true);
    },
    // TESTING SIGN IN CALLBACK
    //
    //
    jwt: async ({ token, user, account, profile, session }) => {
      // console.log("4 - #### TOKEN NO JWT CALLBACK", token);
      // console.log("5 - #### USER NO JWT CALLBACK", user);

      // overwrite the user with the custom user type to access the address
      const customUser = user as ExtendedUser;
      // const isSignIn = !!user;

      // // checa se o usuário está fazendo o login
      // if (isSignIn) {
      //   token = setToken(user);
      //   return Promise.resolve(token);
      // } else {
      //   if (!token.expiration) return Promise.resolve({});

      //   if (actualDateInSeconds > Number(token.expiration))
      //     return Promise.resolve({});
      // }

      // return Promise.resolve(token);

      if (!customUser) return Promise.resolve(token);
      return {
        id: customUser.id,
        address: customUser.address,
      };
    },
    session: async ({ session, token }): Promise<any> => {
      // console.log("6 - #### SESSION NO SESSION CALLBACK", session);
      // console.log("7 - #### TOKEN (MODIFICADO) NO SESSION CALLBACK", token);

      if (!token?.id || !token?.address) {
        return null;
      }

      // session.accessToken = token.jwt;
      session.user = {
        // @ts-ignore
        id: token.id,
        address: token.address,
      };

      // console.log("7.1 - #### SESSION NO SESSION CALLBACK", session);

      return { ...session };
    },
  },

  pages: {
    signIn: "/",
    signOut: "/",
  },
} satisfies NextAuthOptions;
