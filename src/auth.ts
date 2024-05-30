import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/core/types#authconfig
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/'
  },

  // https://authjs.dev/getting-started/authentication/oauth
  providers: [
    credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log('credentials', credentials)
        let user = null;

        // // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password);

        // // logic to verify if user exists
        // user = await getUserFromDb(credentials.email, pwHash);

        // if (!user) {
        //   // No user found, so this is their first attempt to login
        //   // meaning this is also the place you could do registration
        //   throw new Error("User not found.");
        // }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }
      return session;
    },
  },
});
