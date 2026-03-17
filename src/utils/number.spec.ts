import { describe, it, expect } from 'vitest'
import { clamp, roundToStep, isEven, isOdd, isDivisibleBy, getRandomBetween } from './number'

describe('clamp', () => {
  it('returns the value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  it('clamps to min when below range', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  it('clamps to max when above range', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('returns min when value equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0)
  })

  it('returns max when value equals max', () => {
    expect(clamp(10, 0, 10)).toBe(10)
  })
})

describe('roundToStep', () => {
  it('rounds down when remainder is less than half step', () => {
    expect(roundToStep(1.2, 1)).toBe(1)
  })

  it('rounds up when remainder is at or above half step', () => {
    expect(roundToStep(1.7, 1)).toBe(2)
  })

  it('returns value unchanged when it aligns with step', () => {
    expect(roundToStep(4, 2)).toBe(4)
  })

  it('respects min offset', () => {
    // (5 - 2) % 3 = 0 → no rounding needed
    expect(roundToStep(5, 3, 2)).toBe(5)
  })

  it('rounds down to nearest step of 5', () => {
    expect(roundToStep(7, 5)).toBe(5)
  })

  it('rounds up to nearest step of 5', () => {
    expect(roundToStep(8, 5)).toBe(10)
  })
})

describe('isEven', () => {
  it('returns true for positive even numbers', () => {
    expect(isEven(2)).toBe(true)
    expect(isEven(100)).toBe(true)
  })

  it('returns true for zero', () => {
    expect(isEven(0)).toBe(true)
  })

  it('returns true for negative even numbers', () => {
    expect(isEven(-4)).toBe(true)
  })

  it('returns false for odd numbers', () => {
    expect(isEven(1)).toBe(false)
    expect(isEven(-3)).toBe(false)
  })
})

describe('isOdd', () => {
  it('returns true for positive odd numbers', () => {
    expect(isOdd(1)).toBe(true)
    expect(isOdd(99)).toBe(true)
  })

  it('returns true for negative odd numbers', () => {
    expect(isOdd(-3)).toBe(true)
  })

  it('returns false for even numbers', () => {
    expect(isOdd(2)).toBe(false)
    expect(isOdd(0)).toBe(false)
  })
})

describe('isDivisibleBy', () => {
  it('returns true when value is divisible by divisor', () => {
    expect(isDivisibleBy(10, 2)).toBe(true)
    expect(isDivisibleBy(9, 3)).toBe(true)
    expect(isDivisibleBy(0, 5)).toBe(true)
  })

  it('returns false when value is not divisible by divisor', () => {
    expect(isDivisibleBy(10, 3)).toBe(false)
    expect(isDivisibleBy(7, 2)).toBe(false)
  })
})

describe('getRandomBetween', () => {
  it('returns a value within [min, max]', () => {
    for (let i = 0; i < 50; i++) {
      const result = getRandomBetween(0, 10)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(10)
    }
  })

  it('returns values that are multiples of step', () => {
    for (let i = 0; i < 50; i++) {
      const result = getRandomBetween(0, 10, 2)
      expect(result % 2).toBe(0)
    }
  })

  it('returns exactly min when min === max', () => {
    expect(getRandomBetween(5, 5)).toBe(5)
  })
})
