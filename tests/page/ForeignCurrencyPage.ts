import { expect, Locator, Page } from '@playwright/test';
export class ForeignCurrencyPage {
    readonly page: Page;
    readonly currencySelect: Locator
    readonly amountInput: Locator;
    readonly usDollarRadio: Locator
    readonly selectedCurrencyRadio: Locator
    readonly calculateCostsButton: Locator
    readonly purchaseButton: Locator
    readonly successMessage: Locator
    
    constructor(page: Page) {
        this.page = page;
        this.currencySelect = page.locator('#pc_currency');
        this.amountInput = page.locator('#pc_amount');
        this.usDollarRadio = page.locator('#pc_inDollars_true');
        this.selectedCurrencyRadio = page.locator('#pc_inDollars_false');
        this.calculateCostsButton = page.locator('#pc_calculate_costs');
        this.purchaseButton = page.locator('#purchase_cash');
        this.successMessage = page.locator('#alert_content');
    }
    async fillCurrencyExchangeForm(currency: string, amount: string, inDollars: boolean) {
        await this.currencySelect.selectOption(currency);
        await this.amountInput.fill(amount);
        if (inDollars) {
            await this.usDollarRadio.check();
        } else {
            await this.selectedCurrencyRadio.check();
        }
    }

    async calculateCosts() {
        await this.calculateCostsButton.click();
    }
    async purchaseForeignCurrency() {
        await this.purchaseButton.click();
    }
    async assertSuccessMessageVisible() {
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText('Foreign currency cash was successfully purchased');
    }
}