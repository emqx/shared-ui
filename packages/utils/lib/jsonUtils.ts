import JSONBig from 'json-bigint'

/**
 * Parses a JSON string safely and returns a JavaScript object.
 * @param str - The JSON string to parse.
 * @returns A JavaScript object if parsing is successful, otherwise void.
 */
export const parseJSONSafely = (str: any): Record<string, any> | void => {
  try {
    return JSON.parse(str)
  } catch (error) {
    console.error('An error occurred while parsing the JSON string')
  }
}

/**
 * Safely stringify a JavaScript object to a JSON string, handling circular references.
 * @param obj - The object to stringify.
 * @param tabSpaces - The number of spaces to use for indentation.
 * @returns The JSON string representation of the object, or 'stringify error' if an error occurs.
 */
export const stringifyObjSafely = (obj: Record<string, any>, tabSpaces?: number): string => {
  try {
    if (typeof obj === 'string') {
      return obj
    }
    return JSON.stringify(obj, null, tabSpaces)
  } catch (error) {
    console.error(error)
    return 'stringify error'
  }
}

/**
 * Checks if a given string is a valid JSON string.
 * @param str - The string to be checked.
 * @returns A boolean indicating whether the string is a valid JSON string or not.
 */
export const isJSONString = (str: string): boolean => {
  if (typeof str !== 'string') return false
  try {
    const obj = JSON.parse(str)
    return typeof obj === 'object' && obj !== null
  } catch (e) {
    return false
  }
}

// JSONBig with default configuration, suitable for handling both integer and floating-point big numbers
const jsonBigNumber = JSONBig

// JSONBig configured to use native BigInt, optimized for integer-only big numbers
const jsonBigInt = JSONBig({
  useNativeBigInt: true,
})

/**
 * Parse JSON string with enhanced support for big numbers.
 * @param value The string to parse as JSON
 * @param reviver A function that transforms the results
 * @returns Parsed JSON object
 */
export const jsonBigIntParse = (
  value: string,
  reviver?: (this: any, key: string, value: any) => any,
): any => {
  try {
    // Attempt to parse using native BigInt for integer-only JSON
    return jsonBigInt.parse(value, reviver)
  } catch {
    try {
      // If that fails, try parsing with BigNumber for floating-point numbers
      return jsonBigNumber.parse(value, reviver)
    } catch {
      // If both custom parsers fail, fall back to native JSON.parse
      return JSON.parse(value, reviver)
    }
  }
}

/**
 * Stringify JSON with enhanced support for big numbers.
 * @param value The value to convert to a JSON string
 * @param replacer A function that alters the behavior of the stringification process
 * @param space Adds indentation, white space, and line break characters to the return-value JSON text
 * @returns JSON string
 */
export const jsonBigIntStringify = (
  value: Record<string, unknown>,
  replacer?: (this: any, key: string, value: any) => any | (number | string)[] | null,
  space?: string | number,
): string => {
  try {
    // Attempt to stringify using native BigInt for integer-only JSON
    return jsonBigInt.stringify(value, replacer as any, space)
  } catch {
    // If that fails, use BigNumber library (note: integers will be in scientific notation)
    return jsonBigNumber.stringify(value, replacer as any, space)
  }
}
