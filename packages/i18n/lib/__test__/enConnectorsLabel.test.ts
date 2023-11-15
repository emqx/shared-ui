import { enConnectorsLabel } from '../enConnectorsLabel'
import { describe, it, expect } from 'vitest'

describe('enConnectorsLabel', () => {
  it('contains valid en connectors labels', () => {
    Object.keys(enConnectorsLabel).forEach((connectorType) => {
      expect(typeof enConnectorsLabel[connectorType]).toBe('object')
      Object.keys(enConnectorsLabel[connectorType]).forEach((paramKey) => {
        expect(typeof enConnectorsLabel[connectorType][paramKey]).toBe('string')
      })
    })
  })
})
