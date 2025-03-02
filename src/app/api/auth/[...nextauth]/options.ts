import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { GoogleProfile } from "next-auth/providers/google";

export const options: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        // Secifies which provider to ues whic is set up in google cloud 
        // These variables are inside the .env file 
        GoogleProvider({
            profile(profile: GoogleProfile) { 
                //console.log(profile)
                return { 
                    ...profile, 
                    role: profile.role ?? "user",
                    id: profile?.sub, 
                    image: profile.picture
                }
            },
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "password"
                },
            },
            async authorize(credentials) { 
                const user = {id: "42", name: "Dave", password: "nextauth", admin: "admin"}
                // Make database calls here to validate authentication 
                if(credentials?.username === user.name && credentials?.password === user.password
                ) { 
                    return user; 
                } else { 
                    return null
                }
            },
        }),
    ],
    callbacks: { 
        async jwt({ token, user }) { 
            // Essentially we are getting the token and rule from the user and putting the 
            // Role from the user in the JTW token 
            if (user) token.role = user.role 
            return token
        },
        async session({ session, token}) { 
            // This is to be used on client components we are getting the role stored 
            // in our token and putting it into the session 
            if (session?.user) session.user.role = token.role
            return session
        }
    }
}