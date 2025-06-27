import { inject } from 'vue'
import { useLocale } from '@emqx/shared-ui-utils'

export const useFlowLocale = (): {
  locale: string
  t: ReturnType<typeof useLocale>['t']
  getValidI18nText: (i18nKeypath: string, placeholder: string) => string
} => {
  const locale = inject('flowLocale', 'en')
  const { t, te } = useLocale(locale)

  const getValidI18nText = (i18nKeypath: string, placeholder: string) => {
    return te(i18nKeypath) ? t(i18nKeypath) : placeholder
  }

  return {
    locale,
    t,
    getValidI18nText,
  }
}
