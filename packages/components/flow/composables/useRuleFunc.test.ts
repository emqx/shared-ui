import { describe, expect, it, vi } from 'vitest'
import { useRuleFunc } from './useRuleFunc'

vi.mock('./useFlowLocale', () => ({
  useFlowLocale: () => ({ getValidI18nText: (_key: string, fallback: string) => fallback }),
}))

const newFunctions = [
  'hash_to_range',
  'map_to_range',
  'lz4_compress',
  'lz4_uncompress',
  'maptab_lookup',
]

describe('Flow rule function availability', () => {
  it.each([
    [6.2, false],
    [6.3, true],
    [undefined, true],
  ])('filters new functions for version %s', (version, supported) => {
    const { funcOptList, getFuncItemByName, getFuncGroupByName } = useRuleFunc(version)
    const names = funcOptList.flatMap(({ list }) => list.map(({ name }) => name))

    expect(names).toContain('md5')
    for (const name of newFunctions) {
      expect(names.includes(name)).toBe(supported)
      expect(getFuncItemByName(name)?.name).toBe(name)
      expect(getFuncGroupByName(name)).toBeTruthy()
    }
  })
})
