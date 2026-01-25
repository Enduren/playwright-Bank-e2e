import { test, expect } from '@playwright/test'
import { LoginPage } from '../page/LoginPage'
import { HomePage } from '../page/HomePage'

test.describe.parallel('Login / Logout Flow', () => {

  // Page Objects
  let loginPage: LoginPage
  let homePage: HomePage


  // Before Hook
  test.beforeEach(async ({ page }) => {

    // Initialize Page Objects
    loginPage=new LoginPage(page)
    homePage=new HomePage(page)

    // Navigate to the login page before each test
    await loginPage.visit()
    
    
  })

  // Negative Scenario
  test('Negative Scenario for login', async ({ page }) => {

    // Perform login with invalid credentials
    await loginPage.login("invalid username","invalid password")

    // Assert error message is visible
    await loginPage.assertErrorMessageVisible()
  })

  // Positive Scenario + Logout
  test('Positive Scenario for login + logout', async ({ page }) => {
    
    // Perform login with valid credentials
    await loginPage.login("username","password")
    
    await page.goBack()


    // Alternatively, use HomePage method to logout
    await homePage.logout()

    // Assert sign-in button is visible after logout
    await homePage.assertSignInButtonVisible()

    // Verify URL after logout
    await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
  })
})
