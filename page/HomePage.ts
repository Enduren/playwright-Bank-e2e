import { expect, Locator, Page } from '@playwright/test';



export class HomePage {
    // Define Selectors
    readonly page: Page;
    readonly userIcon: Locator; 
    readonly logoutLink: Locator;
    readonly signInButton: Locator;
    readonly checkingAccount: Locator;
    readonly transferFundsLink: Locator;
    readonly myMoneyMapLink: Locator;
    readonly onlineStatementsTab: Locator;
    readonly feedbackLink: Locator;




    // Initialize selectors using constructor
    constructor(page:Page) {
        this.page = page;   
        this.userIcon = page.getByText('username')
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.signInButton = page.getByRole('button', { name: ' Signin' });
        this.checkingAccount = page.locator('#account_summary_tab');
        this.transferFundsLink = page.getByText('Transfer Funds', { exact: true })
        this.myMoneyMapLink = page.getByText('My Money Map')
        this.onlineStatementsTab = page.locator('#online_statements_tab');
        this.feedbackLink = page.getByText('Feedback')
        

    }

    // Method to perform fund transfer
    async logout() {
        // Step 1: Click the icon. 
        // If clicking doesn't work, swap .click() for .hover()
        await this.page.waitForTimeout(3000);
        await this.userIcon.click();

        await this.page.waitForTimeout(1000); // Small wait to ensure UI updates

        // Step 2: Explicitly wait for the link to be visible in the UI
        // This is more reliable than .waitFor() because it auto-retries
        await expect(this.logoutLink).toBeVisible({ timeout: 10000 });

        // Step 3: Perform the click
        await this.logoutLink.click();
    }


    //assert to verify user sees sign in button after logout
    async assertSignInButtonVisible() {
        await expect(this.signInButton).toBeVisible();
    }

    assertHomePageVisible = async () => {
        const homePageHeader = await this.page.locator('text=HOME');
        await expect(homePageHeader).toBeVisible();
    }

    async gotoCheckingAccountVisible() {
        await expect(this.checkingAccount).toBeVisible();

        await this.checkingAccount.click();
        await expect(this.page).toHaveURL("http://zero.webappsecurity.com/bank/account-activity.html");
    }

    //goto Transfer Funds Page
    async gotoTransferFundsPage() {
        await expect(this.transferFundsLink).toBeVisible(); 
        await this.transferFundsLink.click();
        await expect(this.page).toHaveURL("http://zero.webappsecurity.com/bank/transfer-funds.html");
    }

    //goto My Money Map Page
    async gotoMyMoneyMapPage() {
        // await expect(this.myMoneyMapLink).toBeVisible(); 
        await this.myMoneyMapLink.click();
        await expect(this.page).toHaveURL("http://zero.webappsecurity.com/bank/money-map.html");
    }
    //goto Online Statements Page
    async gotoOnlineStatementsPage() {
        await expect(this.onlineStatementsTab).toBeVisible(); 
        await this.onlineStatementsTab.click();
        await expect(this.page).toHaveURL("http://zero.webappsecurity.com/bank/online-statements.html");
    }

    //goto Feedback Page
    async gotoFeedbackPage() {
        await expect(this.feedbackLink).toBeVisible(); 
        await this.feedbackLink.click();
        await expect(this.page).toHaveURL("http://zero.webappsecurity.com/feedback.html");
    }



 
}