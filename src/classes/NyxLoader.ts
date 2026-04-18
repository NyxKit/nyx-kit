type NyxLoaderArgs<T> = [data: unknown, key: string|string[], defaultValue?: T]
type NyxLoaderEnumArgs<T> = [...NyxLoaderArgs<T>, enumValues: T[]]

export default class NyxLoader {
  private static handleDefaultValue<T> (defaultValue: T | undefined, key: string|string[], type: string): T {
    if (defaultValue !== undefined) return defaultValue
    throw new Error(`Could not load data, expected ${key} to be of type ${type}`)
  }

  private static getData (data: unknown, key: string|string[], type: string): unknown {
    if (!data || typeof data !== 'object') {
      return this.handleDefaultValue(undefined, key, type)
    }
    if (typeof key === 'string') {
      return (data as Record<string, unknown>)[key]
    } else if (Array.isArray(key)) {
      const value = key.map((k) => this.getData(data, k, type)).find((v) => v !== undefined)
      return value
    }
    throw new Error('Invalid key type')
  }

  static loadString (...args: NyxLoaderArgs<string>): string {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'string')
    if (typeof value === 'string') return value
    return this.handleDefaultValue(defaultValue, key, 'string')
  }

  static loadStringOrNull (...args: NyxLoaderArgs<string|null>): string|null {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'string')
    if (typeof value === 'string') return value
    return this.handleDefaultValue(defaultValue, key, 'string')
  }

  static loadBoolean (...args: NyxLoaderArgs<boolean>): boolean {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'boolean')
    if (typeof value === 'boolean') return value
    return this.handleDefaultValue(defaultValue, key, 'boolean')
  }

  static loadBooleanOrNull (...args: NyxLoaderArgs<boolean|null>): boolean|null {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'boolean')
    if (typeof value === 'boolean') return value
    return this.handleDefaultValue(defaultValue, key, 'boolean')
  }

  static loadNumber (...args: NyxLoaderArgs<number>): number {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'number')
    if (typeof value === 'number') return value
    return this.handleDefaultValue(defaultValue, key, 'number')
  }

  static loadNumberOrNull (...args: NyxLoaderArgs<number|null>): number|null {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'number')
    if (typeof value === 'number') return value
    return this.handleDefaultValue(defaultValue, key, 'number')
  }

  static loadEnum<T extends string>(...args: NyxLoaderEnumArgs<T>): T {
    const [data, key, defaultValue, enumValues] = args
    const value: unknown = this.getData(data, key, 'string')
    if (enumValues.includes(value as T)) return value as T
    return this.handleDefaultValue(defaultValue, key, 'enum')
  }

  static loadEnumOrNull<T extends string|null>(...args: NyxLoaderEnumArgs<T>): T|null {
    const [data, key, defaultValue, enumValues] = args
    const value: unknown = this.getData(data, key, 'string')
    if (enumValues.includes(value as T)) return value as T
    if (value === null) return value
    return this.handleDefaultValue(defaultValue, key, 'enum')
  }

  static loadArray<T>(...args: NyxLoaderArgs<T[]>): T[] {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'array')
    if (Array.isArray(value)) return value as T[]
    return this.handleDefaultValue(defaultValue, key, 'array')
  }

  static loadArrayOrNull<T>(...args: NyxLoaderArgs<T[]|null>): T[]|null {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'array')
    if (Array.isArray(value)) return value as T[]
    if (value === null) return value
    return this.handleDefaultValue(defaultValue, key, 'array')
  }

  static loadObject<T>(...args: NyxLoaderArgs<T>): T {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'object')
    if (typeof value === 'object' && value !== null) return value as T
    return this.handleDefaultValue(defaultValue, key, 'object')
  }

  static loadObjectOrNull<T>(...args: NyxLoaderArgs<T|null>): T|null {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'object')
    if (typeof value === 'object') return value as T
    return this.handleDefaultValue(defaultValue, key, 'object')
  }

  static loadDate(...args: NyxLoaderArgs<Date>): Date {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'date')
    if (value instanceof Date) return value
    const isFirebaseDate = typeof value === 'object' && value !== null && 'seconds' in value
    if (isFirebaseDate && typeof value.seconds === 'number') {
      return new Date(value.seconds * 1000) // Firebase timestamp
    }
    return this.handleDefaultValue(defaultValue, key, 'date')
  }

  static loadDateOrNull(...args: NyxLoaderArgs<Date|null>): Date|null {
    const [data, key, defaultValue] = args
    const value: unknown = this.getData(data, key, 'date')
    if (value instanceof Date || value === null) return value
    const isFirebaseDate = typeof value === 'object' && value !== null && 'seconds' in value
    if (isFirebaseDate && typeof value.seconds === 'number') {
      return new Date(value.seconds * 1000) // Firebase timestamp
    }
    return this.handleDefaultValue(defaultValue, key, 'date')
  }
}
