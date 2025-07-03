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
import type { ComposerTranslation } from 'vue-i18n'

export const useLocale = (
  locale: string,
): { t: ComposerTranslation; te: (str: string) => boolean } => {
  const { t, te } = createI18n({
    mode: 'composition',
    locale,
    messages: {
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
    },
  }).global

  return {
    t,
    te,
  }
}
