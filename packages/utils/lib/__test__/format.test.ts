import { describe, it, expect } from 'vitest'
import { formatSizeUnit, formatValueToMinUnit } from '../format'

describe('formatSizeUnit', () => {
  it('should correctly format bytes', () => {
    expect(formatSizeUnit(1024)).toBe('1.0 KB')
    expect(formatSizeUnit(1048576)).toBe('1.0 MB')
    expect(formatSizeUnit(0)).toBe('0 Bytes')
    expect(formatSizeUnit(12969)).toBe('12.7 KB')
  })

  it('should throw an error for invalid input', () => {
    expect(() => formatSizeUnit(-1)).toThrow('Invalid input: input should be a non-negative number')
    // @ts-ignore
    expect(() => formatSizeUnit(null)).toThrow(
      'Invalid input: input should be a non-negative number',
    )
    // @ts-ignore
    expect(() => formatSizeUnit(undefined)).toThrow(
      'Invalid input: input should be a non-negative number',
    )
  })
})

describe('formatValueToMinUnit', () => {
  it('should correctly format value with unit', () => {
    expect(formatValueToMinUnit(10, 'KB')).toBe(10240)
    expect(formatValueToMinUnit(5, 'MB')).toBe(5242880)
    expect(formatValueToMinUnit(1, 's')).toBe(1000)
  })

  it('should throw an error for invalid unit', () => {
    // @ts-ignore
    expect(() => formatValueToMinUnit(10, 'TB')).toThrow('Invalid unit: TB')
    // @ts-ignore
    expect(() => formatValueToMinUnit(5, 'PB')).toThrow('Invalid unit: PB')
    // @ts-ignore
    expect(() => formatValueToMinUnit(10, 'S')).toThrow('Invalid unit: S')
  })
})
