# Playwright Hybrid Automation Framework (UI + API + DB)

## 📌 Overview
A scalable automation framework built using **Playwright with TypeScript** for **UI, API, and Database testing**.  
Designed with a modular structure using fixtures, helpers, and utilities for better maintainability and reusability.

---

## 🚀 Tech Stack
- Playwright (TypeScript)
- Node.js
- SQL (Database validation)
- GitHub Actions (CI/CD)
- Docker

---

## 🏗️ Features
- End-to-End Testing (UI + API + DB)
- Reusable fixtures, helpers, and utilities
- Modular and scalable framework design
- Parallel test execution
- Cross-browser testing (Chromium, Firefox, WebKit)
- Network interception and mocking
- CI/CD integration using GitHub Actions
- Docker support for containerized execution

---

## 📂 Project Structure
src/
- fixtures        # Reusable setup and test context
- helpers         # Common helper functions
- tests
  - ui            # UI test cases
  - api           # API test cases
  - db            # Database validation tests
- utils           # Utility functions

---

## ▶️ How to Run Tests

### Install dependencies
npm install

### Run all tests
npx playwright test

### Run specific test suites
npx playwright test src/tests/ui  
npx playwright test src/tests/api  
npx playwright test src/tests/db  

---

## 🔁 CI/CD Integration
Integrated with **GitHub Actions** to run tests automatically on every push.

---

## 🐳 Docker Support
Dockerfile included to execute tests in a containerized environment.

---

## 👨‍💻 Author
Naresh Reddy
