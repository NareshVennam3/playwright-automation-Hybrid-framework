import { test, expect } from '@playwright/test';
import pool from '../../../db';

test.describe.serial('DB Tests', () => {

  // 🔹 Runs after every test
  test.afterEach(async () => {
    const finalList = await pool.query(
      `SELECT * FROM employees ORDER BY id ASC`
    );
    console.log('Final Employees List:', finalList.rows);
  });
  test('Employees list', async () => {
    const result = await pool.query(
      `SELECT * FROM employees ORDER BY id ASC`
    );
    expect(result.rows.length).toBeGreaterThan(0);
  });

  // ✅ Insert + Validate
  test('Insert and validate employee', async () => {
    const name = 'Naresh_QA_Engineer';

    await pool.query(
      `INSERT INTO employees(name) VALUES($1)`,
      [name]
    );

    const result = await pool.query(
      `SELECT * FROM employees WHERE name=$1`,
      [name]
    );

    expect(result.rows.length).toBeGreaterThan(0);
  });

  // ✅ Update + Validate
  test('update employee name by id', async () => {
    const id = 10; // safe after reset
    const newName = 'Naresh_QA_Lead';

    await pool.query(
      `UPDATE employees SET name=$1 WHERE id=$2`,
      [newName, id]
    );

    const result = await pool.query(
      `SELECT * FROM employees WHERE id=$1`,
      [id]
    );

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].name).toBe(newName);
  });

  // ✅ Delete using LIKE + Validate
  test('delete employees with Framework and validate', async () => {
    const keyword = 'QA_Engineer';

    await pool.query(
      `DELETE FROM employees WHERE name LIKE $1`,
      [`%${keyword}%`]
    );

    const result = await pool.query(
      `SELECT * FROM employees WHERE name LIKE $1`,
      [`%${keyword}%`]
    );

    expect(result.rows.length).toBe(0);
  });

  // ✅ Reset table (cleanup)
  // test('reset table', async () => {
  //   await pool.query(`TRUNCATE TABLE employees RESTART IDENTITY`);
  // });

});