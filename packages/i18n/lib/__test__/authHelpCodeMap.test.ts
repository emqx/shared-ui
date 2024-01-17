import { authHelpCodeMap } from '../authHelpCodeMap'
import { describe, it, expect } from 'vitest'

describe('sqlTemplate', () => {
  it('contains expected auth code map keys', () => {
    const expectedKeys = ['authn', 'authz']
    expectedKeys.forEach((key) => {
      expect(authHelpCodeMap).toHaveProperty(key)
    })

    const expectedSubKeys = ['mysql', 'postgresql', 'mongodb', 'redis']
    Object.values(authHelpCodeMap).forEach((value) => {
      expectedSubKeys.forEach((subKey) => {
        expect(value).toHaveProperty(subKey)
      })
    })
  })
})
