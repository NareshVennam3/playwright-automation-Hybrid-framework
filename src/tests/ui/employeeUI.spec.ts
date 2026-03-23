import { test, expect } from '@playwright/test';

test('User can login and add employee', async ({ page }) => {

  const employeeName = 'Mithun';

  // Open application
  await page.goto('http://localhost:3000');

  // Login
  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard
  await page.waitForURL('**/dashboard');

  // Add employee
  await page.getByPlaceholder('Employee Name').fill(employeeName);
  await page.getByRole('button', { name: 'Add Employee' }).click();

  // Wait for employees page
  await page.waitForURL('**/employees');

  // Validation
 await expect(page.getByText(employeeName).first()).toBeVisible();

});