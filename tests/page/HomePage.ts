import { expect, Locator, Page } from '@playwright/test';
import { assert } from 'console';


export class HomePage {
    readonly page: Page;
    readonly userIcon: Locator; 
    readonly logoutLink: Locator;
    readonly signInButton: Locator;




    constructor(page:Page) {
        this.page = page;   
        this.userIcon = page.getByText('username')
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.signInButton = page.getByRole('button', { name: ' Signin' });
        

    }

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

 
}