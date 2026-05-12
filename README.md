# Fintech QA Suite

A Playwright + TypeScript end-to-end test suite built to demonstrate 
production-quality automation engineering for fintech applications.

## What This Tests

This suite covers the three most critical user journeys on a fintech 
demo application:

| Feature | Tests | Coverage |
|---------|-------|----------|
| Authentication | 4 | Valid login, locked user, wrong password, empty credentials |
| Shopping Cart | 4 | Add item, multiple items, remove item, empty cart state |
| Checkout Flow | 3 | Full purchase, missing first name, missing postal code |

**Total: 11 tests across 3 feature areas**

## Tech Stack

- **Playwright** — browser automation and test runner
- **TypeScript** — type-safe test code
- **Faker.js** — realistic randomised test data on every run
- **GitHub Actions** — CI pipeline runs on every push to main

## Project Structure

fintech-qa-suite/
├── .github/workflows/
│   └── playwright.yml    # CI pipeline definition
├── helpers/
│   └── testData.ts       # Faker.js data generators
├── pages/
│   ├── LoginPage.ts      # Page Object: authentication
│   ├── CartPage.ts       # Page Object: cart and products
│   └── CheckoutPage.ts   # Page Object: checkout form
├── tests/
│   ├── auth.spec.ts      # Authentication test cases
│   ├── cart.spec.ts      # Cart functionality test cases
│   └── checkout.spec.ts  # Checkout flow test cases
└── playwright.config.ts  # Playwright configuration

## How To Run Locally

**Prerequisites:** Node.js 20+ installed

```bash
# Clone the repo
git clone https://github.com/ms-ovansa/fintech-qa-suite.git
cd fintech-qa-suite

# Install dependencies
npm install

# Install Playwright browser
npx playwright install chromium

# Run all tests
npx playwright test

# Run with browser visible
npx playwright test --headed

# Run a specific test file
npx playwright test tests/auth.spec.ts

# Open the HTML report after running
npx playwright show-report
```

## CI Pipeline

Every push to `main` triggers the GitHub Actions pipeline which:

1. Installs Node.js 20 and project dependencies
2. Downloads Playwright's controlled Chromium browser
3. Runs the full test suite in headless mode
4. Uploads the HTML test report as a build artifact

Test reports are available in the Actions tab under each workflow run.

## Design Decisions

**Page Object Model** — all locators and page interactions live in 
`/pages`. Tests only describe behaviour, never DOM details. If a 
selector changes, one file updates — not every test.

**Faker.js for test data** — no hardcoded names or postcodes. Every 
run uses a different randomly generated user, ensuring tests don't 
pass because of one lucky input.

**data-test attributes** — all locators use `[data-test="..."]` 
selectors. These are stable, immune to CSS refactors, and the 
industry standard for testable UIs.

**headless in CI, headed locally** — `playwright.config.ts` detects 
the `CI` environment variable and sets headless mode automatically.