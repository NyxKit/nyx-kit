import { describe, it, expect } from 'vitest'
import { isCurrentDomain } from './url'

describe('isCurrentDomain', () => {
  it('returns true for a relative path', () => {
    expect(isCurrentDomain('/about')).toBe(true)
  })

  it('returns true for a URL matching the current origin', () => {
    expect(isCurrentDomain(`${window.location.origin}/page`)).toBe(true)
  })

  it('returns false for an external URL with a different origin', () => {
    expect(isCurrentDomain('https://example.com/page')).toBe(false)
  })

  it('returns false for a URL with a different protocol', () => {
    expect(isCurrentDomain('ftp://localhost/file')).toBe(false)
  })

  it('returns false for the same host on a different port', () => {
    expect(isCurrentDomain('http://localhost:9999/page')).toBe(false)
  })
})
