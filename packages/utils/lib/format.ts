/**
 * Formats a size unit value into a human-readable string representation.
 * @param val - The size unit value to format.
 * @returns A string representing the formatted size unit value.
 * @throws {Error} If the input is not a non-negative number.
 */
export const formatSizeUnit = (val: number) => {
  if (typeof val !== 'number' || isNaN(val) || val < 0) {
    throw new Error('Invalid input: input should be a non-negative number')
  }
  if (val === 0) {
    return '0 Bytes'
  }
  const unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const index = Math.floor(Math.log(val) / Math.log(1024))
  const size = (val / 1024 ** index).toFixed(1)
  return `${size} ${unitArr[index]}`
}

/**
 * Converts a given value from one unit to its equivalent in the smallest unit of the same type.
 *
 * For example, it converts a value in kilobytes (KB) to bytes (B), or a value in hours (h) to milliseconds (ms).
 * The smallest unit for time is millisecond (ms), and for size is byte (B).
 *
 * @param {number} value - The numeric value to be converted.
 * @param {string} unit - The unit of the value, which is a key of the SizeOrTimeUnit enum.
 * @returns {number} The input value converted to the smallest unit.
 * @throws {Error} If the provided unit is not a key in the SizeOrTimeUnit enum.
 *
 * @example
 * // returns 1024, converts 1 kilobyte to bytes
 * formatValueToMinUnit(1, 'KB');
 */
enum SizeOrTimeUnit {
  ms = 1,
  s = 1000,
  m = 1000 * 60,
  h = 1000 * 60 * 60,
  d = 1000 * 60 * 60 * 24,
  B = 1,
  KB = 1024,
  MB = 1024 * 1024,
  GB = 1024 * 1024 * 1024,
}
export const formatValueToMinUnit = (value: number, unit: keyof typeof SizeOrTimeUnit) => {
  if (!(unit in SizeOrTimeUnit)) {
    throw new Error(`Invalid unit: ${unit}`)
  }
  return value * SizeOrTimeUnit[unit]
}
