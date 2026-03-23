import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './src/tests',

  timeout: 30000,

  expect: {
    timeout: 5000
  },

  fullyParallel: true,

  retries: 1,

  reporter: [
    ['line'],
    ['allure-playwright']
  ],

  use: {
    baseURL: 'http://localhost:3000',

    headless: false,

    video: 'retain-on-failure',

    screenshot: 'only-on-failure',

    trace: 'on-first-retry',

    actionTimeout: 0,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

});