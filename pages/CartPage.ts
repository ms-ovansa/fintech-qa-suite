import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly cartItems: Locator;
  readonly removeButton: Locator;

  readonly addBackpack: Locator;
  readonly addBikeLight: Locator;
  readonly addBoltTshirt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartItems = page.locator('.cart_item');
    this.removeButton = page.locator('[data-test^="remove"]');

    this.addBackpack  = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.addBikeLight = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.addBoltTshirt = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }
}