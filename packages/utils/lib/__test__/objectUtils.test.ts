import { flattenObject, unflattenObject, isEmptyObj } from '../objectUtils'
import { describe, it, expect } from 'vitest'

describe('flattenObject', () => {
  it('should correctly flatten a nested object', () => {
    const input = { a: { b: { c: 1 } } }
    const output = flattenObject(input)
    expect(output).toEqual({ 'a.b.c': 1 })
  })

  it('should correctly flatten an object with multiple nested levels', () => {
    const input = { a: { b: { c: { d: { e: 2 } } } } }
    const output = flattenObject(input)
    expect(output).toEqual({ 'a.b.c.d.e': 2 })
  })

  it('should correctly flatten an object with array values', () => {
    const input = { a: { b: [1, 2, 3] } }
    const output = flattenObject(input)
    expect(output).toEqual({ 'a.b': [1, 2, 3] })
  })

  it('should return an empty object if the input is null', () => {
    const input = null
    const output = flattenObject(input as any)
    expect(output).toEqual({ '': null })
  })
})

describe('unflattenObject', () => {
  it('should correctly unflatten an object', () => {
    const input = { 'a.b.c': 1 }
    const output = unflattenObject(input)
    expect(output).toEqual({ a: { b: { c: 1 } } })
  })
  it('should correctly unflatten an object with multiple nested levels', () => {
    const input = { 'a.b.c.d.e': 2 }
    const output = unflattenObject(input)
    expect(output).toEqual({ a: { b: { c: { d: { e: 2 } } } } })
  })

  it('should correctly unflatten an object with array indices', () => {
    const input = { 'a[0]': 1, 'a[1]': 2 }
    const output = unflattenObject(input)
    expect(output).toEqual({ a: [1, 2] })
  })

  it('should return an empty object if the input is null', () => {
    const input = null
    const output = unflattenObject(input as any)
    expect(output).toEqual(null)
  })
})

describe('isEmptyObj', () => {
  it('should return true for an empty object', () => {
    const input = {}
    const output = isEmptyObj(input)
    expect(output).toBe(true)
  })

  it('should return false for a non-empty object', () => {
    const input = { a: 1 }
    const output = isEmptyObj(input)
    expect(output).toBe(false)
  })

  it('should return true for an object with no own properties', () => {
    const input = Object.create({ a: 1 })
    const output = isEmptyObj(input)
    expect(output).toBe(true)
  })
})
