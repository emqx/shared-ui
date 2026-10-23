import {
  jaStreaming,
  enStreaming,
  zhStreaming,
  enCommon,
  zhCommon,
  jaCommon,
  zhRuleSQL,
  enRuleSQL,
  jaRuleSQL,
  enAiLog,
  zhAiLog,
  zhRuleFunction,
  enRuleFunction,
  jaRuleFunction,
  zhFlow,
  enFlow,
  jaFlow,
} from '@emqx/shared-ui-i18n'
import { createI18n } from 'vue-i18n'
import type { ComposerTranslation, DefineLocaleMessage } from 'vue-i18n'

export type SharedLocaleMessages = DefineLocaleMessage

export const useLocale = (
  locale: string,
  localeMessages?: SharedLocaleMessages,
): {
  t: ComposerTranslation<Record<string, SharedLocaleMessages>, string>
  te: (str: string, locale?: string) => boolean
} => {
  const { t, te, mergeLocaleMessage } = createI18n({
    legacy: false,
    // An explicit chain prevents zh-TW from implicitly falling back to zh.
    fallbackLocale: { 'zh-TW': ['en'], default: ['en'] },
    locale,
    // Built-in dictionaries contain plain string data; give every instance its own copy.
    messages: JSON.parse(
      JSON.stringify({
        'zh-TW': {},
        en: {
          streaming: enStreaming,
          common: enCommon,
          ruleSQL: enRuleSQL,
          aiLog: enAiLog,
          ruleFunction: enRuleFunction,
          flow: enFlow,
        },
        zh: {
          streaming: zhStreaming,
          common: zhCommon,
          ruleSQL: zhRuleSQL,
          aiLog: zhAiLog,
          ruleFunction: zhRuleFunction,
          flow: zhFlow,
        },
        ja: {
          streaming: jaStreaming,
          common: jaCommon,
          ruleSQL: jaRuleSQL,
          aiLog: enAiLog,
          ruleFunction: jaRuleFunction,
          flow: jaFlow,
        },
      }),
    ) as Record<string, SharedLocaleMessages>,
  }).global

  if (localeMessages) {
    mergeLocaleMessage(locale, localeMessages)
  }

  return {
    t,
    te,
  }
}
