import { test, expect } from '../../fixtures/apiFixture';

test.describe('Employee API Tests', () => {

  test('Add employee', async ({ employeeAPI }) => {

    const response = await employeeAPI.addEmployee('QA_Engineer');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.employee).toBe('QA_Engineer');

  });

  test('Validate employee exists', async ({ employeeAPI }) => {

    await employeeAPI.addEmployee('QA_Engineer');

    const response = await employeeAPI.getEmployees();
    const employees = await response.json();

    expect(employees).toContain('QA_Engineer');
    console.log('Current Employees:', employees);

  });

});