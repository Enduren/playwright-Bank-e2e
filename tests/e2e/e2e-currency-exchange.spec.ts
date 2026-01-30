import { test, expect } from '@playwright/test'
import { LoginPage } from '../page/LoginPage'
import { HomePage } from '../page/HomePage'
import { ForeignCurrencyPage } from '../page/ForeignCurrencyPage'



test.describe.only('Currency Exchange Form', () => {
  // Page Objects
  let loginPage: LoginPage
  let homePage: HomePage
  let foreignCurrencyPage: ForeignCurrencyPage

  test.beforeEach(async ({ page }) => {
     // Initialize Page Objects
    loginPage=new LoginPage(page)

    
    await loginPage.visit()

    await loginPage.login("username","password")  

    await page.goBack()

    // Navigate to the transfer funds page after login
    homePage=new HomePage(page)
    await homePage.gotoTransferFundsPage();
    console.log('Navigated to transfer funds page.');
    

  })

  test('Should make currency exchange', async ({ page }) => {
    //click the pay bill tab
    await page.click('#pay_bills_tab')

    //click the Purchase Foreign Currency tab
    await page.click('text=Purchase Foreign Currency')

    // Initialize ForeignCurrencyPage
    foreignCurrencyPage=new ForeignCurrencyPage(page)

    // Fill currency exchange form
    await foreignCurrencyPage.fillCurrencyExchangeForm('EUR', '1000', true)

    // Calculate costs
    await foreignCurrencyPage.calculateCosts()

    // Purchase foreign currency
    await foreignCurrencyPage.purchaseForeignCurrency()

    // Assert success message is visible
    await foreignCurrencyPage.assertSuccessMessageVisible();
  })
})
