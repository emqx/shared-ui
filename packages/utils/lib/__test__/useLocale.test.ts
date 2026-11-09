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

describe('translation security', () => {
  it('escapes named values when a call also passes list values', () => {
    const { t } = useLocale('en', { mixed: '{0} {name}' })
    const container = document.createElement('div')
    container.innerHTML = t('mixed', ['safe'], {
      named: { name: '<b>untrusted</b>' },
      escapeParameter: true,
    })

    expect(container.querySelector('b')).toBeNull()
    expect(container.textContent).toBe('safe <b>untrusted</b>')
  })

  it('neutralizes iframe srcdoc when HTML escaping is requested', () => {
    const { t } = useLocale('en', { frame: '<iframe srcdoc="{content}"></iframe>' })
    const container = document.createElement('div')
    container.innerHTML = t(
      'frame',
      { content: '<script>alert(1)</script>' },
      {
        escapeParameter: true,
      },
    )

    const iframe = container.querySelector('iframe')
    expect(iframe).not.toBeNull()
    expect(iframe?.hasAttribute('srcdoc')).toBe(false)
  })

  it('neutralizes event handler attributes in HTML messages', () => {
    const { t } = useLocale('en', { image: '<img src="x" onerror="{handler}">' })
    const container = document.createElement('div')
    container.innerHTML = t('image', { handler: 'alert(1)' }, { escapeParameter: true })

    expect(container.querySelector('img')?.hasAttribute('onerror')).toBe(false)
  })

  it('preserves default text interpolation without adding HTML entities', () => {
    const { t } = useLocale('en', { greeting: 'Hello {name}' })

    expect(t('greeting', { name: '<table> & "quoted"' })).toBe('Hello <table> & "quoted"')
  })
})

describe('locale fallback and lookup', () => {
  it.each(['en', 'zh', 'ja'])('keeps %s built-in keys and custom overrides', (locale) => {
    const { t, te } = useLocale(locale, { custom: 'Value {value}' })

    expect(te('common.field')).toBe(true)
    expect(te('missing.key')).toBe(false)
    expect(t('custom', { value: 42 })).toBe('Value 42')
  })

  it('falls back from zh-TW to English without using the Chinese dictionary', () => {
    const { t, te } = useLocale('zh-TW')

    expect(t('common.field')).toBe(enCommon.field)
    expect(t('common.field')).not.toBe(zhCommon.field)
    expect(te('common.field')).toBe(false)
    expect(te('common.field', 'en')).toBe(true)
  })
})
