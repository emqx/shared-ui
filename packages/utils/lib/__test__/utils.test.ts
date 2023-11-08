// utils.test.ts
import { describe, it, expect, vi } from 'vitest'
import { testUtils } from '../index'

describe('testUtils', () => {
  it('prints the correct log', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    testUtils()
    expect(consoleSpy).toHaveBeenCalledWith('test ------> utils')
    consoleSpy.mockRestore()
  })
})
