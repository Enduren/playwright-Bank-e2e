import { expect, Locator, Page } from '@playwright/test';
export class PayBillsPage { 
    // Define Selectors
    readonly page: Page;
    readonly payeeSelect: Locator;
    readonly accountSelect: Locator
    readonly amountInput: Locator;
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly payButton: Locator
    readonly successMessage: Locator


    // Initialize selectors using constructor
    constructor(page: Page) {
        this.page = page;
        this.payeeSelect = page.locator('#sp_payee');
        this.accountSelect = page.locator('#sp_account');
        this.amountInput = page.locator('#sp_amount');
        this.dateInput = page.locator('#sp_date');
        this.descriptionInput = page.locator('#sp_description');
        this.payButton = page.locator('#pay_saved_payees');
        this.successMessage = page.locator('#alert_content > span');
    }

    // Method to perform fund transfer
    async fillPaymentForm(payee: string, account: string, amount: string, date: string, description: string) {
        await this.payeeSelect.selectOption(payee);
        await this.accountSelect.selectOption(account);
        await this.amountInput.fill(amount);
        await this.dateInput.fill(date);
        await this.descriptionInput.fill(description);
    }
    
    async submitPayment() {
        await this.payButton.click();
    }  

    async assertSuccessMessageVisible() {
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText('The payment was successfully submitted.');
    }
}