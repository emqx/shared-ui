import { zhConnectorsLabel } from '../zh/connectorsLabel'
import { describe, it, expect } from 'vitest'

describe('zhConnectorsLabel', () => {
  it('contains valid zh connectors labels', () => {
    Object.keys(zhConnectorsLabel).forEach((connectorType) => {
      expect(typeof zhConnectorsLabel[connectorType]).toBe('object')
      Object.keys(zhConnectorsLabel[connectorType]).forEach((paramKey) => {
        expect(typeof zhConnectorsLabel[connectorType][paramKey]).toBe('string')
      })
    })
  })
})
