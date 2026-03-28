import pg from 'pg';
import env from '@/src/lib/env'
const { Pool } = pg;

const pool = new Pool({
  user: env.DB_USER,
  host: env.DB_URL,
  database: env.DB_NAME,
  password: env.DB_PASS,
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;