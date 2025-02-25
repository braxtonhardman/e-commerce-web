import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { permission } from './schema';

const db = drizzle(process.env.DATABASE_URL!);

async function allValues() { 
    const values = await db.select().from(permission)
    console.log(values)
}
allValues()
