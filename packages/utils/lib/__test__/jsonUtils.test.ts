import { parseJSONSafely, stringifyObjSafely, isJSONString } from '../jsonUtils'
import { describe, it, expect } from 'vitest'

describe('parseJSONSafely', () => {
  it('should correctly parse a JSON string', () => {
    const input = '{"a":1,"b":2,"c":3}'
    const output = parseJSONSafely(input)
    expect(output).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should return undefined when parsing an invalid JSON string', () => {
    const input = '{a:1,b:2,c:3}'
    const output = parseJSONSafely(input)
    expect(output).toBeUndefined()
  })
})

describe('stringifyObjSafely', () => {
  it('should correctly stringify an object', () => {
    const input = { a: 1, b: 2, c: 3 }
    const output = stringifyObjSafely(input)
    expect(output).toEqual('{"a":1,"b":2,"c":3}')
  })

  it('should return the input if it is a string', () => {
    const input = 'a string'
    const output = stringifyObjSafely(input as any)
    expect(output).toEqual(input)
  })
})

describe('isJSONString', () => {
  it('should return true for valid JSON strings', () => {
    const input = '{"a":1,"b":2,"c":3}'
    const output = isJSONString(input)
    expect(output).toEqual(true)
  })

  it('should return false for invalid JSON strings', () => {
    const input = '{a:1,b:2,c:3}'
    const output = isJSONString(input)
    expect(output).toEqual(false)
  })

  it('should return false for non-string inputs', () => {
    const input = 123
    const output = isJSONString(input as any)
    expect(output).toEqual(false)
  })

  it('should return false for null', () => {
    const input = null
    const output = isJSONString(input as any)
    expect(output).toEqual(false)
  })
})
