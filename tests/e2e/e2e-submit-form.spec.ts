import { test, expect } from '@playwright/test'
import { FeedbackPage } from '../page/FeedbackPage'

test.describe('Feedback Form', () => {
  // Page Objects
  let feedbackPage: FeedbackPage

  test.beforeEach(async ({ page }) => {
    // Initialize Page Objects
    feedbackPage = new FeedbackPage(page)
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#feedback')
  })
  

  // Reset feedback form
  test('Reset feedback form', async ({ page }) => {
    //call fill method from FeedbackPage
    await feedbackPage.fillFeedbackForm('some name', 'some email@email.com', 'some subject', 'some nice comment about the application')
    
    //call clear method from FeedbackPage
    await feedbackPage.clearFeedbackForm()

    //assert the form is cleared
    await feedbackPage.assertFormCleared()
    
  })

  // Submit feedback form
  test('Submit feedback form', async ({ page }) => {
    //call fillFeedbackForm function
    await feedbackPage.fillFeedbackForm('some name', 'some email@email.com', 'some subject', 'some nice comment about the application')
   
    //call submitFeedbackForm function
    await feedbackPage.submitFeedbackForm()
   
  })
})
