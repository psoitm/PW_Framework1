import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/productsPage.js';

import { ExcelUtils } from '../../utils/excelutils.js';

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

test.only("read Data From Excel", async ({ page }) => {


    //const data = await ExcelUtils.readExcel('testData/data.xlsx', 'Sheet1');
    // console.log(data);
    const cellValue = await ExcelUtils.getCellValue('testData/data.xlsx', 'Sheet1', 'A2');
    console.log(`Value in cell A2: ${cellValue}`);

    const productsPage = new ProductsPage(page);
    await productsPage.goToPage(testData.QA_env.website_url_e2e);
    await productsPage.waitForPageLoad();
    await productsPage.searchProduct(cellValue);
    expect(await productsPage.validateProductSearchResult(cellValue)).toBe(true);
    await ExcelUtils.writeExcel('testData/data.xlsx', 'data', ['admin', 'admin123', 'Dashboard', 'PASS']);
    //expect(data.length).toBeGreaterThan(0);
});

test("write Data To Excel", async ({ page }) => {

    const productsPage = new ProductsPage(page);
    await productsPage.goToPage(testData.QA_env.website_url_e2e);
    await productsPage.waitForPageLoad();
});