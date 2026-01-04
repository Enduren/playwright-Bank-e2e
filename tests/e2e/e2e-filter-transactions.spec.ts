import { test, expect } from '@playwright/test'
import { LoginPage } from '../page/LoginPage'

test.describe('Filter Transactions', () => {
  test.beforeEach(async ({ page }) => {
    let loginPage: LoginPage

    loginPage=new LoginPage(page)

    loginPage.visit()

    // Navigate to the transfer funds page after login
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
    console.log('Navigated to transfer funds page.');
  })

  test('Verify the results for each account', async ({ page }) => {
    await page.click('#account_activity_tab')
    await page.selectOption('#aa_accountId', '2')
    const checkingAccount = await page.locator(
      '#all_transactions_for_account tbody tr'
    )
    await expect(checkingAccount).toHaveCount(3)

    await page.selectOption('#aa_accountId', '4')
    const loanAccount = await page.locator(
      '#all_transactions_for_account tbody tr'
    )
    await expect(loanAccount).toHaveCount(2)

    await page.selectOption('#aa_accountId', '6')
    const noResults = await page.locator('.well')
    await expect(noResults).toBeVisible()
  })
})
