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

const getQuotePlaceholder = (source: string, quoteType: 'single' | 'double') => {
  let placeholder = `__EMQX_HOCON_${quoteType.toUpperCase()}_QUOTE__`
  while (source.includes(placeholder)) {
    placeholder = `_${placeholder}_`
  }
  return placeholder
}

const isOpeningQuote = (source: string, index: number) => {
  const lineStartIndex =
    Math.max(source.lastIndexOf('\n', index - 1), source.lastIndexOf('\r', index - 1)) + 1

  if (source.slice(lineStartIndex, index).trim() === '') {
    return true
  }

  for (let cursor = index - 1; cursor >= 0; cursor -= 1) {
    const char = source[cursor]
    if (/\s/.test(char)) {
      continue
    }
    return ['=', ':', '{', '[', ','].includes(char)
  }

  return true
}

const protectNestedQuotes = (source: string) => {
  const singleQuotePlaceholder = getQuotePlaceholder(source, 'single')
  const doubleQuotePlaceholder = getQuotePlaceholder(source, 'double')
  let ret = ''
  let quote: '"' | "'" | null = null
  let isTripleDoubleQuote = false

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index]
    const nextThreeChars = source.slice(index, index + 3)

    if (!quote) {
      if (char === '#' || (char === '/' && source[index + 1] === '/')) {
        const lineEndIndex = source.indexOf('\n', index)
        if (lineEndIndex === -1) {
          ret += source.slice(index)
          break
        }
        ret += source.slice(index, lineEndIndex + 1)
        index = lineEndIndex
        continue
      }

      if (nextThreeChars === '"""' && isOpeningQuote(source, index)) {
        isTripleDoubleQuote = true
        quote = '"'
        ret += nextThreeChars
        index += 2
        continue
      }
      if ((char === '"' || char === "'") && isOpeningQuote(source, index)) {
        quote = char
      }
      ret += char
      continue
    }

    if (char === '\\') {
      ret += char
      if (index + 1 < source.length) {
        ret += source[index + 1]
        index += 1
      }
      continue
    }

    if (quote === '"' && isTripleDoubleQuote && nextThreeChars === '"""') {
      isTripleDoubleQuote = false
      quote = null
      ret += nextThreeChars
      index += 2
      continue
    }

    if (!isTripleDoubleQuote && char === quote) {
      quote = null
      ret += char
      continue
    }

    if (quote === '"' && char === "'") {
      ret += singleQuotePlaceholder
      continue
    }
    if (quote === "'" && char === '"') {
      ret += doubleQuotePlaceholder
      continue
    }

    ret += char
  }

  return {
    hocon: ret,
    replacements: {
      [singleQuotePlaceholder]: "'",
      [doubleQuotePlaceholder]: '"',
    },
  }
}

const restoreProtectedQuotes = (value: any, replacements: Record<string, string>): any => {
  if (typeof value === 'string') {
    return Object.entries(replacements).reduce(
      (ret, [placeholder, quote]) => ret.split(placeholder).join(quote),
      value,
    )
  }
  if (Array.isArray(value)) {
    return value.map((item) => restoreProtectedQuotes(item, replacements))
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => {
        const restoredKey = restoreProtectedQuotes(key, replacements)
        return [restoredKey, restoreProtectedQuotes(item, replacements)]
      }),
    )
  }
  return value
}

/**
 * Convert a JavaScript object to a HOCON string.
 * Handles nested objects, arrays, strings, numbers, booleans, and null values.
 * @param data - The object to convert.
 * @returns The HOCON string representation of the object.
 */
export const objectToHocon = (data: Record<string, any>, objLevel: number = 0): string => {
  if (isEmptyObj(data)) {
    return '{}'
  }

  const indent = '  '.repeat(objLevel)
  const nextIndent = '  '.repeat(objLevel + 1)

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
      return objectToHocon(value, level)
    }
    return String(value)
  }

  const keys = Object.keys(data)
  const result = keys
    .map((key) => {
      const value = data[key]
      const formattedKey = formatKey(key)
      return `${nextIndent}${formattedKey} = ${getValueString(value, objLevel + 1)}`
    })
    .join('\n')

  return `{\n${result}\n${indent}}`
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
    const { hocon, replacements } = protectNestedQuotes(hoconData)
    const parsedData = parseHoconToObject(hocon)
    return restoreProtectedQuotes(parsedData, replacements)
  } catch (error) {
    throw error
  }
}
