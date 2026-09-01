export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))

const getDecimalPlaces = (value: number) => {
  const [coefficient, exponent = '0'] = value.toString().toLowerCase().split('e')
  const decimalPlaces = coefficient.split('.')[1]?.length ?? 0
  return Math.max(0, decimalPlaces - Number(exponent))
}

export const roundToStep = (value: number, step: number, min: number = 0): number => {
  const rounded = Math.round((value - min) / step) * step + min
  const decimalPlaces = Math.max(getDecimalPlaces(step), getDecimalPlaces(min))
  return Number(rounded.toFixed(decimalPlaces))
}

export const isEven = (value: number) => value % 2 === 0

export const isOdd = (value: number) => value % 2 !== 0

export const isDivisibleBy = (value: number, divisor: number) => value % divisor === 0

export const getRandomBetween = (min: number, max: number, step: number = 1) => {
  const random = Math.random() * (max - min) + min
  return roundToStep(random, step)
}
