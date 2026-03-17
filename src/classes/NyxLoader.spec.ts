import { describe, it, expect } from 'vitest'
import NyxLoader from './NyxLoader'

describe('NyxLoader.loadString', () => {
  it('loads a string value from data', () => {
    expect(NyxLoader.loadString({ name: 'Alice' }, 'name')).toBe('Alice')
  })

  it('returns the default when the key is missing', () => {
    expect(NyxLoader.loadString({}, 'name', 'default')).toBe('default')
  })

  it('throws when the key is missing and no default is provided', () => {
    expect(() => NyxLoader.loadString({}, 'name')).toThrow()
  })

  it('throws when the value is not a string and no default is provided', () => {
    expect(() => NyxLoader.loadString({ name: 42 }, 'name')).toThrow()
  })

  it('returns the default when the value is the wrong type', () => {
    expect(NyxLoader.loadString({ name: 42 }, 'name', 'fallback')).toBe('fallback')
  })
})

describe('NyxLoader.loadStringOrNull', () => {
  it('loads a string value', () => {
    expect(NyxLoader.loadStringOrNull({ name: 'Bob' }, 'name')).toBe('Bob')
  })

  it('returns null default when key is missing and default is null', () => {
    expect(NyxLoader.loadStringOrNull({}, 'name', null)).toBeNull()
  })
})

describe('NyxLoader.loadBoolean', () => {
  it('loads a boolean true value', () => {
    expect(NyxLoader.loadBoolean({ active: true }, 'active')).toBe(true)
  })

  it('loads a boolean false value', () => {
    expect(NyxLoader.loadBoolean({ active: false }, 'active')).toBe(false)
  })

  it('returns the default when the key is missing', () => {
    expect(NyxLoader.loadBoolean({}, 'active', false)).toBe(false)
  })

  it('throws when the key is missing and no default is provided', () => {
    expect(() => NyxLoader.loadBoolean({}, 'active')).toThrow()
  })
})

describe('NyxLoader.loadBooleanOrNull', () => {
  it('loads a boolean value', () => {
    expect(NyxLoader.loadBooleanOrNull({ flag: true }, 'flag')).toBe(true)
  })

  it('returns null default when key is missing and default is null', () => {
    expect(NyxLoader.loadBooleanOrNull({}, 'flag', null)).toBeNull()
  })
})

describe('NyxLoader.loadNumber', () => {
  it('loads a number value', () => {
    expect(NyxLoader.loadNumber({ count: 42 }, 'count')).toBe(42)
  })

  it('loads zero', () => {
    expect(NyxLoader.loadNumber({ count: 0 }, 'count')).toBe(0)
  })

  it('returns the default when the key is missing', () => {
    expect(NyxLoader.loadNumber({}, 'count', 99)).toBe(99)
  })

  it('throws when the key is missing and no default is provided', () => {
    expect(() => NyxLoader.loadNumber({}, 'count')).toThrow()
  })
})

describe('NyxLoader.loadNumberOrNull', () => {
  it('loads a number value', () => {
    expect(NyxLoader.loadNumberOrNull({ n: 7 }, 'n')).toBe(7)
  })

  it('returns null default when key is missing and default is null', () => {
    expect(NyxLoader.loadNumberOrNull({}, 'n', null)).toBeNull()
  })
})

describe('NyxLoader.loadEnum', () => {
  const values = ['active', 'inactive', 'pending'] as const
  type Status = typeof values[number]

  it('loads a valid enum value', () => {
    expect(NyxLoader.loadEnum<Status>({ status: 'active' }, 'status', 'inactive', [...values])).toBe('active')
  })

  it('returns the default for an unrecognised value', () => {
    expect(NyxLoader.loadEnum<Status>({ status: 'unknown' }, 'status', 'inactive', [...values])).toBe('inactive')
  })

  it('returns the default when the key is missing', () => {
    expect(NyxLoader.loadEnum<Status>({}, 'status', 'pending', [...values])).toBe('pending')
  })
})

describe('NyxLoader.loadEnumOrNull', () => {
  it('loads a valid enum value', () => {
    expect(NyxLoader.loadEnumOrNull({ x: 'a' }, 'x', null, ['a', 'b'])).toBe('a')
  })

  it('returns null when value is null', () => {
    expect(NyxLoader.loadEnumOrNull({ x: null }, 'x', 'a', ['a', 'b'])).toBeNull()
  })

  it('returns null default when key is missing', () => {
    expect(NyxLoader.loadEnumOrNull({}, 'x', null, ['a', 'b'])).toBeNull()
  })
})

describe('NyxLoader.loadArray', () => {
  it('loads an array value', () => {
    expect(NyxLoader.loadArray({ items: [1, 2, 3] }, 'items', [])).toEqual([1, 2, 3])
  })

  it('loads an empty array', () => {
    expect(NyxLoader.loadArray({ items: [] }, 'items', [99])).toEqual([])
  })

  it('returns the default when the key is missing', () => {
    expect(NyxLoader.loadArray({}, 'items', [42])).toEqual([42])
  })
})

describe('NyxLoader.loadArrayOrNull', () => {
  it('loads an array', () => {
    expect(NyxLoader.loadArrayOrNull({ list: ['a'] }, 'list', [])).toEqual(['a'])
  })

  it('returns null when value is null', () => {
    expect(NyxLoader.loadArrayOrNull({ list: null }, 'list', [])).toBeNull()
  })
})

describe('NyxLoader.loadObject', () => {
  it('loads a nested object', () => {
    expect(NyxLoader.loadObject({ meta: { x: 1 } }, 'meta', {})).toEqual({ x: 1 })
  })

  it('returns the default when the value is not an object', () => {
    expect(NyxLoader.loadObject({ meta: 'string' }, 'meta', { default: true })).toEqual({ default: true })
  })

  it('returns the default when the key is missing', () => {
    expect(NyxLoader.loadObject({}, 'meta', { fallback: true })).toEqual({ fallback: true })
  })
})

describe('NyxLoader.loadObjectOrNull', () => {
  it('loads a nested object', () => {
    expect(NyxLoader.loadObjectOrNull({ obj: { y: 2 } }, 'obj', null)).toEqual({ y: 2 })
  })

  it('returns null when value is null', () => {
    expect(NyxLoader.loadObjectOrNull({ obj: null }, 'obj', {})).toBeNull()
  })
})

describe('NyxLoader.loadDate', () => {
  it('loads a Date instance', () => {
    const date = new Date('2024-01-01')
    expect(NyxLoader.loadDate({ date }, 'date', new Date())).toEqual(date)
  })

  it('loads a Firebase-style timestamp object', () => {
    const seconds = 1704067200
    const result = NyxLoader.loadDate({ ts: { seconds } }, 'ts', new Date())
    expect(result).toEqual(new Date(seconds * 1000))
  })

  it('returns the default when the key is missing', () => {
    const fallback = new Date('2020-01-01')
    expect(NyxLoader.loadDate({}, 'date', fallback)).toEqual(fallback)
  })
})

describe('NyxLoader.loadDateOrNull', () => {
  it('loads a Date instance', () => {
    const date = new Date('2024-06-15')
    expect(NyxLoader.loadDateOrNull({ date }, 'date', null)).toEqual(date)
  })

  it('returns null when value is null', () => {
    expect(NyxLoader.loadDateOrNull({ date: null }, 'date', new Date())).toBeNull()
  })

  it('loads a Firebase-style timestamp', () => {
    const seconds = 1000000
    const result = NyxLoader.loadDateOrNull({ ts: { seconds } }, 'ts', null)
    expect(result).toEqual(new Date(seconds * 1000))
  })
})
