import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/productsPage.js';

import { ExcelUtils } from '../../utils/excelutils.js';
import { Console } from 'console';

const testData = JSON.parse(JSON.stringify(require('../../testData/env.json')));
const productData = JSON.parse(JSON.stringify(require('../../testData/products.json')));


test.beforeAll(async () => {

    console.log('Starting Product Tests');
});
test.beforeEach(async ({ page }) => {
    console.log('Starting a new test');
})

test.afterAll(async () => {
    console.log('Product Tests Completed');
}
)
test.afterEach(async ({ page }) => {
    console.log('Test completed');
});

const data = [
    { productName: 'Wireless Mouse', price: '$10.00', category: 'Category A' },
    { productName: 'Mechanical Keyboard', price: '$20.00', category: 'Category B' },
    { productName: '27" 4K Monitor', price: '$30.00', category: 'Category C' }
];

for (const data1 of data) {
    test(`Verify Search Product Name in Result items for ${data1.productName}`, async ({ page }) => {
        const productsPage = new ProductsPage(page);
        await productsPage.goToPage(testData.QA_env.website_url_e2e);
        await productsPage.waitForPageLoad();
        await productsPage.searchProduct(data1.productName);
        expect(await productsPage.validateProductSearchResult(data1.productName)).toBe(true);
    });
}

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

test('Read Data From Excel', async ({ page }) => {
    const excelFilePath = 'testData/data.xlsx';
    const excelSheet = 'Sheet1';
    const resultSheet = 'data';

    const cellValue = await ExcelUtils.getCellValue(excelFilePath, excelSheet, 'A2');
    console.log(`Value in cell A2: ${cellValue}`);

    const productsPage = new ProductsPage(page);
    await productsPage.goToPage(testData.QA_env.website_url_e2e);
    await productsPage.waitForPageLoad();
    await productsPage.searchProduct(cellValue);
    expect(await productsPage.validateProductSearchResult(cellValue)).toBe(true);

    await ExcelUtils.writeExcel(excelFilePath, resultSheet, ['admin', 'admin123', 'Dashboard', 'PASS']);
});

test("write Data To Excel", async ({ page }) => {

    const productsPage = new ProductsPage(page);
    await productsPage.goToPage(testData.QA_env.website_url_e2e);
    await productsPage.waitForPageLoad();
    Console.log("Writing Data to Excel");
    const excelFilePath = 'testData/data.xlsx';
    const resultSheet = 'data';
    await ExcelUtils.writeExcel(excelFilePath, resultSheet, ['admin', 'admin123', 'Dashboard', 'PASS']);
});
test('test', async ({ page }) => {
    await page.goto('https://vivtechguru.com/practice.html#dashboard');
    await page.locator('#navModules').getByText('Basic Elements').click();
    await page.getByTestId('txt-normal').click();
    await page.getByTestId('txt-normal').fill('Pardeep');
    await page.getByText('Fill Clear').click();
    await page.getByTestId('txt-fill-btn').click();
    await page.getByTestId('txt-clear-btn').click();
    await page.getByTestId('pwd-validate-btn').click();
    await page.getByText('FAIL — needs upper, lower,').click();
    await page.locator('#navModules').getByText('Tabs & Accordion').click();
    await page.getByText('Dynamic Table06').click();
    await page.locator('#navModules').getByText('Dynamic Elements').click();
    await page.locator('#navModules').getByText('Alerts & Dialogs').click();
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => { });
    });
    await page.getByTestId('btn-open-confirm').click();
    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => { });
    });
    await page.getByTestId('btn-open-alert').click();
    await page.getByText('Radio & Checkbox02').click();
    await page.locator('#navModules').getByText('Modal Dialogs').click();
    await page.locator('#navModules').getByText('Login Practice').click();
    await page.locator('#navModules').getByText('Mouse & Keyboard Lab').click();
});