import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/productsPage.js';

const testData = JSON.parse(JSON.stringify(require('../../testData/env.json')));
const productData = JSON.parse(JSON.stringify(require('../../testData/products.json')));

test('Verify Search Product Text field', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goToPage(testData.QA_env.website_url_e2e);
    await productsPage.waitForPageLoad();
    await productsPage.searchProduct(productData.products[0].name);
    // const isProductFound = await productsPage.validateProductSearchResult(productData.products[0].name);
    expect(await productsPage.validateProductSearchResult(productData.products[0].name)).toBe(true);
});