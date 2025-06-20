import { enActionsLabel } from '../en/actionsLabel'
import { describe, it, expect } from 'vitest'

describe('enActionsLabel', () => {
  it('contains valid en actions labels', () => {
    Object.keys(enActionsLabel).forEach((actionType) => {
      expect(typeof enActionsLabel[actionType]).toBe('object')
      Object.keys(enActionsLabel[actionType]).forEach((paramKey) => {
        expect(typeof enActionsLabel[actionType][paramKey]).toBe('string')
      })
    })
  })
})
