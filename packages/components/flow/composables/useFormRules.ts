import { useFlowLocale } from './useFlowLocale'

export default () => {
  const { t } = useFlowLocale()

  const newRequiredRule = (type: 'input' | 'select' = 'input', customMessage?: string) => {
    const requiredMessage = type === 'select' ? t('common.pleaseChoose') : t('common.pleaseEnter')

    return { required: true, message: customMessage || requiredMessage }
  }

  return {
    newRequiredRule,
  }
}
