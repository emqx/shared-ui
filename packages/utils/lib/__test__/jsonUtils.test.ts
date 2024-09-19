import {
  parseJSONSafely,
  stringifyObjSafely,
  isJSONString,
  jsonBigIntParse,
  jsonBigIntStringify,
} from '../jsonUtils'
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

describe('jsonBigIntParse', () => {
  it('should parse regular JSON correctly', () => {
    const json = '{"a": 1, "b": "string", "c": true}'
    expect(jsonBigIntParse(json)).toEqual({ a: 1, b: 'string', c: true })
  })

  it('should parse large integers correctly', () => {
    const json = '{"bigInt": 9007199254740991}'
    const result = jsonBigIntParse(json)
    expect(result.bigInt.toString()).toBe('9007199254740991')
  })

  it('should parse large floating-point numbers correctly', () => {
    const json = '{"bigFloat": 1.2345e+100}'
    const result = jsonBigIntParse(json)
    expect(result.bigFloat.toString()).toBe('1.2345e+100')
  })

  it('should handle nested objects with big numbers', () => {
    const json = '{"nested": {"bigInt": 9007199254740991, "normal": 42}}'
    const result = jsonBigIntParse(json)
    expect(result.nested.bigInt.toString()).toBe('9007199254740991')
    expect(result.nested.normal).toBe(42)
  })

  it('should fall back to native JSON.parse for invalid JSON', () => {
    const invalidJson = '{"invalid": undefined}'
    expect(() => jsonBigIntParse(invalidJson)).toThrow()
  })
})

describe('jsonBigIntStringify', () => {
  it('should stringify regular objects correctly', () => {
    const obj = { a: 1, b: 'string', c: true }
    expect(jsonBigIntStringify(obj)).toBe('{"a":1,"b":"string","c":true}')
  })

  it('should stringify objects with large integers correctly', () => {
    const obj = { bigInt: BigInt('9007199254740991') }
    expect(jsonBigIntStringify(obj)).toBe('{"bigInt":9007199254740991}')
  })

  it('should stringify objects with large floating-point numbers correctly', () => {
    const obj = { bigFloat: 1.2345e100 }
    const result = jsonBigIntStringify(obj)
    expect(result).toContain('1.2345e+100')
  })

  it('should handle nested objects with big numbers', () => {
    const obj = { nested: { bigInt: BigInt('9007199254740991'), normal: 42 } }
    expect(jsonBigIntStringify(obj)).toBe('{"nested":{"bigInt":9007199254740991,"normal":42}}')
  })

  it('should use space parameter for formatting', () => {
    const obj = { a: 1, b: 2 }
    expect(jsonBigIntStringify(obj, undefined, 2)).toBe('{\n  "a": 1,\n  "b": 2\n}')
  })

  it('should use replacer function', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const replacer = (key: string, value: any) => (key === 'b' ? undefined : value)
    expect(jsonBigIntStringify(obj, replacer)).toBe('{"a":1,"c":3}')
  })
})
