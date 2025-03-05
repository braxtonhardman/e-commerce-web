// Module Augmentation https://next-auth.js.org/getting-started/typescript

import { DefaultSession, DefaultUser } from "next-auth"
import {JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" { 
    interface Session { 

        // Added extra fields id and role to user and added the rest of 
        // the roles using & DefaultSession 
        user: {
            id: string, 
            email: string,
            role: string, 
        } & DefaultSession
    }

    // Reason we extend here is because we dont have a nested object and directly 
    // need to change User object
    interface User extends DefaultUser { 
        role: string, 
    }
}

declare module "next-auth/jwt" { 
    interface JWT extends DefaultJWT { 
        role: string, 
    }
}