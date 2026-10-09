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

test('reopening follows layout changes and keeps viewport flipping and caret direction aligned', async ({ page }) => {
  await page.goto('/e2e/fixtures/tooltip.html')
  const trigger = page.getByRole('button', { name: 'Hover me' })
  const tooltip = page.locator('[role="tooltip"]')
  const moveTrigger = async (top: number) => {
    await page.locator('#app').evaluate((element, margin) => {
      element.style.marginTop = `${margin}px`
      element.style.marginLeft = '200px'
    }, top)
  }
  const openAndCheck = async (position: 'top' | 'bottom') => {
    await trigger.hover()
    await expect(tooltip).toHaveClass(/nyx-tooltip__content--open/)
    await expect(tooltip).toHaveAttribute('data-position', position)
    await expect(tooltip).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
    const anchor = await trigger.boundingBox()
    const floating = await tooltip.boundingBox()
    expect(anchor).not.toBeNull()
    expect(floating).not.toBeNull()
    const separation = {
      top: anchor!.y - (floating!.y + floating!.height),
      bottom: floating!.y - (anchor!.y + anchor!.height),
    }
    expect(separation[position]).toBeGreaterThanOrEqual(0)
    const caret = await tooltip.locator('.nyx-tooltip__content-wrapper').evaluate(element => {
      const style = getComputedStyle(element, '::after')
      return { top: parseFloat(style.borderTopWidth), bottom: parseFloat(style.borderBottomWidth) }
    })
    expect(position === 'top' ? caret.top : caret.bottom).toBeGreaterThan(0)
    expect(position === 'top' ? caret.bottom : caret.top).toBe(0)
    await page.mouse.move(1000, 700)
    await expect(tooltip).not.toHaveClass(/nyx-tooltip__content--open/)
  }

  await moveTrigger(300)
  await openAndCheck('top')
  await moveTrigger(150)
  await openAndCheck('top')
  await moveTrigger(0)
  await openAndCheck('bottom')
  await moveTrigger(300)
  await openAndCheck('top')
})
