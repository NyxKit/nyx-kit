import { describe, it, expect } from 'vitest'
import { generateRandomString } from './string'

describe('generateRandomString', () => {
  it('generates a string of the specified length', () => {
    expect(generateRandomString(10)).toHaveLength(10)
    expect(generateRandomString(32)).toHaveLength(32)
  })

  it('defaults to length 16', () => {
    expect(generateRandomString()).toHaveLength(16)
  })

  it('generates alphanumeric characters only', () => {
    expect(generateRandomString(100)).toMatch(/^[A-Za-z0-9]+$/)
  })

  it('generates different strings on repeated calls', () => {
    const results = new Set(Array.from({ length: 20 }, () => generateRandomString()))
    // With 62^16 possible strings, collision probability is negligible
    expect(results.size).toBeGreaterThan(1)
  })

  it('handles length 0', () => {
    expect(generateRandomString(0)).toBe('')
  })
})
