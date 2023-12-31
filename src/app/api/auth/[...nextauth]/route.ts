import NextAuthConfiguration from "@/shared/config/NextAuth";
import NextAuth from "next-auth";

const handler = NextAuth(NextAuthConfiguration);

export { handler as GET, handler as POST };
