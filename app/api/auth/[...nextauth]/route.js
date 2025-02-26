import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { getUser, addUser } from "@/db/functions";
// Configuration for OAuth
// Essentially we are creating an endpoint so when the user visits [source]/api/auth/*
// OAuth is going to handle any request to that endpoint
// To create a custom page to style OAuth we are displaying the signIn page which is the same route in the nextJS 
// The pages option is not the path to our file but what characters come after /api/auth/ 

// Callbacks are asynchronous functions you can use to control what happens when an action is performed.
// So if a user is not in the database we want to add a user to the database using Drizzle to talk to our database 
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // Secifies which provider to ues whic is set up in google cloud 
    // These variables are inside the .env file 
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/signin' // This is a route path not a file path 
  }, 
  session: { 
    strategy: "jwt",
    maxAge: 6 * 60 * 60, // 6 hours (in seconds)
  },
  callbacks: { 
    // On signIn we want to verify if user has an account if so login if not create an account 
    async signIn( {profile} ){

        // Check if there is an account to create
        if(!profile?.email) { 
            throw Error("No profile")
        }
        
        // Check if user is already in database custom functions written in the db 
        const isUser = await getUser(profile.email);
        // If user is not in database create new user in database 
        if(!isUser) { 
          // Split the first and last name to be added to the database
          const names = profile.name.split(" ");
          console.log(names);
          const user = await addUser(names[0], names[1], profile.email);
          console.log(user);
        }

        return true;
    },
    async jwt({ token, account, profile }) {
      // Ensure the token object has a `user` property
      // Make sure the token user exists before trying to add email to it 
      if (!token.user) {
        token.user = {};
      }
    
      // Persist the OAuth access_token and the user id to the token after sign-in
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.id;  // Use profile?.id in case profile is not null
      }
    
      if (profile) {
        token.user.email = profile.email;  // Set the user's email on the token
      }
    
      return token;
    },
      // This callback is triggered when the session is being created
      async session({ session, token }) {
        if (token) {
          session.user.email = token.email;  // Add email from token to the session object
        }
        return session;
      },
      async redirect({ baseUrl }) { 
        // On sign in return to home page which is baseURL
        return baseUrl
      }
  },
  
};

// This is for app routes
export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);

