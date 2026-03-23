import { APIRequestContext } from '@playwright/test';

export async function getToken(request: APIRequestContext): Promise<string> {

  const response = await request.post('http://localhost:3000/api/login', {
    data: {
      username: 'admin',
      password: 'admin'
    }
  });

  const body = await response.json();
  return body.token;
}