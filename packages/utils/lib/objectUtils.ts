/**
 * Flattens a nested object into a single-level object with dot-separated keys.
 * @param obj - The object to flatten.
 * @param prefix - An optional array of keys to use as a prefix for the flattened keys.
 * @param current - An optional object to use as the initial flattened object.
 * @returns The flattened object.
 * Example: { a: { b: c: 1 } } => { 'a.b.c': 1 }
 */
export const flattenObject = (
  obj: { [key: string]: any },
  prefix: any[] = [],
  current: { [key: string]: any } = {},
) => {
  if (typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
    for (const key of Object.keys(obj)) {
      flattenObject(obj[key], prefix.concat(key), current)
    }
  } else {
    current[prefix.join('.')] = obj
  }
  return current
}

/**
 * Converts a flattened object to a nested object.
 * @param obj - The flattened object to convert.
 * @returns The nested object.
 * Example: { 'a.b.c': 1 } => { a: { b: { c: 1 } } }
 */
export const unflattenObject = (obj: { [key: string]: any }) => {
  if (Object(obj) !== obj && !Array.isArray(obj)) return obj
  const regex = /\.?([^.[\]]+)|\[(\d+)\]/g
  const resultholder: { [key: string]: any } = {}
  try {
    for (const p in obj) {
      let current = resultholder
      let prop = ''
      let m: any
      while ((m = regex.exec(p))) {
        current = current[prop] || (current[prop] = m[2] ? [] : {})
        prop = m[2] || m[1]
      }
      current[prop] = obj[p]
    }
  } catch (error) {
    console.error(error)
  }
  return resultholder[''] || resultholder
}

/**
 * Checks if an object is empty.
 * @param obj - The object to check.
 * @returns True if the object is empty, false otherwise.
 */
export const isEmptyObj = (obj: Record<any, any>) => Object.keys(obj).length === 0
