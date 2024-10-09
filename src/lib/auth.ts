import NextAuth, { NextAuthConfig } from "next-auth";

const config = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized: ({ request }) => {
      const appAccess = request.nextUrl.pathname.includes("/app");
      if (appAccess) return false;
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth } = NextAuth(config);
