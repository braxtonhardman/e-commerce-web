import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { user } from "@/db/schema";


export const options: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "email",
                    placeholder: "example@example.com"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "password"
                },
            },
            async authorize(credentials) {
                try {
                    if (credentials?.email && credentials?.password) {
                        const sql = neon(process.env.DATABASE_URL!);
                        const db = drizzle(sql, { schema });
                        const res = await db.select().from(schema.user).where(eq(schema.user.email, credentials.email));
                        
                        if (res.length > 0) {
                            const current_user = res[0];
                            let result = await db.select().from(schema.user_permission).where(eq(schema.user_permission.user_id, current_user.id))
                            let role; 
                            if(result.length > 0) { 
                                if(result[0].permission_id === 2) { 
                                    role = "default"
                                } else if(result[0].permission_id === 1) { 
                                    role = "admin"
                                }
                            } else { 
                                return null
                            }
                            const bcrypt = require('bcrypt');
                            const match = await bcrypt.compare(credentials.password, current_user.password);
                            console.log(match);
            
                            if (credentials.email === current_user.email && match) {
                                // Return a more complete user object with id, email, and role
                                const user = {
                                    id: current_user.id.toString(), // Ensure id is a string
                                    email: current_user.email,
                                    role: role || 'default'
                                };
                                console.log(user)
                                return user
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
    pages: { 
        signIn: "/signin",
    },
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