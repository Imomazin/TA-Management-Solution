import { test, expect } from '@playwright/test'

test.describe('Dashboard Page', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/.*login/)
  })

  test('should display dashboard after login', async ({ page }) => {
    // Navigate to login
    await page.goto('/login')

    // Fill in credentials
    await page.fill('input[type="email"]', 'admin@test.com')
    await page.fill('input[type="password"]', 'admin123')

    // Submit form
    await page.click('button[type="submit"]')

    // Wait for redirect
    await page.waitForURL('/dashboard')

    // Check for dashboard elements
    await expect(page.locator('h1')).toContainText('Dashboard')
  })
})
