import { zhSymbolLabel } from '../zhSymbolLabel'
import { describe, it, expect } from 'vitest'

describe('zhSymbolLabel', () => {
  it('contains valid zh symbol labels', () => {
    Object.keys(zhSymbolLabel).forEach((labelKey) => {
      expect(typeof zhSymbolLabel[labelKey]).toBe('string')
    })
  })
})
