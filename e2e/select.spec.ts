import { expect, test } from '@playwright/test'

for (const grouped of [false, true]) {
  test.describe(`select option content (${grouped ? 'grouped' : 'flat'})`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/e2e/fixtures/select.html${grouped ? '?grouped' : ''}`)
    })

    test('uses wide control space and keeps trailing metadata visible in narrow rows', async ({ page }) => {
      await page.setViewportSize({ width: 1000, height: 720 })
      const input = page.locator('input[role="combobox"]')
      await expect(input).toHaveValue(/Planning the next release/)
      await page.evaluate(() => document.fonts.ready)
      const measure = () => input.evaluate(element => {
        const control = element.parentElement!
        const arrow = control.querySelector('.nyx-select__arrow')!
        const style = getComputedStyle(control)
        const available = control.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
          - arrow.getBoundingClientRect().width - parseFloat(style.columnGap)
        return { width: element.getBoundingClientRect().width, available }
      })
      const wide = await measure()
      expect(wide.width).toBeGreaterThan(wide.available - 2)
      await input.click()
      const option = page.locator('[role="option"][data-option-value="1"]')
      const date = option.locator('.discussion-option__date')
      const wideDate = await date.boundingBox()
      await page.keyboard.press('Escape')

      await page.setViewportSize({ width: 360, height: 720 })
      const narrow = await measure()
      expect(narrow.width).toBeLessThan(wide.width)
      expect(narrow.width).toBeGreaterThan(narrow.available - 2)
      await input.click()
      await expect(date).toHaveText('27 Oct')
      const layout = await option.evaluate(element => {
        const title = element.querySelector('.discussion-option__title') as HTMLElement
        const row = element.querySelector('.discussion-option')!
        const date = element.querySelector('.discussion-option__date')!
        const style = getComputedStyle(element)
        return {
          titleWidth: title.clientWidth,
          titleContentWidth: title.scrollWidth,
          rowWidth: row.getBoundingClientRect().width,
          available: element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
          dateRight: date.getBoundingClientRect().right,
          rowRight: row.getBoundingClientRect().right,
          dateWidth: date.getBoundingClientRect().width
        }
      })
      expect(layout.titleContentWidth).toBeGreaterThan(layout.titleWidth)
      expect(layout.rowWidth).toBeCloseTo(layout.available, 0)
      expect(layout.dateRight).toBeCloseTo(layout.rowRight, 0)
      expect(layout.dateWidth).toBeCloseTo(wideDate!.width, 0)
    })

    test('preserves numeric selection across reorder and rename, then selects via keyboard and slot clicks',
      async ({ page }) => {
        const input = page.locator('input[role="combobox"]')
        await page.getByRole('button', { name: 'Reorder options' }).click()
        await expect(input).toHaveValue(/Planning the next release/)
        await page.getByRole('button', { name: 'Rename selected' }).click()
        await expect(input).toHaveValue('Renamed discussion with the same selected value')
        await input.click()
        const selected = page.locator('[role="option"][data-option-value="1"]')
        await expect(selected).toHaveAttribute('aria-selected', 'true')
        await expect(selected).toContainText('Renamed discussion')
        await page.keyboard.press('Home')
        await page.keyboard.press('Enter')
        await expect(input).toHaveValue('Discussion switcher improvements')
        await expect(input).toBeFocused()
        await expect(page.locator('p')).toHaveText('Selected value: 2')
        await input.click()
        await input.fill('27 Oct')
        await expect(page.locator('[role="option"]')).toHaveCount(0)
        await input.fill('renamed')
        await expect(page.locator('[role="option"]')).toHaveCount(1)
        await selected.locator('.discussion-option__date').click()
        await expect(input).toHaveValue('Renamed discussion with the same selected value')
        await expect(page.locator('p')).toHaveText('Selected value: 1')
      }
    )
  })
}
