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
