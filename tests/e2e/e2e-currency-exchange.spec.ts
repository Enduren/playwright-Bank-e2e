import { test, expect } from '@playwright/test'
import { LoginPage } from '../page/LoginPage'


test.describe.only('Currency Exchange Form', () => {
  test.beforeEach(async ({ page }) => {
     let loginPage: LoginPage
    loginPage=new LoginPage(page)

    // Navigate to the transfer funds page after login
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
    console.log('Navigated to transfer funds page.');

    

  })

  test('Should make currency exchange', async ({ page }) => {
    await page.click('#pay_bills_tab')
    await page.click('text=Purchase Foreign Currency')
    await page.selectOption('#pc_currency', 'EUR')
    // await page.selectOption('','')

    const rate = await page.locator('#sp_sell_rate')
    await expect(rate).toContainText('1 euro (EUR)')

    await page.type('#pc_amount', '1000')
    await page.click('#pc_inDollars_true')
    await page.click('#pc_calculate_costs')

    const conversionAmount = await page.locator('#pc_conversion_amount')
    await expect(conversionAmount).toContainText('1000.00 U.S. dollar (USD)')

    await page.click('#purchase_cash')

    const message = await page.locator('#alert_content')
    await expect(message).toBeVisible()
    await expect(message).toContainText(
      'Foreign currency cash was successfully purchased'
    )
  })
})
