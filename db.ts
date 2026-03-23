import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'admin',
  database: 'automationdb',
  port: 5432,
});

export default pool;