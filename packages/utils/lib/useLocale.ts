import {
  jaStreaming,
  enStreaming,
  zhStreaming,
  enCommon,
  zhCommon,
  jaCommon,
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
      },
      zh: {
        streaming: zhStreaming,
        common: zhCommon,
      },
      ja: {
        streaming: jaStreaming,
        common: jaCommon,
      },
    },
  }).global

  return {
    t,
  }
}
