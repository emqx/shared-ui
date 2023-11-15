import { parseJSONSafely, stringifyObjSafely } from '../jsonUtils'
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

  it('should return "stringify error" when an error occurs during stringification', () => {
    const circularObj = {}
    circularObj['self'] = circularObj
    const output = stringifyObjSafely(circularObj as any)
    expect(output).toEqual('stringify error')
  })
})
