import { test, expect } from '@playwright/test'
import PageAction from '../page/login';

test.describe('New Payment', () => {
  test.beforeEach(async ({ page }) => {
    const pageLogin = new PageAction();
    await pageLogin.login(page)

    // Navigate to the transfer funds page after login
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
    console.log('Navigated to transfer funds page.');
})

  test('Should send new payment', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.selectOption('#sp_payee', 'apple')
    await page.click('#sp_get_payee_details')
    await page.waitForSelector('#sp_payee_details')
    await page.selectOption('#sp_account', '6')
    await page.type('#sp_amount', '5000')
    await page.type('#sp_date', '2021-11-09')
    await page.type('#sp_description', 'some random message')
    await page.click('#pay_saved_payees')

    const message = await page.locator('#alert_content > span')
    await expect(message).toBeVisible()
    await expect(message).toContainText(
      'The payment was successfully submitted'
    )
  })
})
