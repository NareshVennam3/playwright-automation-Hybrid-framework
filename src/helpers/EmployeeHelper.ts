import { APIRequestContext } from '@playwright/test';

export class EmployeeHelper {

  constructor(
    private request: APIRequestContext,
    private token: string
  ) {}

  async addEmployee(name: string) {

    return await this.request.post('http://localhost:3000/api/employees', {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      data: { name }
    });

  }

  async getEmployees() {

    return await this.request.get('http://localhost:3000/api/employees', {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });

  }

}