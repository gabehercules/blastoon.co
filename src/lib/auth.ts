import CredentialsProvider from "next-auth/providers/credentials";
import type { Awaitable, NextAuthOptions, User } from "next-auth";
import { getUser } from "@/database/read/get-user";
import prisma from "@/database/prisma";
import { getNFTsByAddress } from "@/utils/get-nfts-by-address";
import { createUserSuperCheese } from "@/utils/superCheese";
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

        console.log("1 - #### CREDENTIAL PASSADA NO AUTH", credentials);

        // the credentials argument is an object with the user input in the signIn method
        // now we are passing just the address, but we can pass anything since the credentials
        // do not have a type definition in the library

        // IDEA: check if the address is a holder of an NFT, if not, return null (fail the login / return a message)
        // IDEA: if the address is not a holder of an NFT, sign up the user with the address and in the
        // dashboard, show a message to the user to buy an NFT to access the platform - PROMOTE BLUR hehe boi

        // Destructure the address from the credentials object
        const { address: accountAddress } = credentials;

        try {
          // look in the database if the user exists
          let user = await getUser(accountAddress);

          // if the user does not exist, create it
          // IDEA: maybe create a helper function to create the user and return it
          if (!user) {
            console.log("USER NOT FOUND IN DATABASE, CREATING...");

            // ================================================================== //
            // =========================            ============================= //
            // ========================= IMPORTANTE ============================= //
            // =========================            ============================= //
            // ================================================================== //
            // === QUALQUER MERDA QUE RETORNE **NULL** OU LANCE UM ERRO AQUI ==== //
            // === NO AUTHORIZE, VAI CAIR NO CATCH E O SISTEMA DE LOGIN VAI ===== //
            // === FALHAR MISERAVELMENTE TORNANDO MINHA VIDA UMA COMPLETA ======= //
            // === MERDA ======================================================== //
            // ================================================================== //
            // ================================================================== //

            // essa porra ja deu merda, criar um helper function para criar o usuário e retonar mensagens
            // adequadas para cada situação de erro
            user = await prisma.user.create({
              data: {
                address: accountAddress,
              },
            });

            console.log("2 - #### USER", user);

            // create a cheeseCoin record for the user and set to 0 (initialize)
            console.log("CREATING CHEESE RECORD FOR THE USER...");
            await prisma.userCheese.create({
              data: {
                addressId: user.id,
                amount: 0,
              },
            });

            // create a superCheese record for the user and set to 0 (initialize)
            await createUserSuperCheese(user.id);

            console.log("USER CREATED AFTER VALIDATE ITS ABSCENSE IN DATABASE");

            const { data } = await getNFTsByAddress(user.address);

            // ---------------------------------------------------
            // Move this piece of code that validate the amount of NFTs
            // user has to a helper function inside getNFTsByAddress() or similiar
            // retorns an array of NFTs [{...}, {...}, ...]
            const { content: nfts } = data;

            console.log("NFTS FOUND FOR CREATED USER", nfts);

            // look to the amount/count of NFTs returned

            const nftsCount = nfts.length;

            // save the amount of NFTs in the users table `holdingNFTs`
            await prisma.user.update({
              where: {
                id: user.id,
              },
              data: {
                holdingNFTs: nftsCount,
              },
            });
            // ---------------------------------------------------
          }

          // console.log("3 - #### USER DO STRAPI", user);
          const { id, address } = user;

          if (!id || !address) {
            console.log("Missing data from user");
            return null;
          }

          return {
            id: id.toString(),
            address, // Pensar em padronizar depois para 'username' como no strapi
          } as User;
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

      // @ts-ignore
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

// Data está tipado como 'any' mas seria o tipo do 'user' vindo do strapi - tipar depois
// const setToken = (data: any) => {
//   // console.log("8 - #### DATA NO SET TOKEN", data);
//   if (!data || !data?.jwt || !data?.id || !data?.name || !data?.email)
//     return {};

//   return {
//     jwt: data.jwt,
//     id: data.id,
//     name: data.name,
//     email: data.email,
//     picture: data.image,
//     expiration: actualDateInSeconds + tokenExpirationInSeconds,
//   };
// };
