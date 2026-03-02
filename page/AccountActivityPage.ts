import { expect, Locator, Page } from '@playwright/test';

export class AccountActivityPage {
    // Define Selectors
    readonly page: Page;
    readonly fromAccountSelect: Locator;
    readonly toAccountSelect: Locator;
    readonly amountInput: Locator;
    readonly descriptionInput: Locator;
    readonly submitButton: Locator
    readonly successMessage: Locator;
    readonly accountActivityTab: Locator;

    // Initialize selectors using constructor
    constructor(page: Page) {
        this.page = page;
        this.fromAccountSelect = page.locator('#tf_fromAccountId');
        this.toAccountSelect = page.locator('#tf_toAccountId');
        this.amountInput = page.locator('#tf_amount');
        this.descriptionInput = page.locator('#tf_description');
        this.submitButton = page.locator('#btn_submit');
        this.successMessage = page.locator('.alert-success');
        this.accountActivityTab = page.locator('#account_activity_tab');

    } 
      
    // Method to perform fund transfer

    //click account activity tab
    async gotoAccountActivityTab() {
        await this.accountActivityTab.click();
    }

    async transferFunds(fromAccount: string, toAccount: string, amount: string, description: string) {
        await this.fromAccountSelect.selectOption(fromAccount);
        await this.toAccountSelect.selectOption(toAccount);
        await this.amountInput.fill(amount);
        await this.descriptionInput.fill(description);
        await this.submitButton.click();
    }

    async confirmTransfer() {
        const confirmButton = this.page.locator('#btn_submit');
        await confirmButton.click();
    }

    async verifyTransferPageVisible() {
        const boardHeader = this.page.locator('h2.board-header');
        await expect(boardHeader).toContainText('Verify');
    }
    async selectAccount(accountId: string) {
        await this.page.selectOption('#aa_accountId', accountId);
    }
    async verifyTransactionCount(expectedCount: number) {
        const transactions = this.page.locator('#all_transactions_for_account tbody tr');
        await expect(transactions).toHaveCount(expectedCount);
    }

    // Verify success message after transfer
    async verifySuccessMessage() {
        const noResults = await this.page.locator('.well')
        await expect(noResults).toBeVisible()
    }

}