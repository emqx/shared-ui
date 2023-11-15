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
  const cache = new Set()
  try {
    if (typeof obj === 'string') {
      return obj
    }
    return JSON.stringify(
      obj,
      (_key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (cache.has(value)) {
            throw new Error('Circular reference detected')
          }
          cache.add(value)
        }
        return value
      },
      tabSpaces,
    )
  } catch (error) {
    console.error(error)
    return 'stringify error'
  } finally {
    cache.clear()
  }
}
