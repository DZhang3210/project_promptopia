import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import User from '@/models/user.js'
import { connectToDb } from '@/utils/database';

export const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      })
    ],
    callbacks: {
      async session({ session }) {
        // store the user id from MongoDB to session
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
  
        return session;
      },
      async signIn({ account, profile, user, credentials }) {
        try {
          await connectToDb();
  
          // check if user already exists
          const userExists = await User.findOne({ email: profile.email });
  
          // if not, create a new document and save user in MongoDB
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name.replace(" ", "").toLowerCase(),
              image: profile.picture,
            });
          }
  
          return true
        } catch (error) {
          console.log("Error checking if user exists: ", error.message);
          return false
        }
      },
    }
  }