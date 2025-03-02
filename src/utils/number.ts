export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))

export const roundToStep = (value: number, step: number, min: number = 0): number => {
  const remainder = (value - min) % step
  return remainder < step / 2
    ? value - remainder
    : value + (step - remainder)
}

export const isEven = (value: number) => value % 2 === 0

export const isOdd = (value: number) => value % 2 !== 0

export const isDivisibleBy = (value: number, divisor: number) => value % divisor === 0
