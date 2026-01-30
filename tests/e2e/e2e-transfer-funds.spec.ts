import { test, expect } from '@playwright/test'
import { LoginPage } from '../page/LoginPage'
import { HomePage } from '../page/HomePage'
import { TransferPage } from '../page/TransferPage'

test.describe('Transfer Funds and Make Payments', () => {
  // Page Objects
  let loginPage: LoginPage
  let homePage: HomePage  
  let transferPage: TransferPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    transferPage = new TransferPage(page);

    // Navigate to the login page before each test
    await loginPage.visit();

    // Perform login
    await loginPage.login("username", "password");
    await page.goBack();

    // Navigate to the transfer funds page after login
    await homePage.gotoTransferFundsPage();
    console.log('Navigated to transfer funds page.');
})

  test('Transfer funds', async ({ page }) => {
    // Navigate to Transfer Funds tab
    await page.click('#transfer_funds_tab')

    // Perform fund transfer
    await transferPage.transferFunds('2', '3', '500', 'Test message')
    
    // Verify transfer page is visible
    await transferPage.verifyTransferPageVisible();

    // Verify success message
    await transferPage.verifySuccessMessage();
  })
})
