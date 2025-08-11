import { test, expect } from '@playwright/test'
import PageAction from '../page/login';

test.describe('Transfer Funds and Make Payments', () => {
  test.beforeEach(async ({ page }) => {
    const pageLogin = new PageAction();
    await pageLogin.login(page)

    // Navigate to the transfer funds page after login
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
    console.log('Navigated to transfer funds page.');
})

  test('Transfer funds', async ({ page }) => {
    await page.click('#transfer_funds_tab')
    await page.selectOption('#tf_fromAccountId', '2')
    await page.selectOption('#tf_toAccountId', '3')
    await page.type('#tf_amount', '500')
    await page.type('#tf_description', 'Test message')
    await page.click('#btn_submit')

    const boardHeader = await page.locator('h2.board-header')
    await expect(boardHeader).toContainText('Verify')
    await page.click('#btn_submit')

    const message = await page.locator('.alert-success')
    await expect(message).toContainText(
      'You successfully submitted your transaction'
    )
  })
})
