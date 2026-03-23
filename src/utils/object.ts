export const isObject = (val: unknown): val is Object => typeof val === 'object' && !Array.isArray(val) && val !== null
