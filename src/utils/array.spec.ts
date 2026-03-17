import { describe, it, expect } from 'vitest'
import { getRandomFromArray } from './array'

describe('getRandomFromArray', () => {
  it('returns an element that exists in the array', () => {
    const arr = [1, 2, 3, 4, 5]
    for (let i = 0; i < 50; i++) {
      expect(arr).toContain(getRandomFromArray(arr))
    }
  })

  it('works with string arrays', () => {
    const arr = ['a', 'b', 'c']
    for (let i = 0; i < 20; i++) {
      expect(arr).toContain(getRandomFromArray(arr))
    }
  })

  it('returns the only element of a single-item array', () => {
    expect(getRandomFromArray([42])).toBe(42)
  })
})
