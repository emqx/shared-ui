import { jaStreaming, enStreaming, zhStreaming } from '@emqx/shared-ui-i18n'
import { createI18n } from 'vue-i18n'
import type { ComposerTranslation } from 'vue-i18n'

export const useLocale = (locale: string): { t: ComposerTranslation } => {
  const { t } = createI18n({
    mode: 'composition',
    locale,
    messages: {
      en: {
        streaming: enStreaming,
      },
      zh: {
        streaming: zhStreaming,
      },
      ja: {
        streaming: jaStreaming,
      },
    },
  }).global

  return {
    t,
  }
}
