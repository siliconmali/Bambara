import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id,
          email: existingUser.email,
          surname: existingUser.surname,
          lastName: existingUser.lastName,
          role: existingUser.role,
          status: existingUser.status,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          surname: user.surname,
          lastName: user.lastName,
          role: user.role,
          status: user.status,
        };
      }
  
      if (trigger === "update" && session) {
        return {
          ...token,
          ...session,
        };
      }
  
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          id: token.id,
          email: token.email,
          surname: token.surname,
          lastName: token.lastName,
          role: token.role,
          status: token.status,
        };
      }
      return session;
    },
  },
};