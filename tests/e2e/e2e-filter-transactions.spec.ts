import { test, expect } from '@playwright/test'
import { LoginPage } from '../page/LoginPage'
import{ HomePage } from '../page/HomePage'
import { AccountActivityPage } from '../page/AccountActivityPage'

test.describe('Filter Transactions', () => {
  // Page Objects
  let loginPage: LoginPage
  let homePage: HomePage  
  let accountActivityPage: AccountActivityPage

  test.beforeEach(async ({ page }) => {
    // Initialize Page Objects
    loginPage=new LoginPage(page)
    homePage=new HomePage(page)
    accountActivityPage=new AccountActivityPage(page)

    await loginPage.visit()

    await loginPage.login("username","password")

    await page.goBack()
  })

  test('Verify the results for each account', async ({ page }) => {

    //Navigate to transactions page
    await homePage.gotoTransferFundsPage();
    console.log('Navigated to transfer funds page.');

    //click on account activity tab
    await accountActivityPage.gotoAccountActivityTab();

    // Verify transactions for each account
    await accountActivityPage.selectAccount('2'); // Checking Account
    await accountActivityPage.verifyTransactionCount(3);

    await accountActivityPage.selectAccount('4'); // Loan Account
    await accountActivityPage.verifyTransactionCount(2);

    await accountActivityPage.selectAccount('6'); // Credit Card Account
    await accountActivityPage.verifySuccessMessage();


    
  })
})
