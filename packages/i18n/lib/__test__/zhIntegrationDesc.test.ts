import { zhIntegrationDesc } from '../zhIntegrationDesc'
import { describe, it, expect } from 'vitest'

describe('zhIntegrationDesc', () => {
  it('contains valid zh integration desc', () => {
    Object.keys(zhIntegrationDesc).forEach((integrationType) => {
      expect(typeof zhIntegrationDesc[integrationType]).toBe('object')
      Object.keys(zhIntegrationDesc[integrationType]).forEach((paramKey) => {
        expect(typeof zhIntegrationDesc[integrationType][paramKey]).toBe('string')
      })
    })
  })
})
