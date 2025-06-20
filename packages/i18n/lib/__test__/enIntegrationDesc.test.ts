import { enIntegrationDesc } from '../en/integrationDesc'
import { describe, it, expect } from 'vitest'

describe('enIntegrationDesc', () => {
  it('contains valid en integration desc', () => {
    Object.keys(enIntegrationDesc).forEach((integrationType) => {
      expect(typeof enIntegrationDesc[integrationType]).toBe('object')
      Object.keys(enIntegrationDesc[integrationType]).forEach((paramKey) => {
        expect(typeof enIntegrationDesc[integrationType][paramKey]).toBe('string')
      })
    })
  })
})
