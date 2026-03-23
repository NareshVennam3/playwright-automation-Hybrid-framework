import { APIRequestContext } from '@playwright/test';

export class AuthHelper {

  constructor(private request: APIRequestContext) {}

  async login(username: string, password: string) {

    return await this.request.post('/api/login', {
      data: { username, password }
    });

  }

}