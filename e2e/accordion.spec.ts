import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => { await page.goto('/e2e/fixtures/accordion.html') })

test('native activation toggles once, retains body values, and never submits', async ({ page }) => {
  const account = page.getByRole('button', { name: 'Account', exact: true })
  await account.focus()
  await page.keyboard.press('Enter')
  await expect(account).toHaveAttribute('aria-expanded', 'true')
  await page.getByRole('textbox', { name: 'Display name' }).fill('Ada')
  await account.focus()
  await page.keyboard.press('Space')
  await expect(account).toHaveAttribute('aria-expanded', 'false')
  await page.keyboard.press('Space')
  await expect(page.getByRole('textbox', { name: 'Display name' })).toHaveValue('Ada')
  await expect(page.getByLabel('Submissions')).toHaveText('0')
})

test('normal tab order excludes hidden bodies and skips disabled headers', async ({ page }) => {
  await page.getByRole('button', { name: 'Account', exact: true }).focus()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('button', { name: 'Privacy', exact: true })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Enter')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('textbox', { name: 'Display name' })).toBeFocused()
})

test('header navigation moves focus without changing open state', async ({ page }) => {
  const account = page.getByRole('button', { name: 'Account', exact: true })
  const privacy = page.getByRole('button', { name: 'Privacy', exact: true })
  await account.focus()
  await page.keyboard.press('ArrowDown')
  await expect(privacy).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(account).toBeFocused()
  await page.keyboard.press('End')
  await expect(privacy).toBeFocused()
  await page.keyboard.press('Home')
  await expect(account).toBeFocused()
  await expect(account).toHaveAttribute('aria-expanded', 'false')
  await expect(privacy).toHaveAttribute('aria-expanded', 'false')
})

test('multiple mode works and nested keyboard events stay in their own instance', async ({ page }) => {
  await page.getByLabel('Multiple sections').check()
  const account = page.getByRole('button', { name: 'Account', exact: true })
  const privacy = page.getByRole('button', { name: 'Privacy', exact: true })
  await account.click()
  await privacy.click()
  await expect(account).toHaveAttribute('aria-expanded', 'true')
  const nested = page.getByRole('button', { name: 'Nested section', exact: true })
  await nested.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('button', { name: 'Another nested section' })).toBeFocused()
  await expect(privacy).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Enter')
  await page.keyboard.press('Tab')
  const input = page.getByRole('textbox', { name: 'Nested input' })
  await expect(input).toBeFocused()
  await page.keyboard.press('Home')
  await expect(input).toBeFocused()
})

test('external collapse/removal recovers focus, including the empty-root fallback', async ({ page }) => {
  const account = page.getByRole('button', { name: 'Account', exact: true })
  await account.click()
  await page.getByRole('textbox', { name: 'Display name' }).focus()
  await page.evaluate(() => (window as unknown as { accordionFixture: { collapse(): void } }).accordionFixture.collapse())
  await expect(account).toBeFocused()
  await account.click()
  await page.getByRole('textbox', { name: 'Display name' }).focus()
  await page.evaluate(() => (window as unknown as { accordionFixture: { removeAccount(): void } }).accordionFixture.removeAccount())
  await expect(page.getByRole('button', { name: 'Privacy', exact: true })).toBeFocused()
  await page.evaluate(() => (window as unknown as { accordionFixture: { removeAll(): void } }).accordionFixture.removeAll())
  await expect(page.locator('#outer')).toBeFocused()
})

test('external updates do not steal focus outside affected content', async ({ page }) => {
  await page.getByRole('button', { name: 'Account', exact: true }).click()
  const after = page.getByRole('button', { name: 'After accordion' })
  await after.focus()
  await page.evaluate(() => (window as unknown as { accordionFixture: { collapse(): void } }).accordionFixture.collapse())
  await expect(after).toBeFocused()
})

test('animates intrinsic panel space and excludes closing content immediately', async ({ page }) => {
  const account = page.getByRole('button', { name: 'Account', exact: true })
  const panel = page.locator('#outer > .nyx-accordion__item').first().locator('.nyx-accordion__panel')
  await page.locator('#outer').evaluate(element => {
    const style = (element as HTMLElement).style
    style.setProperty('--nyx-accordion-open-duration', '1s')
    style.setProperty('--nyx-accordion-close-duration', '1s')
  })
  await account.click()
  await expect.poll(() => panel.evaluate(element => element.getAnimations().length)).toBeGreaterThan(0)
  const opening = await panel.evaluate(async element => {
    const animation = element.getAnimations()[0]
    animation.pause()
    animation.currentTime = 250
    await new Promise(requestAnimationFrame)
    return { height: element.getBoundingClientRect().height, full: element.querySelector('.nyx-accordion__body')!.getBoundingClientRect().height }
  })
  expect(opening.height).toBeGreaterThan(0)
  expect(opening.height).toBeLessThan(opening.full)
  await panel.evaluate(element => element.getAnimations({ subtree: true }).forEach(animation => animation.finish()))
  await account.click()
  await expect(panel).toHaveAttribute('aria-hidden', 'true')
  await expect(panel).toHaveAttribute('inert', '')
  await expect(page.getByRole('textbox', { name: 'Display name' })).toHaveCount(0)
  await expect.poll(() => panel.evaluate(element => element.getAnimations().length)).toBeGreaterThan(0)
  const closingHeight = await panel.evaluate(async element => {
    const animation = element.getAnimations()[0]
    animation.pause()
    animation.currentTime = 250
    await new Promise(requestAnimationFrame)
    return element.getBoundingClientRect().height
  })
  expect(closingHeight).toBeGreaterThan(0)
  expect(closingHeight).toBeLessThan(opening.full)
  await panel.evaluate(element => element.getAnimations({ subtree: true }).forEach(animation => animation.finish()))
  await expect(panel).toBeHidden()
})

test('rapid reversals settle on the latest state without losing body data', async ({ page }) => {
  const account = page.getByRole('button', { name: 'Account', exact: true })
  await account.click()
  await page.getByRole('textbox', { name: 'Display name' }).fill('Ada')
  for (let index = 0; index < 5; index++) {
    await account.evaluate(element => (element as HTMLButtonElement).click())
    await page.evaluate(() => new Promise(requestAnimationFrame))
  }
  await expect(account).toHaveAttribute('aria-expanded', 'false')
  const panel = page.locator('#outer > .nyx-accordion__item').first().locator('.nyx-accordion__panel')
  await expect(panel).toBeHidden()
  await account.click()
  await expect(page.getByRole('textbox', { name: 'Display name' })).toHaveValue('Ada')
  await expect(panel).not.toHaveAttribute('inert')
})

test('reduced motion disables panel, body, and indicator animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const account = page.getByRole('button', { name: 'Account', exact: true })
  await account.click()
  await expect(page.getByRole('textbox', { name: 'Display name' })).toBeVisible()
  expect(await page.locator('#outer').evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0)
  await account.click()
  await expect(page.locator('#outer > .nyx-accordion__item').first().locator('.nyx-accordion__panel')).toBeHidden()
  expect(await page.locator('#outer').evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0)
})
