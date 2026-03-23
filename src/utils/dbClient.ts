import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'admin',
  database: 'automationdb',
  port: 5432
});

export async function getEmployee(name: string) {

  const result = await pool.query(
    'SELECT name FROM employees WHERE name=$1',
    [name]
  );

  return result.rows;
}