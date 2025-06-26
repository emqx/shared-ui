import { inject } from 'vue'
import { useLocale } from '@emqx/shared-ui-utils'

export const useAILogLocale = (): { locale: string; t: ReturnType<typeof useLocale>['t'] } => {
  const locale = inject('aiLogLocale', 'en')
  const { t } = useLocale(locale)

  return {
    locale,
    t,
  }
}
