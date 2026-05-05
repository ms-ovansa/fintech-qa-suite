import { test, expect } from '@playwright/test';
import { type LoginPage } from '../pages/LoginPage.js';
import { type CartPage } from '../pages/CartPage.js';

test.describe('Cart: add and remove items', () => {
  let loginPage: LoginPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const { LoginPage } = await import('../pages/LoginPage.js');
    const { CartPage } = await import('../pages/CartPage.js');

    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('can add an item to the cart', async ({ page }) => {
  await cartPage.addBackpack.click();
  await expect(cartPage.cartBadge).toHaveText('1');
});

test('cart badge updates when multiple items added', async ({ page }) => {
  await cartPage.addBackpack.click();
  await cartPage.addBikeLight.click();
  await expect(cartPage.cartBadge).toHaveText('2');
});

test('can remove an item from the cart', async ({ page }) => {
  await cartPage.addBackpack.click();
  await cartPage.goto();
  await cartPage.removeButton.click();
  await expect(cartPage.cartItems).toHaveCount(0);
});

  test('cart is empty on fresh login', async ({ page }) => {
    await expect(cartPage.cartBadge).not.toBeVisible();
  });
});