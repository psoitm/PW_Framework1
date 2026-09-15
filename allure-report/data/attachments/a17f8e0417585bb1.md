# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\product.spec.js >> Verify Search Product Price in Result items
- Location: tests\ui\product.spec.js:16:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - complementary [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]: VivTechGuru
        - generic [ref=e8]: Playwright & Selenium Practice Lab
      - textbox "filter modules…" [ref=e10]
      - navigation [ref=e11]:
        - generic [ref=e12] [cursor=pointer]:
          - generic [ref=e13]: Dashboard
          - generic [ref=e14]: "00"
        - generic [ref=e15]: Practice Modules
        - generic [ref=e16] [cursor=pointer]:
          - generic [ref=e17]: Basic Elements
          - generic [ref=e18]: "01"
        - generic [ref=e19] [cursor=pointer]:
          - generic [ref=e20]: Radio & Checkbox
          - generic [ref=e21]: "02"
        - generic [ref=e22] [cursor=pointer]:
          - generic [ref=e23]: Dropdowns
          - generic [ref=e24]: "03"
        - generic [ref=e25] [cursor=pointer]:
          - generic [ref=e26]: Alerts & Dialogs
          - generic [ref=e27]: "04"
        - generic [ref=e28] [cursor=pointer]:
          - generic [ref=e29]: Dynamic Elements
          - generic [ref=e30]: "05"
        - generic [ref=e31] [cursor=pointer]:
          - generic [ref=e32]: Dynamic Table
          - generic [ref=e33]: "06"
        - generic [ref=e34] [cursor=pointer]:
          - generic [ref=e35]: Tabs & Accordion
          - generic [ref=e36]: "07"
        - generic [ref=e37] [cursor=pointer]:
          - generic [ref=e38]: Modal Dialogs
          - generic [ref=e39]: "08"
        - generic [ref=e40] [cursor=pointer]:
          - generic [ref=e41]: Tooltips
          - generic [ref=e42]: "09"
        - generic [ref=e43] [cursor=pointer]:
          - generic [ref=e44]: Mouse & Keyboard Lab
          - generic [ref=e45]: "10"
        - generic [ref=e46] [cursor=pointer]:
          - generic [ref=e47]: Browser Storage
          - generic [ref=e48]: "11"
        - generic [ref=e49] [cursor=pointer]:
          - generic [ref=e50]: Login Practice
          - generic [ref=e51]: "12"
        - generic [ref=e52] [cursor=pointer]:
          - generic [ref=e53]: Locator Cheat Sheet
          - generic [ref=e54]: "13"
        - generic [ref=e55] [cursor=pointer]:
          - generic [ref=e56]: Window & Tab Handles
          - generic [ref=e57]: "14"
        - generic [ref=e58] [cursor=pointer]:
          - generic [ref=e59]: Iframe Practice
          - generic [ref=e60]: "15"
        - generic [ref=e61] [cursor=pointer]:
          - generic [ref=e62]: E-commerce E2E Flow
          - generic [ref=e63]: "16"
        - generic [ref=e64] [cursor=pointer]:
          - generic [ref=e65]: Date Picker
          - generic [ref=e66]: "17"
        - generic [ref=e67] [cursor=pointer]:
          - generic [ref=e68]: File Upload & Download
          - generic [ref=e69]: "18"
    - generic [ref=e70]:
      - generic [ref=e71]:
        - generic [ref=e72]: VivTechGuru / E-commerce E2E Flow
        - generic [ref=e74]: beginner · intermediate · advanced
      - generic [ref=e76]:
        - heading "16 · E-commerce E2E Flow" [level=1] [ref=e77]
        - paragraph [ref=e78]: A complete shop journey in one scenario — browse, add to cart, check out, and confirm an order. Built for scripting one full end-to-end test in Playwright or Selenium.
        - generic [ref=e79]:
          - generic [ref=e80]:
            - button "1 · Products" [ref=e81] [cursor=pointer]
            - button "2 · Cart" [ref=e82] [cursor=pointer]
            - button "3 · Checkout" [ref=e83] [cursor=pointer]
            - button "4 · Confirmation" [ref=e84] [cursor=pointer]
          - button "🛒 Cart (0) — $0.00" [ref=e85] [cursor=pointer]
        - generic [ref=e87]:
          - generic [ref=e88]:
            - generic [ref=e89]:
              - generic [ref=e90]: Search products
              - searchbox "e.g. keyboard" [active] [ref=e91]: Wireless Mous
            - generic [ref=e92]:
              - generic [ref=e93]: Category
              - combobox [ref=e94]:
                - option "All categories" [selected]
                - option "Accessories"
                - option "Monitors"
                - option "Furniture"
            - generic [ref=e95]:
              - generic [ref=e96]: Sort by
              - combobox [ref=e97]:
                - option "Featured" [selected]
                - 'option "Price: low → high"'
                - 'option "Price: high → low"'
          - generic [ref=e99]:
            - generic [ref=e100]: ACCESSORIES
            - heading "Wireless Mouse" [level=4] [ref=e101]
            - paragraph [ref=e102]: $19.99 · 12 in stock
            - button "Add to cart" [ref=e104] [cursor=pointer]
      - contentinfo [ref=e105]:
        - generic [ref=e106]: © VivTechGuru — QA Automation Practice
        - generic [ref=e107]: Playwright
        - generic [ref=e108]: Selenium
        - generic [ref=e109]: JavaScript
        - generic [ref=e110]: Python
  - generic [ref=e111]:
    - generic [ref=e112]: test-console 1 events
    - button "show console ▾" [ref=e113] [cursor=pointer]
  - generic [ref=e114]: 21:46:43VivTechGuru practice lab initialized
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { ProductsPage } from '../../pages/productsPage.js';
  3  | 
  4  | const testData = JSON.parse(JSON.stringify(require('../../testData/env.json')));
  5  | const productData = JSON.parse(JSON.stringify(require('../../testData/products.json')));
  6  | 
  7  | test('Verify Search Product Name in Result items', async ({ page }) => {
  8  |     const productsPage = new ProductsPage(page);
  9  |     await productsPage.goToPage(testData.QA_env.website_url_e2e);
  10 |     await productsPage.waitForPageLoad();
  11 |     await productsPage.searchProduct(productData.products[0].name);
  12 |     // const isProductFound = await productsPage.validateProductSearchResult(productData.products[0].name);
  13 |     expect(await productsPage.validateProductSearchResult(productData.products[0].name)).toBe(true);
  14 | });
  15 | 
  16 | test('Verify Search Product Price in Result items', async ({ page }) => {
  17 |     const productsPage = new ProductsPage(page);
  18 |     await productsPage.goToPage(testData.QA_env.website_url_e2e);
  19 |     await productsPage.waitForPageLoad();
  20 |     await productsPage.searchProduct(productData.products[0].name);
> 21 |     expect(await productsPage.validateProductPrice(productData.products[0].price)).toBe(true);
     |                                                                                    ^ Error: expect(received).toBe(expected) // Object.is equality
  22 | });
  23 | 
  24 | test('Verify Search Product Availability in Result items', async ({ page }) => {
  25 |     const productsPage = new ProductsPage(page);
  26 |     await productsPage.goToPage(testData.QA_env.website_url_e2e);
  27 |     await productsPage.waitForPageLoad();
  28 |     await productsPage.searchProduct(productData.products[0].name);
  29 |     expect(await productsPage.validateStockAvailability()).toBe(true);
  30 | });
  31 | 
  32 | test('Verify Search Product Category in Result items', async ({ page }) => {
  33 |     const productsPage = new ProductsPage(page);
  34 |     await productsPage.goToPage(testData.QA_env.website_url_e2e);
  35 |     await productsPage.waitForPageLoad();
  36 |     await productsPage.searchProduct(productData.products[0].name);
  37 |     expect(await productsPage.validateProductCategory(productData.products[0].category)).toBe(true);
  38 | });
```