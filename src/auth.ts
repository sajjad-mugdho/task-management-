import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { db } from "./lib/db";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter({ prisma }),

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // Add additional fields as needed
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter your email and password");
        }

        console.log(credentials.email, credentials.password);

        const emailExist = await db.User.findUnique({
          where: { email: credentials.email },
        });

        console.log("emailExist", emailExist);

        if (!emailExist) {
          throw new Error("Email not found");
        }

        const passwordMatch = bcrypt.compare(
          credentials.password as string,
          emailExist.password
        );

        console.log("passwordMatch", passwordMatch);

        if (!passwordMatch) {
          throw new Error("Password is incorrect");
        }

        return emailExist;
      },
    }),
  ],
});
