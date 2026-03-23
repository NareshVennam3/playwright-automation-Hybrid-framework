import { test as base } from '@playwright/test';
import { getToken } from '../utils/tokenManager';
import { EmployeeHelper } from '../helpers/EmployeeHelper';

type MyFixtures = {
  employeeAPI: EmployeeHelper;
};

export const test = base.extend<MyFixtures>({

  employeeAPI: async ({ request }, use) => {

    const token = await getToken(request);

    const employeeHelper = new EmployeeHelper(request, token);

    await use(employeeHelper);

  }

});

export { expect } from '@playwright/test';