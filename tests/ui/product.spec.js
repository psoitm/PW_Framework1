import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/productsPage.js';

const testData = JSON.parse(JSON.stringify(require('../../testData/env.json')));
const productData = JSON.parse(JSON.stringify(require('../../testData/products.json')));

test('Verify Search Product Name in Result items', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goToPage(testData.QA_env.website_url_e2e);
    await productsPage.waitForPageLoad();
    await productsPage.searchProduct(productData.products[0].name);
    expect(await productsPage.validateProductSearchResult(productData.products[0].name)).toBe(true);
});

test('Verify Search Product Price in Result items', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goToPage(testData.QA_env.website_url_e2e);
    await productsPage.waitForPageLoad();
    await productsPage.searchProduct(productData.products[0].name);
    expect(await productsPage.validateProductPrice(productData.products[0].price)).toBe(true);
});

test('Verify Search Product Availability in Result items', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goToPage(testData.QA_env.website_url_e2e);
    await productsPage.waitForPageLoad();
    await productsPage.searchProduct(productData.products[0].name);
    expect(await productsPage.validateStockAvailability()).toBe(true);
});

test('Verify Search Product Category in Result items', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goToPage(testData.QA_env.website_url_e2e);
    await productsPage.waitForPageLoad();
    await productsPage.searchProduct(productData.products[0].name);
    expect(await productsPage.validateProductCategory(productData.products[0].category)).toBe(true);
});