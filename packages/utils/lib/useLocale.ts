import { jaStreaming, enStreaming, zhStreaming } from '@emqx/shared-ui-i18n'
import { useI18n } from 'vue-i18n'
import type { ComposerTranslation } from 'vue-i18n'

export const useLocale = (locale: string): { t: ComposerTranslation } => {
  const { t } = useI18n({
    locale,
    en: {
      streaming: enStreaming,
    },
    zh: {
      streaming: zhStreaming,
    },
    ja: {
      streaming: jaStreaming,
    },
  })

  return {
    t,
  }
}
