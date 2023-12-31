/* eslint-disable react-hooks/rules-of-hooks */
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const NextAuthConfiguration: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const loginPayload = {
          email: credentials?.email ?? "",
          password: credentials?.password ?? "",
        };

        // get token user
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(loginPayload),
          }
        ).then((res) => res.json());

        // get user details
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${data.token}`,
            },
          }
        ).then((res) => res.json());

        if (user) {
          return {
            ...user,
            accessToken: data.token,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (typeof user !== "undefined") {
        // user has just signed in so the user object is populated
        return user as unknown as JWT;
      }
      return token;
    },
    async session({ session, token }) {
      const sanitizedToken = Object.keys(token).reduce(
        (accumulator, currentValue) => {
          // strip unnecessary properties
          if (
            currentValue !== "iat" &&
            currentValue !== "exp" &&
            currentValue !== "jti" &&
            currentValue !== "sub"
          ) {
            return { ...accumulator, [currentValue]: token[currentValue] };
          } else {
            return accumulator;
          }
        },
        {}
      );
      return { ...session, user: sanitizedToken };
    },
  },
};

export default NextAuthConfiguration;
