import { flattenObject, unflattenObject } from '../objectUtils'
import { describe, it, expect } from 'vitest'

describe('flattenObject', () => {
  it('should correctly flatten a nested object', () => {
    const input = { a: { b: { c: 1 } } }
    const output = flattenObject(input)
    expect(output).toEqual({ 'a.b.c': 1 })
  })
})

describe('unflattenObject', () => {
  it('should correctly unflatten an object', () => {
    const input = { 'a.b.c': 1 }
    const output = unflattenObject(input)
    expect(output).toEqual({ a: { b: { c: 1 } } })
  })
})
