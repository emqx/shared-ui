import { describe, it, expect } from 'vitest'
import { formatSizeUnit } from '../format.ts'

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
