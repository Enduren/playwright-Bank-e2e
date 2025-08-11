import { Page } from 'playwright';

/**
 * @class PageAction
 * @description A class containing common page actions for web automation.
 */
class PageAction {
  /**
   * @function login
   * @description Logs into the Zero Web App Security site and navigates to the transfer funds page.
   * @param page The Playwright Page object to perform actions on.
   */
  async login(page: Page): Promise<void> {
    // Navigate to the Zero Web App Security homepage
    await page.goto('http://zero.webappsecurity.com/index.html');
    console.log('Navigated to homepage.');

    // Click the sign-in button
    await page.click('#signin_button');
    console.log('Clicked sign-in button.');

    // Type the username into the login field
    await page.type('#user_login', 'username');
    console.log('Entered username.');

    // Type the password into the password field
    await page.type('#user_password', 'password');
    console.log('Entered password.');

    // Click the "Sign in" button
    await page.click('text=Sign in');
    console.log('Clicked Sign in button.');

    
  }
}

// Export the class for use in other files
export default PageAction;