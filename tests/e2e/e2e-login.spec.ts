import { test, expect } from '@playwright/test'
import { LoginPage } from '../page/LoginPage'

test.describe.parallel('Login / Logout Flow', () => {

  let loginPage: LoginPage
  // Before Hook
  test.beforeEach(async ({ page }) => {
    loginPage=new LoginPage(page)
    loginPage.visit()
    
    
  })

  // Negative Scenario
  test('Negative Scenario for login', async ({ page }) => {
    // await page.click('#signin_button')
    // await page.type('#user_login', 'invalid username')
    // await page.type('#user_password', 'invalid password')
    // await page.click('text=Sign in')
    await loginPage.login("invalid username","invalid password")

    // const errorMessage = await page.locator('.alert-error')
    // await expect(errorMessage).toContainText('Login and/or password are wrong')

    await loginPage.assertErrorMessageVisible()
  })

  // Positive Scenario + Logout
  test('Positive Scenario for login + logout', async ({ page }) => {
    // await page.click('#signin_button')
    // await page.type('#user_login', 'username')
    // await page.type('#user_password', 'password')
    // await page.click('text=Sign in')

    await loginPage.login("username","password")
    await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

    const accountSummaryTab = await page.locator('#account_summary_tab')
    await expect(accountSummaryTab).toBeVisible()

    await page.goto('http://zero.webappsecurity.com/logout.html')
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
