// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { createApp, h, type App } from 'vue'
import { installFlowLocale } from './installFlowLocale'
import { useFlowLocale } from './useFlowLocale'
import { zhTWRuleFunction } from '../../../i18n/lib/zh-TW/ruleFunction'
import { zhTWFlow } from '../../../i18n/lib/zh-TW/flow'

const FlowLocalePlugin = { install: installFlowLocale }

let app: App | undefined
let host: HTMLDivElement | undefined
afterEach(() => {
  app?.unmount()
  host?.remove()
})

describe('Flow locale injection', () => {
  it('passes optional Traditional Chinese messages through the plugin to forms', () => {
    host = document.createElement('div')
    document.body.append(host)
    app = createApp({
      setup() {
        const { locale, t, getValidI18nText } = useFlowLocale()
        expect(locale).toBe('zh-TW')
        expect(getValidI18nText('ruleFunction.mappingTableFunc', 'fallback')).toBe('對應表函式')
        expect(t('ruleFunction.inputFieldRequiredError', { name: '欄位' })).toBe('請輸入欄位')
        expect(t('common.field')).toBe('欄位')
        expect(t('flow.guideSourceNodeDesc')).toBe(zhTWFlow.guideSourceNodeDesc)
        expect(t('flow.filterFunctionsWrongOrder')).toContain('AI 節點之後')
        expect(t('flow.baseURLDesc', { url: 'https://example.com', name: 'OpenAI' })).toBe(
          '預設值為 https://example.com，您也可以輸入其他相容 OpenAI API 格式的模型基礎 URL。',
        )
        return () => h('p', t('ruleFunction.String'))
      },
    })
    app.use(FlowLocalePlugin, {
      locale: 'zh-TW',
      messages: { ruleFunction: zhTWRuleFunction, flow: zhTWFlow, common: { field: '欄位' } },
    })
    app.mount(host)
    expect(host.textContent).toBe('字串')
  })

  it.each([
    ['zh', '字符串'],
    ['en', 'String'],
    ['zh-TW', 'String'],
  ] as const)('renders %s without optional language resources', (locale, expected) => {
    host = document.createElement('div')
    app = createApp({
      setup() {
        const { t } = useFlowLocale()
        return () => h('p', t('ruleFunction.String'))
      },
    })
    app.use(FlowLocalePlugin, { locale })
    app.mount(host)
    expect(host.textContent).toBe(expected)
  })

  it.each([undefined, { ruleFunction: { String: '字串' } }])(
    'uses English for missing labels with optional messages %j',
    (messages) => {
      host = document.createElement('div')
      app = createApp({
        setup() {
          const { getValidI18nText } = useFlowLocale()
          expect(getValidI18nText('ruleFunction.mathFunc', 'mathFunc')).toBe(
            'Mathematical Functions',
          )
          expect(getValidI18nText('ruleFunction.String', 'String')).toBe(
            messages ? '字串' : 'String',
          )
          expect(getValidI18nText('ruleFunction.unknown', 'custom label')).toBe('custom label')
          return () => h('p')
        },
      })
      app.use(FlowLocalePlugin, { locale: 'zh-TW', messages })
      app.mount(host)
    },
  )
})
