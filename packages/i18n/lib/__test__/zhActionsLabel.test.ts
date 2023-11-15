import { zhActionsLabel } from '../zhActionsLabel'
import { describe, it, expect } from 'vitest'

describe('zhActionsLabel', () => {
  it('contains valid zh actions labels', () => {
    Object.keys(zhActionsLabel).forEach((actionType) => {
      expect(typeof zhActionsLabel[actionType]).toBe('object')
      Object.keys(zhActionsLabel[actionType]).forEach((paramKey) => {
        expect(typeof zhActionsLabel[actionType][paramKey]).toBe('string')
      })
    })
  })
})
