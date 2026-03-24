export const isObject = (val: unknown): val is object => typeof val === 'object' && !Array.isArray(val) && val !== null
