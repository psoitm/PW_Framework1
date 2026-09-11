import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/productsPage.js';

test('Verify Search Product Text field', async ({ page }) => {

    const productsPage = new ProductsPage(page);

    await productsPage.goToPage('/practice.html#ecom-e2e');
    await productsPage.waitForPageLoad();

    await page.pause()

    //  expect(await productsPage.searchProdcttextFiledValidation()).toBeTruthy();

    // Expect a title "to contain" a substring.
    await productsPage.searchProduct('Mouse');
});