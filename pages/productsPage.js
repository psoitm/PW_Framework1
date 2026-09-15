import { BasePage } from "./basePage.js";


export class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.ProductSearchInput = page.locator('#ecomSearch');
        this.firstproductCategory = page.locator('//*[contains(@data-testid,"ecom-product")]/span');
        this.firstproductName = page.locator('//*[contains(@data-testid,"ecom-product")]/h4');
        this.firstproductPrice = page.locator('//*[contains(@data-testid,"ecom-product")]/p');
        this.addCartButton = page.getByTestId('ecom-add-p1');
    }
    async searchProdcttextFiledValidation() {
        await this.isVisible(this.ProductSearchInput);
    }

    async goToPage(url) {
        await this.goto(url);
    }

    async clickAddToCart() {
        await this.click(this.addCartButton);
    }

    async searchProduct(productName) {
        await this.enterText(this.ProductSearchInput, productName);
        await this.ProductSearchInput.press('Enter');
    }
    async validateProductSearchResult(productName) {
        if (await this.firstproductName.textContent() === productName) {
            return true;
        }
        return false;
    }

    async validateProductPrice(price) {
        let productPrice = await this.firstproductPrice.textContent();

        if (productPrice.match(/\$[\d.]+/)[0] === price) {
            return true;
        }
        return false;
    }

    async validateStockAvailability() {
        let productStock = await this.firstproductPrice.textContent();
        if (productStock.includes('in stock')) {
            return true;
        }
        return false;
    }

    async validateProductCategory(category) {
        let productCategory = await this.firstproductCategory.textContent();
        if (productCategory === category) {
            return true;
        }
        return false;
    }





}