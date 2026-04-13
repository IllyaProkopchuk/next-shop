import { test, expect } from '@playwright/test';

test.describe('Shopping Flow', () => {
  test('should navigate to products and add an item to the cart', async ({ page }) => {
    // 1. Go to home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Next Shop/i);

    // 2. Navigate to products page
    const productsLink = page.getByRole('link', { name: /products/i });
    await productsLink.click();
    await expect(page).toHaveURL(/.*products/);

    // 3. Find a product and add it to bucket
    const firstProductCard = page.locator('article').first();
    const productName = await firstProductCard.locator('h2').textContent();
    const addButton = firstProductCard.getByRole('button', { name: /add to bucket/i });
    
    // If the product is already in the bucket, it might say "Remove from bucket"
    if (await addButton.count() > 0) {
      await addButton.click();
      // After clicking, it should change to "Remove from bucket"
      await expect(firstProductCard.getByRole('button', { name: /remove from bucket/i })).toBeVisible();
    }

    // 4. Navigate to cart
    await page.getByRole('link', { name: /cart/i }).click();
    await expect(page).toHaveURL(/.*cart/);

    // 5. Verify the product is in the cart
    if (productName) {
      await expect(page.locator('body')).toContainText(productName);
    }
  });

  test('should be able to change quantity in cart', async ({ page }) => {
    await page.goto('/cart');
    
    // Find the first item in cart if any
    const cartItem = page.locator('div.flex.items-center.gap-4.mt-2').first();
    if (await cartItem.count() > 0) {
      const initialCount = await cartItem.locator('span').textContent();
      
      // Click increase
      await cartItem.getByRole('button', { name: '+' }).click();
      
      // The count should eventually update (or show "…" during transition)
      await expect(cartItem.locator('span')).not.toHaveText('…');
      const updatedCount = await cartItem.locator('span').textContent();
      
      if (initialCount && updatedCount) {
        expect(parseInt(updatedCount)).toBe(parseInt(initialCount) + 1);
      }
    }
  });
});
