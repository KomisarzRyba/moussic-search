import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../models/schema';

const createClient = () => {
	const client = postgres(process.env.DATABASE_URL!);
	return drizzle(client, {
		schema: schema,
	});
};

const globalDB = globalThis as typeof globalThis & {
	db?: ReturnType<typeof createClient>;
};
const db = globalDB.db || createClient();

if (process.env.NODE_ENV !== 'production') globalDB.db = db;

export default db;
