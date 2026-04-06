abstract class NyxResultBase<B extends boolean, C extends B extends true ? false : true, T> {
  readonly isSuccess: B
  readonly isFailure: C

  constructor (isSuccess: B, isFailure: C) {
    this.isSuccess = isSuccess
    this.isFailure = isFailure
  }

  abstract logIfError (_message: string): void
  abstract unwrapOrFatal (): T
}

export class NyxSuccess<T, E extends string> extends NyxResultBase<true, false, T> {
  readonly value: T

  constructor (value: T) {
    super(true, false)
    this.value = value
  }

  map<T2> (callback: (input: T) => T2): NyxSuccess<T2, E> {
    const newValue = callback(this.value)
    return new NyxSuccess(newValue)
  }

  mapError<E2 extends string> (_callback: (input: E) => [E2, string]): NyxSuccess<T, E2> {
    return NyxResult.success(this.value)
  }

  convert<E2 extends string> (): NyxResult<T, E2> {
    return NyxResult.success(this.value)
  }

  override logIfError (_message: string) {}
  override unwrapOrFatal (): T {
    return this.value
  }
}

class NyxFail<T, E extends string> extends NyxResultBase<false, true, T> {
  readonly stack?: string
  readonly moreInfo?: string
  readonly message: string
  readonly error: E

  constructor (error: E, message: string, moreInfo?: string) {
    super(false, true)
    const err = new Error('Fail')
    this.stack = err.stack
    this.message = message
    this.moreInfo = moreInfo
    this.error = error
  }

  ignore () {
    console.debug('Error', this.error, this.message, 'has been ignored')
  }

  log (message: string, payload: object = {}) {
    console.error(message, payload, this.error, this.message, this.stack)
  }

  map<T2> (_callback: (input: T) => T2): NyxFail<T2, E> {
    return NyxResult.fail(this.error, this.message, this.moreInfo)
  }

  mapError<E2 extends string> (callback: (input: E) => [E2, string]): NyxFail<T, E2> {
    const [newError, message] = callback(this.error)
    return new NyxFail(newError, message)
  }

  convert<T2> (): NyxFail<T2, E> {
    return NyxResult.fail(this.error, this.message, this.moreInfo)
  }

  override toString (): string {
    return `[${this.error}] ${this.message}`
  }

  override logIfError (message: string, payload: object = {}) {
    this.log(message, payload)
  }

  override unwrapOrFatal (): never {
    const error = new Error('Fatal error: ' + this.error + ' ' + this.message)
    console.error(error, this.stack)
    throw error
  }
}

const OkSymbol = Symbol('resultOk')

export type NyxResult<T, E extends string> = NyxSuccess<T, E> | NyxFail<T, E>
export type NyxResultVoid<E extends string> = NyxSuccess<typeof OkSymbol, E> | NyxFail<typeof OkSymbol, E>

export const NyxResult = {
  success<T, E extends string> (value: T) {
    return new NyxSuccess<T, E>(value)
  },
  fail<T, E extends string> (id: E, message: string, moreInfo?: string) {
    return new NyxFail<T, E>(id, message, moreInfo)
  },
  ok<E extends string> () {
    return new NyxSuccess<typeof OkSymbol, E>(OkSymbol)
  },
  fromUnknownError<T, E extends string> (id: E, error: unknown): NyxFail<T, E | 'unknown'> {
    if (error instanceof Error) {
      return new NyxFail(id, error.message)
    }
    return new NyxFail('unknown', `An unknown error occured ${error}`)
  },
  fromPossibleResult<T, E extends string> (value: NyxResult<T, E>|T): NyxResult<T, E> {
    if (typeof value === 'object' && value !== null && 'isSuccess' in value) {
      return value
    }
    return NyxResult.success(value)
  }
}

// For testing purposes
export class NyxExpectResult {
  static toBeSuccessful<T, E extends string> (value: NyxResult<T, E>): asserts value is NyxSuccess<T, E> {
    if (value.isFailure) throw new Error(`Expected success but got ${value}`)
  }
  static toBeFailure<T, E extends string> (value: NyxResult<T, E>): asserts value is NyxFail<T, E> {
    if (value.isSuccess) throw new Error(`Expected success but got ${value}`)
  }
}
