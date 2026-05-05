import { test, expect } from '@playwright/test';
import { generateUser } from '../helpers/testData.js';

test.describe('Checkout — full purchase flow', () => {

  test.beforeEach(async ({ page }) => {
    const { LoginPage } = await import('../pages/LoginPage.js');
    const { CartPage } = await import('../pages/CartPage.js');

    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await cartPage.addBackpack.click();
    await cartPage.goto();
  });

  test('completes full checkout with random user data', async ({ page }) => {
    const { CheckoutPage } = await import('../pages/CheckoutPage.js');
    const checkoutPage = new CheckoutPage(page);
    const user = generateUser();  // different data every single run

    await checkoutPage.checkoutButton.click();
    await checkoutPage.fillDetails(user.firstName, user.lastName, user.postalCode);
    await checkoutPage.finishButton.click();

    await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
  });

  test('cannot proceed with empty first name', async ({ page }) => {
    const { CheckoutPage } = await import('../pages/CheckoutPage.js');
    const checkoutPage = new CheckoutPage(page);
    const user = generateUser();

    await checkoutPage.checkoutButton.click();
    // deliberately blank out first name, keep rest realistic
    await checkoutPage.fillDetails('', user.lastName, user.postalCode);

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

});