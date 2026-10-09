import { expect, test } from '@playwright/test'

test('tooltip delays hover opening and cancels when the pointer leaves', async ({ page }) => {
  await page.goto('/e2e/fixtures/tooltip.html')
  const trigger = page.getByRole('button', { name: 'Hover me' })
  const tooltip = page.locator('[role="tooltip"]')
  await expect(trigger).toBeVisible()
  await page.clock.install()
  await page.clock.pauseAt(new Date())

  await trigger.hover()
  await page.clock.runFor(149)
  expect(await tooltip.getAttribute('class')).not.toContain('nyx-tooltip__content--open')
  await page.clock.runFor(1)
  await expect(tooltip).toHaveClass(/nyx-tooltip__content--open/)

  await page.mouse.move(500, 500)
  await expect(tooltip).not.toHaveClass(/nyx-tooltip__content--open/)
  await trigger.hover()
  await page.clock.runFor(100)
  await page.mouse.move(500, 500)
  await page.clock.runFor(200)
  await expect(tooltip).not.toHaveClass(/nyx-tooltip__content--open/)
})
