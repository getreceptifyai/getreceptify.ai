import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getEnv } from "@/lib/env";
import { supabaseAdmin } from "@/lib/supabase/admin";

const env = getEnv();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.email || !user.id) {
        return false;
      }

      const { error } = await supabaseAdmin.from("users").upsert(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        { onConflict: "id" },
      );
      if (error) {
        return false;
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
};
