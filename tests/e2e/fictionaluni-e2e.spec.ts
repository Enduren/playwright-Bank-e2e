import { test, expect } from '@playwright/test'


test('open website', async ({ page }) => {
    await page.goto('http://fictional-university.local/')
})
