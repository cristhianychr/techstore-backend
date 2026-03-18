import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

export const pgPool = new Pool({
    connectionString: process.env.POSTGRES_URI
});