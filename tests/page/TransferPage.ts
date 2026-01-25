import { expect, Locator, Page } from '@playwright/test';
export class TransferPage {
    readonly page: Page;
    readonly fromAccountSelect: Locator
    readonly toAccountSelect: Locator
    readonly amountInput: Locator
    readonly descriptionInput: Locator
    readonly submitButton: Locator
    readonly successMessage: Locator
    readonly boardHeader: Locator

    constructor(page: Page) {
        this.page = page;
        this.fromAccountSelect = page.locator('#tf_fromAccountId');
        this.toAccountSelect = page.locator('#tf_toAccountId');
        this.amountInput = page.locator('#tf_amount');
        this.descriptionInput = page.locator('#tf_description');
        this.submitButton = page.locator('#btn_submit');
        this.successMessage = page.locator('.alert-success');
        this.boardHeader = page.locator('h2.board-header');
    }   
    async transferFunds(fromAccount: string, toAccount: string, amount: string, description: string) {
        await this.fromAccountSelect.selectOption(fromAccount);
        await this.toAccountSelect.selectOption(toAccount);
        await this.amountInput.fill(amount);
        await this.descriptionInput.fill(description);
        await this.submitButton.click();
    }

    async verifyTransferPageVisible() {
        await expect(this.boardHeader).toContainText('Verify');
        await this.submitButton.click();
    }


    async verifySuccessMessage() {
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText('You successfully submitted your transaction.');
    }
}