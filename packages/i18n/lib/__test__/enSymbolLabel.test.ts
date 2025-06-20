import { enSymbolLabel } from '../en/symbolLabel'
import { describe, it, expect } from 'vitest'

describe('enSymbolLabel', () => {
  it('contains valid en symbol labels', () => {
    Object.keys(enSymbolLabel).forEach((labelKey) => {
      expect(typeof enSymbolLabel[labelKey]).toBe('string')
    })
  })
})
