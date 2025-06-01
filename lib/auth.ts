import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

 
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            }
          );
          const user = await res.json();
          if (user?.error) {
            console.error("❌ Login error:", user.error);
            return null;
          }
          return user;
        } catch (err) {
          console.error("❌ Unexpected error:", err);
          return null;
        }
      },
    }),

    // 2) The Google OAuth provider:
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // 3) The GitHub OAuth provider:
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth", 
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
