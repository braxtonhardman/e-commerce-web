import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { permission, user, user_permission } from './schema';  // Ensure this path is correct
import { eq } from 'drizzle-orm'; // This is used to compare if something is equal ( Filter and Conditional Operators )


async function initDB(): Promise<any> { 
    const db = drizzle(process.env.DATABASE_URL!);
    return db
}
// Add user function to export to next-auth for adding users 
export async function addUser(first_name: string, last_name: string, email: string) {
    

  const userValues: typeof user.$inferInsert = {
    first_name: first_name,
    last_name: last_name,
    email: email,
  };

  try {
    const db = await initDB();

    await db.insert(user).values(userValues);
    console.log('New user created!');
  
    const users = await db.select().from(user);
    console.log('Getting all users from the database: ', users);

    return users;
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// Most importnat is this aysnc function which means that compared to java where a function must complete before being executed
// Javascript async functions do not wait for the completion. A async function either returns a promise or an error. 
// When you use the keyword await this will wait for that function to be completed before continuing.
export async function getUser(email: string): Promise<boolean> { 
  try{ 
    const db = await initDB();

    const userV = await db 
      .select()
      .from(user)
      .where(eq(user.email, email))
      if(userV.length === 0) { 
        return false
      } else { 
        return true
      }
  } catch(error) { 
    return false
  }
}

// Add a Permisison 
export async function addPermissions() { 
    const values: typeof permission.$inferInsert = {
        value: "default"
    }
    try {   
        const db = await initDB();

        const per = await db.insert(permission).values(values);
        console.log('New permission created!');
        console.log(per);
    } catch(error) { 
        console.error(error);
    }
}

async function getPermissions(userEmail: string): Promise<number> { 
    try { 
        const db = await initDB(); 
        const id = await db.select(user.id).form(user).where(user.email, userEmail)
        const permission = await db.select(user_permission.permission_id).from(user_permission).where(eq(user_permission.user_id, id))
        return permission;
        
    } catch(error) { 
        return -1
    }
}

export async function isAdmin(userEmail: string): Promise<boolean> { 
    const permission = await getPermissions(userEmail);
    if(permission == 1) { 
        return true;
    } else { 
        return false; 
    }
}