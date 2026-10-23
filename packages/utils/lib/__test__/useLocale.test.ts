import { describe, expect, it } from 'vitest'
import { enCommon, zhCommon, jaCommon } from '@emqx/shared-ui-i18n'
import { useLocale } from '../useLocale'

describe('locale message isolation', () => {
  it.each([
    ['en', enCommon],
    ['zh', zhCommon],
    ['ja', jaCommon],
  ] as const)(
    'isolates %s overrides from other instances and exported dictionaries',
    (locale, common) => {
      const original = common.field
      const existing = useLocale(locale)
      const customized = useLocale(locale, { common: { field: 'CUSTOM' } })

      expect(customized.t('common.field')).toBe('CUSTOM')
      expect(existing.t('common.field')).toBe(original)
      expect(useLocale(locale).t('common.field')).toBe(original)
      expect(common.field).toBe(original)
    },
  )
})
