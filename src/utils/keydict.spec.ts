import { describe, it, expect } from 'vitest'
import { getKeyDictKeyByValue } from './keydict'
import { isObject } from './object'

describe('getKeyDictKeyByValue', () => {
  it('returns the key for a matching value', () => {
    const dict = { a: 1, b: 2, c: 3 }
    expect(getKeyDictKeyByValue(dict, 1)).toBe('a')
    expect(getKeyDictKeyByValue(dict, 3)).toBe('c')
  })

  it('returns null when the value is not present', () => {
    const dict = { a: 1, b: 2 }
    expect(getKeyDictKeyByValue(dict, 99)).toBeNull()
  })

  it('works with string values', () => {
    const dict = { x: 'foo', y: 'bar' }
    expect(getKeyDictKeyByValue(dict, 'bar')).toBe('y')
  })

  it('returns the first matching key when values are duplicated', () => {
    const dict = { a: 1, b: 1 }
    const result = getKeyDictKeyByValue(dict, 1)
    expect(['a', 'b']).toContain(result)
  })
})

describe('isObject', () => {
  it('returns true for plain objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  it('returns false for arrays', () => {
    expect(isObject([])).toBe(false)
    expect(isObject([1, 2, 3])).toBe(false)
  })

  it('returns false for null', () => {
    expect(isObject(null)).toBe(false)
  })

  it('returns false for primitives', () => {
    expect(isObject(1)).toBe(false)
    expect(isObject('string')).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })
})
