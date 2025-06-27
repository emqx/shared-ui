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
  zhRuleFunction,
  enRuleFunction,
  jaRuleFunction,
} from '@emqx/shared-ui-i18n'
import { createI18n } from 'vue-i18n'
import type { ComposerTranslation } from 'vue-i18n'

export const useLocale = (locale: string): { t: ComposerTranslation } => {
  const { t } = createI18n({
    mode: 'composition',
    locale,
    messages: {
      en: {
        streaming: enStreaming,
        common: enCommon,
        ruleSQL: enRuleSQL,
        ruleFunction: enRuleFunction,
      },
      zh: {
        streaming: zhStreaming,
        common: zhCommon,
        ruleSQL: zhRuleSQL,
        ruleFunction: zhRuleFunction,
      },
      ja: {
        streaming: jaStreaming,
        common: jaCommon,
        ruleSQL: jaRuleSQL,
        ruleFunction: jaRuleFunction,
      },
    },
  }).global

  return {
    t,
  }
}
