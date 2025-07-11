import { isEmptyObj } from './objectUtils'
import parseHoconToObject from 'hocon-parser'

/**
 * Format a key for HOCON output.
 * If the key contains characters other than letters, numbers, underscore, or hyphen,
 * or if it is a reserved keyword (true, false, null), it will be quoted.
 * @param key - The key to format.
 * @returns The formatted key, quoted if necessary.
 */
const formatKey = (key: string): string => {
  const unquotedKeyRegex = /^[a-zA-Z0-9_-]+$/
  if (unquotedKeyRegex.test(key) && !['true', 'false', 'null'].includes(key)) {
    return key
  }
  const escapedKey = key.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return `"${escapedKey}"`
}

/**
 * Convert a JavaScript object to a HOCON string.
 * Handles nested objects, arrays, strings, numbers, booleans, and null values.
 * @param data - The object to convert.
 * @returns The HOCON string representation of the object.
 */
export const objectToHocon = (data: Record<string, any>): string => {
  if (isEmptyObj(data)) {
    return '{}'
  }

  const getValueString = (value: any, level: number): string => {
    if (typeof value === 'string') {
      return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`
    }
    if (value === null || value === undefined) {
      return 'null'
    }
    if (Array.isArray(value)) {
      if (value.length === 0) return '[]'
      const items = value
        .map((item) => `${'  '.repeat(level + 1)}${getValueString(item, level + 1)}`)
        .join(',\n')
      return `[\n${items}\n${'  '.repeat(level)}]`
    }
    if (typeof value === 'object') {
      return objectToHocon(value)
    }
    return String(value)
  }

  const keys = Object.keys(data)
  const result = keys
    .map((key) => {
      const value = data[key]
      const formattedKey = formatKey(key)
      return `  ${formattedKey} = ${getValueString(value, 1)}`
    })
    .join('\n')

  return `{\n${result}\n}`
}

/**
 * Parse a HOCON string into a JavaScript object.
 * Returns an empty object if the input is empty or whitespace.
 * Throws an error if parsing fails.
 * @param hoconData - The HOCON string to parse.
 * @returns The parsed JavaScript object.
 */
export const hoconToObject = (hoconData: string): Record<string, any> => {
  if (hoconData.trim() === '') {
    return {}
  }
  try {
    const parsedData = parseHoconToObject(hoconData)
    return parsedData
  } catch (error) {
    throw error
  }
}
