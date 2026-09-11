import { BasePage } from "./basePage.js";


export class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        this.page = page;
        this.ProductSearchInput = page.locator('#ecomSearch');
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



}