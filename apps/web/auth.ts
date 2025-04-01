import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import prisma from "@repo/db";
import bcrypt from "bcryptjs";

export const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // Ensure the user exists, and create them if not
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string }, // Assuming 'email' is a unique field in your user table
        });

        if (!existingUser) {
          // If the user doesn't exist, create a new user
          const hashedPassword = await bcrypt.hash("defaultPassword", 10); // Use a default or generate password

          const res = await prisma.user.create({
            data: {
              email: user.email as string,
              profile_pic: profile?.image || "", // Pull the profile picture from GitHub
              hashedPassword, // This will only work if you're using a password-based auth system
            },
          });
        }

        return true; // Allow sign in
      } catch (error) {
        console.error("Error in signIn callback", error);
        return false; // If something goes wrong, deny sign-in
      }
    },
  },
});
