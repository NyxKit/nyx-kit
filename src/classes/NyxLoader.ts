export default class NyxLoader {
  private static handleDefaultValue<T>(defaultValue: T | undefined, key: string, type: string): T {
    if (defaultValue !== undefined) return defaultValue
    throw new Error(`Could not load data, expected ${key} to be of type ${type}`)
  }

  private static handleData(data: unknown, key: string, type: string): unknown {
    if (!data || typeof data !== 'object') {
      return this.handleDefaultValue(undefined, key, type)
    }
    return (data as Record<string, unknown>)[key]
  }

  static loadString (data: unknown, key: string, defaultValue?: string): string {
    const value: unknown = this.handleData(data, key, 'string')
    if (typeof value === 'string') return value
    return this.handleDefaultValue(defaultValue, key, 'string')
  }

  static loadStringOrNull (data: unknown, key: string, defaultValue?: string | null): string | null {
    const value: unknown = this.handleData(data, key, 'string')
    if (typeof value === 'string') return value
    return this.handleDefaultValue(defaultValue, key, 'string')
  }

  static loadBoolean (data: unknown, key: string, defaultValue?: boolean): boolean {
    const value: unknown = this.handleData(data, key, 'boolean')
    if (typeof value === 'boolean') return value
    return this.handleDefaultValue(defaultValue, key, 'boolean')
  }

  static loadBooleanOrNull (data: unknown, key: string, defaultValue?: boolean | null): boolean | null {
    const value: unknown = this.handleData(data, key, 'boolean')
    if (typeof value === 'boolean') return value
    return this.handleDefaultValue(defaultValue, key, 'boolean')
  }

  static loadNumber (data: unknown, key: string, defaultValue?: number): number {
    const value: unknown = this.handleData(data, key, 'number')
    if (typeof value === 'number') return value
    return this.handleDefaultValue(defaultValue, key, 'number')
  }

  static loadNumberOrNull (data: unknown, key: string, defaultValue?: number | null): number | null {
    const value: unknown = this.handleData(data, key, 'number')
    if (typeof value === 'number') return value
    return this.handleDefaultValue(defaultValue, key, 'number')
  }

  static loadEnum<T extends string>(data: unknown, key: string, defaultValue: T, enumValues: T[]): T {
    const value: unknown = this.handleData(data, key, 'string')
    if (enumValues.includes(value as T)) return value as T
    return this.handleDefaultValue(defaultValue, key, 'enum')
  }

  static loadEnumOrNull<T extends string>(
    data: unknown,
    key: string,
    defaultValue: T | null,
    enumValues: T[]
  ): T | null {
    const value: unknown = this.handleData(data, key, 'string')
    if (enumValues.includes(value as T)) return value as T
    return this.handleDefaultValue(defaultValue, key, 'enum')
  }

  static loadArray<T>(data: unknown, key: string, defaultValue: T[]): T[] {
    const value: unknown = this.handleData(data, key, 'array')
    if (Array.isArray(value)) return value as T[]
    return this.handleDefaultValue(defaultValue, key, 'array')
  }

  static loadArrayOrNull<T>(data: unknown, key: string, defaultValue: T[]): T[] | null {
    const value: unknown = this.handleData(data, key, 'array')
    if (Array.isArray(value)) return value as T[]
    return this.handleDefaultValue(defaultValue, key, 'array')
  }

  static loadObject<T>(data: unknown, key: string, defaultValue: T): T {
    const value: unknown = this.handleData(data, key, 'object')
    if (typeof value === 'object' && value !== null) return value as T
    return this.handleDefaultValue(defaultValue, key, 'object')
  }

  static loadObjectOrNull<T>(data: unknown, key: string, defaultValue: T): T | null {
    const value: unknown = this.handleData(data, key, 'object')
    if (typeof value === 'object' && value !== null) return value as T
    return this.handleDefaultValue(defaultValue, key, 'object')
  }
}
