import { test, expect } from '@playwright/test'
import { LoginPage } from '../page/LoginPage'
import { HomePage } from '../page/HomePage'
import {PayBillsPage} from '../page/PayBillsPage'

test.describe('New Payment', () => {
   let loginPage: LoginPage
   let homePage: HomePage
  let payBillsPage: PayBillsPage

  test.beforeEach(async ({ page }) => {
    loginPage=new LoginPage(page)
    homePage=new HomePage(page)
    payBillsPage=new PayBillsPage(page)

    await loginPage.visit()
    await loginPage.login("username","password")
    await page.goBack();



    // Navigate to the transfer funds page after login
    await homePage.gotoTransferFundsPage();
    console.log('Navigated to transfer funds page.');

})

  test('Should send new payment', async ({ page }) => {
    // Navigate to Pay Bills tab
    await page.click('#pay_bills_tab')  

    // Fill payment form and submit
    await payBillsPage.fillPaymentForm('apple', '6', '5000', '2021-11-09', 'some random message');
    
    //submit payment
    await payBillsPage.submitPayment();

    // Assert success message is visible
    await payBillsPage.assertSuccessMessageVisible();
  })
})
