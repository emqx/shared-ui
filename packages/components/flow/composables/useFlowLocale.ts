import { inject } from 'vue'
import { useLocale, type SharedLocaleMessages } from '@emqx/shared-ui-utils'

export const useFlowLocale = (): {
  locale: string
  t: ReturnType<typeof useLocale>['t']
  getValidI18nText: (i18nKeypath: string, placeholder: string) => string
} => {
  const locale = inject('flowLocale', 'en')
  const messages = inject<SharedLocaleMessages | undefined>('flowLocaleMessages', undefined)
  const { t, te } = useLocale(locale, messages)

  const getValidI18nText = (i18nKeypath: string, placeholder: string) => {
    return te(i18nKeypath) || te(i18nKeypath, 'en') ? t(i18nKeypath) : placeholder
  }

  return {
    locale,
    t,
    getValidI18nText,
  }
}
